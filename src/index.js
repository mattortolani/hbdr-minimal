// Cloudflare Worker - handles API routes
// Static assets are served automatically via wrangler.toml [assets]

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request);
    }

    // For all other routes, let the asset handler serve static files
    // This is handled automatically by Cloudflare when [assets] is configured
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request) {
  try {
    const formData = await request.formData();

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      company: formData.get('company'),
      pageviews: formData.get('pageviews'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
    };

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return new Response(
        '<div class="message message-error">Please fill in all required fields.</div>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        '<div class="message message-error">Please enter a valid email address.</div>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Log submission (in production, send to database/email/webhook)
    console.log('Contact form submission:', data);

    // Return success HTML for HTMX to swap in
    return new Response(
      `<div class="message message-success">Thanks ${data.firstName}! We'll be in touch within 24 hours.</div>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      '<div class="message message-error">Something went wrong. Please try again.</div>',
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
