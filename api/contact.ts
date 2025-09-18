// api/contact.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function s(v?: unknown) {
  return (typeof v === "string" ? v : "").trim();
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const name = s(body.name);
    const email = s(body.email);
    const phone = s(body.phone);
    const company = s(body.company);
    const employees = s(body.employees);
    const offer = s(body.offer);
    const message = s(body.message);
    const honeypot = s(body.website); // champ anti-spam (ne pas afficher côté UI)

    if (honeypot) return res.status(200).json({ ok: true, message: "Thanks!" });

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: "Champs obligatoires manquants." });
    }

    const toList = (process.env.CONTACT_TO || "")
      .split(",").map(e => e.trim()).filter(Boolean);
    if (toList.length === 0) {
      return res.status(500).json({ ok: false, message: "CONTACT_TO manquant côté serveur." });
    }

    const subject = `📥 Nouveau message QVT Box — ${name}${company ? " ("+company+")" : ""}`;

    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.6;color:#111;">
        <h2>Nouveau message depuis le site QVT Box</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
        ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ""}
        ${employees ? `<p><strong>Effectif :</strong> ${employees}</p>` : ""}
        ${offer ? `<p><strong>Offre :</strong> ${offer}</p>` : ""}
        <hr />
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `.trim();

    const text =
      `Nouveau message QVT Box\n` +
      `Nom: ${name}\n` +
      `Email: ${email}\n` +
      (phone ? `Téléphone: ${phone}\n` : "") +
      (company ? `Entreprise: ${company}\n` : "") +
      (employees ? `Effectif: ${employees}\n` : "") +
      (offer ? `Offre: ${offer}\n` : "") +
      `\n---\n${message}`;

    const result = await resend.emails.send({
      from: "QVT Box <onboarding@resend.dev>", // changera en contact@qvtbox.fr après vérif domaine
      to: toList,
      subject,
      html,
      text,
      reply_to: email,
    });

    if ((result as any).error) {
      return res.status(500).json({ ok: false, message: "Échec d’envoi", details: (result as any).error });
    }
    return res.status(200).json({ ok: true, message: "Message envoyé." });
  } catch (err: any) {
    return res.status(500).json({ ok: false, message: err?.message || "Erreur serveur" });
  }
}
