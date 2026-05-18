import React, { useState, useEffect } from 'react';
import { 
  Home, Search, PlusCircle, MessageCircle, User, 
  ChevronRight, ChevronLeft, ShieldCheck, MapPin, 
  Star, Calendar, Sliders, Filter, FileText, CheckCircle,
  Folder, Truck, Info, Settings, List, Grid, Camera, Clipboard, 
  MoreHorizontal, Lock, Heart, ShieldAlert, CreditCard, Calculator, Clock, ChevronDown, X
} from 'lucide-react';

// --- TRANSLATION DICTIONARY ---
const translations = {
  it: {
    appSub: "Il marketplace rettili in Italia",
    appDesc: "Marketplace specializzato con generatore CITES automatico, depositi sicuri per Fiere e logistica Eco-Taxi integrata.",
    upcomingExpos: "Fiere in Arrivo",
    latestListings: "Ultimi Annunci",
    seeAll: "Altre",
    seeAllListings: "Vedi tutti",
    searchTitle: "Filtra Risultati",
    searchPlaceholder: "Cerca morph o specie...",
    category: "Categoria Principale",
    region: "Località (Regione)",
    showResults: "Mostra Risultati",
    sex: "Sesso",
    birthDate: "Data di Nascita",
    birthYear: "Anno di Nascita",
    weight: "Peso",
    location: "Località",
    parents: "Genetica Genitori",
    sire: "Padre (Sire)",
    dam: "Madre (Dam)",
    unknownParents: "Non disponibile / Sconosciuto",
    breederNotes: "Note Allevatore",
    seller: "Venditore",
    contactSeller: "Contatta Venditore",
    newListing: "Nuovo Annuncio",
    uploadPhoto: "Carica Foto Animale",
    publish: "Pubblica Annuncio",
    messages: "I Tuoi Messaggi",
    onlineNow: "Online ora",
    typeMessage: "Scrivi un messaggio...",
    navHome: "Home",
    navSearch: "Cerca",
    navSell: "Vendi",
    navChat: "Chat",
    navProfile: "Profilo",
    myAccount: "Il Tuo Account",
    breederLevel: "Allevatore Registrato",
    management: "Gestione Allevamento",
    logistics: "Burocrazia & Logistica",
    settings: "Configurazione",
    male: "Maschio",
    female: "Femmina",
    unsexed: "Unsexed",
    pair: "Coppia",
    realPhoto: "Foto Reale",
    activeListings: "Annunci Attivi",
    storePolicies: "Policy Negozio",
    verifiedBuyer: "Acquirente Verificato",
    writeReview: "Scrivi una Recensione",
    onlyBuyersCanReview: "Puoi lasciare una recensione solo dopo aver completato un acquisto tramite HerpMarket.",
    requestDeposit: "Richiedi Prenotazione (10%)",
    depositRequested: "In attesa del venditore...",
    payDeposit: "Paga Deposito",
    wishlist: "La Mia Wishlist",
    geneticsTitle: "Calcolatore Genetico",
    calcDesc: "Seleziona i riproduttori per prevedere la genetica della prole.",
    calculate: "Calcola Prole",
    policyDOA: "Garantiamo l'arrivo in vita (DOA) solo se la spedizione avviene tramite corriere autorizzato o ritiro in fiera. Il deposito del 10% per prenotare un animale in fiera non è rimborsabile in caso di mancato ritiro.",
    all: "Tutti"
  },
  en: {
    appSub: "The reptile marketplace in Italy",
    appDesc: "Specialized online marketplace featuring an instant CITES generator, secure Expo deposits, and integrated Eco-Taxi logistics.",
    upcomingExpos: "Upcoming Expos",
    latestListings: "Latest Listings",
    seeAll: "More",
    seeAllListings: "See all",
    searchTitle: "Filter Results",
    searchPlaceholder: "Search morph or species...",
    category: "Main Category",
    region: "Location (Region)",
    showResults: "Show Results",
    sex: "Sex",
    birthDate: "Birth Date",
    birthYear: "Birth Year",
    weight: "Weight",
    location: "Location",
    parents: "Parental Genetics",
    sire: "Sire",
    dam: "Dam",
    unknownParents: "Not available / Unknown",
    breederNotes: "Breeder Notes",
    seller: "Seller",
    contactSeller: "Contact Seller",
    newListing: "New Listing",
    uploadPhoto: "Upload Animal Photo",
    publish: "Publish Listing",
    messages: "Your Messages",
    onlineNow: "Online now",
    typeMessage: "Type a message...",
    navHome: "Home",
    navSearch: "Search",
    navSell: "Sell",
    navChat: "Chat",
    navProfile: "Profile",
    myAccount: "Your Account",
    breederLevel: "Registered Breeder",
    management: "Breeding Management",
    logistics: "Bureaucracy & Logistics",
    settings: "Configuration",
    male: "Male",
    female: "Female",
    unsexed: "Unsexed",
    pair: "Pair",
    realPhoto: "Real Photo",
    activeListings: "Active Listings",
    storePolicies: "Store Policies",
    verifiedBuyer: "Verified Buyer",
    writeReview: "Write a Review",
    onlyBuyersCanReview: "You can only leave a review after completing a purchase through HerpMarket.",
    requestDeposit: "Request Reservation (10%)",
    depositRequested: "Waiting for seller...",
    payDeposit: "Pay Deposit",
    wishlist: "My Wishlist",
    geneticsTitle: "Genetic Calculator",
    calcDesc: "Select breeders to predict offspring genetics.",
    calculate: "Calculate Offspring",
    policyDOA: "We guarantee Live Arrival (DOA) only via authorized couriers or expo pickups. The 10% reservation deposit for expos is non-refundable if you fail to show up.",
    all: "All"
  },
  de: {
    appSub: "Der Reptilien-Marktplatz in Italien",
    appDesc: "Spezialisierter Online-Marktplatz mit automatischem CITES-Generator, sicheren Expo-Einlagen und integrierter Eco-Taxi-Logistik.",
    upcomingExpos: "Kommende Messen",
    latestListings: "Neueste Anzeigen",
    seeAll: "Mehr",
    seeAllListings: "Alle ansehen",
    searchTitle: "Ergebnisse filtern",
    searchPlaceholder: "Suche Morph oder Art...",
    category: "Hauptkategorie",
    region: "Ort (Region)",
    showResults: "Ergebnisse anzeigen",
    sex: "Geschlecht",
    birthDate: "Geburtsdatum",
    birthYear: "Geburtsjahr",
    weight: "Gewicht",
    location: "Ort",
    parents: "Genetik der Eltern",
    sire: "Vater (Sire)",
    dam: "Mutter (Dam)",
    unknownParents: "Nicht verfügbar / Unbekannt",
    breederNotes: "Züchter-Notizen",
    seller: "Verkäufer",
    contactSeller: "Verkäufer kontaktieren",
    newListing: "Neue Anzeige",
    uploadPhoto: "Tierfoto hochladen",
    publish: "Anzeige veröffentlichen",
    messages: "Deine Nachrichten",
    onlineNow: "Jetzt online",
    typeMessage: "Schreibe eine Nachricht...",
    navHome: "Start",
    navSearch: "Suche",
    navSell: "Verkaufen",
    navChat: "Chat",
    navProfile: "Profil",
    myAccount: "Dein Konto",
    breederLevel: "Registrierter Züchter",
    management: "Zuchtmanagement",
    logistics: "Bürokratie & Logistik",
    settings: "Konfiguration",
    male: "Männlich",
    female: "Weiblich",
    unsexed: "Unbestimmt",
    pair: "Paar",
    realPhoto: "Echtes Foto",
    activeListings: "Aktive Anzeigen",
    storePolicies: "Shop-Richtlinien",
    verifiedBuyer: "Verifizierter Käufer",
    writeReview: "Bewertung schreiben",
    onlyBuyersCanReview: "Du kannst nur nach einem Kauf über HerpMarket eine Bewertung hinterlassen.",
    requestDeposit: "Reservierung anfragen (10%)",
    depositRequested: "Warten auf Verkäufer...",
    payDeposit: "Anzahlung leisten",
    wishlist: "Meine Wunschliste",
    geneticsTitle: "Genetik-Rechner",
    calcDesc: "Wähle Zuchttiere aus, um die Genetik der Nachkommen vorherzusagen.",
    calculate: "Nachkommen berechnen",
    policyDOA: "Wir garantieren Lebendankunft (DOA) nur bei autorisierten Kurieren oder Expo-Abholungen. Die 10% Anzahlung für Expos ist nicht erstattbar, falls du nicht erscheinst.",
    all: "Alle"
  }
};

