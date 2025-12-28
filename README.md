# 🏋️ SmartFit - Fitness Tracker App

> Un'applicazione completa per il tracciamento di alimentazione, idratazione e allenamenti, costruita con Angular 15 e Tailwind CSS.

[![Angular](https://img.shields.io/badge/Angular-15-red?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📱 Overview

SmartFit è un fitness tracker moderno e intuitivo che ti permette di monitorare:
- 🍽️ **Pasti e Calorie** - Traccia macro e micronutrienti
- 💧 **Idratazione** - Monitora l'assunzione giornaliera di acqua
- 💪 **Allenamenti** - Registra esercizi, serie, ripetizioni e carichi
- 📊 **Progressi** - Visualizza statistiche settimanali e mensili

### ✨ Features Principali

- ✅ **Dark Mode** - Supporto completo per tema chiaro e scuro
- ✅ **Persistenza Dati** - Tutti i dati salvati in localStorage
- ✅ **Export/Import** - Backup e ripristino dati in formato JSON
- ✅ **Calendario Funzionante** - Naviga tra i giorni e visualizza dati storici
- ✅ **Design Moderno** - UI/UX ispirata alle migliori app fitness
- ✅ **Responsive** - Ottimizzata per dispositivi mobili

## 🚀 Quick Start

### Prerequisiti

- Node.js (v14 o superiore)
- npm o yarn

### Installazione

```bash
# Clona la repository
git clone https://github.com/tuousername/SmartFit.git

# Entra nella directory
cd SmartFit

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

L'app sarà disponibile su `http://localhost:4200`

### Build per Produzione

```bash
# Build ottimizzata
npm run build

# Build per Android (Capacitor)
npm run build:android
```

## 🎨 Screenshots

### Dashboard
La dashboard principale mostra il riepilogo giornaliero con:
- Progress ring delle calorie
- Macronutrienti (Proteine, Carboidrati, Grassi)
- Lista pasti
- Idratazione
- Allenamenti del giorno

### Allenamento
Pagina dedicata per tracciare:
- Esercizi con serie, ripetizioni e pesi
- Timer di riposo
- Statistiche volume/durata/calorie

### Report
Visualizza i tuoi progressi con:
- Grafici settimanali/mensili
- Statistiche alimentazione
- Trend idratazione
- Performance allenamenti

## 🛠️ Tecnologie

### Frontend
- **Angular 15** - Framework principale
- **TypeScript** - Linguaggio type-safe
- **Tailwind CSS** - Styling utility-first
- **RxJS** - Programmazione reattiva

### Fonts & Icons
- **Google Fonts** - Manrope & Noto Sans
- **Material Symbols** - Set di icone moderne

### Storage
- **localStorage** - Persistenza dati lato client
- **JSON Export/Import** - Backup e migrazione dati

### Build & Deploy
- **Angular CLI** - Tooling e build
- **Capacitor** - Deploy nativo per Android/iOS

## 📁 Struttura Progetto

```
SmartFit/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── meal.model.ts
│   │   │   │   ├── hydration.model.ts
│   │   │   │   └── workout.model.ts
│   │   │   └── services/        # Business logic
│   │   │       ├── storage.service.ts
│   │   │       ├── theme.service.ts
│   │   │       ├── date.service.ts
│   │   │       ├── meal.service.ts
│   │   │       ├── hydration.service.ts
│   │   │       └── workout.service.ts
│   │   ├── features/            # Feature modules
│   │   │   ├── dashboard/
│   │   │   ├── meals/
│   │   │   ├── hydration-workout/
│   │   │   ├── reports/
│   │   │   ├── workout-details/
│   │   │   └── profile/
│   │   ├── shared/              # Componenti condivisi
│   │   │   └── components/
│   │   │       └── bottom-navbar/
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── styles.css
│   └── index.html
├── tailwind.config.js
└── package.json
```

## 🎯 Roadmap

### ✅ Completato (v1.0)
- [x] Dashboard con riepilogo giornaliero
- [x] Tracciamento idratazione
- [x] Lista allenamenti con stati
- [x] Dark mode
- [x] Calendario funzionante
- [x] Persistenza localStorage
- [x] Export/Import dati
- [x] Report settimanali/mensili
- [x] Dettagli allenamento con timer

### 🚧 In Sviluppo (v1.1)
- [ ] Pagina pasti completa con form
- [ ] Database alimenti
- [ ] Grafici interattivi (Chart.js)
- [ ] Notifiche push
- [ ] Sync cloud (Firebase)

### 🔮 Futuro (v2.0)
- [ ] App nativa (iOS/Android)
- [ ] Integrazione fotocamera per riconoscimento alimenti
- [ ] Social features e sfide
- [ ] Integrazione wearable devices
- [ ] AI per suggerimenti personalizzati

## 🎨 Theme Customization

Il tema è configurabile in `tailwind.config.js`:

```javascript
colors: {
  "primary": "#13ec5b",        // Verde brillante
  "background-light": "#f6f8f6",
  "background-dark": "#0a0f0d",
  "card-light": "#ffffff",
  "card-dark": "#1a2822",
  // ...
}
```

## 📝 License

Questo progetto è distribuito sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per maggiori dettagli.

## 👨‍💻 Autore

**Angelo**
- Email: angelo.nicolaci.commerciale@gmail.com

## 🤝 Contribuire

I contributi sono benvenuti! Per favore:

1. Forka il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha il branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 🙏 Ringraziamenti

- Ispirato dalle migliori app di fitness tracking come Yazio e MyFitnessPal
- UI/UX design basato su principi moderni di Material Design
- Community Angular per il supporto e documentazione

---

<div align="center">
  <strong>Fatto con ❤️ e Angular</strong>
</div>
