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

// --- New status email templates ---

function dancerSubmissionReceivedEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">We received your submission!</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;">Thank you for submitting your entry to <strong style="color:${COLORS.goldLight};">Pulsate 2026</strong>. We're thrilled to see your passion for dance.</p>
    <p style="margin:0 0 24px;">Our team will carefully review your submission and you'll hear back from us soon. In the meantime, keep moving!</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function dancerUnderReviewEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">Your submission is under review</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;">Great news — your video is currently being reviewed by our panel of judges.</p>
    <p style="margin:0 0 24px;">Sit tight, we'll be in touch once the review is complete. We appreciate your patience.</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function dancerSelectedEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">You've been selected 🎬</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;"><strong style="color:${COLORS.goldLight};">Congratulations!</strong> You've been selected to be part of the <strong style="color:${COLORS.goldLight};">Pulsate 2026</strong> film.</p>
    <p style="margin:0 0 24px;">More details about next steps, scheduling, and what to expect will be coming your way soon. Get ready to shine.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr><td style="background:linear-gradient(135deg,${COLORS.gold},${COLORS.goldDark});padding:14px 32px;border-radius:50px;text-align:center;">
        <a href="https://pulsateproject.ca" style="color:${COLORS.cream};font-size:14px;font-weight:600;text-decoration:none;display:inline-block;">Visit Pulsate →</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function dancerNotSelectedEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">Thank you for your submission</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;">Thank you sincerely for sharing your talent with us. After careful review, we weren't able to include your entry in this year's film.</p>
    <p style="margin:0 0 24px;">Please know that this doesn't diminish your artistry — you are still very much a part of the Pulsate community, and we truly hope to see you again in future projects.</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function judgeInvitationEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">You're invited to be a Pulsate judge</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;">We'd love to have you as part of our review panel for <strong style="color:${COLORS.goldLight};">Pulsate 2026</strong>.</p>
    <p style="margin:0 0 24px;">Your expertise and eye for talent would be invaluable. Simply reply to this email to confirm your participation, and we'll send you all the details.</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function judgeConfirmedEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">Welcome to the Pulsate judging panel</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;">You're officially confirmed as a judge for <strong style="color:${COLORS.goldLight};">Pulsate 2026</strong>. We're thrilled to have you on board.</p>
    <p style="margin:0 0 24px;">Details, schedules, and review materials will be sent your way soon. Thank you for being part of this journey.</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function vendorKitSentEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">Your sponsor kit is on its way</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;">Your <strong style="color:${COLORS.goldLight};">Pulsate sponsor kit</strong> has been sent. It includes everything you need to know about our partnership opportunities.</p>
    <p style="margin:0 0 24px;">If you have any questions, don't hesitate to reach out — we'd love to chat.</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

function vendorConfirmedEmail(name: string) {
  return brandedEmailTemplate(`
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">Welcome aboard — partnership confirmed</h1>
    <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
    <p style="margin:0 0 16px;">We're thrilled to officially welcome you as a partner for <strong style="color:${COLORS.goldLight};">Pulsate 2026</strong>.</p>
    <p style="margin:0 0 24px;">Your details will be featured in our materials, and we'll be in touch with next steps shortly. Thank you for believing in this project.</p>
    <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
  `);
}

// Map of status email types to their config
const STATUS_EMAIL_MAP: Record<string, { subject: string; html: (name: string) => string; recipientType: string }> = {
  "dancer-submission-received": { subject: "We received your submission — Pulsate", html: dancerSubmissionReceivedEmail, recipientType: "dancer" },
  "dancer-under-review": { subject: "Your submission is under review — Pulsate", html: dancerUnderReviewEmail, recipientType: "dancer" },
  "dancer-selected": { subject: "You've been selected 🎬 — Pulsate", html: dancerSelectedEmail, recipientType: "dancer" },
  "dancer-not-selected": { subject: "Thank you for your submission — Pulsate", html: dancerNotSelectedEmail, recipientType: "dancer" },
  "judge-invitation": { subject: "You're invited to be a Pulsate judge", html: judgeInvitationEmail, recipientType: "judge" },
  "judge-confirmed": { subject: "Welcome to the Pulsate judging panel", html: judgeConfirmedEmail, recipientType: "judge" },
  "vendor-kit-sent": { subject: "Your Pulsate sponsor kit is on its way", html: vendorKitSentEmail, recipientType: "vendor" },
  "vendor-confirmed": { subject: "Welcome aboard — partnership confirmed", html: vendorConfirmedEmail, recipientType: "vendor" },
};

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

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const sendEmail = async (to: string[], subject: string, html: string): Promise<string | null> => {
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
      const data = await res.json();
      return data?.id || null;
    };

    const logEmail = async (recipientEmail: string, recipientType: string, emailType: string, status: string, resendId: string | null) => {
      await fetch(`${SUPABASE_URL}/rest/v1/email_log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ recipient_email: recipientEmail, recipient_type: recipientType, email_type: emailType, status, resend_id: resendId }),
      });
    };

    // Handle new status email types
    const statusConfig = STATUS_EMAIL_MAP[source];
    if (statusConfig) {
      let resendId: string | null = null;
      try {
        resendId = await sendEmail([email], statusConfig.subject, statusConfig.html(name));
        await logEmail(email, statusConfig.recipientType, source, "sent", resendId);
      } catch (e) {
        await logEmail(email, statusConfig.recipientType, source, "failed", null);
        throw e;
      }

      return new Response(JSON.stringify({ success: true, resend_id: resendId }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Existing: contact form
    if (source === "contact") {
      await sendEmail(
        ["pattyisabelle@hotmail.fr"],
        `Pulsate Contact: ${name || "No name"}`,
        contactNotifyTeamEmail(name, email, message)
      );
      await sendEmail(
        [email],
        "We received your message — Pulsate",
        contactConfirmEmail(name)
      );
    }
    // Existing: status-update (legacy from admin panels)
    else if (source === "status-update") {
      await sendEmail(
        [email],
        "Status Update — Pulsate",
        brandedEmailTemplate(`
          <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:${COLORS.goldLight};">Status Update</h1>
          <p style="margin:0 0 16px;">Hi ${name || "there"},</p>
          <p style="margin:0 0 24px;">${message}</p>
          <p style="margin:0;color:${COLORS.creamMuted};font-size:13px;">— The Pulsate Team</p>
        `)
      );
    }
    // Existing: newsletter signups
    else {
      const sourceLabel = SOURCE_LABELS[source] || "Pulsate Updates";

      await sendEmail(
        [email],
        `You're on the list — ${sourceLabel}`,
        notifyUserEmail(sourceLabel)
      );
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
