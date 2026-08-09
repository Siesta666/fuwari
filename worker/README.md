# 访客计数器 Worker

给 Fuwari 博客提供“今日访客 / 总访客”计数的 Cloudflare Worker + D1 实现。
同一访客（浏览器生成的 ID）同一天只计一次，跨天重复访问每天各计一次，总访客按 ID 去重。

## 部署步骤

```bash
cd worker

# 1. 创建 D1 数据库
npx wrangler d1 create fuwari-counter

# 2. 把上一步输出的 database_id 填到 wrangler.toml

# 3. 应用建表迁移（--remote 表示线上数据库）
npx wrangler d1 migrations apply fuwari-counter --remote

# 4. 部署
npx wrangler deploy
```

部署后把 [src/config.ts](../src/config.ts) 里的 `counterConfig.apiUrl` 改成实际地址：
`https://fuwari-counter.<你的 workers.dev 子域名>/`

## 可选：限制来源域名

```bash
npx wrangler secret put ALLOWED_ORIGIN
# 输入 https://fuwari.bianwenzhao.workers.dev
```

不设置时允许所有来源（CORS `*`），适合公开计数接口。

## API

```http
GET /
```

返回：

```json
{ "today_uv": 3, "total_uv": 42 }
```

```http
POST /
Content-Type: application/json

{ "id": "浏览器生成的访客id" }
```

去重由数据库主键 `(id, date)` 保证，重复上报不会重复计数。
