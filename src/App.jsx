import React, { useState, useMemo } from 'react';
import {
  Home, Search, PlusCircle, MessageCircle, User,
  ChevronRight, ChevronLeft, ShieldCheck, MapPin,
  Star, Calendar, SlidersHorizontal, FileText, CheckCircle,
  Camera, Heart, Mars, Venus, HelpCircle, X,
  ArrowUpDown, Lock, CreditCard, Info, Languages, Send,
  LogIn, LogOut, Globe, Truck, Scale,
  ListOrdered, Grid3x3, Settings as SettingsIcon, Mail
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────
   AESTHETIC NOTES
   - Editorial field-guide feel: warm charcoal + terracotta accent
   - Display: Fraunces (serif, characterful). Body: Manrope.
   - Density > padding. Inline data > big cards. Trait chips colored
     by trait class (à la MorphMarket).
   - Italian-first; English available as a secondary toggle.
   ────────────────────────────────────────────────────────────────── */

/* ───── i18n (IT primary, EN secondary) ─────────────────────────── */
const I18N = {
  it: {
    tagline: "Il mercato italiano dei rettili",
    home: "Esplora", search: "Cerca", sell: "Vendi", chat: "Messaggi", profile: "Profilo",
    nearYou: "Vicino a te", upcomingExpos: "Prossime fiere", browseByCategory: "Sfoglia per categoria",
    allListings: "Tutti gli annunci", seeAll: "Vedi tutti",
    filters: "Filtri", sort: "Ordina", apply: "Applica", reset: "Reimposta",
    sortNewest: "Più recenti", sortPriceAsc: "Prezzo: crescente", sortPriceDesc: "Prezzo: decrescente", sortDistance: "Distanza",
    species: "Specie", traits: "Tratti / Morph", sex: "Sesso", age: "Età", price: "Prezzo", region: "Regione", expoOnly: "Solo ritiro in fiera",
    male: "Maschio", female: "Femmina", unsexed: "Non sessato", pair: "Coppia",
    months: "mesi", year: "anno", years: "anni",
    seller: "Venditore", verifiedBreeder: "Allevatore verificato", message: "Messaggia",
    reserveAtExpo: "Prenota per la fiera", payDeposit: "Paga acconto",
    reservationPending: "In attesa di approvazione…", reserved: "Riservato a te",
    description: "Descrizione", parentage: "Genealogia", sire: "Padre", dam: "Madre", unknown: "Sconosciuto",
    born: "Nato", weight: "Peso", origin: "Origine", captiveBred: "Nato in cattività",
    cites: "Documenti CITES", citesNotice: "Documento di cessione richiesto per Allegato A/B",
    listingTitle: "Titolo annuncio", uploadPhotos: "Carica foto (min. 3)", publishListing: "Pubblica annuncio",
    pickSpecies: "Seleziona specie", pickTraits: "Aggiungi tratti", describePlaceholder: "Carattere, alimentazione, condizioni di salute…",
    typeMessage: "Scrivi un messaggio…", onlineNow: "Online", translateIT: "Traduci in italiano",
    yourAccount: "Il tuo account", wishlist: "Preferiti", myListings: "I miei annunci", documents: "Archivio documenti", reviews: "Recensioni", settings: "Impostazioni", legalGuide: "Guida legale", logout: "Esci",
    inventory: "Inventario animali", lineage: "Genetica & Pedigree", transport: "Eco-Taxi (Trasporti)",
    aboutContact: "Chi siamo & Contatti", termsLegal: "Termini & Disclaimer", settingsKyc: "Impostazioni & KYC",
    citesArchive: "Archivio CITES",
    breedingMgmt: "Gestione allevamento", bureaucracyLegal: "Burocrazia & Legale", infoSupport: "Informazioni & Supporto", configuration: "Configurazione",
    login: "Accedi", signup: "Iscriviti", joinCommunity: "Unisciti", loginOrJoin: "Accedi / Iscriviti",
    loginRequired: "Accedi per continuare",
    loginToMessage: "Accedi per inviare messaggi all'allevatore.",
    loginToReserve: "Accedi per prenotare l'esemplare in fiera.",
    loginToSell: "Accedi per pubblicare i tuoi annunci.",
    loginToFavorite: "Accedi per salvare i tuoi preferiti.",
    emailPlaceholder: "Email", passwordPlaceholder: "Password", continueWithEmail: "Continua con email",
    noAccount: "Non hai un account?", alreadyMember: "Hai già un account?",
    welcomeBack: "Bentornato", createAccount: "Crea il tuo account",
    nameLabel: "Nome", signUpFree: "Iscriviti gratis",
    expoAnimals: "Animali disponibili in fiera",
    searchAtExpo: "Cerca in fiera...",
    officialChannels: "Canali ufficiali", expoInfo: "Informazioni",
    visitWebsite: "Sito ufficiale",
    noAnimalsAtExpo: "Nessun esemplare ancora segnalato per questa fiera.",
    pickupAtExpo: "Ritiro in fiera",
    availableAt: "Disponibile a",
    emptyWishlist: "Nessun esemplare salvato. Tocca il cuore per aggiungere.",
    backToBrowse: "Torna agli annunci",
    legalIntro: "Il mercato italiano dei rettili è regolato dal D.Lgs. 135/2022 e dal Reg. CE 338/97. Verifica sempre la categoria CITES prima di acquistare.",
    depositNotice: "L'acconto del 10% blocca l'esemplare fino al ritiro in fiera. Non rimborsabile.",
    realPhoto: "Foto dell'esemplare",
    resultsCount: (n) => `${n} ${n === 1 ? "annuncio trovato" : "annunci trovati"}`,
    secureCheckout: "Pagamento sicuro",
    payNow: "Paga",
    paymentSuccess: "Pagamento riuscito",
    paymentSuccessSub: "L'esemplare è ora riservato a te.",
  },
  en: {
    tagline: "Italy's reptile marketplace",
    home: "Explore", search: "Search", sell: "Sell", chat: "Messages", profile: "Profile",
    nearYou: "Near you", upcomingExpos: "Upcoming expos", browseByCategory: "Browse by category",
    allListings: "All listings", seeAll: "See all",
    filters: "Filters", sort: "Sort", apply: "Apply", reset: "Reset",
    sortNewest: "Newest first", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low", sortDistance: "Nearest first",
    species: "Species", traits: "Traits / Morph", sex: "Sex", age: "Age", price: "Price", region: "Region", expoOnly: "Expo pickup only",
    male: "Male", female: "Female", unsexed: "Unsexed", pair: "Pair",
    months: "months", year: "year", years: "years",
    seller: "Seller", verifiedBreeder: "Verified breeder", message: "Message",
    reserveAtExpo: "Reserve for expo", payDeposit: "Pay deposit",
    reservationPending: "Awaiting approval…", reserved: "Reserved for you",
    description: "Description", parentage: "Parentage", sire: "Sire", dam: "Dam", unknown: "Unknown",
    born: "Born", weight: "Weight", origin: "Origin", captiveBred: "Captive-bred",
    cites: "CITES paperwork", citesNotice: "Transfer document required for Annex A/B",
    listingTitle: "Listing title", uploadPhotos: "Upload photos (min. 3)", publishListing: "Publish listing",
    pickSpecies: "Select species", pickTraits: "Add traits", describePlaceholder: "Temperament, feeding, health…",
    typeMessage: "Type a message…", onlineNow: "Online", translateIT: "Translate to Italian",
    yourAccount: "Your account", wishlist: "Saved", myListings: "My listings", documents: "Documents", reviews: "Reviews", settings: "Settings", legalGuide: "Legal guide", logout: "Sign out",
    inventory: "Animal inventory", lineage: "Genetics & Pedigree", transport: "Eco-Taxi (Transport)",
    aboutContact: "About us & Contact", termsLegal: "Terms & Disclaimer", settingsKyc: "Settings & KYC",
    citesArchive: "CITES archive",
    breedingMgmt: "Breeding management", bureaucracyLegal: "Bureaucracy & Legal", infoSupport: "Information & Support", configuration: "Configuration",
    login: "Sign in", signup: "Sign up", joinCommunity: "Join us", loginOrJoin: "Sign in / Join",
    loginRequired: "Sign in to continue",
    loginToMessage: "Sign in to message the breeder.",
    loginToReserve: "Sign in to reserve this animal at the expo.",
    loginToSell: "Sign in to publish your listings.",
    loginToFavorite: "Sign in to save favorites.",
    emailPlaceholder: "Email", passwordPlaceholder: "Password", continueWithEmail: "Continue with email",
    noAccount: "Don't have an account?", alreadyMember: "Already a member?",
    welcomeBack: "Welcome back", createAccount: "Create your account",
    nameLabel: "Name", signUpFree: "Sign up free",
    expoAnimals: "Animals available at this expo",
    searchAtExpo: "Search at this expo...",
    officialChannels: "Official channels", expoInfo: "Information",
    visitWebsite: "Official website",
    noAnimalsAtExpo: "No animals have been listed for this expo yet.",
    pickupAtExpo: "Pickup at expo",
    availableAt: "Available at",
    emptyWishlist: "No saved animals yet. Tap the heart to add.",
    backToBrowse: "Back to listings",
    legalIntro: "The Italian reptile market is governed by D.Lgs. 135/2022 and EU Reg. 338/97. Always check the CITES annex before buying.",
    depositNotice: "A 10% deposit reserves the animal until expo pickup. Non-refundable.",
    realPhoto: "Animal photo",
    resultsCount: (n) => `${n} ${n === 1 ? "listing" : "listings"} found`,
    secureCheckout: "Secure checkout",
    payNow: "Pay",
    paymentSuccess: "Payment received",
    paymentSuccessSub: "The animal is now reserved for you.",
  }
};

/* ───── Trait class colors (MorphMarket-inspired) ───────────────── */
const TRAIT_CLASS = {
  recessive: { bg: "bg-amber-500/15", text: "text-amber-300", ring: "ring-amber-500/30", dot: "bg-amber-400" },
  dominant:  { bg: "bg-rose-500/15",  text: "text-rose-300",  ring: "ring-rose-500/30",  dot: "bg-rose-400"  },
  coDom:     { bg: "bg-sky-500/15",   text: "text-sky-300",   ring: "ring-sky-500/30",   dot: "bg-sky-400"   },
  polygenic: { bg: "bg-violet-500/15",text: "text-violet-300",ring: "ring-violet-500/30",dot: "bg-violet-400"},
  wild:      { bg: "bg-stone-500/15", text: "text-stone-300", ring: "ring-stone-500/30", dot: "bg-stone-400" },
};

/* ───── Data ────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "geckos",      it: "Gechi",       en: "Geckos",      emoji: "🦎", count: 412 },
  { id: "snakes",      it: "Serpenti",    en: "Snakes",      emoji: "🐍", count: 287 },
  { id: "lizards",     it: "Sauri",       en: "Lizards",     emoji: "🦖", count: 203 },
  { id: "chameleons",  it: "Camaleonti",  en: "Chameleons",  emoji: "🦎", count: 94  },
  { id: "tortoises",   it: "Testuggini",  en: "Tortoises",   emoji: "🐢", count: 156 },
  { id: "amphibians",  it: "Anfibi",      en: "Amphibians",  emoji: "🐸", count: 78  },
  { id: "inverts",     it: "Invertebrati",en: "Invertebrates",emoji: "🕷️", count: 132 },
];

const REGIONS = [
  "Tutte le regioni","Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna",
  "Friuli-V.G.","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte",
  "Puglia","Sardegna","Sicilia","Toscana","Trentino-A.A.","Umbria","Valle d'Aosta","Veneto"
];

// Real-looking Unsplash IDs of reptiles — broad search aliases as fallback
const IMG = {
  crested:  "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?auto=format&fit=crop&w=800&q=80",
  leopard:  "https://images.unsplash.com/photo-1582538285793-5648ed4c84c0?auto=format&fit=crop&w=800&q=80",
  ball:     "https://images.unsplash.com/photo-1591382696684-38c427c7547a?auto=format&fit=crop&w=800&q=80",
  panther:  "https://images.unsplash.com/photo-1580526149844-31f1a5f6ed49?auto=format&fit=crop&w=800&q=80",
  beardie:  "https://images.unsplash.com/photo-1542228601-51208034b7a1?auto=format&fit=crop&w=800&q=80",
  tortoise: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&w=800&q=80",
  corn:     "https://images.unsplash.com/photo-1597245621459-72e1e7a7d52e?auto=format&fit=crop&w=800&q=80",
  hognose:  "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=800&q=80",
};

const LISTINGS = [
  {
    id: 1, species: "Correlophus ciliatus", common: "Geco crestato",
    traits: [{ name: "Lilly White", cls: "coDom" }, { name: "Harlequin", cls: "polygenic" }],
    price: 180, deposit: 18, sex: "F", ageMonths: 14, weight: "38g",
    region: "Piemonte", city: "Torino", distanceKm: 8,
    seller: "Piedmont Geckos", verified: true, rating: 4.9, reviews: 47,
    image: IMG.crested, category: "geckos", expoId: 1,
    sire: "Axanthic Lilly White", dam: "Red Harlequin",
    desc: "Esemplare nato in casa, alimentazione a base di Pangea e insetti vivi. Carattere molto docile, abituata alla manipolazione."
  },
  {
    id: 2, species: "Furcifer pardalis", common: "Camaleonte pantera",
    traits: [{ name: "Ambilobe Blue Bar", cls: "polygenic" }],
    price: 320, deposit: 32, sex: "M", ageMonths: 8, weight: "82g",
    region: "Lombardia", city: "Milano", distanceKm: 0,
    seller: "ExoBreed Italia", verified: true, rating: 4.8, reviews: 62,
    image: IMG.panther, category: "chameleons", expoId: 1,
    sire: "Ambilobe Blue Bar", dam: "Ambilobe Red Bar",
    desc: "Maschio dai colori spettacolari, in piena salute. CITES Allegato B completo."
  },
  {
    id: 3, species: "Eublepharis macularius", common: "Geco leopardino",
    traits: [{ name: "Tremper Albino", cls: "recessive" }, { name: "het Eclipse", cls: "recessive" }],
    price: 75, deposit: 8, sex: "U", ageMonths: 3, weight: "16g",
    region: "Campania", city: "Napoli", distanceKm: 720,
    seller: "LeoMorphs Campania", verified: true, rating: 4.7, reviews: 38,
    image: IMG.leopard, category: "geckos", expoId: null,
    sire: "Tremper Albino", dam: "het Tremper het Eclipse",
    desc: "Cucciolo svezzato, mangia camole e tarme regolarmente."
  },
  {
    id: 4, species: "Python regius", common: "Pitone reale",
    traits: [{ name: "Banana", cls: "coDom" }, { name: "Pastel", cls: "coDom" }, { name: "Clown", cls: "recessive" }],
    price: 240, deposit: 24, sex: "M", ageMonths: 5, weight: "180g",
    region: "Veneto", city: "Verona", distanceKm: 145,
    seller: "Veneto Royals", verified: true, rating: 4.9, reviews: 91,
    image: IMG.ball, category: "snakes", expoId: 1,
    sire: "Banana Pastel", dam: "Clown",
    desc: "Mangia regolarmente topi decongelati. Tre mute completate."
  },
  {
    id: 5, species: "Pogona vitticeps", common: "Pogona",
    traits: [{ name: "Hypo Zero", cls: "coDom" }],
    price: 160, deposit: 16, sex: "P", ageMonths: 4, weight: "45g",
    region: "Piemonte", city: "Cuneo", distanceKm: 95,
    seller: "DragoMania Piemonte", verified: false, rating: 4.4, reviews: 18,
    image: IMG.beardie, category: "lizards", expoId: 2,
    sire: null, dam: null,
    desc: "Coppia giovane, ottimi mangiatori. Pronti per nuovo terrario."
  },
  {
    id: 6, species: "Testudo hermanni", common: "Testuggine di Hermann",
    traits: [{ name: "CB 2024", cls: "wild" }],
    price: 220, deposit: 22, sex: "F", ageMonths: 18, weight: "180g",
    region: "Toscana", city: "Firenze", distanceKm: 340,
    seller: "Testudo Toscana", verified: true, rating: 5.0, reviews: 24,
    image: IMG.tortoise, category: "tortoises", expoId: null,
    sire: null, dam: null,
    desc: "Esemplare nato in cattività con documenti CITES Allegato A in regola."
  },
  {
    id: 7, species: "Pantherophis guttatus", common: "Serpente del grano",
    traits: [{ name: "Anery", cls: "recessive" }, { name: "Motley", cls: "recessive" }],
    price: 85, deposit: 9, sex: "F", ageMonths: 6, weight: "55g",
    region: "Lombardia", city: "Bergamo", distanceKm: 45,
    seller: "Snake Italia BG", verified: true, rating: 4.6, reviews: 33,
    image: IMG.corn, category: "snakes", expoId: 2,
    sire: "Anery Motley", dam: "Anery",
    desc: "Femmina giovane, alimentazione regolare con topi decongelati."
  },
  {
    id: 8, species: "Heterodon nasicus", common: "Hognose occidentale",
    traits: [{ name: "Albino", cls: "recessive" }, { name: "Conda", cls: "coDom" }],
    price: 280, deposit: 28, sex: "M", ageMonths: 4, weight: "32g",
    region: "Piemonte", city: "Asti", distanceKm: 55,
    seller: "Piedmont Geckos", verified: true, rating: 4.9, reviews: 47,
    image: IMG.hognose, category: "snakes", expoId: 1,
    sire: "Albino Conda", dam: "het Albino Conda",
    desc: "Mangia regolarmente in pinzetta. Carattere tipico hognose."
  },
];

const EXPOS = [
  {
    id: 1, name: "Verona Reptiles", location: "Cerea (VR)", date: "10 mag 2026", color: "from-orange-700 to-amber-600",
    description: "La più grande fiera di animali esotici d'Europa. 20ª edizione presso l'Area Exp di Cerea, oltre 800 spazi espositivi e 300 espositori da tutta Europa.",
    website: "https://www.veronareptiles.it",
    venue: "Area Exp · Via Libertà, 57",
  },
  {
    id: 2, name: "Squamata", location: "Ozzano dell'Emilia (BO)", date: "21 giu 2026", color: "from-emerald-700 to-teal-600",
    description: "Mostra mercato di terraristica nata nel 2006. Punto d'incontro per appassionati italiani in un ambiente familiare al Palagira di Ozzano.",
    website: "https://www.squamata.it",
    venue: "Palagira · Viale 2 Giugno, 3",
  },
  {
    id: 3, name: "Esotika Pet Show", location: "Arezzo", date: "12 set 2026", color: "from-sky-700 to-cyan-600",
    description: "Circuito di fiere itineranti dedicate agli animali esotici, con tappe in tutta Italia.",
    website: "https://www.esotika.it",
    venue: "Arezzo Fiere e Congressi",
  },
];

const CHATS = [
  { id: 1, listing: LISTINGS[0], lastMsg: "Perfetto, ci vediamo allo stand di Verona!", time: "14:20", unread: 0 },
  { id: 2, listing: LISTINGS[3], lastMsg: "I documenti CITES sono pronti.", time: "Ieri", unread: 2 },
  { id: 3, listing: LISTINGS[1], lastMsg: "Salve, è ancora disponibile?", time: "Lun", unread: 0 },
];

/* ───── Utilities ───────────────────────────────────────────────── */
const formatAge = (months, t) => {
  if (months < 12) return `${months} ${t.months}`;
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? t.year : t.years}`;
};
const formatPrice = (n) => `€${n.toLocaleString("it-IT")}`;
const sexLabel = (s, t) => ({ M: t.male, F: t.female, U: t.unsexed, P: t.pair }[s] || s);
const fallback = (label) =>
  `data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23292524'/><stop offset='1' stop-color='%231c1917'/></linearGradient></defs><rect width='400' height='400' fill='url(%23g)'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-style='italic' font-size='20' fill='%23a8a29e'>${label}</text></svg>`;

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP
   ═════════════════════════════════════════════════════════════════ */
export default function HerpMarket() {
  const [view, setView] = useState("home");
  const [viewData, setViewData] = useState(null);
  const [lang, setLang] = useState("it");
  const [favorites, setFavorites] = useState([1, 4]);
  const [filter, setFilter] = useState({ category: null, sex: null, region: null, sort: "newest", search: "" });

  // Auth state — null = logged out
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null); // null | { mode: "login"|"signup", reason: string|null, after: fn|null }

  const t = I18N[lang];

  const go = (v, data = null) => { setView(v); setViewData(data); window.scrollTo(0, 0); };
  const requireAuth = (reason, after) => {
    if (user) { after && after(); return true; }
    setAuthModal({ mode: "login", reason, after });
    return false;
  };
  const toggleFav = (id, e) => {
    e?.stopPropagation();
    if (!user) { setAuthModal({ mode: "login", reason: t.loginToFavorite, after: null }); return; }
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const handleLogin = (name) => {
    setUser({ name: name || "Marco R.", region: "Piemonte", verified: true });
    const after = authModal?.after;
    setAuthModal(null);
    after && setTimeout(after, 100);
  };
  const handleLogout = () => { setUser(null); go("home"); };

  const props = { t, lang, setLang, go, favorites, toggleFav, filter, setFilter, user, requireAuth, setAuthModal, handleLogout };

  const screen = () => {
    switch (view) {
      case "home":      return <Home_ {...props} />;
      case "search":    return <SearchScreen {...props} />;
      case "detail":    return <Detail listing={viewData} {...props} />;
      case "expo":      return <ExpoDetail expo={viewData} {...props} />;
      case "sell":      return user ? <SellScreen {...props} /> : <AuthGate reason={t.loginToSell} {...props} />;
      case "chat":      return user ? <ChatList {...props} /> : <AuthGate reason={t.loginToMessage} {...props} />;
      case "thread":    return user ? <ChatThread chat={viewData} {...props} /> : <AuthGate reason={t.loginToMessage} {...props} />;
      case "profile":   return user ? <Profile {...props} /> : <AuthGate reason={t.loginToSell} {...props} />;
      case "wishlist":  return <Wishlist {...props} />;
      case "legal":     return <Legal {...props} />;
      case "inventory": return <PlaceholderScreen title={t.inventory} {...props} icon={<ListOrdered size={28} />} />;
      case "lineage":   return <PlaceholderScreen title={t.lineage} {...props} icon={<Grid3x3 size={28} />} badge="PRO" />;
      case "transport": return <PlaceholderScreen title={t.transport} {...props} icon={<Truck size={28} />} />;
      case "reviews":   return <PlaceholderScreen title={t.reviews} {...props} icon={<Star size={28} />} />;
      case "documents": return <PlaceholderScreen title={t.citesArchive} {...props} icon={<FileText size={28} />} />;
      case "about":     return <AboutContact {...props} />;
      case "terms":     return <TermsLegal {...props} />;
      case "settings":  return <PlaceholderScreen title={t.settingsKyc} {...props} icon={<SettingsIcon size={28} />} />;
      default:          return <Home_ {...props} />;
    }
  };

  const profileViews = ["profile", "wishlist", "legal", "inventory", "lineage", "transport", "reviews", "documents", "about", "terms", "settings"];

  return (
    <div className="flex h-screen w-full bg-stone-950 text-stone-100 antialiased overflow-hidden"
         style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,400&family=Manrope:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; font-optical-sizing: auto; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background: #0c0a09; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .anim-up { animation: slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
      `}</style>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-stone-900/60 border-r border-stone-800 px-5 py-7 backdrop-blur">
        <Brand t={t} lang={lang} setLang={setLang} />
        <nav className="flex flex-col gap-1 mt-10 flex-1">
          <SideBtn icon={<Home size={18} />} label={t.home}    active={view === "home"}     onClick={() => go("home")} />
          <SideBtn icon={<Search size={18} />} label={t.search} active={view === "search"}  onClick={() => go("search")} />
          <SideBtn icon={<PlusCircle size={18} />} label={t.sell} active={view === "sell"} onClick={() => go("sell")} />
          <SideBtn icon={<MessageCircle size={18} />} label={t.chat} active={view === "chat" || view === "thread"} onClick={() => go("chat")} />
          <SideBtn icon={<User size={18} />} label={t.profile} active={profileViews.includes(view)} onClick={() => go("profile")} />
        </nav>
        {/* Login / user block in sidebar */}
        <div className="mt-auto pt-4 border-t border-stone-800">
          {user ? (
            <button onClick={() => go("profile")}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-stone-800/60 transition-colors text-left">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display text-sm text-stone-50 font-bold">
                {user.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-stone-100 truncate">{user.name}</div>
                <div className="text-[10px] text-amber-400">{t.verifiedBreeder}</div>
              </div>
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <button onClick={() => setAuthModal({ mode: "login", reason: null, after: null })}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <LogIn size={14} />{t.login}
              </button>
              <button onClick={() => setAuthModal({ mode: "signup", reason: null, after: null })}
                      className="w-full bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-xs py-2.5 rounded-lg transition-colors">
                {t.signup}
              </button>
            </div>
          )}
          <p className="text-[10px] text-stone-600 mt-3 text-center">HerpMarket · v0.1 · Beta</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Mobile top header (visible on home only — other screens have their own headers) */}
        {view === "home" && (
          <header className="md:hidden absolute top-0 inset-x-0 z-40 px-5 pt-3 flex justify-end pointer-events-none">
            <div className="pointer-events-auto">
              {user ? (
                <button onClick={() => go("profile")}
                        className="flex items-center gap-2 bg-stone-900/80 backdrop-blur ring-1 ring-stone-700 rounded-full pl-1 pr-3 py-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display text-xs text-stone-50 font-bold">
                    {user.name[0]}
                  </div>
                  <span className="text-xs font-bold text-stone-100">{user.name.split(" ")[0]}</span>
                </button>
              ) : (
                <button onClick={() => setAuthModal({ mode: "login", reason: null, after: null })}
                        className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                  <LogIn size={12} />{t.loginOrJoin}
                </button>
              )}
            </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 md:pb-0">
          {screen()}
        </div>
        {/* Mobile bottom nav */}
        <nav className="md:hidden absolute bottom-0 inset-x-0 z-50 bg-stone-950/90 backdrop-blur-xl border-t border-stone-800 px-3 pt-2 pb-6 flex justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <TabBtn icon={<Home size={20} />} label={t.home}    active={view === "home"}    onClick={() => go("home")} />
          <TabBtn icon={<Search size={20} />} label={t.search} active={view === "search"} onClick={() => go("search")} />
          <TabBtn icon={<PlusCircle size={24} />} label={t.sell} active={view === "sell"} onClick={() => go("sell")} accent />
          <TabBtn icon={<MessageCircle size={20} />} label={t.chat} active={view === "chat" || view === "thread"} onClick={() => go("chat")} />
          <TabBtn icon={<User size={20} />} label={t.profile} active={profileViews.includes(view)} onClick={() => go("profile")} />
        </nav>
      </div>

      {/* Auth modal */}
      {authModal && (
        <AuthModal modal={authModal} setModal={setAuthModal} onLogin={handleLogin} t={t} lang={lang} />
      )}

      {/* Demo state toggle — floating, dismissible. Lets you instantly flip auth for demos. */}
      <DemoToggle user={user} onLogin={() => handleLogin("Marco R.")} onLogout={handleLogout} />
    </div>
  );
}

function DemoToggle({ user, onLogin, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="fixed bottom-24 md:bottom-4 right-3 z-[55] flex items-center gap-1.5">
      {collapsed ? (
        <button onClick={() => setCollapsed(false)}
                className="bg-stone-900/90 backdrop-blur ring-1 ring-stone-700 text-stone-400 hover:text-amber-400 rounded-full w-8 h-8 flex items-center justify-center text-[10px] font-black shadow-xl transition-colors"
                title="Show demo toggle">
          ⚙
        </button>
      ) : (
        <div className="bg-stone-900/90 backdrop-blur ring-1 ring-stone-700 rounded-full pl-2.5 pr-1 py-1 flex items-center gap-2 shadow-xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-stone-500">Demo</span>
          <button onClick={user ? onLogout : onLogin}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                    user ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/25"
                         : "bg-stone-700 text-stone-300 hover:bg-stone-600"
                  }`}>
            {user ? "● Logged in" : "○ Logged out"}
          </button>
          <button onClick={() => setCollapsed(true)}
                  className="text-stone-500 hover:text-stone-200 w-5 h-5 flex items-center justify-center text-xs"
                  title="Hide">
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Reusable bits ─────────────────────────────────────────────── */
function Brand({ t, lang, setLang }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <h1 className="font-display text-2xl text-stone-50 leading-none tracking-tight" style={{ fontVariationSettings: "'opsz' 100" }}>
          Herp<span className="italic text-amber-500">Market</span>
        </h1>
      </div>
      <p className="text-[10px] text-stone-400 mt-2 leading-snug max-w-[180px]">{t.tagline}</p>
      <button onClick={() => setLang(lang === "it" ? "en" : "it")}
              className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-stone-400 hover:text-amber-400 transition-colors">
        <Languages size={11} /> <span className="uppercase tracking-widest font-bold">{lang === "it" ? "EN" : "IT"}</span>
      </button>
    </div>
  );
}

function SideBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              active ? "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20" : "text-stone-400 hover:text-stone-100 hover:bg-stone-800/50"
            }`}>
      {icon}<span>{label}</span>
    </button>
  );
}

function TabBtn({ icon, label, active, onClick, accent }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 px-2 py-1">
      <div className={`${accent && active ? "bg-amber-500 text-stone-950" : accent ? "bg-amber-500/10 text-amber-400" : ""} ${accent ? "p-1.5 rounded-full" : ""} ${!accent && active ? "text-amber-400" : !accent ? "text-stone-500" : ""} transition-all`}>
        {icon}
      </div>
      <span className={`text-[9px] font-semibold tracking-wide ${active ? "text-amber-400" : "text-stone-500"}`}>{label}</span>
    </button>
  );
}

/* Trait chip — color-coded by trait class */
function TraitChip({ trait, size = "sm" }) {
  const cls = TRAIT_CLASS[trait.cls] || TRAIT_CLASS.wild;
  const pad = size === "xs" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]";
  return (
    <span className={`inline-flex items-center gap-1 rounded-md ring-1 font-semibold ${pad} ${cls.bg} ${cls.text} ${cls.ring}`}>
      <span className={`w-1 h-1 rounded-full ${cls.dot}`} />
      {trait.name}
    </span>
  );
}

/* Sex icon with color */
function SexIcon({ sex, t, withLabel = false, size = 12 }) {
  if (sex === "M") return <span className="inline-flex items-center gap-1 text-sky-400"><Mars size={size} />{withLabel && <span className="text-[10px] font-bold">{t.male}</span>}</span>;
  if (sex === "F") return <span className="inline-flex items-center gap-1 text-rose-400"><Venus size={size} />{withLabel && <span className="text-[10px] font-bold">{t.female}</span>}</span>;
  if (sex === "P") return <span className="inline-flex items-center gap-1 text-violet-400"><Mars size={size - 2} /><Venus size={size - 2} />{withLabel && <span className="text-[10px] font-bold">{t.pair}</span>}</span>;
  return <span className="inline-flex items-center gap-1 text-stone-400"><HelpCircle size={size} />{withLabel && <span className="text-[10px] font-bold">{t.unsexed}</span>}</span>;
}

/* The central listing card — dense, MorphMarket-style */
function ListingCard({ item, go, favorites, toggleFav, t }) {
  return (
    <div onClick={() => go("detail", item)}
         className="group bg-stone-900/60 border border-stone-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all flex flex-col">
      <div className="relative aspect-square bg-stone-800 overflow-hidden">
        <img src={item.image} alt={item.common}
             onError={(e) => { e.target.onerror = null; e.target.src = fallback(t.realPhoto); }}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {/* Sex badge top-left */}
        <div className="absolute top-2 left-2 bg-stone-950/80 backdrop-blur-sm rounded-md px-1.5 py-1 ring-1 ring-stone-700/50">
          <SexIcon sex={item.sex} t={t} size={11} />
        </div>
        {/* Heart top-right */}
        <button onClick={(e) => toggleFav(item.id, e)}
                className="absolute top-2 right-2 p-1.5 bg-stone-950/80 backdrop-blur-sm rounded-full ring-1 ring-stone-700/50 hover:ring-rose-500/50 transition-all">
          <Heart size={12} className={favorites.includes(item.id) ? "fill-rose-500 text-rose-500" : "text-stone-300"} />
        </button>
        {/* Expo flag bottom-left */}
        {item.expoId && (() => {
          const expo = EXPOS.find(e => e.id === item.expoId);
          return expo ? (
            <div className="absolute bottom-2 left-2 bg-amber-500/95 text-stone-950 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-lg">
              ★ {expo.name.split(" ")[0]}
            </div>
          ) : null;
        })()}
      </div>

      <div className="p-2.5 flex-1 flex flex-col gap-1.5">
        <div>
          <h4 className="text-[13px] font-bold text-stone-50 leading-tight truncate">{item.common}</h4>
          <p className="text-[10px] text-stone-500 italic truncate">{item.species}</p>
        </div>

        {/* Trait chips */}
        <div className="flex flex-wrap gap-1 min-h-[18px]">
          {item.traits.slice(0, 2).map((tr, i) => <TraitChip key={i} trait={tr} size="xs" />)}
          {item.traits.length > 2 && (
            <span className="text-[9px] text-stone-500 font-bold self-center">+{item.traits.length - 2}</span>
          )}
        </div>

        {/* Footer: price + age */}
        <div className="flex items-end justify-between pt-1.5 mt-auto border-t border-stone-800/60">
          <div>
            <div className="font-display font-bold text-amber-400 text-base leading-none">{formatPrice(item.price)}</div>
            <div className="text-[9px] text-stone-500 mt-1 truncate">{formatAge(item.ageMonths, t)} · {item.city}</div>
          </div>
          {item.verified && <ShieldCheck size={12} className="text-sky-400 mb-1 shrink-0" />}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME — clean: hero → category strip → expos → near you → all
   ═════════════════════════════════════════════════════════════════ */
function Home_({ t, lang, setLang, go, favorites, toggleFav }) {
  const userRegion = "Piemonte";
  const near = LISTINGS.filter(l => l.region === userRegion);
  const all = LISTINGS;

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Mobile header */}
      <header className="md:hidden px-5 pt-14 pb-5 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800/60">
        <div>
          <h1 className="font-display text-3xl text-stone-50 leading-none tracking-tight" style={{ fontVariationSettings: "'opsz' 144" }}>
            Herp<span className="italic text-amber-500">Market</span>
          </h1>
          <p className="text-[11px] text-stone-400 mt-2 italic font-display">{t.tagline}</p>
        </div>
      </header>

      {/* Desktop hero */}
      <header className="hidden md:block px-8 pt-10 pb-6 border-b border-stone-800/60">
        <h2 className="font-display text-4xl text-stone-50 tracking-tight" style={{ fontVariationSettings: "'opsz' 144" }}>
          {lang === "it" ? <>Trova il tuo prossimo <span className="italic text-amber-500">esemplare</span>.</> :
                           <>Find your next <span className="italic text-amber-500">animal</span>.</>}
        </h2>
        <p className="text-stone-400 text-sm mt-2 max-w-xl">
          {lang === "it"
            ? "Allevatori italiani verificati, documentazione CITES integrata, prenotazioni sicure per le fiere."
            : "Verified Italian breeders, integrated CITES paperwork, secure expo reservations."}
        </p>
      </header>

      {/* Category strip */}
      <section className="px-5 md:px-8 pt-6 pb-2">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-base md:text-lg text-stone-100 tracking-tight">{t.browseByCategory}</h3>
        </div>
        <div className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar -mx-5 px-5 md:mx-0 md:px-0 pb-2">
          {CATEGORIES.map((c, i) => (
            <button key={c.id} onClick={() => go("search")}
                    className="anim-up shrink-0 bg-stone-900/60 hover:bg-stone-800/60 border border-stone-800 hover:border-amber-500/40 rounded-xl px-4 py-3 transition-all min-w-[110px] text-left"
                    style={{ animationDelay: `${i * 30}ms` }}>
              <div className="text-2xl mb-1.5">{c.emoji}</div>
              <div className="font-bold text-sm text-stone-100">{c[lang]}</div>
              <div className="text-[10px] text-stone-500 font-medium">{c.count} {lang === "it" ? "annunci" : "listings"}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Expos */}
      <section className="px-5 md:px-8 pt-6">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-base md:text-lg text-stone-100 tracking-tight flex items-center gap-2">
            <Calendar size={16} className="text-amber-500" />{t.upcomingExpos}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EXPOS.map((expo, i) => {
            const expoAnimalsCount = LISTINGS.filter(l => l.expoId === expo.id).length;
            return (
              <button key={expo.id}
                      onClick={() => go("expo", expo)}
                      className={`anim-up bg-gradient-to-br ${expo.color} rounded-xl p-4 cursor-pointer hover:scale-[1.02] transition-transform text-left relative overflow-hidden group`}
                      style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="text-[10px] text-white/80 uppercase tracking-widest font-bold">{expo.date}</div>
                  {expoAnimalsCount > 0 && (
                    <div className="bg-white/15 backdrop-blur ring-1 ring-white/20 rounded-full px-2 py-0.5 text-[10px] font-bold text-white">
                      {expoAnimalsCount} {lang === "it" ? "animali" : "animals"}
                    </div>
                  )}
                </div>
                <h4 className="font-display text-lg text-white mt-1 leading-tight">{expo.name}</h4>
                <div className="flex items-center gap-1 text-white/80 text-xs mt-1.5">
                  <MapPin size={11} />{expo.location}
                </div>
                <ChevronRight size={16} className="absolute bottom-3 right-3 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Near you */}
      {near.length > 0 && (
        <section className="px-5 md:px-8 pt-8">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="font-display text-base md:text-lg text-stone-100 tracking-tight flex items-center gap-2">
              <MapPin size={16} className="text-amber-500" />{t.nearYou} · <span className="text-stone-400 text-sm not-italic">{userRegion}</span>
            </h3>
            <button onClick={() => go("search")} className="text-[11px] text-amber-400 font-bold hover:underline">{t.seeAll} →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
            {near.map(item => <ListingCard key={item.id} item={item} go={go} favorites={favorites} toggleFav={toggleFav} t={t} />)}
          </div>
        </section>
      )}

      {/* All */}
      <section className="px-5 md:px-8 pt-8 pb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-base md:text-lg text-stone-100 tracking-tight">{t.allListings}</h3>
          <button onClick={() => go("search")} className="text-[11px] text-amber-400 font-bold hover:underline">{t.filters} →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
          {all.map(item => <ListingCard key={item.id} item={item} go={go} favorites={favorites} toggleFav={toggleFav} t={t} />)}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SEARCH — filters drawer + grid (the real MorphMarket workhorse)
   ═════════════════════════════════════════════════════════════════ */
function SearchScreen({ t, lang, go, favorites, toggleFav, filter, setFilter }) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let r = LISTINGS;
    if (filter.category) r = r.filter(l => l.category === filter.category);
    if (filter.sex)      r = r.filter(l => l.sex === filter.sex);
    if (filter.region)   r = r.filter(l => l.region === filter.region);
    if (filter.search) {
      const q = filter.search.toLowerCase();
      r = r.filter(l => l.species.toLowerCase().includes(q) || l.common.toLowerCase().includes(q) || l.traits.some(tr => tr.name.toLowerCase().includes(q)));
    }
    if (filter.sort === "priceAsc")  r = [...r].sort((a, b) => a.price - b.price);
    if (filter.sort === "priceDesc") r = [...r].sort((a, b) => b.price - a.price);
    if (filter.sort === "distance")  r = [...r].sort((a, b) => a.distanceKm - b.distanceKm);
    return r;
  }, [filter]);

  const activeFilterCount = [filter.category, filter.sex, filter.region].filter(Boolean).length;
  const sortLabels = { newest: t.sortNewest, priceAsc: t.sortPriceAsc, priceDesc: t.sortPriceDesc, distance: t.sortDistance };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Sticky search bar */}
      <div className="sticky top-0 z-30 bg-stone-950/95 backdrop-blur-xl border-b border-stone-800">
        <div className="px-5 md:px-8 pt-6 pb-3">
          <h1 className="hidden md:block font-display text-2xl text-stone-50 mb-3 tracking-tight">{t.search}</h1>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              value={filter.search}
              onChange={e => setFilter({ ...filter, search: e.target.value })}
              placeholder={lang === "it" ? "Cerca morph, specie, allevatore…" : "Search morph, species, breeder…"}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-10 pr-3 py-3 text-sm text-stone-100 placeholder:text-stone-500 outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>

          {/* Filter / sort bar */}
          <div className="flex items-center gap-2 mt-3">
            <button onClick={() => setShowFilters(true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeFilterCount > 0 ? "bg-amber-500 text-stone-950" : "bg-stone-900 text-stone-300 ring-1 ring-stone-800 hover:ring-stone-700"
                    }`}>
              <SlidersHorizontal size={12} />{t.filters}
              {activeFilterCount > 0 && <span className="bg-stone-950/30 px-1.5 rounded">{activeFilterCount}</span>}
            </button>
            <button onClick={() => setShowSort(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-900 text-stone-300 ring-1 ring-stone-800 hover:ring-stone-700">
              <ArrowUpDown size={12} />{sortLabels[filter.sort]}
            </button>
            <div className="ml-auto text-[10px] text-stone-500 font-bold uppercase tracking-widest">{t.resultsCount(filtered.length)}</div>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {filter.category && (
                <FilterPill onRemove={() => setFilter({ ...filter, category: null })}>
                  {CATEGORIES.find(c => c.id === filter.category)?.[lang]}
                </FilterPill>
              )}
              {filter.sex && <FilterPill onRemove={() => setFilter({ ...filter, sex: null })}>{sexLabel(filter.sex, t)}</FilterPill>}
              {filter.region && <FilterPill onRemove={() => setFilter({ ...filter, region: null })}>{filter.region}</FilterPill>}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 md:px-8 py-5 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <p className="font-display italic text-lg">Nessun risultato trovato</p>
            <p className="text-xs mt-2">Prova a modificare i filtri</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
            {filtered.map(item => <ListingCard key={item.id} item={item} go={go} favorites={favorites} toggleFav={toggleFav} t={t} />)}
          </div>
        )}
      </div>

      {/* Filters drawer */}
      {showFilters && (
        <BottomSheet onClose={() => setShowFilters(false)} title={t.filters}>
          <div className="space-y-5">
            <FilterGroup label={t.species}>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map(c => (
                  <ToggleChip key={c.id} active={filter.category === c.id}
                              onClick={() => setFilter({ ...filter, category: filter.category === c.id ? null : c.id })}>
                    {c.emoji} {c[lang]}
                  </ToggleChip>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup label={t.sex}>
              <div className="flex flex-wrap gap-1.5">
                {["M", "F", "U", "P"].map(s => (
                  <ToggleChip key={s} active={filter.sex === s}
                              onClick={() => setFilter({ ...filter, sex: filter.sex === s ? null : s })}>
                    {sexLabel(s, t)}
                  </ToggleChip>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup label={t.region}>
              <select value={filter.region || ""} onChange={e => setFilter({ ...filter, region: e.target.value || null })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/60">
                <option value="">{REGIONS[0]}</option>
                {REGIONS.slice(1).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </FilterGroup>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setFilter({ category: null, sex: null, region: null, sort: filter.sort, search: filter.search }); }}
                      className="flex-1 py-3 rounded-lg text-sm font-bold bg-stone-800 text-stone-300 hover:bg-stone-700 transition-colors">
                {t.reset}
              </button>
              <button onClick={() => setShowFilters(false)}
                      className="flex-[2] py-3 rounded-lg text-sm font-bold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors">
                {t.apply}
              </button>
            </div>
          </div>
        </BottomSheet>
      )}

      {/* Sort drawer */}
      {showSort && (
        <BottomSheet onClose={() => setShowSort(false)} title={t.sort}>
          <div className="space-y-1">
            {Object.entries(sortLabels).map(([key, label]) => (
              <button key={key}
                      onClick={() => { setFilter({ ...filter, sort: key }); setShowSort(false); }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        filter.sort === key ? "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20" : "text-stone-300 hover:bg-stone-800/60"
                      }`}>
                {label}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
}

function FilterPill({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-stone-800 ring-1 ring-stone-700 text-stone-200 text-[11px] font-bold px-2 py-0.5 rounded-md">
      {children}
      <button onClick={onRemove}><X size={11} className="text-stone-400 hover:text-rose-400" /></button>
    </span>
  );
}
function FilterGroup({ label, children }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{label}</div>
      {children}
    </div>
  );
}
function ToggleChip({ active, onClick, children }) {
  return (
    <button onClick={onClick}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              active ? "bg-amber-500 text-stone-950" : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}>
      {children}
    </button>
  );
}
function BottomSheet({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-stone-950/80 backdrop-blur-sm" onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
           className="w-full md:max-w-md bg-stone-900 ring-1 ring-stone-800 rounded-t-3xl md:rounded-2xl p-5 max-h-[85vh] overflow-y-auto hide-scrollbar anim-up">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg text-stone-50">{title}</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-100"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DETAIL
   ═════════════════════════════════════════════════════════════════ */
function Detail({ listing, go, t, favorites, toggleFav, user, requireAuth, lang }) {
  const [reserveState, setReserveState] = useState("idle"); // idle | pending | approved | paid
  const [showCheckout, setShowCheckout] = useState(false);

  if (!listing) return null;
  const a = listing;
  const expo = a.expoId ? EXPOS.find(e => e.id === a.expoId) : null;

  const handleReserve = () => {
    if (!requireAuth(t.loginToReserve, () => {})) return;
    if (reserveState === "idle") {
      setReserveState("pending");
      setTimeout(() => setReserveState("approved"), 2500);
    } else if (reserveState === "approved") {
      setShowCheckout(true);
    }
  };
  const handleMessage = () => {
    requireAuth(t.loginToMessage, () => go("thread", { id: 99, listing: a, lastMsg: "", time: "" }));
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-32 md:pb-10">
      {/* Hero image */}
      <div className="relative aspect-square md:aspect-[16/10] bg-stone-800 overflow-hidden">
        <img src={a.image} alt={a.common}
             onError={(e) => { e.target.onerror = null; e.target.src = fallback(t.realPhoto); }}
             className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-stone-950/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 to-transparent" />
        <button onClick={() => go("home")}
                className="absolute top-5 left-4 p-2.5 bg-stone-950/70 backdrop-blur-md rounded-full text-stone-100 hover:bg-stone-950/90 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button onClick={(e) => toggleFav(a.id, e)}
                className="absolute top-5 right-4 p-2.5 bg-stone-950/70 backdrop-blur-md rounded-full transition-colors">
          <Heart size={20} className={favorites.includes(a.id) ? "fill-rose-500 text-rose-500" : "text-stone-100"} />
        </button>
      </div>

      {/* Title block */}
      <div className="px-5 -mt-12 relative z-10">
        <h1 className="font-display text-3xl md:text-4xl text-stone-50 tracking-tight leading-tight">{a.common}</h1>
        <p className="font-display italic text-amber-500 text-sm md:text-base mt-1">{a.species}</p>

        {/* Trait chips */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {a.traits.map((tr, i) => <TraitChip key={i} trait={tr} size="sm" />)}
        </div>

        {/* Price */}
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-display font-bold text-4xl text-stone-50">{formatPrice(a.price)}</span>
          <span className="text-xs text-stone-500">· {t.payDeposit.toLowerCase()} {formatPrice(a.deposit)}</span>
        </div>
      </div>

      {/* Specs grid */}
      <div className="px-5 mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        <Spec label={t.sex}>{sexLabel(a.sex, t)}</Spec>
        <Spec label={t.age}>{formatAge(a.ageMonths, t)}</Spec>
        <Spec label={t.weight}>{a.weight}</Spec>
        <Spec label="Località">{a.city}</Spec>
      </div>

      {/* Description */}
      <Section title={t.description}>
        <p className="text-sm text-stone-300 leading-relaxed">{a.desc}</p>
      </Section>

      {/* Parentage */}
      <Section title={t.parentage}>
        {a.sire || a.dam ? (
          <div className="grid grid-cols-2 gap-2">
            <ParentCard role="sire" label={t.sire}>{a.sire || t.unknown}</ParentCard>
            <ParentCard role="dam"  label={t.dam}>{a.dam || t.unknown}</ParentCard>
          </div>
        ) : (
          <p className="text-sm text-stone-500 italic font-display">{t.unknown}</p>
        )}
      </Section>

      {/* Seller card */}
      <Section title={t.seller}>
        <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center font-display text-lg text-stone-50 font-bold">
            {a.seller[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-100 text-sm">{a.seller}</span>
              {a.verified && <ShieldCheck size={14} className="text-sky-400" />}
            </div>
            <div className="flex items-center gap-1 text-xs text-stone-400 mt-0.5">
              <Star size={11} fill="currentColor" className="text-amber-400" />
              <span className="font-bold text-stone-200">{a.rating}</span>
              <span>({a.reviews})</span>
              <span className="text-stone-600 mx-1">·</span>
              <span>{a.region}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* CITES notice if applicable */}
      {(a.category === "tortoises" || a.category === "chameleons") && (
        <Section title={t.cites}>
          <div className="bg-amber-500/5 ring-1 ring-amber-500/20 rounded-xl p-4 flex gap-3">
            <FileText size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90 leading-relaxed">{t.citesNotice}. {t.captiveBred}.</p>
          </div>
        </Section>
      )}

      {/* Expo pickup notice */}
      {expo && (
        <Section title={t.pickupAtExpo}>
          <button onClick={() => go("expo", expo)}
                  className={`w-full bg-gradient-to-br ${expo.color} rounded-xl p-4 text-left hover:scale-[1.01] transition-transform flex items-center gap-3`}>
            <Calendar size={20} className="text-white shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] text-white/80 uppercase tracking-widest font-bold">{expo.date}</div>
              <div className="font-display text-base text-white leading-tight">{expo.name}</div>
              <div className="text-[11px] text-white/80 mt-0.5">{expo.location}</div>
            </div>
            <ChevronRight size={16} className="text-white/60 shrink-0" />
          </button>
        </Section>
      )}

      {/* Sticky action bar */}
      <div className="fixed md:absolute bottom-16 md:bottom-0 inset-x-0 z-30 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2">
          <button onClick={handleMessage}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
            <MessageCircle size={16} />{t.message}
          </button>
          {expo && (
            <button onClick={handleReserve} disabled={reserveState === "pending" || reserveState === "paid"}
                    className={`flex-[1.4] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      reserveState === "idle" ? "bg-amber-500 hover:bg-amber-400 text-stone-950" :
                      reserveState === "pending" ? "bg-stone-800 text-stone-400 cursor-wait" :
                      reserveState === "approved" ? "bg-emerald-500 hover:bg-emerald-400 text-stone-950 animate-pulse" :
                      "bg-emerald-700 text-stone-100"
                    }`}>
              {reserveState === "idle" && <><Calendar size={16} />{t.reserveAtExpo} · {formatPrice(a.deposit)}</>}
              {reserveState === "pending" && <span className="text-xs">{t.reservationPending}</span>}
              {reserveState === "approved" && <><CreditCard size={16} />{t.payDeposit}</>}
              {reserveState === "paid" && <><CheckCircle size={16} />{t.reserved}</>}
            </button>
          )}
        </div>
      </div>

      {/* Checkout modal */}
      {showCheckout && (
        <Checkout amount={a.deposit} t={t}
                  onClose={(success) => { setShowCheckout(false); if (success) setReserveState("paid"); }} />
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="px-5 mt-6">
      <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2.5">{title}</h3>
      {children}
    </div>
  );
}
function Spec({ label, children }) {
  return (
    <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-lg px-3 py-2.5">
      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">{label}</div>
      <div className="text-sm font-bold text-stone-100 mt-0.5">{children}</div>
    </div>
  );
}
function ParentCard({ role, label, children }) {
  const color = role === "sire" ? "text-sky-300 bg-sky-500/5 ring-sky-500/20" : "text-rose-300 bg-rose-500/5 ring-rose-500/20";
  return (
    <div className={`rounded-lg ring-1 px-3 py-2.5 ${color}`}>
      <div className="text-[9px] font-bold uppercase tracking-widest opacity-70">{label}</div>
      <div className="text-sm font-bold mt-0.5">{children}</div>
    </div>
  );
}

function Checkout({ amount, onClose, t }) {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setDone(true); setTimeout(() => onClose(true), 1400); }, 1800);
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4">
      <div className="bg-stone-900 ring-1 ring-stone-800 rounded-2xl w-full max-w-sm overflow-hidden anim-up">
        <div className="px-5 py-4 border-b border-stone-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-stone-100"><Lock size={14} className="text-amber-500" /><span className="font-bold text-sm">{t.secureCheckout}</span></div>
          {!processing && !done && <button onClick={() => onClose(false)} className="text-stone-400 hover:text-stone-100"><X size={18} /></button>}
        </div>
        <div className="p-6 text-center">
          {done ? (
            <div className="py-4">
              <div className="w-14 h-14 mx-auto bg-emerald-500/15 ring-1 ring-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-3">
                <CheckCircle size={28} />
              </div>
              <h3 className="font-display text-xl text-stone-50">{t.paymentSuccess}</h3>
              <p className="text-xs text-stone-400 mt-1">{t.paymentSuccessSub}</p>
            </div>
          ) : (
            <>
              <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Acconto</div>
              <div className="font-display text-4xl text-stone-50 mt-1">{formatPrice(amount)}</div>
              <div className="mt-6 bg-stone-800/60 ring-1 ring-stone-700 rounded-lg px-3 py-2.5 flex items-center gap-2.5 text-left">
                <CreditCard size={16} className="text-stone-400" />
                <span className="text-sm text-stone-200">•••• 4242</span>
              </div>
              <button onClick={handlePay} disabled={processing}
                      className="w-full mt-4 py-3 rounded-lg font-bold text-sm bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors disabled:bg-stone-800 disabled:text-stone-500">
                {processing ? "…" : `${t.payNow} ${formatPrice(amount)}`}
              </button>
              <p className="text-[10px] text-stone-500 mt-3 leading-relaxed">{t.depositNotice}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SELL — simplified, single-page form
   ═════════════════════════════════════════════════════════════════ */
function SellScreen({ t, lang, go }) {
  const [success, setSuccess] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const exampleTraits = [
    { name: "Pastel", cls: "coDom" }, { name: "Banana", cls: "coDom" },
    { name: "Albino", cls: "recessive" }, { name: "Pied", cls: "recessive" },
    { name: "Lilly White", cls: "coDom" }, { name: "Harlequin", cls: "polygenic" },
    { name: "Wild Type", cls: "wild" }
  ];

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="w-16 h-16 bg-emerald-500/15 ring-1 ring-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-5">
          <CheckCircle size={32} />
        </div>
        <h2 className="font-display text-2xl text-stone-50">Annuncio pubblicato</h2>
        <p className="text-stone-400 text-sm mt-1.5">Sarà visibile agli acquirenti entro pochi minuti.</p>
        <button onClick={() => { setSuccess(false); go("home"); }}
                className="mt-6 px-6 py-3 bg-amber-500 text-stone-950 font-bold text-sm rounded-lg hover:bg-amber-400 transition-colors">
          {t.backToBrowse}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full pb-24">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800">
        <h1 className="font-display text-2xl md:text-3xl text-stone-50 tracking-tight">{t.sell}</h1>
        <p className="text-xs text-stone-400 mt-1">
          {lang === "it" ? "Compila i dettagli del tuo esemplare." : "Fill in your animal's details."}
        </p>
      </header>

      <div className="p-5 md:p-8 space-y-6">
        {/* Photos */}
        <FormBlock>
          <button className="w-full border-2 border-dashed border-stone-700 hover:border-amber-500/60 rounded-xl py-10 transition-colors flex flex-col items-center gap-2 text-stone-400 hover:text-amber-400">
            <Camera size={28} />
            <span className="text-xs font-bold uppercase tracking-widest">{t.uploadPhotos}</span>
          </button>
        </FormBlock>

        <FormBlock label={t.listingTitle}>
          <input className="form-input" placeholder={lang === "it" ? "es. Geco crestato Lilly White femmina" : "e.g. Lilly White female crested gecko"} />
        </FormBlock>

        <div className="grid grid-cols-2 gap-3">
          <FormBlock label={t.species}>
            <select className="form-input">
              <option value="">{t.pickSpecies}</option>
              {CATEGORIES.map(c => <option key={c.id}>{c[lang]}</option>)}
            </select>
          </FormBlock>
          <FormBlock label={t.sex}>
            <select className="form-input">
              <option>{t.male}</option><option>{t.female}</option><option>{t.pair}</option><option>{t.unsexed}</option>
            </select>
          </FormBlock>
        </div>

        <FormBlock label={t.traits}>
          <div className="flex flex-wrap gap-1.5">
            {exampleTraits.map((tr, i) => {
              const isSelected = selectedTraits.includes(tr.name);
              return (
                <button key={i}
                        onClick={() => setSelectedTraits(isSelected ? selectedTraits.filter(s => s !== tr.name) : [...selectedTraits, tr.name])}
                        className="transition-transform hover:scale-105">
                  <span className={isSelected ? "" : "opacity-40"}><TraitChip trait={tr} size="sm" /></span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-stone-500 mt-2">{t.pickTraits}</p>
        </FormBlock>

        <div className="grid grid-cols-2 gap-3">
          <FormBlock label={t.price}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">€</span>
              <input type="number" className="form-input pl-7" placeholder="150" />
            </div>
          </FormBlock>
          <FormBlock label={t.born}>
            <input type="text" className="form-input" placeholder="MM/AAAA" />
          </FormBlock>
        </div>

        <FormBlock label={t.region}>
          <select className="form-input">
            {REGIONS.slice(1).map(r => <option key={r}>{r}</option>)}
          </select>
        </FormBlock>

        <FormBlock label={t.description}>
          <textarea rows="4" placeholder={t.describePlaceholder} className="form-input resize-none" />
        </FormBlock>

        <button onClick={() => setSuccess(true)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 rounded-lg text-sm transition-colors mt-4">
          {t.publishListing}
        </button>

        <style>{`
          .form-input {
            width: 100%;
            background: rgb(28 25 23);
            border: 1px solid rgb(41 37 36);
            border-radius: 0.5rem;
            padding: 0.75rem 0.875rem;
            font-size: 0.875rem;
            color: rgb(245 245 244);
            outline: none;
            transition: border-color 0.15s;
          }
          .form-input:focus { border-color: rgb(245 158 11 / 0.6); }
          .form-input::placeholder { color: rgb(120 113 108); }
        `}</style>
      </div>
    </div>
  );
}

function FormBlock({ label, children }) {
  return (
    <div>
      {label && <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{label}</div>}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CHAT
   ═════════════════════════════════════════════════════════════════ */
function ChatList({ t, go }) {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800">
        <h1 className="font-display text-2xl md:text-3xl text-stone-50 tracking-tight">{t.chat}</h1>
      </header>
      <div className="p-3 md:p-5 space-y-1">
        {CHATS.map(chat => (
          <button key={chat.id} onClick={() => go("thread", chat)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-stone-900/60 transition-colors text-left">
            <div className="relative shrink-0">
              <img src={chat.listing.image} alt=""
                   onError={(e) => { e.target.onerror = null; e.target.src = fallback(t.realPhoto); }}
                   className="w-12 h-12 rounded-lg object-cover" />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{chat.unread}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-sm text-stone-100 truncate">{chat.listing.seller}</div>
                <div className="text-[10px] text-stone-500 font-medium shrink-0 ml-2">{chat.time}</div>
              </div>
              <div className="text-xs text-stone-400 truncate">{chat.lastMsg}</div>
              <div className="text-[10px] text-amber-400 font-bold mt-0.5 truncate italic font-display">{chat.listing.common} · {chat.listing.traits[0]?.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatThread({ chat, t, lang, go }) {
  const target = chat?.listing || LISTINGS[0];
  const [messages, setMessages] = useState([
    { from: "me", text: "Salve, l'esemplare è ancora disponibile per la fiera di Verona?" },
    { from: "them", text: "Ciao! Sì, lo porto a Verona. Se vuoi bloccarlo prima che lo venda ad altri, puoi inviare una richiesta tramite l'app." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <header className="px-4 pt-5 pb-3 border-b border-stone-800 flex items-center gap-3 sticky top-0 bg-stone-950/95 backdrop-blur-xl z-20">
        <button onClick={() => go("chat")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={22} /></button>
        <img src={target.image} alt=""
             onError={(e) => { e.target.onerror = null; e.target.src = fallback(t.realPhoto); }}
             className="w-10 h-10 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm text-stone-100 truncate">{target.seller}</div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{t.onlineNow}
          </div>
        </div>
        <button onClick={() => go("detail", target)}
                className="text-[10px] font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300">
          {formatPrice(target.price)}
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
            m.from === "me" ? "ml-auto bg-amber-500 text-stone-950 rounded-tr-sm" : "bg-stone-800 text-stone-100 rounded-tl-sm"
          }`}>
            {m.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-stone-800 flex gap-2 bg-stone-950">
        <input value={input} onChange={e => setInput(e.target.value)}
               onKeyDown={e => e.key === "Enter" && send()}
               placeholder={t.typeMessage}
               className="flex-1 bg-stone-900 ring-1 ring-stone-800 rounded-full px-4 py-2.5 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
        <button onClick={send}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 p-2.5 rounded-full transition-colors">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROFILE — grouped sections, logout, user info from auth state
   ═════════════════════════════════════════════════════════════════ */
function Profile({ t, go, lang, user, handleLogout }) {
  return (
    <div className="max-w-2xl mx-auto w-full pb-10">
      <header className="px-5 md:px-8 pt-8 pb-6 border-b border-stone-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display text-2xl text-stone-50 font-bold">
            {user?.name?.[0] || "M"}
          </div>
          <div>
            <h1 className="font-display text-2xl text-stone-50 tracking-tight flex items-center gap-2">
              {user?.name || "Marco R."} {user?.verified && <ShieldCheck size={16} className="text-sky-400" />}
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">{t.verifiedBreeder} · {user?.region || "Piemonte"}</p>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6">
        {/* GROUP 1: Breeding Management */}
        <ProfileGroup label={t.breedingMgmt}>
          <ProfileRow icon={<Heart size={18} />} label={t.wishlist} sub="2" onClick={() => go("wishlist")} />
          <ProfileRow icon={<ListOrdered size={18} />} label={t.inventory} onClick={() => go("inventory")} />
          <ProfileRow icon={<Grid3x3 size={18} />} label={t.lineage} badge="PRO" onClick={() => go("lineage")} />
          <ProfileRow icon={<Star size={18} />} label={t.reviews} sub="4.9 · 47" onClick={() => go("reviews")} />
        </ProfileGroup>

        {/* GROUP 2: Bureaucracy & Legal */}
        <ProfileGroup label={t.bureaucracyLegal}>
          <ProfileRow icon={<FileText size={18} />} label={t.citesArchive} onClick={() => go("documents")} />
          <ProfileRow icon={<Truck size={18} />} label={t.transport} onClick={() => go("transport")} />
          <ProfileRow icon={<Scale size={18} />} label={t.legalGuide} onClick={() => go("legal")} />
        </ProfileGroup>

        {/* GROUP 3: Information & Support */}
        <ProfileGroup label={t.infoSupport}>
          <ProfileRow icon={<Info size={18} />} label={t.aboutContact} onClick={() => go("about")} />
          <ProfileRow icon={<ShieldCheck size={18} />} label={t.termsLegal} onClick={() => go("terms")} />
        </ProfileGroup>

        {/* GROUP 4: Configuration */}
        <ProfileGroup label={t.configuration}>
          <ProfileRow icon={<SettingsIcon size={18} />} label={t.settingsKyc} onClick={() => go("settings")} />
        </ProfileGroup>
      </div>

      <div className="px-5 md:px-8 mt-2">
        <button onClick={handleLogout}
                className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-rose-400 transition-colors flex items-center justify-center gap-2">
          <LogOut size={14} />{t.logout}
        </button>
      </div>
    </div>
  );
}

function ProfileGroup({ label, children }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 px-1">{label}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ProfileRow({ icon, label, sub, onClick, badge }) {
  return (
    <button onClick={onClick}
            className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl bg-stone-900/40 ring-1 ring-stone-800/60 hover:bg-stone-900/80 hover:ring-stone-700 transition-colors text-left">
      <div className="w-9 h-9 rounded-lg bg-stone-900 ring-1 ring-stone-800 flex items-center justify-center text-amber-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-stone-100">{label}</div>
        {sub && <div className="text-[11px] text-stone-500">{sub}</div>}
      </div>
      {badge && (
        <span className="bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
      <ChevronRight size={16} className="text-stone-600" />
    </button>
  );
}

function Wishlist({ t, go, favorites, toggleFav }) {
  const items = LISTINGS.filter(l => favorites.includes(l.id));
  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.wishlist}</h1>
      </header>
      <div className="p-5 md:p-8">
        {items.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <Heart size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-display italic">{t.emptyWishlist}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
            {items.map(item => <ListingCard key={item.id} item={item} go={go} favorites={favorites} toggleFav={toggleFav} t={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function Legal({ t, go, lang }) {
  return (
    <div className="max-w-2xl mx-auto w-full pb-10">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.legalGuide}</h1>
      </header>
      <div className="p-5 md:p-8 space-y-4">
        <div className="bg-amber-500/5 ring-1 ring-amber-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-3">
            <Info size={14} />Avviso importante
          </div>
          <p className="text-sm text-amber-100/90 leading-relaxed">{t.legalIntro}</p>
        </div>
        <article className="prose-stone text-sm text-stone-300 leading-relaxed space-y-3">
          <h3 className="font-display text-lg text-stone-100">CITES Allegato A</h3>
          <p>{lang === "it"
            ? "Le specie elencate nell'Allegato A (es. Testudo hermanni) richiedono certificato CITES individuale per ogni esemplare e devono essere identificate con microchip."
            : "Annex A species (e.g. Testudo hermanni) require an individual CITES certificate for each animal and must be microchipped."}</p>
          <h3 className="font-display text-lg text-stone-100">CITES Allegato B</h3>
          <p>{lang === "it"
            ? "Le specie in Allegato B (molti camaleonti, pitoni) richiedono dichiarazione di cessione tra le parti."
            : "Annex B species (many chameleons, pythons) require a transfer declaration between parties."}</p>
        </article>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AUTH MODAL — login or signup, with reason context
   ═════════════════════════════════════════════════════════════════ */
function AuthModal({ modal, setModal, onLogin, t, lang }) {
  const [mode, setMode] = useState(modal.mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!email || !password) return;
    onLogin(mode === "signup" ? name : null);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-stone-950/85 backdrop-blur-sm p-0 md:p-4" onClick={() => setModal(null)}>
      <div onClick={e => e.stopPropagation()}
           className="w-full md:max-w-md bg-stone-900 ring-1 ring-stone-800 rounded-t-3xl md:rounded-2xl overflow-hidden anim-up">
        {/* Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-br from-stone-900 to-stone-950 border-b border-stone-800">
          <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-100">
            <X size={20} />
          </button>
          <div className="font-display text-2xl text-stone-50 tracking-tight">
            Herp<span className="italic text-amber-500">Market</span>
          </div>
          <h2 className="font-display text-xl text-stone-100 mt-3">
            {mode === "login" ? t.welcomeBack : t.createAccount}
          </h2>
          {modal.reason && (
            <p className="text-xs text-amber-300/90 mt-2 bg-amber-500/10 ring-1 ring-amber-500/20 rounded-lg px-3 py-2 flex items-start gap-2">
              <Lock size={12} className="mt-0.5 shrink-0" />
              <span>{modal.reason}</span>
            </p>
          )}
        </div>

        {/* Form */}
        <div className="p-6 space-y-3">
          {mode === "signup" && (
            <div>
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 block">{t.nameLabel}</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder={lang === "it" ? "Mario Rossi" : "John Smith"}
                     className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
            </div>
          )}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 block">{t.emailPlaceholder}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
                   className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 block">{t.passwordPlaceholder}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                   className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
          </div>
          <button onClick={submit}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-lg text-sm transition-colors mt-2">
            {mode === "login" ? t.continueWithEmail : t.signUpFree}
          </button>
          <div className="text-center pt-1">
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
              {mode === "login" ? <>{t.noAccount} <span className="text-amber-400 font-bold">{t.signup}</span></> : <>{t.alreadyMember} <span className="text-amber-400 font-bold">{t.login}</span></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AUTH GATE — shown when a logged-out user tries to access a private screen
   ═════════════════════════════════════════════════════════════════ */
function AuthGate({ reason, t, go, setAuthModal }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center max-w-md mx-auto">
      <div className="w-16 h-16 bg-amber-500/15 ring-1 ring-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mb-5">
        <Lock size={28} />
      </div>
      <h2 className="font-display text-2xl text-stone-50">{t.loginRequired}</h2>
      <p className="text-stone-400 text-sm mt-2 leading-relaxed">{reason}</p>
      <div className="flex gap-2 mt-6 w-full max-w-xs">
        <button onClick={() => setAuthModal({ mode: "login", reason: null, after: null })}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3 rounded-lg transition-colors">
          {t.login}
        </button>
        <button onClick={() => setAuthModal({ mode: "signup", reason: null, after: null })}
                className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm py-3 rounded-lg transition-colors">
          {t.signup}
        </button>
      </div>
      <button onClick={() => go("home")}
              className="mt-4 text-xs text-stone-500 hover:text-stone-300 transition-colors">
        {t.backToBrowse}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPO DETAIL — animals available at this expo + search + social links
   ═════════════════════════════════════════════════════════════════ */
function ExpoDetail({ expo, t, lang, go, favorites, toggleFav }) {
  const [expoSearch, setExpoSearch] = useState("");
  if (!expo) return null;

  const expoAnimals = LISTINGS.filter(l => l.expoId === expo.id);
  const filteredAnimals = expoAnimals.filter(l => {
    if (!expoSearch.trim()) return true;
    const q = expoSearch.toLowerCase();
    return l.species.toLowerCase().includes(q)
        || l.common.toLowerCase().includes(q)
        || l.traits.some(tr => tr.name.toLowerCase().includes(q))
        || l.seller.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-5xl mx-auto w-full pb-10">
      {/* Hero header */}
      <div className={`relative bg-gradient-to-br ${expo.color} px-5 md:px-8 pt-6 pb-7`}>
        <button onClick={() => go("home")}
                className="p-2 bg-black/30 hover:bg-black/50 backdrop-blur rounded-full text-white transition-colors mb-4">
          <ChevronLeft size={20} />
        </button>
        <div className="text-[11px] text-white/80 uppercase tracking-widest font-bold">{expo.date}</div>
        <h1 className="font-display text-3xl md:text-4xl text-white mt-1 tracking-tight leading-tight">{expo.name}</h1>
        <div className="flex items-center gap-1.5 text-white/90 text-sm mt-2">
          <MapPin size={14} />{expo.location} · <span className="text-white/70">{expo.venue}</span>
        </div>
        <p className="text-sm text-white/85 mt-4 leading-relaxed max-w-2xl">{expo.description}</p>

        {/* Official links */}
        <div className="flex flex-wrap gap-2 mt-5">
          {expo.website && (
            <a href={expo.website} target="_blank" rel="noopener noreferrer"
               className="bg-black/30 hover:bg-black/50 backdrop-blur ring-1 ring-white/20 text-white font-bold text-[11px] uppercase tracking-widest px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
              <Globe size={13} />{t.visitWebsite}
            </a>
          )}
        </div>
      </div>

      {/* Animals section */}
      <div className="px-5 md:px-8 pt-6">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-lg text-stone-100 tracking-tight flex items-center gap-2">
            <CheckCircle size={16} className="text-amber-500" />{t.expoAnimals}
          </h3>
          <span className="text-[11px] text-stone-500 font-bold uppercase tracking-widest">
            {filteredAnimals.length} {lang === "it" ? "esemplari" : "animals"}
          </span>
        </div>

        {/* In-expo search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            value={expoSearch}
            onChange={e => setExpoSearch(e.target.value)}
            placeholder={t.searchAtExpo}
            className="w-full bg-stone-900 ring-1 ring-stone-800 rounded-lg pl-10 pr-3 py-3 text-sm text-stone-100 placeholder:text-stone-500 outline-none focus:ring-amber-500/60 transition-all"
          />
        </div>

        {filteredAnimals.length === 0 ? (
          <div className="text-center py-16 text-stone-500">
            <Calendar size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-display italic">{expoAnimals.length === 0 ? t.noAnimalsAtExpo : (lang === "it" ? "Nessun risultato per la ricerca." : "No matches for that search.")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
            {filteredAnimals.map(item => <ListingCard key={item.id} item={item} go={go} favorites={favorites} toggleFav={toggleFav} t={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PLACEHOLDER for sections like Inventory, Pedigree, Reviews, etc.
   Real implementations come later — these stub screens keep the nav
   alive so all profile links actually go somewhere.
   ═════════════════════════════════════════════════════════════════ */
function PlaceholderScreen({ title, icon, badge, t, go, lang }) {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <h1 className="font-display text-2xl text-stone-50 tracking-tight flex items-center gap-2">
          {title}
          {badge && (
            <span className="bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded">{badge}</span>
          )}
        </h1>
      </header>
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-16 h-16 bg-stone-900 ring-1 ring-stone-800 rounded-2xl flex items-center justify-center text-amber-400 mb-5">
          {icon}
        </div>
        <h2 className="font-display text-xl text-stone-100">{lang === "it" ? "In arrivo" : "Coming soon"}</h2>
        <p className="text-stone-400 text-sm mt-2 max-w-xs leading-relaxed">
          {lang === "it"
            ? "Questa sezione sarà disponibile a breve. Stiamo lavorando per offrirti la migliore esperienza."
            : "This section will be available shortly. We're working to bring you the best experience."}
        </p>
      </div>
    </div>
  );
}

function AboutContact({ t, go, lang }) {
  return (
    <div className="max-w-2xl mx-auto w-full pb-10">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.aboutContact}</h1>
      </header>
      <div className="p-5 md:p-8 space-y-5">
        <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-6">
          <div className="font-display text-2xl text-stone-50 tracking-tight mb-2">
            Herp<span className="italic text-amber-500">Market</span>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">
            {lang === "it"
              ? "HerpMarket è il marketplace italiano dedicato agli appassionati di rettili e animali esotici. Connettiamo allevatori verificati e acquirenti con strumenti pensati per il mercato italiano: documentazione CITES integrata, prenotazioni sicure per le fiere e una community basata sulla fiducia."
              : "HerpMarket is the Italian marketplace for reptile and exotic-animal enthusiasts. We connect verified breeders with buyers through tools tailored to the Italian market: integrated CITES paperwork, secure expo reservations and a trust-based community."}
          </p>
        </div>
        <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-5">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">{t.expoInfo}</div>
          <a href="mailto:support@herpmarket.it" className="flex items-center gap-2.5 text-amber-400 hover:text-amber-300 font-bold text-sm transition-colors">
            <Mail size={16} />support@herpmarket.it
          </a>
        </div>
      </div>
    </div>
  );
}

function TermsLegal({ t, go, lang }) {
  return (
    <div className="max-w-2xl mx-auto w-full pb-10">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.termsLegal}</h1>
      </header>
      <div className="p-5 md:p-8 space-y-4">
        <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-5 text-sm text-stone-300 leading-relaxed space-y-3">
          <p>{lang === "it"
            ? "Utilizzando questa piattaforma accetti i nostri termini di servizio. HerpMarket agisce esclusivamente come intermediario tra acquirenti e venditori."
            : "By using this platform you accept our terms of service. HerpMarket acts solely as an intermediary between buyers and sellers."}</p>
          <p>{lang === "it"
            ? "I venditori sono responsabili della legalità, salute e correttezza della documentazione dei propri esemplari. HerpMarket non si assume responsabilità per le transazioni tra utenti."
            : "Sellers are responsible for the legality, health and accurate documentation of their animals. HerpMarket assumes no liability for transactions between users."}</p>
          <p className="text-stone-400 italic">{lang === "it"
            ? "Disclaimer legale: la documentazione CITES generata tramite la piattaforma deve essere sempre verificata presso le autorità competenti."
            : "Legal disclaimer: any CITES paperwork generated via the platform must always be verified with the competent authorities."}</p>
        </div>
      </div>
    </div>
  );
}
