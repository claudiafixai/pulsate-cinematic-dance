const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source, name, message } = await req.json();

    if (!email || !source) {
      return new Response(JSON.stringify({ error: 'Email and source are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    // Determine email content based on source
    let subject: string;
    let htmlBody: string;

    if (source === 'contact') {
      // Send contact message to the team
      subject = `Pulsate Contact: ${name || 'No name'}`;
      htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${message || 'No message'}</p>
        </div>
      `;

      // Send to team
      const teamRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Pulsate <noreply@mail.pulsateproject.ca>',
          reply_to: 'pattyisabelle.@hotmail.fr',
          to: ['pattyisabelle.@hotmail.fr'],
          subject,
          html: htmlBody,
        }),
      });

      if (!teamRes.ok) {
        const err = await teamRes.text();
        throw new Error(`Resend error: ${err}`);
      }

      // Send confirmation to user
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Pulsate <noreply@mail.pulsateproject.ca>',
          reply_to: 'pattyisabelle.@hotmail.fr',
          to: [email],
          subject: 'We received your message — Pulsate',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #c9a84c;">Thank you for reaching out!</h2>
              <p>Hi ${name || 'there'},</p>
              <p>We received your message and will get back to you soon.</p>
              <p style="color: #888;">— The Pulsate Team</p>
            </div>
          `,
        }),
      });
    } else {
      // Newsletter / notification signup — send welcome email
      const sourceLabels: Record<string, string> = {
        'footer-newsletter': 'Pulsate Updates',
        'competition-notify': 'Competition Registration',
        'workshop-notify': 'Workshop Updates',
        'premiere-notify': 'Premiere Tickets',
      };

      subject = `You're on the list — ${sourceLabels[source] || 'Pulsate'}`;
      htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">Welcome to Pulsate! 🎬</h2>
          <p>You've signed up for <strong>${sourceLabels[source] || 'Pulsate updates'}</strong>.</p>
          <p>We'll notify you as soon as there's news. Stay tuned!</p>
          <p style="color: #888; margin-top: 24px;">— The Pulsate Team</p>
        </div>
      `;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Pulsate <noreply@mail.pulsateproject.ca>',
          reply_to: 'pattyisabelle.@hotmail.fr',
          to: [email],
          subject,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Resend error: ${err}`);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
