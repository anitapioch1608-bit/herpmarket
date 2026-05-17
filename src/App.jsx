import React, { useState } from 'react';
import { 
  Home, Search, PlusCircle, MessageCircle, User, 
  ChevronRight, ChevronLeft, ShieldCheck, MapPin, 
  Star, Calendar, Sliders, Filter, FileText, CheckCircle,
  Folder, Truck, Info, Settings, List, Grid, Camera, Clipboard, MoreHorizontal
} from 'lucide-react';

// --- TRANSLATION DICTIONARY ---
const translations = {
  it: {
    appSub: "Il marketplace rettili in Italia",
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
    origin: "Origine",
    weight: "Peso",
    location: "Località",
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
    langSwitch: "LANGUAGE: EN"
  },
  en: {
    appSub: "The reptile marketplace in Italy",
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
    origin: "Origin",
    weight: "Weight",
    location: "Location",
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
    langSwitch: "LINGUA: IT"
  }
};

// --- MOCK DATA ---
const listings = [
  {
    id: 1, species: "Correlophus ciliatus", morph: "Red Harlequin Pinstripe", price: "€150",
    image: "https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=800", location: "Torino", fiera: "Squamata Expo", breeder: "Piedmont Geckos",
    verified: true, sex: "Maschio", origin: "CB 2024", weight: "35g", rating: 4.8, reviews: 24,
    description: "Bellissimo esemplare, mangia Pangea e grilli regolarmente. Perfetto per riproduzione.", breederFocus: "Crested Geckos", category: "Gechi (Geckos)"
  },
  {
    id: 2, species: "Furcifer pardalis", morph: "Ambilobe Blue Bar", price: "€280",
    image: "https://images.unsplash.com/photo-1580526149844-31f1a5f6ed49?auto=format&fit=crop&q=80&w=800", location: "Milano", fiera: "Verona Reptiles", breeder: "ExoBreed IT",
    verified: true, sex: "Maschio", origin: "CB 2025", weight: "80g", rating: 4.9, reviews: 56,
    description: "Colori spettacolari. Documento CITES All. B incluso per la cessione.", breederFocus: "Camaleonti (Pardalis, Calyptratus)", category: "Camaleonti (Chameleons)"
  },
  {
    id: 3, species: "Gekko gecko", morph: "Normal CB", price: "€90",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800", location: "Roma", fiera: null, breeder: "Serpenti Roma",
    verified: false, sex: "Femmina", origin: "CB 2023", weight: "75g", rating: 4.2, reviews: 15,
    description: "Nata in cattività, molto docile per essere un Tokay. Abituata al maneggio.", breederFocus: "Gechi asiatici", category: "Gechi (Geckos)"
  },
  {
    id: 4, species: "Eublepharis macularius", morph: "Normal / Wild Type", price: "€45",
    image: "https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=800", location: "Napoli", fiera: "Esotika Pet Show", breeder: "LeoMorphs Campania",
    verified: true, sex: "Unsexed", origin: "CB 2026", weight: "15g", rating: 4.7, reviews: 30,
    description: "Mangia tarme della farina regolarmente. Ottimo primo rettile.", breederFocus: "Leopard Geckos", category: "Gechi (Geckos)"
  },
  {
    id: 5, species: "Phelsuma grandis", morph: "High Red", price: "€110",
    image: "https://images.unsplash.com/photo-1596796985794-6887cb024dd8?auto=format&fit=crop&q=80&w=800", location: "Firenze", fiera: null, breeder: "Phelsuma Italia",
    verified: true, sex: "Femmina", origin: "CB 2024", weight: "40g", rating: 5.0, reviews: 41,
    description: "In salute, colori molto accesi. Doc. CITES All. B pronto.", breederFocus: "Phelsuma e Gechi Diurni", category: "Gechi (Geckos)"
  },
  {
    id: 6, species: "Pogona henrylawsoni", morph: "Normal", price: "€180",
    image: "https://images.unsplash.com/photo-1542228601-51208034b7a1?auto=format&fit=crop&q=80&w=800", location: "Bologna", fiera: "Squamata Expo", breeder: "DragoMania",
    verified: false, sex: "Coppia", origin: "CB 2026", weight: "10g", rating: 4.4, reviews: 12,
    description: "Piccoli di drago di Rankin, ottimi mangiatori. Prezzo per la coppia.", breederFocus: "Pogona vitticeps, henrylawsoni", category: "Sauri & Varani (Lizards & Monitors)"
  },
  {
    id: 7, species: "Tiliqua scincoides", morph: "Irian Jaya", price: "€250",
    image: "https://images.unsplash.com/photo-1506555191898-bea76022e379?auto=format&fit=crop&q=80&w=800", location: "Genova", fiera: "Verona Reptiles", breeder: "SkinkHaven",
    verified: true, sex: "Unsexed", origin: "CB 2025", weight: "300g", rating: 4.9, reviews: 28,
    description: "Scinco dalla lingua blu, mangia di tutto. Molto tranquillo e facile da gestire.", breederFocus: "Scinchi e Varani", category: "Sauri & Varani (Lizards & Monitors)"
  }
];

