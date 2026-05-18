import React, { useState, useEffect } from 'react';
import { 
  Home, Search, PlusCircle, MessageCircle, User, 
  ChevronRight, ChevronLeft, ShieldCheck, MapPin, 
  Star, Calendar, Sliders, Filter, FileText, CheckCircle,
  Folder, Truck, Info, Settings, List, Grid, Camera, Clipboard, 
  MoreHorizontal, Lock, Heart, ShieldAlert, CreditCard, Calculator, Clock, ChevronDown, ExternalLink, Languages
} from 'lucide-react';

// --- TRANSLATION DICTIONARY ---
const translations = {
  it: {
    appSub: "Il marketplace rettili in Europa",
    appDesc: "Unisciti alla community. Depositi sicuri per le fiere e generatore CITES automatico integrato.",
    joinCommunity: "Unisciti alla Community",
    browseExpos: "Esplora Fiere",
    animalsAtExpos: "Animali Disponibili in Fiera",
    nearYou: "Animali Vicino a Te",
    latestListings: "Tutti gli Annunci",
    seeAll: "Altre",
    seeAllListings: "Vedi tutti",
    popularCategories: "Categorie Popolari",
    searchTitle: "Ricerca",
    searchPlaceholder: "Cerca morph o specie...",
    searchAnimals: "Cerca Animali",
    searchBreeders: "Cerca Allevatori",
    category: "Categoria Principale",
    subCategory: "Sottocategoria",
    region: "Località (Regione)",
    showResults: "Mostra Risultati",
    sex: "Sesso",
    birthDate: "Data di Nascita (MM/AAAA)",
    birthYear: "Anno di Nascita",
    weight: "Peso (g)",
    location: "Località",
    parents: "Genetica Genitori",
    sire: "Padre (Sire)",
    dam: "Madre (Dam)",
    unknownParents: "Sconosciuto",
    breederNotes: "Note Allevatore",
    seller: "Venditore",
    contactSeller: "Contatta Venditore",
    newListing: "Crea Annuncio",
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
    logistics: "Burocrazia & Legale",
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
    onlyBuyersCanReview: "Puoi lasciare una recensione solo dopo aver acquistato tramite HerpMarket.",
    requestDeposit: "Richiedi Prenotazione",
    depositRequested: "In attesa...",
    payDeposit: "Paga Deposito",
    wishlist: "La Mia Wishlist",
    geneticsTitle: "Calcolatore Genetico",
    calcDesc: "Seleziona i riproduttori per prevedere la genetica della prole.",
    calculate: "Calcola Prole",
    policyDOA: "Garantiamo l'arrivo in vita (DOA) solo tramite corriere autorizzato o fiera. Deposito non rimborsabile.",
    all: "Tutti",
    searchExpo: "Cerca in fiera...",
    officialWebsite: "Sito Ufficiale",
    translateChat: "Traduci in Italiano",
    translatedMsg: "Ciao! Sì, lo porto a Verona. Se vuoi bloccarlo prima che lo venda ad altri, puoi inviare una richiesta tramite l'app.",
    inventoryTitle: "Inventario Esemplari",
    lineageTitle: "Genetica & Pedigree",
    reviewsTitle: "Le Mie Recensioni",
    documentsTitle: "Archivio CITES & ID",
    legalTitle: "Normative & Guide",
    settingsTitle: "Impostazioni & KYC",
    loading: "Caricamento...",
    emptyWishlist: "La tua wishlist è vuota.",
    emptyReviews: "Nessuna recensione lasciata.",
    emptyReviewsDesc: "Valutare gli acquirenti aiuta la community.",
    citesGenTitle: "Generatore Documenti",
    citesGenDesc: "Dati Acquirente (Reali)",
    generatePdf: "GENERA ANTEPRIMA PDF",
    saveArchive: "Salva nell'Archivio Digitale",
    stripePay: "Paga in modo sicuro con Stripe",
    processing: "Elaborazione in corso...",
    reserved: "Riservato",
    catGeckos: "Gechi",
    catSnakes: "Serpenti",
    catLizards: "Sauri",
    catChameleons: "Camaleonti",
    // New Listing Fields
    headline: "Titolo Annuncio",
    headlinePlaceholder: "Es. Bellissima femmina riproduttiva...",
    species: "Specie",
    morph: "Morph / Tratto",
    diet: "Dieta / Alimentazione",
    dietPlaceholder: "Es. Pangea, Grilli vivi...",
    descPlaceholder: "Descrivi il carattere, la salute, ecc.",
    logisticsTitle: "Trasporto & Logistica",
    shippingAvail: "Spedizione Disponibile",
    shippingCost: "Costo Spedizione (€)",
    localPickup: "Ritiro a Mano (In sede)",
    expoDelivery: "Consegna in Fiera",
    price: "Prezzo (€)"
  },
  en: {
    appSub: "The reptile marketplace in Europe",
    appDesc: "Join the growing community in Italy. Secure expo deposits and instant automatic CITES generator.",
    joinCommunity: "Join the Community",
    browseExpos: "Browse Expos",
    animalsAtExpos: "Animals Available at Expos",
    nearYou: "Animals Near You",
    latestListings: "All Listings",
    seeAll: "More",
    seeAllListings: "See all",
    popularCategories: "Popular Categories",
    searchTitle: "Search",
    searchPlaceholder: "Search morphs or species...",
    searchAnimals: "Search Animals",
    searchBreeders: "Search Breeders",
    category: "Main Category",
    subCategory: "Subcategory",
    region: "Location (Region)",
    showResults: "Show Results",
    sex: "Sex",
    birthDate: "Birth Date (MM/YYYY)",
    birthYear: "Birth Year",
    weight: "Weight (g)",
    location: "Location",
    parents: "Parental Genetics",
    sire: "Sire",
    dam: "Dam",
    unknownParents: "Unknown",
    breederNotes: "Breeder Notes",
    seller: "Seller",
    contactSeller: "Contact Seller",
    newListing: "Create Listing",
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
    logistics: "Bureaucracy & Legal",
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
    requestDeposit: "Request Reservation",
    depositRequested: "Waiting...",
    payDeposit: "Pay Deposit",
    wishlist: "My Wishlist",
    geneticsTitle: "Genetic Calculator",
    calcDesc: "Select breeders to predict offspring genetics.",
    calculate: "Calculate Offspring",
    policyDOA: "We guarantee Live Arrival (DOA) via authorized couriers or expo pickups. Expo deposits are non-refundable.",
    all: "All",
    searchExpo: "Search at expo...",
    officialWebsite: "Official Website",
    translateChat: "Translate to English",
    translatedMsg: "Hi! Yes, I'm bringing it to Verona. If you want to reserve it before I sell it to someone else, you can send a request through the app.",
    inventoryTitle: "Animal Inventory",
    lineageTitle: "Genetics & Pedigree",
    reviewsTitle: "My Reviews",
    documentsTitle: "CITES & ID Archive",
    legalTitle: "Regulations & Guides",
    settingsTitle: "Settings & KYC",
    loading: "Loading...",
    emptyWishlist: "Your wishlist is empty.",
    emptyReviews: "No reviews left yet.",
    emptyReviewsDesc: "Rating buyers helps the community.",
    citesGenTitle: "Document Generator",
    citesGenDesc: "Buyer Data (Real)",
    generatePdf: "GENERATE PDF PREVIEW",
    saveArchive: "Save to Digital Archive",
    stripePay: "Pay securely with Stripe",
    processing: "Processing...",
    reserved: "Reserved",
    catGeckos: "Geckos",
    catSnakes: "Snakes",
    catLizards: "Lizards",
    catChameleons: "Chameleons",
    // New Listing Fields
    headline: "Listing Headline",
    headlinePlaceholder: "E.g., Proven breeder female...",
    species: "Species",
    morph: "Morph / Trait",
    diet: "Diet / Feeding",
    dietPlaceholder: "E.g., Pangea, live crickets...",
    descPlaceholder: "Describe temperament, health, etc.",
    logisticsTitle: "Transport & Logistics",
    shippingAvail: "Shipping Available",
    shippingCost: "Shipping Cost (€)",
    localPickup: "Local Pickup (Facility)",
    expoDelivery: "Expo Delivery",
    price: "Price (€)"
  },
  de: {
    appSub: "Der Reptilien-Marktplatz in Europa",
    appDesc: "Tritt der wachsenden Community bei. Sichere Expo-Anzahlungen und CITES-Generator.",
    joinCommunity: "Der Community beitreten",
    browseExpos: "Börsen durchsuchen",
    animalsAtExpos: "Tiere auf der Börse verfügbar",
    nearYou: "Tiere in deiner Nähe",
    latestListings: "Alle Anzeigen",
    seeAll: "Mehr",
    seeAllListings: "Alle sehen",
    popularCategories: "Beliebte Kategorien",
    searchTitle: "Suche",
    searchPlaceholder: "Suchen...",
    searchAnimals: "Tiere Suchen",
    searchBreeders: "Züchter Suchen",
    category: "Hauptkategorie",
    subCategory: "Unterkategorie",
    region: "Ort (Region)",
    showResults: "Ergebnisse anzeigen",
    sex: "Geschlecht",
    birthDate: "Geburtsdatum (MM/JJJJ)",
    birthYear: "Geburtsjahr",
    weight: "Gewicht (g)",
    location: "Ort",
    parents: "Elterngenetik",
    sire: "Vater (Sire)",
    dam: "Mutter (Dam)",
    unknownParents: "Unbekannt",
    breederNotes: "Züchter Notizen",
    seller: "Verkäufer",
    contactSeller: "Verkäufer kontaktieren",
    newListing: "Anzeige Erstellen",
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
    logistics: "Bürokratie & Rechtliches",
    settings: "Einstellungen",
    male: "Männlich",
    female: "Weiblich",
    unsexed: "Unbestimmt",
    pair: "Paar",
    realPhoto: "Echtes Foto",
    activeListings: "Aktive Anzeigen",
    storePolicies: "Shop-Richtlinien",
    verifiedBuyer: "Verifizierter Käufer",
    writeReview: "Bewertung schreiben",
    onlyBuyersCanReview: "Sie können nur nach einem Kauf über HerpMarket eine Bewertung hinterlassen.",
    requestDeposit: "Reservierung anfragen",
    depositRequested: "Warten...",
    payDeposit: "Anzahlung leisten",
    wishlist: "Meine Wunschliste",
    geneticsTitle: "Genetik-Rechner",
    calcDesc: "Wählen Sie Zuchttiere aus, um die Genetik vorherzusagen.",
    calculate: "Nachkommen berechnen",
    policyDOA: "Lebendankunft (DOA) nur über autorisierte Kuriere oder Börsenübergaben. Anzahlungen nicht erstattungsfähig.",
    all: "Alle",
    searchExpo: "Auf der Börse suchen...",
    officialWebsite: "Offizielle Website",
    translateChat: "Auf Deutsch übersetzen",
    translatedMsg: "Hallo! Ja, ich bringe es nach Verona mit. Wenn du es reservieren möchtest, kannst du eine Anfrage senden.",
    inventoryTitle: "Tierbestand",
    lineageTitle: "Genetik & Stammbaum",
    reviewsTitle: "Meine Bewertungen",
    documentsTitle: "CITES & ID Archiv",
    legalTitle: "Vorschriften & Leitfäden",
    settingsTitle: "Einstellungen & KYC",
    loading: "Laden...",
    emptyWishlist: "Deine Wunschliste ist leer.",
    emptyReviews: "Noch keine Bewertungen hinterlassen.",
    emptyReviewsDesc: "Käufer zu bewerten hilft der Community.",
    citesGenTitle: "Dokumentengenerator",
    citesGenDesc: "Käuferdaten (Echt)",
    generatePdf: "PDF-VORSCHAU",
    saveArchive: "Im Archiv speichern",
    stripePay: "Sicher bezahlen mit Stripe",
    processing: "Verarbeitung...",
    reserved: "Reserviert",
    catGeckos: "Geckos",
    catSnakes: "Schlangen",
    catLizards: "Echsen",
    catChameleons: "Chamäleons",
    // New Listing Fields
    headline: "Anzeigentitel",
    headlinePlaceholder: "Z.B. Bewährtes Zuchtweibchen...",
    species: "Art",
    morph: "Morph / Merkmal",
    diet: "Ernährung",
    dietPlaceholder: "Z.B. Pangea, lebende Grillen...",
    descPlaceholder: "Beschreibe Temperament, Gesundheit usw.",
    logisticsTitle: "Transport & Logistik",
    shippingAvail: "Versand verfügbar",
    shippingCost: "Versandkosten (€)",
    localPickup: "Abholung vor Ort",
    expoDelivery: "Übergabe auf Börse",
    price: "Preis (€)"
  }
};

