// GET /api/slide-img/:id → slider photo (public, cached)
import { Ctx } from '../../../api-lib/auth';

export const onRequestGet = async ({ env, params }: Ctx) => {
  const id = String(params?.id || '');
  if (!env.HK_DB?.getWithMetadata || !/^[A-Za-z0-9_-]{1,60}$/.test(id)) return new Response('Not found', { status: 404 });
  const { value, metadata } = await env.HK_DB.getWithMetadata(`slideimg:${id}`, 'arrayBuffer');
  if (!value) return new Response('Not found', { status: 404 });
  return new Response(value, {
    headers: {
      'content-type': metadata?.type || 'image/jpeg',
      'cache-control': 'public, max-age=31536000, immutable', // URL changes (?v=) when the photo changes
      'x-content-type-options': 'nosniff',
    },
  });
};
