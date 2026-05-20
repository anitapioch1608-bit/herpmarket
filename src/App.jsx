import React, { useState, useMemo } from 'react';
import {
  Home, Search, PlusCircle, MessageCircle, User,
  ChevronRight, ChevronLeft, ShieldCheck, MapPin,
  Star, Calendar, SlidersHorizontal, FileText, CheckCircle,
  Camera, Heart, Mars, Venus, HelpCircle, X,
  ArrowUpDown, Lock, CreditCard, Info, Languages, Send,
  LogIn, LogOut, Globe, Truck, Scale,
  ListOrdered, Grid3x3, Settings as SettingsIcon, Mail,
  Clock, PackageCheck, Hourglass, Check
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
    sellerStorefront: "Negozio", sellerAnimals: "Animali", sellerReviews: "Recensioni", sellerAbout: "Info",
    sellerMemberSince: "Membro dal", sellerTotalSales: "Vendite totali", sellerSpecialties: "Specializzazioni",
    sellerAttendsExpos: "Partecipa alle fiere", sellerNoExpos: "Nessuna fiera in programma",
    sellerNoReviews: "Nessuna recensione ancora",
    reserveAtExpo: "Prenota per la fiera", payDeposit: "Paga acconto",
    reservationPending: "In attesa di approvazione…", reserved: "Riservato a te",
    // Transaction-flow keys
    txRequest: "Richiedi acquisto", txRequestExpo: "Richiedi prenotazione fiera",
    txPending: "Richiesta inviata · in attesa del venditore",
    txDeclined: "Il venditore ha rifiutato la richiesta",
    txApproved: "Approvato dal venditore",
    txPayDeposit: "Paga acconto", txPayFull: "Paga importo totale",
    txPaid: "Pagato · in attesa della consegna",
    txConfirmReceived: "Conferma di aver ricevuto l'esemplare",
    txWaitingBuyer: "In attesa che il venditore confermi la consegna",
    txWaitingSeller: "In attesa che il venditore confermi la consegna",
    txWaitingBuyerConfirm: "In attesa della tua conferma di ricezione",
    txCompleted: "Transazione completata", txViewDocument: "Visualizza documento",
    txCancel: "Annulla richiesta",
    txStatus: "Stato della transazione",
    txStepRequest: "Richiesta", txStepApproval: "Approvazione", txStepPayment: "Pagamento", txStepHandover: "Consegna", txStepComplete: "Completata",
    // Document strings
    docCitesTitle: "Dichiarazione di Cessione CITES",
    docOriginTitle: "Certificato di Origine",
    docSubtitle: "Generato da HerpMarket dopo la conferma di consegna",
    docBuyer: "Acquirente", docSellerLabel: "Venditore (Cedente)",
    docSpecies: "Specie", docMorph: "Morph / Tratti", docBirth: "Data di nascita",
    docSex: "Sesso", docDate: "Data della transazione", docId: "ID transazione",
    docDeclaration: "Dichiarazione",
    docDeclarationCites: "Il sottoscritto cedente dichiara di cedere l'esemplare di cui sopra, nato in cattività, all'acquirente indicato. La cessione avviene ai sensi del Reg. CE 338/97.",
    docDeclarationOrigin: "Il sottoscritto cedente dichiara di cedere l'esemplare di cui sopra, nato in cattività presso il proprio allevamento, all'acquirente indicato.",
    docSignSeller: "Firma del venditore", docSignBuyer: "Firma dell'acquirente",
    // Demo
    demoSimSeller: "Demo: simula venditore",
    demoApprove: "Approva", demoDecline: "Rifiuta", demoConfirmHandover: "Conferma consegna",
    description: "Descrizione", parentage: "Genealogia", sire: "Padre", dam: "Madre", unknown: "Sconosciuto",
    born: "Nato", weight: "Peso", origin: "Origine", captiveBred: "Nato in cattività",
    cites: "Documenti CITES", citesNotice: "Documento di cessione richiesto per Allegato A/B",
    listingTitle: "Titolo annuncio", uploadPhotos: "Carica foto (min. 3)", publishListing: "Pubblica annuncio",
    pickSpecies: "Seleziona specie", pickTraits: "Aggiungi tratti", describePlaceholder: "Carattere, alimentazione, condizioni di salute…",
    typeMessage: "Scrivi un messaggio…", onlineNow: "Online", translateIT: "Traduci in italiano",
    yourAccount: "Il tuo account", wishlist: "Preferiti", myListings: "I miei annunci", documents: "Archivio documenti", reviews: "Recensioni", settings: "Impostazioni", legalGuide: "Guida legale", logout: "Esci",
    inventory: "Inventario animali", lineage: "Genetica & Pedigree", transport: "Eco-Taxi (Trasporti)",
    aboutContact: "Chi siamo & Contatti", termsLegal: "Termini di servizio", settingsKyc: "Impostazioni & KYC",
    storePolicyLabel: "Regolamento marketplace",
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
    sellerStorefront: "Store", sellerAnimals: "Animals", sellerReviews: "Reviews", sellerAbout: "About",
    sellerMemberSince: "Member since", sellerTotalSales: "Total sales", sellerSpecialties: "Specialties",
    sellerAttendsExpos: "Attending expos", sellerNoExpos: "No upcoming expos",
    sellerNoReviews: "No reviews yet",
    reserveAtExpo: "Reserve for expo", payDeposit: "Pay deposit",
    reservationPending: "Awaiting approval…", reserved: "Reserved for you",
    // Transaction-flow keys
    txRequest: "Request to buy", txRequestExpo: "Request expo reservation",
    txPending: "Request sent · waiting for seller",
    txDeclined: "Seller declined the request",
    txApproved: "Approved by seller",
    txPayDeposit: "Pay deposit", txPayFull: "Pay full amount",
    txPaid: "Paid · awaiting handover",
    txConfirmReceived: "Confirm I received the animal",
    txWaitingBuyer: "Waiting for seller to confirm handover",
    txWaitingSeller: "Waiting for seller to confirm handover",
    txWaitingBuyerConfirm: "Waiting for your confirmation of receipt",
    txCompleted: "Transaction completed", txViewDocument: "View document",
    txCancel: "Cancel request",
    txStatus: "Transaction status",
    txStepRequest: "Request", txStepApproval: "Approval", txStepPayment: "Payment", txStepHandover: "Handover", txStepComplete: "Complete",
    // Document strings
    docCitesTitle: "CITES Transfer Declaration",
    docOriginTitle: "Certificate of Origin",
    docSubtitle: "Generated by HerpMarket after handover confirmation",
    docBuyer: "Buyer", docSellerLabel: "Seller (Transferor)",
    docSpecies: "Species", docMorph: "Morph / Traits", docBirth: "Date of birth",
    docSex: "Sex", docDate: "Transaction date", docId: "Transaction ID",
    docDeclaration: "Declaration",
    docDeclarationCites: "The undersigned transferor declares to transfer the above-described captive-bred specimen to the buyer indicated. This transfer is conducted under EU Regulation 338/97.",
    docDeclarationOrigin: "The undersigned transferor declares to transfer the above-described specimen, captive-bred in their own facility, to the buyer indicated.",
    docSignSeller: "Seller signature", docSignBuyer: "Buyer signature",
    // Demo
    demoSimSeller: "Demo: simulate seller",
    demoApprove: "Approve", demoDecline: "Decline", demoConfirmHandover: "Confirm handover",
    description: "Description", parentage: "Parentage", sire: "Sire", dam: "Dam", unknown: "Unknown",
    born: "Born", weight: "Weight", origin: "Origin", captiveBred: "Captive-bred",
    cites: "CITES paperwork", citesNotice: "Transfer document required for Annex A/B",
    listingTitle: "Listing title", uploadPhotos: "Upload photos (min. 3)", publishListing: "Publish listing",
    pickSpecies: "Select species", pickTraits: "Add traits", describePlaceholder: "Temperament, feeding, health…",
    typeMessage: "Type a message…", onlineNow: "Online", translateIT: "Translate to Italian",
    yourAccount: "Your account", wishlist: "Saved", myListings: "My listings", documents: "Documents", reviews: "Reviews", settings: "Settings", legalGuide: "Legal guide", logout: "Sign out",
    inventory: "Animal inventory", lineage: "Genetics & Pedigree", transport: "Eco-Taxi (Transport)",
    aboutContact: "About us & Contact", termsLegal: "Terms of service", settingsKyc: "Settings & KYC",
    storePolicyLabel: "Marketplace policy",
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

/* ───── Trait class colors (MorphMarket-aligned taxonomy) ────────────
   Inheritance modes used widely in the herp hobby:
   - recessive: visual only when homozygous (both copies). Visible 'het' carrier looks normal.
   - dominant:  visual with one or two copies, no different "super" form (e.g. Spider, Pinstripe).
   - incDom:    incomplete-dominant / co-dom — heterozygous AND homozygous both visual, distinct
                (e.g. Mojave, Pastel, Lilly White; the homozygous form is called the "super").
   - line:      line-bred / polygenic — heritable but no single Mendelian locus
                (e.g. Tangerine, Red, Flame, Pinstripe in cresties).
   - locality:  geographic locale, not a true morph (e.g. Ambilobe panther chameleons).
   - het:       visible carrier — animal looks normal but carries one copy of a recessive.
   - wild:      wild-type / non-mutated.                                                       */
const TRAIT_CLASS = {
  recessive: { bg: "bg-amber-500/15",  text: "text-amber-300",  ring: "ring-amber-500/30",  dot: "bg-amber-400",  label: "Recessivo" },
  dominant:  { bg: "bg-rose-500/15",   text: "text-rose-300",   ring: "ring-rose-500/30",   dot: "bg-rose-400",   label: "Dominante" },
  incDom:    { bg: "bg-sky-500/15",    text: "text-sky-300",    ring: "ring-sky-500/30",    dot: "bg-sky-400",    label: "Co-dom" },
  line:      { bg: "bg-violet-500/15", text: "text-violet-300", ring: "ring-violet-500/30", dot: "bg-violet-400", label: "Linea" },
  locality:  { bg: "bg-emerald-500/15",text: "text-emerald-300",ring: "ring-emerald-500/30",dot: "bg-emerald-400",label: "Località" },
  het:       { bg: "bg-stone-700/40",  text: "text-stone-300",  ring: "ring-stone-600/40",  dot: "bg-stone-400",  label: "Het" },
  wild:      { bg: "bg-stone-500/15",  text: "text-stone-300",  ring: "ring-stone-500/30",  dot: "bg-stone-400",  label: "Wild" },
};

/* ───── Per-species trait library (used by sell form trait picker) ────
   Curated from MorphMarket's Morphpedia taxonomy. Not exhaustive — covers
   the most commonly traded morphs. Sellers can also type free-text.       */
const SPECIES_TRAITS = {
  // ── Geckos ──────────────────────────────────────────────────────────
  "Correlophus ciliatus": [
    { name: "Lilly White",    cls: "incDom"    },
    { name: "Axanthic",       cls: "recessive" },
    { name: "Frappuccino",    cls: "recessive" },
    { name: "Cappuccino",     cls: "recessive" },
    { name: "Patternless",    cls: "recessive" },
    { name: "Harlequin",      cls: "line"      },
    { name: "Extreme Harlequin", cls: "line"   },
    { name: "Pinstripe",      cls: "line"      },
    { name: "Flame",          cls: "line"      },
    { name: "Dalmatian",      cls: "line"      },
    { name: "Phantom",        cls: "line"      },
    { name: "Tricolor",       cls: "line"      },
  ],
  "Eublepharis macularius": [
    { name: "Tremper Albino", cls: "recessive" },
    { name: "Bell Albino",    cls: "recessive" },
    { name: "Rainwater Albino", cls: "recessive" },
    { name: "Eclipse",        cls: "recessive" },
    { name: "Blizzard",       cls: "recessive" },
    { name: "Murphy Patternless", cls: "recessive" },
    { name: "Mack Snow",      cls: "incDom"    },
    { name: "Super Snow",     cls: "incDom"    },
    { name: "Enigma",         cls: "dominant"  },
    { name: "White & Yellow", cls: "incDom"    },
    { name: "Tangerine",      cls: "line"      },
    { name: "Bold Stripe",    cls: "line"      },
    { name: "Black Night",    cls: "line"      },
    { name: "Stealth",        cls: "line"      },
  ],
  "Rhacodactylus auriculatus": [
    { name: "Red Stripe",     cls: "line"      },
    { name: "Reticulated",    cls: "line"      },
    { name: "Banded",         cls: "line"      },
    { name: "Orange",         cls: "line"      },
  ],
  "Phelsuma grandis": [
    { name: "High Red",       cls: "line"      },
    { name: "Crimson",        cls: "line"      },
    { name: "Blue Blood",     cls: "line"      },
  ],
  // ── Snakes ──────────────────────────────────────────────────────────
  "Python regius": [
    { name: "Pastel",         cls: "incDom"    },
    { name: "Mojave",         cls: "incDom"    },
    { name: "Lesser",         cls: "incDom"    },
    { name: "Butter",         cls: "incDom"    },
    { name: "Banana",         cls: "incDom"    },
    { name: "Coral Glow",     cls: "incDom"    },
    { name: "Cinnamon",       cls: "incDom"    },
    { name: "Black Pastel",   cls: "incDom"    },
    { name: "Enchi",          cls: "incDom"    },
    { name: "GHI",            cls: "incDom"    },
    { name: "Yellow Belly",   cls: "incDom"    },
    { name: "Spider",         cls: "dominant"  },
    { name: "Pinstripe",      cls: "dominant"  },
    { name: "Albino",         cls: "recessive" },
    { name: "Piebald",        cls: "recessive" },
    { name: "Clown",          cls: "recessive" },
    { name: "Axanthic",       cls: "recessive" },
    { name: "Desert Ghost",   cls: "recessive" },
    { name: "Ultramel",       cls: "recessive" },
    { name: "het Piebald",    cls: "het"       },
    { name: "het Clown",      cls: "het"       },
    { name: "het Albino",     cls: "het"       },
  ],
  "Pantherophis guttatus": [
    { name: "Amelanistic",    cls: "recessive" },
    { name: "Anery",          cls: "recessive" },
    { name: "Hypo",           cls: "recessive" },
    { name: "Lavender",       cls: "recessive" },
    { name: "Caramel",        cls: "recessive" },
    { name: "Motley",         cls: "recessive" },
    { name: "Stripe",         cls: "recessive" },
    { name: "Bloodred",       cls: "recessive" },
    { name: "Diffused",       cls: "recessive" },
    { name: "Tessera",        cls: "dominant"  },
    { name: "Palmetto",       cls: "recessive" },
    { name: "Sunkissed",      cls: "recessive" },
    { name: "Scaleless",      cls: "recessive" },
  ],
  "Heterodon nasicus": [
    { name: "Albino",         cls: "recessive" },
    { name: "Axanthic",       cls: "recessive" },
    { name: "Toffee",         cls: "recessive" },
    { name: "Lavender",       cls: "recessive" },
    { name: "Sable",          cls: "recessive" },
    { name: "Snow",           cls: "recessive" },
    { name: "Conda",          cls: "incDom"    },
    { name: "Arctic",         cls: "incDom"    },
    { name: "Pistachio",      cls: "incDom"    },
    { name: "Anaconda",       cls: "incDom"    },
    { name: "Super Arctic",   cls: "incDom"    },
    { name: "het Albino",     cls: "het"       },
    { name: "het Axanthic",   cls: "het"       },
  ],
  "Boa constrictor": [
    { name: "Hypo",           cls: "incDom"    },
    { name: "Sunglow",        cls: "incDom"    },
    { name: "Salmon",         cls: "incDom"    },
    { name: "Albino",         cls: "recessive" },
    { name: "Anery",          cls: "recessive" },
    { name: "Sharp Albino",   cls: "recessive" },
    { name: "Motley",         cls: "incDom"    },
    { name: "Jungle",         cls: "incDom"    },
    { name: "IMG (Leopard)",  cls: "incDom"    },
  ],
  "Lampropeltis": [
    { name: "Albino",         cls: "recessive" },
    { name: "Hypo",           cls: "recessive" },
    { name: "Ghost",          cls: "recessive" },
    { name: "Lavender",       cls: "recessive" },
  ],
  // ── Lizards ─────────────────────────────────────────────────────────
  "Pogona vitticeps": [
    { name: "Hypo",           cls: "recessive" },
    { name: "Translucent",    cls: "recessive" },
    { name: "Zero",           cls: "recessive" },
    { name: "Witblits",       cls: "recessive" },
    { name: "Wero",           cls: "recessive" },
    { name: "Leatherback",    cls: "incDom"    },
    { name: "Silkback",       cls: "incDom"    },
    { name: "Dunner",         cls: "dominant"  },
    { name: "Paradox",        cls: "line"      },
    { name: "Red",            cls: "line"      },
    { name: "Citrus",         cls: "line"      },
    { name: "Orange",         cls: "line"      },
    { name: "Hypo Zero",      cls: "recessive" },
  ],
  "Tiliqua scincoides": [
    { name: "Northern",       cls: "locality"  },
    { name: "Eastern",        cls: "locality"  },
    { name: "Irian Jaya",     cls: "locality"  },
    { name: "Halmahera",      cls: "locality"  },
    { name: "Tanimbar",       cls: "locality"  },
    { name: "Hypo",           cls: "recessive" },
    { name: "Albino",         cls: "recessive" },
  ],
  // ── Chameleons (locality-based, no true morphs) ─────────────────────
  "Furcifer pardalis": [
    { name: "Ambilobe",       cls: "locality"  },
    { name: "Ambanja",        cls: "locality"  },
    { name: "Nosy Be",        cls: "locality"  },
    { name: "Nosy Faly",      cls: "locality"  },
    { name: "Nosy Mitsio",    cls: "locality"  },
    { name: "Sambava",        cls: "locality"  },
    { name: "Tamatave",       cls: "locality"  },
    { name: "Diego Suarez",   cls: "locality"  },
    { name: "Maroantsetra",   cls: "locality"  },
    { name: "Blue Bar",       cls: "line"      },
    { name: "Red Bar",        cls: "line"      },
  ],
  "Chamaeleo calyptratus": [
    { name: "Translucent",    cls: "recessive" },
    { name: "Piebald",        cls: "recessive" },
    { name: "High Color",     cls: "line"      },
  ],
  // ── Tortoises (subspecies + CB year) ────────────────────────────────
  "Testudo hermanni": [
    { name: "hermanni hermanni", cls: "locality" },
    { name: "hermanni boettgeri", cls: "locality" },
  ],
  "Testudo graeca": [
    { name: "ibera",          cls: "locality"  },
    { name: "terrestris",     cls: "locality"  },
  ],
};

/* ───── Categories (counts driven by mock listings; placeholders here) ── */
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
    traits: [{ name: "Lilly White", cls: "incDom" }, { name: "Harlequin", cls: "line" }],
    price: 180, deposit: 18, sex: "F", ageMonths: 14, weight: "38g",
    region: "Piemonte", city: "Torino", distanceKm: 8,
    seller: "Piedmont Geckos", verified: true, rating: 4.9, reviews: 47,
    image: IMG.crested, category: "geckos", expoId: 1,
    sire: "Axanthic Lilly White", dam: "Red Harlequin",
    desc: "Esemplare nato in casa, alimentazione a base di Pangea e insetti vivi. Carattere molto docile, abituata alla manipolazione."
  },
  {
    id: 2, species: "Furcifer pardalis", common: "Camaleonte pantera",
    traits: [{ name: "Ambilobe", cls: "locality" }, { name: "Blue Bar", cls: "line" }],
    price: 320, deposit: 32, sex: "M", ageMonths: 8, weight: "82g",
    region: "Lombardia", city: "Milano", distanceKm: 0,
    seller: "ExoBreed Italia", verified: true, rating: 4.8, reviews: 62,
    image: IMG.panther, category: "chameleons", expoId: 1,
    sire: "Ambilobe Blue Bar", dam: "Ambilobe Red Bar",
    desc: "Maschio dai colori spettacolari, in piena salute. CITES Allegato B completo."
  },
  {
    id: 3, species: "Eublepharis macularius", common: "Geco leopardino",
    traits: [{ name: "Tremper Albino", cls: "recessive" }, { name: "het Eclipse", cls: "het" }],
    price: 75, deposit: 8, sex: "U", ageMonths: 3, weight: "16g",
    region: "Campania", city: "Napoli", distanceKm: 720,
    seller: "LeoMorphs Campania", verified: true, rating: 4.7, reviews: 38,
    image: IMG.leopard, category: "geckos", expoId: null,
    sire: "Tremper Albino", dam: "het Tremper het Eclipse",
    desc: "Cucciolo svezzato, mangia camole e tarme regolarmente."
  },
  {
    id: 4, species: "Python regius", common: "Pitone reale",
    traits: [{ name: "Banana", cls: "incDom" }, { name: "Pastel", cls: "incDom" }, { name: "Clown", cls: "recessive" }],
    price: 240, deposit: 24, sex: "M", ageMonths: 5, weight: "180g",
    region: "Veneto", city: "Verona", distanceKm: 145,
    seller: "Veneto Royals", verified: true, rating: 4.9, reviews: 91,
    image: IMG.ball, category: "snakes", expoId: 1,
    sire: "Banana Pastel", dam: "Clown",
    desc: "Mangia regolarmente topi decongelati. Tre mute completate."
  },
  {
    id: 5, species: "Pogona vitticeps", common: "Pogona",
    traits: [{ name: "Hypo Zero", cls: "recessive" }, { name: "Leatherback", cls: "incDom" }],
    price: 160, deposit: 16, sex: "P", ageMonths: 4, weight: "45g",
    region: "Piemonte", city: "Cuneo", distanceKm: 95,
    seller: "DragoMania Piemonte", verified: false, rating: 4.4, reviews: 18,
    image: IMG.beardie, category: "lizards", expoId: 2,
    sire: null, dam: null,
    desc: "Coppia giovane, ottimi mangiatori. Pronti per nuovo terrario."
  },
  {
    id: 6, species: "Testudo hermanni", common: "Testuggine di Hermann",
    traits: [{ name: "hermanni boettgeri", cls: "locality" }, { name: "CB 2024", cls: "wild" }],
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
    traits: [{ name: "Albino", cls: "recessive" }, { name: "Conda", cls: "incDom" }],
    price: 280, deposit: 28, sex: "M", ageMonths: 4, weight: "32g",
    region: "Piemonte", city: "Asti", distanceKm: 55,
    seller: "Piedmont Geckos", verified: true, rating: 4.9, reviews: 47,
    image: IMG.hognose, category: "snakes", expoId: 1,
    sire: "Albino Conda", dam: "het Albino Conda",
    desc: "Mangia regolarmente in pinzetta. Carattere tipico hognose."
  },
];

