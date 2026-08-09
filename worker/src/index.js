/**
 * Fuwari 博客访客计数器（Cloudflare Worker + D1）
 *
 * GET  /  -> { today_uv, total_uv }
 * POST /  -> body: { id: string }，幂等：同一 id 同一天只计一次
 */

const JSON_HEADERS = {
	"Content-Type": "application/json; charset=utf-8",
	"Cache-Control": "no-store",
};

/**
 * @typedef {Object} Env
 * @property {any} DB - D1 数据库绑定
 * @property {string | undefined} ALLOWED_ORIGIN - 可选，限制允许的来源域名
 */

function corsHeaders(request, env) {
	const allowed = env.ALLOWED_ORIGIN || "*";
	const base = {
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": "86400",
	};
	if (allowed === "*") {
		return { ...base, "Access-Control-Allow-Origin": "*" };
	}
	const origin = request.headers.get("Origin");
	if (origin === allowed) {
		return { ...base, "Access-Control-Allow-Origin": origin, Vary: "Origin" };
	}
	return base;
}

function json(data, status = 200, extraHeaders = {}) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { ...JSON_HEADERS, ...extraHeaders },
	});
}

function todayString() {
	const now = new Date();
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, "0");
	const d = String(now.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

export default {
	/**
	 * @param {Request} request
	 * @param {Env} env
	 */
	async fetch(request, env) {
		const headers = corsHeaders(request, env);

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers });
		}

		if (request.method === "GET") {
			const today = todayString();
			const { results } = await env.DB.prepare(
				`SELECT
					(SELECT COUNT(*) FROM uv WHERE date = ?1) AS today_uv,
					(SELECT COUNT(DISTINCT id) FROM uv) AS total_uv`,
			)
				.bind(today)
				.all();
			const row = results[0] || { today_uv: 0, total_uv: 0 };
			return json(
				{ today_uv: row.today_uv, total_uv: row.total_uv },
				200,
				headers,
			);
		}

		if (request.method === "POST") {
			let id = "";
			try {
				const body = await request.json();
				id = typeof body?.id === "string" ? body.id.trim() : "";
			} catch {
				id = "";
			}
			if (!id || id.length > 64) {
				return json({ error: "invalid visitor id" }, 400, headers);
			}

			const today = todayString();
			await env.DB.prepare(
				"INSERT OR IGNORE INTO uv (id, date) VALUES (?1, ?2)",
			)
				.bind(id, today)
				.run();
			return json({ ok: true }, 200, headers);
		}

		return json({ error: "Method Not Allowed" }, 405, headers);
	},
};
