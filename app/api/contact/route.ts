import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_CUSTOMER = "Fresh Cut Sod <contact@freshcutsodfarms.com>";
const FROM_ADMIN = "Fresh Cut Sod <hello@freshcutsodfarms.com>";
const ADMIN_EMAIL = "contact@freshcutsodfarms.com";

// ── Branded confirmation email sent to the customer ───────────────────────────
function customerEmailHtml(data: {
  name: string;
  variety?: string;
  format?: string;
  sqft?: string;
  message?: string;
}) {
  const hasQuote = data.variety || data.sqft;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We Got Your Request</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a3a2a;border-radius:24px 24px 0 0;padding:40px 48px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:900;letter-spacing:0.35em;text-transform:uppercase;color:#d4a853;opacity:0.8;">Farm Direct</p>
            <h1 style="margin:0;font-size:36px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.03em;color:#ffffff;line-height:1.1;">
              FRESH CUT <span style="color:#d4a853;">SOD</span>
            </h1>
            <p style="margin:12px 0 0;font-size:12px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.2em;font-weight:700;">freshcutsodfarms.com</p>
          </td>
        </tr>

        <!-- Hero band -->
        <tr>
          <td style="background:#d4a853;padding:16px 48px;text-align:center;">
            <p style="margin:0;font-size:11px;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#1a3a2a;">
              ${hasQuote ? "✦ QUOTE REQUEST RECEIVED ✦" : "✦ INQUIRY RECEIVED ✦"}
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:48px 48px 32px;border-radius:0;">

            <h2 style="margin:0 0 8px;font-size:28px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.02em;color:#1a3a2a;line-height:1.2;">
              Hey ${data.name.split(" ")[0]},<br/>We&rsquo;re On It.
            </h2>
            <p style="margin:16px 0 32px;font-size:16px;color:#666;line-height:1.7;">
              ${hasQuote
                ? "Your sod quote request has landed with our farm team. We harvest fresh every morning and will reach out within <strong style='color:#1a3a2a;'>24 hours</strong> with a final price and delivery window."
                : "Your message has reached our team. A farm representative will be in touch within <strong style='color:#1a3a2a;'>24 hours</strong> to answer your questions."
              }
            </p>

            ${hasQuote ? `
            <!-- Quote summary box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9f7;border-radius:16px;margin-bottom:32px;overflow:hidden;">
              <tr><td style="padding:24px 28px;">
                <p style="margin:0 0 16px;font-size:10px;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#1a3a2a;opacity:0.5;">Your Quote Summary</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${data.variety ? `
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #e8ede8;">
                      <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1a3a2a;opacity:0.5;">Variety</span>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #e8ede8;text-align:right;">
                      <span style="font-size:14px;font-weight:900;color:#1a3a2a;">${data.variety}</span>
                    </td>
                  </tr>` : ""}
                  ${data.format ? `
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #e8ede8;">
                      <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1a3a2a;opacity:0.5;">Format</span>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #e8ede8;text-align:right;">
                      <span style="font-size:14px;font-weight:900;color:#1a3a2a;">${data.format}</span>
                    </td>
                  </tr>` : ""}
                  ${data.sqft ? `
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1a3a2a;opacity:0.5;">Coverage Needed</span>
                    </td>
                    <td style="padding:8px 0;text-align:right;">
                      <span style="font-size:14px;font-weight:900;color:#1a3a2a;">${Number(data.sqft).toLocaleString()} sq ft</span>
                    </td>
                  </tr>` : ""}
                </table>
              </td></tr>
            </table>
            ` : ""}

            <!-- What happens next -->
            <p style="margin:0 0 16px;font-size:10px;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#1a3a2a;opacity:0.5;">What Happens Next</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${["Our farm team reviews your request", "We confirm availability and delivery window", "You receive a final quote by email", "Sod is harvested same-day and delivered fresh"].map((step, i) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;vertical-align:top;">
                      <div style="width:24px;height:24px;background:#1a3a2a;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:900;color:#d4a853;">${i + 1}</div>
                    </td>
                    <td style="font-size:14px;color:#444;font-weight:500;line-height:1.5;padding-top:4px;">${step}</td>
                  </tr></table>
                </td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#f7f9f7;padding:32px 48px;text-align:center;">
            <a href="https://freshcutsodfarms.com/shop" style="display:inline-block;background:#1a3a2a;color:#ffffff;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;padding:16px 36px;border-radius:50px;">
              Browse Our Varieties
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a3a2a;padding:32px 48px;border-radius:0 0 24px 24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#d4a853;font-style:italic;">Fresh Cut Sod Farms</p>
            <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.4);">Harvested fresh. Delivered same-day.</p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);">freshcutsodfarms.com &nbsp;|&nbsp; Central Florida</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Internal notification email sent to the admin ─────────────────────────────
function adminEmailText(data: {
  name: string;
  email: string;
  phone?: string;
  zip?: string;
  message?: string;
  variety?: string;
  format?: string;
  sqft?: string;
}) {
  const lines = [
    `New ${data.variety || data.sqft ? "Quote Request" : "Inquiry"} — Fresh Cut Sod Farms`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.zip ? `Zip Code: ${data.zip}` : null,
    data.variety ? `Variety: ${data.variety}` : null,
    data.format ? `Format: ${data.format}` : null,
    data.sqft ? `Sq Ft Needed: ${Number(data.sqft).toLocaleString()} sq ft` : null,
    data.message ? `\nMessage:\n${data.message}` : null,
  ].filter(Boolean).join("\n");

  return lines;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, zip, message, variety, format, sqft } = body;

  console.log("Inquiry received:", { name, email, phone, zip, variety, format, sqft });

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const subject = variety || sqft
    ? `New Quote Request — ${variety ?? "Sod"} — ${sqft ? `${Number(sqft).toLocaleString()} sq ft` : ""}`
    : `New Inquiry from ${name}`;

  // ── Send both emails ──────────────────────────────────────────────────────────
  
  try {
    const [adminResult, customerResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADMIN,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject,
        text: adminEmailText({ name, email, phone, zip, message, variety, format, sqft }),
      }),
      resend.emails.send({
        from: FROM_CUSTOMER,
        to: email,
        subject: variety || sqft
          ? `Your Sod Quote Request — We'll Be In Touch Soon`
          : `We Received Your Message — Fresh Cut Sod Farms`,
        html: customerEmailHtml({ name, variety, format, sqft, message }),
      }),
    ]);

    // Handle Admin result
    if (adminResult.status === "fulfilled") {
      if (adminResult.value.error) {
        console.error("Resend API Error (Admin Email):", adminResult.value.error);
        return NextResponse.json({ error: "System failed to notify admin. Please try again." }, { status: 500 });
      }
      console.log("Admin notification sent successfully:", adminResult.value.data?.id);
    } else {
      console.error("Admin Email Delivery Failed (Promise Rejected):", adminResult.reason);
      return NextResponse.json({ error: "Inquiry delivery failed. Please try again." }, { status: 500 });
    }

    // Handle Customer result (non-blocking for the API response, but logged)
    if (customerResult.status === "fulfilled") {
      if (customerResult.value.error) {
        console.warn("Resend API Warning (Customer Confirmation):", customerResult.value.error);
      } else {
        console.log("Customer confirmation sent successfully:", customerResult.value.data?.id);
      }
    } else {
      console.warn("Customer Confirmation Failed (Promise Rejected):", customerResult.reason);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Unexpected error in contact API:", error);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
