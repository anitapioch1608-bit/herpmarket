// src/lib/api.js
// Data layer between Supabase and the UI. The mappers convert snake_case DB
// rows into the camelCase shape the React components already expect, so you
// can swap hardcoded arrays for these functions screen by screen.
import { supabase } from './supabase';

// ── MAPPERS ─────────────────────────────────────────────────────────────────
export function mapListing(row) {
  if (!row) return null;
  return {
    id: row.id,
    species: row.species,
    common: row.common,
    category: row.category,
    traits: row.traits || [],
    price: Number(row.price),
    deposit: row.deposit ? Number(row.deposit) : Math.round(Number(row.price) * 0.1),
    sex: row.sex,
    ageMonths: row.age_months,
    birthDate: row.birth_date || null,
    citesListed: !!row.cites_listed,
    weight: row.weight,
    country: row.country || 'IT',
    region: row.region,
    city: row.city,
    distanceKm: row.distance_km,
    sire: row.sire,
    dam: row.dam,
    desc: row.description,
    image: row.image_url,
    shipping: row.shipping,
    euShipping: row.eu_shipping,
    localPickup: row.local_pickup,
    expoIds: row.expo_ids || [],
    auction: row.auction || null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
    seller: row.sellers?.name || row.seller_name,
    sellerId: row.seller_id || row.sellers?.id || null,
    verified: row.sellers?.verified ?? false,
    rating: row.sellers?.rating ?? 0,
    reviews: row.sellers?.review_count ?? 0,
    status: row.status,
  };
}

export function mapSeller(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    country: row.country || 'IT',
    region: row.region,
    city: row.city,
    verified: row.verified,
    memberSince: row.member_since,
    totalSales: row.total_sales,
    rating: Number(row.rating || 0),
    reviewCount: row.review_count,
    specialties: row.specialties || [],
    bio: row.bio_it,
    bioIt: row.bio_it || "",
    bioEn: row.bio_en || "",
    avatarUrl: row.avatar_url || null,
    pro: !!row.pro,
    website: row.website || "",
    expoIds: [],   // sellers table has no expo links yet — safe default for the UI
    reviews: [],   // reviews load separately later — safe default for the UI
  };
}

export function mapExpo(row) {
  if (!row) return null;
  return {
    id: row.id, name: row.name, location: row.location, venue: row.venue,
    country: row.country || 'IT', date: row.date_label, dateISO: row.date_iso,
    color: row.color, description: row.description, website: row.website,
  };
}

// ── LISTINGS ────────────────────────────────────────────────────────────────
export async function fetchListings(filter = {}) {
  let q = supabase.from('listings')
    .select('*, sellers(name, verified, rating, review_count, country)')
    .eq('status', 'active');

  if (filter.category)  q = q.eq('category', filter.category);
  if (filter.country)   q = q.eq('country', filter.country);
  if (filter.sex)       q = q.eq('sex', filter.sex);
  if (filter.region)    q = q.eq('region', filter.region);
  if (filter.priceMin)  q = q.gte('price', filter.priceMin);
  if (filter.priceMax)  q = q.lte('price', filter.priceMax);
  if (filter.search)    q = q.or(`species.ilike.%${filter.search}%,common.ilike.%${filter.search}%`);

  const sortMap = {
    newest: ['created_at', false], priceAsc: ['price', true],
    priceDesc: ['price', false], ratingDesc: ['created_at', false],
  };
  const [col, asc] = sortMap[filter.sort] || sortMap.newest;
  q = q.order(col, { ascending: asc });

  const { data, error } = await q;
  if (error) throw error;
  let rows = (data || []).map(mapListing);
  // client-side filters that are awkward in SQL
  if (filter.auctionOnly) rows = rows.filter(r => r.auction);
  if (filter.verifiedOnly) rows = rows.filter(r => r.verified);
  if (filter.expoOnly) rows = rows.filter(r => r.expoIds?.length);
  if (filter.traits?.length) rows = rows.filter(r =>
    filter.traits.every(t => r.traits.some(rt => rt.name === t)));
  return rows;
}

