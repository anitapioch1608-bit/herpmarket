import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Home, Search, PlusCircle, MessageCircle, User,
  ChevronRight, ChevronLeft, ShieldCheck, MapPin,
  Star, Calendar, SlidersHorizontal, FileText, CheckCircle,
  Camera, Heart, Mars, Venus, HelpCircle, X,
  ArrowUpDown, Lock, CreditCard, Info, Languages, Send,
  LogIn, LogOut, Globe, Truck, Scale,
  ListOrdered, Grid3x3, Settings as SettingsIcon, Mail,
  Clock, PackageCheck, Hourglass, Check, Bell, UploadCloud, GitBranch, Loader2
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
    category: "Categoria",
    breedingProjects: "Progetti di riproduzione",
    breedingIntro: "Pianifica e visualizza i tuoi accoppiamenti — sostituisci i fogli Excel con un planner visivo.",
    breedingSoon: "Presto disponibile",
    breedingSoonText: "Stiamo costruendo uno strumento visivo per pianificare gli accoppiamenti, calcolare le probabilità genetiche della prole e tracciare ogni progetto stagione dopo stagione. Niente più fogli Excel.",
    breedingFeat1: "Calcolo automatico delle probabilità genetiche (Punnett)",
    breedingFeat2: "Pianificazione visiva accoppiamenti per stagione",
    breedingFeat3: "Collegamento agli esemplari nel tuo inventario",
    breedingFeat4: "Esportazione e condivisione dei progetti",
    breedingNotify: "Avvisami quando è pronto",
    detailedSearch: "Ricerca dettagliata", detailedSearchSub: "Filtra per tratti, prezzo, paese", viewAuctions: "Vedi le aste", viewAuctionsSub: "Solo annunci all'asta",
    allListings: "Tutti gli annunci", seeAll: "Vedi tutti",
    heroTitle: "Scopri i rettili e gli animali esotici premium in Italia.",
    heroSub: "Connettiti direttamente con allevatori verificati per morph esclusivi e specie rare. Dalla documentazione CITES automatica ai ritiri sicuri e garantiti alle grandi fiere come Verona o Hamm: tutto ciò di cui hai bisogno è qui.",
    heroBtn: "Esplora il marketplace",
    browseListings: "Sfoglia annunci", sellCta: "Vendi un animale", orSep: "oppure",
    filters: "Filtri", sort: "Ordina", apply: "Applica", reset: "Reimposta",
    sortNewest: "Più recenti", sortPriceAsc: "Prezzo: crescente", sortPriceDesc: "Prezzo: decrescente", sortDistance: "Distanza", sortRating: "Miglior valutazione",
    advFilters: "Filtri avanzati", priceRange: "Fascia di prezzo", anyPrice: "Qualsiasi", min: "Min", max: "Max",
    traitsLabel: "Geni e tratti", traitClassLabel: "Tipo genetico", subCategoryLabel: "Specie",
    sellerLabel: "Allevatore", anySeller: "Tutti gli allevatori", anySpecies: "Tutte le specie",
    anyRegion: "Tutte le regioni", geneticsBreeding: "Genetica e progetti di riproduzione",
    expoOnlyLabel: "Solo con ritiro in fiera", verifiedOnlyLabel: "Solo allevatori verificati",
    clearAll: "Cancella tutto", classRecessive: "Recessivo", classDominant: "Dominante", classIncDom: "Co-dom", classLine: "Linea/Poligenico", classLocality: "Località", classHet: "Het (portatore)",
    selectCategoryFirst: "Seleziona prima una categoria per vedere i tratti disponibili",
    species: "Specie", traits: "Tratti / Morph", sex: "Sesso", age: "Età", price: "Prezzo", region: "Regione", expoOnly: "Solo ritiro in fiera",
    male: "Maschio", female: "Femmina", unsexed: "Non sessato", pair: "Coppia",
    months: "mesi", year: "anno", years: "anni",
    seller: "Venditore", country: "IT", verifiedBreeder: "Allevatore verificato", message: "Messaggia",
    sellerStorefront: "Negozio", sellerAnimals: "Animali", sellerReviews: "Recensioni", sellerAbout: "Info",
    sellerMemberSince: "Membro dal", sellerTotalSales: "Vendite totali", sellerSpecialties: "Specializzazioni",
    sellerAttendsExpos: "Partecipa alle fiere", sellerNoExpos: "Nessuna fiera in programma",
    sellerNoReviews: "Nessuna recensione ancora",
    reserveAtExpo: "Prenota per la fiera", payDeposit: "Paga acconto",
    reservationPending: "In attesa di approvazione…", reserved: "Riservato a te",
    // Transaction-flow keys
    txRequest: "Richiedi acquisto", txRequestExpo: "Richiedi prenotazione fiera",
    deliveryChoose: "Come vuoi ricevere l'animale?",
    deliveryShip: "Acquista e spedisci", deliveryShipDesc: "Pagamento completo, spedizione con corriere abilitato",
    deliveryExpo: "Prenota per la fiera", deliveryExpoDesc: "Acconto 10%, ritiro allo stand del venditore",
    noShipping: "Spedizione non disponibile", noShippingDesc: "Questo venditore non spedisce questo esemplare. Disponibile solo per ritiro alle fiere indicate sotto.",
    availableAtExpos: "Disponibile a queste fiere", noExpoNoShip: "Nessuna opzione di consegna impostata dal venditore. Contattalo via messaggio.",
    buyAndShip: "Acquista e spedisci",
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
    listedOn: "Pubblicato il", lastUpdated: "Ultimo aggiornamento",
    born: "Nato", weight: "Peso", origin: "Origine", captiveBred: "Nato in cattività",
    cites: "Documenti CITES", citesNotice: "Documento di cessione richiesto per Allegato A/B",
    listingTitle: "Titolo annuncio", uploadPhotos: "Carica foto (min. 1, max. 3)", publishListing: "Pubblica annuncio",
    photoHint: "Trascina qui o tocca per sceglierle dal dispositivo", photoNeed: "Aggiungi almeno una foto",
    needSpecies: "Seleziona o inserisci una specie", needPrice: "Inserisci un prezzo", needLoginPub: "Accedi per pubblicare", publishing: "Pubblicazione…", uploadingPhotos: "Caricamento foto…", uploadingHint: "Non chiudere l'app, può richiedere qualche secondo.",
    reserveTooLow: "Il prezzo di riserva non può essere inferiore al prezzo di partenza",
    shippingHighWarn: "Il costo di spedizione sembra alto rispetto al prezzo. Sei sicuro?",
    fieldRequired: "obbligatorio",
    needRegion: "Seleziona la regione", chooseRegion: "Seleziona regione…",
    needTitle: "Inserisci un titolo per l'annuncio", needCategory: "Seleziona una categoria",
    citesCheckLabel: "Specie CITES (Allegato A/B/C/D Reg. CE 338/97)",
    citesCheckHint: "Sei responsabile dello stato CITES del tuo esemplare. Per le specie CITES è richiesta la data di nascita esatta.",
    needFullBirth: "Per le specie CITES inserisci la data di nascita esatta (giorno, mese e anno)",
    mlIntro: "I tuoi annunci pubblicati. Modifica prezzo e descrizione o elimina un annuncio.",
    mlEmpty: "Non hai ancora pubblicato annunci.", mlEdit: "Modifica", mlSave: "Salva", mlDelete: "Elimina",
    mlConfirmDelete: "Eliminare definitivamente questo annuncio?", mlDeleted: "Annuncio eliminato.",
    markSold: "Segna come venduto", soldBadge: "Venduto", markSoldTitle: "Registra la vendita",
    soldWalkin: "Acquirente in fiera", soldAppUser: "Utente HerpMarket",
    soldPickBuyer: "Scegli l'acquirente…", soldNoInquirers: "Nessun utente ti ha contattato per questo annuncio. Usa 'Acquirente in fiera'.",
    soldBuyerName: "Nome e cognome acquirente", soldBuyerAddress: "Indirizzo (per i documenti CITES)",
    soldCitesNote: "Specie CITES: nome e indirizzo dell'acquirente sono necessari per la dichiarazione di cessione.",
    confirmSold: "Conferma vendita",
    colActive: "In vendita", colSold: "Venduti", colHeld: "Tenuti", colBreeder: "Riproduttori",
    addAnimal: "Aggiungi animale", addAnimalTitle: "Aggiungi alla collezione",
    addAnimalIntro: "Aggiungi un animale alla tua collezione (non in vendita). Potrai metterlo in vendita in seguito.",
    animalStatus: "Stato", statusHeld: "Tenuto", statusBreeder: "Riproduttore",
    addAnimalSave: "Aggiungi alla collezione", animalAdded: "Animale aggiunto alla collezione!",
    removeListingTitle: "Rimuovere dalla vendita?",
    removeListingIntro: "Cosa vuoi fare con questo animale?",
    removeToHeld: "Tieni (non in vendita)", removeToBreeder: "Sposta nei riproduttori",
    removeToSold: "Segna come venduto", removeDelete: "Elimina definitivamente",
    colEmptyActive: "Nessun animale in vendita.", colEmptySold: "Nessun animale venduto.",
    colEmptyHeld: "Nessun animale tenuto.", colEmptyBreeder: "Nessun riproduttore.",
    relist: "Metti in vendita", relistTitle: "Metti in vendita", relistConfirm: "Pubblica in vendita",
    spTitle: "Il mio negozio", spIntro: "Personalizza la tua pagina allevatore: foto, descrizione e dettagli.",
    spPhoto: "Foto del profilo", spUpload: "Carica foto", spCity: "Città", spBio: "Descrizione",
    spSpecialties: "Specializzazioni (separate da virgola)", spSpecialtiesPh: "es. Correlophus ciliatus, Python regius",
    spSave: "Salva modifiche", spSaved: "Modifiche salvate!", spNameTaken: "Questo nome è già in uso, scegline un altro.",
    spStoreName: "Nome del negozio", spStoreNameHint: "Facoltativo. Se impostato, gli acquirenti vedranno e cercheranno questo nome invece del tuo nome reale.",
    spView: "Vedi la tua pagina pubblica",
    pickSpecies: "Seleziona specie", pickTraits: "Aggiungi tratti", describePlaceholder: "Carattere, alimentazione, condizioni di salute…",
    typeMessage: "Scrivi un messaggio…",
    chatEmpty: "Nessun messaggio ancora. Scrivi per primo!",
    chatNoThreads: "Nessuna conversazione. Contatta un allevatore da un annuncio.",
    chatNoThread: "Impossibile aprire la conversazione per questo annuncio.",
    chatBuyer: "Acquirente", chatSeller: "Allevatore", tNow: "ora", chatYou: "Tu",
    noReviewsYet: "Nessuna recensione",
    proCapReached: "Hai raggiunto il limite di 5 annunci del piano gratuito. Passa a Pro per annunci illimitati — scrivici per attivarlo!",
    spWebsite: "Sito web", spWebsitePh: "https://iltuosito.it", proOnly: "Solo Pro", spWebsiteProNote: "Mostra un link al tuo sito sulla tua pagina pubblica (funzione Pro).",
    visitWebsite: "Visita il sito", onlineNow: "Online", translateIT: "Traduci in italiano",
    yourAccount: "Il tuo account", wishlist: "Preferiti", myListings: "I miei annunci", manageListing: "Gestisci annuncio", documents: "Archivio documenti", reviews: "Recensioni", settings: "Impostazioni", legalGuide: "Guida legale", logout: "Esci",
    inventory: "Inventario animali", lineage: "Genetica & Pedigree", transport: "Eco-Taxi (Trasporti)",
    invIntro: "Gestisci la tua collezione: esemplari riproduttori, in vendita e venduti.",
    invBreeders: "Riproduttori", invForSale: "In vendita", invSold: "Venduti", invAdd: "Aggiungi esemplare",
    invStatus: "Stato", invStatusBreeder: "Riproduttore", invStatusSale: "In vendita", invStatusSold: "Venduto", invStatusHeld: "Tenuto",
    invEmpty: "Nessun esemplare in questa categoria",
    lineageIntro: "Albero genealogico e tracciamento genetico dei tuoi esemplari.",
    lineageSire: "Padre", lineageDam: "Madre", lineageOffspring: "Discendenza", lineagePairings: "Accoppiamenti",
    lineageProjects: "Progetti di riproduzione", lineageExpected: "Atteso", lineageHatched: "Nati",
    reviewsIntro: "Le recensioni ricevute dai tuoi acquirenti.",
    reviewsAvg: "Valutazione media", reviewsTotal: "recensioni totali", reviewsEmpty: "Ancora nessuna recensione",
    reviewsFrom: "da", reviewsReply: "Rispondi", reviewsReplied: "Risposto",
    aboutContact: "Chi siamo & Contatti", termsLegal: "Termini di servizio", settingsKyc: "Impostazioni & KYC",
    storePolicyLabel: "Regolamento marketplace",
    privacyLabel: "Privacy Policy",
    plansLabel: "Piani", plansComingSoon: "I piani Pro saranno disponibili in futuro. Al momento HerpMarket è gratuito per tutti.",
    plansDescription: "Quando lanceremo piani Pro per allevatori (annunci illimitati, store personalizzato, posizionamento prioritario), riceverai un preavviso di 30 giorni e potrai continuare con il piano gratuito.",
    sponsorLabel: "Sponsor",
    // Cookie/privacy banner
    cookieTitle: "Privacy & Cookie",
    cookieBody: "HerpMarket usa cookie tecnici essenziali per il funzionamento del sito. Per analisi anonime usiamo Vercel Analytics (privacy-friendly, no tracking individuale). Vedi la nostra Privacy Policy per i dettagli.",
    cookieAccept: "Accetto",
    cookieDecline: "Rifiuta analitiche",
    cookieMore: "Maggiori informazioni",
    // Signup consent
    consentTosLabel: "Accetto i Termini di Servizio e il Regolamento Marketplace",
    consentPrivacyLabel: "Ho letto la Privacy Policy e acconsento al trattamento dei dati come descritto",
    consentMarketingLabel: "Voglio ricevere aggiornamenti sulle fiere e nuovi annunci (facoltativo, posso disiscrivermi in qualsiasi momento)",
    consentRequired: "Accetta Termini e Privacy per continuare",
    consentReadHere: "Leggi qui",
    // Account deletion
    deleteAccount: "Elimina account", deleteAccountIntro: "Elimina permanentemente il tuo account e tutti i dati associati.",
    deleteWarning: "Questa azione è irreversibile. Tutti i tuoi dati personali verranno cancellati entro 30 giorni. Le transazioni completate e i documenti CITES devono essere conservati per obblighi di legge (max 10 anni) ma vengono pseudonimizzati.",
    deleteConfirmPrompt: "Per confermare, digita ELIMINA qui sotto:",
    deleteConfirmWord: "ELIMINA",
    deleteButton: "Elimina definitivamente",
    deleteCancel: "Annulla",
    deleteSuccess: "Richiesta inviata. Il tuo account verrà cancellato entro 30 giorni.",
    // Privacy area in settings
    privacySection: "Privacy e dati",
    dataExport: "Scarica i miei dati", dataExportDesc: "Esporta tutti i tuoi dati personali in formato JSON (GDPR Art. 20)",
    dataExportDone: "Esportazione avviata. Riceverai il file via email entro 30 giorni.",
    kycTitle: "Verifica identità", kycVerified: "Verificato", kycPending: "In revisione", kycUnverified: "Non verificato",
    kycIntro: "La spunta blu conferma che sei una persona reale. Basta un documento d'identità — non serve partita IVA o licenza commerciale.",
    kycVisura: "Visura camerale o P.IVA", kycAsl: "Numero registrazione ASL", kycDoc: "Documento d'identità",
    kycRequired: "Obbligatorio", kycOptional: "Facoltativo · allevatori professionali",
    kycDocHint: "Carta d'identità, passaporto o patente. Serve solo a confermare che sei una persona reale; non viene mostrato pubblicamente.",
    kycOptionalHint: "Se sei un allevatore professionale puoi aggiungere questi documenti per maggiore credibilità. Non sono obbligatori.",
    kycAslHint: "Solo Italia: registrazione presso l'Azienda Sanitaria Locale per gli allevatori commerciali. Lascia vuoto se non applicabile.",
    kycUpload: "Carica documento", kycUploaded: "Caricato", kycSubmit: "Invia per la verifica",
    kycSubmitted: "Documenti inviati. Ti avviseremo entro 48 ore.",
    kycWhy: "Perché verificarsi?", kycWhyText: "Gli acquirenti si fidano di più dei venditori verificati. La spunta blu appare su tutti i tuoi annunci e sul tuo profilo.",
    notifTitle: "Notifiche push", notifIntro: "Ricevi avvisi in tempo reale anche quando l'app è chiusa.",
    notifComingSoon: "Le notifiche push arriveranno presto. Per ora, apri l'app per vedere nuovi messaggi, offerte e promemoria delle fiere.",
    notifEnable: "Attiva notifiche", notifEnabled: "Notifiche attive", notifMessages: "Nuovi messaggi",
    notifReservations: "Approvazione prenotazioni", notifPriceDrops: "Cali di prezzo nei preferiti", notifExpo: "Promemoria fiere",
    accountSection: "Account", notifSection: "Notifiche", verificationSection: "Verifica",
    langSection: "Lingua",
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
    forgotPassword: "Password dimenticata?", resetTitle: "Reimposta la password",
    resetIntro: "Inserisci la tua email: ti invieremo un link per reimpostare la password.",
    sendResetLink: "Invia link di reset", resetEmailSent: "Email inviata! Controlla la tua casella di posta.",
    backToLogin: "Torna al login", processing: "Attendere…",
    newPasswordTitle: "Imposta una nuova password", newPasswordLabel: "Nuova password",
    savePassword: "Salva password", passwordUpdated: "Password aggiornata. Ora puoi accedere.",
    checkEmailConfirm: "Account creato! Controlla la tua email per confermare l'indirizzo.",
    deleteAccount: "Elimina account", deleteAccountDesc: "Eliminazione dell'account e dei dati associati.",
    deleteAccountWarn: "Questa azione è permanente. I tuoi annunci e dati verranno rimossi. Procedere?",
    deleteAccountDone: "Account contrassegnato per l'eliminazione. Sei stato disconnesso.",
    confirmDelete: "Sì, elimina", keepAccount: "Annulla",
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
    auction: "Asta", auctionLabel: "ASTA", auctionLive: "Asta in corso", startPrice: "Prezzo di partenza", currentBid: "Offerta attuale",
    placeBid: "Fai un'offerta", yourBid: "La tua offerta", bidCount: "offerte", bids: "offerte",
    reserveMet: "Riserva raggiunta", reserveNotMet: "Riserva non raggiunta",
    auctionEnds: "Termina tra", auctionEnded: "Asta conclusa", minimumBid: "Offerta minima",
    bidPlaced: "Offerta inviata!", outbid: "Sei stato superato", winning: "Sei in testa",
    days: "g", hours: "h", minutes: "min", buyNow: "Compra subito",
    bidTooLow: "L'offerta deve superare l'offerta attuale",
    auctionInfo: "In un'asta, fai un'offerta superiore a quella attuale. Se sei il miglior offerente alla scadenza e la riserva è raggiunta, vinci l'esemplare.",
    auctionWon: "🎉 Hai vinto l'asta! Contatta il venditore per completare l'acquisto.",
    auctionEndedWinner: "Asta conclusa. L'esemplare è stato aggiudicato al miglior offerente.",
    auctionEndedNoReserve: "Asta conclusa: prezzo di riserva non raggiunto. Il venditore non è obbligato a vendere.",
    auctionEndedNoBids: "Asta conclusa senza offerte.",
    auctionContactToComplete: "Contatta il venditore",
    crossBorderTitle: "Vendita transfrontaliera",
    crossBorderEu: "Questo esemplare proviene da un altro Paese UE. Per il trasporto è richiesta la registrazione TRACES e, per le specie CITES Allegato A/B, la documentazione di movimento intra-UE.",
    crossBorderCh: "Attenzione: questo Paese non fa parte dell'UE. Il movimento di animali vivi da/verso l'UE attraversa una frontiera doganale e richiede controlli veterinari di confine e permessi di importazione/esportazione. Verifica i requisiti prima di procedere.",
    sellerCountryLabel: "Paese del venditore", countryLabel: "Paese", anyCountry: "Tutti i Paesi", clearFilters: "Cancella filtri", viewMyListing: "Vedi il mio annuncio", msgSending: "Invio…", msgSent: "Inviato", verifyBannerTitle: "Verifica il tuo account", verifyBannerSub: "Ottieni la spunta blu e aumenta la fiducia degli acquirenti.",
    nextStepsTitle: "Prossimi passi", nextStepsExpo: (name, date) => `Il venditore ti incontrerà a ${name}${date ? " il " + date : ""}. L'acconto del 10% resta protetto dal sistema di pagamento fino alla consegna.`, nextStepsExpoGeneric: "Il venditore ti incontrerà alla fiera concordata. L'acconto del 10% resta protetto fino alla consegna.", nextStepsShipping: "Il venditore ti contatterà in chat per concordare la spedizione (di solito lun–mer). Riceverai qui i dettagli di tracciamento.",
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
    category: "Category",
    breedingProjects: "Breeding projects",
    breedingIntro: "Plan and visualise your pairings — replace Excel sheets with a visual planner.",
    breedingSoon: "Coming soon",
    breedingSoonText: "We're building a visual tool to plan pairings, calculate the genetic odds of the offspring, and track each project season after season. No more Excel sheets.",
    breedingFeat1: "Automatic genetic odds calculation (Punnett)",
    breedingFeat2: "Visual pairing planner by season",
    breedingFeat3: "Linked to the animals in your inventory",
    breedingFeat4: "Export and share your projects",
    breedingNotify: "Notify me when it's ready",
    detailedSearch: "Detailed search", detailedSearchSub: "Filter by traits, price, country", viewAuctions: "View auctions", viewAuctionsSub: "Auction listings only",
    allListings: "All listings", seeAll: "See all",
    heroTitle: "Discover Italy's Premium Reptiles & Exotic Animals.",
    heroSub: "Connect directly with verified breeders for high-end morphs and rare species. From automated CITES documentation to secure, guaranteed pickups at major expos like Verona or Hamm—everything you need is right here.",
    heroBtn: "Browse the Marketplace",
    browseListings: "Browse listings", sellCta: "Sell an animal", orSep: "or",
    filters: "Filters", sort: "Sort", apply: "Apply", reset: "Reset",
    sortNewest: "Newest first", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low", sortDistance: "Nearest first", sortRating: "Top rated",
    advFilters: "Advanced filters", priceRange: "Price range", anyPrice: "Any", min: "Min", max: "Max",
    traitsLabel: "Genes & traits", traitClassLabel: "Genetic type", subCategoryLabel: "Species",
    sellerLabel: "Breeder", anySeller: "All breeders", anySpecies: "All species",
    anyRegion: "All regions", geneticsBreeding: "Genetics & breeding projects",
    expoOnlyLabel: "Expo pickup only", verifiedOnlyLabel: "Verified breeders only",
    clearAll: "Clear all", classRecessive: "Recessive", classDominant: "Dominant", classIncDom: "Co-dom", classLine: "Line/Polygenic", classLocality: "Locality", classHet: "Het (carrier)",
    selectCategoryFirst: "Select a category first to see available traits",
    species: "Species", traits: "Traits / Morph", sex: "Sex", age: "Age", price: "Price", region: "Region", expoOnly: "Expo pickup only",
    male: "Male", female: "Female", unsexed: "Unsexed", pair: "Pair",
    months: "months", year: "year", years: "years",
    seller: "Seller", country: "IT", verifiedBreeder: "Verified breeder", message: "Message",
    sellerStorefront: "Store", sellerAnimals: "Animals", sellerReviews: "Reviews", sellerAbout: "About",
    sellerMemberSince: "Member since", sellerTotalSales: "Total sales", sellerSpecialties: "Specialties",
    sellerAttendsExpos: "Attending expos", sellerNoExpos: "No upcoming expos",
    sellerNoReviews: "No reviews yet",
    reserveAtExpo: "Reserve for expo", payDeposit: "Pay deposit",
    reservationPending: "Awaiting approval…", reserved: "Reserved for you",
    // Transaction-flow keys
    txRequest: "Request to buy", txRequestExpo: "Request expo reservation",
    deliveryChoose: "How do you want to receive the animal?",
    deliveryShip: "Buy & ship", deliveryShipDesc: "Full payment, delivery by authorised courier",
    deliveryExpo: "Reserve for expo", deliveryExpoDesc: "10% deposit, pickup at the seller's stand",
    noShipping: "Shipping not available", noShippingDesc: "This seller does not ship this animal. Available only for pickup at the expos listed below.",
    availableAtExpos: "Available at these expos", noExpoNoShip: "No delivery option set by the seller. Contact them by message.",
    buyAndShip: "Buy & ship",
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
    listedOn: "Listed on", lastUpdated: "Last updated",
    born: "Born", weight: "Weight", origin: "Origin", captiveBred: "Captive-bred",
    cites: "CITES paperwork", citesNotice: "Transfer document required for Annex A/B",
    listingTitle: "Listing title", uploadPhotos: "Upload photos (min. 1, max. 3)", publishListing: "Publish listing",
    photoHint: "Drag here or tap to choose from your device", photoNeed: "Add at least one photo",
    needSpecies: "Select or enter a species", needPrice: "Enter a price", needLoginPub: "Log in to publish", publishing: "Publishing…", uploadingPhotos: "Uploading photos…", uploadingHint: "Don't close the app, this can take a few seconds.",
    reserveTooLow: "The reserve price can't be lower than the starting price",
    shippingHighWarn: "Shipping seems high relative to the item price. Are you sure?",
    fieldRequired: "required",
    needRegion: "Select the region", chooseRegion: "Select region…",
    needTitle: "Enter a listing title", needCategory: "Select a category",
    citesCheckLabel: "CITES species (Annex A/B/C/D, EU Reg. 338/97)",
    citesCheckHint: "You are responsible for your animal's CITES status. CITES species require an exact date of birth.",
    needFullBirth: "CITES species require an exact date of birth (day, month and year)",
    mlIntro: "Your published listings. Edit price and description or delete a listing.",
    mlEmpty: "You haven't published any listings yet.", mlEdit: "Edit", mlSave: "Save", mlDelete: "Delete",
    mlConfirmDelete: "Permanently delete this listing?", mlDeleted: "Listing deleted.",
    markSold: "Mark as sold", soldBadge: "Sold", markSoldTitle: "Record the sale",
    soldWalkin: "Expo / walk-in buyer", soldAppUser: "HerpMarket user",
    soldPickBuyer: "Choose the buyer…", soldNoInquirers: "No users contacted you about this listing. Use 'Expo / walk-in buyer'.",
    soldBuyerName: "Buyer's full name", soldBuyerAddress: "Address (for CITES documents)",
    soldCitesNote: "CITES species: the buyer's name and address are needed for the transfer declaration.",
    confirmSold: "Confirm sale",
    colActive: "For sale", colSold: "Sold", colHeld: "Held back", colBreeder: "Breeders",
    addAnimal: "Add animal", addAnimalTitle: "Add to collection",
    addAnimalIntro: "Add an animal to your collection (not for sale). You can list it for sale later.",
    animalStatus: "Status", statusHeld: "Held back", statusBreeder: "Breeder",
    addAnimalSave: "Add to collection", animalAdded: "Animal added to your collection!",
    removeListingTitle: "Remove from sale?",
    removeListingIntro: "What do you want to do with this animal?",
    removeToHeld: "Keep (not for sale)", removeToBreeder: "Move to breeders",
    removeToSold: "Mark as sold", removeDelete: "Delete permanently",
    colEmptyActive: "No animals for sale.", colEmptySold: "No sold animals.",
    colEmptyHeld: "No held-back animals.", colEmptyBreeder: "No breeders.",
    relist: "List for sale", relistTitle: "List for sale", relistConfirm: "Publish for sale",
    spTitle: "My store", spIntro: "Customise your breeder page: photo, description and details.",
    spPhoto: "Profile photo", spUpload: "Upload photo", spCity: "City", spBio: "Description",
    spSpecialties: "Specialties (comma-separated)", spSpecialtiesPh: "e.g. Correlophus ciliatus, Python regius",
    spSave: "Save changes", spSaved: "Changes saved!", spNameTaken: "That name is already taken, choose another.",
    spStoreName: "Store name", spStoreNameHint: "Optional. If set, buyers will see and search for this name instead of your real name.",
    spView: "View your public page",
    pickSpecies: "Select species", pickTraits: "Add traits", describePlaceholder: "Temperament, feeding, health…",
    typeMessage: "Type a message…",
    chatEmpty: "No messages yet. Be the first to write!",
    chatNoThreads: "No conversations yet. Contact a breeder from a listing.",
    chatNoThread: "Couldn't open the conversation for this listing.",
    chatBuyer: "Buyer", chatSeller: "Breeder", tNow: "now", chatYou: "You",
    noReviewsYet: "No reviews yet",
    proCapReached: "You've reached the free plan's 5-listing limit. Upgrade to Pro for unlimited listings — message us to enable it!",
    spWebsite: "Website", spWebsitePh: "https://yoursite.com", proOnly: "Pro only", spWebsiteProNote: "Show a link to your site on your public page (Pro feature).",
    visitWebsite: "Visit website", onlineNow: "Online", translateIT: "Translate to Italian",
    yourAccount: "Your account", wishlist: "Saved", myListings: "My listings", manageListing: "Manage listing", documents: "Documents", reviews: "Reviews", settings: "Settings", legalGuide: "Legal guide", logout: "Sign out",
    inventory: "Animal inventory", lineage: "Genetics & Pedigree", transport: "Eco-Taxi (Transport)",
    invIntro: "Manage your collection: breeders, animals for sale, and sold animals.",
    invBreeders: "Breeders", invForSale: "For sale", invSold: "Sold", invAdd: "Add animal",
    invStatus: "Status", invStatusBreeder: "Breeder", invStatusSale: "For sale", invStatusSold: "Sold", invStatusHeld: "Held back",
    invEmpty: "No animals in this category",
    lineageIntro: "Family tree and genetic tracking of your animals.",
    lineageSire: "Sire", lineageDam: "Dam", lineageOffspring: "Offspring", lineagePairings: "Pairings",
    lineageProjects: "Breeding projects", lineageExpected: "Expected", lineageHatched: "Hatched",
    reviewsIntro: "Reviews received from your buyers.",
    reviewsAvg: "Average rating", reviewsTotal: "total reviews", reviewsEmpty: "No reviews yet",
    reviewsFrom: "from", reviewsReply: "Reply", reviewsReplied: "Replied",
    aboutContact: "About us & Contact", termsLegal: "Terms of service", settingsKyc: "Settings & KYC",
    storePolicyLabel: "Marketplace policy",
    privacyLabel: "Privacy Policy",
    plansLabel: "Plans", plansComingSoon: "Pro plans will be available in the future. HerpMarket is currently free for everyone.",
    plansDescription: "When we launch Pro plans for breeders (unlimited listings, custom store, priority placement), you'll get 30 days' notice and can keep using the free tier.",
    sponsorLabel: "Sponsor",
    cookieTitle: "Privacy & Cookies",
    cookieBody: "HerpMarket uses essential technical cookies to run the site. For anonymous analytics we use Vercel Analytics (privacy-friendly, no individual tracking). See our Privacy Policy for details.",
    cookieAccept: "Accept",
    cookieDecline: "Decline analytics",
    cookieMore: "More info",
    consentTosLabel: "I accept the Terms of Service and Marketplace Policy",
    consentPrivacyLabel: "I have read the Privacy Policy and consent to the data processing as described",
    consentMarketingLabel: "I want to receive updates about expos and new listings (optional, I can unsubscribe anytime)",
    consentRequired: "Accept Terms and Privacy to continue",
    consentReadHere: "Read here",
    deleteAccount: "Delete account", deleteAccountIntro: "Permanently delete your account and all associated data.",
    deleteWarning: "This action is irreversible. All your personal data will be deleted within 30 days. Completed transactions and CITES documents must be kept for legal obligations (up to 10 years) but are pseudonymised.",
    deleteConfirmPrompt: "To confirm, type DELETE below:",
    deleteConfirmWord: "DELETE",
    deleteButton: "Delete permanently",
    deleteCancel: "Cancel",
    deleteSuccess: "Request submitted. Your account will be deleted within 30 days.",
    privacySection: "Privacy & data",
    dataExport: "Download my data", dataExportDesc: "Export all your personal data as JSON (GDPR Art. 20)",
    dataExportDone: "Export started. You'll receive the file by email within 30 days.",
    kycTitle: "Identity verification", kycVerified: "Verified", kycPending: "Under review", kycUnverified: "Not verified",
    kycIntro: "The blue check confirms you're a real person. All it takes is an ID document — no VAT number or business licence needed.",
    kycVisura: "Business registration or VAT", kycAsl: "ASL registration number", kycDoc: "ID document",
    kycRequired: "Required", kycOptional: "Optional · professional breeders",
    kycDocHint: "ID card, passport or driving licence. Used only to confirm you're a real person; it's never shown publicly.",
    kycOptionalHint: "If you're a professional breeder you can add these for extra credibility. They're not required.",
    kycAslHint: "Italy only: registration with the local health authority (ASL) for commercial breeders. Leave blank if it doesn't apply.",
    kycUpload: "Upload document", kycUploaded: "Uploaded", kycSubmit: "Submit for review",
    kycSubmitted: "Documents submitted. We'll notify you within 48 hours.",
    kycWhy: "Why verify?", kycWhyText: "Buyers trust verified sellers more. The blue check appears on all your listings and your profile.",
    notifTitle: "Push notifications", notifIntro: "Get real-time alerts even when the app is closed.",
    notifComingSoon: "Push notifications are coming soon. For now, open the app to see new messages, bids and expo reminders.",
    notifEnable: "Enable notifications", notifEnabled: "Notifications on", notifMessages: "New messages",
    notifReservations: "Reservation approvals", notifPriceDrops: "Wishlist price drops", notifExpo: "Expo reminders",
    accountSection: "Account", notifSection: "Notifications", verificationSection: "Verification",
    langSection: "Language",
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
    forgotPassword: "Forgot password?", resetTitle: "Reset your password",
    resetIntro: "Enter your email and we'll send you a link to reset your password.",
    sendResetLink: "Send reset link", resetEmailSent: "Email sent! Check your inbox.",
    backToLogin: "Back to login", processing: "Please wait…",
    newPasswordTitle: "Set a new password", newPasswordLabel: "New password",
    savePassword: "Save password", passwordUpdated: "Password updated. You can log in now.",
    checkEmailConfirm: "Account created! Check your email to confirm your address.",
    deleteAccount: "Delete account", deleteAccountDesc: "Delete your account and associated data.",
    deleteAccountWarn: "This is permanent. Your listings and data will be removed. Continue?",
    deleteAccountDone: "Account marked for deletion. You've been signed out.",
    confirmDelete: "Yes, delete", keepAccount: "Cancel",
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
    auction: "Auction", auctionLabel: "AUCTION", auctionLive: "Auction live", startPrice: "Starting price", currentBid: "Current bid",
    placeBid: "Place a bid", yourBid: "Your bid", bidCount: "bids", bids: "bids",
    reserveMet: "Reserve met", reserveNotMet: "Reserve not met",
    auctionEnds: "Ends in", auctionEnded: "Auction ended", minimumBid: "Minimum bid",
    bidPlaced: "Bid placed!", outbid: "You've been outbid", winning: "You're winning",
    days: "d", hours: "h", minutes: "min", buyNow: "Buy now",
    bidTooLow: "Bid must exceed the current bid",
    auctionInfo: "In an auction, place a bid above the current one. If you're the highest bidder when it ends and the reserve is met, you win the animal.",
    auctionWon: "🎉 You won the auction! Contact the seller to complete the purchase.",
    auctionEndedWinner: "Auction ended. The animal went to the highest bidder.",
    auctionEndedNoReserve: "Auction ended: reserve price not met. The seller is not obliged to sell.",
    auctionEndedNoBids: "Auction ended with no bids.",
    auctionContactToComplete: "Contact the seller",
    crossBorderTitle: "Cross-border sale",
    crossBorderEu: "This animal is located in another EU country. Transport requires TRACES registration and, for CITES Annex A/B species, intra-EU movement documentation.",
    crossBorderCh: "Note: this country is not part of the EU. Moving live animals to/from the EU crosses a customs border and requires border veterinary checks and import/export permits. Check the requirements before proceeding.",
    sellerCountryLabel: "Seller country", countryLabel: "Country", anyCountry: "All countries", clearFilters: "Clear filters", viewMyListing: "View my listing", msgSending: "Sending…", msgSent: "Sent", verifyBannerTitle: "Verify your account", verifyBannerSub: "Get the blue check and build buyer trust.",
    nextStepsTitle: "Next steps", nextStepsExpo: (name, date) => `The seller will meet you at ${name}${date ? " on " + date : ""}. Your 10% deposit is held securely by the payment provider until handover.`, nextStepsExpoGeneric: "The seller will meet you at the agreed expo. Your 10% deposit is held securely until handover.", nextStepsShipping: "The seller will contact you in chat to confirm shipping (usually Mon–Wed). You'll receive tracking details here.",
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

