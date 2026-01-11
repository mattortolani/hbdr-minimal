// Cloudflare Pages Function - handles contact form submissions
// This runs on Cloudflare's edge network

export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

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
        {
          status: 400,
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        '<div class="message message-error">Please enter a valid email address.</div>',
        {
          status: 400,
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }

    // Here you would typically:
    // 1. Store in a database (Cloudflare D1, KV, etc.)
    // 2. Send an email notification (via SendGrid, Resend, etc.)
    // 3. Send to a CRM or webhook

    // Example: Store in Cloudflare KV (if configured)
    // await context.env.CONTACTS_KV.put(
    //   `contact_${Date.now()}`,
    //   JSON.stringify(data)
    // );

    // Example: Send to webhook
    // await fetch('https://your-webhook-url.com', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    console.log('Contact form submission:', data);

    // Return success HTML (HTMX will swap this into #form-result)
    return new Response(
      `<div class="message message-success">
        Thanks ${data.firstName}! We'll be in touch within 24 hours.
      </div>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      '<div class="message message-error">Something went wrong. Please try again.</div>',
      {
        status: 500,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}
