# Povestea Pieței Romane

**O aplicație web interactivă de storytelling urban pentru Piața Romană, București.**

Descopera istoria ascunsa a unuia dintre cele mai importante noduri urbane din capitală — prin povești ale comunității și o hartă interactivă cu repere istorice și contemporane.

---

## 📖 Despre Proiect

„Povestea Pieței Romane" este un MVP (Minimum Viable Product) construit ca aplicație educațională și comunitară. Ea combină:

- Un **feed social** unde utilizatorii pot citi și contribui cu amintiri și povești despre Piața Romană
- O **hartă interactivă** cu 6 locuri marcate, fiecare cu descriere actuală, context istoric și un fapt surprinzător

Aplicația este **100% serverless** — nu există baze de date, API-uri externe sau autentificare. Toate datele sunt statice și gestionate în cod TypeScript. Formularele sunt gestionate exclusiv pe client (fără request-uri de rețea).

---

## 🗺️ Pagini & Funcționalități

### `/` — Feed (Pagina principală)
- **Header sticky** cu titlul aplicației
- **Banner „Explorează Harta Interactivă"** — link rapid către `/map`
- **Formular de contribuție** inline (Nume + Poveste + Link imagine opțional)
  - La submit: mesaj de succes *„Mulțumim! Povestea ta va fi verificată înainte de publicare."* — fără niciun request de rețea
  - Postările noi apar instant în feed (state local React)
- **Secțiunea „Povești din comunitate"** — carduri cu postările utilizatorilor (avatar, dată, tag de locație)
- **Secțiunea „Locuri cu istorie"** — carduri pentru fiecare dintre cele 6 locații, cu descriere curentă, fundal istoric și „Știai că..."

### `/map` — Harta Interactivă
- Hartă **full-screen** centrată pe Piața Romană (OpenStreetMap, fără API key)
- **6 markere personalizate** cu emoji și animație de puls la selecție
- **Buton „← Înapoi la Povești"** în colțul stânga-sus
- Click pe marker → **Bottom Sheet** pe mobil / **Side Panel** pe desktop, cu povestea completă a locului

---

## 🏛️ Locații incluse

| # | Locație | Coordonate GPS | Categorie |
|---|---|---|---|
| 1 | Tucano Coffee Piața Romană | 44.44795, 26.09973 | ☕ Cafenea |
| 2 | Pizza Hut Piața Romană | 44.44681, 26.09865 | 🍕 Restaurant |
| 3 | ASE — Clădirea Virgil Madgearu | 44.44782, 26.09880 | 🎓 Universitate |
| 4 | ASE — Clădirea Ion N. Angelescu | 44.44769, 26.09692 | 🏛️ Universitate |
| 5 | Piața Romană — Hub Istoric | 44.44583, 26.09731 | 📍 Reper Istoric |
| 6 | Silence Pub Piața Romană | 44.44965, 26.09646 | 🍺 Pub |

---

## 🛠️ Stack Tehnologic