export async function fetchListingsBySeller(sellerName) {
  const { data, error } = await supabase.from('listings')
    .select('*, sellers!inner(name, verified, rating, review_count, country)')
    .eq('sellers.name', sellerName).eq('status', 'active');
  if (error) throw error;
  return (data || []).map(mapListing);
}

export async function createListing(listing, sellerId) {
  const { data, error } = await supabase.from('listings').insert({
    seller_id: sellerId,
    species: listing.species, common: listing.common, category: listing.category,
    traits: listing.traits || [], price: listing.price, deposit: listing.deposit,
    sex: listing.sex, age_months: listing.ageMonths, weight: listing.weight,
    birth_date: listing.birthDate || null, cites_listed: !!listing.citesListed,
    country: listing.country, region: listing.region, city: listing.city,
    sire: listing.sire, dam: listing.dam, description: listing.desc,
    image_url: listing.image, shipping: !!listing.shipping,
    eu_shipping: !!listing.euShipping, local_pickup: listing.localPickup !== false,
    expo_ids: listing.expoIds || [], auction: listing.auction || null,
  }).select().single();
  if (error) throw error;
  return mapListing(data);
}

// Upload listing photos to the public "listing-photos" bucket. Returns public URLs.
export async function uploadListingPhotos(files, userId) {
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase();
    const path = `${userId}/${Date.now()}-${i}.${ext}`;
    const { error } = await supabase.storage.from('listing-photos')
      .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type || 'image/jpeg' });
    if (error) throw error;
    const { data } = supabase.storage.from('listing-photos').getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

// ── MY LISTINGS (owner management) ──────────────────────────────────────────
// All three rely on the existing RLS owner policies: only the seller whose
// owner_id matches the logged-in user can update or delete their rows.