// --- MOCK DATA ---
const listings = [
  {
    id: 1, species: "Correlophus ciliatus", morph: "Red Harlequin Pinstripe", price: "€150", deposit: "€15",
    image: "/images/ciliatus.jpg", location: "Torino", fiera: "Squamata Expo", breeder: "Piedmont Geckos",
    verified: true, sex: "male", birthDate: "05/2024", weight: "35g", rating: 4.8, reviews: 24,
    parents: { sire: "Axanthic Lilly White", dam: "Red Harlequin" },
    description: "Bellissimo esemplare, mangia Pangea e grilli regolarmente. Perfetto per riproduzione.", breederFocus: "Crested Geckos", category: "Gechi (Geckos)"
  },
  {
    id: 2, species: "Furcifer pardalis", morph: "Ambilobe Blue Bar", price: "€280", deposit: "€28",
    image: "/images/pardalis.jpg", location: "Milano", fiera: "Verona Reptiles", breeder: "ExoBreed IT",
    verified: true, sex: "male", birthDate: "02/2025", weight: "80g", rating: 4.9, reviews: 56,
    parents: { sire: "Ambilobe Blue Bar (F1)", dam: "Ambilobe Red Bar" },
    description: "Colori spettacolari. Documento CITES All. B incluso per la cessione.", breederFocus: "Camaleonti (Pardalis, Calyptratus)", category: "Camaleonti (Chameleons)"
  },
  {
    id: 3, species: "Gekko gecko", morph: "Normal CB", price: "€90", deposit: "€9",
    image: "/images/tokay.jpg", location: "Roma", fiera: null, breeder: "Serpenti Roma",
    verified: false, sex: "female", birthDate: "11/2023", weight: "75g", rating: 4.2, reviews: 15,
    parents: null,
    description: "Nata in cattività, molto docile per essere un Tokay. Abituata al maneggio.", breederFocus: "Gechi asiatici", category: "Gechi (Geckos)"
  },
  {
    id: 4, species: "Eublepharis macularius", morph: "Normal / Wild Type", price: "€45", deposit: "€4.50",
    image: "/images/leopardino.jpg", location: "Napoli", fiera: "Esotika Pet Show", breeder: "LeoMorphs Campania",
    verified: true, sex: "unsexed", birthDate: "01/2026", weight: "15g", rating: 4.7, reviews: 30,
    parents: { sire: "Normal Het Tremper", dam: "Normal" },
    description: "Mangia tarme della farina regolarmente. Ottimo primo rettile.", breederFocus: "Leopard Geckos", category: "Gechi (Geckos)"
  },
  {
    id: 5, species: "Phelsuma grandis", morph: "High Red", price: "€110", deposit: "€11",
    image: "/images/phelsuma.jpg", location: "Firenze", fiera: null, breeder: "Phelsuma Italia",
    verified: true, sex: "female", birthDate: "08/2024", weight: "40g", rating: 5.0, reviews: 41,
    parents: null,
    description: "In salute, colori molto accesi. Doc. CITES All. B pronto.", breederFocus: "Phelsuma e Gechi Diurni", category: "Gechi (Geckos)"
  }
];

const breederReviewsData = [
  { breeder: "Piedmont Geckos", buyer: "Marco T.", date: "03/2026", rating: 5, comment: "Esemplare fantastico, ritirato in fiera senza problemi. Allevatore super disponibile." },
  { breeder: "ExoBreed IT", buyer: "Luca P.", date: "01/2026", rating: 5, comment: "Camaleonte stupendo, colori pazzeschi. CITES impeccabile." }
];

const expos = [
  { id: 1, name: "Squamata Expo", location: "Bologna, IT", date: "21 Giu 2026", color: "bg-emerald-600" },
  { id: 2, name: "Verona Reptiles", location: "Cerea (VR), IT", date: "3 Ott 2026", color: "bg-orange-600" },
  { id: 3, name: "Esotika Pet Show", location: "Arezzo, IT", date: "12 Set 2026", color: "bg-blue-600" },
  { id: 4, name: "Terraristika Hamm", location: "Hamm, DE", date: "12 Dic 2026", color: "bg-slate-700" }
];

const categoriesData = {
  "Tutti gli Animali": [],
  "Gechi (Geckos)": [],
  "Serpenti (Snakes)": [],
  "Camaleonti (Chameleons)": [],
  "Sauri & Varani (Lizards)": [],
  "Tartarughe (Turtles)": [],
  "Anfibi (Amphibians)": [],
  "Invertebrati (Invertebrates)": []
};

const italianRegions = [
  "Tutte le Regioni", "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", 
  "Friuli Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", 
  "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige", 
  "Umbria", "Valle d'Aosta", "Veneto"
];