/* Map each top-level category to the species (and their subspecies labels)
   that belong to it. Drives the dynamic trait picker in advanced search. */
const CATEGORY_SPECIES = {
  geckos:     ["Correlophus ciliatus", "Rhacodactylus auriculatus", "Rhacodactylus leachianus", "Mniarogekko chahoua", "Correlophus sarasinorum", "Phelsuma grandis", "Phelsuma laticauda", "Gekko gecko", "Eublepharis macularius", "Hemitheconyx caudicinctus", "Paroedura picta", "Coleonyx variegatus"],
  snakes:     ["Python regius", "Python brongersmai", "Morelia viridis", "Morelia spilota", "Antaresia childreni", "Pantherophis guttatus", "Heterodon nasicus", "Lampropeltis triangulum", "Lampropeltis getula", "Pituophis catenifer", "Thamnophis sirtalis", "Boa constrictor", "Eryx colubrinus", "Epicrates cenchria"],
  lizards:    ["Pogona vitticeps", "Pogona henrylawsoni", "Uromastyx", "Intellagama lesueurii", "Tiliqua scincoides", "Tiliqua gigas", "Corucia zebrata", "Tribolonotus gracilis", "Takydromus smaragdinus", "Varanus acanthurus", "Varanus exanthematicus", "Salvator merianae"],
  chameleons: ["Furcifer pardalis", "Chamaeleo calyptratus", "Trioceros jacksonii", "Furcifer lateralis", "Brookesia"],
  tortoises:  ["Testudo hermanni", "Testudo graeca", "Testudo marginata", "Testudo horsfieldii", "Centrochelys sulcata", "Geochelone elegans", "Chelonoidis carbonarius", "Stigmochelys pardalis", "Trachemys scripta", "Graptemys", "Sternotherus odoratus"],
  amphibians: ["Dendrobates tinctorius", "Dendrobates auratus", "Phyllobates terribilis", "Agalychnis callidryas", "Ceratophrys ornata", "Ranoidea caerulea", "Ambystoma mexicanum", "Pleurodeles waltl"],
  inverts:    ["Grammostola pulchra", "Brachypelma hamorii", "Caribena versicolor", "Tliltocatl albopilosus", "Poecilotheria", "Pandinus imperator", "Heterometrus", "Hierodula", "Sphodromantis", "Idolomantis diabolica", "Archispirostreptus gigas", "Scolopendra", "Porcellio scaber", "Armadillidium"],
};

/* Category → subcategory → species. Subcategories group species so the list
   stays navigable as it grows to hundreds. Both the sell form and the search
   filter read from this. When you move to Supabase, this becomes three tables
   (categories, subcategories, species) but the shape stays the same.
   `null` species list on a subcategory = "coming soon / many species". */
const CATEGORY_SUBCATS = {
  geckos: [
    { id: "geckos_arboreal", it: "Gechi arboricoli", en: "Arboreal geckos", species: ["Correlophus ciliatus", "Rhacodactylus auriculatus", "Rhacodactylus leachianus", "Mniarogekko chahoua", "Correlophus sarasinorum", "Phelsuma grandis", "Phelsuma laticauda", "Gekko gecko"] },
    { id: "geckos_ground",   it: "Gechi terricoli",  en: "Ground geckos",   species: ["Eublepharis macularius", "Hemitheconyx caudicinctus", "Paroedura picta", "Coleonyx variegatus"] },
  ],
  snakes: [
    { id: "snakes_pythons",   it: "Pitoni",     en: "Pythons",     species: ["Python regius", "Python brongersmai", "Morelia viridis", "Morelia spilota", "Antaresia childreni"] },
    { id: "snakes_colubrids", it: "Colubridi",  en: "Colubrids",   species: ["Pantherophis guttatus", "Heterodon nasicus", "Lampropeltis triangulum", "Lampropeltis getula", "Pituophis catenifer", "Thamnophis sirtalis"] },
    { id: "snakes_boas",      it: "Boa",        en: "Boas",        species: ["Boa constrictor", "Eryx colubrinus", "Epicrates cenchria"] },
  ],
  lizards: [
    { id: "lizards_agamids", it: "Agamidi",  en: "Agamids",  species: ["Pogona vitticeps", "Pogona henrylawsoni", "Uromastyx", "Intellagama lesueurii"] },
    { id: "lizards_skinks",  it: "Scinchi",  en: "Skinks",   species: ["Tiliqua scincoides", "Tiliqua gigas", "Corucia zebrata", "Tribolonotus gracilis"] },
    { id: "lizards_other",   it: "Altri sauri", en: "Other lizards", species: ["Takydromus smaragdinus"] },
    { id: "lizards_monitors",it: "Varani",   en: "Monitors", species: ["Varanus acanthurus", "Varanus exanthematicus"] },
    { id: "lizards_tegus",   it: "Tegu e altri", en: "Tegus & others", species: ["Salvator merianae"] },
  ],
  chameleons: [
    { id: "cham_old",  it: "Camaleonti del Vecchio Mondo", en: "Old World chameleons", species: ["Furcifer pardalis", "Chamaeleo calyptratus", "Trioceros jacksonii", "Furcifer lateralis", "Brookesia"] },
  ],
  tortoises: [
    { id: "tort_mediterranean", it: "Testuggini mediterranee", en: "Mediterranean tortoises", species: ["Testudo hermanni", "Testudo graeca", "Testudo marginata", "Testudo horsfieldii"] },
    { id: "tort_tropical",      it: "Testuggini tropicali",    en: "Tropical tortoises",      species: ["Centrochelys sulcata", "Geochelone elegans", "Chelonoidis carbonarius", "Stigmochelys pardalis"] },
    { id: "tort_aquatic",       it: "Tartarughe acquatiche",   en: "Aquatic turtles",         species: ["Trachemys scripta", "Graptemys", "Sternotherus odoratus"] },
  ],
  amphibians: [
    { id: "amph_frogs",       it: "Rane e rospi",  en: "Frogs & toads",  species: ["Dendrobates tinctorius", "Dendrobates auratus", "Phyllobates terribilis", "Agalychnis callidryas", "Ceratophrys ornata", "Ranoidea caerulea"] },
    { id: "amph_salamanders", it: "Salamandre e tritoni", en: "Salamanders & newts", species: ["Ambystoma mexicanum", "Pleurodeles waltl"] },
  ],
  inverts: [
    { id: "inv_tarantulas", it: "Tarantole",            en: "Tarantulas",        species: ["Grammostola pulchra", "Brachypelma hamorii", "Caribena versicolor", "Tliltocatl albopilosus", "Poecilotheria"] },
    { id: "inv_scorpions",  it: "Scorpioni",            en: "Scorpions",         species: ["Pandinus imperator", "Heterometrus"] },
    { id: "inv_mantids",    it: "Mantidi",              en: "Mantids",           species: ["Hierodula", "Sphodromantis", "Idolomantis diabolica"] },
    { id: "inv_myriapods",  it: "Millepiedi/Centopiedi",en: "Milli/Centipedes",  species: ["Archispirostreptus gigas", "Scolopendra"] },
    { id: "inv_isopods",    it: "Isopodi",              en: "Isopods",           species: ["Porcellio scaber", "Armadillidium"] },
  ],
};

/* Helper: all subcategories for a category (or empty array) */
const initialsOf = (n) => (n || "").trim().split(/\s+/).map(w => w[0] || "").slice(0, 2).join("").toUpperCase() || "?";
const subcatsFor = (catId) => CATEGORY_SUBCATS[catId] || [];
/* Helper: species belonging to a subcategory id */
function speciesForSubcat(catId, subcatId) {
  const sc = subcatsFor(catId).find(s => s.id === subcatId);
  return sc ? sc.species : [];
}

/* Common-name labels for species, for the sub-category dropdown */
const SPECIES_LABELS = {
  // ── Geckos ──
  "Correlophus ciliatus":      { it: "Geco crestato",        en: "Crested gecko" },
  "Rhacodactylus auriculatus": { it: "Geco gargoyle",        en: "Gargoyle gecko" },
  "Rhacodactylus leachianus":  { it: "Geco di Leach",        en: "Leachianus gecko" },
  "Mniarogekko chahoua":       { it: "Geco chahoua",         en: "Chahoua gecko" },
  "Correlophus sarasinorum":   { it: "Geco di Sarasin",      en: "Sarasin's gecko" },
  "Phelsuma grandis":          { it: "Geco diurno gigante",  en: "Giant day gecko" },
  "Phelsuma laticauda":        { it: "Geco diurno polvere d'oro", en: "Gold dust day gecko" },
  "Gekko gecko":               { it: "Geco tokay",           en: "Tokay gecko" },
  "Eublepharis macularius":    { it: "Geco leopardino",      en: "Leopard gecko" },
  "Hemitheconyx caudicinctus": { it: "Geco dalla coda grassa", en: "African fat-tailed gecko" },
  "Paroedura picta":           { it: "Geco ocellato del Madagascar", en: "Madagascar ground gecko" },
  "Coleonyx variegatus":       { it: "Geco fasciato",        en: "Western banded gecko" },
  // ── Snakes ──
  "Python regius":             { it: "Pitone reale",         en: "Ball python" },
  "Python brongersmai":        { it: "Pitone sanguigno",     en: "Blood python" },
  "Morelia viridis":           { it: "Pitone verde arboricolo", en: "Green tree python" },
  "Morelia spilota":           { it: "Pitone tappeto",       en: "Carpet python" },
  "Antaresia childreni":       { it: "Pitone di Children",   en: "Children's python" },
  "Pantherophis guttatus":     { it: "Serpente del grano",   en: "Corn snake" },
  "Heterodon nasicus":         { it: "Hognose occidentale",  en: "Western hognose" },
  "Lampropeltis triangulum":   { it: "Serpente del latte",   en: "Milk snake" },
  "Lampropeltis getula":       { it: "Serpente reale",       en: "Common kingsnake" },
  "Pituophis catenifer":       { it: "Serpente gopher",      en: "Gopher snake" },
  "Thamnophis sirtalis":       { it: "Serpente giarrettiera", en: "Garter snake" },
  "Boa constrictor":           { it: "Boa constrictor",      en: "Boa constrictor" },
  "Eryx colubrinus":           { it: "Boa delle sabbie del Kenya", en: "Kenyan sand boa" },
  "Epicrates cenchria":        { it: "Boa arcobaleno brasiliano", en: "Brazilian rainbow boa" },
  // ── Lizards ──
  "Pogona vitticeps":          { it: "Pogona",               en: "Bearded dragon" },
  "Pogona henrylawsoni":       { it: "Pogona di Rankin",     en: "Rankin's dragon" },
  "Uromastyx":                 { it: "Uromastice",           en: "Uromastyx" },
  "Intellagama lesueurii":     { it: "Drago d'acqua australiano", en: "Australian water dragon" },
  "Tiliqua scincoides":        { it: "Scinco lingua blu",    en: "Blue-tongue skink" },
  "Tiliqua gigas":             { it: "Scinco lingua blu indonesiano", en: "Indonesian blue-tongue skink" },
  "Corucia zebrata":           { it: "Scinco dalla coda prensile", en: "Monkey-tailed skink" },
  "Tribolonotus gracilis":     { it: "Scinco coccodrillo occhi rossi", en: "Red-eyed crocodile skink" },
  "Varanus acanthurus":        { it: "Varano di Ackie",      en: "Ackie monitor" },
  "Varanus exanthematicus":    { it: "Varano della savana",  en: "Savannah monitor" },
  "Salvator merianae":         { it: "Tegu argentino bianco e nero", en: "Argentine B&W tegu" },
  // ── Chameleons ──
  "Furcifer pardalis":         { it: "Camaleonte pantera",   en: "Panther chameleon" },
  "Chamaeleo calyptratus":     { it: "Camaleonte velato",    en: "Veiled chameleon" },
  "Trioceros jacksonii":       { it: "Camaleonte di Jackson", en: "Jackson's chameleon" },
  "Takydromus smaragdinus":    { it: "Lucertola d'erba",      en: "Green grass lizard" },
  "Furcifer lateralis":        { it: "Camaleonte tappeto",   en: "Carpet chameleon" },
  "Brookesia":                 { it: "Camaleonte pigmeo",    en: "Pygmy chameleon" },
  // ── Tortoises & turtles ──
  "Testudo hermanni":          { it: "Testuggine di Hermann", en: "Hermann's tortoise" },
  "Testudo graeca":            { it: "Testuggine greca",     en: "Greek tortoise" },
  "Testudo marginata":         { it: "Testuggine marginata", en: "Marginated tortoise" },
  "Testudo horsfieldii":       { it: "Testuggine di Horsfield", en: "Russian tortoise" },
  "Centrochelys sulcata":      { it: "Testuggine speronata africana", en: "Sulcata tortoise" },
  "Geochelone elegans":        { it: "Testuggine stellata indiana", en: "Indian star tortoise" },
  "Chelonoidis carbonarius":   { it: "Testuggine zampe rosse", en: "Red-footed tortoise" },
  "Stigmochelys pardalis":     { it: "Testuggine leopardo",  en: "Leopard tortoise" },
  "Trachemys scripta":         { it: "Tartaruga dalle orecchie rosse", en: "Pond slider" },
  "Graptemys":                 { it: "Tartaruga geografica", en: "Map turtle" },
  "Sternotherus odoratus":     { it: "Tartaruga muschiata",  en: "Common musk turtle" },
  // ── Amphibians ──
  "Dendrobates tinctorius":    { it: "Rana freccia tinctorius", en: "Dyeing poison frog" },
  "Dendrobates auratus":       { it: "Rana freccia verde e nera", en: "Green & black poison frog" },
  "Phyllobates terribilis":    { it: "Rana freccia dorata",  en: "Golden poison frog" },
  "Agalychnis callidryas":     { it: "Raganella occhi rossi", en: "Red-eyed tree frog" },
  "Ceratophrys ornata":        { it: "Rana Pacman",          en: "Pacman frog" },
  "Ranoidea caerulea":         { it: "Raganella di White",   en: "White's tree frog" },
  "Ambystoma mexicanum":       { it: "Axolotl",              en: "Axolotl" },
  "Pleurodeles waltl":         { it: "Tritone costoluto iberico", en: "Iberian ribbed newt" },
  // ── Invertebrates ──
  "Grammostola pulchra":       { it: "Tarantola nera brasiliana", en: "Brazilian black tarantula" },
  "Brachypelma hamorii":       { it: "Tarantola ginocchia rosse", en: "Mexican red-knee tarantula" },
  "Caribena versicolor":       { it: "Tarantola versicolor", en: "Antilles pinktoe tarantula" },
  "Tliltocatl albopilosus":    { it: "Tarantola riccioluta", en: "Curly hair tarantula" },
  "Poecilotheria":             { it: "Tarantola ornamentale", en: "Ornamental tarantula" },
  "Pandinus imperator":        { it: "Scorpione imperatore", en: "Emperor scorpion" },
  "Heterometrus":              { it: "Scorpione asiatico delle foreste", en: "Asian forest scorpion" },
  "Hierodula":                 { it: "Mantide gigante asiatica", en: "Giant Asian mantis" },
  "Sphodromantis":             { it: "Mantide africana",     en: "African mantis" },
  "Idolomantis diabolica":     { it: "Mantide fiore del diavolo", en: "Devil's flower mantis" },
  "Archispirostreptus gigas":  { it: "Millepiedi gigante africano", en: "Giant African millipede" },
  "Scolopendra":               { it: "Scolopendra",          en: "Centipede" },
  "Porcellio scaber":          { it: "Isopode (Porcellio scaber)", en: "Rough woodlouse (isopod)" },
  "Armadillidium":             { it: "Isopode (Armadillidium)", en: "Pill woodlouse (isopod)" },
};

/* Generic, safe trait sets per category — used when a specific species has no
   curated morph list. Avoids showing (e.g.) Hermann's morphs under a Russian
   tortoise. Sellers can always free-type anything not listed. */
const GENERIC_CATEGORY_TRAITS = {
  geckos:     [{ name: "Wild Type", cls: "wild" }, { name: "Albino", cls: "recessive" }, { name: "Het (carrier)", cls: "het" }, { name: "Line-bred", cls: "line" }],
  snakes:     [{ name: "Wild Type", cls: "wild" }, { name: "Albino", cls: "recessive" }, { name: "Hypo", cls: "recessive" }, { name: "Het (carrier)", cls: "het" }, { name: "Line-bred", cls: "line" }],
  lizards:    [{ name: "Wild Type", cls: "wild" }, { name: "Hypo", cls: "recessive" }, { name: "Line-bred colour", cls: "line" }],
  chameleons: [{ name: "Wild Type", cls: "wild" }, { name: "Locality", cls: "locality" }, { name: "Line-bred", cls: "line" }],
  tortoises:  [{ name: "Wild Type", cls: "wild" }, { name: "Locality", cls: "locality" }, { name: "Albino", cls: "recessive" }, { name: "Ivory/High-yellow", cls: "line" }],
  amphibians: [{ name: "Wild Type", cls: "wild" }, { name: "Albino", cls: "recessive" }, { name: "Leucistic", cls: "recessive" }, { name: "Line-bred", cls: "line" }],
  inverts:    [{ name: "Normal", cls: "wild" }, { name: "Locality", cls: "locality" }, { name: "Line-bred colour", cls: "line" }],
};

/* Return the trait list for a species (preferred) or a category.
   - Known species → its curated morphs.
   - Unknown species (or none yet) → the category's GENERIC set, never another
     species' morphs. Each entry { name, cls }. */
function getTraitsForScope(categoryId, species) {
  if (species && SPECIES_TRAITS[species]) return SPECIES_TRAITS[species];
  // A specific species was chosen but we have no curated list for it → generic.
  if (species) return GENERIC_CATEGORY_TRAITS[categoryId] || [{ name: "Wild Type", cls: "wild" }];
  // No species chosen → show the category union (for the search filter).
  const speciesList = CATEGORY_SPECIES[categoryId] || [];
  const seen = new Set();
  const out = [];
  speciesList.forEach(sp => {
    (SPECIES_TRAITS[sp] || []).forEach(tr => {
      if (!seen.has(tr.name)) { seen.add(tr.name); out.push(tr); }
    });
  });
  // If the category has no curated species at all (e.g. inverts), use generic.
  return out.length ? out : (GENERIC_CATEGORY_TRAITS[categoryId] || []);
}

/* ───── Categories (counts driven by mock listings; placeholders here) ── */
const CATEGORIES = [
  { id: "geckos",      it: "Gechi",       en: "Geckos",      emoji: "🦎" },
  { id: "snakes",      it: "Serpenti",    en: "Snakes",      emoji: "🐍" },
  { id: "lizards",     it: "Sauri",       en: "Lizards",     emoji: "🦖" },
  { id: "chameleons",  it: "Camaleonti",  en: "Chameleons",  emoji: "🦎" },
  { id: "tortoises",   it: "Testuggini",  en: "Tortoises",   emoji: "🐢" },
  { id: "amphibians",  it: "Anfibi",      en: "Amphibians",  emoji: "🐸" },
  { id: "inverts",     it: "Invertebrati",en: "Invertebrates",emoji: "🕷️" },
];

const REGIONS = [
  "Tutte le regioni","Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna",
  "Friuli-V.G.","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte",
  "Puglia","Sardegna","Sicilia","Toscana","Trentino-A.A.","Umbria","Valle d'Aosta","Veneto"
];

/* Countries sellers can operate from. `eu` flags EU membership — Switzerland
   is NOT in the EU, so CH↔EU movement crosses a customs border (extra rules).
   The flag emoji renders on cards, seller pages, and the detail view. */
const COUNTRIES = [
  { code: "IT", flag: "🇮🇹", it: "Italia",          en: "Italy",          eu: true  },
  { code: "DE", flag: "🇩🇪", it: "Germania",        en: "Germany",        eu: true  },
  { code: "AT", flag: "🇦🇹", it: "Austria",         en: "Austria",        eu: true  },
  { code: "FR", flag: "🇫🇷", it: "Francia",         en: "France",         eu: true  },
  { code: "ES", flag: "🇪🇸", it: "Spagna",          en: "Spain",          eu: true  },
  { code: "PT", flag: "🇵🇹", it: "Portogallo",      en: "Portugal",       eu: true  },
  { code: "NL", flag: "🇳🇱", it: "Paesi Bassi",     en: "Netherlands",    eu: true  },
  { code: "BE", flag: "🇧🇪", it: "Belgio",          en: "Belgium",        eu: true  },
  { code: "LU", flag: "🇱🇺", it: "Lussemburgo",     en: "Luxembourg",     eu: true  },
  { code: "CZ", flag: "🇨🇿", it: "Rep. Ceca",       en: "Czech Republic", eu: true  },
  { code: "SK", flag: "🇸🇰", it: "Slovacchia",      en: "Slovakia",       eu: true  },
  { code: "PL", flag: "🇵🇱", it: "Polonia",         en: "Poland",         eu: true  },
  { code: "HU", flag: "🇭🇺", it: "Ungheria",        en: "Hungary",        eu: true  },
  { code: "SI", flag: "🇸🇮", it: "Slovenia",        en: "Slovenia",       eu: true  },
  { code: "HR", flag: "🇭🇷", it: "Croazia",         en: "Croatia",        eu: true  },
  { code: "RO", flag: "🇷🇴", it: "Romania",         en: "Romania",        eu: true  },
  { code: "BG", flag: "🇧🇬", it: "Bulgaria",        en: "Bulgaria",       eu: true  },
  { code: "GR", flag: "🇬🇷", it: "Grecia",          en: "Greece",         eu: true  },
  { code: "DK", flag: "🇩🇰", it: "Danimarca",       en: "Denmark",        eu: true  },
  { code: "SE", flag: "🇸🇪", it: "Svezia",          en: "Sweden",         eu: true  },
  { code: "FI", flag: "🇫🇮", it: "Finlandia",       en: "Finland",        eu: true  },
  { code: "IE", flag: "🇮🇪", it: "Irlanda",         en: "Ireland",        eu: true  },
  { code: "EE", flag: "🇪🇪", it: "Estonia",         en: "Estonia",        eu: true  },
  { code: "LV", flag: "🇱🇻", it: "Lettonia",        en: "Latvia",         eu: true  },
  { code: "LT", flag: "🇱🇹", it: "Lituania",        en: "Lithuania",      eu: true  },
  { code: "MT", flag: "🇲🇹", it: "Malta",           en: "Malta",          eu: true  },
  { code: "CY", flag: "🇨🇾", it: "Cipro",           en: "Cyprus",         eu: true  },
  // Outside the EU — customs border, extra rules (cross-border warning applies)
  { code: "CH", flag: "🇨🇭", it: "Svizzera",        en: "Switzerland",    eu: false },
  { code: "GB", flag: "🇬🇧", it: "Regno Unito",     en: "United Kingdom", eu: false },
  { code: "NO", flag: "🇳🇴", it: "Norvegia",        en: "Norway",         eu: false },
];
const countryByCode = (code) => COUNTRIES.find(c => c.code === code) || COUNTRIES[0];

/* Regions/states per country, so the region selector adapts to the chosen
   country (you can't pick an Italian region when selling from Germany). */
const REGIONS_BY_COUNTRY = {
  IT: ["Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli-V.G.","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte","Puglia","Sardegna","Sicilia","Toscana","Trentino-A.A.","Umbria","Valle d'Aosta","Veneto"],
  DE: ["Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"],
  AT: ["Burgenland","Kärnten","Niederösterreich","Oberösterreich","Salzburg","Steiermark","Tirol","Vorarlberg","Wien"],
  FR: ["Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Bretagne","Centre-Val de Loire","Corse","Grand Est","Hauts-de-France","Île-de-France","Normandie","Nouvelle-Aquitaine","Occitanie","Pays de la Loire","Provence-Alpes-Côte d'Azur"],
  CH: ["Zürich","Bern","Luzern","Genève","Vaud","Ticino","Basel-Stadt","St. Gallen","Aargau","Wallis","Graubünden","Altri Cantoni"],
  ES: ["Andalucía","Aragón","Asturias","Baleares","Canarias","Cantabria","Castilla-La Mancha","Castilla y León","Cataluña","Extremadura","Galicia","La Rioja","Madrid","Murcia","Navarra","País Vasco","Valencia"],
  NL: ["Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg","Noord-Brabant","Noord-Holland","Overijssel","Utrecht","Zeeland","Zuid-Holland"],
  CZ: ["Praha","Středočeský","Jihočeský","Plzeňský","Karlovarský","Ústecký","Liberecký","Královéhradecký","Pardubický","Vysočina","Jihomoravský","Olomoucký","Zlínský","Moravskoslezský"],
  PL: ["Dolnośląskie","Kujawsko-Pomorskie","Lubelskie","Lubuskie","Łódzkie","Małopolskie","Mazowieckie","Opolskie","Podkarpackie","Podlaskie","Pomorskie","Śląskie","Świętokrzyskie","Warmińsko-Mazurskie","Wielkopolskie","Zachodniopomorskie"],
  BE: ["Antwerpen","Brussel/Bruxelles","Hainaut","Liège","Limburg","Luxembourg","Namur","Oost-Vlaanderen","Vlaams-Brabant","Brabant wallon","West-Vlaanderen"],
};
// Countries without a curated list get a free-text region field in the sell form.
const regionsForCountry = (code) => REGIONS_BY_COUNTRY[code] || [];

// Placeholder photos for the DEMO only. These are hotlinked stock images and
// can rotate or break over time — that's expected. The real fix is hosting
// your OWN photos in Supabase Storage (bucket: listing-photos) and putting the
// public URL on each listing's image_url. Once you do that, these go away.
// Until then, each listing falls back to a clean species-tinted placeholder
// (see `fallback()` / SpeciesPlaceholder) rather than a random field photo.
const IMG = {
  crested:  "https://images.unsplash.com/photo-1597245621459-72e1e7a7d52e?auto=format&fit=crop&w=800&q=80",
  leopard:  "https://images.unsplash.com/photo-1612160808120-417a3b6e0c66?auto=format&fit=crop&w=800&q=80",
  ball:     "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=800&q=80",
  panther:  "https://images.unsplash.com/photo-1580526149844-31f1a5f6ed49?auto=format&fit=crop&w=800&q=80",
  beardie:  "https://images.unsplash.com/photo-1601275785846-9b78bcae3b1f?auto=format&fit=crop&w=800&q=80",
  tortoise: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
  corn:     "https://images.unsplash.com/photo-1601275785846-9b78bcae3b1f?auto=format&fit=crop&w=800&q=80",
  hognose:  "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=800&q=80",
};

const LISTINGS = [];  // demo listings removed — marketplace shows real Supabase data only

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

const SELLERS = {};  // demo sellers removed — real breeder pages load from Supabase

const CHATS = [];  // demo chats removed — real threads load from Supabase

/* ───── Utilities ───────────────────────────────────────────────── */
const formatAge = (months, t) => {
  // Birth date may be unknown (null) or unparseable — show a clean dash, not "null mesi".
  if (months == null || isNaN(months)) return "—";
  if (months < 1) return `< 1 ${t.months}`;
  if (months < 12) return `${months} ${t.months}`;
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? t.year : t.years}`;
};
// Birth/age display that respects the precision the breeder gave:
//  - year only ("2025")      → "CB25" (captive-bred shorthand; no fake month count)
//  - month ("2025-06") / full → computed age from ageMonths
const formatBirth = (listing, t) => {
  const bd = (listing?.birthDate || "").trim();
  if (/^\d{4}$/.test(bd)) return `CB${bd.slice(2)}`;
  return formatAge(listing?.ageMonths, t);
};
const formatPrice = (n) => `€${n.toLocaleString("it-IT")}`;
const FREE_LISTING_LIMIT = 5;  // free sellers; Pro = unlimited
// Compact relative time for chat list ("now", "5m", "3h", "2d", or a date).
const relTime = (iso, t) => {
  if (!iso) return "";
  const d = new Date(iso), now = new Date();
  const mins = Math.floor((now - d) / 60000);
  if (mins < 1) return t?.tNow || "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" });
};
const formatDate = (iso, lang) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;
  return d.toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
};
const sexLabel = (s, t) => ({ M: t.male, F: t.female, U: t.unsexed, P: t.pair }[s] || s);
const fallback = (label) =>
  `data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23292524'/><stop offset='1' stop-color='%231c1917'/></linearGradient></defs><rect width='400' height='400' fill='url(%23g)'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-style='italic' font-size='20' fill='%23a8a29e'>${label}</text></svg>`;

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP
   ═════════════════════════════════════════════════════════════════ */
// Site-wide access password for the private pre-launch phase.
// Set VITE_SITE_PASSWORD in .env.local and in Vercel. If left empty, the gate
// is disabled (so local dev isn't blocked when no password is configured).
const SITE_PW = import.meta.env.VITE_SITE_PASSWORD || "";

function SiteGate({ onUnlock }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const submit = () => {
    if (pw === SITE_PW) {
      try { localStorage.setItem("hm_site_unlock", "yes"); } catch (e) {}
      onUnlock();
    } else { setErr(true); }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-950 text-stone-100 p-6"
         style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}>
      <div className="w-full max-w-sm text-center">
        <div className="text-3xl tracking-tight mb-2" style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}>
          Herp<span className="italic text-amber-500">Market</span>
        </div>
        <p className="text-sm text-stone-400 mb-6">Accesso privato · Private preview</p>
        <input type="password" value={pw} autoFocus
               onChange={e => { setPw(e.target.value); setErr(false); }}
               onKeyDown={e => { if (e.key === "Enter") submit(); }}
               placeholder="Password"
               className="w-full bg-stone-900 ring-1 ring-stone-700 rounded-lg px-4 py-3 text-sm text-center text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
        {err && <p className="text-rose-400 text-xs mt-2 font-bold">Password errata · Wrong password</p>}
        <button onClick={submit}
                className="w-full mt-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-lg text-sm transition-colors">
          Entra · Enter
        </button>
      </div>
    </div>
  );
}