export async function fetchMyListings(userId) {
  const { data: seller } = await supabase.from('sellers')
    .select('id').eq('owner_id', userId).maybeSingle();
  if (!seller) return [];
  const { data, error } = await supabase.from('listings')
    .select('*, sellers(*)').eq('seller_id', seller.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(mapListing);
}

export async function updateListing(id, fields) {
  const patch = { updated_at: new Date().toISOString() };
  if (fields.price != null) patch.price = fields.price;
  if (fields.desc != null) patch.description = fields.desc;
  if (fields.common != null) patch.common = fields.common;
  const { data, error } = await supabase.from('listings')
    .update(patch).eq('id', id).select('*, sellers(*)').single();
  if (error) throw error;
  return mapListing(data);
}

export async function deleteListing(id) {
  const { error } = await supabase.from('listings').delete().eq('id', id);
  if (error) throw error;
}

// ── MY STORE (seller profile editing) ───────────────────────────────────────
export async function fetchMySeller(userId) {
  const { data, error } = await supabase.from('sellers')
    .select('*').eq('owner_id', userId).maybeSingle();
  if (error) throw error;
  return data ? mapSeller(data) : null;
}

// ── MARK AS SOLD (seller-initiated cash / expo sales) ───────────────────────
// Records a completed transaction and flips the listing to 'sold'.
// opts: { sellerId, listingId, channel, buyerId?, buyerName?, buyerAddress?, amount?,
//         buyerCountry?, sellerCountry?, citesListed? }
export async function markListingSold(opts) {
  const row = {
    listing_id: opts.listingId,
    seller_id: opts.sellerId,
    buyer_id: opts.buyerId || null,
    buyer_name: opts.buyerName || null,
    buyer_address: opts.buyerAddress || null,
    sale_channel: opts.channel || 'cash_expo',
    state: 'completed',
    amount: opts.amount ?? null,
    buyer_country: opts.buyerCountry || null,
    seller_country: opts.sellerCountry || null,
    cross_border: !!(opts.buyerCountry && opts.sellerCountry && opts.buyerCountry !== opts.sellerCountry),
    seller_handover: true,
    buyer_handover: true,
    sold_at: new Date().toISOString(),
  };
  const { data: tx, error } = await supabase.from('transactions').insert(row).select().single();
  if (error) throw error;
  // Take it off the market.
  const { error: updErr } = await supabase.from('listings').update({ status: 'sold' }).eq('id', opts.listingId);
  if (updErr) throw updErr;
  return tx;
}

// People who messaged the seller about a listing — candidates for "sold to user".
export async function fetchListingInquirers(listingId) {
  const { data, error } = await supabase.from('threads')
    .select('buyer_id, profiles:buyer_id(id, name)')
    .eq('listing_id', listingId);
  if (error) throw error;
  // de-dup by buyer
  const seen = {};
  (data || []).forEach(t => { if (t.buyer_id && !seen[t.buyer_id]) seen[t.buyer_id] = t.profiles?.name || t.buyer_id; });
  return Object.entries(seen).map(([id, name]) => ({ id, name }));
}

// ── KYC / VERIFICATION (seller side) ────────────────────────────────────────
// Upload a verification document to the PRIVATE kyc-docs bucket, under a folder
// named after the user id (the storage policy enforces this). Returns the path.
export async function uploadKycDoc(userId, kind, file) {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const path = `${userId}/${kind}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('kyc-docs').upload(path, file, { upsert: true });
  if (error) throw error;
  return path;
}

// Save doc paths + ASL number and move the seller to 'pending' review.
export async function submitKyc(userId, { visuraPath, docPath, asl }) {
  const { data: seller } = await supabase.from('sellers')
    .select('id').eq('owner_id', userId).maybeSingle();
  if (!seller) throw new Error('No seller profile yet');
  const patch = { kyc_status: 'pending', kyc_submitted_at: new Date().toISOString() };
  if (visuraPath) patch.kyc_visura_path = visuraPath;
  if (docPath) patch.kyc_doc_path = docPath;
  if (asl) patch.kyc_asl = asl;
  const { error } = await supabase.from('sellers').update(patch).eq('id', seller.id);
  if (error) throw error;
  return true;
}

// Read my current verification status for the Settings screen.
export async function fetchMyKyc(userId) {
  const { data, error } = await supabase.from('sellers')
    .select('verified, kyc_status').eq('owner_id', userId).maybeSingle();
  if (error) throw error;
  return data || { verified: false, kyc_status: 'unverified' };
}

// Count a seller's current listings — used for the free-tier cap (5).
export async function countMyListings(userId) {
  const { data: seller } = await supabase.from('sellers')
    .select('id').eq('owner_id', userId).maybeSingle();
  if (!seller) return 0;
  const { count, error } = await supabase.from('listings')
    .select('id', { count: 'exact', head: true }).eq('seller_id', seller.id);
  if (error) throw error;
  return count || 0;
}

export async function updateMySeller(sellerId, fields) {
  const patch = {};
  if (fields.name != null) patch.name = fields.name;
  if (fields.city != null) patch.city = fields.city;
  if (fields.bio != null) { patch.bio_it = fields.bio; patch.bio_en = fields.bio; }
  if (fields.specialties != null) patch.specialties = fields.specialties;
  if (fields.avatarUrl != null) patch.avatar_url = fields.avatarUrl;
  if (fields.website != null) patch.website = fields.website;
  const { data, error } = await supabase.from('sellers')
    .update(patch).eq('id', sellerId).select().single();
  if (error) throw error;
  return mapSeller(data);
}

// ── CHAT (real threads + messages) ──────────────────────────────────────────
// A thread links one listing + one buyer + one seller. RLS guarantees only
// those two parties can read or write it.

// Open (or reuse) the thread between the logged-in buyer and a listing's seller.
export async function getOrCreateThread(listingId, sellerId, buyerId) {
  const { data: existing } = await supabase.from('threads')
    .select('*').eq('listing_id', listingId).eq('buyer_id', buyerId).maybeSingle();
  if (existing) return existing;
  const { data, error } = await supabase.from('threads')
    .insert({ listing_id: listingId, seller_id: sellerId, buyer_id: buyerId })
    .select().single();
  if (error) throw error;
  return data;
}

// List all threads the current user is part of (as buyer or as seller-owner),
// newest activity first, with the listing + last message for the preview row.
export async function fetchMyThreads(userId) {
  // seller rows owned by me (to catch threads where I'm the seller)
  const { data: mySellers } = await supabase.from('sellers').select('id').eq('owner_id', userId);
  const sellerIds = (mySellers || []).map(s => s.id);
  let q = supabase.from('threads')
    .select('*, listings(*, sellers(*)), messages(body, created_at, sender_id), buyer:buyer_id(id, name)')
    .order('created_at', { ascending: false });
  // buyer_id = me OR seller_id in my seller ids
  const orParts = [`buyer_id.eq.${userId}`];
  if (sellerIds.length) orParts.push(`seller_id.in.(${sellerIds.join(',')})`);
  q = q.or(orParts.join(','));
  const { data, error } = await q;
  if (error) throw error;
  return (data || []).map(thr => {
    const msgs = (thr.messages || []).slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const last = msgs[msgs.length - 1];
    return {
      id: thr.id,
      listingId: thr.listing_id,
      sellerId: thr.seller_id,
      buyerId: thr.buyer_id,
      iAmSeller: sellerIds.includes(thr.seller_id),
      buyerName: thr.buyer?.name || null,
      listing: thr.listings ? mapListing(thr.listings) : null,
      lastMsg: last ? last.body : "",
      lastAt: last ? last.created_at : thr.created_at,
      unread: msgs.filter(m => m.sender_id !== userId).length, // refined later with read_at
    };
  }).sort((a, b) => new Date(b.lastAt) - new Date(a.lastAt));
}

export async function fetchMessages(threadId) {
  const { data, error } = await supabase.from('messages')
    .select('*').eq('thread_id', threadId).order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendMessage(threadId, senderId, body) {
  const { data, error } = await supabase.from('messages')
    .insert({ thread_id: threadId, sender_id: senderId, body })
    .select().single();
  if (error) throw error;
  return data;
}

// Live updates: call onNew for every new message in this thread. Returns an
// unsubscribe function. (Requires Realtime enabled on the messages table.)
export function subscribeMessages(threadId, onNew) {
  const channel = supabase
    .channel(`messages:${threadId}`)
    .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${threadId}` },
        payload => onNew(payload.new))
    .subscribe();
  return () => supabase.removeChannel(channel);
}