/* EXPOS — comprehensive 2026 European reptile expo calendar.
   Sorted by ISO date. The `getUpcomingExpos()` helper below filters
   past expos and returns them in chronological order. IDs 1-3 are
   stable references kept for existing seller/listing data. New IDs
   continue from 4+. */
const EXPOS = [
  // ── Italian fairs ────────────────────────────────────────────────
  {
    id: 1, name: "Verona Reptiles · Autunno", location: "Cerea (VR)",
    date: "ott 2026", dateISO: "2026-10-04", color: "from-orange-700 to-amber-600",
    description: "La più grande fiera di animali esotici d'Europa. Edizione autunnale presso l'Area Exp di Cerea, 800+ spazi espositivi e 300 espositori da tutta Europa.",
    website: "https://www.veronareptiles.it",
    venue: "Area Exp · Via Libertà, 57", country: "IT",
  },
  {
    id: 2, name: "Squamata", location: "Ozzano dell'Emilia (BO)",
    date: "21 giu 2026", dateISO: "2026-06-21", color: "from-emerald-700 to-teal-600",
    description: "Mostra mercato di terraristica nata nel 2006. Punto d'incontro per appassionati italiani al Palagira di Ozzano.",
    website: "https://www.squamata.it",
    venue: "Palagira · Viale 2 Giugno, 3", country: "IT",
  },
  {
    id: 3, name: "Esotika Pet Show · Arezzo", location: "Arezzo",
    date: "12-13 set 2026", dateISO: "2026-09-12", color: "from-sky-700 to-cyan-600",
    description: "Tappa aretina del circuito Esotika, salone internazionale degli animali esotici.",
    website: "https://www.esotikapetshow.it",
    venue: "Arezzo Fiere e Congressi", country: "IT",
  },
  {
    id: 4, name: "Esotika Pet Show · Bastia Umbra", location: "Bastia Umbra (PG)",
    date: "30-31 mag 2026", dateISO: "2026-05-30", color: "from-sky-700 to-cyan-600",
    description: "Tappa umbra del circuito Esotika presso il polo fieristico di Umbriafiere.",
    website: "https://www.esotikapetshow.it",
    venue: "Umbriafiere", country: "IT",
  },
  {
    id: 5, name: "Esotika Pet Show · Erba", location: "Erba (CO)",
    date: "5-6 set 2026", dateISO: "2026-09-05", color: "from-sky-700 to-cyan-600",
    description: "Tappa lombarda del circuito Esotika a Lariofiere.",
    website: "https://www.esotikapetshow.it",
    venue: "Lariofiere", country: "IT",
  },
  {
    id: 6, name: "Esotika Pet Show · Marina di Carrara", location: "Marina di Carrara (MS)",
    date: "26-27 set 2026", dateISO: "2026-09-26", color: "from-sky-700 to-cyan-600",
    description: "Tappa toscana del circuito Esotika a CarraraFiere.",
    website: "https://www.esotikapetshow.it",
    venue: "CarraraFiere", country: "IT",
  },
  {
    id: 7, name: "Esotika Pet Show · Brescia", location: "Brescia",
    date: "10-11 ott 2026", dateISO: "2026-10-10", color: "from-sky-700 to-cyan-600",
    description: "Tappa bresciana del circuito Esotika al Brixia Forum.",
    website: "https://www.esotikapetshow.it",
    venue: "Brixia Forum", country: "IT",
  },
  {
    id: 8, name: "Esotika Pet Show · Casale Monferrato", location: "Casale Monferrato (AL)",
    date: "17-18 ott 2026", dateISO: "2026-10-17", color: "from-sky-700 to-cyan-600",
    description: "Tappa piemontese del circuito Esotika.",
    website: "https://www.esotikapetshow.it",
    venue: "Centro Polifunzionale Riccardo Coppo", country: "IT",
  },
  {
    id: 9, name: "Esotika Pet Show · Busto Arsizio", location: "Busto Arsizio (VA)",
    date: "7-8 nov 2026", dateISO: "2026-11-07", color: "from-sky-700 to-cyan-600",
    description: "Tappa varesotta del circuito Esotika a Malpensa Fiere.",
    website: "https://www.esotikapetshow.it",
    venue: "Malpensa Fiere", country: "IT",
  },
  {
    id: 10, name: "Reptilius · Forlì", location: "Forlì (FC)",
    date: "10-11 ott 2026", dateISO: "2026-10-10", color: "from-rose-700 to-pink-600",
    description: "Reptilius all'interno della manifestazione Animali in Fiera presso la Fiera di Forlì.",
    website: "https://www.fieraavicola.com",
    venue: "Fiera di Forlì", country: "IT",
  },
  // ── European fairs ────────────────────────────────────────────────
  {
    id: 11, name: "Terraristika Hamm · Estate", location: "Hamm",
    date: "13 giu 2026", dateISO: "2026-06-13", color: "from-slate-700 to-zinc-600",
    description: "Il più grande evento mondiale per animali da terrario. Quattro edizioni l'anno presso le Zentralhallen di Hamm.",
    website: "https://www.terraristika.de",
    venue: "Zentralhallen Hamm · Ökonomierat-Peitzmeier-Platz 2", country: "DE",
  },
  {
    id: 12, name: "Terraristika Hamm · Autunno", location: "Hamm",
    date: "12 set 2026", dateISO: "2026-09-12", color: "from-slate-700 to-zinc-600",
    description: "Edizione autunnale della più grande fiera mondiale di terraristica.",
    website: "https://www.terraristika.de",
    venue: "Zentralhallen Hamm", country: "DE",
  },
  {
    id: 13, name: "Terraristika Hamm · Inverno", location: "Hamm",
    date: "12 dic 2026", dateISO: "2026-12-12", color: "from-slate-700 to-zinc-600",
    description: "Edizione invernale di Terraristika a Hamm.",
    website: "https://www.terraristika.de",
    venue: "Zentralhallen Hamm", country: "DE",
  },
  {
    id: 14, name: "Terraria Houten · Autunno", location: "Houten",
    date: "20 set 2026", dateISO: "2026-09-20", color: "from-blue-700 to-indigo-600",
    description: "Grande fiera di rettili e anfibi nei Paesi Bassi, organizzata da VHM Events presso l'Expo Houten.",
    website: "https://vhm-events.com",
    venue: "Expo Houten · Meidoornkade 24", country: "NL",
  },
  {
    id: 15, name: "Terrabörsen Karlsruhe", location: "Wörth am Rhein",
    date: "4 lug 2026", dateISO: "2026-07-04", color: "from-stone-700 to-stone-600",
    description: "Fiera specializzata per rettili, anfibi, invertebrati e accessori da terrario.",
    website: "https://www.terraboersen.de",
    venue: "Bienwaldhalle Wörth am Rhein", country: "DE",
  },
];

