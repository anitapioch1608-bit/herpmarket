import React, { useState, useMemo } from 'react';
import {
  Home, Search, PlusCircle, MessageCircle, User,
  ChevronRight, ChevronLeft, ShieldCheck, MapPin,
  Star, Calendar, SlidersHorizontal, FileText, CheckCircle,
  Camera, Heart, Mars, Venus, HelpCircle, X,
  ArrowUpDown, Lock, CreditCard, Info, Languages, Send
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
    image: IMG.crested, category: "geckos", expo: "Verona Reptiles 2026",
    sire: "Axanthic Lilly White", dam: "Red Harlequin",
    desc: "Esemplare nato in casa, alimentazione a base di Pangea e insetti vivi. Carattere molto docile, abituata alla manipolazione."
  },
  {
    id: 2, species: "Furcifer pardalis", common: "Camaleonte pantera",
    traits: [{ name: "Ambilobe Blue Bar", cls: "polygenic" }],
    price: 320, deposit: 32, sex: "M", ageMonths: 8, weight: "82g",
    region: "Lombardia", city: "Milano", distanceKm: 0,
    seller: "ExoBreed Italia", verified: true, rating: 4.8, reviews: 62,
    image: IMG.panther, category: "chameleons", expo: "Verona Reptiles 2026",
    sire: "Ambilobe Blue Bar", dam: "Ambilobe Red Bar",
    desc: "Maschio dai colori spettacolari, in piena salute. CITES Allegato B completo."
  },
  {
    id: 3, species: "Eublepharis macularius", common: "Geco leopardino",
    traits: [{ name: "Tremper Albino", cls: "recessive" }, { name: "het Eclipse", cls: "recessive" }],
    price: 75, deposit: 8, sex: "U", ageMonths: 3, weight: "16g",
    region: "Campania", city: "Napoli", distanceKm: 720,
    seller: "LeoMorphs Campania", verified: true, rating: 4.7, reviews: 38,
    image: IMG.leopard, category: "geckos", expo: null,
    sire: "Tremper Albino", dam: "het Tremper het Eclipse",
    desc: "Cucciolo svezzato, mangia camole e tarme regolarmente."
  },
  {
    id: 4, species: "Python regius", common: "Pitone reale",
    traits: [{ name: "Banana", cls: "coDom" }, { name: "Pastel", cls: "coDom" }, { name: "Clown", cls: "recessive" }],
    price: 240, deposit: 24, sex: "M", ageMonths: 5, weight: "180g",
    region: "Veneto", city: "Verona", distanceKm: 145,
    seller: "Veneto Royals", verified: true, rating: 4.9, reviews: 91,
    image: IMG.ball, category: "snakes", expo: "Verona Reptiles 2026",
    sire: "Banana Pastel", dam: "Clown",
    desc: "Mangia regolarmente topi decongelati. Tre mute completate."
  },
  {
    id: 5, species: "Pogona vitticeps", common: "Pogona",
    traits: [{ name: "Hypo Zero", cls: "coDom" }],
    price: 160, deposit: 16, sex: "P", ageMonths: 4, weight: "45g",
    region: "Piemonte", city: "Cuneo", distanceKm: 95,
    seller: "DragoMania Piemonte", verified: false, rating: 4.4, reviews: 18,
    image: IMG.beardie, category: "lizards", expo: null,
    sire: null, dam: null,
    desc: "Coppia giovane, ottimi mangiatori. Pronti per nuovo terrario."
  },
  {
    id: 6, species: "Testudo hermanni", common: "Testuggine di Hermann",
    traits: [{ name: "CB 2024", cls: "wild" }],
    price: 220, deposit: 22, sex: "F", ageMonths: 18, weight: "180g",
    region: "Toscana", city: "Firenze", distanceKm: 340,
    seller: "Testudo Toscana", verified: true, rating: 5.0, reviews: 24,
    image: IMG.tortoise, category: "tortoises", expo: null,
    sire: null, dam: null,
    desc: "Esemplare nato in cattività con documenti CITES Allegato A in regola."
  },
  {
    id: 7, species: "Pantherophis guttatus", common: "Serpente del grano",
    traits: [{ name: "Anery", cls: "recessive" }, { name: "Motley", cls: "recessive" }],
    price: 85, deposit: 9, sex: "F", ageMonths: 6, weight: "55g",
    region: "Lombardia", city: "Bergamo", distanceKm: 45,
    seller: "Snake Italia BG", verified: true, rating: 4.6, reviews: 33,
    image: IMG.corn, category: "snakes", expo: "Squamata Bologna",
    sire: "Anery Motley", dam: "Anery",
    desc: "Femmina giovane, alimentazione regolare con topi decongelati."
  },
  {
    id: 8, species: "Heterodon nasicus", common: "Hognose occidentale",
    traits: [{ name: "Albino", cls: "recessive" }, { name: "Conda", cls: "coDom" }],
    price: 280, deposit: 28, sex: "M", ageMonths: 4, weight: "32g",
    region: "Piemonte", city: "Asti", distanceKm: 55,
    seller: "Piedmont Geckos", verified: true, rating: 4.9, reviews: 47,
    image: IMG.hognose, category: "snakes", expo: "Verona Reptiles 2026",
    sire: "Albino Conda", dam: "het Albino Conda",
    desc: "Mangia regolarmente in pinzetta. Carattere tipico hognose."
  },
];

