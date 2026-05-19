import { Location, CommunityPost } from '@/types';

/**
 * Static data for all 6 storytelling locations around Piata Romana, Bucharest.
 * Coordinates are exact GPS positions: [latitude, longitude]
 */
export const locations: Location[] = [
  {
    id: 'tucano-coffee',
    name: 'Tucano Coffee Piata Romana',
    coordinates: [44.44795, 26.09973],
    category: 'cafe',
    source: 'official',
    iconEmoji: '☕',
    imageUrls: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/f7/9f/85/tucano-coffee.jpg?w=500&h=-1&s=1',
      'https://d2fdt3nym3n14p.cloudfront.net/venue/802/gallery/2037/conversions/image1-big.jpg',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/53/d8/bf/caption.jpg?w=1100&h=1100&s=1',
      'https://www.francize.ro/wp-content/uploads/2015/08/Cafenea-Tucano-Coffee-Piata-Romana-Bucuresti-3.jpg',
    ],
    current:
      'Un café modern, frecventat de studenții ASE și de remote workers. Spațiul vibrează cu energie creativă, laptopuri deschise și arome de specialty coffee.',
    historical:
      'În secolul al XIX-lea, această zonă marca periferia orașului, cu case joase, grădini și mahalale urbane. Era un spațiu de tranziție între Bucureștiul construit și câmpul deschis.',
    funFact:
      'Cunoscut pentru stilul său boem, Tucano a transformat spațiul într-un hub social extrem de activ, devenind un simbol al noii culturi urbane bucureștene post-2010.',
    sourceUrl: 'https://ro.wikipedia.org/wiki/Pia%C8%9Ba_Roman%C4%83',
  },
  {
    id: 'pizza-hut',
    name: 'Pizza Hut Piata Romana',
    coordinates: [44.44681, 26.09865],
    category: 'restaurant',
    source: 'official',
    iconEmoji: '🍕',
    imageUrls: [
      'https://www.trendshrb.ro/wp-content/uploads/Pizza-Hut-Aniversare-25-de-ani.jpg',
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE3ERWHwolJl3ss9UBtG2UA2Mhlm1W33rJuc_nD6YN0PFEzBNYNf1eAlByLJnGyhQ2Eq4Ryiz1dicMekfucCgeIAG3JUt0o_zRzN85EgZDdNf9PyaizG8ndE_0zwvBZhz6yTPY4=s680-w680-h510',
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFUc5dUHXUk4A3QKsAakHjDPvis2F27fR2MVsiMQZoVISrpdwlPyNcJ7KcZTBY9vTgRhqa50qLpAqIONlGtcEvRorwKwu11OURMH4haSCjjhH3t_4roUQSa7E3Os0z5-YbXFignH2S2qV9t=s680-w680-h510',
    ],
    current:
      'Restaurant fast-food și un punct de întâlnire popular pentru studenți, turiști și localnici. Un reper vizual inconfundabil al pieței.',
    historical:
      'Zona Magheru interbelică era una dintre cele mai elegante din București — adăpostea cinematografe, restaurante chic și clădiri moderniste avangardiste care rivaliza cu Parisul.',
    funFact:
      'Deschis în 1994, a fost unul dintre primele branduri occidentale majore care au intrat în România după căderea comunismului. Cozile la deschidere se întindeau pe zeci de metri.',
    sourceUrl: 'https://ro.wikipedia.org/wiki/Calea_Victoriei',
  },
  {
    id: 'ase-madgearu',
    name: 'ASE — Clădirea Virgil Madgearu',
    coordinates: [44.44782, 26.09880],
    category: 'university',
    source: 'official',
    iconEmoji: '🎓',
    imageUrls: [
      'https://admitere.ase.ro/images/ase/thumbs/Cladirea-Mihai-Eminescu-intrare.jpg',
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHMerI1ID2DVqKLCyJ3nrtpqe7A1lwa6-CTwccA4tMWqSBsFbKESxBgdulCyxKnY2J6cI6advsBhPamOke-hsxJUm5H42Uj8O7a6SMhqF1v6paHAIhEbXxKsyNjHsmM60sJt1EUCQ=s680-w680-h510',
      'https://admitere.ase.ro/images/ase/thumbs/Cladirea-Virgil-Madgearu.jpg',
    ],
    current:
      'Clădire importantă a ASE București, utilizată în principal de Facultatea de Cibernetică, Statistică și Informatică Economică. Dotată cu laboratoare IT de înaltă tehnologie.',
    historical:
      'Zona Dorobanți-Romana era cândva o zonă rezidențială la marginea orașului vechi — o tranziție liniștită între Bucureștiul dens și suburbiile verzi.',
    funFact:
      'Numită după Virgil Madgearu, un proeminent economist interbelic asasinat în 1940. Clădirea a fost recent modernizată cu laboratoare IT finanțate din fonduri europene.',
    sourceUrl: 'https://ro.wikipedia.org/wiki/Virgil_Madgearu',
  },
  {
    id: 'ase-angelescu',
    name: 'ASE — Clădirea Ion N. Angelescu',
    coordinates: [44.44769, 26.09692],
    category: 'university',
    source: 'official',
    iconEmoji: '🏛️',
    imageUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Cladirea_ASE_Bucuresti.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbEX5Qa7ry1OX5T6ofibDurV9DnQyX_KrW2A&s',
      'https://economedia.ro/wp-content/uploads/2024/09/ASE-Cladire-noua-Nanu-Muscel.jpg',
    ],
    current:
      'Clădirea principală a ASE București și un simbol iconic al universității. Sediul rectoratului și al principalelor amfiteatre.',
    historical:
      'Construcția sa a transformat zona într-un centru educațional major în timpul expansiunii rapide a Bucureștiului la începutul secolului XX, atrăgând elite intelectuale din toată țara.',
    funFact:
      'Universitatea a fost fondată în 1913 prin decret regal al lui Carol I. Este una dintre cele mai vechi instituții de învățământ economic din Europa de Est.',
    sourceUrl: 'https://ro.wikipedia.org/wiki/Academia_de_Studii_Economice_din_Bucure%C8%99ti',
  },
  {
    id: 'piata-romana-hub',
    name: 'Piața Romană — Hub Istoric',
    coordinates: [44.44583, 26.09731],
    category: 'landmark',
    source: 'official',
    iconEmoji: '📍',
    imageUrls: [
      'https://visitbucharest.today/wp-content/uploads/2025/08/Piata-Romana-Roman-Square-Bucharest.jpg',
      'https://bucurestiulmeudrag.ro/img/photos/s1920/5800067d-76cc-4ea9-8122-d4fb592b13d5.jpg',
      'https://www.imagist.ro/wp-content/uploads/2015/02/piata-romana-9.jpg',
    ],
    current:
      'Una dintre cele mai aglomerate intersecții din București, un nod central al transportului public și un punct de referință urban esențial.',
    historical:
      'Piața Romană a fost martoră la urbanizarea accelerată a Bucureștiului — de la o câmpie la periferia orașului în secolul XIX, la o intersecție cosmopolită în secolul XX.',
    funFact:
      'Numele pieței comemorează Proclamația de la Islaz din 1848, un moment cheie al revoluției române. Statuia centrală supraveghează în tăcere milioane de trecători anual.',
    sourceUrl: 'https://ro.wikipedia.org/wiki/Pia%C8%9Ba_Roman%C4%83',
  },
  {
    id: 'silence-pub',
    name: 'Silence Pub Piața Romană',
    coordinates: [44.44965, 26.09646],
    category: 'pub',
    source: 'official',
    iconEmoji: '🍺',
    imageUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK2aYoZeRe24YfBgbwgnEIBwU4C8314mq1Zw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIIDtSqCrpaF6NC_hkUCYhx1c9k5g-AjIMgA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxFOpd_udohjxGtWunrEagULi7u_XoePbuJA&s',
    ],
    current:
      'Classic underground pub frecventat cu precădere de studenții ASE. O atmosferă caldă, muzică bună și prețuri accesibile.',
    historical:
      'Spațiile de subsol din această zonă adăposteau adesea depozite sau mici ateliere meșteșugărești înainte de boomul comercial al anilor 2000.',
    funFact:
      'A rămas un pilon al vieții de noapte studențești timp de peste un deceniu, supraviețuind schimbărilor majore din cartier — o raritate în Bucureștiul în continuă transformare.',
    sourceUrl: 'https://ro.wikipedia.org/wiki/Pia%C8%9Ba_Roman%C4%83',
  },
];

/**
 * Seed community posts — used as the initial localStorage value on first visit.
 */
export const seedCommunityPosts: CommunityPost[] = [
  {
    id: 'post-andrei',
    name: 'Andrei',
    story:
      'Țin minte când ne strângeam toți la gura de metrou de la Romană înainte de examene. Locul ăsta are o energie aparte dimineața.',
    tag: 'Metrou Piața Romană',
    createdAt: '2026-05-18T08:30:00Z',
    source: 'community',
  },
  {
    id: 'post-maria',
    name: 'Maria',
    story:
      'Bunicul meu îmi povestea că pe bulevardul Magheru erau cele mai elegante cinematografe. Acum e doar trafic, dar când te uiți la clădirile de sus, încă se vede arhitectura interbelică.',
    tag: 'Bulevardul Magheru',
    createdAt: '2026-05-17T14:15:00Z',
    source: 'community',
  },
];

/** Geographic center of Piata Romana for map initialization */
export const MAP_CENTER: [number, number] = [44.44769, 26.09731];
export const MAP_ZOOM = 17;
