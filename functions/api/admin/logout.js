function json(data, init = {}) {
  const headers = new Headers(init.headers)
  headers.set('content-type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(data), { ...init, headers })
}

export async function onRequestPost({ request, env }) {
  const db = env.VIEWS_DB
  if (!db) return json({ ok: true })
  const auth = request.headers.get('Authorization') || ''
  const token = auth.replace('Bearer ', '').trim()
  if (token) await db.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run().catch(() => {})
  return json({ ok: true })
}