// --- DYNAMIC MORPH DATA BASED ON SPECIES ---
const speciesMorphsMap = {
  "Correlophus ciliatus (Crested Gecko)": ["Normal / Wild Type", "Flame", "Harlequin", "Extreme Harlequin", "Pinstripe", "Dalmatian", "Lilly White", "Axanthic", "Frappuccino"],
  "Eublepharis macularius (Leopard Gecko)": ["Normal", "Tremper Albino", "Bell Albino", "Rainwater Albino", "Eclipse", "Blizzard", "Enigma", "Black Night", "Tangerine", "Lemon Frost"],
  "Python regius (Ball Python)": ["Normal", "Pastel", "Spider", "Pinstripe", "Clown", "Piebald (Pied)", "Banana / Coral Glow", "Lesser / Butter", "Mojave", "GHI", "Axanthic"],
  "Furcifer pardalis (Panther Chameleon)": ["Ambilobe", "Ambanja", "Nosy Be", "Nosy Faly", "Sambava", "Tamatave"],
  "Other / Non-Mutated": ["Normal / Wild Type", "Other (Specify in title)"]
};

// --- VISUAL CATEGORIES (For Search Page) ---
const visualCategories = [
  { id: 'catGeckos', img: 'https://images.unsplash.com/photo-1621316492329-8fb83ebf90b9?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 'catSnakes', img: 'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 'catLizards', img: 'https://images.unsplash.com/photo-1542228601-51208034b7a1?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 'catChameleons', img: 'https://images.unsplash.com/photo-1580526149844-31f1a5f6ed49?auto=format&fit=crop&q=80&w=300&h=300' },
];

// --- EXTENDED MOCK DATA ---
const mockListings = [
  { id: 1, species: "Correlophus ciliatus", morph: "Red Harlequin Pinstripe", price: "€150", deposit: "€15", image: "/images/ciliatus.jpg", location: "Moncalieri, Piemonte", fiera: "Verona Reptiles", breeder: "Piedmont Geckos", verified: true, sex: "male", birthDate: "05/2024", weight: "35g", rating: 4.8, reviews: 24, parents: { sire: "Axanthic Lilly White", dam: "Red Harlequin" }, description: "Bellissimo esemplare.", category: "Geckos" },
  { id: 2, species: "Furcifer pardalis", morph: "Ambilobe Blue Bar", price: "€280", deposit: "€28", image: "/images/pardalis.jpg", location: "Milano, Lombardia", fiera: "Verona Reptiles", breeder: "ExoBreed IT", verified: true, sex: "male", birthDate: "02/2025", weight: "80g", rating: 4.9, reviews: 56, parents: { sire: "Ambilobe Blue Bar", dam: "Ambilobe Red Bar" }, description: "Colori spettacolari. CITES B.", category: "Chameleons" },
  { id: 3, species: "Gekko gecko", morph: "Normal CB", price: "€90", deposit: "€9", image: "/images/tokay.jpg", location: "Roma, Lazio", fiera: null, breeder: "Serpenti Roma", verified: false, sex: "female", birthDate: "11/2023", weight: "75g", rating: 4.2, reviews: 15, parents: null, description: "Nata in cattività, molto docile.", category: "Geckos" },
  { id: 4, species: "Eublepharis macularius", morph: "Normal / Wild Type", price: "€45", deposit: "€4.50", image: "/images/leopardino.jpg", location: "Napoli, Campania", fiera: "Squamata Expo", breeder: "LeoMorphs Campania", verified: true, sex: "unsexed", birthDate: "01/2026", weight: "15g", rating: 4.7, reviews: 30, parents: { sire: "Normal Het Tremper", dam: "Normal" }, description: "Mangia tarme regolarmente.", category: "Geckos" },
  { id: 5, species: "Phelsuma grandis", morph: "High Red", price: "€110", deposit: "€11", image: "/images/phelsuma.jpg", location: "Firenze, Toscana", fiera: null, breeder: "Phelsuma Italia", verified: true, sex: "female", birthDate: "08/2024", weight: "40g", rating: 5.0, reviews: 41, parents: null, description: "In salute, colori molto accesi.", category: "Geckos" },
  { id: 6, species: "Pogona vitticeps", morph: "Hypo Zero", price: "€180", deposit: "€18", image: "https://images.unsplash.com/photo-1542228601-51208034b7a1?auto=format&fit=crop&q=80&w=400", location: "Torino, Piemonte", fiera: "Squamata Expo", breeder: "DragoMania", verified: false, sex: "pair", birthDate: "01/2026", weight: "20g", rating: 4.4, reviews: 12, parents: null, description: "Piccoli draghi ottimi mangiatori.", category: "Lizards" },
  { id: 7, species: "Tiliqua scincoides", morph: "Irian Jaya", price: "€250", deposit: "€25", image: "https://images.unsplash.com/photo-1506555191898-bea76022e379?auto=format&fit=crop&q=80&w=400", location: "Genova, Liguria", fiera: "Verona Reptiles", breeder: "SkinkHaven", verified: true, sex: "unsexed", birthDate: "04/2025", weight: "300g", rating: 4.9, reviews: 28, parents: null, description: "Scinco dalla lingua blu, tranquillo.", category: "Lizards" },
  { id: 8, species: "Python regius", morph: "Banana Pastel", price: "€150", deposit: "€15", image: "https://images.unsplash.com/photo-1596443686812-2f45229eebc3?auto=format&fit=crop&q=80&w=400", location: "Venezia, Veneto", fiera: "Squamata Expo", breeder: "Veneto Royals", verified: true, sex: "male", birthDate: "06/2025", weight: "120g", rating: 4.6, reviews: 88, parents: {sire: "Banana", dam: "Pastel"}, description: "Mangia decongelato.", category: "Snakes" }
];

const mockBreeders = [
  { name: "Piedmont Geckos", region: "Piemonte", rating: 4.8, reviews: 24, verified: true, focus: "Crested Geckos, Hognose" },
  { name: "ExoBreed IT", region: "Lombardia", rating: 4.9, reviews: 56, verified: true, focus: "Panther Chameleons" },
  { name: "Serpenti Roma", region: "Lazio", rating: 4.2, reviews: 15, verified: false, focus: "Colubrids, Tokay Geckos" },
  { name: "LeoMorphs Campania", region: "Campania", rating: 4.7, reviews: 30, verified: true, focus: "Leopard Geckos, Fat Tail Geckos" },
  { name: "Boa Italia", region: "Piemonte", rating: 4.9, reviews: 110, verified: true, focus: "Boa Constrictors" },
  { name: "Crested Elite", region: "Lombardia", rating: 5.0, reviews: 200, verified: true, focus: "High-end Crested Geckos" }
];

const breederReviewsData = [
  { breeder: "Piedmont Geckos", buyer: "Marco T.", date: "03/2026", rating: 5, comment: "Esemplare fantastico, ritirato in fiera senza problemi." },
  { breeder: "ExoBreed IT", buyer: "Luca P.", date: "01/2026", rating: 5, comment: "Camaleonte stupendo, colori pazzeschi. CITES impeccabile." }
];

const expos = [
  { id: 1, name: "Verona Reptiles", location: "Cerea (VR), IT", date: "3 Ott 2026", color: "bg-orange-600", website: "https://www.facebook.com/VeronaReptiles" },
  { id: 2, name: "Squamata Expo", location: "Bologna, IT", date: "21 Giu 2026", color: "bg-emerald-600", website: "https://www.facebook.com/Squamata" },
  { id: 3, name: "Esotika Pet Show", location: "Arezzo, IT", date: "12 Set 2026", color: "bg-blue-600", website: "https://www.facebook.com/Esotika" },
  { id: 4, name: "Terraristika Hamm", location: "Hamm, DE", date: "12 Dic 2026", color: "bg-slate-700", website: "https://www.facebook.com/Terraristika" }
];

const categoryHierarchy = {
  "Geckos": ["Crested Geckos", "Leopard Geckos", "Tokay Geckos", "Day Geckos", "Gargoyle Geckos"],
  "Snakes": ["Ball Pythons", "Corn Snakes", "Boa Constrictors", "Hognose Snakes", "Colubrids"],
  "Lizards": ["Bearded Dragons", "Blue-Tongue Skinks", "Monitor Lizards", "Iguanas"],
  "Chameleons": ["Panther Chameleons", "Veiled Chameleons", "Jackson's Chameleons"],
  "Turtles & Tortoises": ["Testudo Hermanni", "Sulcata Tortoise", "Water Turtles"],
  "Amphibians": ["Dart Frogs", "Tree Frogs", "Toads", "Salamanders"],
  "Invertebrates": ["Tarantulas", "Scorpions", "Isopods", "Mantises"]
};

const italianRegions = [
  "Tutte le Regioni", "Abruzzo", "Campania", "Emilia-Romagna", "Lazio", 
  "Lombardia", "Piemonte", "Sicilia", "Toscana", "Veneto"
];

// --- MAIN APP COMPONENT ---
export default function HerpMarketPWA() {
  const [currentView, setCurrentView] = useState('home');
  const [viewData, setViewData] = useState(null);
  const [lang, setLang] = useState('en'); 
  const [favorites, setFavorites] = useState([]);
  
  const userLocation = "Piemonte"; 

  const t = translations[lang] || translations['en']; 

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const navigateTo = (view, data = null) => {
    setCurrentView(view);
    if (data) setViewData(data);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    const props = { navigateTo, t, lang, setLang, favorites, toggleFavorite, userLocation, mockListings };
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
          <DesktopNavButton icon={<User size={20} />} active={['profile', 'wishlist', 'lineage', 'legal', 'documents', 'settings', 'inventory', 'reviews'].includes(currentView)} label={t.navProfile} onClick={() => navigateTo('profile')} />
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

// --- REUSABLE COMPONENTS ---
function ListingCard({ item, navigateTo, favorites, toggleFavorite, t }) {
  const svgFallback = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="%231e293b"><rect width="400" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="%2394a3b8">${t.realPhoto}</text></svg>`;

  return (
    <div onClick={() => navigateTo('detail', item)} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col cursor-pointer hover:-translate-y-1 transition-transform relative group">
      <button onClick={(e) => toggleFavorite(item.id, e)} className="absolute top-2 right-2 p-2 bg-slate-900/60 backdrop-blur-sm rounded-full z-10 hover:bg-slate-900/90 transition-colors">
        <Heart size={16} className={favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-white"} />
      </button>
      <div className="w-full aspect-square bg-slate-700 relative overflow-hidden">
        <img src={item.image} alt={item.morph} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.onerror = null; e.target.src = svgFallback; }} />
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
          <span className="bg-slate-900 text-slate-300 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">{t[item.sex] || item.sex}</span>
        </div>
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

function StripeModal({ isOpen, onClose, amount, t }) {
  if (!isOpen) return null;
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      setTimeout(() => onClose(true), 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-800">
          <div className="flex items-center text-emerald-400 font-bold"><Lock size={16} className="mr-2"/> Checkout</div>
          {!processing && !done && <button onClick={() => onClose(false)} className="text-slate-400 hover:text-white">✕</button>}
        </div>
        <div className="p-6 text-center">
          {done ? (
            <div className="flex flex-col items-center py-6">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/50"><CheckCircle size={32}/></div>
              <h3 className="text-xl font-black text-white mb-1">Success!</h3>
              <p className="text-sm text-slate-400">Reservation confirmed.</p>
            </div>
          ) : (
            <>
              <h3 className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-2">Deposit Amount</h3>
              <p className="text-4xl font-black text-white mb-8">{amount}</p>
              <div className="space-y-3 mb-8 text-left">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center"><CreditCard size={18} className="text-slate-400 mr-3"/><span className="text-slate-300 text-sm">•••• •••• •••• 4242</span></div>
              </div>
              <button onClick={handlePay} disabled={processing} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-all disabled:bg-slate-700 disabled:text-slate-400">
                {processing ? t.processing : `${t.stripePay} ${amount}`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- VIEWS ---

function HomeView({ navigateTo, t, lang, setLang, favorites, toggleFavorite, userLocation, mockListings }) {
  const localListings = mockListings.filter(item => item.location.includes(userLocation));
  const otherListings = mockListings.filter(item => !item.location.includes(userLocation));
  
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-6 overflow-y-auto hide-scrollbar max-w-7xl mx-auto w-full">
      
      {/* HEADER */}
      <div className="bg-slate-900 border-b border-slate-800 pt-8 pb-6 px-5 relative overflow-hidden md:hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">HERP<span className="text-emerald-400">MARKET</span></h1>
            <p className="text-[11px] text-slate-400 mt-2 max-w-[250px] leading-relaxed font-medium">{t.appDesc}</p>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 shadow-sm shrink-0 z-10 relative">
            <button onClick={() => setLang('it')} className={`px-2 py-1.5 text-[10px] font-black rounded-md transition-colors ${lang === 'it' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>IT</button>
            <button onClick={() => setLang('en')} className={`px-2 py-1.5 text-[10px] font-black rounded-md transition-colors ${lang === 'en' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('de')} className={`px-2 py-1.5 text-[10px] font-black rounded-md transition-colors ${lang === 'de' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>DE</button>
          </div>
        </div>
        <button onClick={() => navigateTo('profile')} className="w-full bg-emerald-600 text-white font-black py-3.5 px-6 rounded-xl text-xs active:scale-95 transition-transform shadow-lg uppercase tracking-widest">{t.joinCommunity}</button>
      </div>

      {/* Live Events / Expos */}
      <div className="pt-6 pb-4 relative">
        <h3 className="px-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center"><Calendar size={14} className="mr-2 text-emerald-400"/> {t.animalsAtExpos}</h3>
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar px-5 pb-2">
          {expos.map(expo => (
            <div key={expo.id} onClick={() => navigateTo('expo_hub', expo)} className={`flex-shrink-0 w-[200px] ${expo.color} p-4 rounded-2xl shadow-lg cursor-pointer transform active:scale-95 transition-transform flex flex-col justify-between`}>
              <div><h4 className="font-bold text-sm text-white truncate leading-tight">{expo.name}</h4><p className="text-[10px] text-white/90 font-medium mt-1 truncate">{expo.location}</p></div>
              <span className="text-[10px] bg-black/30 text-white font-bold px-2.5 py-1 rounded-lg mt-4 inline-block self-start">{expo.date}</span>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-10 bottom-2 w-12 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none flex items-center justify-end pr-1">
          <ChevronRight size={20} className="text-white/40 animate-pulse" />
        </div>
      </div>

      {/* Location Based Listings (Near You) */}
      {localListings.length > 0 && (
        <div className="px-5 pb-6 mt-4">
          <div className="flex justify-between items-center mb-4 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
            <h3 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center"><MapPin size={12} className="mr-1.5"/> {t.nearYou} ({userLocation})</h3>
            <span className="text-[11px] text-slate-400 font-bold cursor-pointer hover:underline" onClick={() => navigateTo('search')}>{t.seeAllListings}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {localListings.slice(0, 4).map(item => (
              <ListingCard key={item.id} item={item} navigateTo={navigateTo} favorites={favorites} toggleFavorite={toggleFavorite} t={t} />
            ))}
          </div>
        </div>
      )}

      {/* All Latest Listings */}
      <div className="px-5 pb-12 mt-2">
        <div className="flex justify-between items-center mb-4"><h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t.latestListings}</h3><span className="text-[11px] text-emerald-400 font-bold cursor-pointer hover:underline" onClick={() => navigateTo('search')}>{t.seeAllListings}</span></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {otherListings.map(item => (
            <ListingCard key={item.id} item={item} navigateTo={navigateTo} favorites={favorites} toggleFavorite={toggleFavorite} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchView({ navigateTo, t }) {
  const [searchMode, setSearchMode] = useState('animals');
  const [mainCat, setMainCat] = useState('Geckos');

  const svgFallback = (text) => `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="%231e293b"><rect width="300" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2394a3b8">${text}</text></svg>`;
  
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 pb-20 md:pb-0">
      <div className="pt-8 px-5 pb-5 bg-slate-800 border-b border-slate-700 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-black text-white mb-4 flex items-center tracking-tight"><Sliders size={20} className="mr-2 text-emerald-400"/> {t.searchTitle}</h1>
        
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-700 mb-4">
          <button onClick={() => setSearchMode('animals')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-colors ${searchMode === 'animals' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>{t.searchAnimals}</button>
          <button onClick={() => setSearchMode('breeders')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-colors ${searchMode === 'breeders' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>{t.searchBreeders}</button>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-500" />
          <input type="text" placeholder={t.searchPlaceholder} className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar max-w-2xl mx-auto w-full">
        
        {searchMode === 'animals' && (
          <div className="mb-6">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 mb-3">{t.popularCategories}</h3>
            <div className="grid grid-cols-4 gap-3">
              {visualCategories.map(cat => (
                 <div key={cat.id} className="flex flex-col items-center cursor-pointer group">
                   <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 shadow-md group-hover:border-emerald-500 transition-colors mb-1.5 flex items-center justify-center">
                     <img src={cat.img} alt={t[cat.id]} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = svgFallback(t[cat.id]); }} />
                   </div>
                   <span className="text-[9px] font-bold text-slate-400 text-center leading-tight">{t[cat.id]}</span>
                 </div>
              ))}
            </div>
          </div>
        )}

        {searchMode === 'animals' ? (
          <>
            <div className="flex space-x-3">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.category}</label>
                <div className="relative">
                  <select value={mainCat} onChange={(e) => setMainCat(e.target.value)} className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
                    {Object.keys(categoryHierarchy).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.subCategory}</label>
                <div className="relative">
                  <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
                    <option value="all">{t.all}</option>
                    {categoryHierarchy[mainCat]?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                    <option value="all">{t.all}</option><option value="male">{t.male}</option><option value="female">{t.female}</option><option value="unsexed">{t.unsexed}</option><option value="pair">{t.pair}</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.birthYear}</label>
              <div className="relative">
                <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
                  <option value="all">{t.all}</option><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option><option value="2023">2023 o precedente</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="pt-2"><button onClick={() => navigateTo('home')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-transform tracking-wider">{t.showResults}</button></div>
          </>
        ) : (
          <>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.region}</label>
              <div className="relative">
                <select className="w-full bg-slate-800 text-slate-200 text-sm rounded-xl py-4 px-4 outline-none border border-slate-700 focus:border-emerald-500 font-medium shadow-sm appearance-none">
                  {italianRegions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] pt-4">Risultati Allevatori</h3>
            <div className="space-y-3">
               {mockBreeders.map((b, i) => (
                 <div key={i} onClick={() => navigateTo('breeder', b.name)} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-colors shadow-sm">
                   <div>
                     <h4 className="font-bold text-white flex items-center text-sm">{b.name} {b.verified && <ShieldCheck size={14} className="text-blue-400 ml-1.5"/>}</h4>
                     <p className="text-[10px] text-slate-400 mt-0.5">{b.focus}</p>
                     <div className="flex items-center text-yellow-400 font-bold text-[10px] mt-2">
                       <Star size={10} fill="currentColor" className="mr-1"/> {b.rating} <span className="text-slate-500 ml-1.5">({b.reviews} reviews) • {b.region}</span>
                     </div>
                   </div>
                   <ChevronRight size={18} className="text-slate-600"/>
                 </div>
               ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ListingDetailView({ animal, navigateTo, t, favorites, toggleFavorite }) {
  const [depositState, setDepositState] = useState('idle');
  const [showStripe, setShowStripe] = useState(false);

  if (!animal) return null;

  const handleDepositClick = () => {
    if (depositState === 'idle') {
      setDepositState('requested');
      setTimeout(() => setDepositState('approved'), 3000);
    } else if (depositState === 'approved') {
      setShowStripe(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-y-auto hide-scrollbar max-w-3xl mx-auto w-full border-x border-slate-800/50 relative">
      <StripeModal isOpen={showStripe} onClose={(success) => { setShowStripe(false); if(success) setDepositState('paid'); }} amount={animal.deposit} t={t} />

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
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50"><span className="text-slate-400 uppercase text-[9px] block mb-1 tracking-widest">{t.sex}</span><span className="text-white text-sm">{t[animal.sex] || animal.sex}</span></div>
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
            disabled={depositState === 'requested' || depositState === 'paid'}
            className={`flex-1 border font-bold text-xs py-3.5 rounded-xl shadow-xl flex flex-col justify-center items-center transition-all ${
              depositState === 'idle' ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' :
              depositState === 'requested' ? 'bg-slate-800/50 text-slate-400 border-slate-800 cursor-wait' :
              depositState === 'paid' ? 'bg-emerald-600 text-white border-emerald-500' :
              'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 animate-pulse'
            }`}
          >
             <span className="flex items-center mb-0.5">
               {depositState === 'idle' && <Clock size={14} className="mr-1.5 text-emerald-400"/>}
               {depositState === 'approved' && <CreditCard size={14} className="mr-1.5 text-white"/>}
               {depositState === 'paid' && <CheckCircle size={14} className="mr-1.5 text-white"/>}
               {depositState === 'idle' ? t.requestDeposit : depositState === 'requested' ? t.depositRequested : depositState === 'paid' ? t.reserved : t.payDeposit}
             </span>
             {depositState !== 'requested' && depositState !== 'paid' && <span className={depositState === 'approved' ? 'text-white font-black' : 'text-emerald-400 font-black'}>{animal.deposit}</span>}
          </button>
          
          <button onClick={() => navigateTo('chat_thread', animal)} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm py-3.5 rounded-xl shadow-xl flex justify-center items-center active:scale-95 transition-transform">
             <MessageCircle size={20} className="mr-2"/> Chat
          </button>
        </div>
      </div>
    </div>
  );
}

function BreederProfileView({ breederName, navigateTo, t, favorites, toggleFavorite }) {
  const [tab, setTab] = useState('listings');
  const breederListings = mockListings.filter(item => item.breeder === breederName);
  
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
              <ListingCard key={item.id} item={item} navigateTo={navigateTo} favorites={favorites} toggleFavorite={toggleFavorite} t={t} />
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

// --- NEW COMPREHENSIVE ADD LISTING VIEW ---
function AddListingView({ navigateTo, t }) {
  const [success, setSuccess] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [shipping, setShipping] = useState(false);
  const [localPickup, setLocalPickup] = useState(false);
  const [selectedExpos, setSelectedExpos] = useState([]);

  // Get available morphs based on selected species
  const availableMorphs = selectedSpecies ? (speciesMorphsMap[selectedSpecies] || speciesMorphsMap["Other / Non-Mutated"]) : [];

  const toggleExpo = (expoName) => {
    if (selectedExpos.includes(expoName)) {
      setSelectedExpos(selectedExpos.filter(e => e !== expoName));
    } else {
      setSelectedExpos([...selectedExpos, expoName]);
    }
  };

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
      
      <div className="flex-1 p-5 space-y-8 pb-24">
        
        {/* Photo Upload */}
        <div className="border-2 border-dashed border-slate-700 rounded-3xl py-14 text-center bg-slate-800/30 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5 transition-all">
          <Camera size={36} className="text-slate-500 mb-3" />
          <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">{t.uploadPhoto}</span>
        </div>
        
        {/* Basic Details Section */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 border-b border-slate-800 pb-2">1. Dati Principali</h3>
          
          <input type="text" placeholder={t.headlinePlaceholder} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
          
          <div className="relative">
            <select 
              value={selectedSpecies} 
              onChange={(e) => setSelectedSpecies(e.target.value)} 
              className={`w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm outline-none appearance-none shadow-inner ${selectedSpecies ? 'text-white' : 'text-slate-400'}`}
            >
              <option value="" disabled>{t.species}</option>
              {Object.keys(speciesMorphsMap).map(sp => <option key={sp} value={sp}>{sp}</option>)}
            </select>
            <ChevronDown size={18} className="absolute right-5 top-4 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              disabled={!selectedSpecies}
              className={`w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm outline-none appearance-none shadow-inner ${!selectedSpecies ? 'opacity-50 cursor-not-allowed text-slate-500' : 'text-white'}`}
            >
              <option value="">{t.morph}</option>
              {availableMorphs.map(morph => <option key={morph} value={morph}>{morph}</option>)}
            </select>
            <ChevronDown size={18} className={`absolute right-5 top-4 pointer-events-none ${!selectedSpecies ? 'text-slate-600' : 'text-slate-500'}`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="relative">
               <select className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-slate-400 outline-none appearance-none shadow-inner">
                 <option>{t.sex}</option><option>{t.male}</option><option>{t.female}</option><option>{t.pair}</option><option>{t.unsexed}</option>
               </select>
               <ChevronDown size={18} className="absolute right-4 top-4 text-slate-500 pointer-events-none" />
             </div>
             <input type="text" placeholder={t.price} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <input type="text" placeholder={t.birthDate} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
             <input type="text" placeholder={t.weight} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
          </div>
        </div>

        {/* Genetics Section */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 border-b border-slate-800 pb-2">2. {t.parents}</h3>
          <div className="grid grid-cols-2 gap-3">
             <input type="text" placeholder={t.sire} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-blue-100 outline-none focus:border-blue-500 shadow-inner" />
             <input type="text" placeholder={t.dam} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-pink-100 outline-none focus:border-pink-500 shadow-inner" />
          </div>
          <p className="text-[10px] text-slate-500 italic px-2">Lascia vuoto se la genetica dei genitori è sconosciuta.</p>
        </div>

        {/* Care & Description Section */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 border-b border-slate-800 pb-2">3. Cura & Descrizione</h3>
          <input type="text" placeholder={t.dietPlaceholder} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner" />
          <textarea placeholder={t.descPlaceholder} rows="4" className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-emerald-500 shadow-inner resize-none"></textarea>
        </div>

        {/* Logistics & Shipping Section */}
        <div className="space-y-5">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 border-b border-slate-800 pb-2">4. {t.logisticsTitle}</h3>
          
          {/* Toggles */}
          <div className="space-y-3">
            <label className="flex items-center justify-between bg-slate-800 p-4 rounded-2xl border border-slate-700 cursor-pointer">
              <span className="text-sm font-bold text-white">{t.localPickup}</span>
              <input type="checkbox" checked={localPickup} onChange={() => setLocalPickup(!localPickup)} className="w-5 h-5 accent-emerald-500 rounded cursor-pointer" />
            </label>

            <div className={`bg-slate-800 p-4 rounded-2xl border transition-colors ${shipping ? 'border-emerald-500/50' : 'border-slate-700'}`}>
              <label className="flex items-center justify-between cursor-pointer mb-3">
                <span className="text-sm font-bold text-white">{t.shippingAvail}</span>
                <input type="checkbox" checked={shipping} onChange={() => setShipping(!shipping)} className="w-5 h-5 accent-emerald-500 rounded cursor-pointer" />
              </label>
              {shipping && (
                <input type="text" placeholder={t.shippingCost} className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-emerald-500 shadow-inner mt-2" />
              )}
            </div>
          </div>

          {/* Expo Multi-Select */}
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-3 px-1">{t.expoDelivery}</span>
            <div className="flex flex-wrap gap-2">
              {expos.map(expo => (
                <button 
                  key={expo.id} 
                  onClick={() => toggleExpo(expo.name)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${selectedExpos.includes(expo.name) ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'}`}
                >
                  {expo.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        <button onClick={() => setSuccess(true)} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl shadow-xl mt-8 active:scale-95 transition-transform tracking-wider">{t.publish}</button>
      </div>
    </div>
  );
}

function ChatHubView({ navigateTo, t }) {
  const activeChats = [
    { id: 1, breeder: "Piedmont Geckos", lastMessage: "Perfetto, ci vediamo allo stand!", listing: mockListings[0], time: "14:20" },
    { id: 2, breeder: "ExoBreed IT", lastMessage: "Documento CITES compilato?", listing: mockListings[1], time: "Ieri" }
  ];
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full border-x border-slate-800/50">
      <div className="pt-8 px-5 pb-5 bg-slate-800 border-b border-slate-700 font-black text-xl text-white tracking-tight sticky top-0 z-10">{t.messages}</div>
      <div className="flex-1 overflow-y-auto p-3 hide-scrollbar pb-20 md:pb-0">
        {activeChats.map(chat => (
          <div key={chat.id} onClick={() => navigateTo('chat_thread', chat)} className="p-4 flex items-center space-x-4 cursor-pointer bg-slate-800/30 hover:bg-slate-800/80 rounded-3xl transition-colors mb-2 border border-slate-800">
            <div className="relative shrink-0">
              <img src={chat.listing.image} className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md" alt="" onError={(e) => { e.target.src = `https://placehold.co/100x100/0f172a/10b981?text=${t.realPhoto}` }} />
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

function ChatThreadView({ chatData, navigateTo, t, lang }) {
  const target = (chatData && chatData.listing) ? chatData.listing : mockListings[0];
  const [messages, setMessages] = useState([
    { sender: 'me', text: "Salve, l'esemplare è ancora disponibile per la fiera?" },
    { sender: 'them', text: "Ciao! Sì, lo porto a Verona. Se vuoi bloccarlo prima che lo venda ad altri, puoi inviare una richiesta tramite l'app." }
  ]);
  const [inputText, setInputText] = useState("");
  const [depositState, setDepositState] = useState('idle'); 
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [showStripe, setShowStripe] = useState(false);

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
      setMessages(prev => [...prev, { 
        sender: 'them', 
        text: "Perfetto! Ho appena accettato la tua richiesta. Puoi procedere al pagamento cliccando sul pulsante verde in alto per completare la prenotazione." 
      }]);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full border-x border-slate-800/50 relative">
      <StripeModal isOpen={showStripe} onClose={(success) => { setShowStripe(false); if(success) setDepositState('paid'); }} amount={target.deposit} t={t} />

      <div className="p-4 border-b border-slate-800 flex items-center justify-between pt-6 bg-slate-800 sticky top-0 z-20">
        <div className="flex items-center">
          <button onClick={() => navigateTo('chat')} className="p-2 mr-3 bg-slate-700 rounded-full text-white active:scale-90 transition-transform"><ChevronLeft size={20} /></button>
          <div className="flex-1"><h1 className="text-base font-black text-white">{target.breeder}</h1><p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t.onlineNow}</p></div>
        </div>
        {lang !== 'it' && (
          <button onClick={() => setAutoTranslate(!autoTranslate)} className={`p-2 rounded-xl flex items-center transition-colors ${autoTranslate ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
            <Languages size={16} className={autoTranslate ? "mr-1.5" : ""} />
            {autoTranslate && <span className="text-[10px] font-bold uppercase tracking-widest">{t.translateChat}</span>}
          </button>
        )}
      </div>
      
      <div className="bg-slate-950/90 backdrop-blur p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={target.image} className="w-11 h-11 rounded-lg object-cover border border-slate-700" alt="" onError={(e) => { e.target.src = `https://placehold.co/100x100/0f172a/10b981?text=${t.realPhoto}` }} />
          <div><h4 className="text-[11px] font-bold text-white leading-tight">{target.morph}</h4><p className="text-emerald-400 text-[11px] font-black">{target.price}</p></div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={depositState === 'idle' ? requestReservation : depositState === 'approved' ? () => setShowStripe(true) : undefined} 
            disabled={depositState === 'requested' || depositState === 'paid'}
            className={`font-bold text-[10px] py-2 px-3 rounded-xl shadow-lg transition-all flex items-center ${
              depositState === 'idle' ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' :
              depositState === 'requested' ? 'bg-slate-800/50 text-slate-400 cursor-wait' :
              depositState === 'paid' ? 'bg-emerald-600 text-white border-emerald-500' :
              'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
            }`}
          >
            {depositState === 'approved' && <CreditCard size={12} className="mr-1.5"/>}
            {depositState === 'paid' && <CheckCircle size={12} className="mr-1.5"/>}
            {depositState === 'idle' ? t.requestDeposit : depositState === 'requested' ? t.depositRequested : depositState === 'paid' ? t.reserved : t.payDeposit}
          </button>
          <button onClick={() => navigateTo('cites_generator', target)} className="bg-blue-600 text-white font-bold text-[10px] py-2 px-3 rounded-xl flex items-center shadow-lg hover:bg-blue-500 active:scale-95 transition-all"><FileText size={14} /></button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-4 rounded-3xl text-sm shadow-md ${msg.sender === 'me' ? 'bg-emerald-600 text-white rounded-tr-sm ml-auto max-w-[85%]' : 'bg-slate-800 text-slate-200 rounded-tl-sm max-w-[85%]'}`}>
            {autoTranslate && msg.sender === 'them' && idx === 1 ? t.translatedMsg : msg.text}
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex space-x-2 pb-safe">
        <input 
          type="text" 
          placeholder={t.typeMessage} 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500" 
        />
        <button onClick={handleSend} className="bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform"><MessageCircle size={20}/></button>
      </div>
    </div>
  );
}

function CitesGeneratorView({ animalData, navigateTo, t }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nome: '', cognome: '', cf: '' });
  const isCites = animalData?.category !== "Geckos";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-2xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0">
        <button onClick={() => navigateTo('chat_thread', animalData)} className="p-2 mr-3 bg-slate-700 rounded-full text-white active:scale-90 transition-transform"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-black text-white tracking-tight">{t.citesGenTitle}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-5 pb-24 text-sm hide-scrollbar">
        {step === 1 ? (
          <div className="space-y-6">
            <div className={`p-5 rounded-2xl border-2 font-bold ${isCites ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
              <h4 className="text-[10px] uppercase tracking-[0.2em] mb-1.5 opacity-80">{isCites ? "Documento Legale Obbligatorio" : "Certificazione Piattaforma"}</h4>
              <p className="text-sm">{isCites ? "Dichiarazione Cessione CITES All. B" : "Animal ID & Certificato Origine"}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t.citesGenDesc}</h3>
              <input type="text" placeholder="Nome" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-white outline-none focus:border-emerald-500 shadow-inner" />
              <input type="text" placeholder="Cognome" value={formData.cognome} onChange={e => setFormData({...formData, cognome: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-white outline-none focus:border-emerald-500 shadow-inner" />
              <input type="text" placeholder="Codice Fiscale" value={formData.cf} onChange={e => setFormData({...formData, cf: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 text-white outline-none uppercase focus:border-emerald-500 shadow-inner" />
              <button onClick={() => setStep(2)} disabled={!formData.nome || !formData.cf} className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl mt-4 shadow-xl active:scale-95 transition-transform tracking-wider disabled:bg-slate-700 disabled:text-slate-400">{t.generatePdf}</button>
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
            <button onClick={() => navigateTo('documents')} className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl flex justify-center items-center active:scale-95 transition-transform shadow-lg"><Clipboard size={18} className="mr-2"/> {t.saveArchive}</button>
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
        <DashboardButton icon={<List />} label={t.inventoryTitle} onClick={() => navigateTo('inventory')} />
        <DashboardButton icon={<Grid />} label={t.lineageTitle} onClick={() => navigateTo('lineage')} badge="Pro" />
        <DashboardButton icon={<Star />} label={t.reviewsTitle} onClick={() => navigateTo('reviews')} />
        
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2 mt-8 px-1">{t.logistics}</h3>
        <DashboardButton icon={<FileText />} label={t.documentsTitle} onClick={() => navigateTo('documents')} />
        <DashboardButton icon={<Info />} label={t.legalTitle} onClick={() => navigateTo('legal')} />
        
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2 mt-8 px-1">{t.settings}</h3>
        <DashboardButton icon={<Settings />} label={t.settingsTitle} onClick={() => navigateTo('settings')} />
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
  const wishlistedItems = mockListings.filter(item => favorites.includes(item.id));
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-5xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10">
        <button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-black text-white">{t.wishlist}</h1>
      </div>
      <div className="p-5 flex-1 overflow-y-auto hide-scrollbar pb-24">
        {wishlistedItems.length === 0 ? (
          <div className="text-center text-slate-500 text-sm font-medium mt-10">{t.emptyWishlist}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistedItems.map(item => (
              <ListingCard key={item.id} item={item} navigateTo={navigateTo} favorites={favorites} toggleFavorite={toggleFavorite} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InventoryManagerView({ navigateTo, t }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">{t.inventoryTitle}</h1></div>
      <div className="p-20 text-center text-slate-500 text-sm font-medium">{t.loading}</div>
    </div>
  );
}

function DocumentArchiveView({ navigateTo, t }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">{t.documentsTitle}</h1></div>
      <div className="p-4"><div className="bg-slate-800 p-5 rounded-2xl flex items-center justify-between border border-slate-700 shadow-lg"><div className="flex items-center space-x-4"><FileText className="text-blue-400" size={32} /><div><h4 className="text-xs font-bold text-white leading-tight">Cessione_Pardalis_2026.pdf</h4><p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">14 Maggio 2026</p></div></div><Folder className="text-slate-600" size={20} /></div></div>
    </div>
  );
}

function ExpoHubView({ expoData, navigateTo, t, favorites, toggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  if (!expoData) return null;

  const expoListings = mockListings.filter(item => item.fiera === expoData.name && (item.species.toLowerCase().includes(searchTerm.toLowerCase()) || item.morph.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-5xl mx-auto w-full">
      <div className="p-5 border-b border-slate-800 bg-slate-800 sticky top-0 z-20 shadow-md">
        <button onClick={() => navigateTo('home')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600 mb-4 transition-colors"><ChevronLeft size={20} /></button>
        <div className="flex justify-between items-start">
          <div><h1 className="text-2xl font-black text-white leading-tight tracking-tight">{expoData.name}</h1><p className="text-xs text-slate-400 mt-1 flex items-center"><MapPin size={12} className="mr-1"/> {expoData.location} • {expoData.date}</p></div>
          {expoData.website && (<a href={expoData.website} target="_blank" rel="noreferrer" className="flex items-center text-[10px] font-bold text-blue-400 bg-blue-500/10 px-3 py-2 rounded-lg hover:bg-blue-500/20 transition-colors uppercase tracking-widest"><ExternalLink size={12} className="mr-1.5"/> {t.officialWebsite}</a>)}
        </div>
        <div className="mt-5 relative"><Search size={16} className="absolute left-4 top-3.5 text-slate-500" /><input type="text" placeholder={t.searchExpo} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-emerald-500 shadow-inner transition-colors" /></div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 hide-scrollbar pb-24">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center"><CheckCircle size={14} className="mr-1.5 text-emerald-400"/> {t.animalsAtExpo}</h3>
        {expoListings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {expoListings.map(item => (<ListingCard key={item.id} item={item} navigateTo={navigateTo} favorites={favorites} toggleFavorite={toggleFavorite} t={t} />))}
          </div>
        ) : (
          <div className="text-center bg-slate-800/50 border border-slate-700 border-dashed rounded-3xl p-10 mt-4"><h4 className="text-white font-bold mb-2">Nessun animale trovato</h4><p className="text-xs text-slate-400">Prova a cercare una specie diversa per questa fiera.</p></div>
        )}
      </div>
    </div>
  );
}

function LineageTrackerView({ navigateTo, t }) {
  const [calcResult, setCalcResult] = useState(null);
  const calculateGenetics = () => { setCalcResult([{ trait: "50% Lilly White", probability: "50" }, { trait: "50% Normal (Wild Type)", probability: "50" }]); };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">{t.lineageTitle}</h1></div>
      <div className="p-5 flex-1 overflow-y-auto hide-scrollbar pb-24 space-y-8">
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-1">I Tuoi Riproduttori</h3>
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-4 flex items-center space-x-4 shadow-lg">
            <div className="w-16 h-16 bg-slate-700 rounded-2xl overflow-hidden shadow-inner shrink-0"><img src="/images/ciliatus.jpg" className="w-full h-full object-cover" alt="" onError={(e) => { e.target.src = `https://placehold.co/200x200/0f172a/10b981?text=${t.realPhoto}` }} /></div>
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
            <button onClick={calculateGenetics} className="w-full bg-emerald-500 text-white font-black py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform tracking-wider uppercase text-xs mt-2">{t.calculate}</button>
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

function ReviewManagerView({ navigateTo, t }) {
  const [activeTab, setActiveTab] = useState('ricevute');

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">{t.reviewsTitle}</h1></div>
      
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
            <h3 className="text-white font-bold mb-2">{t.emptyReviews}</h3>
            <p className="text-slate-400 text-sm text-center max-w-[250px] mb-6">{t.emptyReviewsDesc}</p>
            <button className="bg-slate-800 text-slate-400 font-bold py-2.5 px-6 rounded-xl cursor-not-allowed border border-slate-700 border-dashed">Disponibile dopo acquisto</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsView({ navigateTo, t }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0 z-10"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white">{t.settingsTitle}</h1></div>
      <div className="p-5 space-y-8 flex-1 overflow-y-auto hide-scrollbar pb-24">
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-800 border border-blue-500/30 p-6 rounded-3xl shadow-xl">
          <h2 className="text-lg font-black text-white mb-2 flex items-center tracking-tight">OTTENI LA SPUNTA BLU <ShieldCheck size={22} className="ml-2 text-blue-400"/></h2>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">Aumenta la tua credibilità caricando la visura camerale o un documento d'identità valido.</p>
          <button className="w-full bg-blue-600 text-white text-xs font-black py-3.5 rounded-2xl shadow-lg hover:bg-blue-500 active:scale-95 transition-all uppercase tracking-widest">Inizia Verifica Identità</button>
        </div>
      </div>
    </div>
  );
}

function LegalGuideView({ navigateTo, t }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 max-w-3xl mx-auto w-full">
      <div className="p-4 border-b border-slate-800 flex items-center pt-6 bg-slate-800 sticky top-0"><button onClick={() => navigateTo('profile')} className="p-2 mr-3 bg-slate-700 rounded-full text-white hover:bg-slate-600"><ChevronLeft size={20} /></button><h1 className="text-lg font-black text-white tracking-tight">{t.legalTitle}</h1></div>
      <div className="p-5 space-y-6 overflow-y-auto flex-1 hide-scrollbar pb-24">
        <div className="bg-orange-500/10 p-5 rounded-3xl border border-orange-500/20 text-orange-200 text-xs leading-relaxed shadow-lg font-medium">
          <div className="flex items-center mb-3"><Info size={18} className="mr-2 text-orange-400 font-bold"/> <strong className="tracking-widest uppercase">AVVISO LEGALE</strong></div>
          Le leggi italiane (D.Lgs 135/2022) vietano la detenzione di specie pericolose (come vipere, crotali, grandi felini) e specie invasive UE. Inserire tali annunci comporterà il ban permanente dalla piattaforma e la segnalazione alle autorità competenti.
        </div>
      </div>
    </div>
  );
}