// --- MAIN APP COMPONENT ---
export default function HerpMarketPWA() {
  const [currentView, setCurrentView] = useState('home');
  const [viewData, setViewData] = useState(null);
  const [lang, setLang] = useState('it');
  const [favorites, setFavorites] = useState([]);

  const t = translations[lang];

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleLangToggle = () => {
    if (lang === 'it') setLang('en');
    else if (lang === 'en') setLang('de');
    else setLang('it');
  };

  const navigateTo = (view, data = null) => {
    setCurrentView(view);
    if (data) setViewData(data);
  };

  const renderView = () => {
    const props = { navigateTo, t, lang, handleLangToggle, favorites, toggleFavorite };
    switch (currentView) {
      case 'home': return <HomeView {...props} />;
      case 'search': return <SearchView {...props} />;
      case 'detail': return <ListingDetailView animal={viewData} {...props} />;
      case 'breeder': return <BreederProfileView breederName={viewData} {...props} />;
      case 'breeder_reviews': return <BreederReviewsView breederName={viewData} {...props} />;
      case 'add': return <AddListingView {...props} />;
      case 'chat': return <ChatHubView {...props} />;
      case 'chat_thread': return <ChatThreadView chatData={viewData} {...props} />;
      case 'cites_generator': return <CitesGeneratorView animalData={viewData} {...props} />;
      case 'profile': return <DashboardHubView {...props} />;
      case 'wishlist': return <WishlistView {...props} />;
      case 'inventory': return <InventoryManagerView {...props} />;
      case 'documents': return <DocumentArchiveView {...props} />;
      case 'transport': return <TransportBoardView {...props} />;
      case 'expo_hub': return <ExpoHubView expoData={viewData} {...props} />;
      case 'lineage': return <LineageTrackerView {...props} />;
      case 'reviews': return <ReviewManagerView {...props} />;
      case 'settings': return <SettingsView {...props} />;
      case 'legal': return <LegalGuideView {...props} />;
      default: return <HomeView {...props} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 font-sans text-slate-100 antialiased select-none overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* DESKTOP SIDEBAR */}
      <nav className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 z-30">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">HERP<span className="text-emerald-400">MARKET</span></h1>
          <p className="text-[11px] text-slate-400 mt-1">{t.appSub}</p>
        </div>
        <div className="flex flex-col space-y-2 flex-1">
          <DesktopNavButton icon={<Home size={20} />} active={currentView === 'home'} label={t.navHome} onClick={() => navigateTo('home')} />
          <DesktopNavButton icon={<Search size={20} />} active={currentView === 'search'} label={t.navSearch} onClick={() => navigateTo('search')} />
          <DesktopNavButton icon={<PlusCircle size={20} />} active={currentView === 'add'} label={t.navSell} onClick={() => navigateTo('add')} />
          <DesktopNavButton icon={<MessageCircle size={20} />} active={currentView === 'chat' || currentView === 'chat_thread'} label={t.navChat} onClick={() => navigateTo('chat')} />
          <DesktopNavButton icon={<User size={20} />} active={['profile', 'wishlist', 'lineage', 'legal'].includes(currentView)} label={t.navProfile} onClick={() => navigateTo('profile')} />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 w-full h-full bg-slate-900 relative flex flex-col overflow-hidden">
        <div className="flex-1 h-full relative overflow-y-auto hide-scrollbar pb-28 md:pb-0">
          {renderView()}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <nav className="md:hidden absolute bottom-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-around pt-3 pb-8 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <MobileNavButton icon={<Home size={22} />} active={currentView === 'home'} label={t.navHome} onClick={() => navigateTo('home')} />
          <MobileNavButton icon={<Search size={22} />} active={currentView === 'search'} label={t.navSearch} onClick={() => navigateTo('search')} />
          <MobileNavButton icon={<PlusCircle size={26} className="text-emerald-400" />} active={currentView === 'add'} label={t.navSell} onClick={() => navigateTo('add')} />
          <MobileNavButton icon={<MessageCircle size={22} />} active={currentView === 'chat' || currentView === 'chat_thread'} label={t.navChat} onClick={() => navigateTo('chat')} />
          <MobileNavButton icon={<User size={22} />} active={['profile', 'wishlist'].includes(currentView)} label={t.navProfile} onClick={() => navigateTo('profile')} />
        </nav>
      </div>
    </div>
  );
}

function MobileNavButton({ icon, active, label, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center space-y-0.5 text-center transition-colors">
      <div className={active ? "text-emerald-400 scale-105 transition-transform" : "text-slate-500 hover:text-slate-300"}>{icon}</div>
      <span className={`text-[10px] font-medium ${active ? "text-emerald-400" : "text-slate-500"}`}>{label}</span>
    </button>
  );
}

