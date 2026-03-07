const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LOGO_URL = "https://enwubitgmheawkeanqag.supabase.co/storage/v1/object/public/assets/pulsate-logo.png";

// Brand colors from index.css
const COLORS = {
  gold: "#a5845b",
  goldLight: "#d4b88c",
  goldDark: "#5c4122",
  warmDark: "#1a1510",
  warmDarkLight: "#241e17",
  cream: "#f0e6d4",
  creamMuted: "#9e8d76",
  border: "#332c24",
};

function brandedEmailTemplate(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
    <tr><td align="center" style="padding:24px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${COLORS.warmDark};border-radius:16px;overflow:hidden;border:1px solid ${COLORS.border};">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,${COLORS.warmDarkLight},${COLORS.warmDark});padding:32px 40px;text-align:center;border-bottom:1px solid ${COLORS.border};">
          <img src="${LOGO_URL}" alt="Pulsate" width="140" style="display:block;margin:0 auto;height:auto;" />
        </td></tr>

        <!-- Gold accent line -->
        <tr><td style="height:3px;background:linear-gradient(to right,${COLORS.goldDark},${COLORS.gold},${COLORS.goldLight},${COLORS.gold},${COLORS.goldDark});"></td></tr>

        <!-- Content -->
        <tr><td style="padding:40px 40px 32px;color:${COLORS.cream};font-size:15px;line-height:1.7;">
          ${content}
        </td></tr>

        <!-- Gold accent line -->
        <tr><td style="height:1px;background:linear-gradient(to right,transparent,${COLORS.gold}40,transparent);"></td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px 32px;text-align:center;">
          <p style="margin:0 0 8px;color:${COLORS.creamMuted};font-size:12px;">© 2026 Pulsate Project. All rights reserved.</p>
          <p style="margin:0;color:${COLORS.creamMuted};font-size:12px;">321 Blvd Saint-Martin O, Laval, QC</p>
          <p style="margin:12px 0 0;">
            <a href="https://pulsateproject.ca" style="color:${COLORS.gold};font-size:12px;text-decoration:none;">pulsateproject.ca</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function notifyUserEmail(sourceLabel: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">You're on the list! 🎬</h1>
    <p style="margin:0 0 16px;">Thank you for signing up for <strong style="color:${COLORS.goldLight};">${sourceLabel}</strong>.</p>
    <p style="margin:0 0 24px;">We'll send you updates as soon as there's news. In the meantime, feel the rhythm.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr><td style="background:linear-gradient(135deg,${COLORS.gold},${COLORS.goldDark});padding:14px 32px;border-radius:50px;text-align:center;">
        <a href="https://pulsateproject.ca" style="color:${COLORS.cream};font-size:14px;font-weight:600;text-decoration:none;display:inline-block;">Visit Pulsate →</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function contactConfirmEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">Thank you for reaching out!</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 24px;">We received your message and our team will get back to you soon. We appreciate you taking the time to connect with us.</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function contactNotifyTeamEmail(name: string, email: string, message: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">New Contact Message</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
      <tr><td style="padding:8px 0;color:${COLORS.creamMuted};font-size:13px;width:80px;vertical-align:top;">Name</td>
          <td style="padding:8px 0;color:${COLORS.cream};font-size:14px;font-weight:600;">${name || "N/A"}</td></tr>
      <tr><td style="padding:8px 0;color:${COLORS.creamMuted};font-size:13px;width:80px;vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${email}" style="color:${COLORS.gold};font-size:14px;text-decoration:none;">${email}</a></td></tr>
    </table>
    <div style="background:${COLORS.warmDarkLight};border:1px solid ${COLORS.border};border-radius:12px;padding:20px;margin:16px 0 0;">
      <p style="margin:0 0 8px;color:${COLORS.creamMuted};font-size:11px;text-transform:uppercase;letter-spacing:2px;">Message</p>
      <p style="margin:0;color:${COLORS.cream};font-size:14px;line-height:1.7;">${message || "No message provided"}</p>
    </div>
  `);
}

function signupNotifyTeamEmail(email: string, source: string, sourceLabel: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">New Signup 🎉</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:8px 0;color:${COLORS.creamMuted};font-size:13px;width:80px;vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${email}" style="color:${COLORS.gold};font-size:14px;text-decoration:none;">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:${COLORS.creamMuted};font-size:13px;width:80px;vertical-align:top;">Source</td>
          <td style="padding:8px 0;color:${COLORS.cream};font-size:14px;font-weight:600;">${sourceLabel}</td></tr>
      <tr><td style="padding:8px 0;color:${COLORS.creamMuted};font-size:13px;width:80px;vertical-align:top;">ID</td>
          <td style="padding:8px 0;color:${COLORS.creamMuted};font-size:12px;font-family:monospace;">${source}</td></tr>
    </table>
  `);
}

const SOURCE_LABELS: Record<string, string> = {
  "footer-newsletter": "Pulsate Updates",
  "competition-notify": "Competition Registration",
  "workshop-notify": "Workshop Updates",
  "premiere-notify": "Premiere Tickets",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source, name, message } = await req.json();

    if (!email || !source) {
      return new Response(JSON.stringify({ error: "Email and source are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const sendEmail = async (to: string[], subject: string, html: string) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: "Pulsate <noreply@mail.pulsateproject.ca>",
          reply_to: "pattyisabelle@hotmail.fr",
          to,
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Resend error: ${err}`);
      }
      return res;
    };

    if (source === "contact") {
      // Send branded notification to team
      await sendEmail(
        ["pattyisabelle@hotmail.fr"],
        `Pulsate Contact: ${name || "No name"}`,
        contactNotifyTeamEmail(name, email, message)
      );
      // Send branded confirmation to user
      await sendEmail(
        [email],
        "We received your message — Pulsate",
        contactConfirmEmail(name)
      );
    } else {
      const sourceLabel = SOURCE_LABELS[source] || "Pulsate Updates";

      // Send branded confirmation to user
      await sendEmail(
        [email],
        `You're on the list — ${sourceLabel}`,
        notifyUserEmail(sourceLabel)
      );
      // Send branded notification to team
      await sendEmail(
        ["pattyisabelle@hotmail.fr"],
        `New signup: ${sourceLabel}`,
        signupNotifyTeamEmail(email, source, sourceLabel)
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