export default function HerpMarket() {
  const [view, setView] = useState("home");
  const [viewData, setViewData] = useState(null);
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("hm_lang") || "it"; } catch (e) { return "it"; }
  });
  const setLang = (l) => { setLangState(l); try { localStorage.setItem("hm_lang", l); } catch (e) {} };
  // Favorites persist locally so they survive a refresh. (Cross-device sync via
  // the wishlists table is a later nicety.)
  const [favorites, setFavorites] = useState(() => {
    try { const s = localStorage.getItem("hm_favs"); return s ? JSON.parse(s) : []; } catch (e) { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem("hm_favs", JSON.stringify(favorites)); } catch (e) {}
  }, [favorites]);
  const [filter, setFilter] = useState({
    category: null, subCategory: null, sex: null, region: null, country: null,
    sort: "newest", search: "",
    priceMin: null, priceMax: null,
    traits: [],            // array of selected trait names
    traitClass: null,      // recessive | dominant | incDom | line | locality | het | wild
    seller: null,
    expoOnly: false,
    verifiedOnly: false,
    auctionOnly: false,
  });

  // Auth state — null = logged out
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null); // null | { mode: "login"|"signup", reason: string|null, after: fn|null }
  const [recovery, setRecovery] = useState(false);   // true while in a password-recovery session
  // Site-wide access gate (private pre-launch). Unlocked state persists locally.
  const [siteUnlocked, setSiteUnlocked] = useState(() => {
    if (!SITE_PW) return true;
    try { return localStorage.getItem("hm_site_unlock") === "yes"; } catch (e) { return false; }
  });

  const t = I18N[lang];

  // ── Live data from Supabase (Option B bridge) ──
  // Fetches listings once on load. Falls back to demo LISTINGS until they arrive
  // or if the fetch fails, so the app never looks empty.
  const [liveListings, setLiveListings] = useState(null);
  useEffect(() => {
    import('./lib/api').then(({ fetchListings }) => {
      fetchListings({})
        .then(rows => { setLiveListings(rows || []); })
        .catch(err => { console.warn('[HerpMarket] Supabase fetch failed:', err); setLiveListings([]); });
    });
  }, []);
  // Live data is the source of truth once loaded (empty array = empty marketplace).
  const LISTINGS_DATA = liveListings || [];

  // ── Real auth session (Supabase) ──
  // Loads any existing session on startup and keeps `user` in sync with login/
  // logout. Builds the app's user object from the auth session + profile row so
  // existing references (user.name, user.verified, user.region) keep working.
  const applySession = (api, session) => {
    const u = session?.user;
    if (!u) { setUser(null); return; }
    const meta = u.user_metadata || {};
    setUser({ id: u.id, email: u.email, name: meta.display_name || (u.email || "").split("@")[0], region: "Piemonte", verified: false });
    // enrich from profile (region, verified) without blocking the UI
    api.fetchProfile(u.id).then(p => {
      if (p) setUser(prev => prev ? { ...prev, name: p.display_name || prev.name, region: p.region || prev.region, verified: !!p.verified } : prev);
    }).catch(() => {});
  };
  useEffect(() => {
    let unsub;
    import('./lib/api').then(api => {
      api.getSession().then(s => applySession(api, s)).catch(() => {});
      unsub = api.onAuthChange((event, session) => {
        if (event === "PASSWORD_RECOVERY") setRecovery(true);
        applySession(api, session);
      });
    });
    return () => { unsub && unsub(); };
  }, []);

  // Remember scroll position per view so returning to search (or anywhere)
  // lands the user where they left off instead of jumping to the top.
  const scrollMemory = useRef({});
  const navHistory = useRef([]);   // stack of previous {view, data}
  const go = (v, data = null, fresh = false) => {
    // Save where we are before leaving the current view
    scrollMemory.current[view] = window.scrollY;
    if (fresh) scrollMemory.current[v] = 0; // intentional new view → start at top
    // Push current view onto history so "back" can return to it
    navHistory.current.push({ view, data: viewData });
    // Mirror into the browser history so the device/browser Back button
    // navigates within the app instead of leaving it.
    try { window.history.pushState({ hmView: v }, ""); } catch (e) {}
    setView(v);
    setViewData(data);
    const saved = scrollMemory.current[v];
    requestAnimationFrame(() => {
      window.scrollTo(0, typeof saved === "number" ? saved : 0);
    });
  };
  // Go back to the previous screen in history (restores its scroll position).
  // Falls back to home if there's nothing to go back to.
  const goBack = () => {
    const prev = navHistory.current.pop();
    const target = prev?.view || "home";
    scrollMemory.current[view] = window.scrollY;
    setView(target);
    setViewData(prev?.data ?? null);
    const saved = scrollMemory.current[target];
    requestAnimationFrame(() => {
      window.scrollTo(0, typeof saved === "number" ? saved : 0);
    });
  };
  // Bridge the browser/device Back button to the app's own history. When the
  // user presses Back, the browser fires popstate; we consume our nav stack
  // instead of letting the page leave the app.
  const goBackRef = useRef(goBack);
  goBackRef.current = goBack;
  useEffect(() => {
    // Seed one state entry so the first Back press has something to catch.
    try { window.history.replaceState({ hmView: "home" }, ""); } catch (e) {}
    const onPop = () => {
      if (navHistory.current.length > 0) {
        goBackRef.current();
        // Re-arm a forward entry so subsequent Back presses keep working.
        try { window.history.pushState({ hmView: "current" }, ""); } catch (e) {}
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  // When the user taps Search from the nav, start with a clean slate.
  // Category tiles, "see all" links and similar entry points should call go("search") directly
  // to preserve the filter they just set.
  const goToSearchFresh = () => {
    setFilter({
      category: null, subCategory: null, sex: null, region: null, country: null,
      sort: "newest", search: "",
      priceMin: null, priceMax: null,
      traits: [], traitClass: null, seller: null,
      expoOnly: false, verifiedOnly: false, auctionOnly: false,
    });
    scrollMemory.current["search"] = 0; // fresh search starts at the top
    go("search", null, true);
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
  // Demo shortcut (DemoToggle) — fake local login for quick UI testing only.
  // Must NOT grant verification: the blue check only reflects the real DB flag.
  const handleLogin = (name) => {
    setUser({ name: name || "Anita Pioch", region: "Piemonte", verified: false });
    const after = authModal?.after;
    setAuthModal(null);
    after && setTimeout(after, 100);
  };
  // Real auth succeeded inside the modal — the session listener sets `user`;
  // here we just close the modal and run any pending "after login" action.
  const handleAuthSuccess = () => {
    const after = authModal?.after;
    setAuthModal(null);
    after && setTimeout(after, 150);
  };
  const handleLogout = () => {
    import('./lib/api').then(api => api.signOut()).catch(() => {});
    setUser(null);
    go("home");
  };

  const props = { t, lang, setLang, go, goBack, favorites, toggleFav, filter, setFilter, user, requireAuth, setAuthModal, handleLogout, listingsData: LISTINGS_DATA };

  const screen = () => {
    switch (view) {
      case "home":      return <Home_ {...props} />;
      case "search":    return <SearchScreen initialState={viewData} {...props} />;
      case "detail":    return <Detail listing={viewData} {...props} />;
      case "expo":      return <ExpoDetail expo={viewData} {...props} />;
      case "seller":    return <SellerProfile sellerName={viewData} {...props} />;
      case "sell":      return user ? <SellScreen {...props} /> : <AuthGate reason={t.loginToSell} {...props} />;
      case "chat":      return user ? <ChatList {...props} user={user} /> : <AuthGate reason={t.loginToMessage} {...props} />;
      case "thread":    return user ? <ChatThread chat={viewData} {...props} user={user} /> : <AuthGate reason={t.loginToMessage} {...props} />;
      case "profile":   return user ? <Profile {...props} /> : <AuthGate reason={t.loginToSell} {...props} />;
      case "mylistings": return user ? <MyListingsScreen {...props} /> : <AuthGate reason={t.loginToSell} {...props} />;
      case "addanimal": return user ? <AddAnimalScreen {...props} /> : <AuthGate reason={t.loginToSell} {...props} />;
      case "editstore": return user ? <EditStoreScreen {...props} /> : <AuthGate reason={t.loginToSell} {...props} />;
      case "wishlist":  return <Wishlist {...props} />;
      case "legal":     return <Legal {...props} />;
      case "breeding":  return <BreedingProjectsScreen {...props} />;
      case "transport": return <PlaceholderScreen title={t.transport} {...props} icon={<Truck size={28} />} />;
      case "reviews":   return <ReviewsScreen {...props} />;
      case "documents": return <PlaceholderScreen title={t.citesArchive} {...props} icon={<FileText size={28} />} />;
      case "about":     return <AboutContact {...props} />;
      case "terms":     return <TermsLegal {...props} />;
      case "storepolicy": return <StorePolicy {...props} />;
      case "privacy":   return <PrivacyPolicy {...props} />;
      case "plans":     return <PlansScreen {...props} />;
      case "settings":  return <SettingsScreen {...props} />;
      default:          return <Home_ {...props} />;
    }
  };

  const profileViews = ["profile", "mylistings", "addanimal", "editstore", "wishlist", "legal", "inventory", "breeding", "transport", "reviews", "documents", "about", "terms", "settings"];

  // Private pre-launch gate: block the whole site until the access password is entered.
  if (!siteUnlocked) return <SiteGate onUnlock={() => setSiteUnlocked(true)} />;

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
        .form-input {
          width: 100%; background: rgb(28 25 23); border: 1px solid rgb(41 37 36);
          border-radius: 0.5rem; padding: 0.75rem 0.875rem; font-size: 0.875rem;
          color: rgb(245 245 244); outline: none; transition: border-color 0.15s;
        }
        .form-input:focus { border-color: rgb(245 158 11 / 0.6); }
        .form-input::placeholder { color: rgb(120 113 108); }
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
                {initialsOf(user.name)}
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
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 md:pb-0">
          {screen()}
        </div>
        {/* Mobile bottom nav — fixed to viewport, with safe-area padding so the
            sell (+) button isn't clipped by the phone's home indicator. */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 px-3 pt-2 flex justify-around items-start shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
             style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
          <TabBtn icon={<Home size={20} />} label={t.home}    active={view === "home"}    onClick={() => go("home")} />
          <TabBtn icon={<Search size={20} />} label={t.search} active={view === "search"} onClick={goToSearchFresh} />
          <TabBtn icon={<PlusCircle size={22} />} label={t.sell} active={view === "sell"} onClick={() => { if (requireAuth(t.loginToSell, () => go("sell"))) go("sell"); }} accent />
          <TabBtn icon={<MessageCircle size={20} />} label={t.chat} active={view === "chat" || view === "thread"} onClick={() => go("chat")} />
          <TabBtn icon={<User size={20} />} label={t.profile} active={profileViews.includes(view)} onClick={() => go("profile")} />
        </nav>
      </div>

      {/* Auth modal */}
      {authModal && (
        <AuthModal modal={authModal} setModal={setAuthModal} onAuthSuccess={handleAuthSuccess} t={t} lang={lang} go={go} />
      )}
      {recovery && (
        <SetNewPasswordModal t={t} onDone={() => setRecovery(false)} />
      )}

      {/* Privacy / cookie banner — shown until the user makes a choice. */}
      <CookieBanner t={t} lang={lang} go={go} />

      {/* Global mobile language toggle — fixed, always reachable on any screen.
          Hidden on desktop where the sidebar Brand toggle already exists.
          z-[80] keeps it above every sticky header and modal backdrop. */}
      <button onClick={() => setLang(lang === "it" ? "en" : "it")}
              aria-label="Toggle language"
              className="md:hidden fixed top-2 right-2 z-[80] flex items-center gap-1
                         bg-amber-500/90 backdrop-blur text-stone-950 font-black
                         ring-1 ring-amber-400/50 rounded-full pl-2.5 pr-3 py-1.5 shadow-xl
                         active:scale-95 transition-transform">
        <Languages size={13} />
        <span className="text-[11px] uppercase tracking-widest">{lang}</span>
      </button>
    </div>
  );
}

/* Cookie / privacy banner shown on first visit. Persists the choice in
   localStorage so it doesn't re-appear. We use Vercel Analytics in a
   privacy-friendly mode that doesn't strictly require consent, so this banner
   is informational + lets users opt out of analytics; technical cookies stay. */
function CookieBanner({ t, lang, go }) {
  const KEY = "herpmarket_cookie_choice";
  const [choice, setChoice] = useState(() => {
    try { return typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null; }
    catch { return null; }
  });
  if (choice) return null;

  const decide = (value) => {
    try { window.localStorage.setItem(KEY, value); } catch {}
    setChoice(value);
    // If you later add Vercel Analytics: only initialise it when value === "accept".
  };

  return (
    <div className="fixed bottom-20 md:bottom-4 inset-x-3 md:right-4 md:left-auto md:max-w-md z-[55]
                    bg-stone-900/95 backdrop-blur-xl ring-1 ring-stone-700 rounded-2xl
                    p-4 shadow-2xl anim-up">
      <div className="flex items-start gap-3">
        <div className="bg-amber-500/15 ring-1 ring-amber-500/30 rounded-lg p-2 shrink-0">
          <Lock size={16} className="text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-stone-100 text-sm">{t.cookieTitle}</h3>
          <p className="text-[11px] text-stone-400 leading-relaxed mt-1">{t.cookieBody}</p>
          <button onClick={() => go("privacy")}
                  className="text-[11px] font-bold text-amber-400 hover:text-amber-300 mt-1.5">
            {t.cookieMore} →
          </button>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={() => decide("decline")}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold bg-stone-800 text-stone-300 hover:bg-stone-700 transition-colors">
          {t.cookieDecline}
        </button>
        <button onClick={() => decide("accept")}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors">
          {t.cookieAccept}
        </button>
      </div>
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
/* Swipeable / clickable image carousel. Used on listing cards (compact) and
   the detail page (full). Arrows + dots; tapping the image still bubbles up
   (so a card tap opens the listing). Arrows/dots stopPropagation so they only
   change the photo. Falls back to a single image gracefully. */
function ImageCarousel({ images, alt, fallbackLabel, rounded = "", showCounter = false, imgClass = "" }) {
  const pics = (images && images.length) ? images : [null];
  const [idx, setIdx] = useState(0);
  const touchX = useRef(null);
  const multi = pics.length > 1;
  const at = Math.min(idx, pics.length - 1);

  const go = (d, e) => { e && e.stopPropagation(); setIdx(i => (i + d + pics.length) % pics.length); };
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) { setIdx(i => (i + (dx < 0 ? 1 : -1) + pics.length) % pics.length); }
    touchX.current = null;
  };

  return (
    <div className={`relative w-full h-full ${rounded}`} onTouchStart={multi ? onTouchStart : undefined} onTouchEnd={multi ? onTouchEnd : undefined}>
      <img src={pics[at]} alt={alt} loading="lazy"
           onError={(e) => { e.target.onerror = null; e.target.src = fallback(fallbackLabel || alt || ""); }}
           className={imgClass || "w-full h-full object-cover"} />
      {multi && (
        <>
          {/* Prev / next arrows */}
          <button onClick={(e) => go(-1, e)}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-950/60 backdrop-blur text-stone-100 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-stone-950/85 transition-opacity"
                  aria-label="Previous photo"><ChevronLeft size={16} /></button>
          <button onClick={(e) => go(1, e)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-950/60 backdrop-blur text-stone-100 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-stone-950/85 transition-opacity"
                  aria-label="Next photo"><ChevronRight size={16} /></button>
          {/* Dots */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            {pics.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                      className={`rounded-full transition-all ${i === at ? "w-2 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
                      aria-label={`Photo ${i + 1}`} />
            ))}
          </div>
          {showCounter && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-stone-950/70 backdrop-blur text-[10px] font-bold text-stone-100 px-2 py-0.5 rounded-full">
              {at + 1}/{pics.length}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ListingCard({ item, go, favorites, toggleFav, t }) {
  return (
    <div onClick={() => go("detail", item)}
         className="group bg-stone-900/60 border border-stone-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all flex flex-col">
      <div className="relative aspect-square bg-stone-800 overflow-hidden">
        <ImageCarousel images={item.images} alt={item.common} fallbackLabel={item.common || t.realPhoto}
                       imgClass="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {/* Sex badge top-left */}
        <div className="absolute top-2 left-2 bg-stone-950/80 backdrop-blur-sm rounded-md px-1.5 py-1 ring-1 ring-stone-700/50">
          <SexIcon sex={item.sex} t={t} size={11} />
        </div>
        {/* Heart top-right */}
        <button onClick={(e) => toggleFav(item.id, e)} aria-label="Save to favourites"
                className="absolute top-2 right-2 p-1.5 bg-stone-950/80 backdrop-blur-sm rounded-full ring-1 ring-stone-700/50 hover:ring-rose-500/50 transition-all">
          <Heart size={12} className={favorites.includes(item.id) ? "fill-rose-500 text-rose-500" : "text-stone-300"} />
        </button>
        {/* Expo flag bottom-left */}
        {(() => {
          const ids = (item.expoIds && item.expoIds.length) ? item.expoIds : (item.expoId ? [item.expoId] : []);
          if (!ids.length) return null;
          const expo = EXPOS.find(e => e.id === ids[0]);
          if (!expo) return null;
          return (
            <div className="absolute bottom-2 left-2 bg-amber-500/95 text-stone-950 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-lg">
              ★ {expo.name.split(" ")[0]}{ids.length > 1 ? ` +${ids.length - 1}` : ""}
            </div>
          );
        })()}
        {/* Auction badge bottom-right */}
        {item.auction && (
          <div className="absolute bottom-2 right-2 bg-stone-950/85 backdrop-blur-sm text-amber-300 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ring-1 ring-amber-500/40 shadow-lg inline-flex items-center gap-1">
            <ArrowUpDown size={9} />{t.auctionLabel}
          </div>
        )}
      </div>

      <div className="p-2.5 flex-1 flex flex-col gap-1.5">
        <div>
          {item.title ? (
            <>
              <h4 className="text-[13px] font-bold text-stone-50 leading-tight line-clamp-2">{item.title}</h4>
              <p className="text-[10px] text-stone-400 truncate mt-0.5">{item.common}</p>
              <p className="text-[10px] text-stone-500 italic truncate">{item.species}</p>
            </>
          ) : (
            <>
              <h4 className="text-[13px] font-bold text-stone-50 leading-tight truncate">{item.common}</h4>
              <p className="text-[10px] text-stone-500 italic truncate">{item.species}</p>
            </>
          )}
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

        {/* Footer: price/bid + age */}
        <div className="flex items-end justify-between pt-1.5 mt-auto border-t border-stone-800/60">
          <div>
            {item.auction ? (
              <>
                <div className="text-[8px] text-amber-400/70 font-black uppercase tracking-widest leading-none mb-0.5">{t.currentBid}</div>
                <div className="font-display font-bold text-amber-400 text-base leading-none">{formatPrice(item.auction.currentBid)}</div>
                <div className="text-[9px] text-stone-500 mt-1 truncate">{item.auction.bidCount} {t.bids} · {countryByCode(item.country).flag} {item.city}</div>
              </>
            ) : (
              <>
                <div className="font-display font-bold text-amber-400 text-base leading-none">{formatPrice(item.price)}</div>
                <div className="text-[9px] text-stone-500 mt-1 truncate">{formatBirth(item, t)} · {countryByCode(item.country).flag} {item.city}</div>
              </>
            )}
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
function Home_({ t, lang, setLang, go, favorites, toggleFav, filter, setFilter, user, setAuthModal, requireAuth, listingsData }) {
  const userRegion = user?.region || "Piemonte";
  const LIST = listingsData || LISTINGS;
  const near = LIST.filter(l => l.region === userRegion);
  const all = LIST;
  const [showAllExpos, setShowAllExpos] = useState(false);
  // Real per-category counts from the actual listings (no more fake 412).
  const catCounts = useMemo(() => {
    const m = {};
    LIST.forEach(l => { if (l.category) m[l.category] = (m[l.category] || 0) + 1; });
    return m;
  }, [LIST]);

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Mobile header */}
      <header className="md:hidden px-5 pt-14 pb-5 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800/60">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-3xl text-stone-50 leading-none tracking-tight" style={{ fontVariationSettings: "'opsz' 144" }}>
              Herp<span className="italic text-amber-500">Market</span>
            </h1>
            <p className="text-[11px] text-stone-400 mt-2 italic font-display">{t.tagline}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Login / account (language toggle now lives in the persistent floating header) */}
            {user ? (
              <button onClick={() => go("profile")}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display text-sm text-stone-50 font-bold ring-1 ring-amber-400/30">
                {initialsOf(user.name)}
              </button>
            ) : (
              <button onClick={() => setAuthModal({ mode: "login", reason: null, after: null })}
                      className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] rounded-lg px-3 py-2 transition-colors">
                <LogIn size={13} />{t.login}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile hero copy */}
      <div className="md:hidden px-5 pt-5">
        <h2 className="font-display text-2xl text-stone-50 tracking-tight leading-tight">{t.heroTitle}</h2>
        <p className="text-stone-400 text-[13px] mt-2.5 leading-relaxed">{t.heroSub}</p>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={() => { setFilter({ ...filter, sort: "distance" }); go("search", null, true); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-4 py-3 rounded-lg transition-colors">
            <Search size={15} />{t.browseListings}
          </button>
          <span className="text-[11px] text-stone-500 font-medium shrink-0">{t.orSep}</span>
          <button onClick={() => { if (requireAuth(t.loginToSell, () => go("sell"))) go("sell"); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm px-4 py-3 rounded-lg transition-colors ring-1 ring-stone-700">
            <PlusCircle size={15} />{t.sellCta}
          </button>
        </div>
      </div>

      {/* Desktop hero */}
      <header className="hidden md:block px-8 pt-12 pb-8 border-b border-stone-800/60">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl lg:text-5xl text-stone-50 tracking-tight leading-[1.1]" style={{ fontVariationSettings: "'opsz' 144" }}>
            {t.heroTitle}
          </h2>
          <p className="text-stone-400 text-base mt-4 max-w-2xl leading-relaxed">
            {t.heroSub}
          </p>
          <button onClick={() => { setFilter({ ...filter, sort: "distance" }); go("search", null, true); }}
                  className="mt-6 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-6 py-3 rounded-lg transition-colors">
            <Search size={16} />{t.heroBtn}
          </button>
        </div>
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
                      go("search", null, true); // fresh = start at top
                    }}
                    className="anim-up shrink-0 bg-stone-900/60 hover:bg-stone-800/60 border border-stone-800 hover:border-amber-500/40 rounded-xl px-4 py-3 transition-all min-w-[110px] text-left"
                    style={{ animationDelay: `${i * 30}ms` }}>
              <div className="text-2xl mb-1.5">{c.emoji}</div>
              <div className="font-bold text-sm text-stone-100">{c[lang]}</div>
              <div className="text-[10px] text-stone-500 font-medium">{catCounts[c.id] || 0} {lang === "it" ? "annunci" : "listings"}</div>
            </button>
          ))}
        </div>

        {/* Quick-access: detailed search + auctions */}
        <div className="grid grid-cols-2 gap-2.5 mt-3">
          <button onClick={() => go("search", { openFilters: true }, true)}
                  className="flex items-center gap-2.5 bg-stone-900/60 hover:bg-stone-800/60 border border-stone-800 hover:border-amber-500/40 rounded-xl px-4 py-3 transition-all text-left">
            <div className="bg-amber-500/15 ring-1 ring-amber-500/30 rounded-lg p-2 shrink-0">
              <SlidersHorizontal size={16} className="text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-stone-100 truncate">{t.detailedSearch}</div>
              <div className="text-[10px] text-stone-500 truncate">{t.detailedSearchSub}</div>
            </div>
          </button>
          <button onClick={() => { setFilter({ ...filter, auctionOnly: true }); go("search", null, true); }}
                  className="flex items-center gap-2.5 bg-stone-900/60 hover:bg-stone-800/60 border border-stone-800 hover:border-amber-500/40 rounded-xl px-4 py-3 transition-all text-left">
            <div className="bg-amber-500/15 ring-1 ring-amber-500/30 rounded-lg p-2 shrink-0">
              <ArrowUpDown size={16} className="text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-stone-100 truncate">{t.viewAuctions}</div>
              <div className="text-[10px] text-stone-500 truncate">{t.viewAuctionsSub}</div>
            </div>
          </button>
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
            const expoAnimalsCount = (listingsData || LISTINGS).filter(l => (l.expoIds && l.expoIds.includes(expo.id)) || l.expoId === expo.id).length;
            return (
              <button key={expo.id}
                      onClick={() => go("expo", expo)}
                      className={`anim-up bg-gradient-to-br from-emerald-800 to-teal-700 rounded-xl p-3 cursor-pointer hover:scale-[1.02] transition-transform text-left relative overflow-hidden group`}
                      style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-base leading-none shrink-0">{countryByCode(expo.country).flag}</span>
                    <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold truncate">{expo.date}</div>
                  </div>
                  {expoAnimalsCount > 0 && (
                    <div className="bg-white/15 backdrop-blur ring-1 ring-white/20 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white shrink-0">
                      {expoAnimalsCount}
                    </div>
                  )}
                </div>
                <h4 className="font-display text-base text-white mt-1.5 leading-tight">{expo.name}</h4>
                <div className="flex items-center gap-1 text-white/80 text-[11px] mt-1">
                  <MapPin size={10} />{expo.location}
                </div>
                <ChevronRight size={16} className="absolute bottom-3 right-3 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Sponsor slot — renders nothing until a row exists in the sponsors table */}
      <div className="px-5 md:px-8 pt-6">
        <SponsorSlot slot="home_banner" t={t} lang={lang} />
      </div>

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

      {/* Footer — legal links, always reachable (no login required) */}
      <LegalFooter t={t} go={go} lang={lang} />

      {/* All-expos modal */}
      {showAllExpos && (
        <AllExposModal onClose={() => setShowAllExpos(false)} go={go} t={t} lang={lang} />
      )}
    </div>
  );
}

/* Footer with legal + about links. Rendered on the home screen and the login
   gate so Terms, Privacy, Marketplace Policy and About are accessible to
   everyone, logged in or not (a legal requirement, not just good manners). */
function LegalFooter({ t, go, lang }) {
  return (
    <footer className="border-t border-stone-800 mt-4 px-5 md:px-8 py-8">
      <div className="font-display text-lg text-stone-300 tracking-tight mb-3">
        Herp<span className="italic text-amber-500">Market</span>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px]">
        <button onClick={() => go("about")} className="text-stone-400 hover:text-amber-400 transition-colors">{t.aboutContact}</button>
        <button onClick={() => go("terms")} className="text-stone-400 hover:text-amber-400 transition-colors">{t.termsLegal}</button>
        <button onClick={() => go("storepolicy")} className="text-stone-400 hover:text-amber-400 transition-colors">{t.storePolicyLabel}</button>
        <button onClick={() => go("privacy")} className="text-stone-400 hover:text-amber-400 transition-colors">{t.privacyLabel}</button>
      </div>
      <p className="text-[10px] text-stone-600 mt-4">
        © 2026 HerpMarket · {lang === "it" ? "Il marketplace rettili in Europa" : "The reptile marketplace in Europe"}
      </p>
    </footer>
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
                            className={`w-full bg-gradient-to-r from-emerald-800 to-teal-700 rounded-lg p-2.5 flex items-center gap-2.5 text-left hover:scale-[1.01] transition-transform group`}>
                      <div className="bg-black/30 backdrop-blur rounded-md px-2 py-1 text-center shrink-0 min-w-[50px]">
                        <div className="text-[8px] uppercase tracking-widest text-white/70 font-bold leading-none">{monthNames[parseInt(expo.dateISO.slice(5, 7), 10) - 1]}</div>
                        <div className="font-display text-base text-white leading-none mt-0.5">{expo.dateISO.slice(8, 10)}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-[13px] leading-tight truncate">{expo.name}</div>
                        <div className="flex items-center gap-1.5 text-white/80 text-[11px] mt-0.5">
                          <span className="text-sm leading-none shrink-0">{countryByCode(expo.country).flag}</span>
                          <span className="truncate">{expo.location}</span>
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
function SearchScreen({ t, lang, go, favorites, toggleFav, filter, setFilter, initialState, listingsData, user }) {
  const [showFilters, setShowFilters] = useState(initialState?.openFilters || false);
  const [showSort, setShowSort] = useState(false);
  // Snapshot of the filter when the sheet opens. If the user closes with X
  // (cancel) we restore it; if they tap Apply we keep the changes.
  const filterSnapshot = useRef(null);
  const openFilters = () => { filterSnapshot.current = { ...filter }; setShowFilters(true); };
  const applyFilters = () => { filterSnapshot.current = null; setShowFilters(false); };
  const cancelFilters = () => {
    if (filterSnapshot.current) setFilter(filterSnapshot.current);
    filterSnapshot.current = null;
    setShowFilters(false);
  };

  const filtered = useMemo(() => {
    let r = listingsData || LISTINGS;
    if (filter.category)    r = r.filter(l => l.category === filter.category);
    if (filter.subCategory) r = r.filter(l => l.species === filter.subCategory);
    if (filter.sex)         r = r.filter(l => l.sex === filter.sex);
    if (filter.region)      r = r.filter(l => l.region === filter.region);
    if (filter.country)     r = r.filter(l => l.country === filter.country);
    if (filter.seller)      r = r.filter(l => l.seller === filter.seller);
    if (filter.expoOnly)    r = r.filter(l => (l.expoIds && l.expoIds.length) || l.expoId != null);
    if (filter.verifiedOnly) r = r.filter(l => l.verified);
    if (filter.auctionOnly) r = r.filter(l => !!l.auction);
    if (filter.priceMin != null) r = r.filter(l => l.price >= filter.priceMin);
    if (filter.priceMax != null) r = r.filter(l => l.price <= filter.priceMax);
    if (filter.traitClass)  r = r.filter(l => l.traits.some(tr => tr.cls === filter.traitClass));
    if (filter.traits.length > 0) {
      // animal must have ALL selected traits (AND logic, like MorphMarket multi-gene)
      r = r.filter(l => filter.traits.every(want =>
        l.traits.some(tr => tr.name.toLowerCase() === want.toLowerCase())));
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      r = r.filter(l =>
        l.species.toLowerCase().includes(q) ||
        l.common.toLowerCase().includes(q) ||
        l.seller.toLowerCase().includes(q) ||
        l.traits.some(tr => tr.name.toLowerCase().includes(q)));
    }
    if (filter.sort === "priceAsc")  r = [...r].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (filter.sort === "priceDesc") r = [...r].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    if (filter.sort === "distance") {
      // No coordinates in the data, so "nearest" = same region as the user first.
      const myRegion = user?.region || "";
      r = [...r].sort((a, b) => (a.region === myRegion ? 0 : 1) - (b.region === myRegion ? 0 : 1));
    }
    if (filter.sort === "ratingDesc") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [filter, listingsData, user?.region]);

  const activeFilterCount = [
    filter.category, filter.subCategory, filter.sex, filter.region, filter.country, filter.seller,
    filter.traitClass, filter.priceMin != null || filter.priceMax != null ? "price" : null,
    filter.expoOnly ? "expo" : null, filter.verifiedOnly ? "verified" : null, filter.auctionOnly ? "auction" : null,
  ].filter(Boolean).length + filter.traits.length;

  const sortLabels = {
    newest: t.sortNewest, priceAsc: t.sortPriceAsc, priceDesc: t.sortPriceDesc,
    distance: t.sortDistance, ratingDesc: t.sortRating,
  };
  // All sellers present in current category scope (for the seller filter dropdown)
  const sellersInScope = [...new Set(
    (listingsData || LISTINGS).filter(l => !filter.category || l.category === filter.category).map(l => l.seller)
  )].sort();
  // Trait tags available for the current category/sub-category scope
  const scopeTraits = filter.category ? getTraitsForScope(filter.category, filter.subCategory) : [];

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
            <button onClick={openFilters}
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

          {/* Quick trait chips — appear when a category is selected (MorphMarket-style) */}
          {filter.category && scopeTraits.length > 0 && (
            <div className="mt-3 -mx-5 md:mx-0 px-5 md:px-0">
              <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1">
                {scopeTraits.slice(0, 14).map((tr, i) => {
                  const on = filter.traits.includes(tr.name);
                  return (
                    <button key={i}
                            onClick={() => setFilter({
                              ...filter,
                              traits: on ? filter.traits.filter(x => x !== tr.name) : [...filter.traits, tr.name],
                            })}
                            className={`shrink-0 transition-all ${on ? "scale-100" : "opacity-70 hover:opacity-100"}`}>
                      <span className={on ? "ring-2 ring-amber-400 rounded-md inline-block" : "inline-block"}>
                        <TraitChip trait={tr} size="sm" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {filter.category && (
                <FilterPill onRemove={() => setFilter({ ...filter, category: null, subCategory: null, traits: [] })}>
                  {CATEGORIES.find(c => c.id === filter.category)?.[lang]}
                </FilterPill>
              )}
              {filter.subCategory && (
                <FilterPill onRemove={() => setFilter({ ...filter, subCategory: null })}>
                  {SPECIES_LABELS[filter.subCategory]?.[lang] || filter.subCategory}
                </FilterPill>
              )}
              {filter.traits.map(tn => (
                <FilterPill key={tn} onRemove={() => setFilter({ ...filter, traits: filter.traits.filter(x => x !== tn) })}>
                  {tn}
                </FilterPill>
              ))}
              {filter.traitClass && (
                <FilterPill onRemove={() => setFilter({ ...filter, traitClass: null })}>
                  {TRAIT_CLASS[filter.traitClass]?.label}
                </FilterPill>
              )}
              {filter.sex && <FilterPill onRemove={() => setFilter({ ...filter, sex: null })}>{sexLabel(filter.sex, t)}</FilterPill>}
              {filter.region && <FilterPill onRemove={() => setFilter({ ...filter, region: null })}>{filter.region}</FilterPill>}
              {filter.country && <FilterPill onRemove={() => setFilter({ ...filter, country: null })}>{countryByCode(filter.country).flag} {countryByCode(filter.country)[lang]}</FilterPill>}
              {filter.seller && <FilterPill onRemove={() => setFilter({ ...filter, seller: null })}>{filter.seller}</FilterPill>}
              {(filter.priceMin != null || filter.priceMax != null) && (
                <FilterPill onRemove={() => setFilter({ ...filter, priceMin: null, priceMax: null })}>
                  €{filter.priceMin ?? 0}–{filter.priceMax ?? "∞"}
                </FilterPill>
              )}
              {filter.expoOnly && <FilterPill onRemove={() => setFilter({ ...filter, expoOnly: false })}>★ {t.expoOnlyLabel}</FilterPill>}
              {filter.verifiedOnly && <FilterPill onRemove={() => setFilter({ ...filter, verifiedOnly: false })}>✓ {t.verifiedOnlyLabel}</FilterPill>}
              {filter.auctionOnly && <FilterPill onRemove={() => setFilter({ ...filter, auctionOnly: false })}>⇅ {t.viewAuctions}</FilterPill>}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 md:px-8 py-5 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <p className="font-display italic text-lg">{lang === "it" ? "Nessun risultato trovato" : "No results found"}</p>
            <p className="text-xs mt-2">{lang === "it" ? "Prova a modificare i filtri" : "Try adjusting your filters"}</p>
            <button onClick={() => setFilter({
                      category: null, subCategory: null, sex: null, region: null, country: null,
                      sort: "newest", search: "", priceMin: null, priceMax: null, traits: [], traitClass: null,
                      seller: null, expoOnly: false, verifiedOnly: false, auctionOnly: false,
                    })}
                    className="mt-5 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition-colors">
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
            {filtered.map(item => <ListingCard key={item.id} item={item} go={go} favorites={favorites} toggleFav={toggleFav} t={t} />)}
          </div>
        )}
      </div>

      {/* Filters drawer */}
      {showFilters && (
        <BottomSheet onClose={cancelFilters} title={t.advFilters}>
          <div className="space-y-5">
            {/* Category */}
            <FilterGroup label={t.species}>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map(c => (
                  <ToggleChip key={c.id} active={filter.category === c.id}
                              onClick={() => setFilter({ ...filter, category: filter.category === c.id ? null : c.id, subCategory: null, traits: [] })}>
                    {c.emoji} {c[lang]}
                  </ToggleChip>
                ))}
              </div>
            </FilterGroup>

            {/* Sub-category (species) — only when a category with species is chosen */}
            {filter.category && (CATEGORY_SPECIES[filter.category]?.length > 0) && (
              <FilterGroup label={t.subCategoryLabel}>
                <select value={filter.subCategory || ""} onChange={e => setFilter({ ...filter, subCategory: e.target.value || null, traits: [] })}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/60">
                  <option value="">{t.anySpecies}</option>
                  {CATEGORY_SPECIES[filter.category].map(sp => (
                    <option key={sp} value={sp}>{SPECIES_LABELS[sp]?.[lang] || sp}</option>
                  ))}
                </select>
              </FilterGroup>
            )}

            {/* Trait tags — dynamic by category/species */}
            <FilterGroup label={t.traitsLabel}>
              {filter.category ? (
                scopeTraits.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto hide-scrollbar">
                    {scopeTraits.map((tr, i) => {
                      const on = filter.traits.includes(tr.name);
                      return (
                        <button key={i}
                                onClick={() => setFilter({
                                  ...filter,
                                  traits: on ? filter.traits.filter(x => x !== tr.name) : [...filter.traits, tr.name],
                                })}>
                          <span className={on ? "ring-2 ring-amber-400 rounded-md inline-block" : "opacity-60 hover:opacity-100 inline-block"}>
                            <TraitChip trait={tr} size="sm" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500 italic">{lang === "it" ? "Nessun tratto catalogato per questa categoria." : "No catalogued traits for this category."}</p>
                )
              ) : (
                <p className="text-xs text-stone-500 italic">{t.selectCategoryFirst}</p>
              )}
            </FilterGroup>

            {/* Genetic type (trait class) */}
            <FilterGroup label={t.traitClassLabel}>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["recessive", t.classRecessive], ["dominant", t.classDominant], ["incDom", t.classIncDom],
                  ["line", t.classLine], ["locality", t.classLocality], ["het", t.classHet],
                ].map(([key, label]) => (
                  <ToggleChip key={key} active={filter.traitClass === key}
                              onClick={() => setFilter({ ...filter, traitClass: filter.traitClass === key ? null : key })}>
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${TRAIT_CLASS[key]?.dot}`} />{label}
                    </span>
                  </ToggleChip>
                ))}
              </div>
            </FilterGroup>

            {/* Price range */}
            <FilterGroup label={t.priceRange}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 flex-1">
                  <span className="text-stone-400 text-sm shrink-0">€</span>
                  <input type="number" min="0" inputMode="numeric" placeholder={t.min}
                         value={filter.priceMin ?? ""}
                         onChange={e => setFilter({ ...filter, priceMin: e.target.value === "" ? null : Number(e.target.value) })}
                         className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/60" />
                </div>
                <span className="text-stone-600">–</span>
                <div className="flex items-center gap-1.5 flex-1">
                  <span className="text-stone-400 text-sm shrink-0">€</span>
                  <input type="number" min="0" inputMode="numeric" placeholder={t.max}
                         value={filter.priceMax ?? ""}
                         onChange={e => setFilter({ ...filter, priceMax: e.target.value === "" ? null : Number(e.target.value) })}
                         className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/60" />
                </div>
              </div>
            </FilterGroup>

            {/* Sex */}
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

            {/* Country — dropdown (Italy first, then alphabetical) */}
            <FilterGroup label={t.countryLabel}>
              <select value={filter.country || ""} onChange={e => setFilter({ ...filter, country: e.target.value || null, region: null })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/60">
                <option value="">{t.anyCountry}</option>
                {[...COUNTRIES].sort((a, b) => a.code === "IT" ? -1 : b.code === "IT" ? 1 : a[lang].localeCompare(b[lang], lang))
                  .map(c => <option key={c.code} value={c.code}>{c.flag} {c[lang]}</option>)}
              </select>
            </FilterGroup>

            {/* Region — adapts to the selected country; free of country shows IT regions */}
            <FilterGroup label={t.region}>
              <select value={filter.region || ""} onChange={e => setFilter({ ...filter, region: e.target.value || null })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/60">
                <option value="">{t.anyRegion}</option>
                {(regionsForCountry(filter.country || "IT")).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </FilterGroup>

            {/* Seller */}
            <FilterGroup label={t.sellerLabel}>
              <select value={filter.seller || ""} onChange={e => setFilter({ ...filter, seller: e.target.value || null })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/60">
                <option value="">{t.anySeller}</option>
                {sellersInScope.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </FilterGroup>

            {/* Toggles */}
            <div className="space-y-2">
              <label className="flex items-center justify-between bg-stone-900/60 ring-1 ring-stone-800 rounded-lg px-3 py-3 cursor-pointer">
                <span className="text-sm text-stone-200 font-medium flex items-center gap-2">
                  <Calendar size={15} className="text-amber-400" />{t.expoOnlyLabel}
                </span>
                <input type="checkbox" checked={filter.expoOnly}
                       onChange={() => setFilter({ ...filter, expoOnly: !filter.expoOnly })}
                       className="w-4 h-4 rounded accent-amber-500 cursor-pointer" />
              </label>
              <label className="flex items-center justify-between bg-stone-900/60 ring-1 ring-stone-800 rounded-lg px-3 py-3 cursor-pointer">
                <span className="text-sm text-stone-200 font-medium flex items-center gap-2">
                  <ShieldCheck size={15} className="text-sky-400" />{t.verifiedOnlyLabel}
                </span>
                <input type="checkbox" checked={filter.verifiedOnly}
                       onChange={() => setFilter({ ...filter, verifiedOnly: !filter.verifiedOnly })}
                       className="w-4 h-4 rounded accent-amber-500 cursor-pointer" />
              </label>
              <label className="flex items-center justify-between bg-stone-900/60 ring-1 ring-stone-800 rounded-lg px-3 py-3 cursor-pointer">
                <span className="text-sm text-stone-200 font-medium flex items-center gap-2">
                  <ArrowUpDown size={15} className="text-amber-400" />{t.viewAuctions}
                </span>
                <input type="checkbox" checked={filter.auctionOnly}
                       onChange={() => setFilter({ ...filter, auctionOnly: !filter.auctionOnly })}
                       className="w-4 h-4 rounded accent-amber-500 cursor-pointer" />
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 sticky bottom-0 bg-stone-900 pb-1">
              <button onClick={() => setFilter({
                        category: null, subCategory: null, sex: null, region: null, country: null,
                        sort: filter.sort, search: filter.search,
                        priceMin: null, priceMax: null, traits: [], traitClass: null,
                        seller: null, expoOnly: false, verifiedOnly: false, auctionOnly: false,
                      })}
                      className="flex-1 py-3 rounded-lg text-sm font-bold bg-stone-800 text-stone-300 hover:bg-stone-700 transition-colors">
                {t.clearAll}
              </button>
              <button onClick={applyFilters}
                      className="flex-[2] py-3 rounded-lg text-sm font-bold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors">
                {t.apply} · {t.resultsCount(filtered.length)}
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
/* ═══════════════════════════════════════════════════════════════════
   AUCTIONS — MorphMarket-style
   - startPrice: visible, where bidding opens
   - reservePrice: HIDDEN seller floor. UI shows only "reserve met / not met",
     never the number.
   - currentBid + bidCount: live state
   - endsAt: ISO timestamp; countdown ticks down to it
   The min next bid is currentBid + a small increment.
   ═════════════════════════════════════════════════════════════════ */

// Returns a live-ticking countdown for a target ISO datetime.
// Ticks every second in the final 5 minutes (so the timer is accurate near the
// end and doesn't let a buyer bid on an already-closed auction), 30s otherwise.
// Parse an ISO timestamp as UTC. If the stored string has no timezone marker
// (no trailing Z and no +hh:mm offset), append "Z" so every device — whatever
// its local timezone — counts down to the exact same closing instant.
function parseAsUTC(iso) {
  if (!iso) return NaN;
  const s = String(iso);
  const hasTZ = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(s);
  return new Date(hasTZ ? s : s + "Z").getTime();
}

function useCountdown(endsAtISO) {
  const [now, setNow] = useState(Date.now());
  const end = parseAsUTC(endsAtISO);
  useEffect(() => {
    const remaining = end - Date.now();
    const fast = remaining > 0 && remaining < 5 * 60 * 1000;
    const id = setInterval(() => setNow(Date.now()), fast ? 1000 : 1000 * 30);
    return () => clearInterval(id);
  }, [endsAtISO, now > end - 5 * 60 * 1000]);
  const diff = end - now;
  if (diff <= 0) return { ended: true, d: 0, h: 0, m: 0 };
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return { ended: false, d, h, m };
}

function bidIncrement(amount) {
  if (amount < 100) return 5;
  if (amount < 500) return 10;
  if (amount < 1000) return 25;
  return 50;
}

function AuctionBox({ auction, listingId, t, lang, user, requireAuth, onContactSeller }) {
  const [bid, setBid] = useState(auction.currentBid);
  const [bidCount, setBidCount] = useState(auction.bidCount);
  const [highBidder, setHighBidder] = useState(auction.highBidder || null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidErr, setBidErr] = useState("");
  const [busy, setBusy] = useState(false);
  const cd = useCountdown(auction.endsAt);

  const minNext = bid + bidIncrement(bid);
  const reserveMet = auction.reservePrice ? bid >= auction.reservePrice : true;
  const myStatus = highBidder && user?.id ? (highBidder === user.id ? "winning" : "outbid") : null;

  // Live updates: when anyone bids, the listing row changes → refresh figures.
  useEffect(() => {
    if (!listingId) return;
    let unsub = null;
    let cancelled = false;
    (async () => {
      const api = await import("./lib/api");
      if (cancelled) return;   // unmounted before subscribe resolved
      unsub = api.subscribeAuction(listingId, (a) => {
        setBid(a.currentBid);
        setBidCount(a.bidCount);
        setHighBidder(a.highBidder || null);
      });
      if (cancelled && unsub) unsub();   // unmounted during await → clean up now
    })();
    return () => { cancelled = true; if (unsub) unsub(); };
  }, [listingId]);

  const placeBid = async (amount) => {
    if (!listingId || busy) return;
    setBusy(true); setBidErr("");
    try {
      const api = await import("./lib/api");
      const a = await api.placeBid(listingId, user.id, amount);
      setBid(a.currentBid); setBidCount(a.bidCount); setHighBidder(a.highBidder || user.id);
      setShowBidModal(false);
    } catch (e) {
      setBidErr(e?.code === "bid_too_low" ? t.outbid : (e?.message || "Error"));
      // The bid likely failed because someone else bid first — silently pull the
      // latest figures so the user sees the new current bid + minimum next bid.
      try {
        const api = await import("./lib/api");
        const fresh = await api.fetchAuction(listingId);
        if (fresh) { setBid(fresh.currentBid); setBidCount(fresh.bidCount); setHighBidder(fresh.highBidder || null); }
      } catch (_) { /* best-effort */ }
    } finally { setBusy(false); }
  };

  return (
    <div id="auction-box" className="mt-5 bg-gradient-to-br from-amber-500/10 to-stone-900/40 ring-1 ring-amber-500/25 rounded-2xl p-5">
      {/* Auction badge + countdown */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/15 ring-1 ring-amber-500/30 px-2 py-1 rounded">
          <ArrowUpDown size={11} />{t.auctionLabel}
        </span>
        {cd.ended ? (
          <span className="text-xs font-bold text-rose-400">{t.auctionEnded}</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-300">
            <Clock size={13} className="text-amber-400" />
            {t.auctionEnds} {cd.d > 0 && `${cd.d}${t.days} `}{cd.h}{t.hours} {cd.m}{t.minutes}
          </span>
        )}
      </div>

      {/* Current bid */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{t.currentBid}</div>
          <div className="font-display font-bold text-4xl text-stone-50 leading-none mt-1">{formatPrice(bid)}</div>
          <div className="text-[11px] text-stone-400 mt-1.5">
            {bidCount} {t.bids} · {t.startPrice.toLowerCase()} {formatPrice(auction.startPrice)}
          </div>
        </div>
        {/* Reserve status — never shows the actual number */}
        <div className={`text-right ${reserveMet ? "text-emerald-400" : "text-stone-500"}`}>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold">
            {reserveMet ? <CheckCircle size={13} /> : <Info size={13} />}
            {reserveMet ? t.reserveMet : t.reserveNotMet}
          </div>
        </div>
      </div>

      {/* My status (live, while running) */}
      {myStatus && !cd.ended && (
        <div className={`mt-3 text-[11px] font-bold rounded-lg px-3 py-2 ${
          myStatus === "winning" ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20"
                                 : "bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/20"
        }`}>
          {myStatus === "winning" ? `✓ ${t.winning}` : t.outbid}
        </div>
      )}

      {/* Auction outcome when the timer has ended */}
      {cd.ended && (
        <div className={`mt-3 text-[11px] font-bold rounded-lg px-3 py-2.5 ${
          !reserveMet ? "bg-stone-800/60 text-stone-400 ring-1 ring-stone-700"
          : myStatus === "winning" ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20"
          : "bg-stone-800/60 text-stone-300 ring-1 ring-stone-700"
        }`}>
          {!reserveMet ? (
            <span>{t.auctionEndedNoReserve}</span>
          ) : myStatus === "winning" ? (
            <span>{t.auctionWon}</span>
          ) : bidCount > 0 ? (
            <span>{t.auctionEndedWinner}</span>
          ) : (
            <span>{t.auctionEndedNoBids}</span>
          )}
        </div>
      )}

      {bidErr && <div className="mt-3 text-[11px] font-bold text-rose-300">{bidErr}</div>}

      {/* Bid button — sellers can't bid on their own auction */}
      {!cd.ended && (
        <button onClick={() => { if (requireAuth(t.placeBid, () => setShowBidModal(true))) setShowBidModal(true); }}
                disabled={busy}
                className="w-full mt-4 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold py-3 rounded-lg text-sm transition-colors">
          {t.placeBid} · {t.minimumBid} {formatPrice(minNext)}
        </button>
      )}

      {/* Won → prompt the winner to contact the seller to complete the sale */}
      {cd.ended && reserveMet && myStatus === "winning" && (
        <button onClick={() => { if (requireAuth(t.message, () => onContactSeller && onContactSeller())) (onContactSeller && onContactSeller()); }}
                className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold py-3 rounded-lg text-sm transition-colors inline-flex items-center justify-center gap-1.5">
          <MessageCircle size={16} />{t.auctionContactToComplete}
        </button>
      )}

      <p className="text-[10px] text-stone-500 leading-relaxed mt-3">{t.auctionInfo}</p>

      {showBidModal && (
        <AuctionBidModal minNext={minNext} currentBid={bid} busy={busy} onClose={() => setShowBidModal(false)}
                         onBid={placeBid} t={t} lang={lang} />
      )}
    </div>
  );
}

function AuctionBidModal({ minNext, currentBid, busy, onClose, onBid, t, lang }) {
  const [value, setValue] = useState(minNext);
  const tooLow = value < minNext;

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-stone-950/85 backdrop-blur-sm p-0 md:p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
           className="w-full md:max-w-sm bg-stone-900 ring-1 ring-stone-800 rounded-t-3xl md:rounded-2xl p-6 anim-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-stone-50">{t.placeBid}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-100"><X size={20} /></button>
        </div>
        <div className="text-[11px] text-stone-400 mb-2">{t.currentBid}: <span className="text-stone-200 font-bold">{formatPrice(currentBid)}</span></div>
        <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 block">{t.yourBid}</label>
        <div className="flex items-center gap-2">
          <span className="text-stone-400 text-lg shrink-0">€</span>
          <input type="number" min="0" inputMode="numeric" value={value}
                 onChange={e => setValue(Number(e.target.value))}
                 className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-lg font-bold text-stone-100 outline-none focus:ring-amber-500/60" />
        </div>
        {/* Quick-bump buttons */}
        <div className="flex gap-2 mt-3">
          {[0, 1, 3].map((mult, i) => {
            const inc = bidIncrement(minNext) * (mult === 0 ? 1 : mult * 2);
            const amt = minNext + (mult === 0 ? 0 : inc);
            return (
              <button key={i} onClick={() => setValue(amt)}
                      className="flex-1 py-2 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors">
                {formatPrice(amt)}
              </button>
            );
          })}
        </div>
        {tooLow && <p className="text-[11px] text-rose-400 font-bold mt-2">{t.bidTooLow}</p>}
        <button onClick={() => onBid(value)} disabled={tooLow || busy}
                className="w-full mt-4 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold py-3 rounded-lg text-sm transition-colors">
          {busy ? t.processing : t.placeBid}
        </button>
      </div>
    </div>
  );
}

/* Cross-border notice: shown on the detail page when the seller's country
   differs from the buyer's. For the demo the buyer is assumed to be in Italy.
   Switzerland gets an extra customs warning since it's outside the EU. */
function CrossBorderNotice({ sellerCountry, t, lang, buyerCountry = "IT" }) {
  if (!sellerCountry || sellerCountry === buyerCountry) return null;
  const sc = countryByCode(sellerCountry);
  // Customs-border warning applies to ANY non-EU country (CH, GB, NO, …)
  const isSwiss = !sc.eu || !countryByCode(buyerCountry).eu;
  return (
    <div className="px-5 mt-5">
      <div className={`rounded-xl p-4 ring-1 ${
        isSwiss ? "bg-rose-500/5 ring-rose-500/25" : "bg-amber-500/5 ring-amber-500/25"
      }`}>
        <div className="flex items-center gap-2 mb-1.5">
          <Truck size={15} className={isSwiss ? "text-rose-400" : "text-amber-400"} />
          <h3 className="font-bold text-stone-100 text-sm">
            {t.crossBorderTitle} · {sc.flag} {sc[lang]} → {countryByCode(buyerCountry).flag} {countryByCode(buyerCountry)[lang]}
          </h3>
        </div>
        <p className="text-[11px] text-stone-300 leading-relaxed">{t.crossBorderEu}</p>
        {isSwiss && (
          <p className="text-[11px] text-rose-200/90 leading-relaxed mt-2 pt-2 border-t border-rose-500/15">
            {t.crossBorderCh}
          </p>
        )}
      </div>
    </div>
  );
}

function Detail({ listing, go, goBack, t, favorites, toggleFav, user, requireAuth, lang }) {
  // Single state machine. Possible values:
  // "idle" | "requested" | "approved" | "declined" | "paid" | "handover" | "completed"
  const [txState, setTxState] = useState("idle");
  const [sellerHandover, setSellerHandover] = useState(false);
  const [buyerHandover, setBuyerHandover] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [saleInfo, setSaleInfo] = useState(null);   // buyer details from the completed sale
  useEffect(() => {
    if (!showDocument || !a?.id) return;
    let on = true;
    import("./lib/api").then(api => api.fetchListingSaleInfo ? api.fetchListingSaleInfo(a.id) : null)
      .then(info => { if (on) setSaleInfo(info); }).catch(() => { if (on) setSaleInfo(null); });
    return () => { on = false; };
  }, [showDocument, a?.id]);

  if (!listing) return null;
  const a = listing;
  // Is this the logged-in user's own listing? Then show Edit, not Buy/Message.
  const isMine = !!(user?.id && (a.sellerOwnerId === user.id || (user.name && a.seller === user.name)));
  // Delivery options come from the SELLER's choices on the listing:
  //  - a.shipping: does the seller ship this animal?
  //  - a.expoIds:  which expos will the seller hand-deliver at? (array)
  // Legacy listings may only have a single expoId — fold it in.
  const expoIdList = a.expoIds && a.expoIds.length ? a.expoIds : (a.expoId ? [a.expoId] : []);
  const listingExpos = expoIdList.map(id => EXPOS.find(e => e.id === id)).filter(Boolean);
  const canShip = !!a.shipping;
  const hasExpo = listingExpos.length > 0;

  // Buyer chooses how they want to receive the animal.
  // Default to whichever is available (ship preferred if offered).
  const [deliveryMode, setDeliveryMode] = useState(canShip ? "ship" : (hasExpo ? "expo" : "ship"));
  const [selectedExpoId, setSelectedExpoId] = useState(listingExpos[0]?.id || null);

  const isExpoFlow = deliveryMode === "expo";
  const paymentAmount = isExpoFlow ? a.deposit : a.price;
  const expo = isExpoFlow ? (listingExpos.find(e => e.id === selectedExpoId) || listingExpos[0]) : null;
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
    requireAuth(t.loginToMessage, () => go("thread", { listing: a }));
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-40 md:pb-32">
      {/* Hero image */}
      <div className="group relative aspect-square md:aspect-[16/10] bg-stone-800 overflow-hidden">
        <ImageCarousel images={a.images} alt={a.common} fallbackLabel={t.realPhoto} showCounter
                       imgClass="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-stone-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none" />
        <button onClick={goBack}
                className="absolute top-5 left-4 p-2.5 bg-stone-950/70 backdrop-blur-md rounded-full text-stone-100 hover:bg-stone-950/90 transition-colors z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={(e) => toggleFav(a.id, e)} aria-label="Save to favourites"
                className="absolute top-5 right-4 p-2.5 bg-stone-950/70 backdrop-blur-md rounded-full transition-colors z-10">
          <Heart size={20} className={favorites.includes(a.id) ? "fill-rose-500 text-rose-500" : "text-stone-100"} />
        </button>
      </div>

      {/* Title block */}
      <div className="px-5 -mt-12 relative z-10">
        {a.title ? (
          <>
            <h1 className="font-display text-3xl md:text-4xl text-stone-50 tracking-tight leading-tight">{a.title}</h1>
            <p className="text-stone-300 text-sm mt-1.5">{a.common}</p>
            <p className="font-display italic text-amber-500 text-sm md:text-base">{a.species}</p>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl md:text-4xl text-stone-50 tracking-tight leading-tight">{a.common}</h1>
            <p className="font-display italic text-amber-500 text-sm md:text-base mt-1">{a.species}</p>
          </>
        )}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {a.traits.map((tr, i) => <TraitChip key={i} trait={tr} size="sm" />)}
        </div>
        {a.auction ? (
          <AuctionBox auction={a.auction} listingId={a.id} t={t} lang={lang} user={user} requireAuth={requireAuth}
                      onContactSeller={() => go("thread", { listing: a })} />
        ) : (
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display font-bold text-4xl text-stone-50">{formatPrice(a.price)}</span>
            {isExpoFlow && <span className="text-xs text-stone-500">· {t.payDeposit.toLowerCase()} {formatPrice(a.deposit)}</span>}
          </div>
        )}
      </div>

      {/* Specs grid */}
      <div className="px-5 mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        <Spec label={t.sex}>{sexLabel(a.sex, t)}</Spec>
        <Spec label={t.age}>{formatBirth(a, t)}</Spec>
        {a.weight && <Spec label={t.weight}>{a.weight}</Spec>}
        <Spec label={lang === "it" ? "Località" : "Location"}>{countryByCode(a.country).flag} {a.city}</Spec>
      </div>

      {/* Cross-border notice — buyer (assumed IT for demo) and seller differ */}
      <CrossBorderNotice sellerCountry={a.country} t={t} lang={lang} />

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

      {/* Listing timestamps — trust signals */}
      {(a.createdAt || a.updatedAt) && (
        <div className="px-1 -mt-1 mb-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-stone-500">
          {a.createdAt && formatDate(a.createdAt, lang) && (
            <span>{t.listedOn} {formatDate(a.createdAt, lang)}</span>
          )}
          {a.updatedAt && formatDate(a.updatedAt, lang) &&
            a.updatedAt !== a.createdAt && (
            <span>· {t.lastUpdated} {formatDate(a.updatedAt, lang)}</span>
          )}
        </div>
      )}

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
              {a.reviews > 0 ? (
                <>
                  <Star size={11} fill="currentColor" className="text-amber-400" />
                  <span className="font-bold text-stone-200">{a.rating}</span>
                  <span>({a.reviews})</span>
                  <span className="text-stone-600 mx-1">·</span>
                </>
              ) : (
                <><span className="text-stone-500 italic">{t.noReviewsYet}</span><span className="text-stone-600 mx-1">·</span></>
              )}
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

      {/* Delivery options — driven by what the SELLER allows on this listing.
          Buyer picks ship vs expo. Shipping is greyed out if the seller doesn't
          ship; the available expos are always listed when present. */}
      {txState === "idle" && !a.auction && (
        <Section title={t.deliveryChoose}>
          <div className="space-y-2.5">
            {/* Buy & ship */}
            {canShip ? (
              <button onClick={() => setDeliveryMode("ship")}
                      className={`w-full text-left rounded-xl p-4 ring-1 transition-all flex items-start gap-3 ${
                        deliveryMode === "ship" ? "bg-amber-500/10 ring-amber-500/40" : "bg-stone-900/40 ring-stone-800 hover:ring-stone-700"
                      }`}>
                <Truck size={18} className={deliveryMode === "ship" ? "text-amber-400 mt-0.5" : "text-stone-400 mt-0.5"} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-100 text-sm">{t.deliveryShip}</span>
                    <span className="font-display font-bold text-stone-50">{formatPrice(a.price)}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{t.deliveryShipDesc}</p>
                </div>
              </button>
            ) : (
              /* Shipping NOT available — greyed out with notice */
              <div className="w-full rounded-xl p-4 ring-1 ring-stone-800 bg-stone-900/20 flex items-start gap-3 opacity-70">
                <Truck size={18} className="text-stone-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-400 text-sm line-through">{t.deliveryShip}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20 px-1.5 py-0.5 rounded">
                      {t.noShipping}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{t.noShippingDesc}</p>
                </div>
              </div>
            )}

            {/* Reserve for expo */}
            {hasExpo && (
              <button onClick={() => setDeliveryMode("expo")}
                      className={`w-full text-left rounded-xl p-4 ring-1 transition-all flex items-start gap-3 ${
                        deliveryMode === "expo" ? "bg-amber-500/10 ring-amber-500/40" : "bg-stone-900/40 ring-stone-800 hover:ring-stone-700"
                      }`}>
                <Calendar size={18} className={deliveryMode === "expo" ? "text-amber-400 mt-0.5" : "text-stone-400 mt-0.5"} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-100 text-sm">{t.deliveryExpo}</span>
                    <span className="font-display font-bold text-stone-50">{formatPrice(a.deposit)}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{t.deliveryExpoDesc}</p>
                </div>
              </button>
            )}

            {/* Visible expo list — always shown when the seller attends expos */}
            {hasExpo && (
              <div className="bg-stone-900/40 ring-1 ring-stone-800 rounded-xl p-3">
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{t.availableAtExpos}</div>
                <div className="space-y-1.5">
                  {listingExpos.map(ex => {
                    const selected = deliveryMode === "expo" && selectedExpoId === ex.id;
                    return (
                      <button key={ex.id}
                              onClick={() => { setDeliveryMode("expo"); setSelectedExpoId(ex.id); }}
                              className={`w-full text-left rounded-lg p-2.5 flex items-center gap-2.5 transition-all ${
                                selected ? "bg-amber-500/15 ring-1 ring-amber-500/40" : "bg-stone-900/60 ring-1 ring-stone-800 hover:ring-stone-700"
                              }`}>
                        <div className={`rounded px-2 py-1 text-center shrink-0 bg-gradient-to-br from-emerald-800 to-teal-700`}>
                          <div className="text-[8px] uppercase tracking-widest text-white/80 font-bold leading-none">{ex.date.split(" ")[0]}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-bold text-stone-100 leading-tight truncate">{ex.name}</div>
                          <div className="text-[10px] text-stone-500 flex items-center gap-1">
                            <MapPin size={9} />{ex.location}
                            {ex.country !== "IT" && <span className="text-[8px] uppercase font-black bg-stone-800 text-stone-400 px-1 rounded">{ex.country}</span>}
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); go("expo", ex); }}
                                className="text-stone-500 hover:text-amber-400 shrink-0 p-1">
                          <ChevronRight size={15} />
                        </button>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Neither shipping nor expo: seller set no delivery option */}
            {!canShip && !hasExpo && (
              <div className="bg-stone-900/40 ring-1 ring-stone-800 rounded-xl p-4 text-[11px] text-stone-400 flex gap-2 items-start">
                <Info size={14} className="shrink-0 mt-0.5" />{t.noExpoNoShip}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Sticky action bar — Edit for my own listing; otherwise Message + CTA. */}
      <div className="fixed md:absolute bottom-16 md:bottom-0 inset-x-0 z-30 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2">
          {isMine ? (
            <button onClick={() => go("mylistings")}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
              <SettingsIcon size={16} />{t.manageListing}
            </button>
          ) : (
            <>
              <button onClick={handleMessage}
                      className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                <MessageCircle size={16} />{t.message}
              </button>
              {a.auction ? (
                <button onClick={() => { const el = document.getElementById('auction-box'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                        className="flex-[1.4] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all bg-amber-500 hover:bg-amber-400 text-stone-950">
                  <ArrowUpDown size={16} />{t.placeBid}
                </button>
              ) : txState === "idle" && (canShip || hasExpo) ? (
                <button onClick={handleRequest}
                        className="flex-[1.4] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all bg-amber-500 hover:bg-amber-400 text-stone-950">
                  {isExpoFlow ? <><Calendar size={16} />{t.txRequestExpo}</> : <><Truck size={16} />{t.buyAndShip}</>}
                </button>
              ) : txState === "idle" ? (
                <div className="flex-[1.4] font-bold text-sm py-3 rounded-lg flex items-center justify-center bg-stone-800 text-stone-500">
                  <span className="text-xs">{lang === "it" ? "Solo via messaggio" : "Message only"}</span>
                </div>
              ) : null}
              {!a.auction && txState !== "idle" && (
                <div className="flex-[1.4] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-1.5 bg-stone-800 text-stone-400">
                  <span className="text-xs">{lang === "it" ? "Vedi stato sopra ↑" : "See status above ↑"}</span>
                </div>
              )}
            </>
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
          buyerName={saleInfo?.buyerName || user?.name || "—"}
          buyerAddress={saleInfo?.buyerAddress || ""}
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
            {/* Next steps — reduces buyer anxiety during the wait */}
            <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-lg p-3 mb-3">
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t.nextStepsTitle}</div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {isExpoFlow
                  ? (expo
                      ? t.nextStepsExpo(expo.name, expo.dateISO ? new Date(expo.dateISO).toLocaleDateString() : "")
                      : t.nextStepsExpoGeneric)
                  : t.nextStepsShipping}
              </p>
            </div>
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
function DocumentModal({ listing, requiresCITES, buyerName, buyerAddress = "", onClose, t, lang }) {
  const docTitle = requiresCITES ? t.docCitesTitle : t.docOriginTitle;
  const declaration = requiresCITES ? t.docDeclarationCites : t.docDeclarationOrigin;
  const today = new Date().toLocaleDateString(lang === "it" ? "it-IT" : "en-GB");
  // Pseudo transaction ID derived from listing
  const txId = `HM-${new Date().getFullYear()}-${String(listing.id).padStart(5, "0")}`;
  const a = listing;
  const [generating, setGenerating] = useState(false);

  // Build the PDF. Prefers the bundled jspdf (works offline — important at expos
  // with bad wifi); falls back to the CDN only if the package isn't installed.
  const downloadPdf = async () => {
    setGenerating(true);
    try {
      let jsPDF;
      try {
        // Bundled: run `npm install jspdf` so this resolves locally and works offline.
        // The /* @vite-ignore */ + variable keeps the build from failing if it's not installed yet.
        const pkg = "jspdf";
        ({ jsPDF } = await import(/* @vite-ignore */ pkg));
      } catch {
        // Fallback: load from CDN (needs a connection).
        if (!window.jspdf) {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
            s.onload = resolve; s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        jsPDF = window.jspdf.jsPDF;
      }
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const M = 20;            // margin
      const W = 210;           // A4 width
      let y = M;

      // Header
      doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(120);
      doc.text("HERPMARKET", M, y);
      y += 8;
      doc.setFontSize(17); doc.setTextColor(20);
      doc.text(docTitle, M, y);
      y += 6;
      doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(130);
      doc.text(t.docSubtitle, M, y);
      y += 4;
      doc.setDrawColor(20); doc.setLineWidth(0.5); doc.line(M, y, W - M, y);
      y += 8;

      // Meta
      doc.setFontSize(9); doc.setTextColor(90);
      doc.text(`${t.docDate}: ${today}`, M, y);
      doc.text(`${t.docId}: ${txId}`, W / 2, y);
      y += 9;

      const field = (label, value) => {
        doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(130);
        doc.text(label.toUpperCase(), M, y);
        doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(20);
        doc.text(String(value), M, y + 5);
        y += 12;
      };

      // Parties
      doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(130);
      doc.text((t.docSellerLabel).toUpperCase(), M, y);
      doc.text((t.docBuyer).toUpperCase(), W / 2, y);
      doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(20);
      doc.text(a.seller, M, y + 6);
      doc.text(buyerName, W / 2, y + 6);
      doc.setFontSize(9); doc.setTextColor(110);
      doc.text(`${a.city}, ${a.region}`, M, y + 11);
      y += 18;
      doc.setDrawColor(210); doc.setLineWidth(0.2); doc.line(M, y, W - M, y); y += 8;

      // Specimen
      field(t.docSpecies, a.species);
      field(t.docMorph, a.traits.map(tr => tr.name).join(", "));
      field(t.docSex, sexLabel(a.sex, t));
      field(t.docBirth, a.birthDate || a.born || `${a.ageMonths} ${lang === "it" ? "mesi" : "months"}`);
      field(t.origin, t.captiveBred);
      field(t.weight, a.weight);

      y += 2;
      doc.setDrawColor(210); doc.line(M, y, W - M, y); y += 8;

      // Declaration
      doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(130);
      doc.text((t.docDeclaration).toUpperCase(), M, y); y += 6;
      doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(40);
      const lines = doc.splitTextToSize(declaration, W - 2 * M);
      doc.text(lines, M, y); y += lines.length * 5 + 16;

      // Signatures
      doc.setDrawColor(20); doc.setLineWidth(0.4);
      doc.line(M, y, M + 65, y);
      doc.line(W - M - 65, y, W - M, y);
      y += 5;
      doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(130);
      doc.text((t.docSignSeller).toUpperCase(), M, y);
      doc.text((t.docSignBuyer).toUpperCase(), W - M - 65, y);

      // Footer
      doc.setFontSize(7); doc.setTextColor(160);
      doc.text(
        lang === "it" ? "Documento generato digitalmente da HerpMarket — herpmarket.it" : "Document digitally generated by HerpMarket — herpmarket.it",
        W / 2, 287, { align: "center" }
      );

      doc.save(`${requiresCITES ? "CITES" : "Origine"}_${a.species.replace(/\s+/g, "_")}_${txId}.pdf`);
    } catch (e) {
      console.error("PDF generation failed", e);
      alert(lang === "it" ? "Generazione PDF non riuscita. Riprova." : "PDF generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

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

        <div className="px-6 md:px-10 pb-4 text-[10px] text-stone-500 text-center font-bold tracking-widest uppercase">
          {lang === "it" ? "Documento generato digitalmente da HerpMarket" : "Document digitally generated by HerpMarket"}
        </div>

        {/* Download bar */}
        <div className="px-6 md:px-10 pb-7 flex gap-2">
          <button onClick={onClose}
                  className="flex-1 py-3 rounded-lg text-sm font-bold bg-stone-200 text-stone-700 hover:bg-stone-300 transition-colors">
            {lang === "it" ? "Chiudi" : "Close"}
          </button>
          <button onClick={downloadPdf} disabled={generating}
                  className="flex-[2] py-3 rounded-lg text-sm font-bold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            <FileText size={16} />
            {generating ? (lang === "it" ? "Generazione…" : "Generating…") : (lang === "it" ? "Scarica PDF" : "Download PDF")}
          </button>
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
/* Best-effort CITES (EU annex) status for the catalogue species. Used ONLY to
   PRE-TICK the breeder's "CITES-listed" checkbox as a convenience — the breeder
   can override it and stays responsible for the real status of their animal.
   ⚠ VERIFY this list against the official EU Annexes / the Species+ database
   (speciesplus.net) before launch — CITES listings change at each CoP. */
const CITES_SPECIES = new Set([
  // Geckos
  "Phelsuma grandis", "Phelsuma laticauda", "Gekko gecko",
  // Snakes
  "Python regius", "Python brongersmai", "Morelia viridis", "Morelia spilota",
  "Antaresia childreni", "Boa constrictor", "Eryx colubrinus", "Epicrates cenchria",
  // Lizards
  "Varanus acanthurus", "Varanus exanthematicus", "Salvator merianae",
  "Corucia zebrata", "Uromastyx",
  // Chameleons
  "Furcifer pardalis", "Chamaeleo calyptratus", "Trioceros jacksonii",
  "Furcifer lateralis", "Brookesia",
  // Tortoises & turtles
  "Testudo hermanni", "Testudo graeca", "Testudo marginata", "Testudo horsfieldii",
  "Centrochelys sulcata", "Geochelone elegans", "Chelonoidis carbonarius",
  "Stigmochelys pardalis", "Graptemys",
  // Amphibians
  "Dendrobates tinctorius", "Dendrobates auratus", "Phyllobates terribilis",
  "Agalychnis callidryas", "Ambystoma mexicanum",
  // Invertebrates
  "Brachypelma hamorii", "Tliltocatl albopilosus", "Poecilotheria", "Pandinus imperator",
]);

// Case-insensitive CITES check — a manually typed "testudo hermanni" must still
// trigger the legal warning, not just the exact-cased catalogue entry.
const CITES_SPECIES_LOWER = new Set([...CITES_SPECIES].map(s => s.toLowerCase()));
const isCitesSpecies = (name) => !!name && CITES_SPECIES_LOWER.has(name.trim().toLowerCase());

function SellScreen({ t, lang, go, user }) {
  const [success, setSuccess] = useState(false);
  const [createdListing, setCreatedListing] = useState(null);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [customTrait, setCustomTrait] = useState("");
  const addCustomTrait = () => {
    const v = customTrait.trim();
    if (!v) return;
    if (!selectedTraits.includes(v)) setSelectedTraits(prev => [...prev, v]);
    setCustomTrait("");
  };
  // Captured listing fields
  const [title, setTitle] = useState("");
  const [sex, setSex] = useState("M");
  const [born, setBorn] = useState("");
  const [weight, setWeight] = useState("");
  const [bornPrecision, setBornPrecision] = useState("month"); // "day" | "month" | "year"
  const [isCites, setIsCites] = useState(false);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [saleMode, setSaleMode] = useState("fixed");   // "fixed" | "auction"
  const [startPrice, setStartPrice] = useState("");
  const [reserve, setReserve] = useState("");
  const [durationDays, setDurationDays] = useState(5);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");
  // Photos (min 1, max 3). Files are uploaded to Supabase Storage on publish.
  const MAX_PHOTOS = 3;
  const [photos, setPhotos] = useState([]); // [{ file, url }]
  const [dragOver, setDragOver] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const fileInputRef = useRef(null);
  const addFiles = (fileList) => {
    const imgs = Array.from(fileList || []).filter(f => f.type.startsWith("image/"));
    if (!imgs.length) return;
    setPhotos(prev => {
      const room = MAX_PHOTOS - prev.length;
      const toAdd = imgs.slice(0, room).map(f => ({ file: f, url: URL.createObjectURL(f) }));
      return [...prev, ...toAdd];
    });
    setPhotoError(false);
  };
  const removePhoto = (idx) => {
    setPhotos(prev => {
      const p = prev[idx];
      if (p) URL.revokeObjectURL(p.url);
      return prev.filter((_, i) => i !== idx);
    });
  };
  // Revoke any remaining preview URLs when leaving the screen.
  const photosRef = useRef(photos);
  useEffect(() => { photosRef.current = photos; }, [photos]);
  useEffect(() => () => { photosRef.current.forEach(p => URL.revokeObjectURL(p.url)); }, []);
  const monthsSince = (val) => {
    const s = String(val || "").trim();
    if (!s) return null;
    let yy, mm;
    let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);    // "YYYY-MM-DD" from <input type="date">
    if (m) { yy = parseInt(m[1], 10); mm = parseInt(m[2], 10); }
    else if ((m = /^(\d{4})-(\d{1,2})$/.exec(s))) {     // "YYYY-MM" from <input type="month">
      yy = parseInt(m[1], 10); mm = parseInt(m[2], 10);
    }
    else if ((m = /^(\d{4})$/.exec(s))) {               // "YYYY" year-only
      yy = parseInt(m[1], 10); mm = 1;
    }
    else if ((m = /^(\d{1,2})[/-](\d{4})$/.exec(s))) {  // legacy "MM/YYYY"
      mm = parseInt(m[1], 10); yy = parseInt(m[2], 10);
    }
    else return null;
    if (mm < 1 || mm > 12) return null;
    const now = new Date();
    return Math.max(0, (now.getFullYear() - yy) * 12 + (now.getMonth() + 1 - mm));
  };
  const handlePublish = async () => {
    setSaveErr("");
    if (photos.length < 1) { setPhotoError(true); return; }
    if (!title.trim()) { setSaveErr(t.needTitle); return; }
    if (!catId) { setSaveErr(t.needCategory); return; }
    if (!speciesVal || speciesVal === "__other") { setSaveErr(t.needSpecies); return; }
    const isAuction = saleMode === "auction";
    const basePrice = isAuction ? Number(startPrice) : Number(price);
    if (!basePrice || basePrice <= 0) { setSaveErr(t.needPrice); return; }
    if (isAuction && reserve && Number(reserve) < basePrice) { setSaveErr(t.reserveTooLow); return; }
    if (!user?.id) { setSaveErr(t.needLoginPub); return; }
    if (!region || !region.trim()) { setSaveErr(t.needRegion); return; }
    if (isCites && !/^\d{4}-\d{1,2}-\d{1,2}$/.test((born || "").trim())) { setSaveErr(t.needFullBirth); return; }
    setSaving(true);
    try {
      const api = await import("./lib/api");
      const seller = await api.getOrCreateSeller({ id: user.id, name: user.name, email: user.email, region, country });
      // Free-tier cap: 5 listings. Pro sellers are unlimited.
      const mySeller = await api.fetchMySeller(user.id);
      if (!mySeller?.pro) {
        const count = await api.countMyListings(user.id);
        if (count >= FREE_LISTING_LIMIT) {
          setSaving(false);
          setSaveErr(t.proCapReached);
          return;
        }
      }
      const urls = await api.uploadListingPhotos(photos.map(p => p.file), user.id);
      const traits = selectedTraits.map(n => {
        const e = exampleTraits.find(x => x.name === n);
        return { name: n, cls: e?.cls || "line" };
      });
      const common = SPECIES_LABELS[speciesVal]?.it || speciesVal;
      const headline = title.trim();
      let auction = null;
      if (isAuction) {
        const days = Number(durationDays) || 5;
        auction = {
          startPrice: basePrice,
          reservePrice: reserve ? Number(reserve) : null,
          currentBid: basePrice,
          bidCount: 0,
          endsAt: new Date(Date.now() + days * 86400000).toISOString(),
          highBidder: null,
        };
      }
      const created = await api.createListing({
        species: speciesVal, common, title: headline, category: catId,
        traits, price: basePrice, deposit: Math.round(basePrice * 0.1),
        sex, ageMonths: monthsSince(born), weight: weight.trim() || null,
        birthDate: (born || "").trim() || null,
        citesListed: isCites,
        country, region, city: null,
        sire: null, dam: null, desc,
        image: urls[0] || null, images: urls,
        shipping: false, euShipping: false, localPickup: true,
        expoIds: [], auction,
      }, seller.id);
      setCreatedListing(created);
      setSuccess(true);
    } catch (err) {
      setSaveErr(err?.message || "Error");
    } finally {
      setSaving(false);
    }
  };
  // Cascading category → subcategory → species
  const [catId, setCatId] = useState("");
  const [subcatId, setSubcatId] = useState("");
  const [speciesVal, setSpeciesVal] = useState("");
  // Country → region
  const [country, setCountry] = useState("IT");
  const [region, setRegion] = useState("");   // empty until chosen/prefilled — prevents silent wrong default

  // Pre-fill location from the breeder's saved store profile (they can still change it).
  useEffect(() => {
    if (!user?.id) return;
    let on = true;
    import("./lib/api").then(api => api.fetchMySeller(user.id)).then(s => {
      if (!on || !s) return;
      if (s.country) setCountry(s.country);
      if (s.region) setRegion(s.region);
    }).catch(() => {});
    return () => { on = false; };
  }, [user?.id]);

  // Reset chosen traits when the category or species changes (list is species-specific now).
  useEffect(() => { setSelectedTraits([]); }, [catId, speciesVal]);

  // Pre-tick CITES (and force a full birth date) when the chosen species is on our list.
  useEffect(() => {
    const c = isCitesSpecies(speciesVal);
    setIsCites(c);
    if (c) setBornPrecision("day");
  }, [speciesVal]);

  const subcats = catId ? subcatsFor(catId) : [];
  const speciesOptions = (catId && subcatId) ? speciesForSubcat(catId, subcatId) : [];
  // Traits/morphs vary hugely by animal, so offer a relevant set per category.
  // "line" = line-bred/colour trait, "recessive"/"incDom"/"dom" = inheritance,
  // "wild" = wild type. Best-effort hobby lists; breeders can also free-type.
  // Species-aware traits: a chosen species shows its own morphs; otherwise the
  // category's generic set. Same source the search filter uses, so they match.
  const exampleTraits = getTraitsForScope(catId, speciesVal);

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="w-16 h-16 bg-emerald-500/15 ring-1 ring-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-5">
          <CheckCircle size={32} />
        </div>
        <h2 className="font-display text-2xl text-stone-50">{lang === "it" ? "Annuncio pubblicato" : "Listing published"}</h2>
        <p className="text-stone-400 text-sm mt-1.5">{lang === "it" ? "Sarà visibile agli acquirenti entro pochi minuti." : "It'll be visible to buyers within a few minutes."}</p>
        <div className="flex flex-col gap-2 mt-6 w-full max-w-[260px]">
          {createdListing && (
            <button onClick={() => { setSuccess(false); go("detail", createdListing); }}
                    className="px-6 py-3 bg-amber-500 text-stone-950 font-bold text-sm rounded-lg hover:bg-amber-400 transition-colors">
              {t.viewMyListing}
            </button>
          )}
          <button onClick={() => { setSuccess(false); go("home"); }}
                  className={`px-6 py-3 font-bold text-sm rounded-lg transition-colors ${createdListing ? "ring-1 ring-stone-700 text-stone-300 hover:text-stone-100" : "bg-amber-500 text-stone-950 hover:bg-amber-400"}`}>
            {t.backToBrowse}
          </button>
        </div>
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
        {/* Photos — drag & drop or pick from device, min 1 / max 3 */}
        <FormBlock>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
                 onChange={e => { addFiles(e.target.files); e.target.value = ""; }} />
          <div className="flex flex-wrap gap-3">
            {photos.map((p, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden ring-1 ring-stone-700 group">
                <img src={p.url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-stone-950/80 text-stone-200 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <button type="button"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                      className={`w-24 h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 transition-colors ${dragOver ? "border-amber-500 text-amber-400 bg-amber-500/5" : "border-stone-700 hover:border-amber-500/60 text-stone-400 hover:text-amber-400"}`}>
                <Camera size={22} />
                <span className="text-[10px] font-bold">{photos.length}/{MAX_PHOTOS}</span>
              </button>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-2 flex items-center gap-1.5">
            {photos.length >= 1 && <CheckCircle size={12} className="text-emerald-400" />}
            {t.uploadPhotos} · {t.photoHint}
          </p>
          {photoError && <p className="text-xs text-red-400 mt-1">{t.photoNeed}</p>}
        </FormBlock>

        <FormBlock label={t.listingTitle} required done={!!title.trim()}>
          <input className="form-input" value={title} onChange={e => setTitle(e.target.value)}
                 placeholder={lang === "it" ? "es. Geco crestato Lilly White femmina" : "e.g. Lilly White female crested gecko"} />
        </FormBlock>

        {/* Category → Subcategory → Species cascade */}
        <div className="grid grid-cols-1 gap-3">
          <FormBlock label={t.category} required done={!!catId}>
            <select className="form-input" value={catId}
                    onChange={e => { setCatId(e.target.value); setSubcatId(""); setSpeciesVal(""); }}>
              <option value="">{lang === "it" ? "Scegli categoria" : "Choose category"}</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c[lang]}</option>)}
            </select>
          </FormBlock>

          {catId && (
            <FormBlock label={lang === "it" ? "Sottocategoria" : "Subcategory"}>
              <select className="form-input" value={subcatId}
                      onChange={e => { setSubcatId(e.target.value); setSpeciesVal(""); }}>
                <option value="">{lang === "it" ? "Scegli sottocategoria" : "Choose subcategory"}</option>
                {subcats.map(sc => <option key={sc.id} value={sc.id}>{sc[lang]}</option>)}
              </select>
            </FormBlock>
          )}

          {subcatId && (
            <FormBlock label={t.species} required done={!!speciesVal && speciesVal !== "__other"}>
              {speciesOptions.length > 0 ? (
                <>
                  <select className="form-input"
                          value={speciesOptions.includes(speciesVal) ? speciesVal : (speciesVal === "" ? "" : "__other")}
                          onChange={e => setSpeciesVal(e.target.value)}>
                    <option value="">{t.pickSpecies}</option>
                    {speciesOptions.map(sp => (
                      <option key={sp} value={sp}>{SPECIES_LABELS[sp]?.[lang] || sp} — {sp}</option>
                    ))}
                    <option value="__other">{lang === "it" ? "Altro / non in elenco…" : "Other / not listed…"}</option>
                  </select>
                  {/* When "Other" is chosen, let them type the scientific name. */}
                  {speciesVal !== "" && !speciesOptions.includes(speciesVal) && (
                    <input className="form-input mt-2" autoFocus
                           placeholder={lang === "it" ? "Nome scientifico della specie" : "Species scientific name"}
                           value={speciesVal === "__other" ? "" : speciesVal}
                           onChange={e => setSpeciesVal(e.target.value)} />
                  )}
                </>
              ) : (
                <input className="form-input" placeholder={lang === "it" ? "Nome scientifico della specie" : "Species scientific name"}
                       value={speciesVal === "__other" ? "" : speciesVal} onChange={e => setSpeciesVal(e.target.value)} />
              )}
              <p className="text-[10px] text-stone-500 mt-1.5">
                {lang === "it" ? "Non trovi la specie? Scrivila a mano — la aggiungeremo al catalogo." : "Species not listed? Type it in — we'll add it to the catalogue."}
              </p>
            </FormBlock>
          )}

          <FormBlock label={t.sex}>
            <select className="form-input" value={sex} onChange={e => setSex(e.target.value)}>
              <option value="M">{t.male}</option><option value="F">{t.female}</option><option value="P">{t.pair}</option><option value="U">{t.unsexed}</option>
            </select>
          </FormBlock>
        </div>

        <FormBlock label={t.traits}>
          <div className="flex flex-wrap gap-1.5">
            {/* Preset chips for the category + any custom traits the user added */}
            {[...exampleTraits, ...selectedTraits.filter(n => !exampleTraits.some(e => e.name === n)).map(n => ({ name: n, cls: "line" }))].map((tr, i) => {
              const isSelected = selectedTraits.includes(tr.name);
              return (
                <button key={tr.name + i} type="button"
                        onClick={() => setSelectedTraits(isSelected ? selectedTraits.filter(s => s !== tr.name) : [...selectedTraits, tr.name])}
                        className="transition-transform hover:scale-105">
                  <span className={isSelected ? "" : "opacity-40"}><TraitChip trait={tr} size="sm" /></span>
                </button>
              );
            })}
          </div>
          {/* Add a trait that isn't listed — it's saved with the listing. */}
          <div className="flex gap-2 mt-2.5">
            <input value={customTrait} onChange={e => setCustomTrait(e.target.value)}
                   onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCustomTrait(); } }}
                   placeholder={lang === "it" ? "Aggiungi un'altra morph…" : "Add another morph…"}
                   className="form-input flex-1" />
            <button type="button" onClick={addCustomTrait}
                    className="px-4 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors shrink-0">
              {lang === "it" ? "Aggiungi" : "Add"}
            </button>
          </div>
          <p className="text-[10px] text-stone-500 mt-2">{t.pickTraits}</p>
        </FormBlock>

        {/* Sale type: fixed price or auction */}
        <SellPricing t={t} lang={lang} price={price} setPrice={setPrice}
                     mode={saleMode} setMode={setSaleMode}
                     startPrice={startPrice} setStartPrice={setStartPrice}
                     reserve={reserve} setReserve={setReserve}
                     durationDays={durationDays} setDurationDays={setDurationDays}
                     done={saleMode === "auction" ? Number(startPrice) > 0 : Number(price) > 0} />

        <FormBlock label={t.born} required={isCites} done={!!born && (!isCites || /^\d{4}-\d{1,2}-\d{1,2}$/.test(born.trim()))}>
          {/* Precision chooser — some breeders only know the year or month. */}
          <div className="flex bg-stone-900 ring-1 ring-stone-800 rounded-lg p-1 mb-2">
            {[
              ["day",   lang === "it" ? "Data esatta" : "Exact date"],
              ["month", lang === "it" ? "Mese e anno" : "Month & year"],
              ["year",  lang === "it" ? "Solo anno" : "Year only"],
            ].map(([key, label]) => {
              const locked = isCites && key !== "day";
              return (
                <button type="button" key={key} disabled={locked}
                        onClick={() => { setBornPrecision(key); setBorn(""); }}
                        className={`flex-1 py-2 rounded-md text-xs font-bold transition-colors ${
                          bornPrecision === key ? "bg-amber-500 text-stone-950"
                          : locked ? "text-stone-700 cursor-not-allowed"
                          : "text-stone-400 hover:text-stone-200"
                        }`}>
                  {label}
                </button>
              );
            })}
          </div>
          {bornPrecision === "day" && (
            <input type="date" className="form-input" value={born} onChange={e => setBorn(e.target.value)}
                   max={new Date().toISOString().slice(0, 10)} style={{ colorScheme: "dark" }} />
          )}
          {bornPrecision === "month" && (
            <input type="month" className="form-input" value={born} onChange={e => setBorn(e.target.value)}
                   max={new Date().toISOString().slice(0, 7)} style={{ colorScheme: "dark" }} />
          )}
          {bornPrecision === "year" && (
            <input type="number" className="form-input" value={born} onChange={e => setBorn(e.target.value)}
                   min="1980" max={new Date().getFullYear()} placeholder={String(new Date().getFullYear())} />
          )}
        </FormBlock>

        <FormBlock label={t.weight}>
          <input className="form-input" value={weight} onChange={e => setWeight(e.target.value)}
                 placeholder={lang === "it" ? "es. 38g (facoltativo)" : "e.g. 38g (optional)"} />
        </FormBlock>

        {/* CITES self-declaration. Pre-ticked from our best-effort list when the
            species is selected; the breeder can override and remains responsible. */}
        <div className={`rounded-xl ring-1 transition-all p-4 ${isCites ? "bg-amber-500/5 ring-amber-500/30" : "bg-stone-900/40 ring-stone-800"}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={isCites}
                   onChange={() => { const v = !isCites; setIsCites(v); if (v) { setBornPrecision("day"); setBorn(""); } }}
                   className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <FileText size={15} className={isCites ? "text-amber-400" : "text-stone-400"} />
                <span className="font-bold text-stone-100 text-sm">{t.citesCheckLabel}</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">{t.citesCheckHint}</p>
            </div>
          </label>
        </div>

        {/* Country → region cascade */}
        <div className="grid grid-cols-2 gap-3">
          <FormBlock label={t.countryLabel}>
            <select className="form-input" value={country}
                    onChange={e => { setCountry(e.target.value); setRegion(""); }}>
              {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c[lang]}</option>)}
            </select>
          </FormBlock>
          <FormBlock label={t.region} required done={!!region && !!region.trim()}>
            {regionsForCountry(country).length > 0 ? (
              <select className="form-input" value={region} onChange={e => setRegion(e.target.value)}>
                <option value="">{t.chooseRegion}</option>
                {regionsForCountry(country).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            ) : (
              <input className="form-input" value={region} onChange={e => setRegion(e.target.value)}
                     placeholder={lang === "it" ? "Regione / provincia" : "Region / province"} />
            )}
          </FormBlock>
        </div>

        <FormBlock label={t.description}>
          <textarea rows="4" value={desc} onChange={e => setDesc(e.target.value)} placeholder={t.describePlaceholder} className="form-input resize-none" />
        </FormBlock>

        {/* ─── Delivery options ─── */}
        <DeliverySection lang={lang} t={t} itemPrice={Number(mode === "auction" ? startPrice : price) || 0} />

        {/* Terms acceptance — marketplace rules confirmed at point of listing */}
        <label className="flex items-start gap-3 bg-stone-900/40 ring-1 ring-stone-800 rounded-xl p-4 cursor-pointer">
          <input type="checkbox" checked={tosAccepted} onChange={() => setTosAccepted(!tosAccepted)}
                 className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0" />
          <span className="text-[12px] text-stone-300 leading-relaxed">
            {lang === "it" ? "Ho letto e accetto i " : "I have read and accept the "}
            <button type="button" onClick={(e) => { e.preventDefault(); go("terms"); }} className="text-amber-400 underline font-bold">
              {t.termsLegal}
            </button>
            {lang === "it"
              ? ", in particolare le regole per i venditori, e confermo di essere il legittimo detentore di questo animale."
              : ", in particular the seller rules, and confirm I am the lawful keeper of this animal."}
          </span>
        </label>

        {saveErr && (
          <p className="text-xs text-rose-400 font-bold flex items-center gap-1.5 mt-2"><Info size={12} />{saveErr}</p>
        )}
        <button onClick={handlePublish} disabled={saving || !tosAccepted}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold py-3.5 rounded-lg text-sm transition-colors mt-4 inline-flex items-center justify-center gap-2">
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? (photos.length > 0 ? t.uploadingPhotos : t.publishing) : t.publishListing}
        </button>
        {saving && photos.length > 0 && (
          <p className="text-[11px] text-stone-500 text-center mt-2">{t.uploadingHint}</p>
        )}

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

function FormBlock({ label, children, done, required, t }) {
  return (
    <div>
      {label && (
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{label}</span>
          {required && !done && (
            <span className="text-stone-600 text-[9px] font-bold uppercase tracking-wider">· {t?.fieldRequired || "required"}</span>
          )}
          {done && <CheckCircle size={12} className="text-emerald-400" />}
        </div>
      )}
      {children}
    </div>
  );
}

/* SELL PRICING — toggle between a fixed price and an auction.
   Auction collects: start price (public) + reserve price (hidden floor) +
   duration. The reserve is never shown to buyers — only "reserve met / not". */
function SellPricing({ t, lang, price, setPrice, mode, setMode, startPrice, setStartPrice, reserve, setReserve, durationDays, setDurationDays, done }) {
  return (
    <FormBlock label={lang === "it" ? "Tipo di vendita" : "Sale type"} required done={done}>
      <div className="flex bg-stone-900 ring-1 ring-stone-800 rounded-lg p-1 mb-3">
        <button type="button" onClick={() => setMode("fixed")}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-colors ${
                  mode === "fixed" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
                }`}>
          {lang === "it" ? "Prezzo fisso" : "Fixed price"}
        </button>
        <button type="button" onClick={() => setMode("auction")}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 ${
                  mode === "auction" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
                }`}>
          <ArrowUpDown size={12} />{t.auction}
        </button>
      </div>

      {mode === "fixed" ? (
        <div className="flex items-center gap-2">
          <span className="text-stone-400 text-sm shrink-0">€</span>
          <input type="number" min="0" className="form-input flex-1" placeholder="150" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t.startPrice}</div>
              <div className="flex items-center gap-2">
                <span className="text-stone-400 text-sm shrink-0">€</span>
                <input type="number" min="0" className="form-input flex-1" placeholder="100" value={startPrice} onChange={e => setStartPrice(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Lock size={10} />{lang === "it" ? "Riserva" : "Reserve"}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-400 text-sm shrink-0">€</span>
                <input type="number" min="0" className="form-input flex-1" placeholder="200" value={reserve} onChange={e => setReserve(e.target.value)} />
              </div>
              {reserve && startPrice && Number(reserve) < Number(startPrice) && (
                <p className="text-[10px] text-rose-400 font-bold mt-1.5 flex items-center gap-1"><Info size={11} />{t.reserveTooLow}</p>
              )}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{lang === "it" ? "Durata" : "Duration"}</div>
            <select className="form-input" value={durationDays} onChange={e => setDurationDays(Number(e.target.value))}>
              <option value={3}>{lang === "it" ? "3 giorni" : "3 days"}</option>
              <option value={5}>{lang === "it" ? "5 giorni" : "5 days"}</option>
              <option value={7}>{lang === "it" ? "7 giorni" : "7 days"}</option>
              <option value={10}>{lang === "it" ? "10 giorni" : "10 days"}</option>
            </select>
          </div>
          <div className="bg-amber-500/5 ring-1 ring-amber-500/20 rounded-lg p-3 flex gap-2 items-start">
            <Lock size={13} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-200/80 leading-relaxed">
              {lang === "it"
                ? "Il prezzo di riserva è il minimo che accetti e resta nascosto agli acquirenti. Se le offerte non lo raggiungono, non sei obbligato a vendere."
                : "The reserve price is the minimum you'll accept and stays hidden from buyers. If bids don't reach it, you're not obliged to sell."}
            </p>
          </div>
        </div>
      )}
    </FormBlock>
  );
}

/* DELIVERY SECTION — three independent toggles.
   Expo pickup is positioned as HerpMarket's signature feature: amber accent,
   highlighted card, deposit explanation; all upcoming expos available
   as multi-select chips with date right on the chip.                       */
function DeliverySection({ lang, t, itemPrice = 0 }) {
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
                  ? "Acconto 10% al momento della prenotazione, animale bloccato fino al ritiro al tuo stand. Maggiore protezione per acquirente e venditore."
                  : "10% deposit at booking, animal reserved until pickup at your stand. Better protection for both parties."}
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
                    <button key={expo.id} type="button" aria-label={expo.name}
                            aria-pressed={isSel}
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
                <div className="flex items-center gap-2 max-w-[160px]">
                  <span className="text-stone-400 text-sm shrink-0">€</span>
                  <input type="number" min="0" value={shippingCost} onChange={e => setShippingCost(e.target.value)}
                         className="form-input flex-1" placeholder="45" />
                </div>
                {itemPrice > 0 && Number(shippingCost) > itemPrice * 0.5 && (
                  <p className="text-[11px] text-amber-400 font-bold mt-2 flex items-center gap-1.5">
                    <Info size={12} className="shrink-0" />{t.shippingHighWarn}
                  </p>
                )}
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
function ChatList({ t, go, user }) {
  const [threads, setThreads] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (!user?.id) return;
    let on = true;
    import("./lib/api").then(api => api.fetchMyThreads(user.id))
      .then(rows => { if (on) setThreads(rows); })
      .catch(e => { if (on) { setErr(e?.message || "Error"); setThreads([]); } });
    return () => { on = false; };
  }, [user?.id]);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800">
        <h1 className="font-display text-2xl md:text-3xl text-stone-50 tracking-tight">{t.chat}</h1>
      </header>
      <div className="p-3 md:p-5 space-y-1">
        {err && <p className="text-xs text-rose-400 px-3 py-2">{err}</p>}
        {threads === null ? (
          <p className="text-center text-stone-600 text-sm py-16 italic">…</p>
        ) : threads.length === 0 ? (
          <div className="text-center py-16 text-stone-500">
            <MessageCircle size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-display italic">{t.chatNoThreads}</p>
          </div>
        ) : threads.map(thr => (
          <button key={thr.id} onClick={() => go("thread", thr)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-stone-900/60 transition-colors text-left">
            <div className="relative shrink-0">
              <img src={thr.listing?.image} alt="" loading="lazy"
                   onError={(e) => { e.target.onerror = null; e.target.src = fallback(t.realPhoto); }}
                   className="w-12 h-12 rounded-lg object-cover" />
              {thr.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{thr.unread}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-sm text-stone-100 truncate">
                  {thr.iAmSeller ? (thr.buyerName || t.chatBuyer) : (thr.listing?.seller || t.chatSeller)}
                </div>
                <div className="text-[10px] text-stone-500 font-medium shrink-0 ml-2">{relTime(thr.lastAt, t)}</div>
              </div>
              <div className="text-xs text-stone-400 truncate">{thr.lastMsg || t.chatEmpty}</div>
              <div className="text-[10px] text-amber-400 font-bold mt-0.5 truncate italic font-display">{thr.listing?.common}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatThread({ chat, t, lang, go, user }) {
  const target = chat?.listing || {};
  const [threadId, setThreadId] = useState(chat?.id && chat.id !== 99 ? chat.id : null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const scrollRef = useRef(null);

  // Resolve (or create) the real thread for this listing, then load its messages.
  useEffect(() => {
    if (!user?.id) return;
    let on = true;
    (async () => {
      try {
        const api = await import("./lib/api");
        let tid = threadId;
        if (!tid) {
          // Need the seller_id of this listing to open a thread.
          const sellerId = target.sellerId || target.seller_id;
          if (!sellerId || !target.id) { if (on) { setErr(t.chatNoThread); setLoading(false); } return; }
          const thread = await api.getOrCreateThread(target.id, sellerId, user.id);
          tid = thread.id;
          if (on) setThreadId(tid);
        }
        const msgs = await api.fetchMessages(tid);
        if (on) { setMessages(msgs); setLoading(false); }
      } catch (e) { if (on) { setErr(e?.message || "Error"); setLoading(false); } }
    })();
    return () => { on = false; };
  }, [user?.id]);

  // Live updates: append new messages as they arrive.
  useEffect(() => {
    if (!threadId) return;
    let unsub = null;
    let cancelled = false;
    (async () => {
      const api = await import("./lib/api");
      if (cancelled) return;
      unsub = api.subscribeMessages(threadId, (m) => {
        setMessages(prev => prev.some(x => x.id === m.id) ? prev : [...prev, m]);
      });
      if (cancelled && unsub) unsub();
    })();
    return () => { cancelled = true; if (unsub) unsub(); };
  }, [threadId]);

  // Auto-scroll to newest.
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages]);

  const send = async () => {
    const body = input.trim();
    if (!body || !threadId || !user?.id) return;
    setInput("");
    // Optimistic add; real row arrives via subscription (dedup by id).
    const optimistic = { id: `tmp-${Date.now()}`, sender_id: user.id, body, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, optimistic]);
    try {
      const api = await import("./lib/api");
      const saved = await api.sendMessage(threadId, user.id, body);
      setMessages(prev => prev.map(m => m.id === optimistic.id ? saved : m));
    } catch (e) {
      setErr(e?.message || "Error");
      setMessages(prev => prev.filter(m => m.id !== optimistic.id)); // roll back
      // Only restore the failed text if the user hasn't started typing again,
      // so we never overwrite a new message in progress.
      setInput(prev => prev ? prev : body);
    }
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
          <div className="font-bold text-sm text-stone-100 truncate">{chat?.iAmSeller ? t.chatBuyer : (target.seller || t.chatSeller)}</div>
          <div className="text-[10px] text-stone-500 font-medium truncate font-display italic">{target.common}</div>
        </div>
        <button onClick={() => go("detail", target)}
                className="text-[10px] font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300">
          {formatPrice(target.price)}
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-3">
        {loading ? (
          <p className="text-center text-stone-600 text-sm py-10 italic">…</p>
        ) : err ? (
          <p className="text-center text-rose-400 text-xs py-10">{err}</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-stone-600 text-xs py-10 italic">{t.chatEmpty}</p>
        ) : messages.map((m) => {
          const mine = m.sender_id === user?.id;
          const senderName = mine ? t.chatYou : (chat?.iAmSeller ? (chat?.buyerName || t.chatBuyer) : (target.seller || t.chatSeller));
          return (
            <div key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
              <span className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mb-0.5 px-1">{senderName}</span>
              <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                mine ? "bg-amber-500 text-stone-950 rounded-tr-sm" : "bg-stone-800 text-stone-100 rounded-tl-sm"
              }`}>
                {m.body}
              </div>
              {mine && (
                <span className="text-[9px] text-stone-500 mt-0.5 px-1 flex items-center gap-1">
                  {String(m.id).startsWith("tmp-")
                    ? <>{t.msgSending}</>
                    : <><Check size={10} className="text-stone-400" />{t.msgSent}</>}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-stone-800 flex gap-2 bg-stone-950">
        <input value={input} onChange={e => setInput(e.target.value)}
               onKeyDown={e => e.key === "Enter" && send()}
               placeholder={t.typeMessage} disabled={!threadId}
               className="flex-1 bg-stone-900 ring-1 ring-stone-800 rounded-full px-4 py-2.5 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all disabled:opacity-50" />
        <button onClick={send} disabled={!threadId}
                className="bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 text-stone-950 p-2.5 rounded-full transition-colors">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROFILE — grouped sections, logout, user info from auth state
   ═════════════════════════════════════════════════════════════════ */
function Profile({ t, go, lang, user, handleLogout, favorites }) {
  return (
    <div className="max-w-2xl mx-auto w-full pb-10">
      <header className="px-5 md:px-8 pt-8 pb-6 border-b border-stone-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display text-2xl text-stone-50 font-bold">
            {user?.name ? initialsOf(user.name) : "AP"}
          </div>
          <div>
            <h1 className="font-display text-2xl text-stone-50 tracking-tight flex items-center gap-2">
              {user?.name || "Anita Pioch"} {user?.verified && <ShieldCheck size={16} className="text-sky-400" />}
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">{t.verifiedBreeder} · {user?.region || "Piemonte"}</p>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6">
        {/* GROUP 1: Breeding Management */}
        <ProfileGroup label={t.breedingMgmt}>
          <ProfileRow icon={<Heart size={18} />} label={t.wishlist} sub={String((favorites || []).length)} onClick={() => go("wishlist")} />
          <ProfileRow icon={<PackageCheck size={18} />} label={t.myListings} onClick={() => go("mylistings")} />
          <ProfileRow icon={<Camera size={18} />} label={t.spTitle} onClick={() => go("editstore")} />
          <ProfileRow icon={<GitBranch size={18} />} label={t.geneticsBreeding} badge="SOON" onClick={() => go("breeding")} />
          <ProfileRow icon={<Star size={18} />} label={t.reviews} onClick={() => go("reviews")} />
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
          <ProfileRow icon={<Lock size={18} />} label={t.privacyLabel} onClick={() => go("privacy")} />
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
        {user?.id && <DeleteAccountButton t={t} user={user} go={go} />}
      </div>
    </div>
  );
}

function DeleteAccountButton({ t, user, go }) {
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const del = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const api = await import("./lib/api");
      await api.requestAccountDeletion(user.id);
    } catch (e) { /* listener will still sign out */ }
    setBusy(false);
    go("home");
  };
  if (!confirm) {
    return (
      <button onClick={() => setConfirm(true)}
              className="w-full mt-1 py-2 text-[11px] text-stone-600 hover:text-rose-400 transition-colors">
        {t.deleteAccount}
      </button>
    );
  }
  return (
    <div className="mt-2 rounded-lg ring-1 ring-rose-500/30 bg-rose-500/5 p-3 text-center">
      <p className="text-[11px] text-stone-300 mb-2">{t.deleteAccountWarn}</p>
      <div className="flex gap-2">
        <button onClick={del} disabled={busy}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold bg-rose-500 hover:bg-rose-400 disabled:bg-stone-700 text-white transition-colors">
          {busy ? t.processing : t.confirmDelete}
        </button>
        <button onClick={() => setConfirm(false)}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold ring-1 ring-stone-700 text-stone-300 hover:text-stone-100 transition-colors">
          {t.keepAccount}
        </button>
      </div>
    </div>
  );
}

function ProfileGroup({ label, children }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 px-1">{label}</div>
      <div className="space-y-1">{children}</div>    </div>
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

/* ═══════════════════════════════════════════════════════════════════
   MY LISTINGS — the breeder's own published listings.
   Edit price/description inline; delete with confirm. RLS guarantees
   only the owner can change their rows.
   ═════════════════════════════════════════════════════════════════ */
/* The two-path "mark as sold" form: sold to an app user, or to a walk-in. */
function MarkSoldPanel({ listing, t, lang, busy, onCancel, onConfirm, user }) {
  const [mode, setMode] = useState("walkin");   // "app" | "walkin"
  const [inquirers, setInquirers] = useState([]);
  const [buyerId, setBuyerId] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");

  useEffect(() => {
    let on = true;
    import("./lib/api").then(api => api.fetchListingInquirers(listing.id))
      .then(list => { if (on) setInquirers(list); }).catch(() => {});
    return () => { on = false; };
  }, [listing.id]);

  const canConfirm = mode === "app" ? !!buyerId : !!buyerName.trim();
  const submit = () => {
    if (mode === "app") {
      const chosen = inquirers.find(i => i.id === buyerId);
      onConfirm({ channel: "app", buyerId, buyerName: chosen?.name || null });
    } else {
      onConfirm({ channel: "cash_expo", buyerName: buyerName.trim(), buyerAddress: buyerAddress.trim() });
    }
  };

  return (
    <div className="border-t border-stone-800 p-3.5 bg-emerald-500/5 space-y-3">
      <div className="text-[11px] font-bold text-stone-200">{t.markSoldTitle}</div>

      {/* Path toggle */}
      <div className="flex bg-stone-900 ring-1 ring-stone-800 rounded-lg p-1">
        <button onClick={() => setMode("walkin")}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition-colors ${mode === "walkin" ? "bg-amber-500 text-stone-950" : "text-stone-400"}`}>
          {t.soldWalkin}
        </button>
        <button onClick={() => setMode("app")}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition-colors ${mode === "app" ? "bg-amber-500 text-stone-950" : "text-stone-400"}`}>
          {t.soldAppUser}
        </button>
      </div>

      {mode === "app" ? (
        inquirers.length > 0 ? (
          <select className="form-input" value={buyerId} onChange={e => setBuyerId(e.target.value)}>
            <option value="">{t.soldPickBuyer}</option>
            {inquirers.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        ) : (
          <p className="text-[11px] text-stone-500 italic">{t.soldNoInquirers}</p>
        )
      ) : (
        <div className="space-y-2">
          <input className="form-input" value={buyerName} onChange={e => setBuyerName(e.target.value)} placeholder={t.soldBuyerName} />
          <input className="form-input" value={buyerAddress} onChange={e => setBuyerAddress(e.target.value)} placeholder={t.soldBuyerAddress} />
          {listing.citesListed && <p className="text-[10px] text-amber-300/80">{t.soldCitesNote}</p>}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={submit} disabled={!canConfirm || busy}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold bg-emerald-500 hover:bg-emerald-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 transition-colors">
          {busy ? t.processing : t.confirmSold}
        </button>
        <button onClick={onCancel}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold ring-1 ring-stone-700 text-stone-300 hover:text-stone-100 transition-colors">
          {t.deleteCancel}
        </button>
      </div>
    </div>
  );
}

/* Panel to move a held/breeder animal to "for sale": add price + delivery.
   Reuses updateListing with status=active. Keeps it light — no auction here
   (that's a full sell-form thing); just price, expo pickups and shipping. */
function RelistPanel({ listing, t, lang, busy, onCancel, onConfirm }) {
  const [price, setPrice] = useState(listing.price ? String(listing.price) : "");
  const [shipping, setShipping] = useState(!!listing.shipping);
  const [expoIds, setExpoIds] = useState(listing.expoIds || []);
  const [err, setErr] = useState("");
  const upcoming = getUpcomingExpos();
  const monthShort = lang === "it"
    ? ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"]
    : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const toggleExpo = (id) => setExpoIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const submit = () => {
    const p = Number(price);
    if (!p || p <= 0) { setErr(t.needPrice); return; }
    onConfirm({ price: p, deposit: Math.round(p * 0.1), shipping, localPickup: true, expoIds, status: "active" });
  };

  return (
    <div className="border-t border-stone-800 p-3.5 bg-amber-500/5 space-y-3">
      <div className="text-[11px] font-bold text-stone-200">{t.relistTitle}</div>

      <div>
        <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t.price}</div>
        <div className="flex items-center gap-2 max-w-[160px]">
          <span className="text-stone-400 text-sm shrink-0">€</span>
          <input type="number" min="0" className="form-input flex-1" value={price} onChange={e => setPrice(e.target.value)} placeholder="150" />
        </div>
      </div>

      <label className="flex items-center justify-between bg-stone-900/60 ring-1 ring-stone-800 rounded-lg px-3 py-2.5 cursor-pointer">
        <span className="text-xs text-stone-200 font-medium flex items-center gap-2"><Truck size={14} className="text-stone-400" />{t.deliveryShip}</span>
        <input type="checkbox" checked={shipping} onChange={() => setShipping(!shipping)} className="w-4 h-4 rounded accent-amber-500 cursor-pointer" />
      </label>

      <div>
        <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t.availableAtExpos}</div>
        <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto hide-scrollbar">
          {upcoming.map(expo => {
            const sel = expoIds.includes(expo.id);
            const dd = expo.dateISO.slice(8, 10);
            const mm = monthShort[parseInt(expo.dateISO.slice(5, 7), 10) - 1];
            return (
              <button key={expo.id} type="button" aria-label={expo.name} aria-pressed={sel} onClick={() => toggleExpo(expo.id)}
                      className={`text-left rounded-lg ring-1 px-2.5 py-1.5 flex items-center gap-2 transition-all ${sel ? "bg-amber-500/15 ring-amber-500/40" : "bg-stone-900/60 ring-stone-800"}`}>
                <span className="text-[10px] font-bold text-stone-400 shrink-0 min-w-[34px]">{mm} {dd}</span>
                <span className={`text-[11px] truncate flex-1 ${sel ? "text-amber-100" : "text-stone-300"}`}>{expo.name}</span>
                {sel && <Check size={13} className="text-amber-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {err && <p className="text-[11px] text-rose-400 font-bold">{err}</p>}
      <div className="flex gap-2">
        <button onClick={submit} disabled={busy}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 transition-colors">
          {busy ? t.processing : t.relistConfirm}
        </button>
        <button onClick={onCancel}
                className="flex-1 py-2 rounded-lg text-[11px] font-bold ring-1 ring-stone-700 text-stone-300 hover:text-stone-100 transition-colors">
          {t.deleteCancel}
        </button>
      </div>
    </div>
  );
}

function MyListingsScreen({ t, lang, go, user }) {
  const [items, setItems] = useState(null);   // null = loading
  const [tab, setTab] = useState("active");   // active | sold | held | breeder
  const [editId, setEditId] = useState(null);
  const [ePrice, setEPrice] = useState("");
  const [eDesc, setEDesc] = useState("");
  const [removeFor, setRemoveFor] = useState(null);  // listing whose "remove from sale" panel is open
  const [relistFor, setRelistFor] = useState(null);  // held/breeder animal being listed for sale
  const [soldFor, setSoldFor] = useState(null);   // listing being marked sold (opens modal)
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const doRelist = async (id, fields) => {
    setBusy(true); setErr("");
    try {
      const api = await import("./lib/api");
      await api.updateListing(id, fields);
      setRelistFor(null); load();
    } catch (e) { setErr(e?.message || "Error"); }
    finally { setBusy(false); }
  };

  const changeStatus = async (id, status) => {
    setBusy(true); setErr("");
    try {
      const api = await import("./lib/api");
      await api.updateListingStatus(id, status);
      setRemoveFor(null); load();
    } catch (e) { setErr(e?.message || "Error"); }
    finally { setBusy(false); }
  };

  const doMarkSold = async (listing, payload) => {
    setBusy(true); setErr("");
    try {
      const api = await import("./lib/api");
      const seller = await api.fetchMySeller(user.id);
      await api.markListingSold({
        sellerId: seller.id,
        listingId: listing.id,
        sellerCountry: seller.country,
        citesListed: listing.citesListed,
        amount: listing.price,
        ...payload,
      });
      setSoldFor(null); setRemoveFor(null); load();
    } catch (e) { setErr(e?.message || "Error"); }
    finally { setBusy(false); }
  };

  const load = () => {
    import("./lib/api")
      .then(api => api.fetchMyListings(user.id))
      .then(setItems)
      .catch(e => { setErr(e?.message || "Error"); setItems([]); });
  };
  useEffect(() => { if (user?.id) load(); }, [user?.id]);

  const startEdit = (l) => {
    setEditId(l.id); setEPrice(String(l.price ?? "")); setEDesc(l.desc || "");
    setConfirmDel(null); setErr("");
  };
  const saveEdit = async (id) => {
    if (!ePrice || Number(ePrice) <= 0) { setErr(t.needPrice); return; }
    setBusy(true); setErr("");
    try {
      const api = await import("./lib/api");
      await api.updateListing(id, { price: Number(ePrice), desc: eDesc });
      setEditId(null); load();
    } catch (e) { setErr(e?.message || "Error"); }
    finally { setBusy(false); }
  };
  const doDelete = async (id) => {
    setBusy(true); setErr("");
    try {
      const api = await import("./lib/api");
      await api.deleteListing(id);
      setConfirmDel(null); load();
    } catch (e) { setErr(e?.message || "Error"); }
    finally { setBusy(false); }
  };

  // Categorise every animal by collection status. Legacy 'reserved'/'hidden'
  // count as active (still for-sale-ish), so nothing disappears.
  const bucket = (l) => l.status === "sold" ? "sold"
                      : l.status === "held" ? "held"
                      : l.status === "breeder" ? "breeder"
                      : "active";
  const all = items || [];
  const counts = {
    active: all.filter(l => bucket(l) === "active").length,
    sold: all.filter(l => bucket(l) === "sold").length,
    held: all.filter(l => bucket(l) === "held").length,
    breeder: all.filter(l => bucket(l) === "breeder").length,
  };
  const shown = all.filter(l => bucket(l) === tab);
  const emptyMsg = { active: t.colEmptyActive, sold: t.colEmptySold, held: t.colEmptyHeld, breeder: t.colEmptyBreeder }[tab];
  const tabs = [
    ["active", t.colActive], ["sold", t.colSold], ["held", t.colHeld], ["breeder", t.colBreeder],
  ];

  return (
    <div className="max-w-2xl mx-auto w-full pb-24">
      <header className="px-5 md:px-8 pt-12 md:pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.myListings}</h1>
          <p className="text-[11px] text-stone-500 mt-0.5">{t.mlIntro}</p>
        </div>
        <button onClick={() => go("addanimal")}
                className="shrink-0 inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-[11px] px-3 py-2 rounded-lg transition-colors">
          <PlusCircle size={14} />{t.addAnimal}
        </button>
      </header>

      {/* Trust nudge — shortcut to verification for unverified sellers */}
      {!user?.verified && (
        <button onClick={() => go("legal")}
                className="mx-5 md:mx-8 mt-4 w-[calc(100%-2.5rem)] md:w-[calc(100%-4rem)] flex items-center gap-3 bg-sky-500/10 ring-1 ring-sky-500/30 rounded-xl px-4 py-3 text-left hover:bg-sky-500/15 transition-colors">
          <ShieldCheck size={20} className="text-sky-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-stone-100">{t.verifyBannerTitle}</div>
            <div className="text-[11px] text-stone-400">{t.verifyBannerSub}</div>
          </div>
          <ChevronRight size={16} className="text-stone-500 shrink-0" />
        </button>
      )}

      {/* Status tabs */}
      <div className="px-5 md:px-8 pt-4 flex gap-1.5 overflow-x-auto hide-scrollbar">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); setEditId(null); setRemoveFor(null); setSoldFor(null); }}
                  className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                    tab === id ? "bg-amber-500 text-stone-950" : "bg-stone-900 text-stone-400 hover:text-stone-200"
                  }`}>
            {label} <span className="opacity-70">({counts[id]})</span>
          </button>
        ))}
      </div>

      <div className="px-5 md:px-8 pt-4 space-y-2.5">
        {err && (
          <p className="text-xs text-rose-400 font-bold flex items-center gap-1.5"><Info size={12} />{err}</p>
        )}
        {items === null ? (
          <p className="text-center text-stone-500 text-sm py-16 italic">…</p>
        ) : shown.length === 0 ? (
          <div className="text-center py-16 text-stone-500">
            <PackageCheck size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-display italic">{emptyMsg}</p>
            <button onClick={() => go(tab === "active" ? "sell" : "addanimal")}
                    className="mt-5 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition-colors">
              {tab === "active" ? t.sellCta : t.addAnimal}
            </button>
          </div>
        ) : shown.map(l => (
          <div key={l.id} className="bg-stone-900/50 ring-1 ring-stone-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 p-2.5">
              <button onClick={() => go("detail", l)} className="w-14 h-14 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                <img src={l.image} alt={l.common} loading="lazy"
                     onError={(e) => { e.target.onerror = null; e.target.src = fallback(l.common); }}
                     className="w-full h-full object-cover" />
              </button>
              <button onClick={() => go("detail", l)} className="flex-1 min-w-0 text-left">
                <div className="font-bold text-stone-100 text-sm truncate">{l.common}</div>
                <div className="text-[11px] text-stone-500 italic truncate">{l.species}</div>
                {l.price != null && bucket(l) !== "held" && bucket(l) !== "breeder" && (
                  <div className="text-[11px] text-amber-400 font-bold mt-0.5">{formatPrice(l.price)}</div>
                )}
              </button>

              {/* Actions depend on which bucket the animal is in */}
              <div className="flex flex-col gap-1.5 shrink-0">
                {bucket(l) === "active" && (
                  <>
                    <button onClick={() => { setSoldFor(soldFor?.id === l.id ? null : l); setEditId(null); setRemoveFor(null); }}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-emerald-500/15 ring-1 ring-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors">
                      {t.markSold}
                    </button>
                    {l.auction ? (
                      <span className="text-[10px] font-bold px-3 py-1.5 rounded-md bg-amber-500/10 ring-1 ring-amber-500/30 text-amber-300 text-center inline-flex items-center justify-center gap-1">
                        <ArrowUpDown size={11} />{t.auctionLive}
                      </span>
                    ) : (
                      <button onClick={() => (editId === l.id ? setEditId(null) : startEdit(l))}
                              className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors">
                        {t.mlEdit}
                      </button>
                    )}
                    <button onClick={() => { setRemoveFor(removeFor?.id === l.id ? null : l); setEditId(null); setSoldFor(null); }}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-rose-500/10 ring-1 ring-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors">
                      {t.mlDelete}
                    </button>
                  </>
                )}
                {(bucket(l) === "held" || bucket(l) === "breeder") && (
                  <>
                    <button onClick={() => { setRelistFor(relistFor?.id === l.id ? null : l); setRemoveFor(null); }} disabled={busy}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-amber-500/15 ring-1 ring-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-colors">
                      {t.relist}
                    </button>
                    <button onClick={() => changeStatus(l.id, bucket(l) === "held" ? "breeder" : "held")} disabled={busy}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors">
                      {bucket(l) === "held" ? t.statusBreeder : t.statusHeld}
                    </button>
                    <button onClick={() => { setRemoveFor(removeFor?.id === l.id ? null : l); }}
                            className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-rose-500/10 ring-1 ring-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors">
                      {t.mlDelete}
                    </button>
                  </>
                )}
                {bucket(l) === "sold" && (
                  <span className="text-[9px] font-black uppercase tracking-widest bg-stone-700 text-stone-300 px-2 py-1 rounded text-center">{t.soldBadge}</span>
                )}
              </div>
            </div>

            {/* Mark-as-sold panel */}
            {soldFor?.id === l.id && (
              <MarkSoldPanel listing={l} t={t} lang={lang} busy={busy} onCancel={() => setSoldFor(null)}
                             onConfirm={(payload) => doMarkSold(l, payload)} user={user} />
            )}

            {/* List-for-sale panel (held/breeder → active) */}
            {relistFor?.id === l.id && (
              <RelistPanel listing={l} t={t} lang={lang} busy={busy} onCancel={() => setRelistFor(null)}
                           onConfirm={(fields) => doRelist(l.id, fields)} />
            )}

            {/* Inline edit panel */}
            {editId === l.id && (
              <div className="border-t border-stone-800 p-3 space-y-2.5 bg-stone-950/40">
                <div>
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t.price}</div>
                  <div className="flex items-center gap-2 max-w-[160px]">
                    <span className="text-stone-400 text-sm shrink-0">€</span>
                    <input type="number" min="0" className="form-input flex-1" value={ePrice} onChange={e => setEPrice(e.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t.description}</div>
                  <textarea rows="3" className="form-input resize-none" value={eDesc} onChange={e => setEDesc(e.target.value)} />
                </div>
                <button onClick={() => saveEdit(l.id)} disabled={busy}
                        className="px-5 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 transition-colors">
                  {busy ? t.processing : t.mlSave}
                </button>
              </div>
            )}

            {/* Remove-from-sale panel — choose what happens to the animal */}
            {removeFor?.id === l.id && (
              <div className="border-t border-stone-800 p-3.5 bg-rose-500/5 space-y-2.5">
                <div className="text-[11px] font-bold text-stone-200">{t.removeListingTitle}</div>
                <p className="text-[11px] text-stone-400">{t.removeListingIntro}</p>
                <div className="space-y-1.5">
                  <button onClick={() => changeStatus(l.id, "held")} disabled={busy}
                          className="w-full py-2 rounded-lg text-[11px] font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors">
                    {t.removeToHeld}
                  </button>
                  <button onClick={() => changeStatus(l.id, "breeder")} disabled={busy}
                          className="w-full py-2 rounded-lg text-[11px] font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors">
                    {t.removeToBreeder}
                  </button>
                  {bucket(l) === "active" && (
                    <button onClick={() => { setSoldFor(l); setRemoveFor(null); }} disabled={busy}
                            className="w-full py-2 rounded-lg text-[11px] font-bold bg-emerald-500/15 ring-1 ring-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors">
                      {t.removeToSold}
                    </button>
                  )}
                  <button onClick={() => doDelete(l.id)} disabled={busy}
                          className="w-full py-2 rounded-lg text-[11px] font-bold bg-rose-500 hover:bg-rose-400 disabled:bg-stone-700 text-white transition-colors">
                    {busy ? t.processing : t.removeDelete}
                  </button>
                  <button onClick={() => setRemoveFor(null)}
                          className="w-full py-2 rounded-lg text-[11px] font-bold ring-1 ring-stone-700 text-stone-300 hover:text-stone-100 transition-colors">
                    {t.deleteCancel}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EDIT STORE — the breeder edits their own public page:
   profile photo, display name, city, bio, specialties.
   Creates the seller row on first visit if it doesn't exist yet.
   ═════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   ADD ANIMAL — add a non-sale animal to the collection (held / breeder).
   A trimmed sell form: species, sex, birth, weight, traits, CITES,
   parentage, photos + which collection status. No price/auction/delivery.
   Reuses createListing with status = held | breeder and price = null.
   ═════════════════════════════════════════════════════════════════ */
function AddAnimalScreen({ t, lang, go, user }) {
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("breeder");   // held | breeder
  const [catId, setCatId] = useState("");
  const [subcatId, setSubcatId] = useState("");
  const [speciesVal, setSpeciesVal] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("M");
  const [born, setBorn] = useState("");
  const [bornPrecision, setBornPrecision] = useState("month");
  const [weight, setWeight] = useState("");
  const [isCites, setIsCites] = useState(false);
  const [sire, setSire] = useState("");
  const [dam, setDam] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [customTrait, setCustomTrait] = useState("");
  const [photos, setPhotos] = useState([]);
  const [country, setCountry] = useState("IT");
  const [region, setRegion] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");
  const fileRef = useRef(null);
  const MAX_PHOTOS = 3;

  useEffect(() => {
    if (!user?.id) return;
    let on = true;
    import("./lib/api").then(api => api.fetchMySeller(user.id)).then(s => {
      if (!on || !s) return;
      if (s.country) setCountry(s.country);
      if (s.region) setRegion(s.region);
    }).catch(() => {});
    return () => { on = false; };
  }, [user?.id]);

  useEffect(() => { setSelectedTraits([]); }, [catId, speciesVal]);
  useEffect(() => {
    const c = isCitesSpecies(speciesVal);
    setIsCites(c);
    if (c) setBornPrecision("day");
  }, [speciesVal]);

  const subcats = catId ? subcatsFor(catId) : [];
  const speciesOptions = (catId && subcatId) ? speciesForSubcat(catId, subcatId) : [];
  // Species-aware traits — same shared source as the sell form and search filter.
  const exampleTraits = getTraitsForScope(catId, speciesVal);
  const addCustomTrait = () => {
    const v = customTrait.trim();
    if (v && !selectedTraits.includes(v)) setSelectedTraits(prev => [...prev, v]);
    setCustomTrait("");
  };
  const addFiles = (fileList) => {
    const imgs = Array.from(fileList || []).filter(f => f.type.startsWith("image/"));
    setPhotos(prev => [...prev, ...imgs.slice(0, MAX_PHOTOS - prev.length).map(f => ({ file: f, url: URL.createObjectURL(f) }))]);
  };
  const removePhoto = (i) => {
    setPhotos(prev => {
      const p = prev[i];
      if (p) URL.revokeObjectURL(p.url);   // free browser memory
      return prev.filter((_, x) => x !== i);
    });
  };
  // Revoke any remaining preview URLs when leaving the screen.
  const photosRef = useRef(photos);
  useEffect(() => { photosRef.current = photos; }, [photos]);
  useEffect(() => () => { photosRef.current.forEach(p => URL.revokeObjectURL(p.url)); }, []);
  const monthsSince = (val) => {
    const s = String(val || "").trim();
    if (!s) return null;
    let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s) || /^(\d{4})-(\d{1,2})$/.exec(s);
    let yy, mm;
    if (m) { yy = +m[1]; mm = +m[2]; }
    else if ((m = /^(\d{4})$/.exec(s))) { yy = +m[1]; mm = 1; }
    else return null;
    if (mm < 1 || mm > 12) return null;
    const now = new Date();
    return Math.max(0, (now.getFullYear() - yy) * 12 + (now.getMonth() + 1 - mm));
  };

  const save = async () => {
    setSaveErr("");
    if (!speciesVal || speciesVal === "__other") { setSaveErr(t.needSpecies); return; }
    if (isCites && !/^\d{4}-\d{1,2}-\d{1,2}$/.test((born || "").trim())) { setSaveErr(t.needFullBirth); return; }
    setSaving(true);
    try {
      const api = await import("./lib/api");
      const seller = await api.getOrCreateSeller({ id: user.id, name: user.name, email: user.email, region, country });
      const urls = photos.length ? await api.uploadListingPhotos(photos.map(p => p.file), user.id) : [];
      const traits = selectedTraits.map(n => {
        const e = exampleTraits.find(x => x.name === n);
        return { name: n, cls: e?.cls || "line" };
      });
      const common = SPECIES_LABELS[speciesVal]?.[lang] || speciesVal;
      await api.createListing({
        species: speciesVal, common, title: name.trim(), category: catId,
        traits, price: null, deposit: null,
        sex, ageMonths: monthsSince(born), weight: weight.trim() || null,
        birthDate: (born || "").trim() || null,
        citesListed: isCites, country, region, city: null,
        sire: sire.trim() || null, dam: dam.trim() || null, desc,
        image: urls[0] || null, images: urls, shipping: false, euShipping: false, localPickup: true,
        expoIds: [], auction: null, status,
      }, seller.id);
      setSuccess(true);
    } catch (err) { setSaveErr(err?.message || "Error"); }
    finally { setSaving(false); }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="w-16 h-16 bg-emerald-500/15 ring-1 ring-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-5">
          <CheckCircle size={32} />
        </div>
        <h2 className="font-display text-2xl text-stone-50">{t.animalAdded}</h2>
        <button onClick={() => go("mylistings")}
                className="mt-6 px-6 py-3 bg-amber-500 text-stone-950 font-bold text-sm rounded-lg hover:bg-amber-400 transition-colors">
          {t.myListings}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full pb-24">
      <header className="px-5 md:px-8 pt-12 md:pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("mylistings")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.addAnimalTitle}</h1>
          <p className="text-[11px] text-stone-500 mt-0.5">{t.addAnimalIntro}</p>
        </div>
      </header>

      <div className="p-5 md:p-8 space-y-6">
        {/* Status: held or breeder */}
        <FormBlock label={t.animalStatus}>
          <div className="flex bg-stone-900 ring-1 ring-stone-800 rounded-lg p-1">
            {[["breeder", t.statusBreeder], ["held", t.statusHeld]].map(([k, label]) => (
              <button key={k} type="button" onClick={() => setStatus(k)}
                      className={`flex-1 py-2 rounded-md text-xs font-bold transition-colors ${status === k ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"}`}>
                {label}
              </button>
            ))}
          </div>
        </FormBlock>

        {/* Photos */}
        <FormBlock>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                 onChange={e => { addFiles(e.target.files); e.target.value = ""; }} />
          <div className="flex flex-wrap gap-3">
            {photos.map((p, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden ring-1 ring-stone-700">
                <img src={p.url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-stone-950/80 text-stone-200 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"><X size={14} /></button>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <button type="button" onClick={() => fileRef.current?.click()}
                      className="w-24 h-24 border-2 border-dashed border-stone-700 hover:border-amber-500/60 rounded-xl flex flex-col items-center justify-center gap-1 text-stone-400 hover:text-amber-400 transition-colors">
                <Camera size={22} /><span className="text-[10px] font-bold">{photos.length}/{MAX_PHOTOS}</span>
              </button>
            )}
          </div>
        </FormBlock>

        <FormBlock label={t.nameLabel}>
          <input className="form-input" value={name} onChange={e => setName(e.target.value)}
                 placeholder={lang === "it" ? "Nome o codice dell'esemplare (facoltativo)" : "Animal name or code (optional)"} />
        </FormBlock>

        {/* Species cascade */}
        <FormBlock label={t.category} required done={!!catId}>
          <select className="form-input" value={catId} onChange={e => { setCatId(e.target.value); setSubcatId(""); setSpeciesVal(""); }}>
            <option value="">{lang === "it" ? "Scegli categoria" : "Choose category"}</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c[lang]}</option>)}
          </select>
        </FormBlock>
        {catId && (
          <FormBlock label={lang === "it" ? "Sottocategoria" : "Subcategory"}>
            <select className="form-input" value={subcatId} onChange={e => { setSubcatId(e.target.value); setSpeciesVal(""); }}>
              <option value="">{lang === "it" ? "Scegli sottocategoria" : "Choose subcategory"}</option>
              {subcats.map(sc => <option key={sc.id} value={sc.id}>{sc[lang]}</option>)}
            </select>
          </FormBlock>
        )}
        {subcatId && (
          <FormBlock label={t.species} required done={!!speciesVal && speciesVal !== "__other"}>
            {speciesOptions.length > 0 ? (
              <>
                <select className="form-input"
                        value={speciesOptions.includes(speciesVal) ? speciesVal : (speciesVal === "" ? "" : "__other")}
                        onChange={e => setSpeciesVal(e.target.value)}>
                  <option value="">{t.pickSpecies}</option>
                  {speciesOptions.map(sp => <option key={sp} value={sp}>{SPECIES_LABELS[sp]?.[lang] || sp} — {sp}</option>)}
                  <option value="__other">{lang === "it" ? "Altro / non in elenco…" : "Other / not listed…"}</option>
                </select>
                {speciesVal !== "" && !speciesOptions.includes(speciesVal) && (
                  <input className="form-input mt-2" autoFocus
                         placeholder={lang === "it" ? "Nome scientifico della specie" : "Species scientific name"}
                         value={speciesVal === "__other" ? "" : speciesVal} onChange={e => setSpeciesVal(e.target.value)} />
                )}
              </>
            ) : (
              <input className="form-input" placeholder={lang === "it" ? "Nome scientifico della specie" : "Species scientific name"}
                     value={speciesVal === "__other" ? "" : speciesVal} onChange={e => setSpeciesVal(e.target.value)} />
            )}
          </FormBlock>
        )}

        <FormBlock label={t.sex}>
          <select className="form-input" value={sex} onChange={e => setSex(e.target.value)}>
            <option value="M">{t.male}</option><option value="F">{t.female}</option><option value="U">{t.unsexed}</option>
          </select>
        </FormBlock>

        {/* Traits */}
        <FormBlock label={t.traits}>
          <div className="flex flex-wrap gap-1.5">
            {[...exampleTraits, ...selectedTraits.filter(n => !exampleTraits.some(e => e.name === n)).map(n => ({ name: n, cls: "line" }))].map((tr, i) => {
              const on = selectedTraits.includes(tr.name);
              return (
                <button key={tr.name + i} type="button"
                        onClick={() => setSelectedTraits(on ? selectedTraits.filter(s => s !== tr.name) : [...selectedTraits, tr.name])}>
                  <span className={on ? "" : "opacity-40"}><TraitChip trait={tr} size="sm" /></span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 mt-2.5">
            <input value={customTrait} onChange={e => setCustomTrait(e.target.value)}
                   onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCustomTrait(); } }}
                   placeholder={lang === "it" ? "Aggiungi un'altra morph…" : "Add another morph…"} className="form-input flex-1" />
            <button type="button" onClick={addCustomTrait}
                    className="px-4 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors shrink-0">
              {lang === "it" ? "Aggiungi" : "Add"}
            </button>
          </div>
        </FormBlock>

        {/* Parentage — feeds the breeding/genetics page */}
        <div className="grid grid-cols-2 gap-3">
          <FormBlock label={t.sire}>
            <input className="form-input" value={sire} onChange={e => setSire(e.target.value)} placeholder={lang === "it" ? "Padre (facoltativo)" : "Sire (optional)"} />
          </FormBlock>
          <FormBlock label={t.dam}>
            <input className="form-input" value={dam} onChange={e => setDam(e.target.value)} placeholder={lang === "it" ? "Madre (facoltativo)" : "Dam (optional)"} />
          </FormBlock>
        </div>

        {/* Birth date with precision */}
        <FormBlock label={t.born} required={isCites} done={!!born && (!isCites || /^\d{4}-\d{1,2}-\d{1,2}$/.test(born.trim()))}>
          <div className="flex bg-stone-900 ring-1 ring-stone-800 rounded-lg p-1 mb-2">
            {[["day", lang === "it" ? "Data esatta" : "Exact date"], ["month", lang === "it" ? "Mese e anno" : "Month & year"], ["year", lang === "it" ? "Solo anno" : "Year only"]].map(([key, label]) => {
              const locked = isCites && key !== "day";
              return (
                <button type="button" key={key} disabled={locked} onClick={() => { setBornPrecision(key); setBorn(""); }}
                        className={`flex-1 py-2 rounded-md text-xs font-bold transition-colors ${bornPrecision === key ? "bg-amber-500 text-stone-950" : locked ? "text-stone-700 cursor-not-allowed" : "text-stone-400 hover:text-stone-200"}`}>
                  {label}
                </button>
              );
            })}
          </div>
          {bornPrecision === "day" && <input type="date" className="form-input" value={born} onChange={e => setBorn(e.target.value)} max={new Date().toISOString().slice(0, 10)} style={{ colorScheme: "dark" }} />}
          {bornPrecision === "month" && <input type="month" className="form-input" value={born} onChange={e => setBorn(e.target.value)} max={new Date().toISOString().slice(0, 7)} style={{ colorScheme: "dark" }} />}
          {bornPrecision === "year" && <input type="number" className="form-input" value={born} onChange={e => setBorn(e.target.value)} min="1980" max={new Date().getFullYear()} placeholder={String(new Date().getFullYear())} />}
        </FormBlock>

        <FormBlock label={t.weight}>
          <input className="form-input" value={weight} onChange={e => setWeight(e.target.value)} placeholder={lang === "it" ? "es. 38g (facoltativo)" : "e.g. 38g (optional)"} />
        </FormBlock>

        {/* CITES */}
        <div className={`rounded-xl ring-1 transition-all p-4 ${isCites ? "bg-amber-500/5 ring-amber-500/30" : "bg-stone-900/40 ring-stone-800"}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={isCites} onChange={() => { const v = !isCites; setIsCites(v); if (v) { setBornPrecision("day"); setBorn(""); } }}
                   className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <FileText size={15} className={isCites ? "text-amber-400" : "text-stone-400"} />
                <span className="font-bold text-stone-100 text-sm">{t.citesCheckLabel}</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">{t.citesCheckHint}</p>
            </div>
          </label>
        </div>

        <FormBlock label={t.description}>
          <textarea rows="3" value={desc} onChange={e => setDesc(e.target.value)} placeholder={t.describePlaceholder} className="form-input resize-none" />
        </FormBlock>

        {saveErr && <p className="text-xs text-rose-400 font-bold flex items-center gap-1.5"><Info size={12} />{saveErr}</p>}
        <button onClick={save} disabled={saving}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold py-3.5 rounded-lg text-sm transition-colors inline-flex items-center justify-center gap-2">
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? (photos.length > 0 ? t.uploadingPhotos : t.publishing) : t.addAnimalSave}
        </button>
      </div>
    </div>
  );
}

function EditStoreScreen({ t, lang, go, user }) {
  const [seller, setSeller] = useState(null);   // mapped seller (with id)
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [specs, setSpecs] = useState("");
  const [website, setWebsite] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    let on = true;
    (async () => {
      try {
        const api = await import("./lib/api");
        let s = await api.fetchMySeller(user.id);
        if (!s) {
          // First visit before any listing: create the store row now.
          const created = await api.getOrCreateSeller({ id: user.id, name: user.name, email: user.email, region: user.region, country: "IT" });
          s = await api.fetchMySeller(user.id);
          if (!s && created) s = { id: created.id, name: created.name };
        }
        if (on && s) {
          setSeller(s);
          setName(s.name || "");
          setStoreName(s.storeName || "");
          setCity(s.city || "");
          setBio(s.bioIt || "");
          setSpecs((s.specialties || []).join(", "));
          setWebsite(s.website || "");
          setIsPro(!!s.pro);
          setAvatarPreview(s.avatarUrl || null);
        }
      } catch (e) { if (on) setErr(e?.message || "Error"); }
      finally { if (on) setLoaded(true); }
    })();
    return () => { on = false; };
  }, [user?.id]);

  const pickAvatar = (fileList) => {
    const f = Array.from(fileList || []).find(x => x.type.startsWith("image/"));
    if (!f) return;
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

  const save = async () => {
    if (!seller?.id || busy) return;
    setBusy(true); setErr(""); setSaved(false);
    try {
      const api = await import("./lib/api");
      let avatarUrl = null;
      if (avatarFile) {
        const urls = await api.uploadListingPhotos([avatarFile], user.id);
        avatarUrl = urls[0] || null;
      }
      const fields = {
        name: name.trim() || seller.name,
        storeName: storeName.trim(),
        city: city.trim(),
        bio: bio.trim(),
        specialties: specs.split(",").map(s => s.trim()).filter(Boolean),
        website: isPro ? website.trim() : "",
      };
      if (avatarUrl) fields.avatarUrl = avatarUrl;
      const updated = await api.updateMySeller(seller.id, fields);
      setSeller(updated);
      setAvatarFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (e) {
      setErr(e?.code === "23505" ? t.spNameTaken : (e?.message || "Error"));
    } finally { setBusy(false); }
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-24">
      <header className="px-5 md:px-8 pt-12 md:pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.spTitle}</h1>
          <p className="text-[11px] text-stone-500 mt-0.5">{t.spIntro}</p>
        </div>
      </header>

      <div className="p-5 md:p-8 space-y-5">
        {!loaded ? (
          <p className="text-center text-stone-500 text-sm py-16 italic">…</p>
        ) : (
          <>
            {/* Avatar */}
            <FormBlock label={t.spPhoto}>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                     onChange={e => { pickAvatar(e.target.files); e.target.value = ""; }} />
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 to-amber-700 ring-1 ring-stone-700 flex items-center justify-center font-display text-3xl text-stone-50 font-bold shrink-0">
                  {avatarPreview ? <img src={avatarPreview} alt="" className="w-full h-full object-cover" /> : initialsOf(name || user?.name)}
                </div>
                <button type="button" onClick={() => fileRef.current?.click()}
                        className="px-4 py-2.5 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors flex items-center gap-2">
                  <UploadCloud size={14} />{t.spUpload}
                </button>
              </div>
            </FormBlock>

            <FormBlock label={t.nameLabel}>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
            </FormBlock>

            <FormBlock label={t.spStoreName}>
              <input className="form-input" value={storeName} onChange={e => setStoreName(e.target.value)}
                     placeholder={lang === "it" ? "es. GeckosAndChameleons (facoltativo)" : "e.g. GeckosAndChameleons (optional)"} />
              <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">{t.spStoreNameHint}</p>
            </FormBlock>

            <FormBlock label={t.spCity}>
              <input className="form-input" value={city} onChange={e => setCity(e.target.value)} />
            </FormBlock>

            <FormBlock label={t.spBio}>
              <textarea rows="5" className="form-input resize-none" value={bio} onChange={e => setBio(e.target.value)}
                        placeholder={lang === "it" ? "Racconta il tuo allevamento: da quanto allevi, le tue linee, come lavori…" : "Tell buyers about your breeding: how long, your lines, how you work…"} />
            </FormBlock>

            <FormBlock label={t.spSpecialties}>
              <input className="form-input" value={specs} onChange={e => setSpecs(e.target.value)} placeholder={t.spSpecialtiesPh} />
            </FormBlock>

            <FormBlock label={t.spWebsite}>
              <div className="flex items-center gap-2 mb-1.5">
                {!isPro && <span className="text-[9px] font-black uppercase tracking-widest bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30 px-2 py-0.5 rounded-full">{t.proOnly}</span>}
              </div>
              <input className="form-input disabled:opacity-50" value={website} disabled={!isPro}
                     onChange={e => setWebsite(e.target.value)} placeholder={t.spWebsitePh} />
              {!isPro && <p className="text-[10px] text-stone-500 mt-1.5">{t.spWebsiteProNote}</p>}
            </FormBlock>

            {err && <p className="text-xs text-rose-400 font-bold flex items-center gap-1.5"><Info size={12} />{err}</p>}
            {saved && <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle size={12} />{t.spSaved}</p>}

            <button onClick={save} disabled={busy || !seller?.id}
                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold py-3.5 rounded-lg text-sm transition-colors">
              {busy ? t.processing : t.spSave}
            </button>

            {seller?.name && (
              <button onClick={() => go("seller", seller.name)}
                      className="w-full py-2.5 rounded-lg text-xs font-bold text-stone-400 hover:text-amber-400 transition-colors">
                {t.spView} →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Wishlist({ t, go, favorites, toggleFav, listingsData }) {
  const items = (listingsData || LISTINGS).filter(l => favorites.includes(l.id));
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
function AuthModal({ modal, setModal, onAuthSuccess, t, lang, go }) {
  const [mode, setMode] = useState(modal.mode); // "login" | "signup" | "forgot"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Required consents (unbundled, unticked by default per GDPR Art. 7)
  const [consentTos, setConsentTos] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);  // optional
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = mode === "login"
    ? (email && password)
    : mode === "forgot"
    ? !!email
    : (name && email && password && consentTos && consentPrivacy);

  const submit = async () => {
    if (!canSubmit || loading) return;
    if (mode === "signup" && (!consentTos || !consentPrivacy)) { setError(t.consentRequired); return; }
    setError(""); setInfo(""); setLoading(true);
    try {
      const api = await import("./lib/api");
      if (mode === "forgot") {
        await api.resetPasswordForEmail(email);
        setInfo(t.resetEmailSent);
      } else if (mode === "signup") {
        const data = await api.signUp(email, password, name, { marketing: consentMarketing });
        // With email confirmation ON, no session is returned yet → tell them to check email.
        if (!data?.session) { setInfo(t.checkEmailConfirm); }
        else { onAuthSuccess(); }
      } else {
        await api.signIn(email, password);
        onAuthSuccess();
      }
    } catch (err) {
      setError(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const openDoc = (route) => {
    setModal(null);
    setTimeout(() => go(route), 50);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-stone-950/85 backdrop-blur-sm p-0 md:p-4" onClick={() => setModal(null)}>
      <div onClick={e => e.stopPropagation()}
           className="w-full md:max-w-md bg-stone-900 ring-1 ring-stone-800 rounded-t-3xl md:rounded-2xl overflow-hidden anim-up max-h-[92vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-br from-stone-900 to-stone-950 border-b border-stone-800">
          <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-100">
            <X size={20} />
          </button>
          <div className="font-display text-2xl text-stone-50 tracking-tight">
            Herp<span className="italic text-amber-500">Market</span>
          </div>
          <h2 className="font-display text-xl text-stone-100 mt-3">
            {mode === "login" ? t.welcomeBack : mode === "forgot" ? t.resetTitle : t.createAccount}
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
              <input value={name} onChange={e => setName(e.target.value)} placeholder={t.nameLabel}
                     className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
            </div>
          )}
          {mode === "forgot" && (
            <p className="text-xs text-stone-400 leading-relaxed -mt-1">{t.resetIntro}</p>
          )}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 block">{t.emailPlaceholder}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
                   className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
          </div>
          {mode !== "forgot" && (
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 block">{t.passwordPlaceholder}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                   className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
          </div>
          )}
          {mode === "login" && (
            <div className="text-right -mt-1">
              <button onClick={() => { setMode("forgot"); setError(""); setInfo(""); }}
                      className="text-[11px] text-stone-400 hover:text-amber-400 transition-colors">
                {t.forgotPassword}
              </button>
            </div>
          )}

          {/* GDPR signup consent — required for new accounts only */}
          {mode === "signup" && (
            <div className="pt-2 space-y-2.5 border-t border-stone-800">
              <ConsentCheckbox checked={consentTos} onChange={setConsentTos} required>
                {t.consentTosLabel} —{" "}
                <button onClick={() => openDoc("terms")} className="text-amber-400 hover:text-amber-300 underline">
                  {t.consentReadHere}
                </button>
              </ConsentCheckbox>
              <ConsentCheckbox checked={consentPrivacy} onChange={setConsentPrivacy} required>
                {t.consentPrivacyLabel} —{" "}
                <button onClick={() => openDoc("privacy")} className="text-amber-400 hover:text-amber-300 underline">
                  {t.consentReadHere}
                </button>
              </ConsentCheckbox>
              <ConsentCheckbox checked={consentMarketing} onChange={setConsentMarketing}>
                {t.consentMarketingLabel}
              </ConsentCheckbox>
            </div>
          )}

          {(error || info) && (
            <p className={`text-[11px] font-bold flex items-center gap-1.5 ${error ? "text-rose-400" : "text-emerald-400"}`}>
              <Info size={12} />{error || info}
            </p>
          )}

          <button onClick={submit} disabled={!canSubmit || loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold py-3 rounded-lg text-sm transition-colors mt-2">
            {loading ? t.processing : mode === "login" ? t.continueWithEmail : mode === "forgot" ? t.sendResetLink : t.signUpFree}
          </button>
          <div className="text-center pt-1">
            {mode === "forgot" ? (
              <button onClick={() => { setMode("login"); setError(""); setInfo(""); }}
                      className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                {t.backToLogin}
              </button>
            ) : (
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setInfo(""); }}
                      className="text-xs text-stone-400 hover:text-amber-400 transition-colors">
                {mode === "login" ? <>{t.noAccount} <span className="text-amber-400 font-bold">{t.signup}</span></> : <>{t.alreadyMember} <span className="text-amber-400 font-bold">{t.login}</span></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentCheckbox({ checked, onChange, required, children }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer text-[11px] leading-relaxed text-stone-300">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
             className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0" />
      <span>
        {children}
        {required && <span className="text-rose-400 ml-1">*</span>}
      </span>
    </label>
  );
}

/* Shown when the user returns from a password-reset email (recovery session). */
function SetNewPasswordModal({ t, onDone }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const save = async () => {
    if (!pw || loading) return;
    setError(""); setLoading(true);
    try {
      const api = await import("./lib/api");
      await api.updatePassword(pw);
      setInfo(t.passwordUpdated);
      await api.signOut();
      setTimeout(onDone, 1400);
    } catch (err) { setError(err?.message || "Error"); }
    finally { setLoading(false); }
  };
  return (
    <div className="fixed inset-0 z-[75] flex items-end md:items-center justify-center bg-stone-950/85 backdrop-blur-sm p-0 md:p-4">
      <div className="w-full md:max-w-md bg-stone-900 ring-1 ring-stone-800 rounded-t-3xl md:rounded-2xl overflow-hidden anim-up">
        <div className="p-6 pb-4 bg-gradient-to-br from-stone-900 to-stone-950 border-b border-stone-800">
          <div className="font-display text-2xl text-stone-50 tracking-tight">
            Herp<span className="italic text-amber-500">Market</span>
          </div>
          <h2 className="font-display text-xl text-stone-100 mt-3">{t.newPasswordTitle}</h2>
        </div>
        <div className="p-6 space-y-3">
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5 block">{t.newPasswordLabel}</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••"
                   className="w-full bg-stone-800 ring-1 ring-stone-700 rounded-lg px-3 py-3 text-sm text-stone-100 outline-none focus:ring-amber-500/60 transition-all" />
          </div>
          {(error || info) && (
            <p className={`text-[11px] font-bold flex items-center gap-1.5 ${error ? "text-rose-400" : "text-emerald-400"}`}>
              <Info size={12} />{error || info}
            </p>
          )}
          <button onClick={save} disabled={!pw || loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold py-3 rounded-lg text-sm transition-colors mt-2">
            {loading ? t.processing : t.savePassword}
          </button>
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
      {/* Legal links — accessible without an account */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-8 text-[11px]">
        <button onClick={() => go("terms")} className="text-stone-600 hover:text-amber-400 transition-colors">{t.termsLegal}</button>
        <button onClick={() => go("privacy")} className="text-stone-600 hover:text-amber-400 transition-colors">{t.privacyLabel}</button>
        <button onClick={() => go("about")} className="text-stone-600 hover:text-amber-400 transition-colors">{t.aboutContact}</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPO DETAIL — animals available at this expo + search + social links
   ═════════════════════════════════════════════════════════════════ */
function ExpoDetail({ expo, t, lang, go, favorites, toggleFav, listingsData }) {
  const [expoSearch, setExpoSearch] = useState("");
  if (!expo) return null;

  const expoAnimals = (listingsData || LISTINGS).filter(l => (l.expoIds && l.expoIds.includes(expo.id)) || l.expoId === expo.id);
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
      <div className={`relative bg-gradient-to-br from-emerald-800 to-teal-700 px-5 md:px-8 pt-6 pb-7`}>
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
function SellerProfile({ sellerName, t, lang, go, goBack, favorites, toggleFav, listingsData }) {
  const [tab, setTab] = useState("animals");
  // Live seller row from Supabase — used when the name isn't in the demo SELLERS
  // table (i.e. every real breeder account). Demo entries keep their rich data.
  const [liveSeller, setLiveSeller] = useState(null);
  useEffect(() => {
    if (!sellerName || SELLERS[sellerName]) return;
    let on = true;
    import("./lib/api").then(api => api.fetchSeller(sellerName))
      .then(s => { if (on && s) setLiveSeller(s); })
      .catch(() => {});
    return () => { on = false; };
  }, [sellerName]);
  if (!sellerName) return null;

  const seller = SELLERS[sellerName] || liveSeller;
  const sellerListings = (listingsData || LISTINGS).filter(l => l.seller === sellerName);

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
    bioIt: "", bioEn: "", website: "", pro: false,
  };

  const attendedExpos = data.expoIds.map(id => EXPOS.find(e => e.id === id)).filter(Boolean);
  const bio = lang === "it" ? data.bioIt : data.bioEn;

  // Load live reviews once we know the seller's row id (real breeders).
  const [liveReviews, setLiveReviews] = useState(null);
  const resolvedSellerId = data.id || liveSeller?.id;
  useEffect(() => {
    if (!resolvedSellerId) return;
    let on = true;
    import("./lib/api").then(api => api.fetchSellerReviews(resolvedSellerId))
      .then(rows => { if (on) setLiveReviews(rows); })
      .catch(() => { if (on) setLiveReviews([]); });
    return () => { on = false; };
  }, [resolvedSellerId]);
  // Prefer live reviews; fall back to any demo reviews on the seller object.
  const reviewsToShow = liveReviews != null ? liveReviews : (data.reviews || []);

  return (
    <div className="max-w-5xl mx-auto w-full pb-24 md:pb-10">
      {/* Header / banner */}
      <div className="relative">
        <div className="h-32 md:h-44 bg-gradient-to-br from-amber-900/60 via-stone-900 to-stone-950" />
        <button onClick={goBack}
                className="absolute top-5 left-4 p-2.5 bg-stone-950/70 backdrop-blur-md rounded-full text-stone-100 hover:bg-stone-950/90 transition-colors">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Identity block */}
      <div className="px-5 md:px-8 -mt-12 md:-mt-14 relative">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 to-amber-800 ring-4 ring-stone-950 flex items-center justify-center font-display text-4xl text-stone-50 font-bold shadow-2xl">
            {data.avatarUrl ? <img src={data.avatarUrl} alt={data.name} className="w-full h-full object-cover" /> : data.name[0]}
          </div>
          <div className="flex-1 pb-1 min-w-0">
            <h1 className="font-display text-2xl md:text-3xl text-stone-50 tracking-tight flex items-center gap-2 leading-tight">
              <span className="truncate">{data.name}</span>
              {data.verified && <ShieldCheck size={20} className="text-sky-400 shrink-0" />}
            </h1>
            <div className="flex items-center gap-1.5 text-stone-400 text-xs md:text-sm mt-1">
              <MapPin size={12} />{countryByCode(data.country).flag} {data.city}, {data.region}
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
          reviewsToShow.length > 0 ? (
            <div className="space-y-3 max-w-2xl">
              {reviewsToShow.map((rev, i) => (
                <div key={i} className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 font-bold text-xs">
                        {(rev.buyer || "—")[0]}
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
                  {rev.text && <p className="text-sm text-stone-300 mt-3 leading-relaxed">{rev.text}</p>}
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

            {data.website && (
              <a href={data.website.startsWith("http") ? data.website : `https://${data.website}`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-bold transition-colors">
                <Globe size={15} />{t.visitWebsite}
              </a>
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
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-800 to-teal-700 flex items-center justify-center shrink-0`}>
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
   SETTINGS & KYC
   - Language switch (works on every device)
   - Push notification opt-in (uses real Notification.requestPermission;
     actual delivery needs a backend with VAPID — noted inline)
   - Breeder verification: upload Visura/ASL/ID. In this front-end demo
     the files aren't really sent; in production each upload hits a
     storage bucket and fires a webhook for manual review.
   ═════════════════════════════════════════════════════════════════ */
function SettingsScreen({ t, go, lang, setLang, user }) {
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState({ messages: true, reservations: true, priceDrops: true, expo: false });
  const [uploads, setUploads] = useState({ visuraPath: "", docPath: "", asl: "" });
  const [kycStatus, setKycStatus] = useState(user?.verified ? "verified" : "unverified");
  const [kycBusy, setKycBusy] = useState("");   // "visura" | "doc" | "submit"
  const [kycErr, setKycErr] = useState("");

  // Load real verification status on open.
  useEffect(() => {
    if (!user?.id) return;
    let on = true;
    import("./lib/api").then(api => api.fetchMyKyc(user.id)).then(k => {
      if (!on || !k) return;
      setKycStatus(k.verified ? "verified" : (k.kyc_status || "unverified"));
    }).catch(() => {});
    return () => { on = false; };
  }, [user?.id]);

  const handleKycFile = async (kind, file) => {
    setKycErr(""); setKycBusy(kind);
    try {
      const api = await import("./lib/api");
      const path = await api.uploadKycDoc(user.id, kind, file);
      setUploads(u => ({ ...u, [kind === "visura" ? "visuraPath" : "docPath"]: path }));
    } catch (e) { setKycErr(e?.message || "Upload failed"); }
    finally { setKycBusy(""); }
  };

  const submitKyc = async () => {
    setKycErr(""); setKycBusy("submit");
    try {
      const api = await import("./lib/api");
      await api.submitKyc(user.id, { visuraPath: uploads.visuraPath, docPath: uploads.docPath, asl: uploads.asl });
      setKycStatus("pending");
    } catch (e) { setKycErr(e?.message || "Submit failed"); }
    finally { setKycBusy(""); }
  };

  const enableNotifications = async () => {
    // Real permission prompt. Sending actual pushes requires a service worker + backend (VAPID).
    if (typeof Notification !== "undefined" && Notification.requestPermission) {
      try {
        const perm = await Notification.requestPermission();
        setNotifEnabled(perm === "granted");
      } catch { setNotifEnabled(true); }
    } else {
      setNotifEnabled(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-20">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.settingsKyc}</h1>
      </header>

      <div className="p-5 md:p-8 space-y-8">

        {/* Language */}
        <section>
          <h2 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">{t.langSection}</h2>
          <div className="flex bg-stone-900 ring-1 ring-stone-800 rounded-lg p-1">
            {["it", "en"].map(lng => (
              <button key={lng} onClick={() => setLang(lng)}
                      className={`flex-1 py-2.5 rounded-md text-sm font-bold transition-colors ${
                        lang === lng ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
                      }`}>
                {lng === "it" ? "Italiano" : "English"}
              </button>
            ))}
          </div>
        </section>

        {/* Verification / KYC */}
        <section>
          <h2 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">{t.verificationSection}</h2>
          <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className={kycStatus === "verified" ? "text-sky-400" : "text-stone-500"} />
                <h3 className="font-bold text-stone-100">{t.kycTitle}</h3>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                kycStatus === "verified" ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30" :
                kycStatus === "pending" ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30" :
                "bg-stone-800 text-stone-400"
              }`}>
                {kycStatus === "verified" ? t.kycVerified : kycStatus === "pending" ? t.kycPending : t.kycUnverified}
              </span>
            </div>

            {kycStatus === "verified" ? (
              <p className="text-sm text-stone-400 mt-2">{lang === "it" ? "Il tuo account è verificato. La spunta blu appare su tutti i tuoi annunci." : "Your account is verified. The blue check shows on all your listings."}</p>
            ) : kycStatus === "pending" ? (
              <p className="text-sm text-amber-300/90 mt-2">{t.kycSubmitted}</p>
            ) : (
              <>
                <p className="text-sm text-stone-400 mt-2 mb-4">{t.kycIntro}</p>

                {/* Required: identity document only — "prove you're a real person" */}
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">{t.kycRequired}</div>
                <UploadRow label={t.kycDoc} done={!!uploads.docPath} busy={kycBusy === "doc"} onFile={(f) => handleKycFile("doc", f)} t={t} />
                <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">{t.kycDocHint}</p>

                {/* Optional: professional credentials for breeders who have them */}
                <div className="mt-5 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t.kycOptional}</div>
                <p className="text-[11px] text-stone-500 mb-2.5 leading-relaxed">{t.kycOptionalHint}</p>
                <div className="space-y-2.5">
                  <UploadRow label={t.kycVisura} done={!!uploads.visuraPath} busy={kycBusy === "visura"} onFile={(f) => handleKycFile("visura", f)} t={t} />
                  <div className="bg-stone-900 ring-1 ring-stone-800 rounded-lg px-3 py-2.5">
                    <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t.kycAsl}</div>
                    <input value={uploads.asl} onChange={e => setUploads({ ...uploads, asl: e.target.value })}
                           placeholder="IT-XX-00000"
                           className="w-full bg-stone-950 ring-1 ring-stone-800 rounded-md px-3 py-2 text-sm text-stone-100 outline-none focus:ring-amber-500/60" />
                    <p className="text-[10px] text-stone-600 mt-1.5 leading-relaxed">{t.kycAslHint}</p>
                  </div>
                </div>

                {kycErr && <p className="text-xs text-rose-400 mt-3">{kycErr}</p>}
                <button onClick={submitKyc}
                        disabled={!uploads.docPath || kycBusy === "submit"}
                        className="w-full mt-4 py-3 rounded-lg text-sm font-bold bg-sky-500 hover:bg-sky-400 text-stone-950 transition-colors disabled:bg-stone-800 disabled:text-stone-500">
                  {kycBusy === "submit" ? t.processing : t.kycSubmit}
                </button>
                <div className="mt-4 pt-4 border-t border-stone-800">
                  <div className="text-[11px] font-bold text-stone-300">{t.kycWhy}</div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{t.kycWhyText}</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Notifications — not yet live; honest "coming soon" so testers aren't misled */}
        <section>
          <h2 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">{t.notifSection}</h2>
          <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Bell size={20} className="text-stone-500" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-stone-100">{t.notifTitle}</h3>
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/15 ring-1 ring-amber-500/30 px-1.5 py-0.5 rounded">{t.breedingSoon}</span>
                </div>
                <p className="text-sm text-stone-400 mt-1">{t.notifComingSoon}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & GDPR rights */}
        <PrivacySection t={t} lang={lang} go={go} />

      </div>
    </div>
  );
}

/* PrivacySection — GDPR data export (Art. 20) + account deletion (Art. 17).
   In production, both actions hit a backend Edge Function that:
   - Export: bundles the user's data from all tables into a JSON file and
     emails a signed download link (don't expose the link publicly).
   - Delete: kicks off a 30-day grace period, pseudonymises completed
     transactions and CITES documents (legal retention), cancels Stripe
     Connect account, removes all other personal data.                          */
function PrivacySection({ t, lang, go }) {
  const [exported, setExported] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleted, setDeleted] = useState(false);

  const requestExport = async () => {
    // TODO wire to Supabase Edge Function: fetch_user_export(userId)
    setExported(true);
    setTimeout(() => setExported(false), 6000);
  };

  const confirmDelete = async () => {
    // TODO wire to Supabase Edge Function: request_account_deletion(userId)
    // which pseudonymises retention-required rows and schedules hard delete in 30d.
    setDeleted(true);
  };

  return (
    <section>
      <h2 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">{t.privacySection}</h2>
      <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-5 space-y-4">

        {/* Privacy policy link */}
        <button onClick={() => go("privacy")}
                className="w-full flex items-center justify-between text-left hover:bg-stone-800/40 rounded-lg px-2 py-2 -mx-2 transition-colors">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-amber-400" />
            <span className="font-bold text-stone-100 text-sm">{t.privacyLabel}</span>
          </div>
          <ChevronRight size={16} className="text-stone-600" />
        </button>

        {/* Data export (GDPR Art. 20) */}
        <div className="pt-3 border-t border-stone-800">
          <div className="flex items-start gap-3 mb-2">
            <FileText size={18} className="text-sky-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-stone-100 text-sm">{t.dataExport}</h3>
              <p className="text-xs text-stone-400 mt-0.5">{t.dataExportDesc}</p>
            </div>
          </div>
          {exported ? (
            <p className="text-[11px] text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-500/20 rounded-lg px-3 py-2 mt-2">
              ✓ {t.dataExportDone}
            </p>
          ) : (
            <button onClick={requestExport}
                    className="w-full mt-2 py-2.5 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors">
              {t.dataExport}
            </button>
          )}
        </div>

        {/* Account deletion (GDPR Art. 17) */}
        <div className="pt-3 border-t border-stone-800">
          <div className="flex items-start gap-3 mb-2">
            <X size={18} className="text-rose-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-stone-100 text-sm">{t.deleteAccount}</h3>
              <p className="text-xs text-stone-400 mt-0.5">{t.deleteAccountIntro}</p>
            </div>
          </div>
          {!showDelete ? (
            <button onClick={() => setShowDelete(true)}
                    className="w-full mt-2 py-2.5 rounded-lg text-xs font-bold bg-rose-500/10 ring-1 ring-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors">
              {t.deleteAccount}
            </button>
          ) : deleted ? (
            <div className="mt-3 bg-emerald-500/10 ring-1 ring-emerald-500/30 rounded-lg p-3">
              <p className="text-xs text-emerald-300 leading-relaxed">{t.deleteSuccess}</p>
            </div>
          ) : (
            <div className="mt-3 bg-rose-500/5 ring-1 ring-rose-500/30 rounded-lg p-3 space-y-3">
              <p className="text-[11px] text-rose-200/90 leading-relaxed">{t.deleteWarning}</p>
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 block">
                  {t.deleteConfirmPrompt}
                </label>
                <input value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)}
                       placeholder={t.deleteConfirmWord}
                       className="w-full bg-stone-950 ring-1 ring-stone-800 rounded-md px-3 py-2 text-sm text-stone-100 outline-none focus:ring-rose-500/60" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setShowDelete(false); setDeleteConfirmText(""); }}
                        className="flex-1 py-2 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors">
                  {t.deleteCancel}
                </button>
                <button onClick={confirmDelete}
                        disabled={deleteConfirmText !== t.deleteConfirmWord}
                        className="flex-1 py-2 rounded-lg text-xs font-bold bg-rose-500 hover:bg-rose-400 text-stone-50 disabled:bg-stone-800 disabled:text-stone-500 transition-colors">
                  {t.deleteButton}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function UploadRow({ label, done, onFile, t, busy }) {
  const ref = useRef(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*,application/pdf" className="hidden"
             onChange={e => { if (e.target.files?.[0]) onFile(e.target.files[0]); e.target.value = ""; }} />
      <button type="button" onClick={() => ref.current?.click()} disabled={busy}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-3 ring-1 transition-colors ${
                done ? "bg-emerald-500/10 ring-emerald-500/30" : "bg-stone-900 ring-stone-800 hover:ring-stone-700"
              }`}>
        <span className="text-sm font-medium text-stone-200">{label}</span>
        {done ? (
          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold"><Check size={14} />{t.kycUploaded}</span>
        ) : (
          <span className="flex items-center gap-1.5 text-stone-400 text-xs font-bold"><UploadCloud size={14} />{t.kycUpload}</span>
        )}
      </button>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BREEDING PROJECTS — coming-soon page with a real preview of the
   planned visual planner (replaces the Excel sheets breeders use).
   ═════════════════════════════════════════════════════════════════ */
function BreedingProjectsScreen({ t, go, lang }) {
  const [notified, setNotified] = useState(false);
  const features = [t.breedingFeat1, t.breedingFeat2, t.breedingFeat3, t.breedingFeat4];
  return (
    <div className="max-w-2xl mx-auto w-full pb-24">
      <header className="px-5 md:px-8 pt-12 md:pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.geneticsBreeding}</h1>
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/15 ring-1 ring-amber-500/30 px-1.5 py-0.5 rounded">{t.breedingSoon}</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5">{t.breedingIntro}</p>
        </div>
      </header>

      <div className="p-5 md:p-8">
        {/* Hero coming-soon card */}
        <div className="bg-gradient-to-br from-amber-500/10 to-stone-900/40 ring-1 ring-amber-500/20 rounded-2xl p-6 text-center">
          <div className="w-14 h-14 mx-auto bg-amber-500/15 ring-1 ring-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-4">
            <GitBranch size={26} />
          </div>
          <h2 className="font-display text-xl text-stone-50">{t.breedingSoon}</h2>
          <p className="text-sm text-stone-300 mt-2 leading-relaxed max-w-md mx-auto">{t.breedingSoonText}</p>
        </div>

        {/* Planned features */}
        <div className="mt-5 space-y-2">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-stone-900/50 ring-1 ring-stone-800 rounded-xl p-3.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Check size={14} />
              </div>
              <span className="text-sm text-stone-200">{f}</span>
            </div>
          ))}
        </div>

        {/* Visual preview mockup — a teaser of the planner */}
        <div className="mt-5 bg-stone-900/40 ring-1 ring-stone-800 rounded-2xl p-4">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">{lang === "it" ? "Anteprima" : "Preview"}</div>
          <div className="flex items-stretch gap-2 opacity-60">
            <div className="flex-1 space-y-2">
              <div className="bg-sky-500/10 ring-1 ring-sky-500/20 rounded-lg p-2.5">
                <div className="text-[9px] text-sky-300/70 uppercase tracking-widest font-bold">♂ {t.lineageSire}</div>
                <div className="text-xs font-bold text-stone-100 mt-0.5">Lilly White</div>
              </div>
              <div className="bg-rose-500/10 ring-1 ring-rose-500/20 rounded-lg p-2.5">
                <div className="text-[9px] text-rose-300/70 uppercase tracking-widest font-bold">♀ {t.lineageDam}</div>
                <div className="text-xs font-bold text-stone-100 mt-0.5">het Axanthic</div>
              </div>
            </div>
            <div className="flex items-center text-stone-600"><ChevronRight size={18} /></div>
            <div className="flex-1 bg-amber-500/5 ring-1 ring-amber-500/15 rounded-lg p-2.5">
              <div className="text-[9px] text-amber-400/70 uppercase tracking-widest font-bold mb-1">{lang === "it" ? "Prole attesa" : "Expected offspring"}</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]"><span className="text-stone-300">Lilly White</span><span className="text-stone-500">25%</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-stone-300">LW het Ax</span><span className="text-stone-500">50%</span></div>
                <div className="flex justify-between text-[10px]"><span className="text-stone-300">Normal het Ax</span><span className="text-stone-500">25%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Notify button */}
        {notified ? (
          <p className="text-center text-emerald-300 text-sm mt-5 bg-emerald-500/10 ring-1 ring-emerald-500/20 rounded-lg py-3">
            ✓ {lang === "it" ? "Ti avviseremo appena sarà pronto." : "We'll let you know as soon as it's ready."}
          </p>
        ) : (
          <button onClick={() => setNotified(true)}
                  className="w-full mt-5 py-3 rounded-lg text-sm font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors">
            {t.breedingNotify}
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   REVIEWS — feedback the seller received. Real reviews are unlocked after
   a completed sale (buyer leaves a review). Until that flow is wired, this
   honestly shows the empty state rather than demo data.
   ═════════════════════════════════════════════════════════════════ */
/* A card for a completed purchase the buyer hasn't reviewed yet: star picker
   + optional comment → writes to the reviews table (RLS-guarded). */
function LeaveReviewCard({ sale, user, t, lang, onDone }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!rating || busy) return;
    setBusy(true); setErr("");
    try {
      const api = await import("./lib/api");
      await api.submitReview({
        sellerId: sale.sellerId, buyerId: user.id,
        transactionId: sale.transactionId, rating, comment: comment.trim(),
      });
      onDone();
    } catch (e) { setErr(e?.message || "Error"); setBusy(false); }
  };

  return (
    <div className="bg-stone-900/60 ring-1 ring-amber-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-lg overflow-hidden bg-stone-800 shrink-0">
          <img src={sale.listingImage} alt="" loading="lazy"
               onError={(e) => { e.target.onerror = null; e.target.src = fallback(sale.listingCommon || ""); }}
               className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-stone-100 truncate">{sale.sellerName}</div>
          <div className="text-[11px] text-stone-500 truncate italic">{sale.listingCommon}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} type="button" onClick={() => setRating(n)}>
            <Star size={24} className={n <= rating ? "fill-amber-400 text-amber-400" : "text-stone-700 hover:text-stone-500"} />
          </button>
        ))}
      </div>
      <textarea rows="2" value={comment} onChange={e => setComment(e.target.value)}
                placeholder={lang === "it" ? "Scrivi una recensione (facoltativo)…" : "Write a review (optional)…"}
                className="form-input resize-none mb-2" />
      {err && <p className="text-[11px] text-rose-400 font-bold mb-2">{err}</p>}
      <button onClick={submit} disabled={!rating || busy}
              className="w-full py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 transition-colors">
        {busy ? t.processing : (lang === "it" ? "Invia recensione" : "Submit review")}
      </button>
    </div>
  );
}

function ReviewsScreen({ t, go, lang, user }) {
  const [reviews, setReviews] = useState(null);   // reviews received (as seller)
  const [toReview, setToReview] = useState([]);   // completed purchases I can review
  const [reload, setReload] = useState(0);
  useEffect(() => {
    if (!user?.id) { setReviews([]); return; }
    let on = true;
    import("./lib/api").then(api => {
      (api.fetchMyReviews ? api.fetchMyReviews(user.id) : Promise.resolve([]))
        .then(rows => { if (on) setReviews(rows || []); }).catch(() => { if (on) setReviews([]); });
      (api.fetchReviewableSales ? api.fetchReviewableSales(user.id) : Promise.resolve([]))
        .then(rows => { if (on) setToReview(rows || []); }).catch(() => { if (on) setToReview([]); });
    });
    return () => { on = false; };
  }, [user?.id, reload]);

  const list = reviews || [];
  const avg = list.length ? (list.reduce((s, r) => s + r.rating, 0) / list.length) : 0;

  return (
    <div className="max-w-2xl mx-auto w-full pb-24">
      <header className="px-5 md:px-8 pt-12 md:pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.reviews}</h1>
          <p className="text-[11px] text-stone-500 mt-0.5">{t.reviewsIntro}</p>
        </div>
      </header>

      {/* Sales you can review (completed purchases without a review yet) */}
      {toReview.length > 0 && (
        <div className="px-5 md:px-8 pt-5">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
            {lang === "it" ? "Lascia una recensione" : "Leave a review"}
          </div>
          <div className="space-y-2.5">
            {toReview.map(sale => (
              <LeaveReviewCard key={sale.transactionId} sale={sale} user={user} t={t} lang={lang}
                               onDone={() => setReload(x => x + 1)} />
            ))}
          </div>
        </div>
      )}

      {/* Rating summary */}
      <div className="px-5 md:px-8 pt-5">
        <div className="bg-gradient-to-br from-amber-500/10 to-stone-900/40 ring-1 ring-amber-500/20 rounded-2xl p-5 flex items-center gap-5">
          <div className="text-center">
            <div className="font-display text-4xl text-stone-50 leading-none">{avg.toFixed(1)}</div>
            <div className="flex gap-0.5 mt-1.5 justify-center">
              {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={12} className={n <= Math.round(avg) ? "fill-amber-400 text-amber-400" : "text-stone-700"} />
              ))}
            </div>
          </div>
          <div className="flex-1 border-l border-stone-800 pl-5">
            <div className="text-2xl font-display text-stone-100">{list.length}</div>
            <div className="text-[11px] text-stone-500">{t.reviewsTotal}</div>
          </div>
        </div>
      </div>

      {/* Review list */}
      <div className="px-5 md:px-8 pt-4 space-y-2.5">
        {reviews === null ? (
          <p className="text-center text-stone-500 text-sm py-16 italic">…</p>
        ) : list.length === 0 ? (
          <p className="text-center text-stone-500 text-sm py-16 italic">{t.reviewsEmpty}</p>
        ) : list.map((r, i) => (
          <div key={i} className="bg-stone-900/50 ring-1 ring-stone-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-stone-600 to-stone-700 flex items-center justify-center text-[11px] font-bold text-stone-100">
                  {r.buyer[0]}
                </div>
                <span className="text-sm font-bold text-stone-100">{r.buyer}</span>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <Star key={n} size={11} className={n <= r.rating ? "fill-amber-400 text-amber-400" : "text-stone-700"} />
                ))}
              </div>
            </div>
            <p className="text-[13px] text-stone-300 leading-relaxed">{r.text}</p>
            <div className="text-[10px] text-stone-600 mt-2">{r.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* PLACEHOLDER for not-yet-built sections (e.g. Eco-Taxi, CITES Archive). */
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
          "Il contratto di compravendita si conclude direttamente tra Acquirente e Venditore. HerpMarket fornisce strumenti per facilitare la transazione (richiesta di acquisto, approvazione del venditore, pagamento sicuro tramite il provider di pagamento, generazione documentale) ma resta estraneo al rapporto contrattuale.",
          "L'Acquirente effettua una richiesta di acquisto tramite la piattaforma. Il Venditore può approvare o rifiutare la richiesta. Nessun pagamento è dovuto fino all'approvazione del Venditore.",
          "Una volta approvata la richiesta, l'Acquirente versa l'acconto (per ritiro in fiera) o il pagamento integrale (per spedizione o ritiro presso il Venditore) tramite il provider di pagamento integrato. Il versamento al Venditore è gestito come pagamento differito direttamente dal provider di pagamento (Stripe) e rilasciato alla conferma reciproca della consegna. HerpMarket non detiene in alcun momento i fondi.",
          "Gli acconti versati per il ritiro in fiera non sono rimborsabili in caso di mancato ritiro da parte dell'Acquirente per causa a lui imputabile.",
        ],
        en: [
          "The sale contract is concluded directly between Buyer and Seller. HerpMarket provides tools to facilitate the transaction (purchase request, seller approval, secure payment via the payment provider, document generation) but is not a party to the contractual relationship.",
          "The Buyer submits a purchase request via the platform. The Seller may approve or decline the request. No payment is due until Seller approval.",
          "Once approved, the Buyer pays the deposit (for expo pickup) or the full amount (for shipping or seller pickup) via the integrated payment provider. The payout to the Seller is handled as a delayed payout directly by the payment processor (Stripe) and released upon mutual handover confirmation. HerpMarket never holds the funds at any point.",
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
      id: "7", title: { it: "Modello di servizio (nessuna commissione)", en: "Service model (no commission)" }, review: true,
      body: {
        it: [
          "HerpMarket non applica attualmente alcuna commissione né ai Venditori né agli Acquirenti. La piattaforma è gratuita.",
          "I pagamenti tra Acquirenti e Venditori sono elaborati direttamente tramite Stripe Connect: i fondi transitano dall'Acquirente al conto Stripe del Venditore senza essere trattenuti su conti di HerpMarket. HerpMarket non è in possesso dei fondi degli Utenti in nessun momento e non opera come prestatore di servizi di pagamento ai sensi della Direttiva PSD2.",
          "HerpMarket può mostrare contenuti commerciali sponsorizzati (banner di partner del settore: produttori di alimenti, terrari, accessori). Tali contenuti sono direttamente venduti da HerpMarket ai singoli sponsor, sono sempre chiaramente identificati con la dicitura «Sponsor» e non comportano l'uso di pixel di tracciamento, cookie pubblicitari o reti pubblicitarie di terze parti.",
          "HerpMarket si riserva il diritto di introdurre in futuro piani a pagamento o commissioni, dandone comunicazione agli Utenti almeno 30 giorni prima dell'entrata in vigore. In tal caso gli Utenti potranno recedere senza penali entro tale termine.",
        ],
        en: [
          "HerpMarket does not currently charge any commission to Sellers or Buyers. The platform is free to use.",
          "Payments between Buyers and Sellers are processed directly via Stripe Connect: funds flow from the Buyer to the Seller's Stripe account without being held in HerpMarket accounts. HerpMarket never holds User funds and does not operate as a payment service provider under PSD2.",
          "HerpMarket may display sponsored commercial content (banners from industry partners: food, terraria and accessory brands). Such content is sold directly by HerpMarket to individual sponsors, is always clearly identified with a 'Sponsor' label, and does not use tracking pixels, advertising cookies or third-party ad networks.",
          "HerpMarket reserves the right to introduce paid plans or commissions in the future, with at least 30 days' notice to Users. In that case Users may withdraw without penalty within that period.",
        ],
      },
    },
    {
      id: "8", title: { it: "Spedizioni e ritiro", en: "Shipping and pickup" }, review: true,
      body: {
        it: [
          "Sono ammesse tre modalità di consegna: (a) ritiro a mano presso la sede del Venditore; (b) ritiro presso una fiera autorizzata indicata nell'annuncio; (c) spedizione tramite corriere abilitato al trasporto di animali vivi, all'interno del territorio italiano e dell'Unione Europea.",
          "Le spedizioni internazionali all'interno dell'UE sono consentite a condizione che entrambi le parti rispettino le disposizioni TRACES e, ove applicabile, i requisiti CITES per il movimento intra-UE.",
          "Il Venditore è l'unico responsabile di verificare e garantire che il vettore prescelto possieda tutte le licenze e le autorizzazioni veterinarie richieste dalla legge per il trasporto di animali vivi (ivi inclusa, ove necessaria, l'Autorizzazione di Tipo 2 per i viaggi di lunga durata). L'utilizzo di corrieri non autorizzati è vietato e ogni conseguenza ricade esclusivamente sul Venditore. HerpMarket non è in alcun modo responsabile per spedizioni effettuate in violazione della normativa.",
          "Le spedizioni al di fuori dell'UE non sono attualmente supportate dalla piattaforma.",
          "La consegna tramite corriere deve avvenire presso un Hub del corriere e non presso un indirizzo residenziale, per evitare che l'animale resti incustodito in condizioni di temperatura non idonee.",
          "Il Venditore è responsabile dell'imballaggio adeguato dell'Esemplare secondo le linee guida IATA per il trasporto di animali vivi. HerpMarket può sospendere il servizio in condizioni climatiche estreme.",
        ],
        en: [
          "Three delivery modes are allowed: (a) pickup at the Seller's premises; (b) pickup at an authorised expo listed in the ad; (c) shipping by a courier qualified to transport live animals, within Italy and the European Union.",
          "International shipping within the EU is allowed provided both parties comply with TRACES requirements and, where applicable, with CITES rules for intra-EU movement.",
          "The Seller is solely responsible for verifying and ensuring that the selected carrier possesses all licences and veterinary authorisations required by law for the transport of live animals (including, where necessary, the Type 2 Authorisation for long journeys). Use of unauthorised couriers is prohibited and any consequence falls solely on the Seller. HerpMarket is in no way liable for shipments made in breach of the regulations.",
          "Shipping outside the EU is not currently supported by the platform.",
          "Courier delivery must be made to a courier Hub and not to a residential address, to prevent the animal being left unattended in unsuitable temperature conditions.",
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
          "I pagamenti devono essere effettuati esclusivamente tramite il sistema di pagamento integrato della piattaforma (Stripe o provider equivalente), che gestisce il versamento al Venditore come pagamento differito rilasciato alla conferma di consegna.",
          "È espressamente vietato richiedere o effettuare pagamenti al di fuori della piattaforma. Le richieste di pagamento mediante bonifico diretto, PayPal Amici e Familiari, criptovalute o contanti senza fattura sono motivo di sospensione dell'account.",
          "L'Acquirente può versare un acconto del 10% per bloccare l'Esemplare in vista del ritiro in fiera; il saldo è dovuto al momento del ritiro presso lo stand del Venditore. L'acconto non è rimborsabile in caso di mancato ritiro per causa imputabile all'Acquirente.",
        ],
        en: [
          "Payments must be made exclusively via the platform's integrated payment system (Stripe or equivalent provider), which handles the payout to the Seller as a delayed payout released upon handover confirmation.",
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
          "In caso di Esemplare morto all'arrivo (DOA), l'Acquirente deve: (i) notificare il Venditore e HerpMarket entro 2 ore dall'orario di effettiva disponibilità al ritiro risultante dal tracking ufficiale del corriere presso l'Hub; (ii) fornire fotografie e video dell'Esemplare nella sua confezione originale entro 6 ore; (iii) conservare l'Esemplare a temperatura adeguata fino a istruzioni del Venditore.",
          "La garanzia DOA non si applica a: (a) Esemplari ritirati personalmente dall'Acquirente (in fiera o presso il Venditore); (b) consegne ritardate per cause attribuibili al corriere ma il pacco arriva in vita; (c) decessi sopravvenuti dopo l'apertura del pacco.",
        ],
        en: [
          "The Seller guarantees the Specimen's live arrival subject to the following conditions:",
          "(a) shipping is made by a qualified courier on agreed days (typically Monday–Wednesday, holidays excluded);",
          "(b) packaging complies with IATA Live Animal Regulations, with proper insulation and, where needed, compliant heat or cold packs;",
          "(c) delivery is made to the courier's pickup point (Hub) and not to a residential address, unless otherwise agreed in writing.",
          "If the Specimen arrives dead (DOA), the Buyer must: (i) notify the Seller and HerpMarket within 2 hours of the actual pickup-availability time shown by the courier's official tracking at the Hub; (ii) provide photos and video of the Specimen in its original packaging within 6 hours; (iii) keep the Specimen at proper temperature until instructed by the Seller.",
          "The DOA guarantee does NOT apply to: (a) Specimens picked up in person by the Buyer (at expo or at Seller's premises); (b) delayed deliveries where the package nonetheless arrives alive; (c) deaths occurring after the package has been opened.",
        ],
      },
    },
    {
      id: "4", title: { it: "Esemplari non pronti («Not Ready»)", en: "Not-ready specimens" }, review: false,
      body: {
        it: [
          "I Venditori possono indicare un Esemplare come «Non pronto» quando questi è troppo giovane per essere spedito in sicurezza o non ha ancora completato lo svezzamento alimentare.",
          "Per gli Esemplari «Non pronti» il pagamento integrale non può essere richiesto. È ammesso un acconto pari al massimo al 30% del prezzo. L'acconto è elaborato dal provider di pagamento e, qualora il Venditore non consegni l'Esemplare nei termini concordati, è integralmente rimborsabile all'Acquirente secondo il protocollo della piattaforma.",
          "Il saldo è dovuto solo dopo conferma di idoneità alla spedizione/ritiro da parte del Venditore.",
        ],
        en: [
          "Sellers may flag a Specimen as 'Not Ready' when it is too young to ship safely or has not yet completed feeding establishment.",
          "Full payment may not be requested for 'Not Ready' Specimens. A deposit of up to 30% of the price is allowed. The deposit is processed by the payment provider and, should the Seller fail to deliver the Specimen within the agreed terms, is fully refundable to the Buyer under the platform's protocol.",
          "The balance is due only after the Seller confirms readiness for shipping/pickup.",
        ],
      },
    },
    {
      id: "5", title: { it: "Conferma di consegna e documenti", en: "Handover confirmation and documents" }, review: false,
      body: {
        it: [
          "La transazione si considera completata quando entrambe le parti confermano l'avvenuta consegna tramite la piattaforma. Fino a tale conferma, il versamento al Venditore resta sospeso presso il provider di pagamento.",
          "Una volta confermata la consegna da entrambe le parti, HerpMarket genera automaticamente il documento di cessione (CITES per Allegato A/B; certificato di origine per le altre specie). Il documento è disponibile nell'archivio digitale di entrambe le parti.",
          "Il documento generato dalla piattaforma è un ausilio amministrativo. Per le specie CITES, la cessione formale richiede comunque la conservazione dei documenti originali secondo la normativa vigente.",
        ],
        en: [
          "The transaction is deemed completed when both parties confirm handover via the platform. Until such confirmation, the payout to the Seller remains pending with the payment provider.",
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

const PRIVACY_CONTENT = {
  effectiveDate: { it: "1 gennaio 2026", en: "1 January 2026" },
  version: "1.0 (bozza)",
  sections: [
    {
      id: "1", title: { it: "Titolare del trattamento", en: "Data controller" }, review: true,
      body: {
        it: [
          "Titolare del trattamento dei dati personali è [DENOMINAZIONE SOCIETARIA DA INDICARE], P.IVA [DA INDICARE], con sede in [DA INDICARE], Italia, indirizzo email privacy@herpmarket.it.",
          "Per esercitare i tuoi diritti o per qualunque chiarimento sul trattamento dei tuoi dati, puoi contattarci all'indirizzo email indicato. Risponderemo entro 30 giorni, come previsto dall'art. 12 GDPR.",
        ],
        en: [
          "Data controller is [COMPANY NAME TBD], VAT [TBD], registered in [TBD], Italy, email privacy@herpmarket.it.",
          "To exercise your rights or for any clarification, contact us at the email above. We respond within 30 days as required by Art. 12 GDPR.",
        ],
      },
    },
    {
      id: "2", title: { it: "Dati che raccogliamo", en: "Data we collect" }, review: false,
      body: {
        it: [
          "Raccogliamo i seguenti dati personali:",
          "(a) Dati di registrazione: nome o nome visualizzato, indirizzo email, password (memorizzata in forma cifrata mediante hash).",
          "(b) Dati del profilo Venditore (opzionali): regione, città, descrizione dell'attività, specializzazioni, fotografie del profilo.",
          "(c) Dati delle inserzioni: contenuti che pubblichi (annunci, fotografie, messaggi).",
          "(d) Dati di transazione: identificativi delle transazioni concluse tramite la piattaforma. I dati di pagamento (numero carta, IBAN) NON transitano dai nostri server: sono gestiti direttamente da Stripe.",
          "(e) Dati di verifica (solo se richiedi la spunta blu): visura camerale o P.IVA, numero registrazione ASL, documento d'identità.",
          "(f) Dati tecnici: indirizzo IP, tipo di browser, data e ora di accesso, lingua impostata. Questi dati sono raccolti automaticamente per ragioni tecniche e di sicurezza.",
          "(g) Dati di comunicazione: contenuti dei messaggi scambiati con altri Utenti tramite la chat della piattaforma.",
        ],
        en: [
          "We collect the following personal data:",
          "(a) Registration data: name or display name, email address, password (stored hashed).",
          "(b) Seller profile data (optional): region, city, business description, specialties, profile photos.",
          "(c) Listing data: content you publish (ads, photos, messages).",
          "(d) Transaction data: identifiers of transactions completed via the platform. Payment data (card number, IBAN) does NOT pass through our servers: it is handled directly by Stripe.",
          "(e) Verification data (only if you request the blue check): business registration or VAT, ASL registration number, ID document.",
          "(f) Technical data: IP address, browser type, access date/time, language. Collected automatically for technical and security reasons.",
          "(g) Communication data: contents of messages exchanged with other Users via the platform's chat.",
        ],
      },
    },
    {
      id: "3", title: { it: "Finalità e basi giuridiche del trattamento", en: "Purposes and legal bases" }, review: true,
      body: {
        it: [
          "Trattiamo i tuoi dati per le seguenti finalità, sulla base giuridica indicata:",
          "(a) Erogazione del servizio (creazione account, pubblicazione annunci, messaggistica, transazioni): esecuzione del contratto con te (art. 6.1.b GDPR).",
          "(b) Adempimenti di legge (conservazione documenti CITES, comunicazioni alle autorità competenti, prevenzione frodi): obbligo di legge (art. 6.1.c GDPR).",
          "(c) Verifica dell'identità per la spunta blu: consenso esplicito da te fornito al momento del caricamento (art. 6.1.a GDPR).",
          "(d) Sicurezza della piattaforma e prevenzione abusi: nostro legittimo interesse a mantenere il servizio sicuro (art. 6.1.f GDPR).",
          "(e) Invio di comunicazioni di marketing (newsletter su fiere, nuovi annunci): consenso esplicito e separato che puoi revocare in qualsiasi momento (art. 6.1.a GDPR).",
          "(f) Statistiche aggregate e anonime sull'uso del servizio: nostro legittimo interesse a migliorare il prodotto (art. 6.1.f GDPR). Non utilizziamo profilazione individuale.",
        ],
        en: [
          "We process your data for the following purposes, on the legal basis indicated:",
          "(a) Service delivery (account creation, listing publication, messaging, transactions): performance of contract with you (Art. 6.1.b GDPR).",
          "(b) Legal compliance (CITES document retention, communications to authorities, fraud prevention): legal obligation (Art. 6.1.c GDPR).",
          "(c) Identity verification for the blue check: explicit consent given when you upload (Art. 6.1.a GDPR).",
          "(d) Platform security and abuse prevention: our legitimate interest in keeping the service safe (Art. 6.1.f GDPR).",
          "(e) Marketing communications (newsletter on expos, new listings): separate explicit consent, revocable at any time (Art. 6.1.a GDPR).",
          "(f) Aggregate and anonymous service-usage statistics: our legitimate interest in improving the product (Art. 6.1.f GDPR). We do not use individual profiling.",
        ],
      },
    },
    {
      id: "4", title: { it: "Destinatari dei dati (Responsabili esterni)", en: "Data recipients (Processors)" }, review: true,
      body: {
        it: [
          "Per erogare il servizio ci avvaliamo dei seguenti Responsabili del trattamento, ciascuno legato a noi da specifico accordo ai sensi dell'art. 28 GDPR:",
          "• Supabase (Supabase Inc., USA / sede UE Francoforte) — database e autenticazione. I dati restano memorizzati nell'Unione Europea (regione eu-central-1).",
          "• Stripe (Stripe Payments Europe Ltd., Irlanda) — elaborazione pagamenti tra Acquirenti e Venditori. Stripe agisce come titolare autonomo per gli aspetti di propria competenza.",
          "• Vercel (Vercel Inc., USA) — hosting dell'applicazione web. Vercel è certificata sotto il Data Privacy Framework UE-USA.",
          "• [Eventuale provider email transazionale, es. Resend / Postmark — DA INDICARE]",
          "Non vendiamo né condividiamo i tuoi dati personali con terzi per scopi di marketing. I dati possono essere condivisi con le autorità competenti su loro richiesta motivata (es. Polizia Postale, autorità CITES, autorità giudiziaria).",
        ],
        en: [
          "To deliver the service we use the following Processors, each bound by an Art. 28 GDPR data processing agreement:",
          "• Supabase (Supabase Inc., USA / EU seat Frankfurt) — database and authentication. Data is stored in the European Union (eu-central-1 region).",
          "• Stripe (Stripe Payments Europe Ltd., Ireland) — payment processing between Buyers and Sellers. Stripe acts as autonomous controller for its own areas.",
          "• Vercel (Vercel Inc., USA) — web application hosting. Vercel is certified under the EU-US Data Privacy Framework.",
          "• [Possible transactional email provider, e.g. Resend / Postmark — TBD]",
          "We do not sell or share your personal data with third parties for marketing. Data may be shared with competent authorities upon reasoned request (e.g. Postal Police, CITES authorities, judicial authority).",
        ],
      },
    },
    {
      id: "5", title: { it: "Trasferimenti internazionali", en: "International transfers" }, review: true,
      body: {
        it: [
          "I dati personali sono prevalentemente trattati all'interno dello Spazio Economico Europeo. Alcuni Responsabili (Vercel, Supabase) possono trattare dati negli Stati Uniti.",
          "Tali trasferimenti avvengono nel rispetto del GDPR: per Vercel sulla base della certificazione Data Privacy Framework UE-USA; per Supabase mediante Clausole Contrattuali Standard approvate dalla Commissione Europea (Decisione (UE) 2021/914) e misure tecniche aggiuntive.",
        ],
        en: [
          "Personal data is primarily processed within the European Economic Area. Some Processors (Vercel, Supabase) may process data in the United States.",
          "Such transfers comply with GDPR: for Vercel under the EU-US Data Privacy Framework certification; for Supabase via Standard Contractual Clauses approved by the European Commission (Decision (EU) 2021/914) and additional technical measures.",
        ],
      },
    },
    {
      id: "6", title: { it: "Periodo di conservazione", en: "Retention period" }, review: true,
      body: {
        it: [
          "Conserviamo i tuoi dati per i seguenti periodi:",
          "• Dati account attivo: per tutta la durata del rapporto.",
          "• Dati account cancellato: rimossi entro 30 giorni dalla richiesta di cancellazione.",
          "• Documenti relativi a transazioni concluse (CITES, certificati di origine): 10 anni dal completamento della transazione, in forma pseudonimizzata, ai sensi dell'art. 2220 c.c. e degli obblighi specifici di tracciabilità CITES.",
          "• Documenti di verifica (visura, ID): 5 anni dalla cancellazione dell'account, ai sensi della normativa antiriciclaggio dove applicabile.",
          "• Log tecnici di sicurezza: 12 mesi.",
          "• Dati di marketing: fino alla revoca del consenso.",
          "Resta inteso che HerpMarket conserva esclusivamente i log delle transazioni per finalità fiscali e di legge; la conservazione fisica dei documenti CITES validi e di ogni altra documentazione di origine resta obbligo esclusivo del Venditore e dell'Acquirente.",
        ],
        en: [
          "We retain your data for the following periods:",
          "• Active account data: for the entire relationship duration.",
          "• Cancelled account data: removed within 30 days of deletion request.",
          "• Documents related to completed transactions (CITES, origin certificates): 10 years from transaction completion, in pseudonymised form, per art. 2220 of the Italian Civil Code and CITES traceability obligations.",
          "• Verification documents (business registration, ID): 5 years from account deletion, per anti-money-laundering law where applicable.",
          "• Technical security logs: 12 months.",
          "• Marketing data: until consent withdrawal.",
          "For clarity, HerpMarket retains only transaction logs for tax and legal purposes; the physical preservation of valid CITES documents and any other origin paperwork remains the sole obligation of the Seller and the Buyer.",
        ],
      },
    },
    {
      id: "7", title: { it: "I tuoi diritti", en: "Your rights" }, review: false,
      body: {
        it: [
          "Ai sensi degli artt. 15-22 del GDPR hai i seguenti diritti:",
          "• Accesso (art. 15): ottenere conferma dell'esistenza di dati che ti riguardano e riceverne copia.",
          "• Rettifica (art. 16): correggere dati inesatti o integrare dati incompleti.",
          "• Cancellazione (art. 17 — «diritto all'oblio»): ottenere la cancellazione dei tuoi dati, salvo gli obblighi legali di conservazione sopra indicati.",
          "• Limitazione (art. 18): chiedere la sospensione del trattamento.",
          "• Portabilità (art. 20): ricevere i tuoi dati in formato strutturato e leggibile da macchina (JSON).",
          "• Opposizione (art. 21): opporti al trattamento basato su legittimo interesse o per fini di marketing.",
          "• Revoca del consenso (art. 7): in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente.",
          "• Reclamo: presentare reclamo all'Autorità Garante per la protezione dei dati personali (www.garanteprivacy.it).",
          "Puoi esercitare i diritti di accesso, portabilità e cancellazione direttamente dalle impostazioni dell'app. Per gli altri diritti contattaci a privacy@herpmarket.it.",
        ],
        en: [
          "Under Arts. 15-22 GDPR you have the following rights:",
          "• Access (Art. 15): obtain confirmation of data concerning you and receive a copy.",
          "• Rectification (Art. 16): correct inaccurate data or complete incomplete data.",
          "• Erasure (Art. 17 — 'right to be forgotten'): obtain deletion of your data, subject to the legal retention obligations above.",
          "• Restriction (Art. 18): request processing suspension.",
          "• Portability (Art. 20): receive your data in structured, machine-readable form (JSON).",
          "• Objection (Art. 21): object to legitimate-interest processing or marketing.",
          "• Consent withdrawal (Art. 7): at any time, without affecting prior lawfulness.",
          "• Complaint: to the Italian Data Protection Authority (www.garanteprivacy.it).",
          "You can exercise access, portability and erasure rights directly from app settings. For other rights contact privacy@herpmarket.it.",
        ],
      },
    },
    {
      id: "8", title: { it: "Cookie e tecnologie simili", en: "Cookies and similar technologies" }, review: false,
      body: {
        it: [
          "HerpMarket usa esclusivamente:",
          "• Cookie tecnici essenziali (es. sessione di login, preferenza lingua). Non richiedono consenso ai sensi del Provvedimento Garante n. 231/2021.",
          "• Vercel Analytics in modalità privacy-friendly: misura aggregata del traffico senza tracking individuale, senza cookie di terze parti, senza fingerprinting. Su tua richiesta puoi disattivarlo dalle impostazioni.",
          "Non utilizziamo cookie pubblicitari, di profilazione o di tracciamento cross-site. Non utilizziamo Google Analytics, pixel di social network o sistemi di retargeting.",
          "Gli eventuali banner sponsorizzati visibili sulla piattaforma sono semplici immagini collegate a un link, gestite direttamente da HerpMarket. Non sono erogati tramite reti pubblicitarie né contengono codice di tracciamento di terze parti.",
        ],
        en: [
          "HerpMarket uses only:",
          "• Essential technical cookies (e.g. login session, language preference). No consent required under Garante Decision 231/2021.",
          "• Vercel Analytics in privacy-friendly mode: aggregate traffic measurement without individual tracking, without third-party cookies, without fingerprinting. You can turn it off in settings on request.",
          "We do not use advertising, profiling or cross-site tracking cookies. We do not use Google Analytics, social-network pixels or retargeting systems.",
          "Any sponsored banners on the platform are plain images linked to a URL, managed directly by HerpMarket. They are not served through ad networks and contain no third-party tracking code.",
        ],
      },
    },
    {
      id: "9", title: { it: "Sicurezza dei dati", en: "Data security" }, review: false,
      body: {
        it: [
          "Adottiamo misure di sicurezza tecniche e organizzative adeguate, tra cui: cifratura in transito (HTTPS/TLS), cifratura a riposo del database, hash delle password (algoritmo bcrypt o equivalente), accessi al database limitati e tracciati, segmentazione dei dati tramite Row Level Security, backup giornalieri.",
          "In caso di violazione di dati personali che comporti un rischio per i tuoi diritti, notificheremo l'Autorità Garante entro 72 ore e comunicheremo agli Utenti interessati senza ingiustificato ritardo, come previsto dagli artt. 33-34 GDPR.",
        ],
        en: [
          "We adopt adequate technical and organisational security measures including: encryption in transit (HTTPS/TLS), database encryption at rest, password hashing (bcrypt or equivalent), restricted and audited database access, data segmentation via Row Level Security, daily backups.",
          "In case of a personal data breach posing a risk to your rights, we will notify the Authority within 72 hours and inform affected Users without undue delay, per Arts. 33-34 GDPR.",
        ],
      },
    },
    {
      id: "10", title: { it: "Dati di minori", en: "Minors' data" }, review: false,
      body: {
        it: [
          "Il servizio non è destinato a minori di 18 anni. Non raccogliamo consapevolmente dati di minori.",
          "Se vieni a conoscenza del fatto che un minore abbia fornito dati personali alla piattaforma, contattaci a privacy@herpmarket.it e procederemo alla cancellazione immediata.",
        ],
        en: [
          "The service is not intended for minors under 18. We do not knowingly collect minors' data.",
          "If you become aware that a minor has provided personal data to the platform, contact privacy@herpmarket.it and we will delete it immediately.",
        ],
      },
    },
    {
      id: "11", title: { it: "Modifiche alla Privacy Policy", en: "Changes to this Privacy Policy" }, review: false,
      body: {
        it: [
          "Possiamo aggiornare questa Privacy Policy in caso di modifiche normative, organizzative o tecniche. La versione vigente è sempre disponibile in questa pagina con la data di entrata in vigore.",
          "Modifiche sostanziali ai trattamenti saranno notificate agli Utenti registrati via email con almeno 30 giorni di anticipo, e potrai opporti o cancellare l'account prima della loro applicazione.",
        ],
        en: [
          "We may update this Privacy Policy due to regulatory, organisational or technical changes. The current version is always available on this page with the effective date.",
          "Substantial changes to processing will be notified to registered Users by email at least 30 days in advance, and you may object or delete your account before they take effect.",
        ],
      },
    },
    {
      id: "12", title: { it: "Contatti", en: "Contacts" }, review: false,
      body: {
        it: [
          "Per qualunque questione relativa al trattamento dei tuoi dati personali, contattaci a privacy@herpmarket.it.",
          "Hai inoltre il diritto di rivolgerti al Garante per la protezione dei dati personali (Piazza Venezia 11, 00187 Roma — www.garanteprivacy.it).",
        ],
        en: [
          "For any questions about the processing of your personal data, contact privacy@herpmarket.it.",
          "You also have the right to contact the Italian Data Protection Authority (Piazza Venezia 11, 00187 Rome — www.garanteprivacy.it).",
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

function PrivacyPolicy({ t, go, lang }) {
  return <LegalDoc doc={PRIVACY_CONTENT} title="Privacy Policy" t={t} go={go} lang={lang} />;
}

/* ═══════════════════════════════════════════════════════════════════
   PLANS SCREEN — placeholder for future paid seller subscriptions.
   Not yet linked from the main nav; reachable via /plans route.
   Activate links to it once you actually have plans to sell.
   ═════════════════════════════════════════════════════════════════ */
function PlansScreen({ t, go, lang }) {
  return (
    <div className="max-w-xl mx-auto w-full pb-16">
      <header className="px-5 md:px-8 pt-8 pb-4 border-b border-stone-800 flex items-center gap-3">
        <button onClick={() => go("profile")} className="text-stone-300 hover:text-stone-100"><ChevronLeft size={20} /></button>
        <h1 className="font-display text-2xl text-stone-50 tracking-tight">{t.plansLabel}</h1>
      </header>

      <div className="p-5 md:p-8">
        {/* Current state: free for all */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-amber-500/10 ring-1 ring-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <CheckCircle size={20} className="text-emerald-400" />
            <h2 className="font-display text-xl text-stone-50">
              {lang === "it" ? "HerpMarket è gratuito" : "HerpMarket is free"}
            </h2>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">{t.plansComingSoon}</p>
          <p className="text-xs text-stone-400 leading-relaxed mt-3">{t.plansDescription}</p>
        </div>

        {/* Preview of future tiers (greyed out — informational only) */}
        <div className="mt-6 space-y-3 opacity-60">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            {lang === "it" ? "Anteprima (non ancora attiva)" : "Preview (not yet active)"}
          </div>
          <PlanCard
            name={lang === "it" ? "Allevatore Pro" : "Pro Breeder"}
            price={lang === "it" ? "Prezzo da definire" : "Price TBD"}
            features={lang === "it" ? [
              "Annunci illimitati",
              "Pagina negozio personalizzata",
              "Posizionamento prioritario in ricerca",
              "Statistiche dettagliate",
            ] : [
              "Unlimited listings",
              "Custom store page",
              "Priority placement in search",
              "Detailed analytics",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function PlanCard({ name, price, features }) {
  return (
    <div className="bg-stone-900/60 ring-1 ring-stone-800 rounded-xl p-5">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display text-lg text-stone-50">{name}</h3>
        <span className="font-display text-sm text-amber-400">{price}</span>
      </div>
      <ul className="space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="text-xs text-stone-300 flex items-start gap-2">
            <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SPONSOR SLOT — renders a direct-sold sponsor card if one is active
   for the requested slot. Renders NOTHING (null) if no sponsor is
   available — so the UI stays clean until you sell a slot.

   Wire-up notes:
   - Backed by the `sponsors` table (see 05_monetization.sql).
   - Replace `useActiveSponsor` body to fetch via Supabase once wired:
       const { data } = await supabase.from('sponsors').select('*')
         .eq('slot', slot).eq('active', true)
         .lte('starts_at', new Date().toISOString())
         .or('ends_at.is.null,ends_at.gt.' + new Date().toISOString())
         .limit(1).maybeSingle();
   - Each sponsor row carries its own image + click_url. No third-party
     scripts. No tracking pixels. No GDPR overhead beyond what's already
     disclosed in the Privacy Policy.
   ═════════════════════════════════════════════════════════════════ */
function useActiveSponsor(slot) {
  const [sponsor, setSponsor] = useState(null);
  useEffect(() => {
    // TODO: wire to Supabase. For now returns null so nothing renders.
    setSponsor(null);
  }, [slot]);
  return sponsor;
}

function SponsorSlot({ slot, t, lang }) {
  const sponsor = useActiveSponsor(slot);
  if (!sponsor) return null;
  return (
    <a href={sponsor.click_url} target="_blank" rel="noopener noreferrer sponsored"
       className="block group">
      <div className="relative rounded-xl overflow-hidden ring-1 ring-stone-800 hover:ring-amber-500/40 transition-all">
        <img src={sponsor.image_url} alt={sponsor.alt_text || sponsor.name}
             className="w-full h-auto object-cover" />
        {/* Disclosure label (Italian Codice del Consumo art. 23 and Garante
            guidelines require clear identification of paid commercial content) */}
        <span className="absolute top-2 right-2 bg-stone-950/80 backdrop-blur ring-1 ring-stone-700/50
                         text-[9px] font-black uppercase tracking-widest text-stone-300 px-2 py-0.5 rounded">
          {t.sponsorLabel}
        </span>
      </div>
    </a>
  );
}
