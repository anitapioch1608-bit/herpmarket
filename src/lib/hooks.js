// src/lib/hooks.js
// Small React hooks that wrap api.js so screens can pull live data with one line.
import { useState, useEffect, useCallback } from 'react';
import * as api from './api';
import { supabase } from './supabase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getCurrentUser().then(u => { setUser(u); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return { user, loading };
}

export function useListings(filter) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    api.fetchListings(filter)
      .then(rows => { if (alive) { setListings(rows); setError(null); } })
      .catch(e => { if (alive) setError(e); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [JSON.stringify(filter)]);
  return { listings, loading, error };
}

export function useExpos() {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.fetchExpos().then(setExpos).finally(() => setLoading(false));
  }, []);
  return { expos, loading };
}

export function useSeller(name) {
  const [seller, setSeller] = useState(null);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    if (!name) return;
    api.fetchSeller(name).then(setSeller).catch(() => {});
    api.fetchListingsBySeller(name).then(setListings).catch(() => {});
  }, [name]);
  return { seller, listings };
}

export function useWishlist(userId) {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    if (userId) api.fetchWishlist(userId).then(setIds).catch(() => {});
  }, [userId]);
  const toggle = useCallback(async (listingId) => {
    if (!userId) return;
    if (ids.includes(listingId)) {
      await api.removeFromWishlist(userId, listingId);
      setIds(p => p.filter(i => i !== listingId));
    } else {
      await api.addToWishlist(userId, listingId);
      setIds(p => [...p, listingId]);
    }
  }, [userId, ids]);
  return { ids, toggle };
}

export function useChatThread(listingId, buyerId, sellerId) {
  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!listingId || !buyerId || !sellerId) return;
    let channel;
    api.getOrCreateThread(listingId, buyerId, sellerId).then(t => {
      setThread(t);
      api.fetchMessages(t.id).then(setMessages);
      channel = api.subscribeToMessages(t.id, m => setMessages(p => [...p, m]));
    });
    return () => { if (channel) supabase.removeChannel(channel); };
  }, [listingId, buyerId, sellerId]);
  const send = useCallback(async (body) => {
    if (thread && buyerId) await api.sendMessage(thread.id, buyerId, body);
  }, [thread, buyerId]);
  return { thread, messages, send };
}
