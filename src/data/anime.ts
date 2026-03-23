// =============================================================================
// WatchCrew - Anime Database Seed Data
// =============================================================================

import type { AnimeSeries, Arc } from '@/types';

// =============================================================================
// Anime Database
// =============================================================================

export const animeDatabase: AnimeSeries[] = [
  // ---------------------------------------------------------------------------
  // 1. One Piece
  // ---------------------------------------------------------------------------
  {
    id: 'one-piece',
    title: 'One Piece',
    slug: 'one-piece',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/12/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/12/cover_image/large-3e72f400a87b5241780c5082f0582611.jpeg',
    totalEpisodes: 1122,
    totalCanonEpisodes: 900,
    status: 'airing',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Shounen'],
    description:
      'Monkey D. Luffy sets out on a grand adventure to find the legendary treasure One Piece and become the King of the Pirates. Along the way he assembles a diverse crew of pirates, each with their own dreams, as they sail the Grand Line facing powerful enemies and uncovering the mysteries of the world. With its sprawling world-building and heartfelt storytelling, One Piece is one of the longest-running and most beloved anime of all time.',
    arcs: [
      // East Blue Saga
      { name: 'Romance Dawn', startEp: 1, endEp: 3, isFiller: false },
      { name: 'Orange Town', startEp: 4, endEp: 8, isFiller: false },
      { name: 'Syrup Village', startEp: 9, endEp: 18, isFiller: false },
      { name: 'Baratie', startEp: 19, endEp: 30, isFiller: false },
      { name: 'Arlong Park', startEp: 31, endEp: 44, isFiller: false },
      { name: 'Loguetown', startEp: 45, endEp: 53, isFiller: false },
      { name: 'Warship Island', startEp: 54, endEp: 61, isFiller: true },
      // Alabasta Saga
      { name: 'Reverse Mountain', startEp: 62, endEp: 63, isFiller: false },
      { name: 'Whisky Peak', startEp: 64, endEp: 67, isFiller: false },
      { name: 'Coby-Meppo', startEp: 68, endEp: 69, isFiller: true },
      { name: 'Little Garden', startEp: 70, endEp: 77, isFiller: false },
      { name: 'Drum Island', startEp: 78, endEp: 91, isFiller: false },
      { name: 'Alabasta', startEp: 92, endEp: 130, isFiller: false },
      { name: 'Post-Alabasta', startEp: 131, endEp: 135, isFiller: true },
      // Skypiea Saga
      { name: 'Goat Island', startEp: 136, endEp: 138, isFiller: true },
      { name: 'Ruluka Island', startEp: 139, endEp: 143, isFiller: true },
      { name: 'Jaya', startEp: 144, endEp: 152, isFiller: false },
      { name: 'Skypiea', startEp: 153, endEp: 195, isFiller: false },
      { name: 'G-8', startEp: 196, endEp: 206, isFiller: true },
      // Water 7 Saga
      { name: 'Long Ring Long Land', startEp: 207, endEp: 219, isFiller: false },
      { name: 'Ocean\'s Dream', startEp: 220, endEp: 224, isFiller: true },
      { name: 'Foxy\'s Return', startEp: 225, endEp: 228, isFiller: true },
      { name: 'Water 7', startEp: 229, endEp: 263, isFiller: false },
      { name: 'Enies Lobby', startEp: 264, endEp: 312, isFiller: false },
      { name: 'Post-Enies Lobby', startEp: 313, endEp: 325, isFiller: false },
      { name: 'Ice Hunter', startEp: 326, endEp: 336, isFiller: true },
      // Thriller Bark Saga
      { name: 'Thriller Bark', startEp: 337, endEp: 381, isFiller: false },
      { name: 'Spa Island', startEp: 382, endEp: 384, isFiller: true },
      // Summit War Saga
      { name: 'Sabaody Archipelago', startEp: 385, endEp: 405, isFiller: false },
      { name: 'Amazon Lily', startEp: 408, endEp: 421, isFiller: false },
      { name: 'Impel Down', startEp: 422, endEp: 456, isFiller: false },
      { name: 'Marineford', startEp: 457, endEp: 489, isFiller: false },
      { name: 'Post-War', startEp: 490, endEp: 516, isFiller: false },
      // Fishman Island Saga
      { name: 'Return to Sabaody', startEp: 517, endEp: 522, isFiller: false },
      { name: 'Fishman Island', startEp: 523, endEp: 574, isFiller: false },
      // Dressrosa Saga
      { name: 'Z\'s Ambition', startEp: 575, endEp: 578, isFiller: true },
      { name: 'Punk Hazard', startEp: 579, endEp: 628, isFiller: false },
      { name: 'Caesar Retrieval', startEp: 626, endEp: 628, isFiller: true },
      { name: 'Dressrosa', startEp: 629, endEp: 746, isFiller: false },
      // Whole Cake Island Saga
      { name: 'Silver Mine', startEp: 747, endEp: 750, isFiller: true },
      { name: 'Zou', startEp: 751, endEp: 779, isFiller: false },
      { name: 'Marine Rookie', startEp: 780, endEp: 782, isFiller: true },
      { name: 'Whole Cake Island', startEp: 783, endEp: 877, isFiller: false },
      // Wano Saga
      { name: 'Reverie', startEp: 878, endEp: 889, isFiller: false },
      { name: 'Wano Country', startEp: 890, endEp: 1088, isFiller: false },
      // Final Saga
      { name: 'Egghead', startEp: 1089, endEp: 1122, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Naruto
  // ---------------------------------------------------------------------------
  {
    id: 'naruto',
    title: 'Naruto',
    slug: 'naruto',
    posterUrl: 'https://media.kitsu.app/anime/11/poster_image/large-5e901605066f7f2727f49d01859bbfe4.jpeg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/11/large.jpg',
    totalEpisodes: 220,
    totalCanonEpisodes: 135,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Martial Arts', 'Shounen'],
    description:
      'Naruto Uzumaki, a young ninja shunned by his village for harboring the Nine-Tailed Fox, dreams of becoming the Hokage to earn the respect of everyone around him. Through grueling training and fierce battles, Naruto forges bonds with his teammates and faces off against powerful enemies. The series explores themes of perseverance, friendship, and the pain of loneliness.',
    arcs: [
      { name: 'Prologue - Land of Waves', startEp: 1, endEp: 19, isFiller: false },
      { name: 'Chunin Exams', startEp: 20, endEp: 67, isFiller: false },
      { name: 'Konoha Crush', startEp: 68, endEp: 80, isFiller: false },
      { name: 'Search for Tsunade', startEp: 81, endEp: 100, isFiller: false },
      { name: 'Land of Tea Escort', startEp: 102, endEp: 106, isFiller: true },
      { name: 'Sasuke Recovery Mission', startEp: 107, endEp: 135, isFiller: false },
      { name: 'Land of Rice Fields', startEp: 136, endEp: 141, isFiller: true },
      { name: 'Mizuki Tracking Mission', startEp: 142, endEp: 147, isFiller: true },
      { name: 'Bikochu Search Mission', startEp: 148, endEp: 151, isFiller: true },
      { name: 'Kurosuki Family Removal', startEp: 152, endEp: 157, isFiller: true },
      { name: 'Gosunkugi Capture Mission', startEp: 159, endEp: 160, isFiller: true },
      { name: 'Cursed Warrior Extermination', startEp: 162, endEp: 167, isFiller: true },
      { name: 'Kaima Capture Mission', startEp: 169, endEp: 173, isFiller: true },
      { name: 'Buried Gold Excavation', startEp: 175, endEp: 176, isFiller: true },
      { name: 'Star Guard Mission', startEp: 178, endEp: 183, isFiller: true },
      { name: 'Peddlers Escort Mission', startEp: 187, endEp: 191, isFiller: true },
      { name: 'Third Great Beast', startEp: 195, endEp: 196, isFiller: true },
      { name: 'Konoha Plans Recapture', startEp: 197, endEp: 201, isFiller: true },
      { name: 'Yakumo Kurama Rescue', startEp: 203, endEp: 207, isFiller: true },
      { name: 'Prized Artifact Escort', startEp: 209, endEp: 212, isFiller: true },
      { name: 'Menma Memory Search', startEp: 213, endEp: 215, isFiller: true },
      { name: 'Sunagakure Support', startEp: 216, endEp: 220, isFiller: true },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Naruto Shippuden
  // ---------------------------------------------------------------------------
  {
    id: 'naruto-shippuden',
    title: 'Naruto Shippuden',
    slug: 'naruto-shippuden',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/1555/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/1555/large.jpg',
    totalEpisodes: 500,
    totalCanonEpisodes: 295,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Martial Arts', 'Shounen'],
    description:
      'Two and a half years after leaving to train with Jiraiya, Naruto returns to the Hidden Leaf Village stronger than ever and ready to face the Akatsuki organization threatening the ninja world. The stakes escalate as Naruto masters new abilities and confronts the truth about his past while fighting to save his friend Sasuke. Shippuden culminates in the Fourth Great Ninja War, a conflict that determines the fate of the entire shinobi world.',
    arcs: [
      { name: 'Kazekage Rescue Mission', startEp: 1, endEp: 32, isFiller: false },
      { name: 'Tenchi Bridge Reconnaissance', startEp: 33, endEp: 53, isFiller: false },
      { name: 'Twelve Guardian Ninja', startEp: 54, endEp: 71, isFiller: true },
      { name: 'Akatsuki Suppression Mission', startEp: 72, endEp: 88, isFiller: false },
      { name: 'Three-Tails Appearance', startEp: 89, endEp: 112, isFiller: true },
      { name: 'Itachi Pursuit Mission', startEp: 113, endEp: 126, isFiller: false },
      { name: 'Tale of Jiraiya the Gallant', startEp: 127, endEp: 133, isFiller: false },
      { name: 'Fated Battle Between Brothers', startEp: 134, endEp: 143, isFiller: false },
      { name: 'Six-Tails Unleashed', startEp: 144, endEp: 151, isFiller: true },
      { name: 'Pain\'s Assault', startEp: 152, endEp: 175, isFiller: false },
      { name: 'Past Arc: The Locus of Konoha', startEp: 176, endEp: 196, isFiller: true },
      { name: 'Five Kage Summit', startEp: 197, endEp: 214, isFiller: false },
      { name: 'Paradise Life on a Boat', startEp: 223, endEp: 242, isFiller: true },
      { name: 'Fourth Shinobi World War: Countdown', startEp: 215, endEp: 222, isFiller: false },
      { name: 'Fourth Shinobi World War: Confrontation', startEp: 261, endEp: 289, isFiller: false },
      { name: 'Power', startEp: 290, endEp: 295, isFiller: true },
      { name: 'Fourth Shinobi World War: Climax', startEp: 296, endEp: 321, isFiller: false },
      { name: 'Kakashi\'s Anbu Arc', startEp: 349, endEp: 361, isFiller: true },
      { name: 'Fourth Shinobi World War: Resolution', startEp: 322, endEp: 348, isFiller: false },
      { name: 'Birth of the Ten-Tails\' Jinchuriki', startEp: 362, endEp: 393, isFiller: false },
      { name: 'Itachi\'s Story', startEp: 451, endEp: 458, isFiller: true },
      { name: 'Kaguya Otsutsuki Strikes', startEp: 394, endEp: 450, isFiller: false },
      { name: 'Childhood', startEp: 480, endEp: 483, isFiller: true },
      { name: 'Jiraiya Shinobi Handbook', startEp: 432, endEp: 450, isFiller: true },
      { name: 'Konoha Hiden', startEp: 484, endEp: 500, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Bleach
  // ---------------------------------------------------------------------------
  {
    id: 'bleach',
    title: 'Bleach',
    slug: 'bleach',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/244/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/244/cover_image/large-b9e0a3066197f1115c773ff866a60873.jpeg',
    totalEpisodes: 366,
    totalCanonEpisodes: 265,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Supernatural', 'Shounen'],
    description:
      'High schooler Ichigo Kurosaki gains the powers of a Soul Reaper and is thrust into the world of spirits, Hollows, and the afterlife known as Soul Society. He must protect the living world from malevolent spirits while navigating the complex politics and betrayals within Soul Society itself. With its stylish combat and memorable characters, Bleach delivers intense supernatural action across multiple dimensions.',
    arcs: [
      { name: 'Agent of the Shinigami', startEp: 1, endEp: 20, isFiller: false },
      { name: 'Soul Society: The Sneak Entry', startEp: 21, endEp: 41, isFiller: false },
      { name: 'Soul Society: The Rescue', startEp: 42, endEp: 63, isFiller: false },
      { name: 'Bount', startEp: 64, endEp: 91, isFiller: true },
      { name: 'Bount Assault on Soul Society', startEp: 92, endEp: 109, isFiller: true },
      { name: 'Arrancar: The Arrival', startEp: 110, endEp: 131, isFiller: false },
      { name: 'Arrancar: The Hueco Mundo Sneak Entry', startEp: 132, endEp: 151, isFiller: false },
      { name: 'Arrancar: The Fierce Fight', startEp: 152, endEp: 167, isFiller: false },
      { name: 'New Captain Shusuke Amagai', startEp: 168, endEp: 189, isFiller: true },
      { name: 'Arrancar vs. Shinigami', startEp: 190, endEp: 205, isFiller: false },
      { name: 'The Past', startEp: 206, endEp: 212, isFiller: false },
      { name: 'Arrancar: Decisive Battle of Karakura', startEp: 213, endEp: 229, isFiller: false },
      { name: 'Zanpakuto Unknown Tales', startEp: 230, endEp: 265, isFiller: true },
      { name: 'Arrancar: Downfall', startEp: 266, endEp: 316, isFiller: false },
      { name: 'Gotei 13 Invading Army', startEp: 317, endEp: 342, isFiller: true },
      { name: 'The Lost Substitute Shinigami', startEp: 343, endEp: 366, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Bleach: Thousand-Year Blood War
  // ---------------------------------------------------------------------------
  {
    id: 'bleach-tybw',
    title: 'Bleach: Thousand-Year Blood War',
    slug: 'bleach-tybw',
    posterUrl: 'https://media.kitsu.app/anime/43078/poster_image/large-bf36dc3ed0097c8b8c49e064bf0eaa79.jpeg',
    bannerUrl: 'https://media.kitsu.app/anime/43078/cover_image/large-45a93d1d5a68cf93aa314a9efbe8bf72.jpeg',
    totalEpisodes: 40,
    totalCanonEpisodes: 40,
    status: 'airing',
    genre: ['Action', 'Adventure', 'Supernatural', 'Shounen'],
    description:
      'The Quincy king Yhwach and his elite Sternritter army declare war on Soul Society, launching a devastating invasion that overwhelms even the most powerful captains. Ichigo must unlock the true nature of his Zanpakuto and heritage to stand against this ancient enemy. This final arc of Bleach delivers the most intense battles and deepest lore revelations in the series.',
    arcs: [
      { name: 'Part 1: Blood War', startEp: 1, endEp: 13, isFiller: false },
      { name: 'Part 2: The Separation', startEp: 14, endEp: 26, isFiller: false },
      { name: 'Part 3: The Conflict', startEp: 27, endEp: 40, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Dragon Ball Z
  // ---------------------------------------------------------------------------
  {
    id: 'dragon-ball-z',
    title: 'Dragon Ball Z',
    slug: 'dragon-ball-z',
    posterUrl: 'https://media.kitsu.app/anime/720/poster_image/large-5cfc7e2756852e708c822df0a9f59871.jpeg',
    bannerUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/813-03ZLvWJgR6Wd.jpg',
    totalEpisodes: 291,
    totalCanonEpisodes: 196,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Martial Arts', 'Shounen', 'Sci-Fi'],
    description:
      'Goku and the Z Fighters defend Earth from an escalating series of threats, from Saiyan invaders and galactic tyrants to bio-engineered monsters and ancient magical beings. The series popularized many iconic tropes of the shonen genre, including power-ups, transformations, and epic beam struggles. Dragon Ball Z remains one of the most influential anime series ever made, defining an entire generation of fans worldwide.',
    arcs: [
      { name: 'Saiyan Saga', startEp: 1, endEp: 35, isFiller: false },
      { name: 'Namek Saga', startEp: 36, endEp: 67, isFiller: false },
      { name: 'Captain Ginyu Saga', startEp: 68, endEp: 74, isFiller: false },
      { name: 'Frieza Saga', startEp: 75, endEp: 107, isFiller: false },
      { name: 'Garlic Jr. Saga', startEp: 108, endEp: 117, isFiller: true },
      { name: 'Trunks Saga', startEp: 118, endEp: 125, isFiller: false },
      { name: 'Androids Saga', startEp: 126, endEp: 139, isFiller: false },
      { name: 'Imperfect Cell Saga', startEp: 140, endEp: 152, isFiller: false },
      { name: 'Perfect Cell Saga', startEp: 153, endEp: 165, isFiller: false },
      { name: 'Cell Games Saga', startEp: 166, endEp: 194, isFiller: false },
      { name: 'Other World Tournament', startEp: 195, endEp: 199, isFiller: true },
      { name: 'Great Saiyaman Saga', startEp: 200, endEp: 209, isFiller: false },
      { name: 'World Tournament Saga', startEp: 210, endEp: 219, isFiller: false },
      { name: 'Babidi Saga', startEp: 220, endEp: 231, isFiller: false },
      { name: 'Majin Buu Saga', startEp: 232, endEp: 253, isFiller: false },
      { name: 'Fusion Saga', startEp: 254, endEp: 275, isFiller: false },
      { name: 'Kid Buu Saga', startEp: 276, endEp: 291, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Dragon Ball Super
  // ---------------------------------------------------------------------------
  {
    id: 'dragon-ball-super',
    title: 'Dragon Ball Super',
    slug: 'dragon-ball-super',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/10879/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/41046/cover_image/large-4bb4313ce6c328976b96497b8b844471.jpeg',
    totalEpisodes: 131,
    totalCanonEpisodes: 131,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Martial Arts', 'Shounen', 'Sci-Fi'],
    description:
      'Following the defeat of Majin Buu, Goku and his friends face new divine-level threats as gods of destruction, alternate universes, and time-traveling villains emerge. The series introduces Super Saiyan God and Ultra Instinct transformations while expanding the Dragon Ball multiverse. Dragon Ball Super culminates in the Tournament of Power, an all-out battle royale between eight universes fighting for survival.',
    arcs: [
      { name: 'Battle of Gods', startEp: 1, endEp: 14, isFiller: false },
      { name: 'Golden Frieza / Resurrection F', startEp: 15, endEp: 27, isFiller: false },
      { name: 'Universe 6 Tournament', startEp: 28, endEp: 46, isFiller: false },
      { name: 'Copy-Vegeta', startEp: 45, endEp: 46, isFiller: true },
      { name: 'Future Trunks / Goku Black', startEp: 47, endEp: 76, isFiller: false },
      { name: 'Universe Survival / Tournament of Power', startEp: 77, endEp: 131, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. My Hero Academia
  // ---------------------------------------------------------------------------
  {
    id: 'my-hero-academia',
    title: 'My Hero Academia',
    slug: 'my-hero-academia',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/11469/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/11469/large.jpg',
    totalEpisodes: 159,
    totalCanonEpisodes: 159,
    status: 'completed',
    genre: ['Action', 'Superhero', 'School', 'Shounen'],
    description:
      'In a world where nearly everyone has superpowers called Quirks, Izuku Midoriya is born without one but still dreams of becoming the greatest hero. After inheriting a powerful Quirk from the legendary All Might, he enrolls in U.A. High School and faces villains, rivals, and the weight of being a symbol of peace. My Hero Academia is a modern superhero epic that blends Western comic book culture with classic shonen storytelling.',
    arcs: [
      { name: 'S1: Origin & USJ', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S2: Sports Festival', startEp: 14, endEp: 26, isFiller: false },
      { name: 'S2: Hero Killer & Finals', startEp: 27, endEp: 38, isFiller: false },
      { name: 'S3: Training Camp & Hideout Raid', startEp: 39, endEp: 52, isFiller: false },
      { name: 'S3: Provisional License', startEp: 53, endEp: 63, isFiller: false },
      { name: 'S4: Shie Hassaikai', startEp: 64, endEp: 77, isFiller: false },
      { name: 'S4: School Festival', startEp: 78, endEp: 88, isFiller: false },
      { name: 'S5: Joint Training & Villain Academia', startEp: 89, endEp: 113, isFiller: false },
      { name: 'S6: Paranormal Liberation War', startEp: 114, endEp: 138, isFiller: false },
      { name: 'S7: Star & Stripe / Final War', startEp: 139, endEp: 159, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. Attack on Titan
  // ---------------------------------------------------------------------------
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    slug: 'attack-on-titan',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7442/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7442/large.jpg',
    totalEpisodes: 89,
    totalCanonEpisodes: 89,
    status: 'completed',
    genre: ['Action', 'Dark Fantasy', 'Drama', 'Thriller'],
    description:
      'Humanity lives behind massive walls to protect themselves from the Titans, giant humanoid creatures that devour humans without reason. When the walls are breached, young Eren Yeager vows to exterminate every Titan and uncovers a conspiracy that redefines everything he knows about the world. Attack on Titan is a masterclass in storytelling with shocking twists, moral complexity, and relentless tension.',
    arcs: [
      { name: 'S1: Fall of Shiganshina', startEp: 1, endEp: 5, isFiller: false },
      { name: 'S1: Trost & Female Titan', startEp: 6, endEp: 25, isFiller: false },
      { name: 'S2: Clash of the Titans', startEp: 26, endEp: 37, isFiller: false },
      { name: 'S3: Uprising', startEp: 38, endEp: 49, isFiller: false },
      { name: 'S3: Return to Shiganshina', startEp: 50, endEp: 59, isFiller: false },
      { name: 'S4: Marley', startEp: 60, endEp: 75, isFiller: false },
      { name: 'S4P2: War for Paradis', startEp: 76, endEp: 87, isFiller: false },
      { name: 'Final Chapters', startEp: 88, endEp: 89, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 10. Hunter x Hunter (2011)
  // ---------------------------------------------------------------------------
  {
    id: 'hunter-x-hunter-2011',
    title: 'Hunter x Hunter (2011)',
    slug: 'hunter-x-hunter-2011',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/6448/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/6448/large.jpg',
    totalEpisodes: 148,
    totalCanonEpisodes: 148,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Fantasy', 'Shounen'],
    description:
      'Twelve-year-old Gon Freecss sets out to become a Hunter, an elite member of society licensed to track down criminals, discover ancient ruins, and explore uncharted lands, in hopes of finding his absent father. Alongside friends Killua, Kurapika, and Leorio, Gon faces the deadly Hunter Exam, underworld crime syndicates, and the monstrous Chimera Ants. Hunter x Hunter is celebrated for its complex power system, morally grey characters, and willingness to subvert shonen conventions.',
    arcs: [
      { name: 'Hunter Exam', startEp: 1, endEp: 21, isFiller: false },
      { name: 'Zoldyck Family', startEp: 22, endEp: 26, isFiller: false },
      { name: 'Heaven\'s Arena', startEp: 27, endEp: 36, isFiller: false },
      { name: 'Yorknew City', startEp: 37, endEp: 58, isFiller: false },
      { name: 'Greed Island', startEp: 59, endEp: 75, isFiller: false },
      { name: 'Chimera Ant', startEp: 76, endEp: 136, isFiller: false },
      { name: '13th Hunter Chairman Election', startEp: 137, endEp: 148, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 11. Demon Slayer
  // ---------------------------------------------------------------------------
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    slug: 'demon-slayer',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/41370/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/41370/cover_image/large-3de3cc6d2b33162c928de10aa201e4ba.jpeg',
    totalEpisodes: 56,
    totalCanonEpisodes: 56,
    status: 'airing',
    genre: ['Action', 'Supernatural', 'Historical', 'Shounen'],
    description:
      'After his family is slaughtered by demons and his sister Nezuko is turned into one, kind-hearted Tanjiro Kamado joins the Demon Slayer Corps to find a cure and avenge his family. With breathtaking animation by studio ufotable, the series brings intense sword combat and emotional storytelling to life. Demon Slayer became a cultural phenomenon, breaking box office records and captivating audiences worldwide.',
    arcs: [
      { name: 'S1: Unwavering Resolve', startEp: 1, endEp: 14, isFiller: false },
      { name: 'S1: Natagumo Mountain', startEp: 15, endEp: 26, isFiller: false },
      { name: 'S2: Entertainment District', startEp: 27, endEp: 37, isFiller: false },
      { name: 'S3: Swordsmith Village', startEp: 38, endEp: 48, isFiller: false },
      { name: 'S4: Hashira Training', startEp: 49, endEp: 56, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 12. Jujutsu Kaisen
  // ---------------------------------------------------------------------------
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    slug: 'jujutsu-kaisen',
    posterUrl: 'https://media.kitsu.app/anime/42765/poster_image/large-5ce19551c1a6cf995b378205b9149b5c.jpeg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/42765/large.jpg',
    totalEpisodes: 47,
    totalCanonEpisodes: 47,
    status: 'completed',
    genre: ['Action', 'Supernatural', 'Horror', 'Shounen'],
    description:
      'After swallowing a cursed finger belonging to the King of Curses, Ryomen Sukuna, high schooler Yuji Itadori enters the hidden world of Jujutsu Sorcerers who battle malevolent cursed spirits born from human negativity. Under a suspended death sentence, Yuji must consume all of Sukuna\'s fingers while learning to fight alongside his fellow sorcerers. Jujutsu Kaisen delivers fluid, creative combat and a dark narrative that keeps raising the stakes.',
    arcs: [
      { name: 'S1: Cursed Child', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S1: Exchange Event', startEp: 14, endEp: 24, isFiller: false },
      { name: 'S2: Hidden Inventory', startEp: 25, endEp: 29, isFiller: false },
      { name: 'S2: Shibuya Incident', startEp: 30, endEp: 47, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 13. Fairy Tail
  // ---------------------------------------------------------------------------
  {
    id: 'fairy-tail',
    title: 'Fairy Tail',
    slug: 'fairy-tail',
    posterUrl: 'https://media.kitsu.app/anime/4676/poster_image/large-d761d48a72e02e5433d70b8521cea862.jpeg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/4676/large.jpg',
    totalEpisodes: 328,
    totalCanonEpisodes: 250,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Shounen'],
    description:
      'Lucy Heartfilia joins the boisterous Fairy Tail wizard guild and teams up with fire mage Natsu Dragneel and his flying cat Happy for wild adventures across the kingdom of Fiore. The guild takes on dangerous missions, battles dark guilds, and confronts ancient evils while celebrating the power of friendship and family. Fairy Tail is an energetic, feel-good shonen series known for its large cast and heart-pumping magical battles.',
    arcs: [
      { name: 'Macao', startEp: 1, endEp: 2, isFiller: false },
      { name: 'Daybreak', startEp: 3, endEp: 4, isFiller: false },
      { name: 'Lullaby', startEp: 5, endEp: 10, isFiller: false },
      { name: 'Galuna Island', startEp: 11, endEp: 18, isFiller: false },
      { name: 'Phantom Lord', startEp: 21, endEp: 29, isFiller: false },
      { name: 'Loke', startEp: 30, endEp: 32, isFiller: false },
      { name: 'Tower of Heaven', startEp: 33, endEp: 40, isFiller: false },
      { name: 'Battle of Fairy Tail', startEp: 41, endEp: 51, isFiller: false },
      { name: 'Oracion Seis', startEp: 52, endEp: 68, isFiller: false },
      { name: 'Daphne', startEp: 69, endEp: 75, isFiller: true },
      { name: 'Edolas', startEp: 76, endEp: 95, isFiller: false },
      { name: 'Tenrou Island', startEp: 96, endEp: 122, isFiller: false },
      { name: 'Key of the Starry Sky', startEp: 125, endEp: 150, isFiller: true },
      { name: 'X791', startEp: 123, endEp: 124, isFiller: false },
      { name: 'Grand Magic Games', startEp: 151, endEp: 203, isFiller: false },
      { name: 'Eclipse Celestial Spirits', startEp: 204, endEp: 226, isFiller: true },
      { name: 'Sun Village', startEp: 227, endEp: 233, isFiller: false },
      { name: 'Tartaros', startEp: 234, endEp: 265, isFiller: false },
      { name: 'Avatar', startEp: 276, endEp: 284, isFiller: false },
      { name: 'Alvarez Empire', startEp: 285, endEp: 328, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 14. Black Clover
  // ---------------------------------------------------------------------------
  {
    id: 'black-clover',
    title: 'Black Clover',
    slug: 'black-clover',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/13209/large.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/13209/large.jpg',
    totalEpisodes: 170,
    totalCanonEpisodes: 150,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Shounen'],
    description:
      'In a world where magic is everything, Asta is born with none but refuses to give up his dream of becoming the Wizard King. Armed with anti-magic swords and sheer determination, Asta joins the Black Bulls, the worst Magic Knight squad in the Clover Kingdom. Black Clover delivers non-stop action, underdog spirit, and a rapidly expanding world of magic knight squads, rival kingdoms, and ancient devils.',
    arcs: [
      { name: 'Asta and Yuno', startEp: 1, endEp: 2, isFiller: false },
      { name: 'Magic Knights Entrance Exam', startEp: 3, endEp: 4, isFiller: false },
      { name: 'Black Bulls', startEp: 5, endEp: 13, isFiller: false },
      { name: 'Dungeon Exploration', startEp: 14, endEp: 19, isFiller: false },
      { name: 'Royal Capital', startEp: 20, endEp: 28, isFiller: false },
      { name: 'Eye of the Midnight Sun Encounter', startEp: 29, endEp: 39, isFiller: false },
      { name: 'Seabed Temple', startEp: 40, endEp: 50, isFiller: false },
      { name: 'Witches\' Forest', startEp: 51, endEp: 65, isFiller: false },
      { name: 'Hot Springs Training Camp', startEp: 66, endEp: 72, isFiller: false },
      { name: 'Royal Knights Selection Exam', startEp: 73, endEp: 84, isFiller: false },
      { name: 'Reincarnation', startEp: 85, endEp: 120, isFiller: false },
      { name: 'Post-Reincarnation Filler', startEp: 121, endEp: 132, isFiller: true },
      { name: 'Heart Kingdom Joint Struggle', startEp: 133, endEp: 157, isFiller: false },
      { name: 'Spade Kingdom Raid', startEp: 158, endEp: 170, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 15. Death Note
  // ---------------------------------------------------------------------------
  {
    id: 'death-note',
    title: 'Death Note',
    slug: 'death-note',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/1376/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/1376/original.jpg',
    totalEpisodes: 37,
    totalCanonEpisodes: 37,
    status: 'completed',
    genre: ['Mystery', 'Psychological', 'Supernatural', 'Thriller'],
    description:
      'A high school genius discovers a supernatural notebook that kills anyone whose name is written in it. Light Yagami decides to use the Death Note to rid the world of criminals, but the mysterious detective L begins closing in on him. A cat-and-mouse thriller that explores justice, morality, and the corrupting nature of power.',
    arcs: [
      { name: 'L arc', startEp: 1, endEp: 25, isFiller: false },
      { name: 'Near and Mello arc', startEp: 26, endEp: 37, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 16. Fullmetal Alchemist: Brotherhood
  // ---------------------------------------------------------------------------
  {
    id: 'fullmetal-alchemist-brotherhood',
    title: 'Fullmetal Alchemist: Brotherhood',
    slug: 'fullmetal-alchemist-brotherhood',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/3936/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/3936/original.jpg',
    totalEpisodes: 64,
    totalCanonEpisodes: 64,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    description:
      'Two brothers use alchemy in a forbidden attempt to resurrect their mother, paying a terrible price. Edward and Alphonse Elric search for the Philosopher\'s Stone to restore their bodies while uncovering a vast conspiracy threatening the entire nation of Amestris. Widely regarded as one of the greatest anime of all time.',
    arcs: [
      { name: 'Introduction', startEp: 1, endEp: 2, isFiller: false },
      { name: 'Liore', startEp: 3, endEp: 4, isFiller: false },
      { name: 'The Elric Brothers', startEp: 5, endEp: 10, isFiller: false },
      { name: 'Fifth Laboratory', startEp: 11, endEp: 14, isFiller: false },
      { name: 'Rush Valley & Greed', startEp: 15, endEp: 20, isFiller: false },
      { name: 'Northern Wall of Briggs', startEp: 21, endEp: 36, isFiller: false },
      { name: 'The Promised Day', startEp: 37, endEp: 52, isFiller: false },
      { name: 'Final Battle', startEp: 53, endEp: 64, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 17. Sailor Moon
  // ---------------------------------------------------------------------------
  {
    id: 'sailor-moon',
    title: 'Sailor Moon',
    slug: 'sailor-moon',
    posterUrl: 'https://media.kitsu.app/anime/489/poster_image/f9870cc308ccfdda83d00bfbc573749e.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/489/original.jpg',
    totalEpisodes: 200,
    totalCanonEpisodes: 160,
    status: 'completed',
    genre: ['Magic', 'Romance', 'Shoujo', 'Fantasy'],
    description:
      'Usagi Tsukino, a clumsy schoolgirl, transforms into Sailor Moon to protect Earth from dark forces. Joined by her fellow Sailor Guardians, she battles evil while navigating the trials of adolescence and discovering her destiny as a legendary warrior. A genre-defining magical girl series that became a worldwide phenomenon.',
    arcs: [
      { name: 'Dark Kingdom', startEp: 1, endEp: 46, isFiller: false },
      { name: 'Black Moon', startEp: 47, endEp: 89, isFiller: false },
      { name: 'Infinity (Death Busters)', startEp: 90, endEp: 127, isFiller: false },
      { name: 'Dream (Dead Moon)', startEp: 128, endEp: 166, isFiller: false },
      { name: 'Stars', startEp: 167, endEp: 200, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 18. Pokemon
  // ---------------------------------------------------------------------------
  {
    id: 'pokemon',
    title: 'Pokemon',
    slug: 'pokemon',
    posterUrl: 'https://media.kitsu.app/anime/486/poster_image/2d1f1d138ff38d81057bb864b936e9bf.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/486/original.jpg',
    totalEpisodes: 276,
    totalCanonEpisodes: 250,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Kids'],
    description:
      'Ash Ketchum sets out on a journey to become a Pokemon Master, capturing and training creatures along the way. With his loyal Pikachu by his side, Ash travels across regions, battles Gym Leaders, and enters Pokemon Leagues. The original series that launched a global multimedia franchise.',
    arcs: [
      { name: 'Indigo League', startEp: 1, endEp: 82, isFiller: false },
      { name: 'Adventures on the Orange Islands', startEp: 83, endEp: 118, isFiller: false },
      { name: 'The Johto Journeys', startEp: 119, endEp: 210, isFiller: false },
      { name: 'Johto League Champions & Master Quest', startEp: 211, endEp: 276, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 19. Sword Art Online
  // ---------------------------------------------------------------------------
  {
    id: 'sword-art-online',
    title: 'Sword Art Online',
    slug: 'sword-art-online',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/6589/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/6589/original.png',
    totalEpisodes: 96,
    totalCanonEpisodes: 96,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Fantasy', 'Romance', 'Sci-Fi'],
    description:
      'Players of a virtual reality MMORPG find themselves trapped inside the game, where death in-game means death in real life. Kirito, a solo player, must clear all 100 floors of the floating castle Aincrad to free everyone. A pioneering isekai series that explores the boundaries between virtual and real worlds.',
    arcs: [
      { name: 'S1: Aincrad', startEp: 1, endEp: 14, isFiller: false },
      { name: 'S1: Fairy Dance', startEp: 15, endEp: 25, isFiller: false },
      { name: 'S2: Phantom Bullet', startEp: 26, endEp: 39, isFiller: false },
      { name: 'S2: Calibur', startEp: 40, endEp: 42, isFiller: false },
      { name: "S2: Mother's Rosario", startEp: 43, endEp: 49, isFiller: false },
      { name: 'S3: Alicization', startEp: 50, endEp: 73, isFiller: false },
      { name: 'S4: War of Underworld', startEp: 74, endEp: 96, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 20. Vinland Saga
  // ---------------------------------------------------------------------------
  {
    id: 'vinland-saga',
    title: 'Vinland Saga',
    slug: 'vinland-saga',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/41084/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/41084/cover_image/large-2590d6aecb5433b5693f3224e7265bb9.jpeg',
    totalEpisodes: 48,
    totalCanonEpisodes: 48,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Drama', 'Historical'],
    description:
      'Young Thorfinn grows up on the battlefield, seeking revenge against the cunning Viking warrior Askeladd who killed his father. Set during the Viking Age, the series follows Danish and English conflicts while exploring themes of war, honor, and the search for a peaceful land. A gripping historical epic based on the manga by Makoto Yukimura.',
    arcs: [
      { name: 'S1: War Arc', startEp: 1, endEp: 24, isFiller: false },
      { name: 'S2: Slave Arc & Escape', startEp: 25, endEp: 48, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 21. Re:Zero
  // ---------------------------------------------------------------------------
  {
    id: 're-zero',
    title: 'Re:Zero - Starting Life in Another World',
    slug: 're-zero',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/11209/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/11209/original.jpg',
    totalEpisodes: 66,
    totalCanonEpisodes: 66,
    status: 'completed',
    genre: ['Drama', 'Fantasy', 'Psychological', 'Thriller'],
    description:
      'Subaru Natsuki is transported to a fantasy world where he discovers he has the ability to return from death, resetting time to a checkpoint. He uses this harrowing power to protect the people he cares about, enduring unimaginable suffering in the process. A dark and emotionally intense isekai that deconstructs genre conventions.',
    arcs: [
      { name: 'S1: Starting Life', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S1: Sanctuary', startEp: 14, endEp: 25, isFiller: false },
      { name: 'S2: Sanctuary Trials', startEp: 26, endEp: 38, isFiller: false },
      { name: 'S2: Choosing the Future', startEp: 39, endEp: 50, isFiller: false },
      { name: 'S3: Royal Selection', startEp: 51, endEp: 66, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 22. Overlord
  // ---------------------------------------------------------------------------
  {
    id: 'overlord',
    title: 'Overlord',
    slug: 'overlord',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/9965/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/9965/original.jpg',
    totalEpisodes: 52,
    totalCanonEpisodes: 52,
    status: 'completed',
    genre: ['Action', 'Fantasy', 'Supernatural', 'Isekai'],
    description:
      'When his favorite MMORPG shuts down, a player finds himself trapped in the game as his powerful skeletal mage character, Ainz Ooal Gown. Now the ruler of the Great Tomb of Nazarick, he sets out to conquer this new world while searching for other players. A unique isekai told from the perspective of an overpowered villain protagonist.',
    arcs: [
      { name: 'S1: Great Tomb of Nazarick', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S2: Lizard Man & Kingdom', startEp: 14, endEp: 26, isFiller: false },
      { name: 'S3: Carne Village & Katze Plains', startEp: 27, endEp: 39, isFiller: false },
      { name: 'S4: Holy Kingdom & Re-Estize', startEp: 40, endEp: 52, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 23. One Punch Man
  // ---------------------------------------------------------------------------
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    slug: 'one-punch-man',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/10740/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/10740/original.jpg',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Parody', 'Sci-Fi', 'Seinen'],
    description:
      'Saitama is a hero who can defeat any enemy with a single punch, leaving him bored and unfulfilled. Despite his overwhelming power, he remains unrecognized by the Hero Association while far weaker heroes get all the glory. A brilliant satire of the superhero genre with stunning animation and hilarious writing.',
    arcs: [
      { name: 'S1: Hero Association', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Hero Hunter & Tournament', startEp: 13, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 24. Dr. Stone
  // ---------------------------------------------------------------------------
  {
    id: 'dr-stone',
    title: 'Dr. Stone',
    slug: 'dr-stone',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/42080/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/42080/original.jpg',
    totalEpisodes: 57,
    totalCanonEpisodes: 57,
    status: 'completed',
    genre: ['Adventure', 'Comedy', 'Sci-Fi', 'Shounen'],
    description:
      'After a mysterious flash petrifies all of humanity, genius scientist Senku Ishigami awakens 3,700 years later in a stone world. He vows to rebuild civilization from scratch using the power of science. A uniquely educational and thrilling adventure that celebrates human ingenuity and the scientific method.',
    arcs: [
      { name: 'S1: Stone World', startEp: 1, endEp: 24, isFiller: false },
      { name: 'S2: Stone Wars', startEp: 25, endEp: 35, isFiller: false },
      { name: 'S3: New World', startEp: 36, endEp: 57, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 25. Seven Deadly Sins
  // ---------------------------------------------------------------------------
  {
    id: 'seven-deadly-sins',
    title: 'Seven Deadly Sins',
    slug: 'seven-deadly-sins',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8699/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8699/original.jpg',
    totalEpisodes: 76,
    totalCanonEpisodes: 76,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Fantasy', 'Shounen'],
    description:
      'Princess Elizabeth seeks the Seven Deadly Sins, a group of legendary knights who were framed for plotting to overthrow the kingdom. Together with Meliodas, the Dragon Sin of Wrath, she sets out to reunite the group and reclaim the kingdom from the Holy Knights. An action-packed fantasy adventure with memorable characters and epic battles.',
    arcs: [
      { name: 'S1: Holy War Beginnings', startEp: 1, endEp: 24, isFiller: false },
      { name: 'S2: Signs of Holy War', startEp: 25, endEp: 28, isFiller: false },
      { name: 'S3: Revival of the Commandments', startEp: 29, endEp: 52, isFiller: false },
      { name: 'S4: Dragon\'s Judgement', startEp: 53, endEp: 76, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 26. Haikyuu!!
  // ---------------------------------------------------------------------------
  {
    id: 'haikyuu',
    title: 'Haikyuu!!',
    slug: 'haikyuu',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8133/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8133/original.jpg',
    totalEpisodes: 85,
    totalCanonEpisodes: 85,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Sports', 'Shounen'],
    description:
      'Short but athletic Hinata Shouyou joins the Karasuno High School volleyball team, where he must learn to work with his rival-turned-setter Kageyama Tobio. Together they strive to lead their once-powerful team back to nationals. A masterclass in sports anime that perfectly captures teamwork, rivalry, and the thrill of competition.',
    arcs: [
      { name: 'S1: Karasuno Revival', startEp: 1, endEp: 25, isFiller: false },
      { name: 'S2: Training & Qualifiers', startEp: 26, endEp: 50, isFiller: false },
      { name: 'S3: Karasuno vs Shiratorizawa', startEp: 51, endEp: 60, isFiller: false },
      { name: 'S4: Nationals', startEp: 61, endEp: 85, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 27. Kuroko's Basketball
  // ---------------------------------------------------------------------------
  {
    id: 'kurokos-basketball',
    title: "Kuroko's Basketball",
    slug: 'kurokos-basketball',
    posterUrl: 'https://media.kitsu.app/anime/6595/poster_image/6e67d3e44da25e226260487109a1039f.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/6595/original.jpg',
    totalEpisodes: 75,
    totalCanonEpisodes: 75,
    status: 'completed',
    genre: ['Comedy', 'Sports', 'Shounen'],
    description:
      'Kuroko Tetsuya, the invisible sixth member of the legendary Generation of Miracles, joins Seirin High to prove that teamwork can overcome individual talent. Paired with the naturally gifted Kagami Taiga, they challenge the prodigies who now lead rival schools. An intense basketball anime with superhuman-level plays and passionate rivalries.',
    arcs: [
      { name: 'S1: Seirin vs Generation of Miracles', startEp: 1, endEp: 25, isFiller: false },
      { name: 'S2: Winter Cup Begins', startEp: 26, endEp: 50, isFiller: false },
      { name: 'S3: Winter Cup Finals', startEp: 51, endEp: 75, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 28. Assassination Classroom
  // ---------------------------------------------------------------------------
  {
    id: 'assassination-classroom',
    title: 'Assassination Classroom',
    slug: 'assassination-classroom',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8640/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8640/original.jpg',
    totalEpisodes: 47,
    totalCanonEpisodes: 47,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Sci-Fi', 'Shounen'],
    description:
      'A powerful tentacled creature who destroyed most of the moon becomes the homeroom teacher of class 3-E, the worst class at Kunugigaoka Junior High. The students must assassinate their teacher before graduation or he will destroy the Earth. A brilliantly unique series that blends comedy, action, and heartfelt lessons about education.',
    arcs: [
      { name: 'S1: Class 3-E', startEp: 1, endEp: 22, isFiller: false },
      { name: 'S2: Final Semester', startEp: 23, endEp: 47, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 29. Blue Exorcist
  // ---------------------------------------------------------------------------
  {
    id: 'blue-exorcist',
    title: 'Blue Exorcist',
    slug: 'blue-exorcist',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/5940/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/5940/original.jpg',
    totalEpisodes: 49,
    totalCanonEpisodes: 49,
    status: 'completed',
    genre: ['Action', 'Fantasy', 'Shounen', 'Supernatural'],
    description:
      'Rin Okumura discovers he is the son of Satan and possesses demonic blue flames. Rather than embrace his dark heritage, he enrolls at True Cross Academy to become an exorcist and defeat his father. A thrilling supernatural action series about defying destiny and protecting the ones you love.',
    arcs: [
      { name: 'S1: True Cross Academy', startEp: 1, endEp: 25, isFiller: false },
      { name: 'S2: Kyoto Impure King', startEp: 26, endEp: 37, isFiller: false },
      { name: 'S3: Shimane Illuminati', startEp: 38, endEp: 49, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 30. Soul Eater
  // ---------------------------------------------------------------------------
  {
    id: 'soul-eater',
    title: 'Soul Eater',
    slug: 'soul-eater',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/3128/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/3128/original.jpg',
    totalEpisodes: 51,
    totalCanonEpisodes: 35,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Shounen'],
    description:
      'At Death Weapon Meister Academy, students train to become living weapons and their wielders. Maka Albarn and her scythe partner Soul Eater Evans strive to collect 99 evil souls and one witch soul to create a Death Scythe. A stylish and inventive action series with a unique gothic-inspired aesthetic.',
    arcs: [
      { name: 'Introductory', startEp: 1, endEp: 3, isFiller: false },
      { name: 'Remedial Lessons & Uncanny Sword', startEp: 4, endEp: 13, isFiller: false },
      { name: 'The Kishin Revival', startEp: 14, endEp: 24, isFiller: false },
      { name: 'Brew & Arachnophobia', startEp: 25, endEp: 35, isFiller: false },
      { name: 'Anime Original Conclusion', startEp: 36, endEp: 51, isFiller: true },
    ],
  },

  // ---------------------------------------------------------------------------
  // 31. Noragami
  // ---------------------------------------------------------------------------
  {
    id: 'noragami',
    title: 'Noragami',
    slug: 'noragami',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7881/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7881/original.jpg',
    totalEpisodes: 25,
    totalCanonEpisodes: 25,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Supernatural'],
    description:
      'Yato is a minor god who dreams of having millions of worshippers but can barely scrape by doing odd jobs for five yen. When a high school girl named Hiyori becomes stuck between the living and spirit worlds after saving him, the three form an unlikely bond. A fun and emotional supernatural series blending Japanese mythology with modern life.',
    arcs: [
      { name: 'S1: Delivery God', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Bishamon Arc', startEp: 13, endEp: 18, isFiller: false },
      { name: 'S2: Ebisu Arc', startEp: 19, endEp: 25, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 32. Toriko
  // ---------------------------------------------------------------------------
  {
    id: 'toriko',
    title: 'Toriko',
    slug: 'toriko',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/6002/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/poster_images/6002/original.jpg',
    totalEpisodes: 147,
    totalCanonEpisodes: 110,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Shounen'],
    description:
      'In a world where the pursuit of the most delicious foods defines power, Toriko is a legendary Gourmet Hunter on a quest to find the rarest ingredients and complete his ultimate full-course meal. Alongside chef Komatsu, he battles monstrous beasts and rival hunters across the Gourmet World. An over-the-top shounen adventure centered on food and fighting.',
    arcs: [
      { name: 'Galala Gator & Puffer Whale', startEp: 1, endEp: 12, isFiller: false },
      { name: 'Regal Mammoth', startEp: 13, endEp: 26, isFiller: false },
      { name: 'Century Soup', startEp: 27, endEp: 50, isFiller: false },
      { name: 'Filler & Crossovers', startEp: 51, endEp: 63, isFiller: true },
      { name: 'Ozone Herb & Meteor Garlic', startEp: 64, endEp: 100, isFiller: false },
      { name: 'Cooking Festival', startEp: 101, endEp: 147, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 33. Berserk
  // ---------------------------------------------------------------------------
  {
    id: 'berserk',
    title: 'Berserk',
    slug: 'berserk',
    posterUrl: 'https://media.kitsu.app/anime/24/poster_image/e528552f3cc8e28a95d8ea98991b380d.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/24/cover_image/7e8f13e950295d64746899ca93c39eb3.jpg',
    totalEpisodes: 25,
    totalCanonEpisodes: 25,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Horror', 'Seinen'],
    description:
      'Guts, a lone mercenary with a massive sword, joins the Band of the Hawk led by the charismatic Griffith. Their brotherhood is tested as Griffith\'s ambition grows to terrifying extremes. The 1997 adaptation of the legendary dark fantasy manga is a brutal and deeply emotional tale of friendship, betrayal, and the cost of ambition.',
    arcs: [
      { name: 'Black Swordsman', startEp: 1, endEp: 1, isFiller: false },
      { name: 'Golden Age', startEp: 2, endEp: 25, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 34. Cowboy Bebop
  // ---------------------------------------------------------------------------
  {
    id: 'cowboy-bebop',
    title: 'Cowboy Bebop',
    slug: 'cowboy-bebop',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/1/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/1/cover_image/fb57e5f25616633a41f0f5f1ded938ee.jpeg',
    totalEpisodes: 26,
    totalCanonEpisodes: 26,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi'],
    description:
      'In 2071, bounty hunter Spike Spiegel and his ragtag crew aboard the Bebop chase criminals across the solar system while running from their own pasts. With its jazz-infused soundtrack, noir storytelling, and stylish action, the series is a genre-defining masterpiece. Each crew member carries a burden that slowly unravels throughout the episodic adventures.',
    arcs: [
      { name: 'Bounty Hunter Blues', startEp: 1, endEp: 13, isFiller: false },
      { name: 'The Past Catches Up', startEp: 14, endEp: 26, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 35. Steins;Gate
  // ---------------------------------------------------------------------------
  {
    id: 'steins-gate',
    title: 'Steins;Gate',
    slug: 'steins-gate',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/6389/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/6389/original.png',
    totalEpisodes: 47,
    totalCanonEpisodes: 47,
    status: 'completed',
    genre: ['Drama', 'Sci-Fi', 'Suspense', 'Thriller'],
    description:
      'Self-proclaimed mad scientist Okabe Rintarou accidentally invents a way to send messages to the past, triggering a chain of events that threatens the lives of those closest to him. As he desperately tries to undo the consequences of time travel, the stakes grow ever higher. A critically acclaimed sci-fi thriller with a slow-burn buildup and devastating payoff.',
    arcs: [
      { name: 'S1: Steins;Gate', startEp: 1, endEp: 24, isFiller: false },
      { name: 'Steins;Gate 0', startEp: 25, endEp: 47, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 36. Neon Genesis Evangelion
  // ---------------------------------------------------------------------------
  {
    id: 'neon-genesis-evangelion',
    title: 'Neon Genesis Evangelion',
    slug: 'neon-genesis-evangelion',
    posterUrl: 'https://media.kitsu.app/anime/21/poster_image/077bf97dfb04853975a6e85694b861f4.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/21/original.jpg',
    totalEpisodes: 26,
    totalCanonEpisodes: 26,
    status: 'completed',
    genre: ['Action', 'Drama', 'Mecha', 'Psychological', 'Sci-Fi'],
    description:
      'Teenager Shinji Ikari is recruited by his estranged father to pilot a giant biomechanical robot called an Evangelion against monstrous beings known as Angels. What begins as a mecha action series evolves into a profound exploration of depression, identity, and human connection. One of the most influential and psychologically complex anime ever made.',
    arcs: [
      { name: 'Angel Battles', startEp: 1, endEp: 15, isFiller: false },
      { name: 'Descent & Instrumentality', startEp: 16, endEp: 26, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 37. Ghost in the Shell: Stand Alone Complex
  // ---------------------------------------------------------------------------
  {
    id: 'ghost-in-the-shell',
    title: 'Ghost in the Shell: Stand Alone Complex',
    slug: 'ghost-in-the-shell',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/429/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/429/original.png',
    totalEpisodes: 26,
    totalCanonEpisodes: 26,
    status: 'completed',
    genre: ['Action', 'Military', 'Sci-Fi', 'Seinen', 'Police'],
    description:
      'In a future where cybernetic enhancements are commonplace, Major Motoko Kusanagi leads Section 9, an elite counter-cyberterrorism unit. The team investigates the mysterious Laughing Man case while navigating political intrigue and philosophical questions about identity in a digital age. A landmark cyberpunk series that influenced science fiction worldwide.',
    arcs: [
      { name: 'Stand Alone Episodes', startEp: 1, endEp: 13, isFiller: false },
      { name: 'Complex Episodes & Laughing Man', startEp: 14, endEp: 26, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 38. Parasyte
  // ---------------------------------------------------------------------------
  {
    id: 'parasyte',
    title: 'Parasyte -the maxim-',
    slug: 'parasyte',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8147/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/8147/cover_image/ddc8c50acee9f5b32f6dc1d236f354fc.jpg',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Drama', 'Horror', 'Sci-Fi', 'Seinen'],
    description:
      'Alien parasites invade Earth by burrowing into human brains, but one fails to reach teenager Shinichi Izumi\'s brain and instead takes over his right hand. Named Migi, the parasite and Shinichi form an uneasy alliance to survive against other parasites that see them as a threat. A gripping body-horror thriller exploring what it means to be human.',
    arcs: [
      { name: 'Parasyte Awakening', startEp: 1, endEp: 8, isFiller: false },
      { name: 'Evolution & Conflict', startEp: 9, endEp: 18, isFiller: false },
      { name: 'Final Battle', startEp: 19, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 39. Monster
  // ---------------------------------------------------------------------------
  {
    id: 'monster',
    title: 'Monster',
    slug: 'monster',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/10/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/10/original.jpg',
    totalEpisodes: 74,
    totalCanonEpisodes: 74,
    status: 'completed',
    genre: ['Drama', 'Mystery', 'Psychological', 'Seinen', 'Thriller'],
    description:
      'Dr. Kenzo Tenma, a brilliant Japanese surgeon living in Germany, saves the life of a young boy over the city mayor. Years later, the boy grows up to become a serial killer, and Tenma embarks on a journey across Europe to stop the monster he saved. A masterful psychological thriller by Naoki Urasawa that is often cited as one of the greatest anime of all time.',
    arcs: [
      { name: 'Dusseldorf', startEp: 1, endEp: 14, isFiller: false },
      { name: 'The Chase Begins', startEp: 15, endEp: 30, isFiller: false },
      { name: 'Johan\'s Past', startEp: 31, endEp: 50, isFiller: false },
      { name: 'Ruhenheim & Finale', startEp: 51, endEp: 74, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 40. Psycho-Pass
  // ---------------------------------------------------------------------------
  {
    id: 'psycho-pass',
    title: 'Psycho-Pass',
    slug: 'psycho-pass',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7000/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7000/original.jpg',
    totalEpisodes: 41,
    totalCanonEpisodes: 41,
    status: 'completed',
    genre: ['Action', 'Psychological', 'Sci-Fi', 'Thriller'],
    description:
      'In a dystopian future, the Sibyl System measures citizens\' mental states to predict criminal behavior. Inspector Akane Tsunemori joins the Public Safety Bureau and begins questioning the system\'s justice when confronted by a criminal genius it cannot judge. A thought-provoking cyberpunk thriller about free will, justice, and the cost of a perfectly ordered society.',
    arcs: [
      { name: 'S1: Makishima Case', startEp: 1, endEp: 22, isFiller: false },
      { name: 'S2: Kamui Case', startEp: 23, endEp: 33, isFiller: false },
      { name: 'S3: Bifrost Conspiracy', startEp: 34, endEp: 41, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 41. Mob Psycho 100
  // ---------------------------------------------------------------------------
  {
    id: 'mob-psycho-100',
    title: 'Mob Psycho 100',
    slug: 'mob-psycho-100',
    posterUrl: 'https://media.kitsu.app/anime/11578/poster_image/eb491c185d46b275e17fb82204d9a53b.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/11578/original.jpg',
    totalEpisodes: 37,
    totalCanonEpisodes: 37,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Psychological', 'Supernatural'],
    description:
      'Shigeo "Mob" Kageyama is an incredibly powerful psychic who suppresses his emotions to keep his powers in check. Working for the con-artist spirit medium Reigen Arataka, Mob tries to live a normal middle school life while his power gauge slowly climbs toward 100%. From the creator of One Punch Man, a brilliantly animated and deeply human story.',
    arcs: [
      { name: 'S1: Awakening', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Urban Legends & Claw', startEp: 13, endEp: 25, isFiller: false },
      { name: 'S3: Divine Tree & Confession', startEp: 26, endEp: 37, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 42. Claymore
  // ---------------------------------------------------------------------------
  {
    id: 'claymore',
    title: 'Claymore',
    slug: 'claymore',
    posterUrl: 'https://media.kitsu.app/anime/1635/poster_image/7ed07299746e9c8dda29768452c36f96.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/1635/original.jpg',
    totalEpisodes: 26,
    totalCanonEpisodes: 20,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Fantasy', 'Horror', 'Shounen'],
    description:
      'In a medieval world plagued by shape-shifting demons called Yoma, half-human, half-Yoma warriors known as Claymores are humanity\'s only defense. Clare, the weakest of the Claymores, carries a burning desire for vengeance that drives her to fight beyond her limits. A dark fantasy with brutal combat and compelling character development.',
    arcs: [
      { name: 'Clare & Raki', startEp: 1, endEp: 8, isFiller: false },
      { name: 'Northern Campaign', startEp: 9, endEp: 20, isFiller: false },
      { name: 'Anime Original Ending', startEp: 21, endEp: 26, isFiller: true },
    ],
  },

  // ---------------------------------------------------------------------------
  // 43. Your Lie in April
  // ---------------------------------------------------------------------------
  {
    id: 'your-lie-in-april',
    title: 'Your Lie in April',
    slug: 'your-lie-in-april',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8403/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8403/original.png',
    totalEpisodes: 22,
    totalCanonEpisodes: 22,
    status: 'completed',
    genre: ['Drama', 'Music', 'Romance', 'Shounen'],
    description:
      'Piano prodigy Kousei Arima lost the ability to hear his own playing after his mother\'s death. His monochrome world changes when he meets Kaori Miyazono, a free-spirited violinist who drags him back into the world of music. A beautiful and emotionally devastating story about love, loss, and the healing power of music.',
    arcs: [
      { name: 'Meeting Kaori', startEp: 1, endEp: 8, isFiller: false },
      { name: 'Competition & Growth', startEp: 9, endEp: 16, isFiller: false },
      { name: 'Finale', startEp: 17, endEp: 22, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 44. Clannad
  // ---------------------------------------------------------------------------
  {
    id: 'clannad',
    title: 'Clannad',
    slug: 'clannad',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/1962/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/1962/original.jpg',
    totalEpisodes: 47,
    totalCanonEpisodes: 45,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Romance', 'Slice of Life'],
    description:
      'Delinquent Tomoya Okazaki meets the strange girl Nagisa Furukawa and helps her revive the school drama club. Along the way, he connects with other students and begins to find purpose in life. Adapted from the beloved visual novel, Clannad is a touching story about family, growing up, and finding meaning in everyday moments.',
    arcs: [
      { name: 'S1: School Life', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S1: Drama Club & Graduation', startEp: 13, endEp: 23, isFiller: false },
      { name: 'After Story', startEp: 24, endEp: 39, isFiller: false },
      { name: 'After Story: Illusionary World', startEp: 40, endEp: 45, isFiller: false },
      { name: 'Extra Episodes', startEp: 46, endEp: 47, isFiller: true },
    ],
  },

  // ---------------------------------------------------------------------------
  // 45. Toradora
  // ---------------------------------------------------------------------------
  {
    id: 'toradora',
    title: 'Toradora!',
    slug: 'toradora',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/3532/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/3532/original.png',
    totalEpisodes: 25,
    totalCanonEpisodes: 25,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Romance', 'Slice of Life'],
    description:
      'The scary-looking but gentle Ryuuji Takasu and the tiny but fierce Taiga Aisaka discover they have crushes on each other\'s best friends and form an alliance to help each other win their love interests. As their scheme unfolds, they begin to realize their true feelings. One of the most beloved romantic comedies in anime.',
    arcs: [
      { name: 'Alliance', startEp: 1, endEp: 8, isFiller: false },
      { name: 'Summer & Culture Festival', startEp: 9, endEp: 18, isFiller: false },
      { name: 'Christmas & Conclusion', startEp: 19, endEp: 25, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 46. Fruits Basket
  // ---------------------------------------------------------------------------
  {
    id: 'fruits-basket',
    title: 'Fruits Basket',
    slug: 'fruits-basket',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/41995/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/41995/original.jpg',
    totalEpisodes: 63,
    totalCanonEpisodes: 63,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Romance', 'Slice of Life', 'Supernatural'],
    description:
      'After losing her mother and living in a tent, orphan Tohru Honda is taken in by the mysterious Soma family. She discovers their secret: members of the family transform into animals of the Chinese zodiac when embraced. A deeply emotional story about healing, acceptance, and the bonds of found family.',
    arcs: [
      { name: 'S1: Meeting the Sohmas', startEp: 1, endEp: 25, isFiller: false },
      { name: 'S2: Curse Deepens', startEp: 26, endEp: 50, isFiller: false },
      { name: 'S3: The Final', startEp: 51, endEp: 63, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 47. Oregairu (My Teen Romantic Comedy SNAFU)
  // ---------------------------------------------------------------------------
  {
    id: 'oregairu',
    title: 'Oregairu (My Teen Romantic Comedy SNAFU)',
    slug: 'oregairu',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7169/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7169/original.jpg',
    totalEpisodes: 38,
    totalCanonEpisodes: 38,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Romance', 'Slice of Life'],
    description:
      'Cynical loner Hachiman Hikigaya is forced to join the Service Club alongside the beautiful but cold Yukino Yukinoshita. Together they help students with their problems while slowly confronting their own emotional walls. A smart and introspective romantic comedy that deconstructs high school social dynamics.',
    arcs: [
      { name: 'S1: Service Club', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S2: Something Genuine', startEp: 14, endEp: 26, isFiller: false },
      { name: 'S3: Climax', startEp: 27, endEp: 38, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 48. Anohana
  // ---------------------------------------------------------------------------
  {
    id: 'anohana',
    title: 'Anohana: The Flower We Saw That Day',
    slug: 'anohana',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/5981/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/5981/original.jpg',
    totalEpisodes: 11,
    totalCanonEpisodes: 11,
    status: 'completed',
    genre: ['Drama', 'Slice of Life', 'Supernatural'],
    description:
      'Years after the death of their childhood friend Menma, the Super Peace Busters have drifted apart. When Menma\'s ghost appears to the reclusive Jinta, asking him to grant her forgotten wish, the group must reunite and confront their guilt and unresolved grief. A heartrending story about childhood loss, friendship, and letting go.',
    arcs: [
      { name: 'Reunion', startEp: 1, endEp: 5, isFiller: false },
      { name: 'Menma\'s Wish', startEp: 6, endEp: 11, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 49. Kaguya-sama: Love is War
  // ---------------------------------------------------------------------------
  {
    id: 'kaguya-sama',
    title: 'Kaguya-sama: Love is War',
    slug: 'kaguya-sama',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/41373/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/41373/original.jpg',
    totalEpisodes: 37,
    totalCanonEpisodes: 37,
    status: 'completed',
    genre: ['Comedy', 'Psychological', 'Romance'],
    description:
      'Student council president Miyuki Shirogane and vice-president Kaguya Shinomiya are both in love with each other but refuse to confess first. Each day becomes a battle of wits as they scheme to make the other confess, turning romance into psychological warfare. A hilarious and clever romantic comedy with razor-sharp writing.',
    arcs: [
      { name: 'S1: Love is War', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Love is War 2', startEp: 13, endEp: 24, isFiller: false },
      { name: 'S3: Ultra Romantic', startEp: 25, endEp: 37, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 50. Horimiya
  // ---------------------------------------------------------------------------
  {
    id: 'horimiya',
    title: 'Horimiya',
    slug: 'horimiya',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/43545/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/43545/original.jpg',
    totalEpisodes: 13,
    totalCanonEpisodes: 13,
    status: 'completed',
    genre: ['Comedy', 'Romance', 'Slice of Life'],
    description:
      'Popular honor student Hori and gloomy outcast Miyamura discover each other\'s hidden sides outside of school. As they grow closer, their relationship develops naturally and honestly. A refreshing and heartwarming romance that skips common tropes in favor of genuine, mature relationship development.',
    arcs: [
      { name: 'Secret Sides', startEp: 1, endEp: 4, isFiller: false },
      { name: 'Relationship Development', startEp: 5, endEp: 9, isFiller: false },
      { name: 'Friends & Future', startEp: 10, endEp: 13, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 51. Rent-a-Girlfriend
  // ---------------------------------------------------------------------------
  {
    id: 'rent-a-girlfriend',
    title: 'Rent-a-Girlfriend',
    slug: 'rent-a-girlfriend',
    posterUrl: 'https://media.kitsu.app/anime/43028/poster_image/5c4fb9b9f0d94b8c48cb7ca2beeaf8ba.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/43028/original.png',
    totalEpisodes: 36,
    totalCanonEpisodes: 36,
    status: 'completed',
    genre: ['Comedy', 'Romance', 'Ecchi'],
    description:
      'After being dumped by his girlfriend, college student Kazuya Kinoshita rents a girlfriend named Chizuru Mizuhara to cope. When their families find out, the fake relationship spirals into an increasingly complicated web of lies. A rom-com filled with awkward situations, misunderstandings, and slowly developing feelings.',
    arcs: [
      { name: 'S1: Rental Girlfriend', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Second Season', startEp: 13, endEp: 24, isFiller: false },
      { name: 'S3: Third Season', startEp: 25, endEp: 36, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 52. My Dress-Up Darling
  // ---------------------------------------------------------------------------
  {
    id: 'my-dress-up-darling',
    title: 'My Dress-Up Darling',
    slug: 'my-dress-up-darling',
    posterUrl: 'https://media.kitsu.app/anime/44382/poster_image/98e0bece112ab976f34502359505da50.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/44382/cover_image/ee63290838bcd2fe3acd5eaa2e4f7df4.jpg',
    totalEpisodes: 12,
    totalCanonEpisodes: 12,
    status: 'completed',
    genre: ['Comedy', 'Ecchi', 'Romance', 'Slice of Life'],
    description:
      'Shy doll-artisan Wakana Gojo is dragged into the world of cosplay by the outgoing and otaku-obsessed Marin Kitagawa. As he crafts costumes for her, the two develop an unlikely friendship that blossoms into something more. A charming and visually stunning romance that celebrates passion for hobbies and self-expression.',
    arcs: [
      { name: 'First Cosplay', startEp: 1, endEp: 5, isFiller: false },
      { name: 'New Projects & Growing Closer', startEp: 6, endEp: 12, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 53. That Time I Got Reincarnated as a Slime
  // ---------------------------------------------------------------------------
  {
    id: 'reincarnated-as-a-slime',
    title: 'That Time I Got Reincarnated as a Slime',
    slug: 'reincarnated-as-a-slime',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/41024/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/41024/original.jpg',
    totalEpisodes: 72,
    totalCanonEpisodes: 72,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Isekai'],
    description:
      'A 37-year-old salaryman is reincarnated as a slime in a fantasy world, gaining the ability to absorb and mimic anything he devours. Named Rimuru Tempest, he builds a nation of monsters and forges alliances across the world. A feel-good isekai with excellent world-building and an overpowered but likable protagonist.',
    arcs: [
      { name: 'S1: Building Tempest', startEp: 1, endEp: 24, isFiller: false },
      { name: 'S2: Falmuth & Demon Lord', startEp: 25, endEp: 48, isFiller: false },
      { name: 'S3: Holy War & Council', startEp: 49, endEp: 72, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 54. No Game No Life
  // ---------------------------------------------------------------------------
  {
    id: 'no-game-no-life',
    title: 'No Game No Life',
    slug: 'no-game-no-life',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7880/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7880/original.jpg',
    totalEpisodes: 12,
    totalCanonEpisodes: 12,
    status: 'completed',
    genre: ['Adventure', 'Comedy', 'Ecchi', 'Fantasy', 'Isekai'],
    description:
      'Genius gaming siblings Sora and Shiro are transported to a world where all conflicts are resolved through games. Representing the weakest race, humanity, they challenge the other sixteen races to unite the world. A colorful and cleverly written fantasy where every battle is a game of strategy and deception.',
    arcs: [
      { name: 'Disboard & Elkia', startEp: 1, endEp: 6, isFiller: false },
      { name: 'Eastern Federation Challenge', startEp: 7, endEp: 12, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 55. Konosuba
  // ---------------------------------------------------------------------------
  {
    id: 'konosuba',
    title: 'Konosuba: God\'s Blessing on This Wonderful World!',
    slug: 'konosuba',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/10941/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/10941/original.png',
    totalEpisodes: 31,
    totalCanonEpisodes: 31,
    status: 'completed',
    genre: ['Adventure', 'Comedy', 'Fantasy', 'Isekai', 'Parody'],
    description:
      'After dying in an embarrassing way, shut-in gamer Kazuma is reincarnated in a fantasy world with a useless goddess, an explosion-obsessed mage, and a masochistic crusader. Instead of becoming a hero, he just wants to live a comfortable life. The ultimate isekai parody, packed with slapstick comedy and lovably dysfunctional characters.',
    arcs: [
      { name: 'S1: Wonderful World', startEp: 1, endEp: 10, isFiller: false },
      { name: 'S2: Trial & Hot Springs', startEp: 11, endEp: 20, isFiller: false },
      { name: 'S3: Princess & Kingdom', startEp: 21, endEp: 31, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 56. The Rising of the Shield Hero
  // ---------------------------------------------------------------------------
  {
    id: 'shield-hero',
    title: 'The Rising of the Shield Hero',
    slug: 'shield-hero',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/13593/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/13593/original.jpg',
    totalEpisodes: 50,
    totalCanonEpisodes: 50,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Isekai'],
    description:
      'Naofumi Iwatani is summoned to another world as the Shield Hero, but is immediately betrayed and left with nothing. Scorned and distrusted, he must grow stronger with his only companion, a demi-human slave named Raphtalia. A revenge-driven isekai about overcoming false accusations and proving one\'s worth against all odds.',
    arcs: [
      { name: 'S1: Shield Hero Awakens', startEp: 1, endEp: 25, isFiller: false },
      { name: 'S2: Spirit Tortoise & Other World', startEp: 26, endEp: 38, isFiller: false },
      { name: 'S3: Village & Waves', startEp: 39, endEp: 50, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 57. Mushoku Tensei / Jobless Reincarnation
  // ---------------------------------------------------------------------------
  {
    id: 'mushoku-tensei',
    title: 'Mushoku Tensei: Jobless Reincarnation',
    slug: 'mushoku-tensei',
    posterUrl: 'https://media.kitsu.app/anime/42323/poster_image/f04fc56cc33155d892b94d4e42af077e.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/42323/cover_image/4fecb3a5495260e2c6d7176e07f56531.jpg',
    totalEpisodes: 48,
    totalCanonEpisodes: 48,
    status: 'completed',
    genre: ['Adventure', 'Drama', 'Ecchi', 'Fantasy', 'Isekai'],
    description:
      'A 34-year-old shut-in is reincarnated as Rudeus Greyrat in a magical world and vows to live this new life without regret. With memories of his past life, he becomes a prodigious mage while navigating childhood, family bonds, and a vast world. Often considered the series that codified the modern isekai genre.',
    arcs: [
      { name: 'S1: Childhood & Demon Continent', startEp: 1, endEp: 23, isFiller: false },
      { name: 'S2: University Arc', startEp: 24, endEp: 35, isFiller: false },
      { name: 'S2: Labyrinth Arc', startEp: 36, endEp: 48, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 58. Tensura (Slime Diaries)
  // ---------------------------------------------------------------------------
  {
    id: 'slime-diaries',
    title: 'Slime Diaries: That Time I Got Reincarnated as a Slime',
    slug: 'slime-diaries',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/43089/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/43089/original.png',
    totalEpisodes: 12,
    totalCanonEpisodes: 12,
    status: 'completed',
    genre: ['Comedy', 'Fantasy', 'Slice of Life', 'Isekai'],
    description:
      'A spin-off of That Time I Got Reincarnated as a Slime focusing on the everyday lives of Rimuru and the citizens of Tempest. From farming to festivals, the series showcases the lighter, comedic side of the Tempest nation. A relaxing slice-of-life companion to the main series.',
    arcs: [
      { name: 'Daily Life in Tempest', startEp: 1, endEp: 12, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 59. Isekai Quartet
  // ---------------------------------------------------------------------------
  {
    id: 'isekai-quartet',
    title: 'Isekai Quartet',
    slug: 'isekai-quartet',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/42032/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/42032/original.png',
    totalEpisodes: 12,
    totalCanonEpisodes: 12,
    status: 'completed',
    genre: ['Comedy', 'Fantasy', 'Isekai', 'Parody'],
    description:
      'Characters from Re:Zero, Overlord, Konosuba, and Saga of Tanya the Evil are transported to a chibi school setting where they must coexist as classmates. A lighthearted crossover comedy featuring beloved characters from four popular isekai series interacting in hilarious ways.',
    arcs: [
      { name: 'School Life', startEp: 1, endEp: 12, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 60. In Another World With My Smartphone
  // ---------------------------------------------------------------------------
  {
    id: 'isekai-smartphone',
    title: 'In Another World With My Smartphone',
    slug: 'isekai-smartphone',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/13457/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/13457/original.png',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Adventure', 'Comedy', 'Fantasy', 'Harem', 'Isekai', 'Romance'],
    description:
      'After being accidentally killed by God, Touya Mochizuki is reincarnated in a fantasy world with enhanced abilities and his smartphone still working. He embarks on a carefree adventure, making friends and gaining a harem of beautiful companions. A lighthearted and overpowered isekai with a focus on fun over conflict.',
    arcs: [
      { name: 'S1: In Another World', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: In Another World 2', startEp: 13, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 61. Arifureta
  // ---------------------------------------------------------------------------
  {
    id: 'arifureta',
    title: 'Arifureta: From Commonplace to World\'s Strongest',
    slug: 'arifureta',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/14043/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/14043/original.jpg',
    totalEpisodes: 37,
    totalCanonEpisodes: 37,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Fantasy', 'Harem', 'Isekai'],
    description:
      'Hajime Nagumo, an ordinary student transported to a fantasy world with his class, falls into an abyss and is left for dead. Forced to eat monsters to survive, he becomes ruthlessly powerful and resolves to find a way home at any cost. A dark isekai about survival, transformation, and refusing to be a hero.',
    arcs: [
      { name: 'S1: From Commonplace to Strongest', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S2: Second Season', startEp: 14, endEp: 25, isFiller: false },
      { name: 'S3: Third Season', startEp: 26, endEp: 37, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 62. The Eminence in Shadow
  // ---------------------------------------------------------------------------
  {
    id: 'eminence-in-shadow',
    title: 'The Eminence in Shadow',
    slug: 'eminence-in-shadow',
    posterUrl: 'https://media.kitsu.app/anime/44107/poster_image/265bcd076f07986aecb6ec62e769c5d2.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/44107/cover_image/5cf3c261bc51eb0b2c3376aa4893ad49.png',
    totalEpisodes: 32,
    totalCanonEpisodes: 32,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Fantasy', 'Isekai', 'Reincarnation'],
    description:
      'Cid Kagenou is reincarnated in a fantasy world where he fulfills his lifelong dream of becoming a "shadow eminence" pulling strings from behind the scenes. He creates a fictional evil organization to fight, only to discover it actually exists. A brilliant comedy that parodies isekai and chuunibyou tropes with style.',
    arcs: [
      { name: 'S1: Shadow Garden', startEp: 1, endEp: 20, isFiller: false },
      { name: 'S2: Lawless City', startEp: 21, endEp: 32, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 63. JoJo's Bizarre Adventure
  // ---------------------------------------------------------------------------
  {
    id: 'jojos-bizarre-adventure',
    title: "JoJo's Bizarre Adventure",
    slug: 'jojos-bizarre-adventure',
    posterUrl: 'https://media.kitsu.app/anime/7158/poster_image/86c1aa856e619b058a9dd008f83440ce.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7158/original.png',
    totalEpisodes: 190,
    totalCanonEpisodes: 190,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Supernatural', 'Shounen'],
    description:
      'The Joestar family battles supernatural evil across generations, beginning with Jonathan Joestar\'s fight against the immortal vampire Dio Brando. Each part follows a different descendant with unique powers and flamboyant battles. Known for its iconic poses, creative power system, and endlessly quotable moments.',
    arcs: [
      { name: 'Part 1: Phantom Blood', startEp: 1, endEp: 9, isFiller: false },
      { name: 'Part 2: Battle Tendency', startEp: 10, endEp: 26, isFiller: false },
      { name: 'Part 3: Stardust Crusaders', startEp: 27, endEp: 50, isFiller: false },
      { name: 'Part 3: Egypt Arc', startEp: 51, endEp: 74, isFiller: false },
      { name: 'Part 4: Diamond is Unbreakable', startEp: 75, endEp: 113, isFiller: false },
      { name: 'Part 5: Golden Wind', startEp: 114, endEp: 152, isFiller: false },
      { name: 'Part 6: Stone Ocean', startEp: 153, endEp: 190, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 64. Fate/Zero
  // ---------------------------------------------------------------------------
  {
    id: 'fate-zero',
    title: 'Fate/Zero',
    slug: 'fate-zero',
    posterUrl: 'https://media.kitsu.app/anime/6028/poster_image/6067816593098a97506315c82b114171.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/6028/original.jpg',
    totalEpisodes: 25,
    totalCanonEpisodes: 25,
    status: 'completed',
    genre: ['Action', 'Fantasy', 'Supernatural', 'Thriller'],
    description:
      'Seven magi summon legendary heroes as Servants to battle in the Fourth Holy Grail War for the chance to have any wish granted. Kiritsugu Emiya, the ruthless "Mage Killer," fights to end all conflict while wielding the knight King Arthur. A dark and philosophical battle royale with stunning animation by ufotable.',
    arcs: [
      { name: 'S1: Fourth Holy Grail War', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S2: Conclusion', startEp: 14, endEp: 25, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 65. Fate/Stay Night: Unlimited Blade Works
  // ---------------------------------------------------------------------------
  {
    id: 'fate-stay-night-ubw',
    title: 'Fate/Stay Night: Unlimited Blade Works',
    slug: 'fate-stay-night-ubw',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7882/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7882/original.jpg',
    totalEpisodes: 26,
    totalCanonEpisodes: 26,
    status: 'completed',
    genre: ['Action', 'Fantasy', 'Romance', 'Supernatural'],
    description:
      'High school student Shirou Emiya is dragged into the Fifth Holy Grail War, summoning the Servant Saber to fight alongside him. As alliances shift and ideals clash, Shirou must confront the true nature of heroism. A visually spectacular adaptation focused on Rin Tohsaka\'s route from the visual novel.',
    arcs: [
      { name: 'S1: Unlimited Blade Works', startEp: 1, endEp: 13, isFiller: false },
      { name: 'S2: Unlimited Blade Works 2nd Season', startEp: 14, endEp: 26, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 66. Code Geass
  // ---------------------------------------------------------------------------
  {
    id: 'code-geass',
    title: 'Code Geass: Lelouch of the Rebellion',
    slug: 'code-geass',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/1415/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/1415/original.jpg',
    totalEpisodes: 50,
    totalCanonEpisodes: 50,
    status: 'completed',
    genre: ['Action', 'Drama', 'Mecha', 'Military', 'Sci-Fi'],
    description:
      'Exiled prince Lelouch vi Britannia gains the power of Geass, which allows him to command absolute obedience from anyone he makes eye contact with. Using the alias Zero, he leads a rebellion against the Holy Britannian Empire. A masterful political thriller with mecha battles, moral dilemmas, and one of anime\'s greatest endings.',
    arcs: [
      { name: 'S1: Black Knights Rise', startEp: 1, endEp: 25, isFiller: false },
      { name: 'R2: Renewed Rebellion', startEp: 26, endEp: 38, isFiller: false },
      { name: 'R2: Zero Requiem', startEp: 39, endEp: 50, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 67. Guilty Crown
  // ---------------------------------------------------------------------------
  {
    id: 'guilty-crown',
    title: 'Guilty Crown',
    slug: 'guilty-crown',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/6349/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/6349/original.jpg',
    totalEpisodes: 22,
    totalCanonEpisodes: 22,
    status: 'completed',
    genre: ['Action', 'Drama', 'Mecha', 'Romance', 'Sci-Fi'],
    description:
      'In a post-apocalyptic Tokyo under military rule, timid student Shu Ouma gains the power to extract weapons from people\'s hearts. He joins the resistance group Funeral Parlor led by the enigmatic Gai. A visually stunning series with a memorable soundtrack exploring themes of power, sacrifice, and identity.',
    arcs: [
      { name: 'Funeral Parlor', startEp: 1, endEp: 12, isFiller: false },
      { name: 'School Lockdown & Finale', startEp: 13, endEp: 22, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 68. Akame ga Kill
  // ---------------------------------------------------------------------------
  {
    id: 'akame-ga-kill',
    title: 'Akame ga Kill!',
    slug: 'akame-ga-kill',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8270/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8270/original.jpg',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    description:
      'Country boy Tatsumi travels to the capital to earn money for his village, only to discover the empire\'s deep corruption. He joins Night Raid, a group of assassins wielding powerful Imperial Arms who fight to overthrow the tyrannical regime. A brutal action series where no character is safe from death.',
    arcs: [
      { name: 'Night Raid Initiation', startEp: 1, endEp: 8, isFiller: false },
      { name: 'Jaegers vs Night Raid', startEp: 9, endEp: 16, isFiller: false },
      { name: 'Revolution & Final Battle', startEp: 17, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 69. Seraph of the End
  // ---------------------------------------------------------------------------
  {
    id: 'seraph-of-the-end',
    title: 'Seraph of the End',
    slug: 'seraph-of-the-end',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8736/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8736/original.jpg',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Drama', 'Fantasy', 'Shounen', 'Supernatural'],
    description:
      'After a deadly virus wipes out most of humanity, vampires emerge to enslave the survivors. Yuuichirou Hyakuya escapes the vampire underground city and joins the Japanese Imperial Demon Army to rescue his best friend Mikaela. A dark action series about revenge, family bonds, and humanity\'s fight against supernatural oppression.',
    arcs: [
      { name: 'S1: Vampire Reign', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Battle in Nagoya', startEp: 13, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 70. Dororo
  // ---------------------------------------------------------------------------
  {
    id: 'dororo',
    title: 'Dororo',
    slug: 'dororo',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/41083/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/41083/original.png',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Historical', 'Supernatural'],
    description:
      'Born without limbs, skin, or organs after his father made a pact with demons, Hyakkimaru fights to reclaim his body by slaying the twelve demons who hold his parts. Accompanied by the young orphan thief Dororo, he wanders through war-torn feudal Japan. A beautifully animated reimagining of Osamu Tezuka\'s classic manga.',
    arcs: [
      { name: 'Journey Begins', startEp: 1, endEp: 6, isFiller: false },
      { name: 'Demon Hunts', startEp: 7, endEp: 15, isFiller: false },
      { name: 'Daigo & Finale', startEp: 16, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 71. Samurai Champloo
  // ---------------------------------------------------------------------------
  {
    id: 'samurai-champloo',
    title: 'Samurai Champloo',
    slug: 'samurai-champloo',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/181/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/181/original.jpg',
    totalEpisodes: 26,
    totalCanonEpisodes: 26,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Historical'],
    description:
      'In Edo-era Japan infused with hip-hop culture, waitress Fuu recruits two rival swordsmen, the wild Mugen and the stoic Jin, to help her find the "samurai who smells of sunflowers." Their journey across Japan is episodic and unpredictable, blending stunning swordplay with a legendary hip-hop soundtrack by Nujabes.',
    arcs: [
      { name: 'The Journey Begins', startEp: 1, endEp: 13, isFiller: false },
      { name: 'Sunflower Samurai', startEp: 14, endEp: 26, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 72. Rurouni Kenshin
  // ---------------------------------------------------------------------------
  {
    id: 'rurouni-kenshin',
    title: 'Rurouni Kenshin',
    slug: 'rurouni-kenshin',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/27/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/27/original.jpg',
    totalEpisodes: 94,
    totalCanonEpisodes: 62,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Historical', 'Romance', 'Shounen'],
    description:
      'Former assassin Himura Kenshin wanders Meiji-era Japan with a reverse-blade sword, atoning for his violent past by protecting the innocent. He finds a home at the Kamiya dojo and faces enemies from his dark history. A beloved samurai series that balances intense sword fights with heartfelt character drama.',
    arcs: [
      { name: 'Tokyo Arc', startEp: 1, endEp: 27, isFiller: false },
      { name: 'Kyoto Arc', startEp: 28, endEp: 62, isFiller: false },
      { name: 'Filler Arc', startEp: 63, endEp: 94, isFiller: true },
    ],
  },

  // ---------------------------------------------------------------------------
  // 73. Gurren Lagann
  // ---------------------------------------------------------------------------
  {
    id: 'gurren-lagann',
    title: 'Gurren Lagann',
    slug: 'gurren-lagann',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/1801/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/1801/original.jpg',
    totalEpisodes: 27,
    totalCanonEpisodes: 27,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Mecha', 'Sci-Fi'],
    description:
      'Simon and the boisterous Kamina break free from their underground village to fight against the Beastmen who rule the surface with giant mechs. Their drill-powered robot Gurren Lagann grows to absurd proportions as they battle increasingly powerful enemies. The ultimate hot-blooded mecha anime that celebrates willpower and the human spirit.',
    arcs: [
      { name: 'Beastmen War', startEp: 1, endEp: 15, isFiller: false },
      { name: 'Anti-Spiral War', startEp: 16, endEp: 27, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 74. Mobile Suit Gundam
  // ---------------------------------------------------------------------------
  {
    id: 'mobile-suit-gundam',
    title: 'Mobile Suit Gundam',
    slug: 'mobile-suit-gundam',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/2346/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/2346/original.jpg',
    totalEpisodes: 43,
    totalCanonEpisodes: 43,
    status: 'completed',
    genre: ['Action', 'Drama', 'Mecha', 'Military', 'Sci-Fi'],
    description:
      'In Universal Century 0079, the space colony Side 3 declares independence as the Principality of Zeon and wages war against the Earth Federation. Young civilian Amuro Ray becomes the pilot of the Federation\'s secret weapon, the RX-78-2 Gundam. The original series that launched the real robot genre and one of anime\'s most influential franchises.',
    arcs: [
      { name: 'White Base Launch', startEp: 1, endEp: 14, isFiller: false },
      { name: 'Earth Campaign', startEp: 15, endEp: 30, isFiller: false },
      { name: 'A Baoa Qu & Finale', startEp: 31, endEp: 43, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 75. Macross
  // ---------------------------------------------------------------------------
  {
    id: 'macross',
    title: 'Macross',
    slug: 'macross',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/3113/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/3113/original.jpg',
    totalEpisodes: 36,
    totalCanonEpisodes: 36,
    status: 'completed',
    genre: ['Action', 'Mecha', 'Military', 'Music', 'Romance', 'Sci-Fi'],
    description:
      'When an alien warship crashes on Earth, humanity rebuilds it as the SDF-1 Macross. When the Zentradi alien fleet attacks to reclaim it, fighter pilot Hikaru Ichijyo, singer Lynn Minmay, and officer Misa Hayase become entangled in a war where music might be the ultimate weapon. A classic that defined the mecha-music genre.',
    arcs: [
      { name: 'Space War I', startEp: 1, endEp: 27, isFiller: false },
      { name: 'Aftermath', startEp: 28, endEp: 36, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 76. Darling in the FranXX
  // ---------------------------------------------------------------------------
  {
    id: 'darling-in-the-franxx',
    title: 'Darling in the FranXX',
    slug: 'darling-in-the-franxx',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/13600/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/13600/original.jpg',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Drama', 'Mecha', 'Romance', 'Sci-Fi'],
    description:
      'In a dystopian future, children pilot giant mechs called FranXX in male-female pairs to fight mysterious creatures called Klaxosaurs. Hiro, a failed pilot, meets the dangerous and enigmatic Zero Two, and together they form a partnership that challenges everything they\'ve been taught. A mecha romance exploring identity, freedom, and what it means to be human.',
    arcs: [
      { name: 'Plantation 13', startEp: 1, endEp: 6, isFiller: false },
      { name: 'Gran Crevasse', startEp: 7, endEp: 15, isFiller: false },
      { name: 'VIRM & Space Battle', startEp: 16, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 77. Eureka Seven
  // ---------------------------------------------------------------------------
  {
    id: 'eureka-seven',
    title: 'Eureka Seven',
    slug: 'eureka-seven',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/212/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/212/original.jpg',
    totalEpisodes: 50,
    totalCanonEpisodes: 50,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Drama', 'Mecha', 'Romance', 'Sci-Fi'],
    description:
      'Renton Thurston, a bored teenager, joins the rebel group Gekkostate after the mysterious girl Eureka crashes into his life piloting the mech Nirvash. Together they ride Trapar waves on sky-surfing mechs and fight a military government. A coming-of-age mecha adventure with a killer soundtrack and heartfelt romance.',
    arcs: [
      { name: 'Joining Gekkostate', startEp: 1, endEp: 13, isFiller: false },
      { name: 'Growth & Conflict', startEp: 14, endEp: 26, isFiller: false },
      { name: 'Scub Coral & Eureka', startEp: 27, endEp: 40, isFiller: false },
      { name: 'Final Battle', startEp: 41, endEp: 50, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 78. Trigun
  // ---------------------------------------------------------------------------
  {
    id: 'trigun',
    title: 'Trigun',
    slug: 'trigun',
    posterUrl: 'https://media.kitsu.app/anime/3/poster_image/d49b13c258b7084769455749ba28d0b4.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/3/cover_image/a241650d05ac62f0022068355263ba54.jpg',
    totalEpisodes: 26,
    totalCanonEpisodes: 26,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi'],
    description:
      'Vash the Stampede is a legendary outlaw with a $$60 billion bounty on his head, but he\'s actually a pacifist goofball who avoids killing at all costs. As insurance agents Meryl and Milly follow him to minimize damage, the truth about his past and his brother Knives slowly emerges. A space western classic blending comedy with deep emotional themes.',
    arcs: [
      { name: 'Vash the Stampede', startEp: 1, endEp: 12, isFiller: false },
      { name: 'Gung-Ho Guns & Knives', startEp: 13, endEp: 26, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 79. Outlaw Star
  // ---------------------------------------------------------------------------
  {
    id: 'outlaw-star',
    title: 'Outlaw Star',
    slug: 'outlaw-star',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7726/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7726/original.jpg',
    totalEpisodes: 26,
    totalCanonEpisodes: 26,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Comedy', 'Sci-Fi', 'Space'],
    description:
      'Gene Starwind and his partner Jim Hawking stumble upon a bio-android named Melfina and a state-of-the-art spaceship called the Outlaw Star. Together they search for the legendary Galactic Leyline while fending off pirates, assassins, and rival treasure hunters. A fun and adventurous space opera from the late 90s.',
    arcs: [
      { name: 'Outlaw Star Launch', startEp: 1, endEp: 13, isFiller: false },
      { name: 'Galactic Leyline', startEp: 14, endEp: 26, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 80. Legend of the Galactic Heroes
  // ---------------------------------------------------------------------------
  {
    id: 'legend-of-galactic-heroes',
    title: 'Legend of the Galactic Heroes',
    slug: 'legend-of-galactic-heroes',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/727/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/727/original.jpg',
    totalEpisodes: 110,
    totalCanonEpisodes: 110,
    status: 'completed',
    genre: ['Drama', 'Military', 'Sci-Fi', 'Space'],
    description:
      'In a galaxy-spanning war between the autocratic Galactic Empire and the democratic Free Planets Alliance, two military geniuses rise on opposite sides: Reinhard von Lohengramm and Yang Wen-li. Their rivalry and philosophies drive an epic narrative about war, politics, and the nature of governance. Widely considered one of the greatest anime ever made.',
    arcs: [
      { name: 'Eternal Night', startEp: 1, endEp: 26, isFiller: false },
      { name: 'Ambition', startEp: 27, endEp: 54, isFiller: false },
      { name: 'New Thesis', startEp: 55, endEp: 86, isFiller: false },
      { name: 'Upheaval & Finale', startEp: 87, endEp: 110, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 81. Aldnoah.Zero
  // ---------------------------------------------------------------------------
  {
    id: 'aldnoah-zero',
    title: 'Aldnoah.Zero',
    slug: 'aldnoah-zero',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8297/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8297/original.jpg',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Mecha', 'Military', 'Sci-Fi'],
    description:
      'In 2014, the Vers Empire from Mars launches a devastating invasion of Earth using superior Aldnoah-powered mechs. High school student Inaho Kaizuka uses his analytical mind to fight back against overwhelming odds. A mecha war drama with an intense soundtrack by Hiroyuki Sawano and politically charged conflict between Earth and Mars.',
    arcs: [
      { name: 'S1: Aldnoah.Zero', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Aldnoah.Zero 2nd Season', startEp: 13, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 82. Infinite Stratos
  // ---------------------------------------------------------------------------
  {
    id: 'infinite-stratos',
    title: 'Infinite Stratos',
    slug: 'infinite-stratos',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/5583/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/5583/original.jpg',
    totalEpisodes: 24,
    totalCanonEpisodes: 24,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Harem', 'Mecha', 'Sci-Fi'],
    description:
      'Ichika Orimura is the only male in the world who can pilot an Infinite Stratos (IS), a powerful exoskeleton weapon. Enrolled in the all-girls IS Academy, he becomes the center of attention for elite female pilots from around the world. A mecha-harem action comedy with flashy battles and romantic competition.',
    arcs: [
      { name: 'S1: Infinite Stratos', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Infinite Stratos 2', startEp: 13, endEp: 24, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 83. Slam Dunk
  // ---------------------------------------------------------------------------
  {
    id: 'slam-dunk',
    title: 'Slam Dunk',
    slug: 'slam-dunk',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/148/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/148/original.jpg',
    totalEpisodes: 101,
    totalCanonEpisodes: 101,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Sports', 'Shounen'],
    description:
      'Delinquent Hanamichi Sakuragi joins the Shohoku High basketball team to impress a girl, but gradually falls in love with the sport itself. Despite having no experience, his athletic talent and fierce determination make him a formidable player. The most iconic basketball anime ever made, inspiring a generation of players in Japan.',
    arcs: [
      { name: 'Introduction & Training', startEp: 1, endEp: 26, isFiller: false },
      { name: 'Practice Matches', startEp: 27, endEp: 60, isFiller: false },
      { name: 'Inter-High Preliminaries', startEp: 61, endEp: 101, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 84. Captain Tsubasa
  // ---------------------------------------------------------------------------
  {
    id: 'captain-tsubasa',
    title: 'Captain Tsubasa',
    slug: 'captain-tsubasa',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/1451/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/poster_images/1451/original.jpg',
    totalEpisodes: 52,
    totalCanonEpisodes: 52,
    status: 'completed',
    genre: ['Action', 'Sports', 'Shounen'],
    description:
      'Soccer prodigy Tsubasa Ozora dreams of winning the FIFA World Cup for Japan. From elementary school tournaments to international competition, Tsubasa\'s passion and incredible skills inspire everyone around him. One of the most influential sports anime ever, credited with popularizing soccer across Asia and inspiring real-world players.',
    arcs: [
      { name: 'Elementary School', startEp: 1, endEp: 16, isFiller: false },
      { name: 'National Tournament', startEp: 17, endEp: 35, isFiller: false },
      { name: 'Junior Youth', startEp: 36, endEp: 52, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 85. Major
  // ---------------------------------------------------------------------------
  {
    id: 'major',
    title: 'Major',
    slug: 'major',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/582/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/582/original.jpeg',
    totalEpisodes: 154,
    totalCanonEpisodes: 154,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Sports', 'Shounen'],
    description:
      'Goro Honda, son of a professional baseball player, dreams of following in his father\'s footsteps despite numerous hardships. Starting from childhood, the series follows his journey through Little League, high school, and beyond. A long-running sports saga that spans Goro\'s entire baseball career with emotional depth.',
    arcs: [
      { name: 'S1: Little League', startEp: 1, endEp: 26, isFiller: false },
      { name: 'S2: Middle School', startEp: 27, endEp: 52, isFiller: false },
      { name: 'S3: High School', startEp: 53, endEp: 78, isFiller: false },
      { name: 'S4: USA & Minor League', startEp: 79, endEp: 104, isFiller: false },
      { name: 'S5: World Series', startEp: 105, endEp: 129, isFiller: false },
      { name: 'S6: Return to Japan', startEp: 130, endEp: 154, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 86. Diamond no Ace
  // ---------------------------------------------------------------------------
  {
    id: 'diamond-no-ace',
    title: 'Diamond no Ace',
    slug: 'diamond-no-ace',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7699/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7699/original.jpg',
    totalEpisodes: 178,
    totalCanonEpisodes: 178,
    status: 'completed',
    genre: ['Comedy', 'Sports', 'Shounen'],
    description:
      'Eijun Sawamura, a passionate but unrefined pitcher, enrolls at the elite Seidou High School to become the ace of the baseball team. Competing against talented rivals and facing the pressure of high school baseball, he must evolve his unique pitching style. An intense sports anime that captures the competitive spirit of Japanese high school baseball.',
    arcs: [
      { name: 'S1: Diamond no Ace', startEp: 1, endEp: 75, isFiller: false },
      { name: 'S2: Second Season', startEp: 76, endEp: 126, isFiller: false },
      { name: 'Act II', startEp: 127, endEp: 178, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 87. Blue Lock
  // ---------------------------------------------------------------------------
  {
    id: 'blue-lock',
    title: 'Blue Lock',
    slug: 'blue-lock',
    posterUrl: 'https://media.kitsu.app/anime/44973/poster_image/84ee75dbae67c4817c2bb4b9943fe90c.png',
    bannerUrl: 'https://media.kitsu.app/anime/44973/cover_image/46d59e2fa0087c76ad47d3bea7207391.jpg',
    totalEpisodes: 48,
    totalCanonEpisodes: 48,
    status: 'completed',
    genre: ['Action', 'Sports', 'Shounen'],
    description:
      'After Japan\'s World Cup failure, the Japanese Football Association creates Blue Lock, a controversial prison-like program to forge the world\'s greatest egoist striker. 300 young forwards compete in a battle royale where only the strongest survive. A revolutionary sports anime that treats soccer like a death game with intense psychological warfare.',
    arcs: [
      { name: 'S1: Blue Lock Selection', startEp: 1, endEp: 24, isFiller: false },
      { name: 'S2: VS U-20 Japan', startEp: 25, endEp: 48, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 88. Yuri on Ice
  // ---------------------------------------------------------------------------
  {
    id: 'yuri-on-ice',
    title: 'Yuri!!! on Ice',
    slug: 'yuri-on-ice',
    posterUrl: 'https://media.kitsu.app/anime/11999/poster_image/82c44d0bb5d1403b8359ee83a2f9b8f9.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/11999/original.jpg',
    totalEpisodes: 12,
    totalCanonEpisodes: 12,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Romance', 'Sports'],
    description:
      'After a crushing defeat in the Grand Prix Final, Japanese figure skater Yuri Katsuki considers retiring until his idol, Russian champion Victor Nikiforov, shows up to be his coach. Together they aim for gold while developing a relationship that transcends the ice. A groundbreaking sports anime celebrated for its representation and beautiful skating sequences.',
    arcs: [
      { name: 'Victor\'s Arrival & Training', startEp: 1, endEp: 6, isFiller: false },
      { name: 'Grand Prix Series & Final', startEp: 7, endEp: 12, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 89. Free! (Iwatobi Swim Club)
  // ---------------------------------------------------------------------------
  {
    id: 'free-iwatobi-swim-club',
    title: 'Free! - Iwatobi Swim Club',
    slug: 'free-iwatobi-swim-club',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7664/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7664/original.jpg',
    totalEpisodes: 37,
    totalCanonEpisodes: 37,
    status: 'completed',
    genre: ['Comedy', 'Drama', 'Slice of Life', 'Sports'],
    description:
      'Haruka Nanase and his friends revive their school swim club after reuniting with a childhood rival. The team bonds through training and competition as each member discovers what swimming truly means to them. A beautifully animated sports series by Kyoto Animation about friendship, rivalry, and finding your passion.',
    arcs: [
      { name: 'S1: Iwatobi Swim Club', startEp: 1, endEp: 12, isFiller: false },
      { name: 'S2: Eternal Summer', startEp: 13, endEp: 25, isFiller: false },
      { name: 'S3: Dive to the Future', startEp: 26, endEp: 37, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 90. Hajime no Ippo
  // ---------------------------------------------------------------------------
  {
    id: 'hajime-no-ippo',
    title: 'Hajime no Ippo',
    slug: 'hajime-no-ippo',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/238/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/238/original.jpg',
    totalEpisodes: 126,
    totalCanonEpisodes: 126,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Drama', 'Sports', 'Shounen'],
    description:
      'Bullied high school student Makunouchi Ippo discovers boxing after being saved by a pro boxer. With incredible determination and natural talent, he begins his journey through the ranks of Japanese professional boxing. One of the greatest sports anime ever made, delivering thrilling fights and genuine character growth.',
    arcs: [
      { name: 'S1: The Fighting!', startEp: 1, endEp: 75, isFiller: false },
      { name: 'S2: New Challenger', startEp: 76, endEp: 101, isFiller: false },
      { name: 'S3: Rising', startEp: 102, endEp: 126, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 91. Eyeshield 21
  // ---------------------------------------------------------------------------
  {
    id: 'eyeshield-21',
    title: 'Eyeshield 21',
    slug: 'eyeshield-21',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/6/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/6/original.jpg',
    totalEpisodes: 145,
    totalCanonEpisodes: 110,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Sports', 'Shounen'],
    description:
      'Timid Sena Kobayakawa is recruited by the scheming Hiruma to be the secret running back of the Deimon Devil Bats football team. With legs trained by years of running from bullies, Sena becomes the lightning-fast Eyeshield 21. An underdog sports story about American football in Japan with colorful characters and exciting matches.',
    arcs: [
      { name: 'Devil Bats Formation', startEp: 1, endEp: 30, isFiller: false },
      { name: 'Spring Tournament', startEp: 31, endEp: 64, isFiller: false },
      { name: 'Death March & Kanto Tournament', startEp: 65, endEp: 110, isFiller: false },
      { name: 'Filler & Recap', startEp: 111, endEp: 145, isFiller: true },
    ],
  },

  // ---------------------------------------------------------------------------
  // 92. Prince of Tennis
  // ---------------------------------------------------------------------------
  {
    id: 'prince-of-tennis',
    title: 'Prince of Tennis',
    slug: 'prince-of-tennis',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/13/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/13/original.png',
    totalEpisodes: 178,
    totalCanonEpisodes: 130,
    status: 'completed',
    genre: ['Action', 'Comedy', 'Sports', 'Shounen'],
    description:
      'Tennis prodigy Ryoma Echizen enrolls at Seishun Academy and quickly proves himself among the school\'s tennis regulars. With incredible skill inherited from his legendary father, he helps lead Seigaku through district, prefectural, and national tournaments. A classic sports anime featuring over-the-top tennis moves and intense rivalries.',
    arcs: [
      { name: 'Seigaku Ranking & District', startEp: 1, endEp: 30, isFiller: false },
      { name: 'Prefectural Tournament', startEp: 31, endEp: 65, isFiller: false },
      { name: 'Kanto Tournament', startEp: 66, endEp: 100, isFiller: false },
      { name: 'National Tournament', startEp: 101, endEp: 130, isFiller: false },
      { name: 'Filler & OVA', startEp: 131, endEp: 178, isFiller: true },
    ],
  },

  // ---------------------------------------------------------------------------
  // 93. Spirited Away
  // ---------------------------------------------------------------------------
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    slug: 'spirited-away',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/176/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/176/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Adventure', 'Drama', 'Fantasy', 'Supernatural'],
    description:
      'Ten-year-old Chihiro stumbles into a magical bathhouse for spirits and must work to free herself and her transformed parents. Under the guidance of the mysterious Haku, she navigates a world of gods, witches, and enchanted creatures. Hayao Miyazaki\'s Academy Award-winning masterpiece and one of the highest-grossing films in Japanese history.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 94. My Neighbor Totoro
  // ---------------------------------------------------------------------------
  {
    id: 'my-neighbor-totoro',
    title: 'My Neighbor Totoro',
    slug: 'my-neighbor-totoro',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/482/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/482/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Adventure', 'Comedy', 'Fantasy', 'Kids'],
    description:
      'Two young sisters move to the countryside with their father and discover friendly forest spirits, including the giant, lovable Totoro. As their mother recovers in the hospital, the magical creatures bring wonder and comfort to their lives. A heartwarming Studio Ghibli classic that captures the magic of childhood imagination.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 95. Princess Mononoke
  // ---------------------------------------------------------------------------
  {
    id: 'princess-mononoke',
    title: 'Princess Mononoke',
    slug: 'princess-mononoke',
    posterUrl: 'https://media.kitsu.app/anime/142/poster_image/f01d21998603a36c019211154074263a.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/142/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    description:
      'Prince Ashitaka, cursed by a demon boar, travels west seeking a cure and finds himself caught between an industrial mining town and the gods of the forest, led by the wolf-raised San. A sweeping epic about the conflict between humanity and nature by Hayao Miyazaki, featuring breathtaking animation and morally complex characters.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 96. Howl's Moving Castle
  // ---------------------------------------------------------------------------
  {
    id: 'howls-moving-castle',
    title: "Howl's Moving Castle",
    slug: 'howls-moving-castle',
    posterUrl: 'https://media.kitsu.app/anime/395/poster_image/39b44a8408c76fd0c6ae0969646b3906.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/395/original.png',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Adventure', 'Drama', 'Fantasy', 'Romance'],
    description:
      'Young hat-maker Sophie is cursed by a witch and transformed into an old woman. She takes refuge in the magical moving castle of the enigmatic wizard Howl and becomes his cleaning lady. A charming Studio Ghibli romance about love, self-acceptance, and the courage to face one\'s fears.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 97. Nausicaa of the Valley of the Wind
  // ---------------------------------------------------------------------------
  {
    id: 'nausicaa',
    title: 'Nausicaa of the Valley of the Wind',
    slug: 'nausicaa',
    posterUrl: 'https://media.kitsu.app/anime/529/poster_image/c5c8c3a17c42fc0d898c5f3b0514c7a6.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/529/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Adventure', 'Drama', 'Fantasy', 'Sci-Fi'],
    description:
      'In a post-apocalyptic world covered by toxic forests and giant insects, Princess Nausicaa of the Valley of the Wind fights to prevent two warring nations from destroying the fragile ecosystem. Her compassion and courage reveal the truth about the toxic jungle. Hayao Miyazaki\'s visionary environmental epic that led to the founding of Studio Ghibli.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 98. Your Name (Kimi no Na wa)
  // ---------------------------------------------------------------------------
  {
    id: 'your-name',
    title: 'Your Name (Kimi no Na wa)',
    slug: 'your-name',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/11614/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/11614/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Drama', 'Romance', 'Supernatural'],
    description:
      'Tokyo high school boy Taki and rural girl Mitsuha mysteriously begin swapping bodies. As they navigate each other\'s lives and develop feelings, they discover a devastating truth connected to a comet approaching Earth. Makoto Shinkai\'s visually stunning blockbuster that became one of the highest-grossing anime films of all time.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 99. A Silent Voice
  // ---------------------------------------------------------------------------
  {
    id: 'a-silent-voice',
    title: 'A Silent Voice',
    slug: 'a-silent-voice',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/10028/original.jpeg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/10028/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Drama', 'Romance', 'Slice of Life'],
    description:
      'Former bully Shouya Ishida seeks redemption by reconnecting with Shouko Nishimiya, the deaf girl he tormented in elementary school. As he confronts his guilt and isolation, they both learn to open up and find the will to live. A deeply moving Kyoto Animation film about bullying, disability, forgiveness, and second chances.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 100. Weathering With You
  // ---------------------------------------------------------------------------
  {
    id: 'weathering-with-you',
    title: 'Weathering With You',
    slug: 'weathering-with-you',
    posterUrl: 'https://media.kitsu.app/anime/42028/poster_image/e3e6b139b9ba4e92bce961da30c93860.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/42028/original.jpeg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Drama', 'Fantasy', 'Romance'],
    description:
      'Runaway Hodaka Morishima arrives in rain-drenched Tokyo and meets Hina Amano, a girl who can control the weather. As they start a sunshine business together, their growing bond faces an impossible choice between love and the fate of the world. Makoto Shinkai\'s follow-up to Your Name is a visually breathtaking romance about sacrifice.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 101. The Garden of Words
  // ---------------------------------------------------------------------------
  {
    id: 'garden-of-words',
    title: 'The Garden of Words',
    slug: 'garden-of-words',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/7515/original.png',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/7515/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Drama', 'Romance', 'Slice of Life'],
    description:
      'On rainy mornings, a high school student who dreams of becoming a shoemaker meets a mysterious older woman in a garden. Their quiet meetings become a refuge from their respective struggles. Makoto Shinkai\'s most intimate work is a 46-minute visual poem about loneliness, connection, and the beauty of rain.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 102. I Want to Eat Your Pancreas
  // ---------------------------------------------------------------------------
  {
    id: 'i-want-to-eat-your-pancreas',
    title: 'I Want to Eat Your Pancreas',
    slug: 'i-want-to-eat-your-pancreas',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/13723/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/13723/original.jpg',
    totalEpisodes: 1,
    totalCanonEpisodes: 1,
    status: 'completed',
    genre: ['Drama', 'Romance', 'Slice of Life'],
    description:
      'An introverted high school boy accidentally discovers that his popular classmate Sakura Yamauchi is secretly dying of a pancreatic disease. Despite their opposite personalities, they form an unlikely bond as she teaches him to embrace life. A devastating and beautiful film about living fully and the connections that change us.',
    arcs: [
      { name: 'Movie', startEp: 1, endEp: 1, isFiller: false },
    ],
  },

  // ---------------------------------------------------------------------------
  // 103. Tokyo Ghoul
  // ---------------------------------------------------------------------------
  {
    id: 'tokyo-ghoul',
    title: 'Tokyo Ghoul',
    slug: 'tokyo-ghoul',
    posterUrl: 'https://media.kitsu.app/anime/poster_images/8271/original.jpg',
    bannerUrl: 'https://media.kitsu.app/anime/cover_images/8271/original.jpg',
    totalEpisodes: 48,
    totalCanonEpisodes: 48,
    status: 'completed',
    genre: ['Action', 'Drama', 'Horror', 'Psychological', 'Supernatural', 'Seinen'],
    description:
      'College student Ken Kaneki is transformed into a half-ghoul after a deadly encounter, gaining the ability to consume human flesh. Torn between the human and ghoul worlds, he must navigate both societies while struggling to maintain his humanity. A dark and visceral series exploring identity, prejudice, and the thin line between monster and man.',
    arcs: [
      { name: 'S1: Anteiku', startEp: 1, endEp: 6, isFiller: false },
      { name: 'S1: Gourmet & Aogiri Tree', startEp: 7, endEp: 12, isFiller: false },
      { name: 'S2 √A: Aogiri Tree', startEp: 13, endEp: 18, isFiller: false },
      { name: 'S2 √A: Owl Suppression', startEp: 19, endEp: 24, isFiller: false },
      { name: 'S3 :re — Quinx Squad & Auction', startEp: 25, endEp: 30, isFiller: false },
      { name: 'S3 :re — Rose Investigation', startEp: 31, endEp: 36, isFiller: false },
      { name: 'S4 :re 2nd — Cochlea & Rue', startEp: 37, endEp: 42, isFiller: false },
      { name: 'S4 :re 2nd — Dragon War', startEp: 43, endEp: 48, isFiller: false },
    ],
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Find a series by its URL-friendly slug.
 */
export function getSeriesBySlug(slug: string): AnimeSeries | undefined {
  return animeDatabase.find((series) => series.slug === slug);
}

/**
 * Find a series by its unique ID.
 */
export function getSeriesById(id: string): AnimeSeries | undefined {
  return animeDatabase.find((series) => series.id === id);
}

/**
 * Search anime by title (case-insensitive substring match).
 */
export function searchAnime(query: string): AnimeSeries[] {
  const lowerQuery = query.toLowerCase();
  return animeDatabase.filter(
    (series) =>
      series.title.toLowerCase().includes(lowerQuery) ||
      series.slug.toLowerCase().includes(lowerQuery) ||
      series.genre.some((g) => g.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Return only canon (non-filler) arcs for a given series.
 */
export function getCanonArcs(series: AnimeSeries): Arc[] {
  return series.arcs.filter((arc) => !arc.isFiller);
}

/**
 * Calculate watch progress for a series given the current episode number.
 */
export function getSeriesProgress(
  currentEp: number,
  series: AnimeSeries
): {
  percentage: number;
  currentArc: Arc | null;
  isComplete: boolean;
} {
  const percentage =
    series.totalEpisodes > 0
      ? Math.min(100, Math.round((currentEp / series.totalEpisodes) * 100))
      : 0;

  const isComplete = currentEp >= series.totalEpisodes && series.status === 'completed';

  // Find the arc that contains the current episode
  const currentArc =
    series.arcs.find(
      (arc) => currentEp >= arc.startEp && currentEp <= arc.endEp
    ) ?? null;

  return { percentage, currentArc, isComplete };
}