function DesktopNavButton({ icon, active, label, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center space-x-4 p-3 rounded-xl transition-all ${active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"}`}>
      <div>{icon}</div><span className="text-sm font-bold tracking-wide">{label}</span>
    </button>
  );
}

// --- VIEWS ---

function HomeView({ navigateTo, t, lang, handleLangToggle, favorites, toggleFavorite }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-6 overflow-y-auto hide-scrollbar max-w-7xl mx-auto w-full">
      {/* Universal Header (Mobile & Desktop) */}
      <div className="pt-8 px-5 pb-4 bg-slate-900/95 border-b border-slate-800 sticky top-0 z-20 flex flex-col backdrop-blur-lg">
        <div className="flex justify-between items-center mb-2">
          {/* Mobile Title */}
          <h1 className="text-2xl font-black text-white tracking-tight md:hidden">HERP<span className="text-emerald-400">MARKET</span></h1>
          {/* Desktop Title */}
          <h1 className="text-2xl font-black text-white tracking-tight hidden md:block">Dashboard</h1>
          
          <button 
            onClick={handleLangToggle} 
            className="bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest active:scale-95 transition-all hover:bg-emerald-500/20 cursor-pointer"
          >
            {lang.toUpperCase()}
          </button>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium md:hidden">{t.appDesc}</p>
      </div>

      {/* Front Page Search - Made much cleaner without circles */}
      <div className="pt-5 px-5 pb-2">
        <div 
          onClick={() => navigateTo('search')}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center space-x-3 shadow-inner cursor-pointer mb-2 active:scale-[0.98] transition-transform hover:bg-slate-700/50"
        >
          <Search size={18} className="text-slate-400" />
          <span className="text-sm text-slate-400 font-medium">{t.searchPlaceholder}</span>
        </div>
      </div>

      <div className="pt-4 pb-2 px-5">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t.upcomingExpos}</h3>
        <div className="flex space-x-3 mb-2">
          {expos.slice(0, 2).map(expo => (
            <div key={expo.id} onClick={() => navigateTo('expo_hub', expo)} className={`flex-1 max-w-[200px] ${expo.color} p-4 rounded-2xl shadow-lg cursor-pointer transform active:scale-95 transition-transform flex flex-col justify-between`}>
              <Calendar size={16} className="text-white/80 mb-2" />
              <div><h4 className="font-bold text-sm text-white truncate leading-tight">{expo.name}</h4><p className="text-[10px] text-white/90 font-medium mt-1 truncate">{expo.location}</p></div>
              <span className="text-[10px] bg-black/30 text-white font-bold px-2 py-0.5 rounded mt-3 inline-block self-start">{expo.date}</span>
            </div>
          ))}
          <div onClick={() => navigateTo('search')} className="w-16 md:w-24 bg-slate-800/80 border border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform hover:bg-slate-700 shadow-md">
            <MoreHorizontal size={24} className="text-slate-400 mb-1" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{t.seeAll}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-12 mt-4">
        <div className="flex justify-between items-center mb-4"><h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t.latestListings}</h3><span className="text-[11px] text-emerald-400 font-bold cursor-pointer hover:underline" onClick={() => navigateTo('search')}>{t.seeAllListings}</span></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {listings.map(item => (
            <div key={item.id} onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col cursor-pointer hover:-translate-y-1 transition-transform relative">
              <button onClick={(e) => toggleFavorite(item.id, e)} className="absolute top-2 right-2 p-2 bg-slate-900/60 backdrop-blur-sm rounded-full z-10 hover:bg-slate-900/90 transition-colors">
                <Heart size={16} className={favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-white"} />
              </button>
              <div className="w-full aspect-square bg-slate-700 relative">
                <img src={item.image} alt={item.morph} className="w-full h-full object-cover" onError={(e) => { e.target.src = `https://placehold.co/400x400/1e293b/94a3b8?text=${t.realPhoto}` }} />
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white truncate leading-tight mb-0.5">{item.morph}</h4>
                  <p className="text-[11px] text-slate-400 italic truncate">{item.species}</p>
                  <div onClick={(e) => { e.stopPropagation(); navigateTo('breeder_reviews', item.breeder); }} className="flex items-center mt-2.5 mb-1 text-[10px] text-slate-300 bg-slate-900/60 w-max px-2 py-1.5 rounded-lg border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800 transition-colors">
                    <Star size={10} fill="currentColor" className="text-yellow-400 mr-1"/><span className="font-bold mr-1.5 text-white">{item.rating}</span><span className="truncate max-w-[90px]">{item.breeder}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-700/60 text-emerald-400 font-black text-sm">
                  {item.price}
                  <span className="bg-slate-900 text-slate-300 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">{t[item.sex]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchView({ navigateTo, t }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20 md:pb-0">
      <div className="pt-8 px-5 pb-5 bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-black text-white flex items-center tracking-tight"><Sliders size={20} className="mr-2 text-emerald-400"/> {t.searchTitle}</h1>
          <button onClick={() => navigateTo('home')} className="p-1.5 bg-slate-700 rounded-full text-white hover:bg-slate-600"><X size={20} /></button>
        </div>
        <div className="relative"><Search size={18} className="absolute left-4 top-3.5 text-slate-500" /><input type="text" placeholder={t.searchPlaceholder} className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" /></div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar max-w-2xl mx-auto w-full">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.category}</label>
          <div className="relative">
            <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
              {Object.keys(categoriesData).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.region}</label>
          <div className="relative">
            <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
              {italianRegions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.sex}</label>
          <div className="relative">
            <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
              <option value="all">{t.all}</option>
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
              <option value="unsexed">{t.unsexed}</option>
              <option value="pair">{t.pair}</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.birthYear}</label>
          <div className="relative">
            <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
              <option value="all">{t.all}</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023 o precedente</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="pt-4"><button onClick={() => navigateTo('home')} className="w-full bg-emerald-500 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-transform tracking-wider">{t.showResults}</button></div>
      </div>
    </div>
  );
}

function ListingDetailView({ animal, navigateTo, t, favorites, toggleFavorite }) {
  const [depositState, setDepositState] = useState('idle');

  if (!animal) return null;

  const handleDepositClick = () => {
    if (depositState === 'idle') {
      setDepositState('requested');
      setTimeout(() => {
        setDepositState('approved');
      }, 3000);
    } else if (depositState === 'approved') {
      alert("Redirecting to secure Stripe checkout for €" + animal.deposit);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar max-w-3xl mx-auto w-full border-x border-slate-800/50 relative">
      <div className="absolute w-full p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-8">
        <button onClick={() => navigateTo('home')} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"><ChevronLeft size={24} /></button>
        <button onClick={(e) => toggleFavorite(animal.id, e)} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white transition-colors">
          <Heart size={24} className={favorites.includes(animal.id) ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
      </div>
      
      <div className="w-full h-80 md:h-[450px] bg-slate-800 relative shrink-0">
        <img src={animal.image} className="w-full h-full object-cover" alt={animal.morph} onError={(e) => { e.target.src = `https://placehold.co/800x600/1e293b/94a3b8?text=${t.realPhoto}` }} />
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
      
      <div className="px-5 pb-5 -mt-8 relative z-10">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-0.5 leading-tight">{animal.morph}</h1>
        <h2 className="text-emerald-400 text-sm md:text-base font-medium mb-4">{animal.species}</h2>
        <div onClick={() => navigateTo('breeder_reviews', animal.breeder)} className="flex items-center text-xs text-slate-300 mb-5 bg-slate-800 w-max px-3 py-2 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors shadow-sm">
           <Star size={14} fill="currentColor" className="text-yellow-400 mr-2"/><span className="font-bold mr-2 text-white">{animal.rating}</span><span className="opacity-90 underline">({animal.reviews} reviews) • {animal.breeder}</span>
        </div>
        <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{animal.price}</span>
      </div>

      <div className="px-5 pb-6 grid grid-cols-2 gap-3 text-xs font-bold border-b border-slate-800">
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.sex}</span><span className="text-white text-sm">{t[animal.sex]}</span></div>
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.birthDate}</span><span className="text-white text-sm">{animal.birthDate}</span></div>
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.weight}</span><span className="text-white text-sm">{animal.weight || "N/A"}</span></div>
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.location}</span><span className="text-white text-sm">{animal.location}</span></div>
      </div>

      <div className="p-6 border-b border-slate-800 text-sm">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{t.parents}</h3>
        {animal.parents ? (
          <div className="flex space-x-3">
            <div className="flex-1 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-[9px] text-blue-400 font-bold uppercase block mb-1 tracking-widest">{t.sire}</span>
              <span className="text-white font-medium text-xs leading-tight">{animal.parents.sire}</span>
            </div>
            <div className="flex-1 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-[9px] text-pink-400 font-bold uppercase block mb-1 tracking-widest">{t.dam}</span>
              <span className="text-white font-medium text-xs leading-tight">{animal.parents.dam}</span>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 italic bg-slate-800/20 p-4 rounded-2xl border border-slate-700/30 text-xs">{t.unknownParents}</p>
        )}
      </div>

      <div className="p-6 border-b border-slate-800 text-sm">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{t.breederNotes}</h3>
        <p className="text-slate-300 leading-relaxed bg-slate-800/40 p-5 rounded-2xl">{animal.description}</p>
      </div>

      <div className="p-6 pb-44 md:pb-36">
        <div onClick={() => navigateTo('breeder', animal.breeder)} className="bg-gradient-to-r from-slate-800 to-slate-800 rounded-2xl p-5 flex items-center justify-between border border-slate-700 cursor-pointer hover:border-emerald-500/50 transition-colors shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-inner">{animal.breeder[0]}</div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.seller}</span>
              <h4 className="font-bold text-white flex items-center text-base mt-0.5">{animal.breeder} {animal.verified && <ShieldCheck size={18} className="text-blue-400 ml-1.5"/>}</h4>
            </div>
          </div>
          <ChevronRight size={24} className="text-slate-500"/>
        </div>
      </div>
      
      <div className="fixed md:absolute bottom-0 w-full p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-20 pb-safe max-w-3xl border-x border-slate-800/50">
        <div className="flex space-x-3">
          <button 
            onClick={handleDepositClick} 
            disabled={depositState === 'requested'}
            className={`flex-1 border font-bold text-xs py-3.5 rounded-xl shadow-xl flex flex-col justify-center items-center transition-all ${
              depositState === 'idle' ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' :
              depositState === 'requested' ? 'bg-slate-800/50 text-slate-400 border-slate-800 cursor-wait' :
              'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 animate-pulse'
            }`}
          >
             <span className="flex items-center mb-0.5">
               {depositState === 'idle' && <Clock size={14} className="mr-1.5 text-emerald-400"/>}
               {depositState === 'approved' && <CreditCard size={14} className="mr-1.5 text-white"/>}
               {depositState === 'idle' ? t.requestDeposit : depositState === 'requested' ? t.depositRequested : t.payDeposit}
             </span>
             {depositState !== 'requested' && <span className={depositState === 'approved' ? 'text-white font-black' : 'text-emerald-400 font-black'}>{animal.deposit}</span>}
          </button>
          
          <button onClick={() => navigateTo('chat_thread', animal)} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm py-3.5 rounded-xl shadow-xl flex justify-center items-center active:scale-95 transition-transform">
             <MessageCircle size={20} className="mr-2"/> Chat
          </button>
        </div>
      </div>
    </div>
  );
}