const EXPOS = [
  { id: 1, name: "Verona Reptiles", location: "Cerea (VR)", date: "3 ott 2026", color: "from-orange-700 to-amber-600" },
  { id: 2, name: "Squamata Bologna", location: "Bologna", date: "21 giu 2026", color: "from-emerald-700 to-teal-600" },
  { id: 3, name: "Esotika Pet Show", location: "Arezzo",   date: "12 set 2026", color: "from-sky-700 to-cyan-600" },
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
export default function RettiliMarket() {
  const [view, setView] = useState("home");
  const [viewData, setViewData] = useState(null);
  const [lang, setLang] = useState("it");
  const [favorites, setFavorites] = useState([1, 4]);
  const [filter, setFilter] = useState({ category: null, sex: null, region: null, sort: "newest", search: "" });

  const t = I18N[lang];

  const go = (v, data = null) => { setView(v); setViewData(data); window.scrollTo(0, 0); };
  const toggleFav = (id, e) => {
    e?.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const props = { t, lang, setLang, go, favorites, toggleFav, filter, setFilter };

  const screen = () => {
    switch (view) {
      case "home":     return <Home_ {...props} />;
      case "search":   return <SearchScreen {...props} />;
      case "detail":   return <Detail listing={viewData} {...props} />;
      case "sell":     return <SellScreen {...props} />;
      case "chat":     return <ChatList {...props} />;
      case "thread":   return <ChatThread chat={viewData} {...props} />;
      case "profile":  return <Profile {...props} />;
      case "wishlist": return <Wishlist {...props} />;
      case "legal":    return <Legal {...props} />;
      default:         return <Home_ {...props} />;
    }
  };

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
          <SideBtn icon={<User size={18} />} label={t.profile} active={["profile", "wishlist", "legal"].includes(view)} onClick={() => go("profile")} />
        </nav>
        <div className="mt-auto text-[10px] text-stone-500 leading-relaxed pt-4 border-t border-stone-800">
          <p className="font-display italic text-stone-400 text-xs mb-1">RettiliMarket</p>
          <p>v0.1 · Beta</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 md:pb-0">
          {screen()}
        </div>
        {/* Mobile bottom nav */}
        <nav className="md:hidden absolute bottom-0 inset-x-0 z-50 bg-stone-950/90 backdrop-blur-xl border-t border-stone-800 px-3 pt-2 pb-6 flex justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <TabBtn icon={<Home size={20} />} label={t.home}    active={view === "home"}    onClick={() => go("home")} />
          <TabBtn icon={<Search size={20} />} label={t.search} active={view === "search"} onClick={() => go("search")} />
          <TabBtn icon={<PlusCircle size={24} />} label={t.sell} active={view === "sell"} onClick={() => go("sell")} accent />
          <TabBtn icon={<MessageCircle size={20} />} label={t.chat} active={view === "chat" || view === "thread"} onClick={() => go("chat")} />
          <TabBtn icon={<User size={20} />} label={t.profile} active={["profile", "wishlist", "legal"].includes(view)} onClick={() => go("profile")} />
        </nav>
      </div>
    </div>
  );
}

/* ─── Reusable bits ─────────────────────────────────────────────── */
function Brand({ t, lang, setLang }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <h1 className="font-display text-2xl text-stone-50 leading-none tracking-tight" style={{ fontVariationSettings: "'opsz' 100" }}>
          Rettili<span className="italic text-amber-500">Market</span>
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
        {item.expo && (
          <div className="absolute bottom-2 left-2 bg-amber-500/95 text-stone-950 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-lg">
            ★ {item.expo.split(" ")[0]}
          </div>
        )}
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
      <header className="md:hidden px-5 pt-8 pb-5 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800/60">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl text-stone-50 leading-none tracking-tight" style={{ fontVariationSettings: "'opsz' 144" }}>
              Rettili<span className="italic text-amber-500">Market</span>
            </h1>
            <p className="text-[11px] text-stone-400 mt-2 italic font-display">{t.tagline}</p>
          </div>
          <button onClick={() => setLang(lang === "it" ? "en" : "it")}
                  className="bg-stone-800/80 ring-1 ring-stone-700 text-stone-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-md flex items-center gap-1.5">
            <Languages size={11} />{lang}
          </button>
        </div>
      </header>

      {/* Desktop hero */}
      <header className="hidden md:block px-8 pt-10 pb-6 border-b border-stone-800/60">
        <h2 className="font-display text-4xl text-stone-50 tracking-tight" style={{ fontVariationSettings: "'opsz' 144" }}>
          Trova il tuo prossimo <span className="italic text-amber-500">esemplare</span>.
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
          {EXPOS.map((expo, i) => (
            <div key={expo.id}
                 className={`anim-up bg-gradient-to-br ${expo.color} rounded-xl p-4 cursor-pointer hover:scale-[1.02] transition-transform`}
                 style={{ animationDelay: `${i * 50}ms` }}>
              <div className="text-[10px] text-white/80 uppercase tracking-widest font-bold">{expo.date}</div>
              <h4 className="font-display text-lg text-white mt-1 leading-tight">{expo.name}</h4>
              <div className="flex items-center gap-1 text-white/80 text-xs mt-1.5">
                <MapPin size={11} />{expo.location}
              </div>
            </div>
          ))}
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
function Detail({ listing, go, t, favorites, toggleFav }) {
  const [reserveState, setReserveState] = useState("idle"); // idle | pending | approved | paid
  const [showCheckout, setShowCheckout] = useState(false);

  if (!listing) return null;
  const a = listing;

  const handleReserve = () => {
    if (reserveState === "idle") {
      setReserveState("pending");
      setTimeout(() => setReserveState("approved"), 2500);
    } else if (reserveState === "approved") {
      setShowCheckout(true);
    }
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

      {/* Sticky action bar */}
      <div className="fixed md:absolute bottom-16 md:bottom-0 inset-x-0 z-30 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2">
          <button onClick={() => go("thread", { id: 99, listing: a, lastMsg: "", time: "" })}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
            <MessageCircle size={16} />{t.message}
          </button>
          {a.expo && (
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
   PROFILE — drastically simplified
   ═════════════════════════════════════════════════════════════════ */
function Profile({ t, go, lang }) {
  return (
    <div className="max-w-2xl mx-auto w-full pb-10">
      <header className="px-5 md:px-8 pt-8 pb-6 border-b border-stone-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display text-2xl text-stone-50 font-bold">
            M
          </div>
          <div>
            <h1 className="font-display text-2xl text-stone-50 tracking-tight flex items-center gap-2">
              Marco R. <ShieldCheck size={16} className="text-sky-400" />
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">{t.verifiedBreeder} · Piemonte</p>
          </div>
        </div>
      </header>

      <div className="p-3 md:p-5 space-y-1">
        <ProfileRow icon={<Heart size={18} />} label={t.wishlist} sub="2" onClick={() => go("wishlist")} />
        <ProfileRow icon={<PlusCircle size={18} />} label={t.myListings} sub="3" onClick={() => go("sell")} />
        <ProfileRow icon={<FileText size={18} />} label={t.documents} sub={lang === "it" ? "Archivio CITES" : "CITES archive"} />
        <ProfileRow icon={<Star size={18} />} label={t.reviews} sub="4.9 · 47" />
        <div className="h-2" />
        <ProfileRow icon={<Info size={18} />} label={t.legalGuide} onClick={() => go("legal")} />
        <ProfileRow icon={<User size={18} />} label={t.settings} />
      </div>

      <div className="px-5 md:px-8 mt-6">
        <button className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-rose-400 transition-colors">
          {t.logout}
        </button>
      </div>
    </div>
  );
}

function ProfileRow({ icon, label, sub, onClick }) {
  return (
    <button onClick={onClick}
            className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-stone-900/60 transition-colors text-left">
      <div className="w-9 h-9 rounded-lg bg-stone-900 ring-1 ring-stone-800 flex items-center justify-center text-amber-400">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-bold text-sm text-stone-100">{label}</div>
        {sub && <div className="text-[11px] text-stone-500">{sub}</div>}
      </div>
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
