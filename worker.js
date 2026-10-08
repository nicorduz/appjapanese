// Cloudflare Worker — proxy para GROQ (gratis) · app de estudio de japonés
// El secreto OPENAI_API_KEY contiene tu clave de Groq (gsk_...). APP_TOKEN es opcional.
// Lo ÚNICO que cambia frente a la versión de OpenAI es la constante API_URL de abajo.

const ALLOW_ORIGIN = "*"; // opcional: pon "https://TU-USUARIO.github.io"
const API_URL = "https://api.groq.com/openai/v1/chat/completions"; // <-- ÚNICA línea que cambia (antes: https://api.openai.com/v1/chat/completions)

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
    if (req.method !== "POST")   return cors(text("Usa POST", 405));

    if (env.APP_TOKEN && req.headers.get("x-app-token") !== env.APP_TOKEN) {
      return cors(json({ error: { message: "token inválido" } }, 401));
    }
    if (!env.OPENAI_API_KEY) {
      return cors(json({ error: { message: "Falta el secreto OPENAI_API_KEY (tu clave de Groq)" } }, 500));
    }

    let body;
    try { body = await req.json(); }
    catch { return cors(json({ error: { message: "JSON inválido" } }, 400)); }

    const payload = {
      model: body.model || "llama-3.3-70b-versatile",
      messages: Array.isArray(body.messages) ? body.messages : [],
      temperature: typeof body.temperature === "number" ? body.temperature : 0.4,
      max_tokens: typeof body.max_tokens === "number" ? body.max_tokens : 700,
    };

    // Reintento corto si el proveedor va saturado (429 o 5xx): así casi nunca falla por "alto tráfico".
    let r, out;
    for (let i = 0; i < 2; i++) {
      r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + env.OPENAI_API_KEY },
        body: JSON.stringify(payload),
      });
      out = await r.text();
      if (r.status !== 429 && r.status < 500) break;
      await new Promise(s => setTimeout(s, 700));
    }

    return cors(new Response(out, { status: r.status, headers: { "Content-Type": "application/json" } }));
  },
};

function cors(res) {
  res.headers.set("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, x-app-token");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Max-Age", "86400");
  return res;
}
function json(o, s) { return new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } }); }
function text(t, s) { return new Response(t, { status: s, headers: { "Content-Type": "text/plain" } }); }
