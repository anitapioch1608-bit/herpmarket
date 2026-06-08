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
    seller: row.sellers?.name || row.seller_name,
    verified: row.sellers?.verified ?? false,
    rating: row.sellers?.rating ?? 0,
    reviews: row.sellers?.review_count ?? 0,
    status: row.status,
  };
}

export function mapSeller(row) {
  if (!row) return null;
  return {
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
    country: listing.country, region: listing.region, city: listing.city,
    sire: listing.sire, dam: listing.dam, description: listing.desc,
    image_url: listing.image, shipping: !!listing.shipping,
    eu_shipping: !!listing.euShipping, local_pickup: listing.localPickup !== false,
    expo_ids: listing.expoIds || [], auction: listing.auction || null,
  }).select().single();
  if (error) throw error;
  return mapListing(data);
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

// ── CHAT ────────────────────────────────────────────────────────────────────
export async function getOrCreateThread(listingId, buyerId, sellerId) {
  const { data: existing } = await supabase.from('threads')
    .select('*').eq('listing_id', listingId).eq('buyer_id', buyerId).maybeSingle();
  if (existing) return existing;
  const { data, error } = await supabase.from('threads')
    .insert({ listing_id: listingId, buyer_id: buyerId, seller_id: sellerId }).select().single();
  if (error) throw error;
  return data;
}
export async function fetchMessages(threadId) {
  const { data, error } = await supabase.from('messages')
    .select('*').eq('thread_id', threadId).order('created_at');
  if (error) throw error;
  return data || [];
}
export async function sendMessage(threadId, senderId, body) {
  const { data, error } = await supabase.from('messages')
    .insert({ thread_id: threadId, sender_id: senderId, body }).select().single();
  if (error) throw error;
  return data;
}
export function subscribeToMessages(threadId, onMessage) {
  return supabase.channel(`thread:${threadId}`)
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${threadId}` },
      payload => onMessage(payload.new))
    .subscribe();
}

// ── BIDS ────────────────────────────────────────────────────────────────────
export async function placeBid(listingId, bidderId, amount) {
  const { error: bidErr } = await supabase.from('bids')
    .insert({ listing_id: listingId, bidder_id: bidderId, amount });
  if (bidErr) throw bidErr;
  // bump the listing's auction.currentBid (in production do this in an Edge fn / RPC)
  const { data: l } = await supabase.from('listings').select('auction').eq('id', listingId).single();
  const a = { ...(l?.auction || {}), currentBid: amount, bidCount: (l?.auction?.bidCount || 0) + 1 };
  await supabase.from('listings').update({ auction: a }).eq('id', listingId);
  return a;
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
