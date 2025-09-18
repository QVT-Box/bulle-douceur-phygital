// /api/contact.ts
// Vercel Serverless Function (Web standard runtime)
// Envoi d'un email HTML via Resend pour la demande de devis

type Body = {
  company?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  employeeCount?: string;
  perEmployeeBudget?: number | string;
  totalBudget?: number | string;
  offerType?: string;
  needs?: string[];
  internationalShipping?: boolean;
  message?: string;
};

const CONTACT_TO = process.env.CONTACT_TO || "";
const CONTACT_CC = process.env.CONTACT_CC || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

function htmlEscape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]!));
}

function emailTemplate(data: Required<Pick<Body, "company"|"fullName"|"email"|"phone"|"employeeCount"|"offerType">> & Body) {
  const rows: Array<[string, string]> = [
    ["Entreprise", data.company],
    ["Nom / Prénom", data.fullName],
    ["Email", `<a href="mailto:${htmlEscape(data.email)}">${htmlEscape(data.email)}</a>`],
    ["Téléphone", htmlEscape(data.phone)],
    ["Effectif estimé", htmlEscape(data.employeeCount)],
    ["Type d’offre", htmlEscape(data.offerType)],
  ];

  if (data.perEmployeeBudget) {
    rows.push(["Budget / salarié", `${htmlEscape(String(data.perEmployeeBudget))} €`]);
  }
  if (data.totalBudget) {
    rows.push(["Budget total", `${htmlEscape(String(data.totalBudget))} €`]);
  }
  if (data.needs?.length) {
    rows.push(["Besoins identifiés", htmlEscape(data.needs.join(", "))]);
  }
  rows.push(["International", data.internationalShipping ? "Oui" : "Non"]);

  const detailsTable = `
  <table style="width:100%;border-collapse:collapse;margin-top:8px">
    <tbody>
      ${rows.map(([k,v]) => `
        <tr>
          <td style="padding:10px;border:1px solid #eee;background:#fafafa;font-weight:600;width:40%">${k}</td>
          <td style="padding:10px;border:1px solid #eee">${v}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>`;

  const messageBlock = data.message
    ? `
      <h3 style="margin:24px 0 8px 0;font-family:Inter,Arial,sans-serif">Message</h3>
      <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#fff">
        <p style="white-space:pre-wrap;margin:0;font-family:Inter,Arial,sans-serif;color:#111">
          ${htmlEscape(data.message)}
        </p>
      </div>
    `
    : "";

  return `
  <div style="font-family:Inter,Arial,sans-serif;color:#111;background:#f6f7fb;padding:24px">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #eee;border-radius:12px;overflow:hidden">
      <div style="padding:20px 24px;border-bottom:1px solid #f0f0f0;background:linear-gradient(135deg,#f5f3ff,#faf5ff)">
        <h2 style="margin:0;font-size:18px">Nouvelle demande de devis / démo</h2>
        <p style="margin:6px 0 0 0;color:#6b7280;font-size:13px">QVT Box — Formulaire Contact</p>
      </div>
      <div style="padding:20px 24px">
        <h3 style="margin:0 0 8px 0;font-size:16px">Résumé</h3>
        ${detailsTable}
        ${messageBlock}
      </div>
      <div style="padding:16px 24px;border-top:1px solid #f0f0f0;color:#6b7280;font-size:12px">
        Email automatique — merci de répondre directement à l’expéditeur si nécessaire.
      </div>
    </div>
  </div>
  `;
}

function textTemplate(data: Body) {
  const lines = [
    `Nouvelle demande de devis / démo — QVT Box`,
    `--------------------------------------------------`,
    `Entreprise: ${data.company || ""}`,
    `Nom / Prénom: ${data.fullName || ""}`,
    `Email: ${data.email || ""}`,
    `Téléphone: ${data.phone || ""}`,
    `Effectif estimé: ${data.employeeCount || ""}`,
    `Offre: ${data.offerType || ""}`,
    `Budget / salarié: ${data.perEmployeeBudget || ""} €`,
    `Budget total: ${data.totalBudget || ""} €`,
    `Besoins: ${(data.needs || []).join(", ")}`,
    `International: ${data.internationalShipping ? "Oui" : "Non"}`,
    ``,
    `Message:`,
    `${data.message || ""}`,
  ];
  return lines.join("\n");
}

async function sendWithResend(subject: string, html: string, text: string) {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY manquant");
  if (!CONTACT_TO) throw new Error("CONTACT_TO manquant");

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "QVT Box <no-reply@mail.qvtbox.fr>",
      to: [CONTACT_TO],
      cc: CONTACT_CC ? [CONTACT_CC] : undefined,
      subject,
      html,
      text,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text().catch(() => "");
    throw new Error(`Resend error: ${resp.status} ${err}`);
  }
  return resp.json();
}

export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
        headers: { "content-type": "application/json" },
      });
    }

    const body = (await req.json()) as Body;

    // Validation minimale
    const required = ["company", "fullName", "email", "employeeCount", "offerType"] as const;
    const missing = required.filter((k) => !body[k] || String(body[k]).trim() === "");
    if (missing.length) {
      return new Response(
        JSON.stringify({ ok: false, error: `Champs manquants: ${missing.join(", ")}` }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const subject = `Devis/Démo — ${body.company} • ${body.offerType}`;
    const html = emailTemplate({
      company: body.company!.trim(),
      fullName: body.fullName!.trim(),
      email: body.email!.trim(),
      phone: (body.phone || "").trim(),
      employeeCount: body.employeeCount!.trim(),
      offerType: body.offerType!.trim(),
      needs: body.needs || [],
      internationalShipping: !!body.internationalShipping,
      perEmployeeBudget: body.perEmployeeBudget ?? "",
      totalBudget: body.totalBudget ?? "",
      message: body.message || "",
    });
    const text = textTemplate(body);

    // Envoi
    await sendWithResend(subject, html, text);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Erreur inconnue" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
