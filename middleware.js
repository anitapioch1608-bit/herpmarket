// Vercel Edge Middleware — rich link previews for shared HerpMarket URLs.
//
// When someone shares a listing link (herpmarket.it/?l=<id>) or a store link
// (herpmarket.it/?s=<id>), chat apps (WhatsApp, Instagram, Telegram, Facebook)
// fetch the page and read its <meta> tags to build the preview card. A static
// SPA serves the same generic tags for every URL, so every share looked the
// same. This middleware rewrites those tags per listing/store, so the preview
// shows the animal's photo + title + price (or the store's photo + name).
//
// SAFETY: it only acts on "/" requests that carry ?l= or ?s=, and every path is
// wrapped so that on ANY problem it simply lets the request continue to the
// normal app. To disable it entirely, delete this file and redeploy.

export const config = { matcher: '/' };

const SB = 'https://jmjqhxizpyktdvktjfrl.supabase.co';
// Public anonymous key (the same one shipped in the app bundle — safe to expose).
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptanFoeGl6cHlrdGR2a3RqZnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NTUzNTAsImV4cCI6MjA5NjEzMTM1MH0.Ll6iEAoI5XpJIQM30IXD0gshYrizeHLgFpUYdai2zVE';
const SBH = { apikey: ANON, authorization: `Bearer ${ANON}` };

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/\s+/g, ' ').trim();
}

async function listingOG(id) {
  const q = `${SB}/rest/v1/listings?id=eq.${encodeURIComponent(id)}&select=title,species,common,price,image_url,images&limit=1`;
  const r = await fetch(q, { headers: SBH });
  if (!r.ok) return null;
  const a = (await r.json())[0];
  if (!a) return null;
  const img = a.image_url || (Array.isArray(a.images) && a.images[0]) || null;
  const name = (a.title || a.common || a.species || 'HerpMarket').trim();
  const sp = a.species && a.species !== name ? ` — ${a.species}` : '';
  const price = (a.price != null && a.price !== '') ? ` · €${Number(a.price).toLocaleString('it-IT')}` : '';
  return {
    title: `${name}${sp}${price}`,
    desc: 'Disponibile su HerpMarket · Documentazione CITES, ritiro in fiera.',
    image: img,
  };
}

async function storeOG(id) {
  const q = `${SB}/rest/v1/sellers?id=eq.${encodeURIComponent(id)}&select=name,store_name,avatar_url,bio_it,specialties&limit=1`;
  const r = await fetch(q, { headers: SBH });
  if (!r.ok) return null;
  const s = (await r.json())[0];
  if (!s) return null;
  const name = (s.store_name || s.name || 'HerpMarket').trim();
  let desc = s.bio_it;
  if (!desc && Array.isArray(s.specialties) && s.specialties.length) desc = s.specialties.join(', ');
  return {
    title: `${name} · HerpMarket`,
    desc: desc || 'Allevatore su HerpMarket',
    image: s.avatar_url || null,
  };
}

function inject(html, og, pageUrl) {
  const title = esc(og.title);
  const desc = esc(og.desc);
  const purl = esc(pageUrl);
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${purl}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${desc}" />`);
  if (og.image) {
    const img = esc(og.image);
    html = html
      .replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${img}" />`)
      .replace(/<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${img}" />`)
      .replace(/<meta property="og:image:width"[^>]*>/i, '')
      .replace(/<meta property="og:image:height"[^>]*>/i, '');
  }
  return html;
}

export default async function middleware(request) {
  try {
    const url = new URL(request.url);
    const l = url.searchParams.get('l');
    const s = url.searchParams.get('s');
    if (!l && !s) return; // normal page → continue to the app

    const og = l ? await listingOG(l) : await storeOG(s);
    if (!og) return; // not found → continue (generic card)

    const htmlRes = await fetch(new URL('/index.html', url.origin));
    if (!htmlRes.ok) return;
    const html = inject(await htmlRes.text(), og, url.href);

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    return; // never break the site — just continue
  }
}
