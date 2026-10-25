import { Destination, LevelConfig } from '../types/game';

export const DESTINATIONS: Destination[] = [
  // 1. India Explorer (Levels 1–10)
  {
    id: 'india',
    name: 'India Explorer',
    subtitle: 'Jaipur Fortresses & Sacred Rivers',
    region: 'South Asia',
    description: 'Traverse the pink city palaces of Jaipur, sacred Ganges dawn rituals in Varanasi, and fragrant spice hills of Kerala.',
    requiredStars: 0,
    unlockedByDefault: true,
    color: '#F59E0B',
    accentColor: '#35D6B0',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Hawa Mahal Palace in Jaipur Rajasthan India',
    photographer: 'Annie Spratt',
    levels: [
      {
        id: 'in-1',
        levelNumber: 1,
        destinationId: 'india',
        title: 'Morning Along the Ganges',
        description: 'Sacred waters illuminated by dawn chants.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['LOTUS', 'GANGA', 'TEMPLE', 'RIVER'],
        bonusWords: ['SUN', 'DAWN', 'TEA'],
        targetTimeSeconds: 90
      },
      {
        id: 'in-2',
        levelNumber: 2,
        destinationId: 'india',
        title: 'The Spice Bazaar',
        description: 'Cardamom, turmeric, and dried saffron threads.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['SAFFRON', 'GINGER', 'CHAI', 'CLOVE'],
        bonusWords: ['SPICE', 'POT', 'GOLD'],
        targetTimeSeconds: 100
      },
      {
        id: 'in-3',
        levelNumber: 3,
        destinationId: 'india',
        title: 'Amber Fort Terraces',
        description: 'Carved sandstone courtyards echoing with tales.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['FORTRESS', 'TURBAN', 'SANDSTONE', 'HAWELI', 'SHIELD'],
        bonusWords: ['KING', 'GATE', 'GEM'],
        targetTimeSeconds: 110
      },
      {
        id: 'in-4',
        levelNumber: 4,
        destinationId: 'india',
        title: 'Hawa Mahal Breezeways',
        description: 'Honeycomb facade with hundreds of lattice casements.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['LATTICE', 'PALACE', 'BALCONY', 'BREEZE', 'WINDOWS'],
        bonusWords: ['PINK', 'WIND', 'AIR'],
        targetTimeSeconds: 120
      },
      {
        id: 'in-5',
        levelNumber: 5,
        destinationId: 'india',
        title: 'Monsoon in Kerala',
        description: 'Emerald backwaters drenched in summer rain.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['MONSOON', 'LAGOON', 'COCONUT', 'BOATMAN', 'RAIN', 'JASMINE'],
        bonusWords: ['PALM', 'WATER', 'FISH'],
        targetTimeSeconds: 140
      },
      {
        id: 'in-6',
        levelNumber: 6,
        destinationId: 'india',
        title: 'Royal Bengal Sanctuary',
        description: 'Dense mangrove forests where stealth predators roam.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['BENGAL', 'TIGER', 'MANGROVE', 'JUNGLE', 'TRACKS', 'BANYAN'],
        bonusWords: ['CAT', 'TREE', 'ROAR'],
        targetTimeSeconds: 150
      },
      {
        id: 'in-7',
        levelNumber: 7,
        destinationId: 'india',
        title: 'Ayurvedic Gardens',
        description: 'Ancient medicinal herbs and fragrant sandalwood.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['SANDALWOOD', 'NEEM', 'HERBAL', 'ROOTS', 'ELIXIR', 'BLOSSOM'],
        bonusWords: ['LEAF', 'HEAL', 'OIL'],
        targetTimeSeconds: 160
      },
      {
        id: 'in-8',
        levelNumber: 8,
        destinationId: 'india',
        title: 'Palaces of Udaipur',
        description: 'Floating marble pavilions across Lake Pichola.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['MAHARAJA', 'COURTYARD', 'PAVILION', 'REFLECTION', 'MIRROR', 'ISLAND'],
        bonusWords: ['LAKE', 'BOAT', 'STAR'],
        targetTimeSeconds: 180
      },
      {
        id: 'in-9',
        levelNumber: 9,
        destinationId: 'india',
        title: 'The Marbled Wonder',
        description: 'Perfect ivory symmetry reflecting in the pool.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['SYMMETRY', 'MINARET', 'ARCHWAY', 'IVORY', 'CARVING', 'MONUMENT', 'DOMES'],
        bonusWords: ['MOON', 'WHITE', 'WALL'],
        targetTimeSeconds: 200
      },
      {
        id: 'in-10',
        levelNumber: 10,
        destinationId: 'india',
        title: 'BOSS: Titan of Rajasthan',
        description: 'Master the ancient lexicon of India in a grand multi-stage trial!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Defeat the Maharaja guardian by finding 8 master words!',
        words: ['SOVEREIGN', 'IMPERIAL', 'HERITAGE', 'CHRONICLE', 'DYNASTY', 'TREASURY', 'COLOSSUS', 'TRIUMPH'],
        bonusWords: ['GOLD', 'CROWN', 'SWORD', 'PEAK'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 2. Japan Journey (Levels 11–20)
  {
    id: 'japan',
    name: 'Japan Journey',
    subtitle: 'Kyoto Shrines & Sakura Petals',
    region: 'East Asia',
    description: 'Walk through Kyoto’s vermilion torii paths, tranquil moss gardens, bamboo groves, and snowy Mount Fuji.',
    requiredStars: 18,
    color: '#EC4899',
    accentColor: '#A99BFF',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Kyoto pagoda surrounded by cherry blossoms',
    photographer: 'Soragrit Wongsa',
    levels: [
      {
        id: 'jp-11',
        levelNumber: 11,
        destinationId: 'japan',
        title: 'Spring Hanami',
        description: 'Pink blossoms drift on warm spring winds.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['CHERRY', 'BLOSSOM', 'SPRING', 'PETAL'],
        bonusWords: ['PINK', 'TREE', 'WIND'],
        targetTimeSeconds: 90
      },
      {
        id: 'jp-12',
        levelNumber: 12,
        destinationId: 'japan',
        title: 'Kyoto Tea Ceremony',
        description: 'Whisked green tea in quiet bamboo teahouses.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['MATCHA', 'WHISK', 'BAMBOO', 'GARDEN'],
        bonusWords: ['CUP', 'LEAF', 'ZEN'],
        targetTimeSeconds: 100
      },
      {
        id: 'jp-13',
        levelNumber: 13,
        destinationId: 'japan',
        title: 'Torii of Fushimi',
        description: 'Thousands of vermilion gates climbing the mountain.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['SHRINE', 'TORII', 'LANTERN', 'PATHWAY', 'SPIRIT'],
        bonusWords: ['WOOD', 'BELL', 'GATE'],
        targetTimeSeconds: 110
      },
      {
        id: 'jp-14',
        levelNumber: 14,
        destinationId: 'japan',
        title: 'Origami Master',
        description: 'Delicate creases transforming a simple sheet into cranes.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['ORIGAMI', 'CRANE', 'FOLDING', 'PAPER', 'CREASE'],
        bonusWords: ['BIRD', 'WING', 'ART'],
        targetTimeSeconds: 120
      },
      {
        id: 'jp-15',
        levelNumber: 15,
        destinationId: 'japan',
        title: 'Arashiyama Bamboo Grove',
        description: 'Towering green stalks rustling softly overhead.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['GROVE', 'CANOPY', 'WHISPER', 'STALKS', 'NATURE', 'TRANQUIL'],
        bonusWords: ['TALL', 'STEM', 'PATH'],
        targetTimeSeconds: 140
      },
      {
        id: 'jp-16',
        levelNumber: 16,
        destinationId: 'japan',
        title: 'Zen Rock Sanctuary',
        description: 'Raked gravel ripples symbolizing ocean waves.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['GRAVEL', 'RIPPLE', 'ISLANDS', 'MOSSES', 'MEDITATE', 'SILENCE'],
        bonusWords: ['ROCK', 'POND', 'SAND'],
        targetTimeSeconds: 150
      },
      {
        id: 'jp-17',
        levelNumber: 17,
        destinationId: 'japan',
        title: 'Way of the Samurai',
        description: 'Bushido discipline and forged steel blades.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['KATANA', 'SAMURAI', 'HONOR', 'ARMOR', 'BLADE', 'BUSHIDO'],
        bonusWords: ['IRON', 'BOW', 'EDGE'],
        targetTimeSeconds: 160
      },
      {
        id: 'jp-18',
        levelNumber: 18,
        destinationId: 'japan',
        title: 'Tokyo Neon Twilight',
        description: 'Skyscrapers glowing with radiant color above bustling streets.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['METROPOLIS', 'LUMINOUS', 'CROSSING', 'SUBWAY', 'HORIZON', 'CYBER'],
        bonusWords: ['CITY', 'NEON', 'FAST'],
        targetTimeSeconds: 180
      },
      {
        id: 'jp-19',
        levelNumber: 19,
        destinationId: 'japan',
        title: 'Summit of Mount Fuji',
        description: 'Standing above a sea of clouds at sunrise.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['VOLCANO', 'CALDERA', 'SUMMIT', 'SNOWCAP', 'PILGRIM', 'SOLITUDE', 'CLOUDS'],
        bonusWords: ['PEAK', 'SKY', 'COLD'],
        targetTimeSeconds: 200
      },
      {
        id: 'jp-20',
        levelNumber: 20,
        destinationId: 'japan',
        title: 'BOSS: The Shogun Sentinel',
        description: 'Overcome the guardian samurai in a legendary test of focus!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Clear all 8 warrior words under the sentinel gaze!',
        words: ['SHOGUNATE', 'VANGUARD', 'LEGENDARY', 'DISCIPLINE', 'IMPERIAL', 'WARRIOR', 'MASTERY', 'CHAMPION'],
        bonusWords: ['BLADE', 'HELM', 'IRON', 'FLAG'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 3. Egypt Mysteries (Levels 21–30)
  {
    id: 'egypt',
    name: 'Egypt Mysteries',
    subtitle: 'Golden Sands & Eternal Pharaohs',
    region: 'North Africa',
    description: 'Unravel the hieroglyphic secrets of Giza, Karnak’s hypostyle hall, and King Tut’s golden sarcophagus.',
    requiredStars: 38,
    color: '#EAB308',
    accentColor: '#F5C66B',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Great Pyramids of Giza with camel in the desert',
    photographer: 'Jeremy Zero',
    levels: [
      {
        id: 'eg-21',
        levelNumber: 21,
        destinationId: 'egypt',
        title: 'The Great Pyramid',
        description: 'Aligned with Orion, towering over the desert.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['PYRAMID', 'STONE', 'TOMB', 'GIZA'],
        bonusWords: ['SAND', 'GOLD', 'SUN'],
        targetTimeSeconds: 90
      },
      {
        id: 'eg-22',
        levelNumber: 22,
        destinationId: 'egypt',
        title: 'Riddle of the Sphinx',
        description: 'The lion guardian watching the eastern dawn.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['SPHINX', 'RIDDLE', 'STATUE', 'DESERT'],
        bonusWords: ['PAW', 'LION', 'EYE'],
        targetTimeSeconds: 100
      },
      {
        id: 'eg-23',
        levelNumber: 23,
        destinationId: 'egypt',
        title: 'Papyrus Scribes',
        description: 'Sacred glyphs rendered in river reed ink.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['PAPYRUS', 'SCRIBE', 'SCROLL', 'CARTOUCHE', 'REEDS'],
        bonusWords: ['PEN', 'ROD', 'BOOK'],
        targetTimeSeconds: 110
      },
      {
        id: 'eg-24',
        levelNumber: 24,
        destinationId: 'egypt',
        title: 'Valley of the Kings',
        description: 'Chiseled rock tombs hidden deep in dry limestone ravines.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['BURIAL', 'PASSAGE', 'AMULET', 'CHAMBER', 'GRANITE'],
        bonusWords: ['DEEP', 'TOMB', 'GOLD'],
        targetTimeSeconds: 120
      },
      {
        id: 'eg-25',
        levelNumber: 25,
        destinationId: 'egypt',
        title: 'Tutankhamun Treasure',
        description: 'Lapis lazuli and solid gold mask.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['PHARAOH', 'SCEPTRE', 'JEWELS', 'CHEST', 'SARCOPHAGUS', 'MASK'],
        bonusWords: ['CUP', 'RING', 'GEM'],
        targetTimeSeconds: 140
      },
      {
        id: 'eg-26',
        levelNumber: 26,
        destinationId: 'egypt',
        title: 'Temple of Karnak',
        description: 'Towering papyrus-shaped stone columns in Luxor.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['COLUMNS', 'OBELISK', 'SANCTUM', 'HYPOSTYLE', 'OFFERING', 'PRIEST'],
        bonusWords: ['HALL', 'TALL', 'ROOF'],
        targetTimeSeconds: 150
      },
      {
        id: 'eg-27',
        levelNumber: 27,
        destinationId: 'egypt',
        title: 'Sailing the Felucca',
        description: 'Lateen sails billowing on the legendary Nile.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['FELUCCA', 'CATARACT', 'DELTA', 'CURRENT', 'RIPPLE', 'HARVEST'],
        bonusWords: ['BOAT', 'SAIL', 'WIND'],
        targetTimeSeconds: 160
      },
      {
        id: 'eg-28',
        levelNumber: 28,
        destinationId: 'egypt',
        title: 'Abu Simbel Colossi',
        description: 'Four colossal seated pharaohs carved from mountain rock.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['COLOSSAL', 'RAMSES', 'FACADE', 'SANDSTONE', 'MAJESTY', 'SOLAR'],
        bonusWords: ['KING', 'ROCK', 'WALL'],
        targetTimeSeconds: 180
      },
      {
        id: 'eg-29',
        levelNumber: 29,
        destinationId: 'egypt',
        title: 'Library of Alexandria',
        description: 'Antiquity’s greatest archive of scientific thought.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['ALEXANDRIA', 'SCHOLAR', 'ASTRONOMY', 'MANUSCRIPT', 'ARCHIVE', 'LIGHTHOUSE', 'WISDOM'],
        bonusWords: ['BOOK', 'STAR', 'INK'],
        targetTimeSeconds: 200
      },
      {
        id: 'eg-30',
        levelNumber: 30,
        destinationId: 'egypt',
        title: 'BOSS: The Sphinx Sovereign',
        description: 'Answer the grand ancient trial before the sands swallow the tomb!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Discover 8 royal cartouche terms to solve the riddle!',
        words: ['SARCOPHAGUS', 'HIEROGLYPH', 'SOVEREIGN', 'CATACLYSM', 'ETERNITY', 'INSCRIPTION', 'MYSTERIES', 'IMMORTAL'],
        bonusWords: ['EYE', 'SUN', 'LION', 'BIRD'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 4. European Wonders (Levels 31–40)
  {
    id: 'europe',
    name: 'European Wonders',
    subtitle: 'Paris Boulevards & Roman Arches',
    region: 'Western Europe',
    description: 'Stroll the cobblestones of Paris, the Roman Colosseum, London’s Westminster, and Amsterdam’s canals.',
    requiredStars: 60,
    color: '#6366F1',
    accentColor: '#35D6B0',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Eiffel Tower over Paris at sunset',
    photographer: 'Chris Karidis',
    levels: [
      {
        id: 'eu-31',
        levelNumber: 31,
        destinationId: 'europe',
        title: 'Lavender of Provence',
        description: 'Rolling violet fields under Mediterranean sun.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['LAVENDER', 'PURPLE', 'VALLEY', 'FIELDS'],
        bonusWords: ['BEE', 'SUN', 'OIL'],
        targetTimeSeconds: 90
      },
      {
        id: 'eu-32',
        levelNumber: 32,
        destinationId: 'europe',
        title: 'Along the River Seine',
        description: 'Painters, bookstalls, and graceful stone bridges.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['BRIDGES', 'RIVER', 'BISTRO', 'PAINTER'],
        bonusWords: ['ART', 'BOAT', 'CAFE'],
        targetTimeSeconds: 100
      },
      {
        id: 'eu-33',
        levelNumber: 33,
        destinationId: 'europe',
        title: 'The Roman Colosseum',
        description: 'Ancient travertine arches where gladiators stood.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['COLOSSEUM', 'GLADIATOR', 'CHARIOT', 'ARENA', 'ARCHES'],
        bonusWords: ['ROAR', 'HELM', 'SAND'],
        targetTimeSeconds: 110
      },
      {
        id: 'eu-34',
        levelNumber: 34,
        destinationId: 'europe',
        title: 'Westminster Clock Tower',
        description: 'The iconic bells tolling over the Thames river.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['BIGBEN', 'BELLS', 'PARLIAMENT', 'THAMES', 'PALACE'],
        bonusWords: ['TIME', 'HOUR', 'TOWN'],
        targetTimeSeconds: 120
      },
      {
        id: 'eu-35',
        levelNumber: 35,
        destinationId: 'europe',
        title: 'Canals of Amsterdam',
        description: 'Bicycles crossing quaint humpback canal bridges.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['CANALS', 'BICYCLE', 'GABLED', 'HOUSEBOAT', 'TULIPS', 'LOCKS'],
        bonusWords: ['WATER', 'ROAD', 'FLOW'],
        targetTimeSeconds: 140
      },
      {
        id: 'eu-36',
        levelNumber: 36,
        destinationId: 'europe',
        title: 'Chateaux of the Loire',
        description: 'Renaissance spires and moat reflections.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['CHATEAU', 'TURRET', 'TAPESTRY', 'GARDENS', 'GALLERY', 'NOBILITY'],
        bonusWords: ['GATE', 'ROSE', 'WALL'],
        targetTimeSeconds: 150
      },
      {
        id: 'eu-37',
        levelNumber: 37,
        destinationId: 'europe',
        title: 'Eiffel Tower Beacon',
        description: 'Lattice ironwork soaring high over the Champ de Mars.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['LATTICE', 'BEACON', 'IRONWORK', 'MONUMENT', 'PANORAMA', 'ELEVATOR'],
        bonusWords: ['BOLT', 'CITY', 'VIEW'],
        targetTimeSeconds: 160
      },
      {
        id: 'eu-38',
        levelNumber: 38,
        destinationId: 'europe',
        title: 'Sagrada Familia Spires',
        description: 'Gaudi’s organic stone forest and stained glass glow.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['BASILICA', 'FACADE', 'MOSAIC', 'ORGANIC', 'STAINED', 'CRYPTS'],
        bonusWords: ['GLASS', 'STONE', 'LIGHT'],
        targetTimeSeconds: 180
      },
      {
        id: 'eu-39',
        levelNumber: 39,
        destinationId: 'europe',
        title: 'Impressionist Canvas',
        description: 'Claude Monet’s floating waterlilies at Giverny.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['IMPRESSION', 'WATERLILY', 'PALETTE', 'PIGMENT', 'CANVAS', 'LUMINOSITY', 'EXHIBIT'],
        bonusWords: ['HUE', 'OIL', 'LAKE'],
        targetTimeSeconds: 200
      },
      {
        id: 'eu-40',
        levelNumber: 40,
        destinationId: 'europe',
        title: 'BOSS: The Renaissance Master',
        description: 'Solve the architectural masterpiece across three historic eras!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Uncover 8 grand European heritage terms!',
        words: ['RENAISSANCE', 'CATHEDRAL', 'MONUMENTAL', 'ILLUMINATED', 'ARCHITECT', 'SYMPHONY', 'AESTHETIC', 'DISCOVERY'],
        bonusWords: ['GOLD', 'ARCH', 'BOOK', 'SONG'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 5. Tropical Adventure (Levels 41–50)
  {
    id: 'tropical',
    name: 'Tropical Adventure',
    subtitle: 'Amazon Canopy & Bali Terraces',
    region: 'Equatorial',
    description: 'Explore the high Amazon canopy, Bali emerald rice terraces, and Costa Rican cloud forests.',
    requiredStars: 85,
    color: '#10B981',
    accentColor: '#F5C66B',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Dense tropical rainforest and meandering river',
    photographer: 'Sebastien Gabriel',
    levels: [
      {
        id: 'tr-41',
        levelNumber: 41,
        destinationId: 'tropical',
        title: 'The High Canopy',
        description: 'Where sunlight filters through leafy branches.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['CANOPY', 'TREETOP', 'LEAVES', 'BRANCH'],
        bonusWords: ['SUN', 'MOSS', 'VINE'],
        targetTimeSeconds: 90
      },
      {
        id: 'tr-42',
        levelNumber: 42,
        destinationId: 'tropical',
        title: 'Scarlet Macaw Flight',
        description: 'Vivid feathers gliding across emerald bends.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['MACAW', 'FEATHERS', 'PARROT', 'FLIGHT'],
        bonusWords: ['BEAK', 'WING', 'BIRD'],
        targetTimeSeconds: 100
      },
      {
        id: 'tr-43',
        levelNumber: 43,
        destinationId: 'tropical',
        title: 'Bali Rice Terraces',
        description: 'Cascading green steps carved into jungle valleys.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['TERRACES', 'PADDY', 'IRRIGATION', 'PALMS', 'BAMBOO'],
        bonusWords: ['RICE', 'MUD', 'HILL'],
        targetTimeSeconds: 110
      },
      {
        id: 'tr-44',
        levelNumber: 44,
        destinationId: 'tropical',
        title: 'Orchids in Mist',
        description: 'Wild epiphytes holding freshwater for treefrogs.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['ORCHID', 'EPIPHYTE', 'BLOSSOM', 'TREEFROG', 'NECTAR'],
        bonusWords: ['LEAF', 'DROP', 'ROOT'],
        targetTimeSeconds: 120
      },
      {
        id: 'tr-45',
        levelNumber: 45,
        destinationId: 'tropical',
        title: 'Shadow of the Jaguar',
        description: 'Spotted predator roaming silently on moss.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['JAGUAR', 'STALKER', 'ROSETTE', 'FERNS', 'CREEPER', 'PREDATOR'],
        bonusWords: ['PAW', 'CLAW', 'TAIL'],
        targetTimeSeconds: 140
      },
      {
        id: 'tr-46',
        levelNumber: 46,
        destinationId: 'tropical',
        title: 'Costa Rica Cloudforest',
        description: 'Permanent misty air nurturing hanging mosses.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['MISTY', 'HUMMINGBIRD', 'QUETZAL', 'LICHEN', 'BROMELIAD', 'VAPOR'],
        bonusWords: ['FOG', 'NEST', 'TREE'],
        targetTimeSeconds: 150
      },
      {
        id: 'tr-47',
        levelNumber: 47,
        destinationId: 'tropical',
        title: 'Amazon River Serpents',
        description: 'The giant green anaconda winding through underwater roots.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['ANACONDA', 'CURRENTS', 'SWIMMING', 'SANDBAR', 'DOLPHIN', 'ESTUARY'],
        bonusWords: ['FIN', 'BAIT', 'SWIM'],
        targetTimeSeconds: 160
      },
      {
        id: 'tr-48',
        levelNumber: 48,
        destinationId: 'tropical',
        title: 'Madagascar Baobab Alley',
        description: 'Ancient upside-down trees standing tall at sunset.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['BAOBAB', 'ENDEMIC', 'LEMUR', 'SUCCULENT', 'WILDERNESS', 'SAVANNA'],
        bonusWords: ['BARK', 'LEAF', 'DUSK'],
        targetTimeSeconds: 180
      },
      {
        id: 'tr-49',
        levelNumber: 49,
        destinationId: 'tropical',
        title: 'Deep Wilderness Expedition',
        description: 'Untouched ancient ecosystems harboring rare wonders.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['BIODIVERSITY', 'RAINFOREST', 'EXPEDITION', 'BUTTERFLY', 'TERRITORY', 'DISCOVERY', 'TANGLED'],
        bonusWords: ['FROG', 'WASP', 'MUD'],
        targetTimeSeconds: 200
      },
      {
        id: 'tr-50',
        levelNumber: 50,
        destinationId: 'tropical',
        title: 'BOSS: Guardian of the Canopy',
        description: 'Solve the deepest rainforest riddle to claim the emerald idol!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Master 8 apex jungle survival words!',
        words: ['EXPEDITION', 'BIODIVERSITY', 'UNEXPLORED', 'INDIGENOUS', 'RESTORATION', 'ECOSYSTEM', 'EQUATORIAL', 'WILDERNESS'],
        bonusWords: ['VINE', 'FANG', 'ROAR', 'BEAK'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 6. American Discoveries (Levels 51–60)
  {
    id: 'americas',
    name: 'American Discoveries',
    subtitle: 'Grand Canyons & Manhattan Skylines',
    region: 'North America',
    description: 'From New York’s towering skylines and Central Park to the red rock depths of the Grand Canyon and Yellowstone geysers.',
    requiredStars: 110,
    color: '#0284C7',
    accentColor: '#F5C66B',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'New York City skyline with Brooklyn bridge',
    photographer: 'Florian Wehde',
    levels: [
      {
        id: 'am-51',
        levelNumber: 51,
        destinationId: 'americas',
        title: 'Central Park Pathways',
        description: 'Emerald tree lawns bordered by limestone spires.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['CANOPY', 'MEADOW', 'BRIDGES', 'SKATERS'],
        bonusWords: ['PARK', 'LAKE', 'TREE'],
        targetTimeSeconds: 90
      },
      {
        id: 'am-52',
        levelNumber: 52,
        destinationId: 'americas',
        title: 'Manhattan Skyline',
        description: 'Glass and steel reflecting the Hudson river sunset.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['SKYSCRAPER', 'AVENUE', 'SUBWAY', 'TAXI'],
        bonusWords: ['CITY', 'ROAD', 'LIGHT'],
        targetTimeSeconds: 100
      },
      {
        id: 'am-53',
        levelNumber: 53,
        destinationId: 'americas',
        title: 'Grand Canyon Rim',
        description: 'Billion-year rock strata carved by the Colorado River.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['CANYON', 'COLORADO', 'STRATA', 'PLATEAU', 'RAVINE'],
        bonusWords: ['ROCK', 'RED', 'DEEP'],
        targetTimeSeconds: 110
      },
      {
        id: 'am-54',
        levelNumber: 54,
        destinationId: 'americas',
        title: 'Yellowstone Thermal Springs',
        description: 'Vibrant turquoise pools surrounded by steaming fumaroles.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['GEYSER', 'BISON', 'CALDERA', 'SULFUR', 'SPRINGS'],
        bonusWords: ['STEAM', 'POOL', 'WILD'],
        targetTimeSeconds: 120
      },
      {
        id: 'am-55',
        levelNumber: 55,
        destinationId: 'americas',
        title: 'Golden Gate Bridge',
        description: 'International orange towers rising above Pacific fog.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['SUSPENSION', 'CABLES', 'PACIFIC', 'COASTLINE', 'HARBOR', 'CURRENT'],
        bonusWords: ['FOG', 'BAY', 'SHIP'],
        targetTimeSeconds: 140
      },
      {
        id: 'am-56',
        levelNumber: 56,
        destinationId: 'americas',
        title: 'Redwood Giant Forest',
        description: 'Ancient sequoias rising three hundred feet into the air.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['SEQUOIA', 'REDWOOD', 'OLDGROWTH', 'TIMBER', 'CONES', 'SHADOWS'],
        bonusWords: ['TREE', 'TALL', 'BARK'],
        targetTimeSeconds: 150
      },
      {
        id: 'am-57',
        levelNumber: 57,
        destinationId: 'americas',
        title: 'Zion Red Rock Grotto',
        description: 'Towering Navajo sandstone walls flanking the Virgin River.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['SANDSTONE', 'NARROWS', 'OVERLOOK', 'PLATEAU', 'ARCHES', 'VALLEYS'],
        bonusWords: ['HIKE', 'PATH', 'WALL'],
        targetTimeSeconds: 160
      },
      {
        id: 'am-58',
        levelNumber: 58,
        destinationId: 'americas',
        title: 'New Orleans French Quarter',
        description: 'Jazz trumpets echoing off wrought iron balconies.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['JAZZCLUB', 'TRUMPET', 'BOURBON', 'BALCONY', 'FESTIVAL', 'RHYTHMS'],
        bonusWords: ['BEAT', 'SONG', 'HORN'],
        targetTimeSeconds: 180
      },
      {
        id: 'am-59',
        levelNumber: 59,
        destinationId: 'americas',
        title: 'Alaskan Denali Wilderness',
        description: 'Subarctic tundra framing North America’s highest peak.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['GLACIER', 'GRIZZLY', 'TUNDRA', 'MOUNTAIN', 'TAIGA', 'EXPANSE', 'PINNACLE'],
        bonusWords: ['BEAR', 'COLD', 'SNOW'],
        targetTimeSeconds: 200
      },
      {
        id: 'am-60',
        levelNumber: 60,
        destinationId: 'americas',
        title: 'BOSS: The Frontier Pathfinder',
        description: 'Traverse the continent from coast to coast in an epic vocabulary showdown!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Uncover 8 frontier landmarks before time expires!',
        words: ['CONTINENTAL', 'WILDERNESS', 'NAVIGATION', 'EXPEDITION', 'MONUMENTAL', 'LANDMARK', 'REVOLUTION', 'SANCTUARY'],
        bonusWords: ['ROAD', 'TRAIL', 'CAMP', 'MAP'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 7. Mountain Expeditions (Levels 61–70)
  {
    id: 'mountains',
    name: 'Mountain Expeditions',
    subtitle: 'Alpine Summits & Himalayan Ridges',
    region: 'Alpine Heights',
    description: 'Scale the Swiss Matterhorn, prayer flags of the Himalayas, and granite spires of Patagonia.',
    requiredStars: 135,
    color: '#06B6D4',
    accentColor: '#35D6B0',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Majestic mountain peak with dramatic clouds',
    photographer: 'Kalen Emsley',
    levels: [
      {
        id: 'mt-61',
        levelNumber: 61,
        destinationId: 'mountains',
        title: 'The Swiss Matterhorn',
        description: 'The sharp pyramidal peak standing over Zermatt.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['ALPINE', 'SUMMIT', 'GLACIER', 'CREST'],
        bonusWords: ['PEAK', 'SNOW', 'ICE'],
        targetTimeSeconds: 90
      },
      {
        id: 'mt-62',
        levelNumber: 62,
        destinationId: 'mountains',
        title: 'Himalayan Prayer Flags',
        description: 'Five colored banners fluttering in high mountain passes.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['PRAYER', 'BREEZE', 'MANTRA', 'PASSES'],
        bonusWords: ['FLAG', 'WIND', 'HIGH'],
        targetTimeSeconds: 100
      },
      {
        id: 'mt-63',
        levelNumber: 63,
        destinationId: 'mountains',
        title: 'Patagonia Fitz Roy',
        description: 'Sheer granite monoliths battered by Patagonian winds.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['GRANITE', 'SPIRES', 'GLACIAL', 'LAGOON', 'MORAINES'],
        bonusWords: ['COLD', 'ROCK', 'LAKE'],
        targetTimeSeconds: 110
      },
      {
        id: 'mt-64',
        levelNumber: 64,
        destinationId: 'mountains',
        title: 'Sherpa Base Camp',
        description: 'Tents dotting the Khumbu glacier beneath Everest.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['SHERPA', 'CRAMPONS', 'OXYGEN', 'CARABINER', 'ICEAXE'],
        bonusWords: ['TENT', 'ROPE', 'CLIMB'],
        targetTimeSeconds: 120
      },
      {
        id: 'mt-65',
        levelNumber: 65,
        destinationId: 'mountains',
        title: 'Crevasses of Mont Blanc',
        description: 'Deep sapphire fractures hidden beneath fresh powder.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['CREVASSE', 'SERACS', 'AVALANCHE', 'BLIZZARD', 'TREKKER', 'HARNESS'],
        bonusWords: ['BLUE', 'DROP', 'FALL'],
        targetTimeSeconds: 140
      },
      {
        id: 'mt-66',
        levelNumber: 66,
        destinationId: 'mountains',
        title: 'Alpine Meadow Edelweiss',
        description: 'Furry star-shaped white blossoms surviving rocky frost.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['EDELWEISS', 'BLOSSOM', 'PASTURE', 'CHALET', 'BOULDER', 'ALTITUDE'],
        bonusWords: ['STAR', 'GOAT', 'BELL'],
        targetTimeSeconds: 150
      },
      {
        id: 'mt-67',
        levelNumber: 67,
        destinationId: 'mountains',
        title: 'Dolomite Limestone Towers',
        description: 'Pale rose towers glowing pink at sunset.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['DOLOMITES', 'PINNACLE', 'ALPENGLOW', 'CLIMBER', 'VIAFERRATA', 'SCREES'],
        bonusWords: ['PINK', 'ROSE', 'WALL'],
        targetTimeSeconds: 160
      },
      {
        id: 'mt-68',
        levelNumber: 68,
        destinationId: 'mountains',
        title: 'Tibetan Plateau Horizons',
        description: 'The roof of the world stretching endlessly under azure sky.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['PLATEAU', 'YAKHERD', 'MONASTERY', 'PERMAFROST', 'SOLITUDE', 'HORIZONS'],
        bonusWords: ['WOOL', 'SUN', 'VAST'],
        targetTimeSeconds: 180
      },
      {
        id: 'mt-69',
        levelNumber: 69,
        destinationId: 'mountains',
        title: 'The Death Zone Summit',
        description: 'Above 8000 meters where every breath requires sheer willpower.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['ALTITUDE', 'EVEREST', 'ENDURANCE', 'SUMMITING', 'EXPEDITION', 'TRIUMPH', 'BLIZZARDS'],
        bonusWords: ['PEAK', 'COLD', 'WIND'],
        targetTimeSeconds: 200
      },
      {
        id: 'mt-70',
        levelNumber: 70,
        destinationId: 'mountains',
        title: 'BOSS: The Colossus of Everest',
        description: 'Stand at the apex of the world and conquer the ultimate high-altitude test!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Discover 8 mountaineering apex terms to claim victory!',
        words: ['MOUNTAINEER', 'EXPEDITION', 'CHALLENGER', 'PERSEVERANCE', 'COLOSSAL', 'MAJESTIC', 'TOPOGRAPHY', 'ASCENSION'],
        bonusWords: ['PEAK', 'ROPE', 'COLD', 'STAR'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 8. Ancient Civilizations (Levels 71–80)
  {
    id: 'ancient',
    name: 'Ancient Civilizations',
    subtitle: 'Lost Dynasties & Eternal Wonders',
    region: 'World Wonders',
    description: 'Uncover the mythical Hanging Gardens of Babylon, Mayan step pyramids, and rose-red Petra.',
    requiredStars: 160,
    color: '#8B5CF6',
    accentColor: '#35D6B0',
    imageUrl: 'https://images.unsplash.com/photo-1579606032834-deaff96c6e73?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579606032834-deaff96c6e73?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'The Treasury of Petra Jordan carved in rose rock',
    photographer: 'Federico Di Dio',
    levels: [
      {
        id: 'anc-71',
        levelNumber: 71,
        destinationId: 'ancient',
        title: 'Hanging Gardens of Babylon',
        description: 'Terraced stone arches overflowing with mountain trees.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['BABYLON', 'GARDENS', 'TIERS', 'PALMS'],
        bonusWords: ['WALL', 'TREE', 'GATE'],
        targetTimeSeconds: 90
      },
      {
        id: 'anc-72',
        levelNumber: 72,
        destinationId: 'ancient',
        title: 'Rose City of Petra',
        description: 'Hellenistic facades chiseled into rose-red canyon cliffs.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['TREASURY', 'CANYON', 'FACADE', 'CARVED'],
        bonusWords: ['ROSE', 'ROCK', 'SAND'],
        targetTimeSeconds: 100
      },
      {
        id: 'anc-73',
        levelNumber: 73,
        destinationId: 'ancient',
        title: 'Mayan Step Pyramid',
        description: 'Astronomical alignments tracking Venus and equinox shadows.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['ZIGGURAT', 'CALENDAR', 'EQUINOX', 'TEMPLE', 'SHADOW'],
        bonusWords: ['MOON', 'SUN', 'STAR'],
        targetTimeSeconds: 110
      },
      {
        id: 'anc-74',
        levelNumber: 74,
        destinationId: 'ancient',
        title: 'Oracle of Delphi',
        description: 'Priestesses uttering prophecies amidst mountain mists.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['PROPHECY', 'ORACLE', 'PARNASSUS', 'LAUREL', 'SANCTUM'],
        bonusWords: ['FATE', 'FIRE', 'MIST'],
        targetTimeSeconds: 120
      },
      {
        id: 'anc-75',
        levelNumber: 75,
        destinationId: 'ancient',
        title: 'Angkor Wat Moats',
        description: 'Sprawling Khmer sandstone towers reflecting in lotus ponds.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['ANGKOR', 'APSARA', 'BASRELIEF', 'GALLERY', 'CAUSEWAY', 'CAMBODIA'],
        bonusWords: ['MUD', 'POND', 'ROOT'],
        targetTimeSeconds: 140
      },
      {
        id: 'anc-76',
        levelNumber: 76,
        destinationId: 'ancient',
        title: 'The Great Silk Road',
        description: 'Caravans bearing jade, spices, and astrolabes.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['CARAVAN', 'SILKROAD', 'ASTROLABE', 'MERCHANT', 'OASIS', 'CAMEL'],
        bonusWords: ['JADE', 'ROAD', 'COIN'],
        targetTimeSeconds: 150
      },
      {
        id: 'anc-77',
        levelNumber: 77,
        destinationId: 'ancient',
        title: 'Machu Picchu Citadel',
        description: 'Granite palaces perched dramatically between cloud peaks.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['INCAN', 'CITADEL', 'INTIHATANA', 'TERRACES', 'ANDES', 'URUBAMBA'],
        bonusWords: ['MIST', 'PEAK', 'WALL'],
        targetTimeSeconds: 160
      },
      {
        id: 'anc-78',
        levelNumber: 78,
        destinationId: 'ancient',
        title: 'The Acropolis Parthenon',
        description: 'Pentelic marble columns dedicated to Athena Parthenos.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['PARTHENON', 'ACROPOLIS', 'PENTELIC', 'ATHENA', 'PEDIMENT', 'METOPES'],
        bonusWords: ['ZEUS', 'GREEK', 'CLAY'],
        targetTimeSeconds: 180
      },
      {
        id: 'anc-79',
        levelNumber: 79,
        destinationId: 'ancient',
        title: 'Atlantis: Lost Citadel',
        description: 'Concentric rings of water and land harboring legendary orichalcum.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['ATLANTIS', 'CONCENTRIC', 'ORICHALCUM', 'POSEIDON', 'SUBMERGED', 'CITADEL', 'CATACLYSM'],
        bonusWords: ['RING', 'WAVE', 'DEEP'],
        targetTimeSeconds: 200
      },
      {
        id: 'anc-80',
        levelNumber: 80,
        destinationId: 'ancient',
        title: 'BOSS: The Oracle of Antiquity',
        description: 'Unveil the forgotten language of the ancients in an ultimate milestone!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Discover 8 ancient mythic terms to unlock the celestial gate!',
        words: ['CIVILIZATION', 'ARCHAEOLOGY', 'MONUMENTAL', 'HIEROGLYPHIC', 'MYTHOLOGY', 'CATASTROPHE', 'CHRONOLOGY', 'ENLIGHTENED'],
        bonusWords: ['TOME', 'RUNE', 'GOLD', 'FIRE'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 9. Ocean and Island Worlds (Levels 81–90)
  {
    id: 'oceans',
    name: 'Ocean & Island Worlds',
    subtitle: 'Great Barrier Reefs & Santorini Cliffs',
    region: 'Maritime Seas',
    description: 'Explore the turquoise lagoons of Bora Bora, Great Barrier Reef corals, and cliffside villas of Santorini.',
    requiredStars: 185,
    color: '#0284C7',
    accentColor: '#38BDF8',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Overwater bungalows in turquoise lagoon Maldives',
    photographer: 'Colin Watts',
    levels: [
      {
        id: 'oc-81',
        levelNumber: 81,
        destinationId: 'oceans',
        title: 'Bora Bora Coral Atoll',
        description: 'Overwater huts perched on turquoise lagoon waters.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['ATOLL', 'LAGOON', 'CORAL', 'REEF'],
        bonusWords: ['FISH', 'BLUE', 'ISLE'],
        targetTimeSeconds: 90
      },
      {
        id: 'oc-82',
        levelNumber: 82,
        destinationId: 'oceans',
        title: 'Great Barrier Marine Park',
        description: 'Massive colonies of brain coral and manta rays.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['MANTARAY', 'ANEMONE', 'TURTLE', 'POLYP'],
        bonusWords: ['FIN', 'SWIM', 'TIDE'],
        targetTimeSeconds: 100
      },
      {
        id: 'oc-83',
        levelNumber: 83,
        destinationId: 'oceans',
        title: 'Santorini Sunset Caldera',
        description: 'Blue-domed churches standing atop volcanic cliffs.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['CALDERA', 'SANTORINI', 'DOMES', 'CLIFFSIDE', 'AZURE'],
        bonusWords: ['BLUE', 'SEA', 'COVE'],
        targetTimeSeconds: 110
      },
      {
        id: 'oc-84',
        levelNumber: 84,
        destinationId: 'oceans',
        title: 'Galapagos Giant Tortoises',
        description: 'Volcanic islands harboring living prehistoric wonders.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['TORTOISE', 'IGUANA', 'VOLCANIC', 'DARWIN', 'ISLANDS'],
        bonusWords: ['BIRD', 'SHELL', 'BEAK'],
        targetTimeSeconds: 120
      },
      {
        id: 'oc-85',
        levelNumber: 85,
        destinationId: 'oceans',
        title: 'Fiji Bioluminescent Night',
        description: 'Plankton sparkling blue with every paddle stroke.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['BIOLUMINESCENT', 'PLANKTON', 'SPARKLE', 'KAYAK', 'PACIFIC', 'CURRENTS'],
        bonusWords: ['GLOW', 'DARK', 'STAR'],
        targetTimeSeconds: 140
      },
      {
        id: 'oc-86',
        levelNumber: 86,
        destinationId: 'oceans',
        title: 'Maldives Coral Nursery',
        description: 'Growing juvenile corals to revive natural reefs.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['NURSERY', 'RESTORATION', 'SHALLOWS', 'SEAGRASS', 'MANTA', 'SANDBAR'],
        bonusWords: ['SAND', 'FISH', 'TIDE'],
        targetTimeSeconds: 150
      },
      {
        id: 'oc-87',
        levelNumber: 87,
        destinationId: 'oceans',
        title: 'Whale Shark Migration',
        description: 'Gentle patterned giants filtering ocean plankton.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['WHALESHARK', 'FILTER', 'PATTERNS', 'OCEANIC', 'GIGANTIC', 'GILLS'],
        bonusWords: ['TAIL', 'DEEP', 'SWIM'],
        targetTimeSeconds: 160
      },
      {
        id: 'oc-88',
        levelNumber: 88,
        destinationId: 'oceans',
        title: 'Sailing the Caribbean Trades',
        description: 'Catamaran sails catching steady eastern trade winds.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['CATAMARAN', 'TRADEWINDS', 'ANCHORAGE', 'ISLANDHOPPING', 'MARITIME', 'ARCHIPELAGO'],
        bonusWords: ['SAIL', 'BOAT', 'ROPE'],
        targetTimeSeconds: 180
      },
      {
        id: 'oc-89',
        levelNumber: 89,
        destinationId: 'oceans',
        title: 'Abyssal Deep Trench',
        description: 'Strange luminous creatures dwelling miles beneath the surface.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['MARIANAS', 'SUBMERSIBLE', 'HYDROTHERMAL', 'PRESSURE', 'CREATURES', 'BLACKNESS', 'CHALLENGER'],
        bonusWords: ['DEEP', 'COLD', 'DARK'],
        targetTimeSeconds: 200
      },
      {
        id: 'oc-90',
        levelNumber: 90,
        destinationId: 'oceans',
        title: 'BOSS: Leviathan of the Deep',
        description: 'Survive the oceanic depths and claim the pearl of the abyss!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Discover 8 deep oceanic navigation words!',
        words: ['SUBMERSIBLE', 'NAVIGATION', 'ARCHIPELAGO', 'BIOLUMINESCENT', 'HYDROTHERMAL', 'EXPEDITION', 'OCEANOGRAPHY', 'CHALLENGER'],
        bonusWords: ['WAVE', 'DEEP', 'TIDE', 'FIN'],
        targetTimeSeconds: 240
      }
    ]
  },

  // 10. Cosmic Word Quest (Levels 91–100)
  {
    id: 'cosmic',
    name: 'Cosmic Word Quest',
    subtitle: 'Nebulas, Pulsars & Stellar Observatories',
    region: 'Deep Cosmos',
    description: 'Venture beyond planetary atmospheres into starry stellar nebulas, orbital space telescopes, and cosmic horizons.',
    requiredStars: 210,
    color: '#7C3AED',
    accentColor: '#35D6B0',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Starry cosmic galaxy and Milky Way nebula',
    photographer: 'Vincent Guth',
    levels: [
      {
        id: 'co-91',
        levelNumber: 91,
        destinationId: 'cosmic',
        title: 'Dancing Northern Aurora',
        description: 'Charged solar particles igniting emerald atmospheric ribbons.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['AURORA', 'SOLAR', 'MAGNETIC', 'GLOW'],
        bonusWords: ['SKY', 'STAR', 'WIND'],
        targetTimeSeconds: 90
      },
      {
        id: 'co-92',
        levelNumber: 92,
        destinationId: 'cosmic',
        title: 'Craters of the Moon',
        description: 'Silver dust and basalt maria undisturbed for millennia.',
        gridSize: 8,
        difficulty: 'beginner',
        words: ['LUNAR', 'CRATER', 'BASALT', 'ORBIT'],
        bonusWords: ['MOON', 'DARK', 'DUST'],
        targetTimeSeconds: 100
      },
      {
        id: 'co-93',
        levelNumber: 93,
        destinationId: 'cosmic',
        title: 'Orion Nebula Nursery',
        description: 'Glowing clouds of interstellar hydrogen forging new suns.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['NEBULA', 'STELLAR', 'HYDROGEN', 'PROTOSTAR', 'RADIATION'],
        bonusWords: ['STAR', 'GLOW', 'BEAM'],
        targetTimeSeconds: 110
      },
      {
        id: 'co-94',
        levelNumber: 94,
        destinationId: 'cosmic',
        title: 'Saturnian Ice Rings',
        description: 'Billions of water-ice boulders orbiting in flat planes.',
        gridSize: 9,
        difficulty: 'easy',
        words: ['SATURN', 'RINGS', 'GRAVITY', 'CASSINI', 'TITAN'],
        bonusWords: ['COLD', 'ICE', 'ROCK'],
        targetTimeSeconds: 120
      },
      {
        id: 'co-95',
        levelNumber: 95,
        destinationId: 'cosmic',
        title: 'Hubble Deep Field',
        description: 'Peering back into the infancy of time across ten thousand galaxies.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['GALAXY', 'TELESCOPE', 'EXOPLANET', 'EXPANSION', 'LIGHTYEAR', 'REDSHIFT'],
        bonusWords: ['LENS', 'DEEP', 'TIME'],
        targetTimeSeconds: 140
      },
      {
        id: 'co-96',
        levelNumber: 96,
        destinationId: 'cosmic',
        title: 'Pulsar Lighthouse Beams',
        description: 'Rapidly rotating neutron stars beaming radio pulses into void.',
        gridSize: 10,
        difficulty: 'medium',
        words: ['PULSAR', 'NEUTRON', 'MAGNETAR', 'ROTATION', 'FREQUENCY', 'COSMOS'],
        bonusWords: ['BEAT', 'SPIN', 'WAVE'],
        targetTimeSeconds: 150
      },
      {
        id: 'co-97',
        levelNumber: 97,
        destinationId: 'cosmic',
        title: 'James Webb Infrared Miracles',
        description: 'Gold-beryllium hexagonal mirrors unveiling ancient dust clouds.',
        gridSize: 11,
        difficulty: 'medium',
        words: ['INFRARED', 'HEXAGON', 'SUNSHIELD', 'MIRRORS', 'ASTRONOMY', 'SPECTRA'],
        bonusWords: ['GOLD', 'HEAT', 'COLD'],
        targetTimeSeconds: 160
      },
      {
        id: 'co-98',
        levelNumber: 98,
        destinationId: 'cosmic',
        title: 'Supernova Remnant Veil',
        description: 'Expanding shockwaves scattering iron and calcium into space.',
        gridSize: 11,
        difficulty: 'hard',
        words: ['SUPERNOVA', 'SHOCKWAVE', 'ELEMENTS', 'COLLAPSE', 'SYNTHESIS', 'INTERSTELLAR'],
        bonusWords: ['FIRE', 'IRON', 'DUST'],
        targetTimeSeconds: 180
      },
      {
        id: 'co-99',
        levelNumber: 99,
        destinationId: 'cosmic',
        title: 'Event Horizon Gateway',
        description: 'Where gravity bends space and time around a supermassive singularity.',
        gridSize: 12,
        difficulty: 'hard',
        words: ['BLACKHOLE', 'SINGULARITY', 'RELATIVITY', 'SPACETIME', 'HORIZON', 'GRAVITATIONAL', 'WARPING'],
        bonusWords: ['DARK', 'DEEP', 'VOID'],
        targetTimeSeconds: 200
      },
      {
        id: 'co-100',
        levelNumber: 100,
        destinationId: 'cosmic',
        title: 'BOSS: The Master of the Universe',
        description: 'The monumental final milestone! Complete the cosmic constellation to conquer Word Odyssey!',
        gridSize: 12,
        difficulty: 'expert',
        isBossLevel: true,
        bossStages: 3,
        specialObjective: 'Uncover all 8 grand cosmic truth words to achieve Odyssey Immortality!',
        words: ['ASTROPHYSICS', 'CONSTELLATION', 'INTERSTELLAR', 'GRAVITATIONAL', 'SINGULARITY', 'ILLUMINATION', 'SUPERMASSIVE', 'TRANSCENDENCE'],
        bonusWords: ['STAR', 'SUN', 'MOON', 'VOID'],
        targetTimeSeconds: 240
      }
    ]
  }
];

// Word banks for procedural levels beyond level 100
const PROCEDURAL_WORD_POOLS: Record<string, string[]> = {
  explorer: [
    'NAVIGATE', 'HORIZONS', 'VOYAGER', 'PIONEER', 'EXPEDITION', 'COMPASS',
    'DISCOVERY', 'JOURNEY', 'WAYFARER', 'FRONTIER', 'MERIDIAN', 'TREKKER',
    'ODYSSEY', 'MIGRATION', 'DESTINY', 'HERITAGE', 'CHRONICLE', 'SOLITUDE'
  ],
  nature: [
    'WATERFALL', 'VOLCANO', 'GLACIER', 'CANYON', 'LAGOON', 'RAINFOREST',
    'SAVANNA', 'BLOSSOM', 'MEADOW', 'MANGROVE', 'ATOLL', 'PLATEAU',
    'PINNACLE', 'SERENITY', 'WILDERNESS', 'SEAGRASS', 'CREVASSE', 'VALLEY'
  ],
  science: [
    'ASTRONOMY', 'TELESCOPE', 'QUANTUM', 'PHOTON', 'ELEMENTS', 'GRAVITY',
    'MAGNETIC', 'SPECTRUM', 'GENETICS', 'ORGANISM', 'ATMOSPHERE', 'VELOCITY',
    'REACTIONS', 'EQUATION', 'CATALYST', 'PARTICLE', 'SYMMETRY', 'THEORY'
  ],
  ancient: [
    'MONUMENT', 'HIEROGLYPH', 'PYRAMID', 'PAPYRUS', 'COLOSSEUM', 'TEMPLE',
    'CITADEL', 'SARCOPHAGUS', 'SANCTUM', 'INSCRIPTION', 'MYTHOLOGY', 'EMPEROR',
    'AQUEDUCT', 'ARCHIVES', 'SCULPTURE', 'DYNASTY', 'CARAVAN', 'ORACLE'
  ]
};

/**
 * Procedural level generator for infinite levels beyond Level 100 (Level 101, 102, ... ∞).
 * Uses deterministic pseudo-random seeds so that each level number produces identical,
 * guaranteed solvable, properly balanced puzzles for every player!
 */
export function generateProceduralLevel(levelNumber: number): LevelConfig {
  // Deterministic seed based on levelNumber
  let seed = levelNumber * 104729;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const poolKeys = Object.keys(PROCEDURAL_WORD_POOLS);
  const selectedPoolKey = poolKeys[Math.floor(rand() * poolKeys.length)];
  const pool = PROCEDURAL_WORD_POOLS[selectedPoolKey];

  // Difficulty scaling based on level
  let gridSize = 10;
  let wordCount = 6;
  let difficulty: 'beginner' | 'easy' | 'medium' | 'hard' | 'expert' = 'medium';

  if (levelNumber <= 120) {
    gridSize = 10;
    wordCount = 6;
    difficulty = 'medium';
  } else if (levelNumber <= 150) {
    gridSize = 11;
    wordCount = 7;
    difficulty = 'hard';
  } else if (levelNumber <= 200) {
    gridSize = 12;
    wordCount = 8;
    difficulty = 'hard';
  } else {
    gridSize = 12;
    wordCount = 9;
    difficulty = 'expert';
  }

  // Shuffle pool deterministically
  const shuffled = [...pool].sort(() => rand() - 0.5);
  const words = shuffled.slice(0, wordCount);

  const isBoss = levelNumber % 10 === 0;

  return {
    id: `proc-${levelNumber}`,
    levelNumber,
    destinationId: 'cosmic',
    title: isBoss ? `BOSS: Infinity Trial ${levelNumber}` : `Infinite Odyssey · Chamber ${levelNumber}`,
    description: isBoss 
      ? `A monumental procedural boss milestone testing mastery of level ${levelNumber}!`
      : `Procedurally generated linguistic exploration beyond the 100 world frontiers.`,
    gridSize,
    difficulty,
    words,
    isBossLevel: isBoss,
    bossStages: isBoss ? 3 : undefined,
    specialObjective: isBoss ? 'Defeat the infinite guardian by discovering all target terms!' : undefined,
    bonusWords: ['STAR', 'GOLD', 'TIME', 'WAVE'],
    targetTimeSeconds: 150 + Math.min(150, (levelNumber - 100) * 2),
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
  };
}
