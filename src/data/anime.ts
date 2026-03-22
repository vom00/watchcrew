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
    totalEpisodes: 39,
    totalCanonEpisodes: 39,
    status: 'airing',
    genre: ['Action', 'Adventure', 'Supernatural', 'Shounen'],
    description:
      'The Quincy king Yhwach and his elite Sternritter army declare war on Soul Society, launching a devastating invasion that overwhelms even the most powerful captains. Ichigo must unlock the true nature of his Zanpakuto and heritage to stand against this ancient enemy. This final arc of Bleach delivers the most intense battles and deepest lore revelations in the series.',
    arcs: [
      { name: 'The Blood Warfare', startEp: 1, endEp: 13, isFiller: false },
      { name: 'The Separation', startEp: 14, endEp: 26, isFiller: false },
      { name: 'The Conflict', startEp: 27, endEp: 39, isFiller: false },
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
    totalEpisodes: 163,
    totalCanonEpisodes: 163,
    status: 'completed',
    genre: ['Action', 'Superhero', 'School', 'Shounen'],
    description:
      'In a world where nearly everyone has superpowers called Quirks, Izuku Midoriya is born without one but still dreams of becoming the greatest hero. After inheriting a powerful Quirk from the legendary All Might, he enrolls in U.A. High School and faces villains, rivals, and the weight of being a symbol of peace. My Hero Academia is a modern superhero epic that blends Western comic book culture with classic shonen storytelling.',
    arcs: [
      { name: 'Entrance Exam', startEp: 1, endEp: 4, isFiller: false },
      { name: 'Quirk Apprehension Test', startEp: 5, endEp: 7, isFiller: false },
      { name: 'Battle Trial', startEp: 7, endEp: 8, isFiller: false },
      { name: 'USJ', startEp: 9, endEp: 13, isFiller: false },
      { name: 'U.A. Sports Festival', startEp: 14, endEp: 25, isFiller: false },
      { name: 'Vs. Hero Killer', startEp: 26, endEp: 33, isFiller: false },
      { name: 'Final Exams', startEp: 34, endEp: 38, isFiller: false },
      { name: 'Forest Training Camp', startEp: 39, endEp: 50, isFiller: false },
      { name: 'Hideout Raid', startEp: 46, endEp: 50, isFiller: false },
      { name: 'Provisional Hero License Exam', startEp: 51, endEp: 63, isFiller: false },
      { name: 'Shie Hassaikai (Overhaul)', startEp: 64, endEp: 78, isFiller: false },
      { name: 'Remedial Course', startEp: 79, endEp: 80, isFiller: false },
      { name: 'U.A. School Festival', startEp: 81, endEp: 88, isFiller: false },
      { name: 'Pro Hero', startEp: 87, endEp: 88, isFiller: false },
      { name: 'Joint Training', startEp: 89, endEp: 101, isFiller: false },
      { name: 'Endeavor Agency', startEp: 102, endEp: 113, isFiller: false },
      { name: 'Paranormal Liberation War', startEp: 114, endEp: 138, isFiller: false },
      { name: 'Dark Hero', startEp: 131, endEp: 138, isFiller: false },
      { name: 'Final War', startEp: 139, endEp: 163, isFiller: false },
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
    totalEpisodes: 94,
    totalCanonEpisodes: 94,
    status: 'completed',
    genre: ['Action', 'Dark Fantasy', 'Drama', 'Thriller'],
    description:
      'Humanity lives behind massive walls to protect themselves from the Titans, giant humanoid creatures that devour humans without reason. When the walls are breached, young Eren Yeager vows to exterminate every Titan and uncovers a conspiracy that redefines everything he knows about the world. Attack on Titan is a masterclass in storytelling with shocking twists, moral complexity, and relentless tension.',
    arcs: [
      { name: 'Fall of Shiganshina', startEp: 1, endEp: 5, isFiller: false },
      { name: 'Battle of Trost', startEp: 5, endEp: 13, isFiller: false },
      { name: 'Female Titan', startEp: 14, endEp: 25, isFiller: false },
      { name: 'Clash of the Titans', startEp: 26, endEp: 37, isFiller: false },
      { name: 'Uprising', startEp: 38, endEp: 49, isFiller: false },
      { name: 'Return to Shiganshina', startEp: 50, endEp: 59, isFiller: false },
      { name: 'Marley', startEp: 60, endEp: 75, isFiller: false },
      { name: 'War for Paradis', startEp: 76, endEp: 87, isFiller: false },
      { name: 'The Final Chapters', startEp: 88, endEp: 94, isFiller: false },
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
    totalEpisodes: 55,
    totalCanonEpisodes: 55,
    status: 'airing',
    genre: ['Action', 'Supernatural', 'Historical', 'Shounen'],
    description:
      'After his family is slaughtered by demons and his sister Nezuko is turned into one, kind-hearted Tanjiro Kamado joins the Demon Slayer Corps to find a cure and avenge his family. With breathtaking animation by studio ufotable, the series brings intense sword combat and emotional storytelling to life. Demon Slayer became a cultural phenomenon, breaking box office records and captivating audiences worldwide.',
    arcs: [
      { name: 'Final Selection', startEp: 1, endEp: 5, isFiller: false },
      { name: 'First Mission', startEp: 6, endEp: 10, isFiller: false },
      { name: 'Asakusa', startEp: 7, endEp: 10, isFiller: false },
      { name: 'Tsuzumi Mansion', startEp: 11, endEp: 14, isFiller: false },
      { name: 'Natagumo Mountain', startEp: 15, endEp: 21, isFiller: false },
      { name: 'Rehabilitation Training', startEp: 22, endEp: 26, isFiller: false },
      { name: 'Mugen Train', startEp: 27, endEp: 33, isFiller: false },
      { name: 'Entertainment District', startEp: 34, endEp: 44, isFiller: false },
      { name: 'Swordsmith Village', startEp: 45, endEp: 55, isFiller: false },
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
    totalEpisodes: 48,
    totalCanonEpisodes: 48,
    status: 'completed',
    genre: ['Action', 'Supernatural', 'Horror', 'Shounen'],
    description:
      'After swallowing a cursed finger belonging to the King of Curses, Ryomen Sukuna, high schooler Yuji Itadori enters the hidden world of Jujutsu Sorcerers who battle malevolent cursed spirits born from human negativity. Under a suspended death sentence, Yuji must consume all of Sukuna\'s fingers while learning to fight alongside his fellow sorcerers. Jujutsu Kaisen delivers fluid, creative combat and a dark narrative that keeps raising the stakes.',
    arcs: [
      { name: 'Fearsome Womb', startEp: 1, endEp: 5, isFiller: false },
      { name: 'Cursed Training', startEp: 5, endEp: 8, isFiller: false },
      { name: 'Cursed Womb: Death Painting', startEp: 9, endEp: 13, isFiller: false },
      { name: 'Kyoto Goodwill Event', startEp: 14, endEp: 21, isFiller: false },
      { name: 'Origin of Obedience', startEp: 22, endEp: 24, isFiller: false },
      { name: 'Hidden Inventory / Premature Death', startEp: 25, endEp: 29, isFiller: false },
      { name: 'Shibuya Incident', startEp: 30, endEp: 48, isFiller: false },
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