/* Returns expos with dateISO >= today, sorted by date ascending */
function getUpcomingExpos(allExpos = EXPOS, todayISO = new Date().toISOString().slice(0, 10)) {
  return allExpos
    .filter(e => e.dateISO >= todayISO)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

const SELLERS = {
  "Piedmont Geckos": {
    name: "Piedmont Geckos", region: "Piemonte", city: "Torino", verified: true,
    memberSince: "2021", totalSales: 287, rating: 4.9, reviewCount: 47,
    specialties: ["Correlophus ciliatus", "Heterodon nasicus", "Eublepharis macularius"],
    expoIds: [1, 2],
    bioIt: "Allevamento amatoriale specializzato in gechi crestati morph ad alta qualità e hognose albini. Nato nel 2021 come progetto familiare, oggi conta oltre 80 esemplari riproduttori in struttura dedicata.",
    bioEn: "Amateur breeding focused on high-end crested gecko morphs and albino hognose snakes. Started in 2021 as a family project, now home to 80+ breeder animals in a dedicated facility.",
    reviews: [
      { buyer: "Marco T.", rating: 5, date: "03/2026", text: "Esemplare in forma perfetta, ritirato in fiera a Verona. Allevatore molto disponibile e preparato." },
      { buyer: "Sara B.", rating: 5, date: "02/2026", text: "Imballaggio impeccabile per il trasporto. Geco arrivato perfetto e già abituato al cibo." },
      { buyer: "Luca D.", rating: 4, date: "01/2026", text: "Tutto regolare, comunicazione un po' lenta ma risultato ottimo." },
    ],
  },
  "ExoBreed Italia": {
    name: "ExoBreed Italia", region: "Lombardia", city: "Milano", verified: true,
    memberSince: "2019", totalSales: 412, rating: 4.8, reviewCount: 62,
    specialties: ["Furcifer pardalis", "Chamaeleo calyptratus"],
    expoIds: [1],
    bioIt: "Allevamento professionale di camaleonti pantera con linee Ambilobe, Ambanja e Nosy Be. Tutti gli esemplari sono nati in cattività con documentazione CITES completa.",
    bioEn: "Professional panther chameleon breeder working with Ambilobe, Ambanja and Nosy Be locales. All animals are captive-bred with full CITES documentation.",
    reviews: [
      { buyer: "Paolo M.", rating: 5, date: "04/2026", text: "Camaleonte stupendo, colori esattamente come nelle foto. CITES Allegato B perfetto." },
      { buyer: "Elena R.", rating: 5, date: "03/2026", text: "Professionali e seri. Consiglio anche ai principianti." },
    ],
  },
  "LeoMorphs Campania": {
    name: "LeoMorphs Campania", region: "Campania", city: "Napoli", verified: true,
    memberSince: "2022", totalSales: 156, rating: 4.7, reviewCount: 38,
    specialties: ["Eublepharis macularius"],
    expoIds: [2, 3],
    bioIt: "Specializzati esclusivamente in gechi leopardini. Lavoriamo con linee Tremper, Bell, Eclipse e combinazioni recessive.",
    bioEn: "Exclusively focused on leopard geckos. We work with Tremper, Bell, Eclipse lines and recessive combinations.",
    reviews: [
      { buyer: "Andrea V.", rating: 5, date: "02/2026", text: "Genetica chiara e ben documentata. Ottimo allevatore." },
    ],
  },
  "Veneto Royals": {
    name: "Veneto Royals", region: "Veneto", city: "Verona", verified: true,
    memberSince: "2020", totalSales: 523, rating: 4.9, reviewCount: 91,
    specialties: ["Python regius"],
    expoIds: [1, 2],
    bioIt: "Uno dei maggiori allevamenti italiani di pitone reale. Oltre 200 morph diversi in stock, dalla genetica base alle combinazioni più rare.",
    bioEn: "One of Italy's largest ball python breeders. Over 200 different morphs in stock, from baseline genetics to rare combinations.",
    reviews: [
      { buyer: "Stefano L.", rating: 5, date: "04/2026", text: "Pitone arrivato in salute perfetta, già mangia in pinzetta. Veramente professionali." },
      { buyer: "Davide G.", rating: 5, date: "03/2026", text: "Quinto acquisto da loro, sempre top." },
    ],
  },
  "DragoMania Piemonte": {
    name: "DragoMania Piemonte", region: "Piemonte", city: "Cuneo", verified: false,
    memberSince: "2024", totalSales: 34, rating: 4.4, reviewCount: 18,
    specialties: ["Pogona vitticeps"],
    expoIds: [],
    bioIt: "Piccolo allevamento amatoriale di pogona vitticeps morph. Vendita preferibilmente con ritiro a mano.",
    bioEn: "Small amateur breeder of bearded dragon morphs. Prefer in-person pickup.",
    reviews: [
      { buyer: "Giovanni P.", rating: 4, date: "01/2026", text: "Animale in salute, allevatore disponibile per consigli." },
    ],
  },
  "Testudo Toscana": {
    name: "Testudo Toscana", region: "Toscana", city: "Firenze", verified: true,
    memberSince: "2018", totalSales: 89, rating: 5.0, reviewCount: 24,
    specialties: ["Testudo hermanni", "Testudo graeca"],
    expoIds: [3],
    bioIt: "Allevamento ufficialmente registrato di testuggini di Hermann e graeca. Tutti gli esemplari sono nati in cattività con CITES Allegato A individuale.",
    bioEn: "Officially registered Hermann's and Greek tortoise breeder. All animals captive-bred with individual CITES Annex A certificates.",
    reviews: [
      { buyer: "Maria F.", rating: 5, date: "05/2026", text: "Documentazione CITES perfetta, microchip già inserito. Allevatore serissimo." },
    ],
  },
  "Snake Italia BG": {
    name: "Snake Italia BG", region: "Lombardia", city: "Bergamo", verified: true,
    memberSince: "2020", totalSales: 178, rating: 4.6, reviewCount: 33,
    specialties: ["Pantherophis guttatus", "Lampropeltis"],
    expoIds: [2],
    bioIt: "Allevamento dedicato a serpenti del grano e re. Lavoriamo principalmente con morph recessive e combo.",
    bioEn: "Focused on corn snakes and king snakes. We mainly work with recessive morphs and combos.",
    reviews: [
      { buyer: "Roberto S.", rating: 5, date: "03/2026", text: "Animale arrivato perfetto. Risposta veloce ai messaggi." },
    ],
  },
};

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
  // When the user taps Search from the nav, start with a clean slate.
  // Category tiles, "see all" links and similar entry points should call go("search") directly
  // to preserve the filter they just set.
  const goToSearchFresh = () => {
    setFilter({ category: null, sex: null, region: null, sort: "newest", search: "" });
    go("search");
  };
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
      case "search":    return <SearchScreen initialState={viewData} {...props} />;
      case "detail":    return <Detail listing={viewData} {...props} />;
      case "expo":      return <ExpoDetail expo={viewData} {...props} />;
      case "seller":    return <SellerProfile sellerName={viewData} {...props} />;
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
      case "storepolicy": return <StorePolicy {...props} />;
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
          <SideBtn icon={<Search size={18} />} label={t.search} active={view === "search"}  onClick={goToSearchFresh} />
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
          <TabBtn icon={<Search size={20} />} label={t.search} active={view === "search"} onClick={goToSearchFresh} />
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

        {/* Seller chip — clickable, opens storefront */}
        <button
          onClick={(e) => { e.stopPropagation(); go("seller", item.seller); }}
          className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-amber-300 transition-colors -ml-0.5 self-start max-w-full"
        >
          <Star size={9} fill="currentColor" className="text-amber-400 shrink-0" />
          <span className="font-bold text-stone-300 group-hover:text-amber-300 transition-colors">{item.rating}</span>
          <span className="truncate underline decoration-stone-700 underline-offset-2 hover:decoration-amber-400">{item.seller}</span>
        </button>

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
function Home_({ t, lang, setLang, go, favorites, toggleFav, filter, setFilter }) {
  const userRegion = "Piemonte";
  const near = LISTINGS.filter(l => l.region === userRegion);
  const all = LISTINGS;
  const [showAllExpos, setShowAllExpos] = useState(false);

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
            <button key={c.id}
                    onClick={() => {
                      setFilter({ ...filter, category: c.id });
                      go("search");
                    }}
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
          <button onClick={() => setShowAllExpos(true)}
                  className="text-[11px] text-amber-400 font-bold hover:underline">
            {lang === "it" ? "Vedi tutte" : "See all"} ({getUpcomingExpos().length}) →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {getUpcomingExpos().slice(0, 3).map((expo, i) => {
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
                  <MapPin size={11} />{expo.location} {expo.country !== "IT" && <span className="text-[9px] uppercase font-black ml-1 bg-white/20 px-1.5 py-0.5 rounded">{expo.country}</span>}
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

      {/* All-expos modal */}
      {showAllExpos && (
        <AllExposModal onClose={() => setShowAllExpos(false)} go={go} t={t} lang={lang} />
      )}
    </div>
  );
}

/* Modal listing every upcoming expo in chronological order, grouped by month */
function AllExposModal({ onClose, go, t, lang }) {
  const upcoming = getUpcomingExpos();
  // Group by year-month for nicer reading
  const groups = {};
  upcoming.forEach(e => {
    const key = e.dateISO.slice(0, 7); // YYYY-MM
    (groups[key] ||= []).push(e);
  });
  const monthNames = lang === "it"
    ? ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthFull = lang === "it"
    ? ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-stone-950/80 backdrop-blur-sm" onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
           className="w-full md:max-w-2xl bg-stone-900 ring-1 ring-stone-800 rounded-t-3xl md:rounded-2xl max-h-[88vh] flex flex-col anim-up">
        <header className="flex items-center justify-between px-5 py-4 border-b border-stone-800">
          <div>
            <h2 className="font-display text-lg text-stone-50 leading-tight">
              {lang === "it" ? "Tutte le fiere in programma" : "All upcoming expos"}
            </h2>
            <p className="text-[11px] text-stone-500">{upcoming.length} {lang === "it" ? "fiere · Italia & Europa" : "expos · Italy & Europe"}</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-100"><X size={20} /></button>
        </header>
        <div className="overflow-y-auto hide-scrollbar p-5 space-y-6">
          {Object.keys(groups).sort().map(monthKey => {
            const [yr, mo] = monthKey.split("-");
            return (
              <div key={monthKey}>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3 sticky top-0 bg-stone-900 py-1">
                  {monthFull[parseInt(mo, 10) - 1]} {yr}
                </div>
                <div className="space-y-2">
                  {groups[monthKey].map(expo => (
                    <button key={expo.id}
                            onClick={() => { onClose(); go("expo", expo); }}
                            className={`w-full bg-gradient-to-r ${expo.color} rounded-xl p-3 flex items-center gap-3 text-left hover:scale-[1.01] transition-transform group`}>
                      <div className="bg-black/30 backdrop-blur rounded-lg px-2.5 py-1.5 text-center shrink-0 min-w-[58px]">
                        <div className="text-[9px] uppercase tracking-widest text-white/70 font-bold leading-none">{monthNames[parseInt(expo.dateISO.slice(5, 7), 10) - 1]}</div>
                        <div className="font-display text-lg text-white leading-none mt-0.5">{expo.dateISO.slice(8, 10)}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm leading-tight truncate">{expo.name}</div>
                        <div className="flex items-center gap-1.5 text-white/80 text-[11px] mt-0.5">
                          <MapPin size={10} className="shrink-0" />
                          <span className="truncate">{expo.location}</span>
                          {expo.country !== "IT" && <span className="text-[9px] uppercase font-black bg-white/20 px-1.5 py-0.5 rounded">{expo.country}</span>}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SEARCH — filters drawer + grid (the real MorphMarket workhorse)
   ═════════════════════════════════════════════════════════════════ */
function SearchScreen({ t, lang, go, favorites, toggleFav, filter, setFilter, initialState }) {
  const [showFilters, setShowFilters] = useState(initialState?.openFilters || false);
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
   DETAIL — proper transaction state machine
   Flow: idle → requested → approved | declined → paid →
         handover_pending (with sellerHandover & buyerHandover flags) →
         completed → document generated
   ═════════════════════════════════════════════════════════════════ */
function Detail({ listing, go, t, favorites, toggleFav, user, requireAuth, lang }) {
  // Single state machine. Possible values:
  // "idle" | "requested" | "approved" | "declined" | "paid" | "handover" | "completed"
  const [txState, setTxState] = useState("idle");
  const [sellerHandover, setSellerHandover] = useState(false);
  const [buyerHandover, setBuyerHandover] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showDocument, setShowDocument] = useState(false);

  if (!listing) return null;
  const a = listing;
  const expo = a.expoId ? EXPOS.find(e => e.id === a.expoId) : null;
  // Expo-eligible animals can be reserved for pickup (deposit). Others pay full price.
  const isExpoFlow = !!expo;
  const paymentAmount = isExpoFlow ? a.deposit : a.price;
  // CITES required for Annex A (tortoises) and many Annex B (chameleons, large pythons etc.)
  const requiresCITES = a.category === "tortoises" || a.category === "chameleons";

  /* ─── Buyer actions ─── */
  const handleRequest = () => {
    if (!requireAuth(t.loginToReserve, () => {})) return;
    setTxState("requested");
  };
  const handleCancelRequest = () => setTxState("idle");
  const handlePay = () => setShowCheckout(true);
  const handleBuyerConfirmHandover = () => {
    setBuyerHandover(true);
    // If seller already confirmed, complete the transaction
    if (sellerHandover) setTxState("completed");
  };

  /* ─── Demo: simulate seller-side actions ─── */
  const demoSellerApprove  = () => setTxState("approved");
  const demoSellerDecline  = () => setTxState("declined");
  const demoSellerHandover = () => {
    setSellerHandover(true);
    if (buyerHandover) setTxState("completed");
  };

  /* ─── When entering "handover" stage (after payment), enable handover-confirmation UI ─── */
  // The state machine has a single source of truth: txState.
  // Handover stage uses the two booleans below; when both are true → completed.

  const handleMessage = () => {
    requireAuth(t.loginToMessage, () => go("thread", { id: 99, listing: a, lastMsg: "", time: "" }));
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-40 md:pb-32">
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
        <div className="flex flex-wrap gap-1.5 mt-4">
          {a.traits.map((tr, i) => <TraitChip key={i} trait={tr} size="sm" />)}
        </div>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-display font-bold text-4xl text-stone-50">{formatPrice(a.price)}</span>
          {isExpoFlow && <span className="text-xs text-stone-500">· {t.payDeposit.toLowerCase()} {formatPrice(a.deposit)}</span>}
        </div>
      </div>

      {/* Specs grid */}
      <div className="px-5 mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        <Spec label={t.sex}>{sexLabel(a.sex, t)}</Spec>
        <Spec label={t.age}>{formatAge(a.ageMonths, t)}</Spec>
        <Spec label={t.weight}>{a.weight}</Spec>
        <Spec label="Località">{a.city}</Spec>
      </div>

      {/* ── Transaction status panel — only visible once buyer has made a move ── */}
      {txState !== "idle" && (
        <Section title={t.txStatus}>
          <TxStatusPanel
            txState={txState}
            sellerHandover={sellerHandover}
            buyerHandover={buyerHandover}
            isExpoFlow={isExpoFlow}
            paymentAmount={paymentAmount}
            requiresCITES={requiresCITES}
            onCancel={handleCancelRequest}
            onPay={handlePay}
            onBuyerConfirmHandover={handleBuyerConfirmHandover}
            onViewDocument={() => setShowDocument(true)}
            // demo controls
            onDemoApprove={demoSellerApprove}
            onDemoDecline={demoSellerDecline}
            onDemoHandover={demoSellerHandover}
            t={t}
            expo={expo}
          />
        </Section>
      )}

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

      {/* Seller card — clickable, opens storefront */}
      <Section title={t.seller}>
        <button
          onClick={() => go("seller", a.seller)}
          className="w-full bg-stone-900/60 border border-stone-800 rounded-xl p-4 flex items-center gap-3 hover:border-amber-500/40 hover:bg-stone-900 transition-all text-left group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center font-display text-lg text-stone-50 font-bold">
            {a.seller[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors">{a.seller}</span>
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
          <ChevronRight size={18} className="text-stone-600 group-hover:text-amber-400 transition-colors" />
        </button>
      </Section>

      {/* CITES notice if applicable */}
      {requiresCITES && (
        <Section title={t.cites}>
          <div className="bg-amber-500/5 ring-1 ring-amber-500/20 rounded-xl p-4 flex gap-3">
            <FileText size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90 leading-relaxed">{t.citesNotice}. {t.captiveBred}.</p>
          </div>
        </Section>
      )}

      {/* Linked expo card */}
      {expo && (
        <Section title={isExpoFlow ? (lang === "it" ? "Ritiro alla fiera" : "Pickup at expo") : ""}>
          <button onClick={() => go("expo", expo)}
                  className={`w-full bg-gradient-to-br ${expo.color} rounded-xl p-4 flex items-center gap-3 text-left hover:scale-[1.01] transition-transform`}>
            <Calendar size={20} className="text-white shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-white/80 uppercase tracking-widest font-bold">{expo.date}</div>
              <div className="font-display text-base text-white leading-tight truncate">{expo.name}</div>
              <div className="text-[11px] text-white/80 mt-0.5">{expo.location}</div>
            </div>
            <ChevronRight size={16} className="text-white/60 shrink-0" />
          </button>
        </Section>
      )}

      {/* Sticky action bar — only shows the primary CTA when in "idle" state.
          After that, all actions move into the TxStatusPanel above. */}
      <div className="fixed md:absolute bottom-16 md:bottom-0 inset-x-0 z-30 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2">
          <button onClick={handleMessage}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
            <MessageCircle size={16} />{t.message}
          </button>
          {txState === "idle" && (
            <button onClick={handleRequest}
                    className="flex-[1.4] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all bg-amber-500 hover:bg-amber-400 text-stone-950">
              <Send size={16} />{isExpoFlow ? t.txRequestExpo : t.txRequest}
            </button>
          )}
          {txState !== "idle" && (
            <div className="flex-[1.4] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 bg-stone-800 text-stone-400">
              <span className="text-xs">{lang === "it" ? "Vedi stato sopra ↑" : "See status above ↑"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Checkout modal */}
      {showCheckout && (
        <Checkout amount={paymentAmount} t={t}
                  onClose={(success) => { setShowCheckout(false); if (success) setTxState("paid"); }} />
      )}

      {/* Document modal */}
      {showDocument && (
        <DocumentModal
          listing={a}
          requiresCITES={requiresCITES}
          buyerName={user?.name || "—"}
          onClose={() => setShowDocument(false)}
          t={t} lang={lang}
        />
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   TX STATUS PANEL — visualizes the transaction state machine
   Shows: progress steps + contextual primary action for the buyer
          + a tiny "demo: simulate seller" footer for stepping through
   ═════════════════════════════════════════════════════════════════ */
function TxStatusPanel({
  txState, sellerHandover, buyerHandover, isExpoFlow, paymentAmount, requiresCITES,
  onCancel, onPay, onBuyerConfirmHandover, onViewDocument,
  onDemoApprove, onDemoDecline, onDemoHandover,
  t, expo,
}) {
  // Determine the step we're at for the progress UI
  // Steps: request → approval → payment → handover → complete
  const stepIndex = {
    requested: 0,
    approved: 1, declined: 1,
    paid: 2,
    completed: 4,
  }[txState] ?? 0;
  // Adjustment: when paid (stepIndex=2) we're moving from payment → handover so highlight 3
  const activeStep = txState === "paid" ? 3 : (txState === "completed" ? 4 : stepIndex);

  return (
    <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-4 space-y-4">
      {/* Progress steps */}
      <div className="flex items-center justify-between">
        {[t.txStepRequest, t.txStepApproval, t.txStepPayment, t.txStepHandover, t.txStepComplete].map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5 min-w-0 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                i < activeStep ? "bg-emerald-500 text-stone-950" :
                i === activeStep ? (txState === "declined" ? "bg-rose-500 text-white" : "bg-amber-500 text-stone-950 ring-2 ring-amber-500/30 ring-offset-2 ring-offset-stone-900") :
                "bg-stone-800 text-stone-600"
              }`}>
                {i < activeStep ? <Check size={14} /> : <span className="text-[10px] font-black">{i + 1}</span>}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider text-center leading-tight truncate w-full ${
                i === activeStep ? "text-amber-300" : i < activeStep ? "text-stone-300" : "text-stone-600"
              }`}>{label}</span>
            </div>
            {i < 4 && (
              <div className={`h-0.5 flex-1 -mt-5 mx-1 ${i < activeStep ? "bg-emerald-500/60" : "bg-stone-800"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Status message + primary action for buyer */}
      <div className="pt-2 border-t border-stone-800/60">
        {txState === "requested" && (
          <StatusBlock icon={<Hourglass size={16} className="text-amber-400" />}
                       color="amber"
                       title={t.txPending}>
            <button onClick={onCancel}
                    className="text-[11px] font-bold text-stone-400 hover:text-rose-400 underline underline-offset-2">
              {t.txCancel}
            </button>
          </StatusBlock>
        )}

        {txState === "declined" && (
          <StatusBlock icon={<X size={16} className="text-rose-400" />}
                       color="rose"
                       title={t.txDeclined}>
            <button onClick={onCancel}
                    className="text-[11px] font-bold text-stone-400 hover:text-stone-200 underline underline-offset-2">
              {t.txCancel}
            </button>
          </StatusBlock>
        )}

        {txState === "approved" && (
          <StatusBlock icon={<CheckCircle size={16} className="text-emerald-400" />}
                       color="emerald"
                       title={t.txApproved}>
            <button onClick={onPay}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs py-2.5 px-4 rounded-lg flex items-center gap-1.5 transition-colors w-full justify-center">
              <CreditCard size={14} />
              {isExpoFlow ? t.txPayDeposit : t.txPayFull} · {formatPrice(paymentAmount)}
            </button>
          </StatusBlock>
        )}

        {txState === "paid" && (
          <StatusBlock icon={<PackageCheck size={16} className="text-sky-400" />}
                       color="sky"
                       title={t.txPaid}>
            <div className="space-y-2 text-[11px]">
              <HandoverIndicator
                label={t.docSellerLabel}
                done={sellerHandover}
                waiting={t.txWaitingSeller}
              />
              <HandoverIndicator
                label={t.docBuyer}
                done={buyerHandover}
                action={!buyerHandover ? (
                  <button onClick={onBuyerConfirmHandover}
                          className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-[11px] py-1.5 px-3 rounded-md transition-colors">
                    {t.txConfirmReceived}
                  </button>
                ) : null}
                waiting={t.txWaitingBuyerConfirm}
              />
            </div>
          </StatusBlock>
        )}

        {txState === "completed" && (
          <StatusBlock icon={<CheckCircle size={16} className="text-emerald-400" />}
                       color="emerald"
                       title={t.txCompleted}>
            <button onClick={onViewDocument}
                    className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30 font-bold text-xs py-2.5 px-4 rounded-lg flex items-center gap-1.5 transition-colors w-full justify-center">
              <FileText size={14} />
              {t.txViewDocument} ({requiresCITES ? "CITES" : t.docOriginTitle})
            </button>
          </StatusBlock>
        )}
      </div>

      {/* Demo footer: simulate seller-side actions */}
      <div className="pt-3 border-t border-stone-800/60 -mx-4 -mb-4 px-4 pb-3 bg-stone-950/40 rounded-b-xl">
        <div className="text-[9px] font-bold uppercase tracking-widest text-stone-500 mb-2">⚙ {t.demoSimSeller}</div>
        <div className="flex gap-1.5 flex-wrap">
          {txState === "requested" && (
            <>
              <button onClick={onDemoApprove}
                      className="text-[10px] font-bold bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/25 px-2.5 py-1 rounded-md transition-colors">
                ✓ {t.demoApprove}
              </button>
              <button onClick={onDemoDecline}
                      className="text-[10px] font-bold bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30 hover:bg-rose-500/25 px-2.5 py-1 rounded-md transition-colors">
                ✕ {t.demoDecline}
              </button>
            </>
          )}
          {txState === "paid" && !sellerHandover && (
            <button onClick={onDemoHandover}
                    className="text-[10px] font-bold bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30 hover:bg-sky-500/25 px-2.5 py-1 rounded-md transition-colors">
              📦 {t.demoConfirmHandover}
            </button>
          )}
          {!(txState === "requested" || (txState === "paid" && !sellerHandover)) && (
            <span className="text-[10px] text-stone-600 italic">—</span>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBlock({ icon, color, title, children }) {
  const colors = {
    amber:   "bg-amber-500/10 ring-amber-500/20",
    emerald: "bg-emerald-500/10 ring-emerald-500/20",
    rose:    "bg-rose-500/10 ring-rose-500/20",
    sky:     "bg-sky-500/10 ring-sky-500/20",
  };
  return (
    <div className={`${colors[color]} ring-1 rounded-lg p-3 space-y-3`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-bold text-stone-100">{title}</span>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}

function HandoverIndicator({ label, done, action, waiting }) {
  return (
    <div className="flex items-center gap-2 bg-stone-900/60 rounded-md px-2.5 py-2">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
        done ? "bg-emerald-500 text-stone-950" : "bg-stone-800 text-stone-500 ring-1 ring-stone-700"
      }`}>
        {done ? <Check size={12} /> : <Clock size={11} />}
      </div>
      <span className={`flex-1 font-bold ${done ? "text-emerald-300 line-through decoration-emerald-500/40" : "text-stone-300"}`}>
        {label}
      </span>
      {action || (done ? null : <span className="text-[10px] text-stone-500 italic">{waiting}</span>)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DOCUMENT MODAL — CITES transfer or origin-paper preview
   Generated only after handover is confirmed by both parties
   ═════════════════════════════════════════════════════════════════ */
function DocumentModal({ listing, requiresCITES, buyerName, onClose, t, lang }) {
  const docTitle = requiresCITES ? t.docCitesTitle : t.docOriginTitle;
  const declaration = requiresCITES ? t.docDeclarationCites : t.docDeclarationOrigin;
  const today = new Date().toLocaleDateString(lang === "it" ? "it-IT" : "en-GB");
  // Pseudo transaction ID derived from listing
  const txId = `HM-${new Date().getFullYear()}-${String(listing.id).padStart(5, "0")}`;
  const a = listing;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/90 backdrop-blur-sm p-3 md:p-8 overflow-y-auto">
      <div className="bg-stone-50 text-stone-900 rounded-xl w-full max-w-2xl shadow-2xl my-auto">
        {/* Doc header */}
        <div className="px-6 md:px-10 pt-8 pb-6 border-b-2 border-stone-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">HerpMarket</div>
              <h1 className="font-display text-2xl md:text-3xl text-stone-900 tracking-tight mt-1 leading-tight">{docTitle}</h1>
              <p className="text-[11px] text-stone-500 mt-1 italic">{t.docSubtitle}</p>
            </div>
            <button onClick={onClose}
                    className="text-stone-500 hover:text-stone-900 transition-colors shrink-0"><X size={20} /></button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
            <DocField label={t.docDate}>{today}</DocField>
            <DocField label={t.docId}>{txId}</DocField>
          </div>
        </div>

        {/* Parties */}
        <div className="px-6 md:px-10 py-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-stone-300">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">{t.docSellerLabel}</div>
            <div className="font-display text-lg leading-tight">{a.seller}</div>
            <div className="text-xs text-stone-600 mt-0.5">{a.city}, {a.region}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">{t.docBuyer}</div>
            <div className="font-display text-lg leading-tight">{buyerName}</div>
          </div>
        </div>

        {/* Animal details */}
        <div className="px-6 md:px-10 py-6 border-b border-stone-300">
          <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3">
            {lang === "it" ? "Esemplare" : "Specimen"}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <DocField label={t.docSpecies}><i>{a.species}</i></DocField>
            <DocField label={t.docMorph}>{a.traits.map(tr => tr.name).join(", ")}</DocField>
            <DocField label={t.docSex}>{sexLabel(a.sex, t)}</DocField>
            <DocField label={t.docBirth}>{a.birthDate || a.born || (lang === "it" ? `${a.ageMonths} mesi fa` : `${a.ageMonths} months ago`)}</DocField>
            <DocField label={t.origin}>{t.captiveBred}</DocField>
            <DocField label={t.weight}>{a.weight}</DocField>
          </div>
        </div>

        {/* Declaration */}
        <div className="px-6 md:px-10 py-6 border-b border-stone-300">
          <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">{t.docDeclaration}</div>
          <p className="text-sm leading-relaxed text-stone-700">{declaration}</p>
        </div>

        {/* Signatures */}
        <div className="px-6 md:px-10 py-8 grid grid-cols-2 gap-6">
          <div>
            <div className="border-b border-stone-900 h-12 flex items-end pb-1 font-display italic text-stone-700">{a.seller}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mt-1">{t.docSignSeller}</div>
          </div>
          <div>
            <div className="border-b border-stone-900 h-12 flex items-end pb-1 font-display italic text-stone-700">{buyerName}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mt-1">{t.docSignBuyer}</div>
          </div>
        </div>

        <div className="px-6 md:px-10 pb-6 text-[10px] text-stone-500 text-center font-bold tracking-widest uppercase">
          {lang === "it" ? "Documento generato digitalmente da HerpMarket" : "Document digitally generated by HerpMarket"}
        </div>
      </div>
    </div>
  );
}

function DocField({ label, children }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-widest text-stone-500">{label}</div>
      <div className="font-bold text-stone-900 mt-0.5">{children}</div>
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
    { name: "Pastel", cls: "incDom" }, { name: "Banana", cls: "incDom" },
    { name: "Albino", cls: "recessive" }, { name: "Pied", cls: "recessive" },
    { name: "Lilly White", cls: "incDom" }, { name: "Harlequin", cls: "line" },
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

        {/* ─── Delivery options ─── */}
        <DeliverySection lang={lang} t={t} />

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

/* DELIVERY SECTION — three independent toggles.
   Expo pickup is positioned as HerpMarket's signature feature: amber accent,
   highlighted card, escrow-deposit explanation; all upcoming expos available
   as multi-select chips with date right on the chip.                       */
function DeliverySection({ lang, t }) {
  const [localPickup, setLocalPickup] = useState(true);
  const [expoPickup, setExpoPickup] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState("");
  const [internationalShipping, setInternationalShipping] = useState(false);
  const [selectedExpoIds, setSelectedExpoIds] = useState([]);
  const upcomingExpos = getUpcomingExpos();

  const toggleExpo = (id) => {
    setSelectedExpoIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const monthShort = lang === "it"
    ? ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <FormBlock label={lang === "it" ? "Consegna" : "Delivery"}>
      <div className="space-y-2.5">
        {/* Local pickup */}
        <DeliveryCard
          icon={<MapPin size={18} />}
          title={lang === "it" ? "Ritiro a mano" : "Local pickup"}
          subtitle={lang === "it" ? "L'acquirente ritira presso la tua sede" : "Buyer collects at your location"}
          checked={localPickup}
          onChange={() => setLocalPickup(!localPickup)}
        />

        {/* Expo pickup — the signature feature */}
        <div className={`rounded-xl ring-1 transition-all overflow-hidden ${
          expoPickup ? "bg-amber-500/5 ring-amber-500/30" : "bg-stone-900/40 ring-stone-800"
        }`}>
          <label className="flex items-start gap-3 p-4 cursor-pointer">
            <input type="checkbox" checked={expoPickup} onChange={() => setExpoPickup(!expoPickup)}
                   className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <Calendar size={16} className="text-amber-400" />
                <span className="font-bold text-stone-100 text-sm">{lang === "it" ? "Consegna in fiera" : "Expo pickup"}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/15 ring-1 ring-amber-500/30 px-1.5 py-0.5 rounded">
                  ★ HerpMarket
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                {lang === "it"
                  ? "Acconto 10% in escrow, animale bloccato fino al ritiro al tuo stand. Maggiore protezione per acquirente e venditore."
                  : "10% deposit in escrow, animal reserved until pickup at your stand. Better protection for both parties."}
              </p>
            </div>
          </label>
          {expoPickup && (
            <div className="px-4 pb-4 pt-1 border-t border-amber-500/15">
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 mt-3">
                {lang === "it" ? `A quali fiere parteciperai? (${upcomingExpos.length} disponibili)` : `Which expos will you attend? (${upcomingExpos.length} available)`}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-72 overflow-y-auto hide-scrollbar pr-1">
                {upcomingExpos.map(expo => {
                  const isSel = selectedExpoIds.includes(expo.id);
                  const dd = expo.dateISO.slice(8, 10);
                  const mm = monthShort[parseInt(expo.dateISO.slice(5, 7), 10) - 1];
                  return (
                    <button key={expo.id} type="button"
                            onClick={() => toggleExpo(expo.id)}
                            className={`text-left rounded-lg ring-1 px-2.5 py-2 flex items-center gap-2.5 transition-all ${
                              isSel ? "bg-amber-500/15 ring-amber-500/40" : "bg-stone-900/60 ring-stone-800 hover:ring-stone-700"
                            }`}>
                      <div className={`rounded px-1.5 py-0.5 text-center shrink-0 min-w-[34px] ${
                        isSel ? "bg-amber-500/20" : "bg-stone-800"
                      }`}>
                        <div className={`text-[8px] uppercase tracking-widest font-bold leading-none ${
                          isSel ? "text-amber-300" : "text-stone-500"
                        }`}>{mm}</div>
                        <div className={`font-display text-sm leading-none mt-0.5 ${
                          isSel ? "text-amber-100" : "text-stone-200"
                        }`}>{dd}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[12px] font-bold leading-tight truncate ${
                          isSel ? "text-amber-100" : "text-stone-200"
                        }`}>{expo.name}</div>
                        <div className="text-[10px] text-stone-500 truncate flex items-center gap-1">
                          {expo.location}
                          {expo.country !== "IT" && <span className="text-[8px] uppercase font-black bg-stone-800 text-stone-400 px-1 rounded">{expo.country}</span>}
                        </div>
                      </div>
                      {isSel && <Check size={14} className="text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {selectedExpoIds.length > 0 && (
                <div className="text-[10px] text-amber-400/80 font-bold mt-2.5">
                  {selectedExpoIds.length} {lang === "it" ? "fiere selezionate" : "expos selected"}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Shipping */}
        <div className={`rounded-xl ring-1 transition-all overflow-hidden ${
          shipping ? "bg-stone-800/40 ring-stone-700" : "bg-stone-900/40 ring-stone-800"
        }`}>
          <label className="flex items-start gap-3 p-4 cursor-pointer">
            <input type="checkbox" checked={shipping} onChange={() => setShipping(!shipping)}
                   className="mt-0.5 w-4 h-4 rounded accent-stone-300 cursor-pointer shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <Truck size={16} className="text-stone-300" />
                <span className="font-bold text-stone-100 text-sm">{lang === "it" ? "Spedizione con corriere" : "Courier shipping"}</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                {lang === "it"
                  ? "Spedizione tramite corriere abilitato (Lun-Mer). Imballaggio a norma IATA."
                  : "Authorised live-animal courier (Mon-Wed). IATA-compliant packaging."}
              </p>
            </div>
          </label>
          {shipping && (
            <div className="px-4 pb-4 pt-1 border-t border-stone-800 space-y-3">
              <div className="mt-3">
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                  {lang === "it" ? "Costo spedizione nazionale" : "Domestic shipping cost"}
                </div>
                <div className="relative max-w-[160px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">€</span>
                  <input type="number" value={shippingCost} onChange={e => setShippingCost(e.target.value)}
                         className="form-input pl-7" placeholder="45" />
                </div>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={internationalShipping} onChange={() => setInternationalShipping(!internationalShipping)}
                       className="w-4 h-4 rounded accent-amber-500 cursor-pointer" />
                <span className="text-xs text-stone-300">
                  {lang === "it" ? "Disponibile anche per spedizione UE (TRACES richiesto)" : "Available for EU shipping (TRACES required)"}
                </span>
              </label>
              {internationalShipping && (
                <div className="bg-amber-500/5 ring-1 ring-amber-500/20 rounded-lg p-2.5 text-[10px] text-amber-200/80 leading-relaxed">
                  {lang === "it"
                    ? "Per spedizioni intra-UE è obbligatoria la registrazione TRACES e, per specie CITES Allegato A/B, autorizzazione specifica."
                    : "EU shipping requires TRACES registration and, for CITES Annex A/B species, specific authorisation."}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Warning if nothing selected */}
        {!localPickup && !expoPickup && !shipping && (
          <div className="bg-rose-500/5 ring-1 ring-rose-500/20 rounded-lg p-3 text-[11px] text-rose-300 flex gap-2 items-center">
            <Info size={14} className="shrink-0" />
            {lang === "it" ? "Seleziona almeno una modalità di consegna." : "Select at least one delivery method."}
          </div>
        )}
      </div>
    </FormBlock>
  );
}

function DeliveryCard({ icon, title, subtitle, checked, onChange }) {
  return (
    <label className={`flex items-start gap-3 p-4 rounded-xl ring-1 cursor-pointer transition-all ${
      checked ? "bg-stone-800/40 ring-stone-700" : "bg-stone-900/40 ring-stone-800"
    }`}>
      <input type="checkbox" checked={checked} onChange={onChange}
             className="mt-0.5 w-4 h-4 rounded accent-stone-300 cursor-pointer shrink-0" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-stone-300">{icon}</span>
          <span className="font-bold text-stone-100 text-sm">{title}</span>
        </div>
        <p className="text-[11px] text-stone-400 leading-relaxed">{subtitle}</p>
      </div>
    </label>
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
          <ProfileRow icon={<FileText size={18} />} label={t.storePolicyLabel} onClick={() => go("storepolicy")} />
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
   SELLER PROFILE — storefront with three tabs:
   - Animals: all current listings from this seller
   - Reviews: ratings & buyer feedback
   - About: bio, location, member-since, total sales, expos attended
   ═════════════════════════════════════════════════════════════════ */
function SellerProfile({ sellerName, t, lang, go, favorites, toggleFav }) {
  const [tab, setTab] = useState("animals");
  if (!sellerName) return null;

  const seller = SELLERS[sellerName];
  const sellerListings = LISTINGS.filter(l => l.seller === sellerName);

  // Fallback minimal data if seller missing from SELLERS table
  const data = seller || {
    name: sellerName,
    region: sellerListings[0]?.region || "—",
    city: sellerListings[0]?.city || "—",
    verified: sellerListings[0]?.verified || false,
    memberSince: "—", totalSales: 0,
    rating: sellerListings[0]?.rating || 0,
    reviewCount: sellerListings[0]?.reviews || 0,
    specialties: [], expoIds: [], reviews: [],
    bioIt: "", bioEn: "",
  };

  const attendedExpos = data.expoIds.map(id => EXPOS.find(e => e.id === id)).filter(Boolean);
  const bio = lang === "it" ? data.bioIt : data.bioEn;

  return (
    <div className="max-w-5xl mx-auto w-full pb-24 md:pb-10">
      {/* Header / banner */}
      <div className="relative">
        <div className="h-32 md:h-44 bg-gradient-to-br from-amber-900/60 via-stone-900 to-stone-950" />
        <button onClick={() => go("home")}
                className="absolute top-5 left-4 p-2.5 bg-stone-950/70 backdrop-blur-md rounded-full text-stone-100 hover:bg-stone-950/90 transition-colors">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Identity block */}
      <div className="px-5 md:px-8 -mt-12 md:-mt-14 relative">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-800 ring-4 ring-stone-950 flex items-center justify-center font-display text-4xl text-stone-50 font-bold shadow-2xl">
            {data.name[0]}
          </div>
          <div className="flex-1 pb-1 min-w-0">
            <h1 className="font-display text-2xl md:text-3xl text-stone-50 tracking-tight flex items-center gap-2 leading-tight">
              <span className="truncate">{data.name}</span>
              {data.verified && <ShieldCheck size={20} className="text-sky-400 shrink-0" />}
            </h1>
            <div className="flex items-center gap-1.5 text-stone-400 text-xs md:text-sm mt-1">
              <MapPin size={12} />{data.city}, {data.region}
            </div>
          </div>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          <SellerStat label={t.sellerAnimals}>
            <span className="font-display text-xl text-stone-50">{sellerListings.length}</span>
          </SellerStat>
          <SellerStat label={t.sellerReviews}>
            <span className="flex items-center gap-1">
              <Star size={14} fill="currentColor" className="text-amber-400" />
              <span className="font-display text-xl text-stone-50">{data.rating || "—"}</span>
              {data.reviewCount > 0 && <span className="text-[10px] text-stone-500 font-bold">({data.reviewCount})</span>}
            </span>
          </SellerStat>
          <SellerStat label={t.sellerTotalSales}>
            <span className="font-display text-xl text-stone-50">{data.totalSales}</span>
          </SellerStat>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-stone-950/95 backdrop-blur-xl border-b border-stone-800 mt-6">
        <div className="px-5 md:px-8 flex gap-1">
          <SellerTab active={tab === "animals"}  onClick={() => setTab("animals")}>{t.sellerAnimals} <span className="text-stone-500">· {sellerListings.length}</span></SellerTab>
          <SellerTab active={tab === "reviews"} onClick={() => setTab("reviews")}>{t.sellerReviews} <span className="text-stone-500">· {data.reviewCount}</span></SellerTab>
          <SellerTab active={tab === "about"}    onClick={() => setTab("about")}>{t.sellerAbout}</SellerTab>
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5 md:px-8 pt-5">
        {tab === "animals" && (
          sellerListings.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
              {sellerListings.map(item => <ListingCard key={item.id} item={item} go={go} favorites={favorites} toggleFav={toggleFav} t={t} />)}
            </div>
          ) : (
            <p className="text-center text-stone-500 text-sm font-display italic py-10">
              {lang === "it" ? "Nessun esemplare disponibile al momento." : "No animals currently available."}
            </p>
          )
        )}

        {tab === "reviews" && (
          data.reviews.length > 0 ? (
            <div className="space-y-3 max-w-2xl">
              {data.reviews.map((rev, i) => (
                <div key={i} className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 font-bold text-xs">
                        {rev.buyer[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-100">{rev.buyer}</div>
                        <div className="text-[10px] text-stone-500">{rev.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} size={11} fill={n <= rev.rating ? "currentColor" : "none"}
                              className={n <= rev.rating ? "text-amber-400" : "text-stone-700"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-stone-300 mt-3 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-500 text-sm font-display italic py-10">{t.sellerNoReviews}</p>
          )
        )}

        {tab === "about" && (
          <div className="max-w-2xl space-y-6">
            {bio && (
              <div>
                <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                  {lang === "it" ? "Chi siamo" : "About us"}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">{bio}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <InfoCell label={t.sellerMemberSince} value={data.memberSince} />
              <InfoCell label={t.sellerTotalSales} value={data.totalSales} />
              <InfoCell label={lang === "it" ? "Regione" : "Region"} value={data.region} />
              <InfoCell label={lang === "it" ? "Città" : "City"} value={data.city} />
            </div>

            {data.specialties.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{t.sellerSpecialties}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.specialties.map((sp, i) => (
                    <span key={i} className="font-display italic text-sm text-amber-300 bg-amber-500/10 ring-1 ring-amber-500/20 px-2.5 py-1 rounded-md">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{t.sellerAttendsExpos}</h3>
              {attendedExpos.length > 0 ? (
                <div className="space-y-2">
                  {attendedExpos.map(expo => (
                    <button key={expo.id} onClick={() => go("expo", expo)}
                            className="w-full bg-stone-900/60 ring-1 ring-stone-800 hover:ring-amber-500/40 rounded-xl p-3 flex items-center gap-3 transition-all text-left group">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${expo.color} flex items-center justify-center shrink-0`}>
                        <Calendar size={16} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors truncate">{expo.name}</div>
                        <div className="text-[11px] text-stone-500 truncate">{expo.location} · {expo.date}</div>
                      </div>
                      <ChevronRight size={16} className="text-stone-600 group-hover:text-amber-400 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-stone-500 italic font-display">{t.sellerNoExpos}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SellerStat({ label, children }) {
  return (
    <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-lg px-3 py-2.5">
      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest mb-1">{label}</div>
      {children}
    </div>
  );
}

function SellerTab({ active, onClick, children }) {
  return (
    <button onClick={onClick}
            className={`px-3 py-3 text-xs font-bold border-b-2 transition-colors ${
              active ? "border-amber-500 text-amber-300" : "border-transparent text-stone-500 hover:text-stone-300"
            }`}>
      {children}
    </button>
  );
}

function InfoCell({ label, value }) {
  return (
    <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-lg px-3 py-2.5">
      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">{label}</div>
      <div className="text-sm font-bold text-stone-100 mt-0.5">{value}</div>
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

/* ═══════════════════════════════════════════════════════════════════
   LEGAL DOCUMENTS
   ──────────────────────────────────────────────────────────────────
   Both TOS and Store Policy are structured documents. They share a
   renderer (LegalDoc) that handles:
     • IT (binding) / EN (courtesy translation) language toggle
     • effective date + version
     • table of contents that scrolls to section
     • per-section ⚠ marker for "needs lawyer review" before launch
   ──────────────────────────────────────────────────────────────────
   IMPORTANT: this is a strong first draft modeled on MorphMarket's
   structure but adapted to Italian/EU law. Before going live with
   real money flowing through the platform it MUST be reviewed by an
   Italian lawyer (e-commerce — D.Lgs. 70/2003, Codice del Consumo —
   D.Lgs. 206/2005, GDPR/Reg. UE 2016/679, fauna — D.Lgs. 135/2022 e
   Reg. CE 338/97). Sections requiring review are flagged with ⚠.
   ═════════════════════════════════════════════════════════════════ */

const TOS_CONTENT = {
  effectiveDate: { it: "1 gennaio 2026", en: "1 January 2026" },
  version: "1.0 (bozza)",
  sections: [
    {
      id: "1", title: { it: "Premesse e definizioni", en: "Background and definitions" }, review: false,
      body: {
        it: [
          "HerpMarket è un marketplace online che mette in contatto allevatori e acquirenti di rettili, anfibi e invertebrati nati in cattività. La piattaforma è gestita da [DENOMINAZIONE SOCIETARIA DA INDICARE], P.IVA [DA INDICARE], con sede in [DA INDICARE], Italia.",
          "Ai sensi del D.Lgs. 70/2003, HerpMarket opera come prestatore di servizi della società dell'informazione e fornitore di servizio di hosting attivo. HerpMarket non è parte dei contratti di compravendita conclusi tra Utenti e non assume la posizione di venditore.",
          "«Utente» indica qualunque persona fisica o giuridica che acceda alla piattaforma. «Venditore» indica l'Utente che pubblica un annuncio. «Acquirente» indica l'Utente che richiede l'acquisto di un Esemplare. «Esemplare» indica l'animale oggetto dell'annuncio.",
        ],
        en: [
          "HerpMarket is an online marketplace connecting breeders and buyers of captive-bred reptiles, amphibians and invertebrates. The platform is operated by [COMPANY NAME TBD], VAT [TBD], registered in [TBD], Italy.",
          "Pursuant to Italian Legislative Decree 70/2003, HerpMarket operates as an information-society service provider and active hosting provider. HerpMarket is not a party to sale contracts concluded between Users and does not act as seller.",
          "'User' means any natural or legal person accessing the platform. 'Seller' means the User who publishes a listing. 'Buyer' means the User who requests to purchase a Specimen. 'Specimen' means the animal that is the subject of the listing.",
        ],
      },
    },
    {
      id: "2", title: { it: "Requisiti di accesso", en: "Eligibility" }, review: true,
      body: {
        it: [
          "L'accesso al servizio è riservato a soggetti maggiorenni (18 anni compiuti) capaci di concludere contratti giuridicamente vincolanti ai sensi della legge italiana.",
          "Per pubblicare annunci, l'Utente deve dichiarare di essere in regola con la normativa italiana in materia di detenzione di animali esotici (D.Lgs. 135/2022) e, ove applicabile, con la disciplina CITES (Reg. CE 338/97 e Reg. CE 865/2006).",
          "Gli allevatori che cedono Esemplari nell'esercizio di attività professionale devono essere in possesso delle autorizzazioni richieste dalla normativa nazionale e regionale (es. iscrizione al Registro Imprese, autorizzazione ASL ove dovuta) e dichiarare la propria qualifica all'atto della registrazione.",
        ],
        en: [
          "Access to the service is reserved to adults (18 years or older) able to enter legally binding contracts under Italian law.",
          "To publish listings, the User must declare compliance with Italian regulations on the keeping of exotic animals (Legislative Decree 135/2022) and, where applicable, with CITES rules (EU Reg. 338/97 and EU Reg. 865/2006).",
          "Breeders selling Specimens in the course of a professional activity must hold all authorisations required by national and regional legislation (e.g. registration with the Business Register, health-authority — ASL — authorisation where required) and declare their status at registration.",
        ],
      },
    },
    {
      id: "3", title: { it: "Specie consentite e specie vietate", en: "Allowed and prohibited species" }, review: true,
      body: {
        it: [
          "Sono ammessi alla vendita esclusivamente Esemplari nati in cattività appartenenti a specie il cui possesso, vendita e trasporto siano leciti ai sensi del D.Lgs. 135/2022 e della normativa connessa.",
          "È assolutamente vietato pubblicare annunci relativi a: (i) specie elencate come pericolose dal D.Lgs. 135/2022 (es. molte specie velenose, alcuni elapidi, viperidi del Vecchio Mondo, grandi varanidi); (ii) specie invasive esotiche di rilevanza unionale di cui al Reg. UE 1143/2014; (iii) Esemplari catturati in natura (WC — wild caught); (iv) uova, animali gravidi o pre-nati.",
          "Per le specie incluse negli Allegati A, B, C e D del Reg. CE 338/97, l'Utente deve indicare nell'annuncio il documento di provenienza (certificato CITES individuale per Allegato A, dichiarazione di cessione per Allegato B). HerpMarket si riserva il diritto di rimuovere annunci non conformi senza preavviso.",
        ],
        en: [
          "Only captive-bred Specimens of species whose possession, sale and transport are lawful under Legislative Decree 135/2022 and related legislation may be listed.",
          "It is strictly prohibited to list: (i) species classified as dangerous under Legislative Decree 135/2022 (e.g. many venomous species, certain elapids, Old-World vipers, large monitor lizards); (ii) invasive alien species of EU concern under Reg. (EU) 1143/2014; (iii) wild-caught specimens (WC); (iv) eggs, gravid animals or pre-born animals.",
          "For species listed in Annexes A, B, C and D of EU Reg. 338/97, the User must indicate in the listing the provenance document (individual CITES certificate for Annex A, transfer declaration for Annex B). HerpMarket reserves the right to remove non-compliant listings without notice.",
        ],
      },
    },
    {
      id: "4", title: { it: "Pubblicazione degli annunci", en: "Listing rules" }, review: false,
      body: {
        it: [
          "Il Venditore garantisce che ogni annuncio: (a) riguarda un Esemplare effettivamente in suo possesso da almeno 30 giorni (salvo Esemplari di propria riproduzione); (b) include fotografie originali dell'Esemplare effettivo posto in vendita; (c) riporta in modo veritiero specie, morph/tratti, sesso (se determinabile), data di nascita, peso e provenienza.",
          "È vietato l'uso di immagini di stock, di esemplari diversi o di immagini protette da copyright di terzi.",
          "Il Venditore è esclusivamente responsabile dell'esattezza delle informazioni pubblicate. HerpMarket non verifica preventivamente la veridicità dei contenuti pubblicati dagli Utenti.",
        ],
        en: [
          "The Seller warrants that each listing: (a) concerns a Specimen actually held by them for at least 30 days (except Specimens bred by the Seller); (b) includes original photographs of the actual Specimen being sold; (c) accurately states species, morph/traits, sex (where determinable), date of birth, weight and provenance.",
          "Use of stock images, images of different animals, or copyrighted third-party images is prohibited.",
          "The Seller is solely responsible for the accuracy of the information published. HerpMarket does not pre-verify the truthfulness of user-published content.",
        ],
      },
    },
    {
      id: "5", title: { it: "Conclusione del contratto e pagamenti", en: "Contract formation and payments" }, review: true,
      body: {
        it: [
          "Il contratto di compravendita si conclude direttamente tra Acquirente e Venditore. HerpMarket fornisce strumenti per facilitare la transazione (richiesta di acquisto, approvazione del venditore, pagamento sicuro tramite escrow, generazione documentale) ma resta estraneo al rapporto contrattuale.",
          "L'Acquirente effettua una richiesta di acquisto tramite la piattaforma. Il Venditore può approvare o rifiutare la richiesta. Nessun pagamento è dovuto fino all'approvazione del Venditore.",
          "Una volta approvata la richiesta, l'Acquirente versa l'acconto (per ritiro in fiera) o il pagamento integrale (per spedizione o ritiro presso il Venditore) tramite il provider di pagamento integrato. I fondi sono trattenuti in escrow fino alla conferma reciproca della consegna.",
          "Gli acconti versati per il ritiro in fiera non sono rimborsabili in caso di mancato ritiro da parte dell'Acquirente per causa a lui imputabile.",
        ],
        en: [
          "The sale contract is concluded directly between Buyer and Seller. HerpMarket provides tools to facilitate the transaction (purchase request, seller approval, secure escrow payment, document generation) but is not a party to the contractual relationship.",
          "The Buyer submits a purchase request via the platform. The Seller may approve or decline the request. No payment is due until Seller approval.",
          "Once approved, the Buyer pays the deposit (for expo pickup) or the full amount (for shipping or seller pickup) via the integrated payment provider. Funds are held in escrow until handover is mutually confirmed.",
          "Deposits paid for expo pickup are non-refundable where the Buyer fails to collect the Specimen for reasons attributable to them.",
        ],
      },
    },
    {
      id: "6", title: { it: "Diritto di recesso (consumatori)", en: "Right of withdrawal (consumers)" }, review: true,
      body: {
        it: [
          "Ai sensi dell'art. 59, comma 1, lett. d) del Codice del Consumo (D.Lgs. 206/2005), il diritto di recesso non si applica ai contratti aventi ad oggetto la fornitura di beni che rischiano di deteriorarsi o scadere rapidamente, categoria in cui rientrano gli animali vivi.",
          "Resta ferma la responsabilità del Venditore per i vizi della cosa venduta ai sensi degli artt. 1490 e ss. c.c. e, ove ricorrano i presupposti di legge, la disciplina della garanzia di conformità di cui agli artt. 128 e ss. del Codice del Consumo.",
        ],
        en: [
          "Pursuant to art. 59(1)(d) of the Italian Consumer Code (Legislative Decree 206/2005), the right of withdrawal does not apply to contracts for the supply of goods liable to deteriorate or expire rapidly — a category that includes live animals.",
          "The Seller remains liable for defects under arts. 1490 ff. of the Italian Civil Code and, where applicable, under the conformity-guarantee provisions of arts. 128 ff. of the Consumer Code.",
        ],
      },
    },
    {
      id: "7", title: { it: "Commissioni", en: "Fees" }, review: false,
      body: {
        it: [
          "L'uso base della piattaforma è gratuito per gli Acquirenti. I Venditori possono pubblicare un numero limitato di annunci gratuiti; per volumi superiori sono disponibili piani a pagamento i cui dettagli sono illustrati nella sezione «Piani».",
          "HerpMarket applica una commissione sulle transazioni completate tramite il sistema escrow integrato. L'importo della commissione è indicato in modo chiaro prima della conclusione del pagamento.",
        ],
        en: [
          "Basic use of the platform is free for Buyers. Sellers may post a limited number of free listings; higher volumes are available through paid plans whose details are set out in the 'Plans' section.",
          "HerpMarket charges a fee on transactions completed via the integrated escrow system. The fee amount is clearly displayed before payment is finalised.",
        ],
      },
    },
    {
      id: "8", title: { it: "Spedizioni e ritiro", en: "Shipping and pickup" }, review: true,
      body: {
        it: [
          "Sono ammesse tre modalità di consegna: (a) ritiro a mano presso la sede del Venditore; (b) ritiro presso una fiera autorizzata indicata nell'annuncio; (c) spedizione tramite corriere abilitato al trasporto di animali vivi, all'interno del territorio italiano e dell'Unione Europea.",
          "Le spedizioni internazionali all'interno dell'UE sono consentite a condizione che entrambi le parti rispettino le disposizioni TRACES e, ove applicabile, i requisiti CITES per il movimento intra-UE.",
          "Le spedizioni al di fuori dell'UE non sono attualmente supportate dalla piattaforma.",
          "Il Venditore è responsabile dell'imballaggio adeguato dell'Esemplare secondo le linee guida IATA per il trasporto di animali vivi. HerpMarket può sospendere il servizio in condizioni climatiche estreme.",
        ],
        en: [
          "Three delivery modes are allowed: (a) pickup at the Seller's premises; (b) pickup at an authorised expo listed in the ad; (c) shipping by a courier qualified to transport live animals, within Italy and the European Union.",
          "International shipping within the EU is allowed provided both parties comply with TRACES requirements and, where applicable, with CITES rules for intra-EU movement.",
          "Shipping outside the EU is not currently supported by the platform.",
          "The Seller is responsible for proper packaging of the Specimen according to IATA Live Animal Regulations. HerpMarket may suspend the service in extreme weather.",
        ],
      },
    },
    {
      id: "9", title: { it: "Garanzia di arrivo in vita e dispute", en: "Live arrival guarantee and disputes" }, review: true,
      body: {
        it: [
          "Le condizioni standard di garanzia di arrivo in vita (Live Arrival Guarantee) sono illustrate nel Regolamento Marketplace. I Venditori possono integrare o modificare tali condizioni mediante la propria policy di negozio, purché non in contrasto con norme imperative di legge.",
          "In caso di disputa, gli Utenti sono tenuti a tentare in buona fede una composizione amichevole tramite la funzione messaggi della piattaforma. HerpMarket può, su richiesta, intervenire come mediatore informale ma non è obbligato a farlo e non assume la veste di arbitro.",
          "Resta impregiudicato il diritto del Consumatore di accedere alla piattaforma ODR (Online Dispute Resolution) della Commissione Europea: ec.europa.eu/consumers/odr.",
        ],
        en: [
          "Standard live-arrival guarantee terms are set out in the Marketplace Policy. Sellers may supplement or modify those terms in their own store policy, provided this does not conflict with mandatory provisions of law.",
          "In case of dispute, Users must attempt good-faith amicable resolution via the platform's messaging feature. HerpMarket may, on request, act as informal mediator but is not obliged to do so and does not act as arbitrator.",
          "Consumers retain the right to access the European Commission's ODR platform: ec.europa.eu/consumers/odr.",
        ],
      },
    },
    {
      id: "10", title: { it: "Responsabilità di HerpMarket", en: "HerpMarket liability" }, review: true,
      body: {
        it: [
          "HerpMarket fornisce la piattaforma «così com'è» e non garantisce: (i) la veridicità degli annunci pubblicati dagli Utenti; (ii) l'effettiva conclusione delle transazioni; (iii) la qualità sanitaria o genetica degli Esemplari.",
          "HerpMarket è responsabile esclusivamente per dolo e colpa grave nell'erogazione del servizio. Sono in ogni caso escluse responsabilità per danni indiretti, conseguenziali o per perdita di profitto, nei limiti consentiti dalla legge.",
          "Nulla nei presenti Termini limita la responsabilità di HerpMarket nei confronti dei Consumatori per quanto disposto da norme imperative.",
        ],
        en: [
          "HerpMarket provides the platform 'as is' and does not guarantee: (i) the truthfulness of user-published listings; (ii) the actual conclusion of transactions; (iii) the health or genetic quality of Specimens.",
          "HerpMarket is liable solely for wilful misconduct or gross negligence in providing the service. Liability for indirect, consequential or lost-profit damages is excluded to the maximum extent permitted by law.",
          "Nothing in these Terms limits HerpMarket's liability towards Consumers in respect of mandatory provisions of law.",
        ],
      },
    },
    {
      id: "11", title: { it: "Trattamento dei dati personali", en: "Personal data" }, review: true,
      body: {
        it: [
          "Il trattamento dei dati personali è disciplinato dalla Privacy Policy, redatta ai sensi del Reg. UE 2016/679 (GDPR) e del D.Lgs. 196/2003 come modificato.",
          "HerpMarket agisce come titolare del trattamento per i dati raccolti durante la registrazione e l'uso della piattaforma. Per i dati condivisi tra Utenti nel contesto di una transazione, ciascun Utente agisce come titolare autonomo nei propri interessi.",
        ],
        en: [
          "Personal data processing is governed by the Privacy Policy, drafted under EU Reg. 2016/679 (GDPR) and Italian Legislative Decree 196/2003 as amended.",
          "HerpMarket acts as data controller for data collected during registration and platform use. For data shared between Users in the context of a transaction, each User acts as autonomous controller for their own purposes.",
        ],
      },
    },
    {
      id: "12", title: { it: "Legge applicabile e foro competente", en: "Governing law and jurisdiction" }, review: true,
      body: {
        it: [
          "I presenti Termini sono regolati dalla legge italiana.",
          "Per ogni controversia derivante dai presenti Termini è competente in via esclusiva il Foro di [DA INDICARE], salvo il foro inderogabile del consumatore di cui all'art. 66-bis del Codice del Consumo.",
          "La versione italiana dei presenti Termini è quella giuridicamente vincolante. Eventuali traduzioni sono fornite a titolo di mera cortesia.",
        ],
        en: [
          "These Terms are governed by Italian law.",
          "Any dispute arising from these Terms is subject to the exclusive jurisdiction of the Court of [TBD], without prejudice to the consumer's mandatory forum under art. 66-bis of the Italian Consumer Code.",
          "The Italian version of these Terms is the legally binding version. Translations are provided as a courtesy only.",
        ],
      },
    },
  ],
};

const STORE_POLICY_CONTENT = {
  effectiveDate: { it: "1 gennaio 2026", en: "1 January 2026" },
  version: "1.0 (bozza)",
  sections: [
    {
      id: "1", title: { it: "Ambito di applicazione", en: "Scope" }, review: false,
      body: {
        it: [
          "Il presente Regolamento Marketplace si applica a tutte le compravendite concluse tramite HerpMarket. I Venditori possono adottare una propria Store Policy che integri il presente regolamento, ma non possono derogare alle disposizioni qui contenute laddove ciò comporti un peggioramento della tutela dell'Acquirente Consumatore o una violazione di norme imperative.",
        ],
        en: [
          "This Marketplace Policy applies to all sales concluded via HerpMarket. Sellers may adopt their own Store Policy supplementing this regulation, but may not deviate from these provisions where this would worsen the protection of Consumer Buyers or breach mandatory law.",
        ],
      },
    },
    {
      id: "2", title: { it: "Modalità di pagamento", en: "Payment methods" }, review: false,
      body: {
        it: [
          "I pagamenti devono essere effettuati esclusivamente tramite il sistema di pagamento integrato della piattaforma (Stripe o provider equivalente), che garantisce la conservazione dei fondi in escrow fino alla conferma di consegna.",
          "È espressamente vietato richiedere o effettuare pagamenti al di fuori della piattaforma. Le richieste di pagamento mediante bonifico diretto, PayPal Amici e Familiari, criptovalute o contanti senza fattura sono motivo di sospensione dell'account.",
          "L'Acquirente può versare un acconto del 10% per bloccare l'Esemplare in vista del ritiro in fiera; il saldo è dovuto al momento del ritiro presso lo stand del Venditore. L'acconto non è rimborsabile in caso di mancato ritiro per causa imputabile all'Acquirente.",
        ],
        en: [
          "Payments must be made exclusively via the platform's integrated payment system (Stripe or equivalent provider), which holds funds in escrow until handover confirmation.",
          "Requesting or making payments outside the platform is strictly prohibited. Requests for direct bank transfer, PayPal Friends & Family, cryptocurrency or undocumented cash payments are grounds for account suspension.",
          "The Buyer may pay a 10% deposit to reserve the Specimen for expo pickup; the balance is due at the time of pickup at the Seller's stand. The deposit is non-refundable where the Buyer fails to collect for reasons attributable to them.",
        ],
      },
    },
    {
      id: "3", title: { it: "Garanzia di arrivo in vita (DOA)", en: "Live arrival guarantee (DOA)" }, review: true,
      body: {
        it: [
          "Il Venditore garantisce l'arrivo in vita dell'Esemplare alle seguenti condizioni:",
          "(a) la spedizione avviene tramite corriere abilitato e nei giorni concordati (di norma lunedì–mercoledì, escluse festività);",
          "(b) l'imballaggio rispetta le linee guida IATA per animali vivi, con materiali isolanti adeguati e ove necessario heat pack o cold pack a norma;",
          "(c) la consegna avviene presso il punto di ritiro (Hub) del corriere e non all'indirizzo residenziale, salvo diverso accordo scritto.",
          "In caso di Esemplare morto all'arrivo (DOA), l'Acquirente deve: (i) notificare il Venditore e HerpMarket entro 2 ore dalla disponibilità del pacco al ritiro; (ii) fornire fotografie e video dell'Esemplare nella sua confezione originale entro 6 ore; (iii) conservare l'Esemplare a temperatura adeguata fino a istruzioni del Venditore.",
          "La garanzia DOA non si applica a: (a) Esemplari ritirati personalmente dall'Acquirente (in fiera o presso il Venditore); (b) consegne ritardate per cause attribuibili al corriere ma il pacco arriva in vita; (c) decessi sopravvenuti dopo l'apertura del pacco.",
        ],
        en: [
          "The Seller guarantees the Specimen's live arrival subject to the following conditions:",
          "(a) shipping is made by a qualified courier on agreed days (typically Monday–Wednesday, holidays excluded);",
          "(b) packaging complies with IATA Live Animal Regulations, with proper insulation and, where needed, compliant heat or cold packs;",
          "(c) delivery is made to the courier's pickup point (Hub) and not to a residential address, unless otherwise agreed in writing.",
          "If the Specimen arrives dead (DOA), the Buyer must: (i) notify the Seller and HerpMarket within 2 hours of the package being available for pickup; (ii) provide photos and video of the Specimen in its original packaging within 6 hours; (iii) keep the Specimen at proper temperature until instructed by the Seller.",
          "The DOA guarantee does NOT apply to: (a) Specimens picked up in person by the Buyer (at expo or at Seller's premises); (b) delayed deliveries where the package nonetheless arrives alive; (c) deaths occurring after the package has been opened.",
        ],
      },
    },
    {
      id: "4", title: { it: "Esemplari non pronti («Not Ready»)", en: "Not-ready specimens" }, review: false,
      body: {
        it: [
          "I Venditori possono indicare un Esemplare come «Non pronto» quando questi è troppo giovane per essere spedito in sicurezza o non ha ancora completato lo svezzamento alimentare.",
          "Per gli Esemplari «Non pronti» il pagamento integrale non può essere richiesto. È ammesso un acconto pari al massimo al 30% del prezzo, da versare in escrow.",
          "Il saldo è dovuto solo dopo conferma di idoneità alla spedizione/ritiro da parte del Venditore.",
        ],
        en: [
          "Sellers may flag a Specimen as 'Not Ready' when it is too young to ship safely or has not yet completed feeding establishment.",
          "Full payment may not be requested for 'Not Ready' Specimens. A deposit of up to 30% of the price may be held in escrow.",
          "The balance is due only after the Seller confirms readiness for shipping/pickup.",
        ],
      },
    },
    {
      id: "5", title: { it: "Conferma di consegna e documenti", en: "Handover confirmation and documents" }, review: false,
      body: {
        it: [
          "La transazione si considera completata quando entrambe le parti confermano l'avvenuta consegna tramite la piattaforma. Fino a tale conferma, i fondi restano vincolati in escrow.",
          "Una volta confermata la consegna da entrambe le parti, HerpMarket genera automaticamente il documento di cessione (CITES per Allegato A/B; certificato di origine per le altre specie). Il documento è disponibile nell'archivio digitale di entrambe le parti.",
          "Il documento generato dalla piattaforma è un ausilio amministrativo. Per le specie CITES, la cessione formale richiede comunque la conservazione dei documenti originali secondo la normativa vigente.",
        ],
        en: [
          "The transaction is deemed completed when both parties confirm handover via the platform. Until such confirmation, funds remain held in escrow.",
          "Once both parties confirm handover, HerpMarket automatically generates the transfer document (CITES for Annex A/B; certificate of origin for other species). The document is available in both parties' digital archive.",
          "The platform-generated document is an administrative aid. For CITES species, formal transfer still requires retention of original documents per applicable law.",
        ],
      },
    },
    {
      id: "6", title: { it: "Recensioni", en: "Reviews" }, review: false,
      body: {
        it: [
          "Solo gli Acquirenti che hanno completato una transazione possono lasciare una recensione al Venditore. Le recensioni devono essere veritiere, riferirsi all'esperienza effettiva e rispettare la dignità del Venditore.",
          "HerpMarket si riserva il diritto di rimuovere recensioni manifestamente offensive, contenenti dati personali di terzi o non collegate alla transazione.",
        ],
        en: [
          "Only Buyers who have completed a transaction may leave a review for the Seller. Reviews must be truthful, refer to actual experience and respect the Seller's dignity.",
          "HerpMarket reserves the right to remove reviews that are manifestly offensive, contain third-party personal data, or are unrelated to the transaction.",
        ],
      },
    },
    {
      id: "7", title: { it: "Comportamenti vietati", en: "Prohibited conduct" }, review: false,
      body: {
        it: [
          "È vietato: (a) condurre transazioni al di fuori della piattaforma una volta avviato il contatto su HerpMarket; (b) creare account multipli, falsi o intestati a soggetti diversi; (c) pubblicare contenuti diffamatori, fraudolenti o ingannevoli; (d) sollecitare gli Utenti per scopi diversi dall'acquisto (es. spam, pubblicità non autorizzata); (e) tentare di aggirare le commissioni della piattaforma.",
        ],
        en: [
          "It is prohibited to: (a) conduct transactions outside the platform once contact has been initiated on HerpMarket; (b) create multiple, fake or third-party accounts; (c) post defamatory, fraudulent or misleading content; (d) solicit Users for purposes other than purchase (e.g. spam, unauthorised advertising); (e) attempt to circumvent platform fees.",
        ],
      },
    },
    {
      id: "8", title: { it: "Sanzioni", en: "Sanctions" }, review: true,
      body: {
        it: [
          "In caso di violazione del presente Regolamento o dei Termini di servizio, HerpMarket può adottare le seguenti misure proporzionate alla gravità: avvertimento; rimozione dell'annuncio; sospensione temporanea dell'account; chiusura definitiva dell'account; segnalazione alle autorità competenti.",
          "Le violazioni che comportano rischi per la salute degli animali o per la sicurezza pubblica determinano l'esclusione definitiva senza preavviso.",
        ],
        en: [
          "In case of breach of this Policy or the Terms of Service, HerpMarket may take the following measures, proportionate to severity: warning; listing removal; temporary account suspension; permanent account closure; reporting to competent authorities.",
          "Breaches involving risk to animal welfare or public safety result in permanent exclusion without notice.",
        ],
      },
    },
  ],
};

function LegalDoc({ doc, title, t, go, lang: outerLang }) {
  // Local override: even when the app language is EN, the binding version stays IT.
  // We surface this clearly with a toggle showing which version is binding.
  const [docLang, setDocLang] = useState(outerLang === "en" ? "en" : "it");
  const isBinding = docLang === "it";

  return (
    <div className="max-w-3xl mx-auto w-full pb-16">
      <header className="px-5 md:px-8 pt-8 pb-5 border-b border-stone-800 sticky top-0 bg-stone-950/95 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
          <h1 className="font-display text-2xl text-stone-50 tracking-tight">{title}</h1>
        </div>
        {/* Effective + version + language switcher */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-[10px] text-stone-500 leading-snug">
            <div className="font-bold uppercase tracking-widest">{outerLang === "it" ? "In vigore dal" : "Effective from"}</div>
            <div className="text-stone-300 font-bold">{doc.effectiveDate[outerLang === "it" ? "it" : "en"]} · v{doc.version}</div>
          </div>
          <div className="flex bg-stone-900 ring-1 ring-stone-800 rounded-lg p-0.5">
            <button onClick={() => setDocLang("it")}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      docLang === "it" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
                    }`}>
              IT {outerLang === "it" ? "· Vincolante" : "· Binding"}
            </button>
            <button onClick={() => setDocLang("en")}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      docLang === "en" ? "bg-stone-700 text-stone-100" : "text-stone-400 hover:text-stone-200"
                    }`}>
              EN {outerLang === "it" ? "· Cortesia" : "· Courtesy"}
            </button>
          </div>
        </div>
      </header>

      {/* Courtesy translation banner */}
      {!isBinding && (
        <div className="mx-5 md:mx-8 mt-5 bg-sky-500/5 ring-1 ring-sky-500/20 rounded-lg p-3 flex gap-2.5 items-start">
          <Info size={14} className="text-sky-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-sky-200/90 leading-relaxed">
            {outerLang === "it"
              ? "Stai leggendo la traduzione di cortesia in inglese. La versione italiana è quella giuridicamente vincolante."
              : "You are reading the English courtesy translation. The Italian version is the legally binding one."}
          </p>
        </div>
      )}

      {/* Table of contents */}
      <nav className="px-5 md:px-8 pt-6">
        <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{outerLang === "it" ? "Indice" : "Contents"}</div>
        <ol className="space-y-0.5 text-[13px]">
          {doc.sections.map(s => (
            <li key={s.id}>
              <a href={`#sec-${s.id}`}
                 className="text-stone-400 hover:text-amber-300 transition-colors flex items-baseline gap-2">
                <span className="font-bold text-stone-500 w-5 shrink-0">{s.id}.</span>
                <span className="flex-1">{s.title[docLang]}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <article className="px-5 md:px-8 pt-8 space-y-8">
        {doc.sections.map(s => (
          <section key={s.id} id={`sec-${s.id}`} className="scroll-mt-32">
            <header className="flex items-baseline gap-3 mb-3">
              <span className="font-display text-stone-600 text-2xl tracking-tight">{s.id}</span>
              <h2 className="font-display text-stone-100 text-xl tracking-tight leading-tight">{s.title[docLang]}</h2>
              {s.review && (
                <span title={outerLang === "it" ? "Richiede revisione legale prima del lancio" : "Requires legal review before launch"}
                      className="ml-auto text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 ring-1 ring-amber-500/20 px-1.5 py-0.5 rounded">
                  ⚠ {outerLang === "it" ? "Revisione" : "Review"}
                </span>
              )}
            </header>
            <div className="space-y-3 text-sm text-stone-300 leading-relaxed pl-1">
              {s.body[docLang].map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        ))}
      </article>

      {/* Final disclaimer */}
      <div className="mx-5 md:mx-8 mt-12 bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-5">
        <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
          {outerLang === "it" ? "Versione preliminare" : "Preliminary version"}
        </div>
        <p className="text-xs text-stone-400 leading-relaxed">
          {outerLang === "it"
            ? "Questo documento è una bozza redatta come base di lavoro. Le sezioni contrassegnate con ⚠ richiedono revisione da parte di un avvocato italiano prima del lancio operativo della piattaforma. I riferimenti normativi sono al diritto italiano ed europeo vigente alla data di stesura."
            : "This document is a working draft. Sections marked ⚠ require review by an Italian lawyer before the platform goes live. Legal references are to Italian and EU law as of the drafting date."}
        </p>
      </div>
    </div>
  );
}

function TermsLegal({ t, go, lang }) {
  return <LegalDoc doc={TOS_CONTENT} title={lang === "it" ? "Termini di servizio" : "Terms of service"} t={t} go={go} lang={lang} />;
}

function StorePolicy({ t, go, lang }) {
  return <LegalDoc doc={STORE_POLICY_CONTENT} title={lang === "it" ? "Regolamento marketplace" : "Marketplace policy"} t={t} go={go} lang={lang} />;
}
