const USERNAME = 'ihymich'

function json(data, init = {}) {
  const headers = new Headers(init.headers)
  headers.set('content-type', 'application/json; charset=utf-8')
  headers.set('access-control-allow-origin', '*')
  return new Response(JSON.stringify(data), { ...init, headers })
}

export async function onRequestGet(context) {
  const { env, request } = context
  const apiKey = env.LASTFM_API_KEY

  if (!apiKey) {
    return json({ error: 'Last.fm API key not configured.' }, {
      status: 503,
      headers: { 'cache-control': 'no-store' },
    })
  }

  const url = new URL(request.url)
  const mode = url.searchParams.get('mode') === 'top' ? 'top' : 'recent'

  const params = new URLSearchParams({
    api_key: apiKey,
    user: USERNAME,
    format: 'json',
    limit: '50',
    ...(mode === 'recent'
      ? { method: 'user.getrecenttracks' }
      : { method: 'user.gettoptracks', period: 'overall' }),
  })

  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`, {
      headers: { 'User-Agent': 'j4ke-site/1.0' },
    })

    if (!res.ok) {
      return json({ error: 'Last.fm request failed.', status: res.status }, {
        status: 502,
        headers: { 'cache-control': 'no-store' },
      })
    }

    const data = await res.json()

    if (data.error) {
      return json({ error: data.message || 'Last.fm error.' }, {
        status: 502,
        headers: { 'cache-control': 'no-store' },
      })
    }

    const ttl = mode === 'recent' ? 30 : 300
    return json(data, {
      headers: { 'cache-control': `public, max-age=${ttl}, s-maxage=${ttl}` },
    })
  } catch {
    return json({ error: 'Last.fm request failed.' }, {
      status: 502,
      headers: { 'cache-control': 'no-store' },
    })
  }
}