const expos = [
  { id: 1, name: "Squamata Expo", location: "Bologna, IT", date: "21 Giu 2026", color: "bg-emerald-600" },
  { id: 2, name: "Verona Reptiles", location: "Cerea (VR), IT", date: "3 Ott 2026", color: "bg-orange-600" },
  { id: 3, name: "Esotika Pet Show", location: "Arezzo, IT", date: "12 Set 2026", color: "bg-blue-600" },
  { id: 4, name: "Terraristika Hamm", location: "Hamm, DE", date: "12 Dic 2026", color: "bg-slate-700" },
  { id: 5, name: "EXOTICA", location: "St. Pölten, AT", date: "8 Nov 2026", color: "bg-red-800" }
];

const categoriesData = {
  "Tutti gli Animali": [],
  "Gechi (Geckos)": [],
  "Serpenti (Snakes)": [],
  "Camaleonti (Chameleons)": [],
  "Sauri & Varani (Lizards)": [],
  "Tartarughe (Turtles & Tortoises)": [],
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

  const t = translations[lang];

  const navigateTo = (view, data = null) => {
    setCurrentView(view);
    if (data) setViewData(data);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView navigateTo={navigateTo} t={t} lang={lang} setLang={setLang} />;
      case 'search': return <SearchView navigateTo={navigateTo} t={t} />;
      case 'detail': return <ListingDetailView animal={viewData} navigateTo={navigateTo} t={t} />;
      case 'breeder': return <BreederProfileView breederName={viewData} navigateTo={navigateTo} t={t} />;
      case 'add': return <AddListingView navigateTo={navigateTo} t={t} />;
      case 'chat': return <ChatHubView navigateTo={navigateTo} t={t} />;
      case 'chat_thread': return <ChatThreadView chatData={viewData} navigateTo={navigateTo} t={t} />;
      case 'cites_generator': return <CitesGeneratorView animalData={viewData} navigateTo={navigateTo} t={t} />;
      case 'profile': return <DashboardHubView navigateTo={navigateTo} t={t} />;
      case 'inventory': return <InventoryManagerView navigateTo={navigateTo} />;
      case 'documents': return <DocumentArchiveView navigateTo={navigateTo} />;
      case 'transport': return <TransportBoardView navigateTo={navigateTo} />;
      case 'expo_hub': return <ExpoHubView expoData={viewData} navigateTo={navigateTo} />;
      case 'lineage': return <LineageTrackerView navigateTo={navigateTo} />;
      case 'reviews': return <ReviewManagerView navigateTo={navigateTo} />;
      case 'settings': return <SettingsView navigateTo={navigateTo} />;
      case 'legal': return <LegalGuideView navigateTo={navigateTo} />;
      default: return <HomeView navigateTo={navigateTo} t={t} lang={lang} setLang={setLang} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 font-sans text-slate-100 antialiased select-none overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* DESKTOP SIDEBAR (Visible only on md screens and up) */}
      <nav className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 z-30">
        <div className="mb-10">
          <h1 className="text-2xl font-black text-white tracking-tight">HERP<span className="text-emerald-400">MARKET</span></h1>
          <p className="text-[11px] text-slate-400 mt-1">{t.appSub}</p>
        </div>
        <div className="flex flex-col space-y-2 flex-1">
          <DesktopNavButton icon={<Home size={20} />} active={currentView === 'home'} label={t.navHome} onClick={() => navigateTo('home')} />
          <DesktopNavButton icon={<Search size={20} />} active={currentView === 'search'} label={t.navSearch} onClick={() => navigateTo('search')} />
          <DesktopNavButton icon={<PlusCircle size={20} />} active={currentView === 'add'} label={t.navSell} onClick={() => navigateTo('add')} />
          <DesktopNavButton icon={<MessageCircle size={20} />} active={currentView === 'chat' || currentView === 'chat_thread'} label={t.navChat} onClick={() => navigateTo('chat')} />
          <DesktopNavButton icon={<User size={20} />} active={['profile', 'inventory', 'documents', 'transport', 'lineage', 'reviews', 'settings', 'legal'].includes(currentView)} label={t.navProfile} onClick={() => navigateTo('profile')} />
        </div>
        <div className="mt-auto">
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')} 
            className="w-full bg-slate-800 hover:bg-slate-700 py-3.5 rounded-xl text-[11px] font-black tracking-widest text-emerald-400 border border-slate-700 transition-colors"
          >
            {t.langSwitch}
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full h-full bg-slate-900 relative flex flex-col overflow-hidden">
        <div className="flex-1 h-full relative overflow-y-auto hide-scrollbar pb-20 md:pb-0">
          {renderView()}
        </div>

        {/* MOBILE BOTTOM NAV (Visible only on small screens) */}
        <nav className="md:hidden absolute bottom-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-around py-3 z-30 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <MobileNavButton icon={<Home size={22} />} active={currentView === 'home'} label={t.navHome} onClick={() => navigateTo('home')} />
          <MobileNavButton icon={<Search size={22} />} active={currentView === 'search'} label={t.navSearch} onClick={() => navigateTo('search')} />
          <MobileNavButton icon={<PlusCircle size={26} className="text-emerald-400" />} active={currentView === 'add'} label={t.navSell} onClick={() => navigateTo('add')} />
          <MobileNavButton icon={<MessageCircle size={22} />} active={currentView === 'chat' || currentView === 'chat_thread'} label={t.navChat} onClick={() => navigateTo('chat')} />
          <MobileNavButton icon={<User size={22} />} active={['profile', 'inventory', 'documents', 'transport', 'lineage', 'reviews', 'settings', 'legal'].includes(currentView)} label={t.navProfile} onClick={() => navigateTo('profile')} />
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
    <button 
      onClick={onClick} 
      className={`flex items-center space-x-4 p-3 rounded-xl transition-all ${active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"}`}
    >
      <div>{icon}</div>
      <span className="text-sm font-bold tracking-wide">{label}</span>
    </button>
  );
}

