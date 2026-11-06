// हर हिस्से (module) का अपना link: /m/<id>। src/data/routes.ts, public/sitemap.xml, public/robots.txt बनाता है।
// चलाएँ: node scripts/gen-routes.mjs
import fs from 'node:fs';
const SITE = 'https://horkathasantali.pages.dev';
const types = fs.readFileSync('src/types/index.ts', 'utf8');
const block = types.slice(types.indexOf('export type ActiveDesktopTab'));
const ids = [...block.slice(0, block.indexOf(';')).matchAll(/\|\s*'([a-z0-9_]+)'/g)].map((m) => m[1]);
const titles = {};
for (const f of ['src/components/Sidebar.tsx', 'src/components/DashboardModuleGrid.tsx']) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/id:\s*'([a-z0-9_]+)'[^\n]*?\n?\s*(?:label|title):\s*'([^']+)'/g)) titles[m[1]] ??= m[2];
  for (const m of s.matchAll(/\{\s*id:\s*'([a-z0-9_]+)'[^}]*?label:\s*'([^']+)'/g)) titles[m[1]] ??= m[2];
}
const app = fs.readFileSync('src/App.tsx', 'utf8');
const skip = new Set(['home', 'keyboard', 'ai_assistant', 'admin_cms', 'settings', 'about']);
// केवल वही जिनका पेज App.tsx में सच में बनता है
const routes = ids.filter((i) => !skip.has(i) && app.includes(`activeTab === '${i}'`)).map((i) => [i, titles[i] || i]);
fs.writeFileSync('src/data/routes.ts', `// अपने आप बना (scripts/gen-routes.mjs) — हाथ से न बदलें\nexport const ROUTE_IDS = new Set<string>('${routes.map(([i]) => i).join(' ')}'.split(' '));\n`);
fs.writeFileSync('src/data/routeTitles.ts', `// अपने आप बना (scripts/gen-routes.mjs) — हाथ से न बदलें\nexport const ROUTE_TITLES: Record<string, string> = ${JSON.stringify(Object.fromEntries(routes))};\n`);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>${SITE}/</loc><lastmod>${today}</lastmod></url>\n${routes.map(([i]) => `<url><loc>${SITE}/m/${i}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`${routes.length} routes; untitled: ${routes.filter(([i, t]) => i === t).map(([i]) => i).join(', ') || 'none'}`);
