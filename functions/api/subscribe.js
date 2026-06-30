/// <reference types="@cloudflare/workers-types" />

// Pages Function: POST /api/subscribe
// Validates input, adds contact to Resend audience, sends welcome email

const RESEND_API_KEY='YOUR_R..._KEY'
export async function onRequest(context) {
  const request = context.request
  const env = context.env

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.json()
  const { email, name, turnstileToken } = formData

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Verify Turnstile
  if (turnstileToken && env.TURNSTILE_SECRET) {
    const turnstileResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: turnstileToken,
      }),
    })
    const turnstileResult = await turnstileResp.json()
    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ error: 'Bot detected' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // Add contact to Resend audience
  const apiKey = env.RESEND_API_KEY || RESEND_API_KEY
  const AUDIENCE_ID = '8642485b-ad7c-498d-a00d-10db8dbbf100'

  await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      first_name: name || '',
      unsubscribed: false,
    }),
  })

  // Send welcome email (inline HTML)
  const welcomeHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Inter,sans-serif;line-height:1.6;color:#111;max-width:560px;margin:0 auto;padding:32px 24px}h1{font-family:Plus Jakarta Sans,sans-serif;font-size:28px;color:#111}.brand{color:#FF4C1E}</style></head><body><div class="brand" style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.3px;margin-bottom:8px">Analisia Blog</div><h1>Welcome to the weekly digest.</h1><p>Thanks for subscribing' + (name ? ", " + name : "") + '.</p><p>Every Tuesday morning, you will get one tactical breakdown from our team — bidding strategies, creative tests, analytics frameworks — pulled from real client accounts.</p><p>See you Tuesday.</p><p style="color:#666;font-size:13px;margin-top:32px">Analisia Team</p></body></html>'
  const sendEmailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Analisia Blog <newsletter@blog.analisia.id>',
      to: [email],
      subject: 'Welcome to the Analisia weekly digest',
      html: welcomeHtml,
    }),
  })

  if (!sendEmailRes.ok) {
    const err = await sendEmailRes.text()
    console.error('Resend send email error:', err)
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