// Find the seller row for this user, or create one on first listing.
export async function getOrCreateSeller(user) {
  const { data: existing } = await supabase.from('sellers')
    .select('*').eq('owner_id', user.id).maybeSingle();
  if (existing) return existing;
  const baseName = user.name || (user.email ? user.email.split('@')[0] : 'Breeder');
  const row = {
    owner_id: user.id, name: baseName, country: user.country || 'IT',
    region: user.region || null, member_since: new Date().getFullYear().toString(),
  };
  let { data: created, error } = await supabase.from('sellers').insert(row).select().single();
  if (error && error.code === '23505') { // name already taken → add a short suffix
    row.name = `${baseName} ${user.id.slice(0, 4)}`;
    ({ data: created, error } = await supabase.from('sellers').insert(row).select().single());
  }
  if (error) throw error;
  return created;
}

// ── SELLERS ─────────────────────────────────────────────────────────────────
export async function fetchSeller(name) {
  const { data, error } = await supabase.from('sellers').select('*').eq('name', name).single();
  if (error) throw error;
  return mapSeller(data);
}

// ── EXPOS ───────────────────────────────────────────────────────────────────
export async function fetchExpos() {
  const { data, error } = await supabase.from('expos').select('*').order('date_iso');
  if (error) throw error;
  return (data || []).map(mapExpo);
}

// ── WISHLIST ────────────────────────────────────────────────────────────────
export async function fetchWishlist(userId) {
  const { data, error } = await supabase.from('wishlists')
    .select('listing_id').eq('user_id', userId);
  if (error) throw error;
  return (data || []).map(r => r.listing_id);
}
export async function addToWishlist(userId, listingId) {
  return supabase.from('wishlists').insert({ user_id: userId, listing_id: listingId });
}
export async function removeFromWishlist(userId, listingId) {
  return supabase.from('wishlists').delete().eq('user_id', userId).eq('listing_id', listingId);
}

