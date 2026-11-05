// Tolerate accidental spaces in Cloudflare variable/binding names (e.g. " BREVO_API_KEY", "HK_DB ").
export const onRequest = async (ctx: { env: Record<string, unknown>; next: () => Promise<Response> }) => {
  const env = ctx.env;
  for (const k of Object.keys(env)) {
    const t = k.trim();
    if (t !== k && !(t in env)) {
      try { env[t] = env[k]; } catch { /* ignore */ }
    }
  }
  return ctx.next();
};