function BreederProfileView({ breederName, navigateTo, t }) {
  const [tab, setTab] = useState('listings');
  const breederListings = listings.filter(item => item.breeder === breederName);
  
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar pb-20 md:pb-0 max-w-5xl mx-auto w-full">
      <div className="pt-8 px-5 pb-4 bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <button onClick={() => navigateTo('home')} className="p-2 bg-slate-700 rounded-full text-white mb-4 hover:bg-slate-600 transition-colors"><ChevronLeft size={20} /></button>
        <h1 className="text-2xl font-black text-white flex items-center tracking-tight">{breederName} <ShieldCheck size={24} className="text-blue-400 ml-2" /></h1>
        <div onClick={() => navigateTo('breeder_reviews', breederName)} className="flex items-center text-yellow-400 font-bold text-sm mt-3 bg-slate-900/50 w-max px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors">
           <Star size={14} fill="currentColor" className="mr-2"/> 4.9 <span className="text-slate-400 ml-2 font-medium underline">34 Reviews</span>
        </div>
      </div>

      <div className="flex border-b border-slate-800 bg-slate-900 px-5">
        <button onClick={() => setTab('listings')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 ${tab === 'listings' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>{t.activeListings}</button>
        <button onClick={() => setTab('policies')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 ${tab === 'policies' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>{t.storePolicies}</button>
      </div>

      <div className="p-5 pb-24">
        {tab === 'listings' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {breederListings.map(item => (
              <div key={item.id} onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1 transition-transform shadow-lg">
                <img src={item.image} className="w-full aspect-square object-cover bg-slate-700" alt="" onError={(e) => { e.target.src = `https://placehold.co/400x400/1e293b/94a3b8?text=${t.realPhoto}` }} />
                <div className="p-3"><h4 className="font-bold text-sm text-white truncate">{item.morph}</h4><span className="text-sm font-black text-emerald-400 mt-1 block">{item.price}</span></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-lg text-sm text-slate-300 leading-relaxed">
            <h3 className="font-black text-white mb-3 uppercase tracking-widest flex items-center"><ShieldAlert size={18} className="mr-2 text-emerald-400"/> Termini di Vendita (TOS)</h3>
            <p>{t.policyDOA}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BreederReviewsView({ breederName, navigateTo, t }) {
  const reviews = breederReviewsData.filter(r => r.breeder === breederName);
  const displayReviews = reviews.length > 0 ? reviews : [
    { breeder: breederName, buyer: "Cliente Anonimo", date: "01/2026", rating: 5, comment: "Ottimo venditore, consigliato!" }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar pb-20 md:pb-0 max-w-3xl mx-auto w-full border-x border-slate-800/50">
      <div className="pt-8 px-5 pb-6 bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <button onClick={() => navigateTo('breeder', breederName)} className="p-2 bg-slate-700 rounded-full text-white mb-4 hover:bg-slate-600 transition-colors"><ChevronLeft size={20} /></button>
        <h1 className="text-xl font-black text-white tracking-tight leading-tight">Recensioni per</h1>
        <h2 className="text-emerald-400 font-bold text-lg">{breederName}</h2>
      </div>
      
      <div className="p-5 flex-1 space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center mb-6">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-slate-500 mb-3 border border-slate-700"><Lock size={20} /></div>
          <h3 className="text-sm font-bold text-white mb-2">{t.writeReview}</h3>
          <p className="text-xs text-slate-400 max-w-[280px] leading-relaxed">{t.onlyBuyersCanReview}</p>
        </div>

        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Feedback Recenti</h3>
        {displayReviews.map((rev, index) => (
          <div key={index} className="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-md">
             <div className="flex justify-between items-start mb-3">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-sm font-black text-white shadow-inner">{rev.buyer.charAt(0)}</div>
                 <div><h4 className="font-bold text-sm text-white">{rev.buyer}</h4><span className="text-[9px] text-blue-400 font-bold flex items-center mt-0.5"><ShieldCheck size={10} className="mr-1"/> {t.verifiedBuyer}</span></div>
               </div>
               <div className="flex text-yellow-400">
                 {[...Array(5)].map((_, i) => (<Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-slate-600"}/>))}
               </div>
             </div>
             <p className="text-sm text-slate-300 leading-relaxed italic font-medium">"{rev.comment}"</p>
             <span className="text-[9px] text-slate-500 mt-4 block font-bold tracking-widest text-right">{rev.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddListingView({ navigateTo, t }) {
  const [success, setSuccess] = useState(false);
  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-5 border border-emerald-500/30 shadow-lg"><CheckCircle size={40} /></div>
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Annuncio Caricato!</h2>
        <button onClick={() => { setSuccess(false); navigateTo('home'); }} className="w-full max-w-[200px] bg-emerald-500 text-white font-bold py-3.5 rounded-2xl mt-6 shadow-xl">Torna alla Home</button>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar max-w-2xl mx-auto w-full">
      <div className="pt-8 px-5 pb-5 bg-slate-800 border-b border-slate-700 text-xl font-black text-white tracking-tight sticky top-0 z-10">{t.newListing}</div>
      <div className="flex-1 p-5 space-y-5 pb-24">
        <div className="border-2 border-dashed border-slate-700 rounded-3xl py-14 text-center bg-slate-800/30 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5 transition-all"><Camera size={36} className="text-slate-500 mb-3" /><span className="text-xs font-bold text-slate-300 tracking-wider uppercase">{t.uploadPhoto}</span></div>
        <div className="space-y-4">
          <input type="text" placeholder="Specie" className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
          <input type="text" placeholder="Morph / Genetica" className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
          <div className="grid grid-cols-2 gap-3">
             <input type="text" placeholder="Prezzo (€)" className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
             <select className="bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-slate-400 outline-none appearance-none shadow-inner">
               <option>{t.sex}</option><option>{t.male}</option><option>{t.female}</option><option>{t.pair}</option>
             </select>
          </div>
        </div>
        <button onClick={() => setSuccess(true)} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl shadow-xl mt-6 active:scale-95 transition-transform tracking-wider">{t.publish}</button>
      </div>
    </div>
  );
}

function ChatHubView({ navigateTo, t }) {
  const activeChats = [
    { id: 1, breeder: "Piedmont Geckos", lastMessage: "Perfetto, ci vediamo allo stand!", listing: listings[0], time: "14:20" },
    { id: 2, breeder: "ExoBreed IT", lastMessage: "Documento CITES compilato?", listing: listings[1], time: "Ieri" }
  ];
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full border-x border-slate-800/50">
      <div className="pt-8 px-5 pb-5 bg-slate-800 border-b border-slate-700 font-black text-xl text-white tracking-tight sticky top-0 z-10">{t.messages}</div>
      <div className="flex-1 overflow-y-auto p-3 hide-scrollbar pb-20 md:pb-0">
        {activeChats.map(chat => (
          <div key={chat.id} onClick={() => navigateTo('chat_thread', chat)} className="p-4 flex items-center space-x-4 cursor-pointer bg-slate-800/30 hover:bg-slate-800/80 rounded-3xl transition-colors mb-2 border border-slate-800">
            <div className="relative shrink-0">
              <img src={chat.listing.image} className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md" alt="" onError={(e) => { e.target.src = `https://placehold.co/100x100/1e293b/94a3b8?text=${t.realPhoto}` }} />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5"><h4 className="font-bold text-sm text-white truncate">{chat.breeder}</h4><span className="text-[10px] text-slate-500 font-bold">{chat.time}</span></div>
              <p className="text-xs text-slate-400 truncate leading-tight">{chat.lastMessage}</p>
              <span className="text-[9px] text-emerald-400 font-black mt-1.5 inline-block uppercase tracking-widest">{chat.listing.morph}</span>
            </div>
            <ChevronRight size={18} className="text-slate-600 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatThreadView({ chatData, navigateTo, t }) {
  const target = (chatData && chatData.listing) ? chatData.listing : listings[0];
  
  const [messages, setMessages] = useState([
    { sender: 'me', text: "Salve, l'esemplare è ancora disponibile per la fiera?" },
    { sender: 'them', text: "Ciao! Sì, lo porto a Verona. Se vuoi bloccarlo prima che lo venda ad altri, puoi inviare una richiesta di prenotazione tramite l'app." }
  ]);
  const [inputText, setInputText] = useState("");
  const [depositState, setDepositState] = useState('idle');

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'me', text: inputText }]);
    setInputText("");
  };

  const requestReservation = () => {
    if (depositState !== 'idle') return;
    setDepositState('requested');
    setMessages([...messages, { sender: 'me', text: `Ho inviato una richiesta formale per bloccare l'esemplare pagando il deposito del 10% (${target.deposit}). In attesa di approvazione.` }]);
    setTimeout(() => {
      setDepositState('approved');
      setMessages(prev => [...prev, { sender: 'them', text: "Perfetto! Ho appena accettato la tua richiesta. Puoi procedere al pagamento cliccando sul pulsante verde in alto per completare la prenotazione." }]);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full border-x border-slate-800/50">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-20">
        <button onClick={() => navigateTo('chat')} className="p-2 mr-3 bg-slate-700 rounded-full text-white active:scale-90 transition-transform"><ChevronLeft size={20} /></button>
        <div className="flex-1"><h1 className="text-base font-black text-white">{target.breeder}</h1><p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t.onlineNow}</p></div>
      </div>
      <div className="bg-slate-950/90 backdrop-blur p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={target.image} className="w-11 h-11 rounded-lg object-cover border border-slate-700" alt="" onError={(e) => { e.target.src = `https://placehold.co/100x100/1e293b/94a3b8?text=${t.realPhoto}` }} />
          <div><h4 className="text-[11px] font-bold text-white leading-tight">{target.morph}</h4><p className="text-emerald-400 text-[11px] font-black">{target.price}</p></div>
        </div>
        <div className="flex space-x-2">
          <button onClick={depositState === 'idle' ? requestReservation : depositState === 'approved' ? () => alert("Redirecting to Stripe...") : undefined} disabled={depositState === 'requested'} className={`font-bold text-[10px] py-2 px-3 rounded-xl shadow-lg transition-all flex items-center ${depositState === 'idle' ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' : depositState === 'requested' ? 'bg-slate-800/50 text-slate-400 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'}`}>
            {depositState === 'approved' && <CreditCard size={12} className="mr-1.5"/>}
            {depositState === 'idle' ? t.requestDeposit : depositState === 'requested' ? t.depositRequested : t.payDeposit}
          </button>
          <button onClick={() => navigateTo('cites_generator', target)} className="bg-blue-600 text-white font-bold text-[10px] py-2 px-3 rounded-xl flex items-center shadow-lg hover:bg-blue-500 active:scale-95 transition-all"><FileText size={14} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-4 rounded-3xl text-sm shadow-md ${msg.sender === 'me' ? 'bg-emerald-600 text-white rounded-tr-sm ml-auto max-w-[85%]' : 'bg-slate-800 text-slate-200 rounded-tl-sm max-w-[85%]'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex space-x-2 pb-safe">
        <input type="text" placeholder={t.typeMessage} value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500" />
        <button onClick={handleSend} className="bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform"><MessageCircle size={20}/></button>
      </div>
    </div>
  );
}

function CitesGeneratorView({ animalData, navigateTo, t }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nome: '', cognome: '', cf: '' });
  const isCites = animalData?.category !== "Gechi (Geckos)";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-2xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0">
        <button onClick={() => navigateTo('chat_thread', animalData)} className="p-2 mr-3 bg-slate-700 rounded-full text-white active:scale-90 transition-transform"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-black text-white tracking-tight">Generatore Documenti</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-5 pb-24 text-sm hide-scrollbar">
        {step === 1 ? (
          <div className="space-y-6">
            <div className={`p-5 rounded-2xl border-2 font-bold ${isCites ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
              <h4 className="text-[10px] uppercase tracking-[0.2em] mb-1.5 opacity-80">{isCites ? "Documento Legale Obbligatorio" : "Certificazione Piattaforma"}</h4>
              <p className="text-sm">{isCites ? "Dichiarazione Cessione CITES All. B" : "Animal ID & Certificato Origine"}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Dati Acquirente (Reali)</h3>
              <input type="text" placeholder="Nome" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-white outline-none focus:border-emerald-500 shadow-inner" />
              <input type="text" placeholder="Cognome" value={formData.cognome} onChange={e => setFormData({...formData, cognome: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-white outline-none focus:border-emerald-500 shadow-inner" />
              <input type="text" placeholder="Codice Fiscale" value={formData.cf} onChange={e => setFormData({...formData, cf: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-white outline-none uppercase focus:border-emerald-500 shadow-inner" />
              <button onClick={() => setStep(2)} disabled={!formData.nome || !formData.cf} className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl mt-4 shadow-xl active:scale-95 transition-transform tracking-wider disabled:bg-slate-700 disabled:text-slate-400">GENERA ANTEPRIMA PDF</button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-2xl text-slate-800 font-serif text-[11px] space-y-5">
              <div className="border-b-2 border-slate-800 pb-3 mb-2 text-center font-bold uppercase text-emerald-900 leading-tight">
                {isCites ? "DICHIARAZIONE DI CESSIONE AI FINI CITES" : "CERTIFICATO DI ORIGINE E CESSIONE (ANIMAL ID)"}
                <p className="text-[8px] text-slate-500 font-sans mt-1.5">{isCites ? "(Ai sensi del Reg. CE 338/97)" : "(HerpMarket Verified - Captive Bred)"}</p>
              </div>
              <p className="leading-relaxed text-[12px]">Il sottoscritto Cedente <strong>{animalData.breeder}</strong> cede a <strong>{formData.nome} {formData.cognome}</strong> (C.F. {formData.cf.toUpperCase()}) l'esemplare nato in cattività di <strong>{animalData.species}</strong> morph <strong>{animalData.morph}</strong> (Data di Nascita: {animalData.birthDate}).</p>
              <div className="pt-10 border-t border-slate-300 flex justify-between font-sans">
                <div className="mt-4 border-t border-slate-800 px-6 pt-1 text-center font-bold">Firma Cedente</div>
                <div className="mt-4 border-t border-slate-800 px-6 pt-1 text-center font-bold">Firma Acquirente</div>
              </div>
            </div>
            <button onClick={() => navigateTo('documents')} className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl flex justify-center items-center active:scale-95 transition-transform shadow-lg"><Clipboard size={18} className="mr-2"/> Salva nell'Archivio Digitale</button>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardHubView({ navigateTo, t }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar pb-24 md:pb-0 max-w-3xl mx-auto w-full">
      <div className="pt-10 px-5 pb-8 bg-slate-800 border-b border-slate-700 flex items-center space-x-5 sticky top-0 z-10">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-3xl rotate-3 flex items-center justify-center text-white text-2xl font-black shadow-xl shrink-0">TU</div>
        <div>
          <h1 className="text-xl font-black text-white flex items-center leading-tight tracking-tight">{t.myAccount} <ShieldCheck size={18} className="ml-2 text-slate-500"/></h1>
          <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mt-1">{t.breederLevel}</p>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2 px-1">{t.management}</h3>
        <DashboardButton icon={<Heart />} label={t.wishlist} onClick={() => navigateTo('wishlist')} />
        <DashboardButton icon={<List />} label="Inventario Esemplari" onClick={() => navigateTo('inventory')} />
        <DashboardButton icon={<Grid />} label="Genetica & Pedigree" onClick={() => navigateTo('lineage')} badge="Pro" />
        
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2 mt-8 px-1">{t.logistics}</h3>
        <DashboardButton icon={<FileText />} label="Archivio CITES & ID" onClick={() => navigateTo('documents')} />
        <DashboardButton icon={<Truck />} label="Eco-Taxi (Trasporti)" onClick={() => navigateTo('transport')} />
        <DashboardButton icon={<Info />} label="Normative Guide" onClick={() => navigateTo('legal')} />
        
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2 mt-8 px-1">{t.settings}</h3>
        <DashboardButton icon={<Settings />} label="Impostazioni & KYC" onClick={() => navigateTo('settings')} />
      </div>
    </div>
  );
}

function DashboardButton({ icon, label, onClick, badge }) {
  return (
    <button onClick={onClick} className="w-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between text-left active:scale-[0.98] transition-all shadow-sm mb-2">
      <div className="flex items-center space-x-4 text-slate-200">
        <div className="text-emerald-400 bg-slate-900 p-2.5 rounded-xl shadow-inner">{icon}</div>
        <span className="text-sm font-bold">{label}</span>
      </div>
      <div className="flex items-center space-x-3">
        {badge && <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-emerald-500/20">{badge}</span>}
        <ChevronRight size={18} className="text-slate-600" />
      </div>
    </button>
  );
}

function WishlistView({ navigateTo, t, favorites, toggleFavorite }) {
  const wishlistedItems = listings.filter(item => favorites.includes(item.id));
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-black text-white">{t.wishlist}</h1>
      </div>
      <div className="p-5 flex-1 overflow-y-auto hide-scrollbar pb-24">
        {wishlistedItems.length === 0 ? (
          <div className="text-center text-slate-500 text-sm font-medium mt-10">La tua wishlist è vuota.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {wishlistedItems.map(item => (
              <div key={item.id} onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col cursor-pointer relative">
                <button onClick={(e) => toggleFavorite(item.id, e)} className="absolute top-2 right-2 p-1.5 bg-slate-900/60 backdrop-blur-sm rounded-full z-10 hover:bg-slate-900/90 transition-colors">
                  <Heart size={14} className="fill-red-500 text-red-500" />
                </button>
                <img src={item.image} className="w-full aspect-square object-cover bg-slate-700" alt="" onError={(e) => { e.target.src = `https://placehold.co/400x400/1e293b/94a3b8?text=${t.realPhoto}` }} />
                <div className="p-3">
                  <h4 className="font-bold text-sm text-white truncate">{item.morph}</h4>
                  <span className="text-sm font-black text-emerald-400 mt-1 block">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InventoryManagerView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">Inventario</h1></div>
      <div className="p-20 text-center text-slate-500 text-sm font-medium">Caricamento esemplari in corso...</div>
    </div>
  );
}

function DocumentArchiveView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">Archivio Digitale</h1></div>
      <div className="p-4"><div className="bg-slate-800 p-5 rounded-2xl flex items-center justify-between border border-slate-700 shadow-lg"><div className="flex items-center space-x-4"><FileText className="text-blue-400" size={32} /><div><h4 className="text-xs font-bold text-white leading-tight">Cessione_Pardalis_2026.pdf</h4><p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">14 Maggio 2026</p></div></div><Folder className="text-slate-600" size={20} /></div></div>
    </div>
  );
}

function TransportBoardView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">Eco-Taxi Reptiles</h1></div>
      <div className="p-4">
        <div className="bg-gradient-to-br from-emerald-900/60 to-slate-800 border border-emerald-500/20 p-5 rounded-3xl shadow-xl">
          <div className="flex justify-between items-center mb-4"><span className="bg-emerald-400 text-slate-950 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg tracking-widest">Autorizzato ASL</span><CheckCircle size={18} className="text-emerald-400"/></div>
          <h3 className="font-black text-white text-lg tracking-tight">MILANO {"->"} BOLOGNA {"->"} ROMA</h3>
          <p className="text-[11px] text-emerald-400/90 font-bold mt-1 uppercase tracking-wider">Partenza: 20 Giugno 2026</p>
          <div className="mt-6 pt-4 border-t border-slate-700/60 flex justify-between items-center"><div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tariffa Base</span><span className="text-white font-black text-2xl">€45<span className="text-xs text-slate-400 font-normal">/box</span></span></div><button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-2xl shadow-lg active:scale-95 transition-transform">Prenota</button></div>
        </div>
      </div>
    </div>
  );
}

function ExpoHubView({ expoData, navigateTo }) {
  if (!expoData) return null;
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10"><button onClick={() => navigateTo('home')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white leading-tight tracking-tight">{expoData.name}</h1></div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar pb-24">
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-5">
           <div><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Città & Stato</p><p className="text-white font-black text-xl">{expoData.location}</p></div>
           <div><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Data Evento</p><p className="text-white font-black text-xl">{expoData.date}</p></div>
        </div>
        <div className="p-6 border-2 border-dashed border-slate-700 rounded-3xl text-center text-xs text-slate-400 leading-relaxed shadow-inner">
          <Clipboard size={36} className="mx-auto text-slate-600 mb-4"/>
          Questo è l'hub dedicato per la fiera <strong>{expoData.name}</strong>. Tutti gli annunci prenotati tramite l'app verranno marcati per il "Ritiro a Mano" in questo evento per evitare costi di spedizione.
        </div>
      </div>
    </div>
  );
}

function LineageTrackerView({ navigateTo, t }) {
  const [calcResult, setCalcResult] = useState(null);

  const calculateGenetics = () => {
    setCalcResult([
      { trait: "50% Lilly White", probability: "50" },
      { trait: "50% Normal (Wild Type)", probability: "50" }
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-black text-white">Genetica & Pedigree</h1>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto hide-scrollbar pb-24 space-y-8">
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">I Tuoi Riproduttori</h3>
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-4 flex items-center space-x-4 shadow-lg">
            <div className="w-16 h-16 bg-slate-700 rounded-2xl overflow-hidden shadow-inner shrink-0"><img src="/images/ciliatus.jpg" className="w-full h-full object-cover" alt="" onError={(e) => { e.target.src = 'https://placehold.co/200x200/1e293b/94a3b8?text=Foto' }} /></div>
            <div className="flex-1">
               <div className="flex items-center space-x-2"><span className="bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-blue-500/20">SIRE</span><span className="text-[10px] text-slate-500 font-bold">#G01</span></div>
               <h4 className="text-white font-black text-lg mt-1">Ghost</h4>
               <p className="text-xs text-slate-400 italic">Axanthic Lilly White</p>
            </div>
            <div className="text-center bg-slate-900 p-2.5 rounded-xl border border-slate-700/50"><span className="text-emerald-400 font-black text-xl">14</span><p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Offspring</p></div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center mb-2"><Calculator size={20} className="text-emerald-400 mr-2" /><h3 className="font-black text-white text-lg tracking-tight">{t.geneticsTitle}</h3></div>
          <p className="text-xs text-slate-400 mb-6">{t.calcDesc}</p>
          <div className="space-y-4">
            <div className="flex space-x-3">
              <div className="flex-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">{t.sire}</label><select className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-3 text-sm text-white appearance-none"><option>Ghost (Axanthic Lilly White)</option></select></div>
              <div className="flex-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">{t.dam}</label><select className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-3 text-sm text-white appearance-none"><option>Seleziona Dam</option><option>Ruby (Normal)</option></select></div>
            </div>
            <button onClick={calculateGenetics} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform tracking-wider uppercase text-xs mt-2">{t.calculate}</button>
            {calcResult && (
              <div className="mt-6 pt-5 border-t border-slate-700 space-y-3">
                <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Risultato Previsto</h4>
                {calcResult.map((res, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-700/50"><span className="text-sm font-bold text-white">{res.trait}</span><span className="text-xs text-slate-400 font-bold">{res.probability}%</span></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewManagerView({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('ricevute');

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">Le Mie Recensioni</h1></div>
      
      <div className="flex border-b border-slate-800 bg-slate-900">
        <button onClick={() => setActiveTab('ricevute')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'ricevute' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400'}`}>Ricevute (4)</button>
        <button onClick={() => setActiveTab('lasciate')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'lasciate' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400'}`}>Lasciate ai Buyer</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar pb-24">
        {activeTab === 'ricevute' ? (
          <>
            <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-lg">
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-sm font-black text-white shadow-inner">MR</div><h4 className="font-bold text-sm text-white">Marco Rossi</h4></div>
                 <div className="flex text-yellow-400"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
               </div>
               <p className="text-sm text-slate-300 leading-relaxed italic font-medium">"Allevatore serissimo, animale in forma perfetta e documentazione CITES Allegato B compilata a regola d'arte. Consigliatissimo!"</p>
               <span className="text-[9px] text-slate-500 mt-5 block font-bold uppercase tracking-widest text-right">Settembre 2026</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center pt-10">
            <Star size={48} className="text-slate-700 mb-4" />
            <h3 className="text-white font-bold mb-2">Nessuna recensione lasciata</h3>
            <p className="text-slate-400 text-sm text-center max-w-[250px] mb-6">Valutare gli acquirenti aiuta la community a isolare perditempo e truffatori.</p>
            <button className="bg-slate-800 text-slate-400 font-bold py-2.5 px-6 rounded-xl cursor-not-allowed border border-slate-700 border-dashed">Disponibile dopo acquisto</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">Impostazioni & KYC</h1></div>
      <div className="p-5 space-y-8 flex-1 overflow-y-auto hide-scrollbar pb-24">
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-800 border border-blue-500/30 p-6 rounded-3xl shadow-xl">
          <h2 className="text-lg font-black text-white mb-2 flex items-center tracking-tight">OTTENI LA SPUNTA BLU <ShieldCheck size={22} className="ml-2 text-blue-400"/></h2>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">Aumenta la tua credibilità caricando la visura camerale o un documento d'identità valido.</p>
          <button className="w-full bg-blue-600 text-white text-xs font-black py-3.5 rounded-2xl shadow-lg hover:bg-blue-500 active:scale-95 transition-all uppercase tracking-widest">Inizia Verifica Identità</button>
        </div>
        <div className="space-y-4">
           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">Dati Allevamento</h3>
           <input type="text" placeholder="Nome Allevamento" className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
           <select className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white appearance-none focus:border-emerald-500 shadow-inner">{italianRegions.map(reg => <option key={reg}>{reg}</option>)}</select>
        </div>
      </div>
    </div>
  );
}

function LegalGuideView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white tracking-tight">Normative & Guide</h1></div>
      <div className="p-5 space-y-6 overflow-y-auto flex-1 hide-scrollbar pb-24">
        <div className="bg-orange-500/10 p-5 rounded-3xl border border-orange-500/20 text-orange-200 text-xs leading-relaxed shadow-lg font-medium">
          <div className="flex items-center mb-3"><Info size={18} className="mr-2 text-orange-400 font-bold"/> <strong className="tracking-widest uppercase">AVVISO LEGALE</strong></div>
          Le leggi italiane (D.Lgs 135/2022) vietano la detenzione di specie pericolose (come vipere, crotali, grandi felini) e specie invasive UE. Inserire tali annunci comporterà il ban permanente dalla piattaforma e la segnalazione alle autorità competenti.
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
           <div className="p-4 bg-slate-700/50 border-b border-slate-700 font-black text-[10px] text-white tracking-widest uppercase">CITES: Allegato A vs Allegato B</div>
           <div className="p-5 text-xs text-slate-300 space-y-5">
             <div><p className="font-black text-white mb-1.5 text-sm">Allegato A <span className="text-[10px] text-slate-400 font-normal">(es. Testudo hermanni)</span></p><p className="leading-relaxed">Richiede CITES giallo originale con foto (rinnovabile) e microchip. La cessione senza questo documento è un reato penale.</p></div>
             <div className="pt-4 border-t border-slate-700/50"><p className="font-black text-white mb-1.5 text-sm">Allegato B <span className="text-[10px] text-slate-400 font-normal">(es. Camaleonte, Pitone Reale)</span></p><p className="leading-relaxed">Richiede la "Dichiarazione di Cessione ai fini CITES" firmata dal cedente e dall'acquirente, oltre alla prova di nascita in cattività.</p></div>
           </div>
        </div>
        <button className="w-full text-center text-[10px] font-black text-emerald-400 py-6 hover:bg-slate-850 rounded-3xl tracking-[0.2em] uppercase transition-colors">
          Leggi i Termini di Servizio Completi {"->"}
        </button>
      </div>
    </div>
  );
}