// ── TRANSACTIONS ────────────────────────────────────────────────────────────
export async function requestPurchase(tx) {
  const { data, error } = await supabase.from('transactions').insert({
    listing_id: tx.listingId, buyer_id: tx.buyerId, seller_id: tx.sellerId,
    delivery_mode: tx.deliveryMode, expo_id: tx.expoId || null,
    is_expo_flow: tx.deliveryMode === 'expo', amount: tx.amount,
    buyer_country: tx.buyerCountry, seller_country: tx.sellerCountry,
    cross_border: tx.buyerCountry !== tx.sellerCountry, state: 'requested',
  }).select().single();
  if (error) throw error;
  return data;
}
export async function updateTransactionState(txId, patch) {
  const { data, error } = await supabase.from('transactions')
    .update(patch).eq('id', txId).select().single();
  if (error) throw error;
  return data;
}

// ── BIDS ────────────────────────────────────────────────────────────────────
export async function placeBid(listingId, bidderId, amount) {
  // Re-read the current auction to guard against a higher bid landing first.
  const { data: l, error: readErr } = await supabase.from('listings')
    .select('auction').eq('id', listingId).single();
  if (readErr) throw readErr;
  const cur = l?.auction || {};
  if (amount <= (cur.currentBid || cur.startPrice || 0)) {
    const e = new Error('bid_too_low'); e.code = 'bid_too_low'; e.currentBid = cur.currentBid; throw e;
  }
  const { error: bidErr } = await supabase.from('bids')
    .insert({ listing_id: listingId, bidder_id: bidderId, amount });
  if (bidErr) throw bidErr;
  const a = { ...cur, currentBid: amount, bidCount: (cur.bidCount || 0) + 1, highBidder: bidderId };
  const { error: updErr } = await supabase.from('listings').update({ auction: a }).eq('id', listingId);
  if (updErr) throw updErr;
  return a;
  // NOTE: race-safe enough for beta. For high volume, move to a Postgres RPC
  // that does the compare-and-set atomically in one transaction.
}

// Live auction updates: fires onUpdate(auctionObject) whenever this listing's
// row changes (i.e. a new bid bumped currentBid). Returns an unsubscribe fn.
export function subscribeAuction(listingId, onUpdate) {
  const channel = supabase
    .channel(`auction:${listingId}`)
    .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'listings', filter: `id=eq.${listingId}` },
        payload => { if (payload.new?.auction) onUpdate(payload.new.auction); })
    .subscribe();
  return () => supabase.removeChannel(channel);
}

// ── AUTH ────────────────────────────────────────────────────────────────────
export async function signUp(email, password, displayName, consents = {}) {
  const { data, error } = await supabase.auth.signUp({
    email, password, options: { data: { display_name: displayName } },
  });
  if (error) throw error;
  if (data.user) {
    await supabase.from('profiles').update({
      consent_tos_version: '1.0', consent_tos_at: new Date().toISOString(),
      consent_privacy_version: '1.0', consent_privacy_at: new Date().toISOString(),
      consent_marketing: !!consents.marketing,
      consent_marketing_at: consents.marketing ? new Date().toISOString() : null,
    }).eq('id', data.user.id);
  }
  return data;
}
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}
export async function signOut() { return supabase.auth.signOut(); }
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}
// Subscribe to login/logout changes. Returns an unsubscribe function.
export function onAuthChange(cb) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => cb(event, session));
  return () => data?.subscription?.unsubscribe();
}
// Send a password-reset email. The link returns the user to the app, where the
// PASSWORD_RECOVERY auth event triggers the "set new password" screen.
export async function resetPasswordForEmail(email) {
  const redirectTo = window.location.origin;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
  return true;
}
// Set a new password (used on the reset page, while in the recovery session).
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  return true;
}
// Load the profile row for the logged-in user (display name, consents, role, etc.)
export async function fetchProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return null;
  return data;
}
// Account deletion. Full erasure of the auth login + data purge happens in a
// server-side Edge Function (added with the GDPR functions). For now this marks
// the account for deletion and signs the user out.
export async function requestAccountDeletion(userId) {
  await supabase.from('profiles')
    .update({ deletion_requested_at: new Date().toISOString() })
    .eq('id', userId);
  await supabase.auth.signOut();
  return true;
}
