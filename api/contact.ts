// /api/contact.ts (Edge Function - pas de dépendances)
// Envoie un email via Resend (API HTTP) avec les données du formulaire.

export const config = { runtime: "edge" };

function json(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

export default async function handler(req: Request) {
  // CORS/preflight — utile si jamais tu appelles depuis un autre domaine
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405, {
      "access-control-allow-origin": "*",
    });
  }

  try {
    const data = await req.json();

    const nom = (data?.nom ?? "").toString().trim();
    const email = (data?.email ?? "").toString().trim();
    const entreprise = (data?.entreprise ?? "").toString().trim();
    const telephone = (data?.telephone ?? "").toString().trim();
    const taille = (data?.taille_effectif ?? "").toString().trim();
    const offre = (data?.type_offre ?? "").toString().trim();
    const message = (data?.message ?? "").toString().trim();

    if (!nom || !email || !message) {
      return json(
        { ok: false, error: "Champs requis manquants (nom, email, message)" },
        400,
        { "access-control-allow-origin": "*" }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return json(
        { ok: false, error: "RESEND_API_KEY manquante dans les variables d'env Vercel" },
        500,
        { "access-control-allow-origin": "*" }
      );
    }

    const toList = (process.env.CONTACT_TO || "lamia.brechet@outlook.fr,contact@qvtbox.fr")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const subject = `Nouveau contact QVT Box — ${entreprise || nom}`;

    const text = `
Nouveau message de contact :

Nom : ${nom}
Email : ${email}
Entreprise : ${entreprise || "-"}
Téléphone : ${telephone || "-"}
Effectif : ${taille || "-"}
Offre : ${offre || "-"}

Message :
${message}
`.trim();

    const html = `
  <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111">
    <h2 style="margin:0 0 12px 0;">Nouveau message de contact</h2>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Entreprise :</strong> ${entreprise || "-"}</p>
    <p><strong>Téléphone :</strong> ${telephone || "-"}</p>
    <p><strong>Effectif :</strong> ${taille || "-"}</p>
    <p><strong>Offre :</strong> ${offre || "-"}</p>
    <hr/>
    <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
  </div>
`.trim();

    // Appel API Resend (REST)
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "QVT Box <onboarding@resend.dev>", // Remplace par un domaine vérifié quand dispo (ex: contact@qvtbox.fr)
        to: toList,
        subject,
        html,
        text,
        reply_to: email, // pour répondre directement au prospect
      }),
    });

    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      return json(
        { ok: false, error: "Resend error", details: err },
        500,
        { "access-control-allow-origin": "*" }
      );
    }

    return json({ ok: true }, 200, { "access-control-allow-origin": "*" });
  } catch (e: any) {
    return json(
      { ok: false, error: e?.message || "Erreur inconnue" },
      500,
      { "access-control-allow-origin": "*" }
    );
  }
}
