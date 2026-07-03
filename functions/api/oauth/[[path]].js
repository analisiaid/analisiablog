// Pages Function: GitHub OAuth for Decap CMS
export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname

  // --- /api/oauth/auth: redirect to GitHub ---
  if (path.endsWith('/auth')) {
    // Read provider & scope from Decap CMS query params
    const provider = url.searchParams.get('provider') || 'github'
    const scope = url.searchParams.get('scope') || 'repo'
    const redirectUri = url.origin + '/api/oauth/callback'
    const state = crypto.randomUUID()

    const githubUrl =
      'https://github.com/login/oauth/authorize?client_id=' +
      encodeURIComponent(env.GITHUB_CLIENT_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&scope=' + encodeURIComponent(scope + ' user') +
      '&state=' + encodeURIComponent(state)

    // Return HTML with JS redirect to preserve window.opener
    const html =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting to GitHub...</title></head><body>' +
      '<script>window.location.replace(' + JSON.stringify(githubUrl) + ');</script></body></html>'

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'oauth_state=' + state + '; Path=/; HttpOnly; SameSite=Lax; Max-Age=300; Secure',
      },
    })
  }

  // --- /api/oauth/callback: exchange code for token, then handshake via postMessage ---
  if (path.endsWith('/callback')) {
    const code = url.searchParams.get('code')
    if (!code) {
      return new Response('Missing code', { status: 400 })
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })

    const tokenData = await tokenRes.json()
    if (tokenData.error || !tokenData.access_token) {
      return new Response('OAuth error: ' + JSON.stringify(tokenData), { status: 400 })
    }

    const token = tokenData.access_token

    // Decap CMS NetlifyAuthenticator expects a two-way postMessage handshake:
    //   1. Popup posts "authorizing:github"  →  opener
    //   2. Opener replies "authorizing:github"  →  popup
    //   3. Popup posts "authorization:github:success:{json}"  →  opener
    //
    // If window.opener is null, fall back to redirecting to admin with hash token.
    const provider = 'github'
    const successPayload = JSON.stringify({ token, provider })
    const adminUrl = url.origin + '/admin/'

    const html =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Logged in!</title></head><body>' +
      '<p id="msg">Step 0: Starting...</p>' +
      '<script>' +
      '(function(){' +
      'var msg = document.getElementById("msg");' +
      'msg.textContent = "Step 1: Got token from GitHub";' +
      'var token = ' + JSON.stringify(token) + ';' +
      'var provider = ' + JSON.stringify(provider) + ';' +
      'var payload = ' + JSON.stringify(successPayload) + ';' +
      'var opener = window.opener;' +
      'msg.textContent = "Step 2: opener=" + (opener ? "exists" : "null");' +
      'if (opener) {' +
      '  msg.textContent = "Step 3: posting authorizing:github to opener";' +
      '  opener.postMessage("authorizing:" + provider, "*");' +
      '  msg.textContent = "Step 4: waiting for ack from opener...";' +
      '  var onMessage = function(e) {' +
      '    msg.textContent = "Step 5: received message from opener: " + e.data.substring(0,50);' +
      '    if (e.data === "authorizing:" + provider) {' +
      '      window.removeEventListener("message", onMessage, false);' +
      '      msg.textContent = "Step 6: ack received, sending token...";' +
      '      opener.postMessage("authorization:" + provider + ":success:" + payload, "*");' +
      '      msg.textContent = "Step 7: token sent, closing popup";' +
      '      setTimeout(function() { window.close(); }, 500);' +
      '    }' +
      '  };' +
      '  window.addEventListener("message", onMessage, false);' +
      '  // Timeout: redirect to admin with token in hash as fallback' +
      '  setTimeout(function() {' +
      '    msg.textContent = "Step 8: handshake timeout, using hash fallback...";' +
      '    window.location.replace(' + JSON.stringify(adminUrl) + ' + "#access_token=" + encodeURIComponent(token) + "&provider=" + provider);' +
      '  }, 8000);' +
      '} else {' +
      '  msg.textContent = "No opener found. Redirecting to admin with token...";' +
      '  window.location.replace(' + JSON.stringify(adminUrl) + ' + "#access_token=" + encodeURIComponent(token) + "&provider=" + provider);' +
      '}' +
      '})();' +
      '</script></body></html>'

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new Response('Not found. Try /auth or /callback', { status: 404 })
}