// 1. Home Feed
function HomeView({ navigateTo, t, lang, setLang }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-6 overflow-y-auto hide-scrollbar max-w-7xl mx-auto w-full">
      <div className="pt-8 px-5 pb-4 bg-slate-900/90 border-b border-slate-800 sticky top-0 z-20 flex justify-between items-center backdrop-blur-lg md:hidden">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">HERP<span className="text-emerald-400">MARKET</span></h1>
          <p className="text-[11px] text-slate-400 mt-0.5">{t.appSub}</p>
        </div>
        <button 
          onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
          className="bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest cursor-pointer hover:bg-emerald-500/20 active:scale-95 transition-all"
        >
          {lang === 'it' ? 'IT' : 'EN'}
        </button>
      </div>

      <div className="pt-6 pb-2 px-5">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t.upcomingExpos}</h3>
        {/* Adjusted Expo List: Shows exactly 2 expos and a button, scales nicely on laptop */}
        <div className="flex space-x-3 mb-2">
          {expos.slice(0, 2).map(expo => (
            <div key={expo.id} onClick={() => navigateTo('expo_hub', expo)} className={`flex-1 max-w-[200px] ${expo.color} p-4 rounded-2xl shadow-lg cursor-pointer transform active:scale-95 transition-transform flex flex-col justify-between`}>
              <Calendar size={16} className="text-white/80 mb-2" />
              <div>
                <h4 className="font-bold text-sm text-white truncate leading-tight">{expo.name}</h4>
                <p className="text-[10px] text-white/90 font-medium mt-1 truncate">{expo.location}</p>
              </div>
              <span className="text-[10px] bg-black/30 text-white font-bold px-2 py-0.5 rounded mt-3 inline-block self-start">{expo.date}</span>
            </div>
          ))}
          {/* Action button to open more expos */}
          <div onClick={() => navigateTo('search')} className="w-16 md:w-24 bg-slate-800/80 border border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform hover:bg-slate-700 shadow-md">
            <MoreHorizontal size={24} className="text-slate-400 mb-1" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{t.seeAll}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-12 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t.latestListings}</h3>
          <span className="text-[11px] text-emerald-400 font-bold cursor-pointer hover:underline" onClick={() => navigateTo('search')}>{t.seeAllListings}</span>
        </div>
        {/* Responsive Grid: 2 columns on mobile, 3 on tablet, 4/5 on large desktops */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {listings.map(item => (
            <div key={item.id} onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col cursor-pointer hover:-translate-y-1 transition-transform">
              <div className="w-full aspect-square bg-slate-700 relative">
                <img src={item.image} alt={item.morph} className="w-full h-full object-cover" />
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white truncate leading-tight mb-0.5">{item.morph}</h4>
                  <p className="text-[11px] text-slate-400 italic truncate">{item.species}</p>
                  
                  {/* Clickable Seller Box Under The Animal */}
                  <div 
                    onClick={(e) => { e.stopPropagation(); navigateTo('breeder', item.breeder); }}
                    className="flex items-center mt-2.5 mb-1 text-[10px] text-slate-300 bg-slate-900/60 w-max px-2 py-1.5 rounded-lg border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800 transition-colors"
                  >
                    <Star size={10} fill="currentColor" className="text-yellow-400 mr-1"/>
                    <span className="font-bold mr-1.5 text-white">{item.rating}</span>
                    <span className="truncate max-w-[90px]">{item.breeder}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-700/60 text-emerald-400 font-black text-sm">
                  {item.price}
                  <span className="bg-slate-900 text-slate-300 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">{item.sex}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Search View (With Dropdowns)
function SearchView({ navigateTo, t }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20 md:pb-0">
      <div className="pt-8 px-5 pb-5 bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <h1 className="text-lg font-black text-white mb-4 flex items-center tracking-tight"><Sliders size={20} className="mr-2 text-emerald-400"/> {t.searchTitle}</h1>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-500" />
          <input type="text" placeholder={t.searchPlaceholder} className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar max-w-2xl mx-auto w-full">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.category}</label>
          <div className="relative">
            <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 appearance-none font-medium shadow-sm">
              {Object.keys(categoriesData).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.region}</label>
          <div className="relative">
            <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 appearance-none font-medium shadow-sm">
              {italianRegions.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="pt-4">
          <button onClick={() => navigateTo('home')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-transform tracking-wider">{t.showResults}</button>
        </div>
      </div>
    </div>
  );
}

// 3. Detail View
function ListingDetailView({ animal, navigateTo, t }) {
  if (!animal) return null;
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar max-w-3xl mx-auto w-full border-x border-slate-800/50">
      <div className="absolute w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-8">
        <button onClick={() => navigateTo('home')} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"><ChevronLeft size={24} /></button>
      </div>
      
      <div className="w-full h-80 md:h-[450px] bg-slate-800 relative shrink-0">
        <img src={animal.image} className="w-full h-full object-cover" alt={animal.morph} />
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
      
      <div className="px-5 pb-5 -mt-8 relative z-10">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-0.5 leading-tight">{animal.morph}</h1>
        <h2 className="text-emerald-400 text-sm md:text-base font-medium mb-4">{animal.species}</h2>
        
        <div onClick={() => navigateTo('breeder', animal.breeder)} className="flex items-center text-xs text-slate-300 mb-5 bg-slate-800 w-max px-3 py-2 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors shadow-sm">
           <Star size={14} fill="currentColor" className="text-yellow-400 mr-2"/>
           <span className="font-bold mr-2 text-white">{animal.rating}</span>
           <span className="opacity-90">({animal.reviews} reviews) • {animal.breeder}</span>
        </div>

        <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{animal.price}</span>
      </div>

      <div className="px-5 pb-6 grid grid-cols-2 gap-3 text-xs font-bold border-b border-slate-800">
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.sex}</span><span className="text-white text-sm">{animal.sex}</span></div>
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.origin}</span><span className="text-white text-sm">{animal.origin}</span></div>
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.weight}</span><span className="text-white text-sm">{animal.weight || "N/A"}</span></div>
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.location}</span><span className="text-white text-sm">{animal.location}</span></div>
      </div>

      <div className="p-6 border-b border-slate-800 text-sm">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{t.breederNotes}</h3>
        <p className="text-slate-300 leading-relaxed bg-slate-800/40 p-5 rounded-2xl">{animal.description}</p>
      </div>

      <div className="p-6 pb-28 md:pb-6">
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
        <button onClick={() => navigateTo('chat_thread', animal)} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm py-4 rounded-xl shadow-xl flex justify-center items-center active:scale-95 transition-transform"><MessageCircle size={20} className="mr-2"/> {t.contactSeller}</button>
      </div>
    </div>
  );
}