| Tehnologie | Versiune | Rol |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.x (App Router) | Framework principal |
| [React](https://react.dev) | 19.x | UI & state management |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Stilizare |
| [react-leaflet](https://react-leaflet.js.org) | 5.x | Hartă interactivă |
| [Leaflet](https://leafletjs.com) | 1.9.x | Motor hartă |
| [framer-motion](https://www.framer.com/motion/) | 12.x | Animații (Bottom Sheet, Side Panel) |
| [lucide-react](https://lucide.dev) | latest | Iconițe |

**Tile provider:** OpenStreetMap (fără API key necesar)

---

## 🚀 Cum rulezi aplicația

### Cerințe prealabile

- **Node.js** ≥ 18.x — [descarcă de aici](https://nodejs.org/)
- **npm** ≥ 9.x (inclus cu Node.js)

### 1. Clonează repository-ul

```bash
git clone <url-repository>
cd pps-project
```

### 2. Instalează dependințele

```bash
npm install
```

### 3. Pornește serverul de dezvoltare

```bash
npm run dev
```

Aplicația va fi disponibilă la **[http://localhost:3000](http://localhost:3000)**.

---

## 📦 Comenzi disponibile

| Comandă | Descriere |
|---|---|
| `npm run dev` | Pornește serverul de dezvoltare cu hot-reload |
| `npm run build` | Compilează aplicația pentru producție |
| `npm run start` | Pornește serverul de producție (necesită `build` anterior) |
| `npm run lint` | Rulează ESLint pe întregul proiect |

---

## 🗂️ Structura Proiectului

```
pps-project/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: font Inter, metadata SEO, viewport
│   │   ├── page.tsx            # Pagina Feed (/)
│   │   ├── globals.css         # Tailwind v4, @theme, stiluri markere, overrides Leaflet
│   │   └── map/
│   │       └── page.tsx        # Pagina Hartă (/map)
│   │
│   ├── components/
│   │   ├── MapView.tsx         # Hartă Leaflet (dynamic import, SSR dezactivat)
│   │   ├── StoryCard.tsx       # Card detaliat loc (folosit în Side Panel / Bottom Sheet)
│   │   ├── FeedStoryCard.tsx   # Carduri feed: CommunityPostCard + LocationStoryCard
│   │   ├── BottomSheet.tsx     # Drawer mobil cu animație spring
│   │   ├── SidePanel.tsx       # Panou lateral desktop
│   │   ├── FloatingHeader.tsx  # Pill titlu flotant (hartă)
│   │   └── FabButton.tsx       # Floating Action Button (neutilizat activ în v2)
│   │
│   ├── data/
│   │   └── locations.ts        # 6 locații statice + 2 postări mock comunitate
│   │
│   ├── types/
│   │   └── index.ts            # Interfețe TypeScript: Location, CommunityPost, etc.
│   │
│   └── hooks/
│       └── useMediaQuery.ts    # Hook SSR-safe pentru detectarea breakpoint-urilor
│
├── public/                     # Resurse statice
├── next.config.ts              # Configurare Next.js
├── tailwind.config.ts          # (gestionat prin @theme în globals.css — Tailwind v4)
├── tsconfig.json               # Configurare TypeScript
└── package.json
```

---

## 🏗️ Arhitectură & Decizii Tehnice

### Import dinamic pentru Leaflet
Leaflet accesează `window` și `document` la inițializare, ceea ce provoacă erori în mediul SSR al Next.js. `MapView` este importat cu:
```ts
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });
```
Acest lucru asigură că Leaflet rulează exclusiv în browser.

### Date statice TypeScript
Nu există baze de date sau API-uri. Toate locațiile și postările sunt definite în `src/data/locations.ts` ca array-uri TypeScript exportate, tipizate strict cu interfețele din `src/types/index.ts`.

### Formulare client-side only
Formularul de contribuție nu face niciun request de rețea. La submit:
1. `e.preventDefault()` — blochează comportamentul implicit
2. Postarea nouă este adăugată în state local React via `setPosts()`
3. Se afișează mesajul de succes

### Layout responsiv
`useMediaQuery('(min-width: 1024px)')` (hook SSR-safe, default `false`) comută între `BottomSheet` pe mobil și `SidePanel` pe desktop. Default-ul `false` previne layout shift la hidratare.

### Tailwind v4
Proiectul folosește Tailwind CSS v4, configurat exclusiv prin blocul `@theme` din `globals.css` (nu există `tailwind.config.js`):
```css
@theme {
  --font-sans: var(--font-inter), system-ui, sans-serif;
}
```

---

## ➕ Cum adaugi un loc nou

1. Deschide `src/data/locations.ts`
2. Adaugă un nou obiect în array-ul `locations[]`, respectând interfața `Location`:

```ts
{
  id: 'id-unic-slug',
  name: 'Numele Locului',
  coordinates: [44.XXXXX, 26.XXXXX], // [latitudine, longitudine]
  category: 'cafe', // 'cafe' | 'restaurant' | 'university' | 'landmark' | 'pub'
  iconEmoji: '🏪',
  current: 'Descriere actuală...',
  historical: 'Context istoric...',
  funFact: 'Fapt surprinzător...',
  sourceUrl: 'https://link-sursa.ro', // opțional
}
```

3. Salveaza — harta și feed-ul se actualizează automat.

---

## 🚢 Deploy

### Vercel (recomandat)

```bash
npm install -g vercel
vercel
```

Sau conectează repository-ul direct la [vercel.com](https://vercel.com) pentru deploy automat la fiecare push pe `main`.

### Build static local

```bash
npm run build
npm run start
```

Aplicația nu necesită variabile de mediu, servere de baze de date sau servicii externe.

---

## 📝 Licență

Proiect academic / educațional. Datele istorice sunt preluate din surse publice (Wikipedia, patrimoniu cultural).
