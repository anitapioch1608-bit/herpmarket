import React, { useState } from 'react';
import { 
  Home, Search, PlusCircle, MessageCircle, User, 
  ChevronRight, ChevronLeft, ShieldCheck, MapPin, 
  Star, Calendar, Sliders, Filter, FileText, CheckCircle,
  Folder, Truck, Info, Settings, List, Grid, Camera
} from 'lucide-react';

// --- MOCK DATA ---
const listings = [
  {
    id: 1, species: "Correlophus ciliatus", morph: "Red Harlequin Pinstripe", price: "€150",
    image: "https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=800", location: "Torino", fiera: "Squamata Expo", breeder: "Piedmont Geckos",
    verified: true, sex: "Maschio", origin: "CB 2024", weight: "35g",
    description: "Bellissimo esemplare, mangia Pangea e grilli regolarmente. Perfetto per riproduzione.", breederFocus: "Crested Geckos", category: "Gechi (Geckos)"
  },
  {
    id: 2, species: "Furcifer pardalis", morph: "Ambilobe Blue Bar", price: "€280",
    image: "https://images.unsplash.com/photo-1580526149844-31f1a5f6ed49?auto=format&fit=crop&q=80&w=800", location: "Milano", fiera: "Verona Reptiles", breeder: "ExoBreed IT",
    verified: true, sex: "Maschio", origin: "CB 2025", weight: "80g",
    description: "Colori spettacolari. Documento CITES All. B incluso.", breederFocus: "Camaleonti (Pardalis, Calyptratus)", category: "Camaleonti (Chameleons)"
  },
  {
    id: 3, species: "Gekko gecko", morph: "Normal CB", price: "€90",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800", location: "Roma", fiera: null, breeder: "Serpenti Roma",
    verified: false, sex: "Femmina", origin: "CB 2023", weight: "75g",
    description: "Nata in cattività, molto docile per essere un Tokay. Abituata al maneggio.", breederFocus: "Gechi asiatici", category: "Gechi (Geckos)"
  },
  {
    id: 4, species: "Eublepharis macularius", morph: "Normal / Wild Type", price: "€45",
    image: "https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=800", location: "Napoli", fiera: "Esotika Pet Show", breeder: "LeoMorphs Campania",
    verified: true, sex: "Unsexed", origin: "CB 2026", weight: "15g",
    description: "Mangia tarme della farina regolarmente. Ottimo primo rettile.", breederFocus: "Leopard Geckos", category: "Gechi (Geckos)"
  },
  {
    id: 5, species: "Phelsuma grandis", morph: "High Red", price: "€110",
    image: "https://images.unsplash.com/photo-1596796985794-6887cb024dd8?auto=format&fit=crop&q=80&w=800", location: "Firenze", fiera: null, breeder: "Phelsuma Italia",
    verified: true, sex: "Femmina", origin: "CB 2024", weight: "40g",
    description: "In salute, colori molto accesi. Doc. CITES All. B pronto per la cessione.", breederFocus: "Phelsuma e Gechi Diurni", category: "Gechi (Geckos)"
  },
  {
    id: 6, species: "Pogona henrylawsoni", morph: "Normal", price: "€180",
    image: "https://images.unsplash.com/photo-1542228601-51208034b7a1?auto=format&fit=crop&q=80&w=800", location: "Bologna", fiera: "Squamata Expo", breeder: "DragoMania",
    verified: false, sex: "Coppia", origin: "CB 2026", weight: "10g",
    description: "Piccoli di drago di Rankin, ottimi mangiatori. Prezzo per la coppia.", breederFocus: "Pogona vitticeps, henrylawsoni", category: "Sauri & Varani (Lizards & Monitors)"
  },
  {
    id: 7, species: "Tiliqua scincoides", morph: "Irian Jaya", price: "€250",
    image: "https://images.unsplash.com/photo-1506555191898-bea76022e379?auto=format&fit=crop&q=80&w=800", location: "Genova", fiera: "Verona Reptiles", breeder: "SkinkHaven",
    verified: true, sex: "Unsexed", origin: "CB 2025", weight: "300g",
    description: "Scinco dalla lingua blu, mangia di tutto. Molto tranquillo e facile da gestire.", breederFocus: "Scinchi e Varani", category: "Sauri & Varani (Lizards & Monitors)"
  },
  {
    id: 8, species: "Chamaeleo calyptratus", morph: "High Yellow", price: "€80",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800", location: "Verona", fiera: "Verona Reptiles", breeder: "Veneto Chams",
    verified: true, sex: "Femmina", origin: "CB 2025", weight: "65g",
    description: "Femmina subadulta, colori molto brillanti. CITES B.", breederFocus: "Camaleonti", category: "Camaleonti (Chameleons)"
  },
  {
    id: 9, species: "Furcifer pardalis", morph: "Red Sambava", price: "€300",
    image: "https://images.unsplash.com/photo-1531384370597-8590413fe247?auto=format&fit=crop&q=80&w=800", location: "Padova", fiera: null, breeder: "Colori del Madagascar",
    verified: true, sex: "Maschio", origin: "CB 2024", weight: "95g",
    description: "Maschio adulto. Colori incredibili. CITES B.", breederFocus: "Panther Chameleons", category: "Camaleonti (Chameleons)"
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
  "Gechi (Geckos)": ["Correlophus ciliatus", "Eublepharis macularius", "Gekko gecko", "Phelsuma grandis", "Rhacodactylus auriculatus"],
  "Camaleonti (Chameleons)": ["Furcifer pardalis", "Chamaeleo calyptratus", "Trioceros jacksonii"],
  "Sauri & Varani (Lizards & Monitors)": ["Pogona vitticeps", "Pogona henrylawsoni", "Tiliqua scincoides", "Varanus exanthematicus"],
  "Serpenti (Snakes)": ["Pantherophis guttatus", "Python regius", "Heterodon nasicus"]
};

const italianRegions = ["Tutta Italia", "Piemonte", "Lombardia", "Veneto", "Emilia-Romagna", "Toscana", "Lazio", "Campania", "Sicilia"];

// --- MAIN APP ROUTER ---
export default function HerpMarketPWA() {
  const [currentView, setCurrentView] = useState('home');
  const [viewData, setViewData] = useState(null);

  const navigateTo = (view, data = null) => {
    setCurrentView(view);
    if (data) setViewData(data);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView navigateTo={navigateTo} />;
      case 'search': return <SearchView navigateTo={navigateTo} />;
      case 'detail': return <ListingDetailView animal={viewData} navigateTo={navigateTo} />;
      case 'breeder': return <BreederProfileView breederName={viewData} navigateTo={navigateTo} />;
      case 'add': return <AddListingView navigateTo={navigateTo} />;
      case 'chat': return <ChatHubView navigateTo={navigateTo} />;
      case 'chat_thread': return <ChatThreadView chatData={viewData} navigateTo={navigateTo} />;
      case 'cites_generator': return <CitesGeneratorView animalData={viewData} navigateTo={navigateTo} />;
      case 'profile': return <DashboardHubView navigateTo={navigateTo} />;
      case 'inventory': return <InventoryManagerView navigateTo={navigateTo} />;
      case 'documents': return <DocumentArchiveView navigateTo={navigateTo} />;
      case 'transport': return <TransportBoardView navigateTo={navigateTo} />;
      case 'expo_hub': return <ExpoHubView expoData={viewData} navigateTo={navigateTo} />;
      case 'lineage': return <LineageTrackerView navigateTo={navigateTo} />;
      case 'reviews': return <ReviewManagerView navigateTo={navigateTo} />;
      case 'settings': return <SettingsView navigateTo={navigateTo} />;
      case 'legal': return <LegalGuideView navigateTo={navigateTo} />;
      default: return <HomeView navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 font-sans text-slate-100 antialiased select-none">
      <div className="w-full max-w-md h-[844px] bg-slate-900 shadow-2xl relative flex flex-col overflow-hidden border border-slate-800">
        
        {/* Active View Container */}
        <div className="flex-1 h-full relative overflow-hidden flex flex-col">
          {renderView()}
        </div>

        {/* Global Navigation Bar */}
        <nav className="absolute bottom-0 w-full bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex justify-around py-3 z-30 pb-safe">
          <NavButton icon={<Home size={22} />} active={currentView === 'home'} label="Home" onClick={() => navigateTo('home')} />
          <NavButton icon={<Search size={22} />} active={currentView === 'search'} label="Cerca" onClick={() => navigateTo('search')} />
          <NavButton icon={<PlusCircle size={26} className="text-emerald-400" />} active={currentView === 'add'} label="Vendi" onClick={() => navigateTo('add')} />
          <NavButton icon={<MessageCircle size={22} />} active={currentView === 'chat' || currentView === 'chat_thread'} label="Chat" onClick={() => navigateTo('chat')} />
          <NavButton icon={<User size={22} />} active={['profile', 'inventory', 'documents', 'transport', 'lineage', 'reviews', 'settings', 'legal'].includes(currentView)} label="Profilo" onClick={() => navigateTo('profile')} />
        </nav>

      </div>
    </div>
  );
}

function NavButton({ icon, active, label, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center space-y-0.5 text-center transition-colors">
      <div className={active ? "text-emerald-400 scale-105 transition-transform" : "text-slate-500 hover:text-slate-300"}>{icon}</div>
      <span className={`text-[10px] font-medium ${active ? "text-emerald-400" : "text-slate-500"}`}>{label}</span>
    </button>
  );
}

// 1. Discovery Feed Home
function HomeView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20 overflow-y-auto no-scrollbar">
      <div className="pt-8 px-4 pb-4 bg-slate-800/50 border-b border-slate-800 sticky top-0 backdrop-blur-md z-10 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">HERP<span className="text-emerald-400">MARKET</span></h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Il marketplace rettili in Italia</p>
        </div>
        <div className="bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 text-emerald-400 text-xs font-bold">IT</div>
      </div>

      {/* Expo Horizontal Scroll */}
      <div className="p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Fiere in Arrivo</h3>
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
          {expos.map(expo => (
            <div key={expo.id} onClick={() => navigateTo('expo_hub', expo)} className={`flex-shrink-0 ${expo.color} p-3.5 rounded-xl w-36 shadow-lg cursor-pointer transform active:scale-95 transition-transform`}>
              <Calendar size={16} className="text-white/80 mb-2" />
              <h4 className="font-bold text-xs text-white truncate">{expo.name}</h4>
              <p className="text-[10px] text-white/90 font-medium mt-0.5">{expo.location}</p>
              <span className="text-[9px] bg-black/20 text-white font-bold px-1.5 py-0.5 rounded mt-2 inline-block">{expo.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Listing Grid */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ultimi Annunci</h3>
          <span className="text-xs text-emerald-400 font-medium cursor-pointer" onClick={() => navigateTo('search')}>Vedi tutti</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {listings.map(item => (
            <div key={item.id} onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700/60 rounded-xl overflow-hidden shadow-md active:scale-[0.98] transition-all flex flex-col cursor-pointer">
              <div className="w-full h-32 bg-slate-700 relative">
                <img src={item.image} alt={item.morph} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400 border border-emerald-500/20">{item.price}</div>
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white truncate leading-tight">{item.morph}</h4>
                  <p className="text-[10px] text-slate-400 italic mt-0.5 truncate">{item.species}</p>
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-700/50 text-[9px] text-slate-400">
                  <span className="truncate flex items-center font-medium"><MapPin size={10} className="mr-0.5 text-slate-500"/>{item.location}</span>
                  <span className="font-bold px-1 bg-slate-700 rounded text-slate-300">{item.sex}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Advanced Search Filter View
function SearchView({ navigateTo }) {
  const [selectedCat, setSelectedCat] = useState("Gechi (Geckos)");
  const [selectedRegion, setSelectedRegion] = useState("Tutta Italia");

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20">
      <div className="pt-8 px-4 pb-4 bg-slate-800 border-b border-slate-700">
        <h1 className="text-lg font-bold text-white mb-3 flex items-center"><Sliders size={18} className="mr-2 text-emerald-400"/> Ricerca Avanzata</h1>
        <div className="relative">
          <input type="text" placeholder="Cerca morph o specie (es. Lilly White...)" className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors" />
          <Search size={18} className="absolute right-3 top-3.5 text-slate-500" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Categoria Principale</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(categoriesData).map(cat => (
              <button key={cat} onClick={() => setSelectedCat(cat)} className={`py-2.5 px-3 rounded-xl border text-left text-xs font-bold transition-all ${selectedCat === cat ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-md' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Specie Specifica</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none appearance-none cursor-pointer focus:border-emerald-500">
            {categoriesData[selectedCat].map(sp => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Località (Regione)</label>
          <div className="flex flex-wrap gap-1.5">
            {italianRegions.map(reg => (
              <button key={reg} onClick={() => setSelectedRegion(reg)} className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${selectedRegion === reg ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-750'}`}>{reg}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button onClick={() => navigateTo('home')} className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-transform text-white font-bold py-3.5 rounded-xl shadow-lg flex justify-center items-center"><Filter size={18} className="mr-2"/> Mostra Risultati</button>
      </div>
    </div>
  );
}

// 4. Listing Detail
function ListingDetailView({ animal, navigateTo }) {
  if (!animal) return null;
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto no-scrollbar pb-20">
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent pb-safe">
        <button onClick={() => navigateTo('home')} className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white"><ChevronLeft size={24} /></button>
      </div>
      <div className="w-full h-80 bg-slate-800 relative flex-shrink-0"><img src={animal.image} alt={animal.species} className="w-full h-full object-cover" /></div>
      <div className="p-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white mb-1">{animal.morph}</h1>
        <h2 className="text-emerald-400 italic font-medium mb-3">{animal.species}</h2>
        <span className="text-3xl font-black">{animal.price}</span>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3 border-b border-slate-800">
        <div className="bg-slate-800 p-3 rounded-lg flex flex-col"><span className="text-[10px] text-slate-400 uppercase">Origine</span><span className="text-sm font-bold text-slate-200">{animal.origin}</span></div>
        <div className="bg-slate-800 p-3 rounded-lg flex flex-col"><span className="text-[10px] text-slate-400 uppercase">Sesso</span><span className="text-sm font-bold text-slate-200">{animal.sex}</span></div>
        <div className="bg-slate-800 p-3 rounded-lg flex flex-col"><span className="text-[10px] text-slate-400 uppercase">Peso</span><span className="text-sm font-bold text-slate-200">{animal.weight || "N/A"}</span></div>
        <div className="bg-slate-800 p-3 rounded-lg flex flex-col"><span className="text-[10px] text-slate-400 uppercase">Località</span><span className="text-sm font-bold text-slate-200 flex items-center"><MapPin size={12} className="mr-1 text-emerald-400"/> {animal.location}</span></div>
      </div>
      
      <div className="p-5 border-b border-slate-800">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Note dell'allevatore</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {animal.description || "Nessuna descrizione aggiuntiva fornita."}
        </p>
      </div>

      <div className="p-5 border-b border-slate-800">
        <div onClick={() => navigateTo('breeder', animal.breeder)} className="bg-slate-800 rounded-xl p-4 flex items-start space-x-4 cursor-pointer active:scale-95 transition-transform hover:border-emerald-500/50 border border-transparent">
          <div className="flex-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Venditore</span>
            <span className="font-bold text-lg text-white flex items-center">{animal.breeder} {animal.verified && <ShieldCheck size={16} className="text-blue-400 ml-2" />}</span>
            <span className="text-xs text-slate-400 mt-1 block hover:text-emerald-400">Vedi Profilo &amp; Allevamento -{'>'}</span>
          </div>
        </div>
      </div>
      <div className="p-4 absolute bottom-0 w-full bg-slate-900 border-t border-slate-800">
        <button onClick={() => navigateTo('chat_thread', animal)} className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-transform text-white font-bold py-3.5 rounded-xl shadow-lg flex justify-center items-center"><MessageCircle size={20} className="mr-2"/> Contatta Venditore</button>
      </div>
    </div>
  );
}

// 5. Breeder Profile
function BreederProfileView({ breederName, navigateTo }) {
  const breederListings = listings.filter(item => item.breeder === breederName);
  const focus = breederListings[0]?.breederFocus || "Rettili ed Esotici";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20 overflow-y-auto no-scrollbar">
      <div className="pt-8 px-4 pb-6 bg-slate-800 border-b border-slate-700 relative">
        <button onClick={() => navigateTo('home')} className="p-1.5 bg-slate-700 rounded-full text-white mb-4"><ChevronLeft size={20} /></button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center">{breederName} <ShieldCheck size={18} className="text-blue-400 ml-1.5" /></h1>
            <p className="text-xs text-emerald-400 font-medium mt-1">Specializzazione: {focus}</p>
          </div>
          <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-700 text-center">
            <div className="flex items-center text-yellow-400 font-bold text-sm"><Star size={14} fill="currentColor" className="mr-1"/> 4.9</div>
            <span className="text-[9px] text-slate-400 uppercase block mt-0.5">24 recensioni</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Animali Disponibili ({breederListings.length})</h3>
        <div className="grid grid-cols-2 gap-3">
          {breederListings.map(item => (
            <div key={item.id} onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-md flex flex-col cursor-pointer">
              <div className="w-full h-28 bg-slate-700"><img src={item.image} alt={item.morph} className="w-full h-full object-cover" /></div>
              <div className="p-2">
                <h4 className="font-bold text-xs text-white truncate">{item.morph}</h4>
                <span className="text-xs font-black text-emerald-400 mt-1 block">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. Fast Listing Placement View
function AddListingView({ navigateTo }) {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 text-center">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-4"><CheckCircle size={36} /></div>
        <h2 className="text-xl font-bold text-white mb-2">Annuncio Pubblicato!</h2>
        <p className="text-sm text-slate-400 max-w-[280px] mb-6">Il tuo animale è ora visibile sul feed principale e rintracciabile tramite i filtri di ricerca.</p>
        <button onClick={() => { setSuccess(false); navigateTo('home'); }} className="w-full max-w-[200px] bg-emerald-500 text-white font-bold py-3 rounded-xl">Torna alla Home</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20">
      <div className="pt-8 px-4 pb-4 bg-slate-800 border-b border-slate-700">
        <h1 className="text-lg font-bold text-white">Nuovo Annuncio</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div className="border-2 border-dashed border-slate-700 rounded-xl py-6 text-center bg-slate-800/40 hover:border-emerald-500 cursor-pointer transition-colors flex flex-col items-center justify-center">
          <Camera size={24} className="text-slate-500 mb-2" />
          <span className="text-xs font-bold text-slate-300">Carica Foto Animale</span>
          <span className="text-[10px] text-slate-500 mt-0.5">JPEG o PNG fino a 10MB</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Specie (es. Correlophus...)" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
          <input type="text" placeholder="Morph / Genetica" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-slate-400 outline-none">
            <option>Sesso: Unsexed</option><option>Maschio</option><option>Femmina</option><option>Coppia</option>
          </select>
          <input type="text" placeholder="Prezzo (€)" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Peso (es. 25g)" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
          <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-slate-400 outline-none">
            <option disabled>Ritiro in Fiera</option><option>Nessuna (Solo Spedizione / Consegna a mano)</option>{expos.map(e => <option key={e.id}>{e.name}</option>)}
          </select>
        </div>
      </div>

      <div className="p-4 bg-slate-900/50">
        <button onClick={() => setSuccess(true)} className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-transform text-white font-bold py-3.5 rounded-xl shadow-lg">Pubblica Annuncio</button>
      </div>
    </div>
  );
}

// 8. Chat Hub Engine
function ChatHubView({ navigateTo }) {
  const activeChats = [
    { id: 1, breeder: "Piedmont Geckos", lastMessage: "Perfetto, ci vediamo allo stand Squamata per il ritiro!", unread: true, listing: listings[0] },
    { id: 2, breeder: "ExoBreed IT", lastMessage: "Hai già preparato il modulo CITES compilato?", unread: false, listing: listings[1] }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20">
      <div className="pt-8 px-4 pb-4 bg-slate-800 border-b border-slate-700">
        <h1 className="text-lg font-bold text-white">I Tuoi Messaggi</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-800/60">
        {activeChats.map(chat => (
          <div key={chat.id} onClick={() => navigateTo('chat_thread', chat)} className="p-3 flex items-center space-x-3 cursor-pointer hover:bg-slate-800/40 rounded-xl transition-colors active:scale-[0.99]">
            <img src={chat.listing.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-sm text-white truncate">{chat.breeder}</h4>
                {chat.unread && <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>}
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5">{chat.lastMessage}</p>
              <span className="text-[9px] text-slate-500 mt-1 block font-semibold">{chat.listing.morph}</span>
            </div>
            <ChevronRight size={16} className="text-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. Real-time Structured Chat Engine
function ChatThreadView({ chatData, navigateTo }) {
  const getListingInfo = (data) => {
    if (!data) return listings[0];
    return data.listing ? data.listing : data;
  };
  
  const targetListing = getListingInfo(chatData);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 z-10 sticky top-0">
        <button onClick={() => navigateTo('chat')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <h1 className="text-sm font-bold text-white">{targetListing.breeder}</h1>
          <span className="text-[10px] text-emerald-400 font-medium">Risponde di solito entro 1 ora</span>
        </div>
      </div>

      {/* Embedded Action Bar for Escrow/CITES */}
      <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={targetListing.image} className="w-10 h-10 rounded-md object-cover" alt="" />
          <div>
            <h4 className="text-xs font-bold text-white truncate max-w-[150px]">{targetListing.morph}</h4>
            <p className="text-[10px] text-emerald-400 font-bold">{targetListing.price}</p>
          </div>
        </div>
        <button onClick={() => navigateTo('cites_generator', targetListing)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs py-2 px-3 rounded-lg shadow flex items-center transition-all active:scale-95">
          <FileText size={14} className="mr-1.5" /> Modulo CITES
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        <div className="bg-slate-800 p-3 rounded-xl max-w-[80%] text-sm text-slate-200">Salve! L'esemplare è ancora disponibile?</div>
        <div className="bg-emerald-600 p-3 rounded-xl max-w-[80%] ml-auto text-sm text-white">Sì, calcola che lo porto anche alla prossima fiera se vuoi ritirarlo di persona!</div>
      </div>

      <div className="absolute bottom-0 w-full p-3 bg-slate-900 border-t border-slate-800 pb-safe flex space-x-2">
        <input type="text" placeholder="Scrivi un messaggio..." className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none" />
        <button className="bg-emerald-500 text-white p-3 rounded-xl"><MessageCircle size={20}/></button>
      </div>
    </div>
  );
}

// 7 & 18. Dashboard Hub
function DashboardHubView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20">
      <div className="pt-8 px-5 pb-6 border-b border-slate-800 bg-slate-800">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">TU</div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center">Il Tuo Account <ShieldCheck size={16} className="ml-2 text-slate-500"/></h1>
            <p className="text-sm text-slate-400">Allevatore Non Verificato</p>
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-3 flex-1 overflow-y-auto no-scrollbar">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gestione Allevamento</h3>
        <DashboardButton icon={<List />} label="Gestione Inventario" onClick={() => navigateTo('inventory')} />
        <DashboardButton icon={<Grid />} label="Genetica & Pedigree" onClick={() => navigateTo('lineage')} badge="Pro" />
        <DashboardButton icon={<Star />} label="Le Mie Recensioni" onClick={() => navigateTo('reviews')} />
        
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6">Burocrazia & Logistica</h3>
        <DashboardButton icon={<FileText />} label="Archivio Documenti (CITES)" onClick={() => navigateTo('documents')} badge="Nuovo" />
        <DashboardButton icon={<Truck />} label="Bacheca Eco-Taxi" onClick={() => navigateTo('transport')} />
        <DashboardButton icon={<Info />} label="Normative & CITES Guide" onClick={() => navigateTo('legal')} />
        
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6">Account</h3>
        <DashboardButton icon={<Settings />} label="Impostazioni Profilo" onClick={() => navigateTo('settings')} />
      </div>
    </div>
  );
}

function DashboardButton({ icon, label, onClick, badge }) {
  return (
    <button onClick={onClick} className="w-full bg-slate-850 hover:bg-slate-800 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between text-left transition-all active:scale-[0.99]">
      <div className="flex items-center space-x-3.5 text-slate-200">
        <div className="text-emerald-400">{icon}</div>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {badge && <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase px-2 py-0.5 rounded">{badge}</span>}
        <ChevronRight size={16} className="text-slate-600" />
      </div>
    </button>
  );
}

// 12. Breeder Inventory Management View
function InventoryManagerView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">Gestione Inventario</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-700 rounded-lg"></div>
          <div className="flex-1"><h4 className="text-sm font-bold text-white">Esemplare #01A</h4><p className="text-xs text-slate-400">Crested Gecko - In Vendita</p></div>
          <span className="text-xs font-bold text-emerald-400">€120</span>
        </div>
      </div>
    </div>
  );
}

// 14. Document Archive View
function DocumentArchiveView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">Archivio Documenti</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="text-blue-400" size={24} />
            <div><h4 className="text-sm font-bold text-white">CITES_Ciliatus_2026.pdf</h4><p className="text-[10px] text-slate-400">Generato il 14/05/2026</p></div>
          </div>
          <Folder className="text-slate-500" size={18} />
        </div>
      </div>
    </div>
  );
}

// 16. Certified Transport Board View
function TransportBoardView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">Bacheca Eco-Taxi</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        <div className="bg-gradient-to-r from-emerald-950 to-slate-800 border border-emerald-500/30 p-4 rounded-xl">
          <div className="flex justify-between items-start">
            <span className="bg-emerald-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded">Corriere Autorizzato ASL</span>
            <span className="text-xs font-bold text-emerald-400">Tratta Attiva</span>
          </div>
          <h3 className="font-bold text-white text-base mt-2">Milano -{'>'} Bologna -{'>'} Roma</h3>
          <p className="text-xs text-slate-400 mt-1">Partenza programmata: 20 Giugno 2026</p>
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex justify-between items-center text-xs text-slate-300">
            <span>Prezzo stimato: €45 / box</span>
            <button className="bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-lg text-[11px]">Prenota Spazio</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 17. Live Reptile Expo Center View
function ExpoHubView({ expoData, navigateTo }) {
  if (!expoData) return null;
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800">
        <button onClick={() => navigateTo('home')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">{expoData.name}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-20">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Info Evento</h3>
          <p className="text-sm text-slate-200"><strong>Data:</strong> {expoData.date}</p>
          <p className="text-sm text-slate-200 mt-1"><strong>Luogo:</strong> {expoData.location}</p>
        </div>
        <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">Mostra ai tuoi amici o acquirenti questo hub. I buyer possono ordinare direttamente sull'app e selezionare "{expoData.name}" come punto di ritiro a mano esentasse da spedizione!</p>
        </div>
      </div>
    </div>
  );
}

// --- NEW COMPONENT: CITES Document Generator ---
function CitesGeneratorView({ animalData, navigateTo }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nome: '', cognome: '', indirizzo: '', citta: '', codiceFiscale: '', documento: '' });

  const isCitesRequired = animalData?.category !== "Gechi (Geckos)"; 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setStep(2);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10">
        <button onClick={() => navigateTo('chat_thread', animalData)} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">Generatore Documenti</h1>
          <span className="text-[10px] text-emerald-400">{isCitesRequired ? "Modulo Ufficiale CITES" : "Animal ID & Origine"}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {step === 1 ? (
          <div className="p-5 space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-start space-x-4">
              <img src={animalData.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
              <div>
                <h3 className="font-bold text-sm text-white">{animalData.species}</h3>
                <p className="text-xs text-slate-400 mt-1">{animalData.morph}</p>
                <div className={`mt-2 inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border ${isCitesRequired ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                  {isCitesRequired ? "Richiede CITES All. B" : "Certificato Origine (Animal ID)"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">I Tuoi Dati (Acquirente)</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isCitesRequired 
                  ? "Questi dati verranno utilizzati esclusivamente per compilare il documento legale di cessione come richiesto dalla normativa italiana." 
                  : "Questi dati verranno utilizzati per creare il certificato di proprietà e origine dell'animale (Herkunftsnachweis)."}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
                <input type="text" name="cognome" placeholder="Cognome" value={formData.cognome} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
              </div>
              <input type="text" name="indirizzo" placeholder="Indirizzo di residenza" value={formData.indirizzo} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="citta" placeholder="Città" value={formData.citta} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" />
                <input type="text" name="codiceFiscale" placeholder="Codice Fiscale" value={formData.codiceFiscale} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none uppercase" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 flex flex-col items-center">
            <CheckCircle size={48} className="text-emerald-500 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Documento Generato!</h2>
            <p className="text-sm text-slate-400 text-center mb-6">Il documento è pronto. Una copia è stata inviata al venditore e salvata nel tuo Archivio.</p>

            <div className="w-full bg-white rounded-lg p-5 shadow-2xl relative overflow-hidden text-slate-800 font-serif">
              <div className="border-b-2 border-slate-800 pb-3 mb-3 text-center">
                <h3 className="font-bold text-[11px] uppercase text-emerald-800">{isCitesRequired ? "DICHIARAZIONE DI CESSIONE AI FINI CITES" : "CERTIFICATO DI ORIGINE E CESSIONE (ANIMAL ID)"}</h3>
                <p className="text-[8px] mt-1 text-slate-500">{isCitesRequired ? "(Ai sensi del Reg. CE 338/97 e successive modifiche)" : "(Attestato di nascita in cattività e lecita provenienza)"}</p>
              </div>

              <div className="space-y-4 text-[10px]">
                <div>
                  <span className="font-bold">Il sottoscritto (Allevatore / Cedente):</span>
                  <p className="border-b border-dashed border-slate-400 mt-1 pb-1">{animalData.breeder} (Dati in archivio)</p>
                </div>
                <div>
                  <span className="font-bold">Dichiara di cedere a (Acquirente):</span>
                  <p className="border-b border-dashed border-slate-400 mt-1 pb-1">{formData.nome} {formData.cognome} nato a {formData.citta}, C.F. {formData.codiceFiscale.toUpperCase()}</p>
                </div>
                <div>
                  <span className="font-bold">Il seguente esemplare nato in cattività:</span>
                  <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-3 rounded border border-slate-300">
                    <div className="col-span-2 border-b border-slate-200 pb-1"><span className="text-slate-500">Specie:</span> <span className="italic font-bold">{animalData.species}</span></div>
                    <div className="col-span-2 border-b border-slate-200 pb-1"><span className="text-slate-500">Morph:</span> <span>{animalData.morph}</span></div>
                    <div><span className="text-slate-500">Sesso:</span> {animalData.sex}</div>
                    <div><span className="text-slate-500">Nascita:</span> {animalData.origin}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-slate-900 border-t border-slate-800 pb-safe">
        {step === 1 ? (
          <button onClick={handleGenerate} disabled={!formData.nome || !formData.cognome || !formData.codiceFiscale} className="w-full bg-emerald-500 disabled:bg-slate-700 text-white font-bold py-3.5 rounded-xl flex justify-center items-center"><FileText size={18} className="mr-2" /> Genera Documento PDF</button>
        ) : (
          <div className="flex space-x-3">
            <button onClick={() => navigateTo('documents')} className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-xl">Vai all'Archivio</button>
            <button onClick={() => navigateTo('chat')} className="flex-1 bg-emerald-500 text-white font-bold py-3.5 rounded-xl">Torna in Chat</button>
          </div>
        )}
      </div>
    </div>
  );
}

// 10. Lineage Tracker View
function LineageTrackerView({ navigateTo }) {
  const breeders = [
    { id: "M01", type: "Sire", name: "Ghost", species: "Correlophus ciliatus", morph: "Axanthic Lilly White", image: "https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=800", offspringCount: 14 },
    { id: "F03", type: "Dam", name: "Ruby", species: "Correlophus ciliatus", morph: "Red Harlequin", image: "https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=800", offspringCount: 8 }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">Lineage &amp; Pedigree</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 no-scrollbar">
        {breeders.map(b => (
          <div key={b.id} className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex items-center space-x-3">
            <img src={b.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
            <div className="flex-1">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${b.type === 'Sire' ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'}`}>{b.type}</span>
              <h4 className="font-bold text-white text-sm mt-1">{b.name}</h4>
              <p className="text-xs text-slate-400">{b.morph}</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">{b.offspringCount} Figli</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- NEW COMPONENT: Review Manager ---
function ReviewManagerView({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('ricevute');

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">Le Mie Recensioni</h1>
      </div>

      <div className="flex border-b border-slate-800 bg-slate-900">
        <button onClick={() => setActiveTab('ricevute')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'ricevute' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400'}`}>Ricevute (4)</button>
        <button onClick={() => setActiveTab('lasciate')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'lasciate' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400'}`}>Lasciate ai Buyer</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {activeTab === 'ricevute' ? (
          <>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <div><span className="text-sm font-bold text-white">Marco Rossi</span><span className="text-[10px] text-slate-400 block">Acquirente - 12 Set 2026</span></div>
                <div className="flex text-yellow-400"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
              </div>
              <p className="text-sm text-slate-300">Animale perfetto e sanissimo, ritirato ad Esotika Arezzo. Venditore super disponibile!</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center pt-10">
            <Star size={48} className="text-slate-700 mb-4" />
            <h3 className="text-white font-bold mb-2">Nessuna recensione lasciata</h3>
            <p className="text-slate-400 text-sm text-center max-w-[250px] mb-6">Valutare gli acquirenti aiuta la community a isolare perditempo e truffatori.</p>
            <button className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg text-xs">Valuta un Acquirente</button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- NEW COMPONENT: Profile Settings & Verification ---
function SettingsView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">Impostazioni &amp; Verifica</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24 no-scrollbar">
        <div className="bg-gradient-to-r from-slate-800 to-slate-800 border border-emerald-500/30 p-5 rounded-xl relative overflow-hidden">
          <h2 className="text-lg font-bold text-white mb-1 flex items-center">Diventa Verificato <ShieldCheck size={18} className="ml-2 text-blue-400"/></h2>
          <p className="text-xs text-slate-300 mb-4 max-w-[85%]">Aumenta la fiducia degli acquirenti. Carica una Partita IVA o ID per ottenere la spunta blu.</p>
          <button className="bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-lg">Avvia Verifica (KYC)</button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Dati Pubblici Allevamento</h3>
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center border-2 border-dashed border-slate-500 text-slate-400"><Camera size={20}/></div>
            <button className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">Cambia Logo</button>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="Nome Allevamento" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none" defaultValue="Il Tuo Account" />
            <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none">
              {italianRegions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-slate-900 border-t border-slate-800 pb-safe">
        <button className="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-xl">Salva Modifiche</button>
      </div>
    </div>
  );
}

// --- NEW COMPONENT: Legal & CITES Guide ---
function LegalGuideView({ navigateTo }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-2 bg-slate-700 rounded-full text-white"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold text-white">Normative &amp; Guide CITES</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-20 no-scrollbar">
        <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
          <p className="text-xs text-orange-200 leading-relaxed">
            <strong>Attenzione:</strong> Le normative italiane sulla detenzione di animali esotici (D.Lgs 135/2022) sono in continuo aggiornamento. Assicurati sempre di essere in regola.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-4 bg-slate-700/50 border-b border-slate-700 font-bold text-white flex items-center"><FileText size={18} className="mr-2 text-emerald-400"/> Guida: Allegato A vs B</div>
          <div className="p-4 text-sm text-slate-300 space-y-2">
            <p><strong>Allegato A (es. Testudo hermanni):</strong> Richiede certificato giallo fotografico unico.</p>
            <p><strong>Allegato B (es. Camaleonte, Pitone):</strong> Richiede la Dichiarazione di Cessione ai fini CITES firmata dalle parti.</p>
          </div>
        </div>
        
        <button className="w-full text-center text-sm font-bold text-emerald-400 py-4 mt-2 hover:bg-slate-800 rounded-xl">
          Leggi i Termini di Servizio Completi -{'>'}
        </button>
      </div>
    </div>
  )}