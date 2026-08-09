var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};
function corsHeaders(request, env) {
  const allowed = env.ALLOWED_ORIGIN || "*";
  const base = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
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
__name(corsHeaders, "corsHeaders");
function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders }
  });
}
__name(json, "json");
function todayString() {
  const now = /* @__PURE__ */ new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
__name(todayString, "todayString");
var index_default = {
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
					(SELECT COUNT(DISTINCT id) FROM uv) AS total_uv`
      ).bind(today).all();
      const row = results[0] || { today_uv: 0, total_uv: 0 };
      return json(
        { today_uv: row.today_uv, total_uv: row.total_uv },
        200,
        headers
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
        "INSERT OR IGNORE INTO uv (id, date) VALUES (?1, ?2)"
      ).bind(id, today).run();
      return json({ ok: true }, 200, headers);
    }
    return json({ error: "Method Not Allowed" }, 405, headers);
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