// 4. Breeder Profile
function BreederProfileView({ breederName, navigateTo, t }) {
  const breederListings = listings.filter(item => item.breeder === breederName);
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar pb-20 md:pb-0 max-w-5xl mx-auto w-full">
      <div className="pt-8 px-5 pb-6 bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <button onClick={() => navigateTo('home')} className="p-2 bg-slate-700 rounded-full text-white mb-4 hover:bg-slate-600 transition-colors"><ChevronLeft size={20} /></button>
        <h1 className="text-2xl font-black text-white flex items-center tracking-tight">{breederName} <ShieldCheck size={24} className="text-blue-400 ml-2" /></h1>
        <div className="flex items-center text-yellow-400 font-bold text-sm mt-3 bg-slate-900/50 w-max px-3 py-1.5 rounded-lg border border-slate-700">
           <Star size={14} fill="currentColor" className="mr-2"/> 4.9 <span className="text-slate-400 ml-2 font-medium underline">34 Reviews</span>
        </div>
      </div>
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
        {breederListings.map(item => (
          <div key={item.id} onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1 transition-transform shadow-lg">
            <img src={item.image} className="w-full aspect-square object-cover bg-slate-700" alt="" />
            <div className="p-3">
               <h4 className="font-bold text-sm text-white truncate">{item.morph}</h4>
               <span className="text-sm font-black text-emerald-400 mt-1 block">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Add Listing
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
             <select className="bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-slate-400 outline-none appearance-none shadow-inner"><option>{t.sex}</option><option>Maschio</option><option>Femmina</option><option>Coppia</option></select>
          </div>
        </div>
        <button onClick={() => setSuccess(true)} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl shadow-xl mt-6 active:scale-95 transition-transform tracking-wider">{t.publish}</button>
      </div>
    </div>
  );
}

// 6. Chat Hub
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
              <img src={chat.listing.image} className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md" alt="" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="font-bold text-sm text-white truncate">{chat.breeder}</h4>
                <span className="text-[10px] text-slate-500 font-bold">{chat.time}</span>
              </div>
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

// 7. Chat Thread
function ChatThreadView({ chatData, navigateTo, t }) {
  const getListing = (data) => (data && data.listing) ? data.listing : listings[0];
  const target = getListing(chatData);
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full border-x border-slate-800/50">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-20">
        <button onClick={() => navigateTo('chat')} className="p-2 mr-3 bg-slate-700 rounded-full text-white active:scale-90 transition-transform"><ChevronLeft size={20} /></button>
        <div className="flex-1"><h1 className="text-base font-black text-white">{target.breeder}</h1><p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t.onlineNow}</p></div>
      </div>
      <div className="bg-slate-950/90 backdrop-blur p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={target.image} className="w-11 h-11 rounded-lg object-cover border border-slate-700" alt="" />
          <div><h4 className="text-[11px] font-bold text-white leading-tight">{target.morph}</h4><p className="text-emerald-400 text-[11px] font-black">{target.price}</p></div>
        </div>
        <button onClick={() => navigateTo('cites_generator', target)} className="bg-blue-600 text-white font-bold text-[10px] py-2 px-3 rounded-xl flex items-center shadow-lg hover:bg-blue-500 active:scale-95 transition-all"><FileText size={14} className="mr-1.5" /> Modulo CITES</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        <div className="bg-slate-800 p-4 rounded-3xl rounded-tl-sm max-w-[85%] text-sm text-slate-200 shadow-sm">Salve! L'esemplare è disponibile?</div>
        <div className="bg-emerald-600 p-4 rounded-3xl rounded-tr-sm max-w-[85%] ml-auto text-sm text-white shadow-md">Sì! Se vuoi lo porto a Verona Reptiles o Hamm per il ritiro a mano!</div>
      </div>
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex space-x-2 pb-safe">
        <input type="text" placeholder={t.typeMessage} className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500" />
        <button className="bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform"><MessageCircle size={20}/></button>
      </div>
    </div>
  );
}

