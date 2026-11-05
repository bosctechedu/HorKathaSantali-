// TEMP diagnostic: lists binding/variable NAMES only (never values). Remove after check.
export const onRequestGet = async ({ env }: { env: Record<string, unknown> }) =>
  new Response(JSON.stringify(Object.keys(env).map((k) => JSON.stringify(k) + ':' + typeof (env as any)[k])), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