// 8. CITES / Animal ID Generator
function CitesGeneratorView({ animalData, navigateTo }) {
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
              <p className="leading-relaxed text-[12px]">Il sottoscritto Cedente <strong>{animalData.breeder}</strong> cede a <strong>{formData.nome} {formData.cognome}</strong> (C.F. {formData.cf.toUpperCase()}) l'esemplare nato in cattività di <strong>{animalData.species}</strong> morph <strong>{animalData.morph}</strong> ({animalData.origin}).</p>
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

// 9. Dashboard Hub
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
        <DashboardButton icon={<List />} label="Inventario Esemplari" onClick={() => navigateTo('inventory')} />
        <DashboardButton icon={<Grid />} label="Genetica & Pedigree" onClick={() => navigateTo('lineage')} badge="Pro" />
        <DashboardButton icon={<Star />} label="Le Mie Recensioni" onClick={() => navigateTo('reviews')} />
        
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

// Sub-Views for Dashboard
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

function LineageTrackerView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">Genetica & Pedigree</h1></div>
      <div className="p-4 space-y-3 flex-1 overflow-y-auto hide-scrollbar">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-4 flex items-center space-x-4 shadow-lg">
          <div className="w-16 h-16 bg-slate-700 rounded-2xl overflow-hidden shadow-inner shrink-0"><img src="https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt=""/></div>
          <div className="flex-1">
             <div className="flex items-center space-x-2"><span className="bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-blue-500/20">SIRE</span><span className="text-[10px] text-slate-500 font-bold">#G01</span></div>
             <h4 className="text-white font-black text-lg mt-1">Ghost</h4>
             <p className="text-xs text-slate-400 italic">Axanthic Lilly White</p>
          </div>
          <div className="text-center bg-slate-900 p-2.5 rounded-xl border border-slate-700/50"><span className="text-emerald-400 font-black text-xl">14</span><p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Offspring</p></div>
        </div>
      </div>
    </div>
  );
}

function ReviewManagerView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">Feed Recensioni</h1></div>
      <div className="p-4 space-y-4 flex-1 overflow-y-auto hide-scrollbar pb-24">
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-lg">
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-sm font-black text-white shadow-inner">MR</div><h4 className="font-bold text-sm text-white">Marco Rossi</h4></div>
             <div className="flex text-yellow-400"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
           </div>
           <p className="text-sm text-slate-300 leading-relaxed italic font-medium">"Allevatore serissimo, animale in forma perfetta e documentazione CITES Allegato B compilata a regola d'arte. Consigliatissimo!"</p>
           <span className="text-[9px] text-slate-500 mt-5 block font-bold uppercase tracking-widest text-right">Settembre 2026</span>
        </div>
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
