import { WordDefinition } from '../types/game';

// Dictionary of definitions and fascinating trivia for Vocabulary Mode
export const WORD_DEFINITIONS: Record<string, WordDefinition> = {
  // India Explorer Pack (with Hindi meanings)
  LOTUS: {
    word: 'LOTUS',
    phonetic: '/ˈloʊ.təs/',
    partOfSpeech: 'noun',
    definition: 'An aquatic plant known for blooming unstained out of muddy waters, symbolizing purity and spiritual awakening.',
    funFact: 'Lotus seeds can remain viable for more than 1,000 years and still germinate successfully.',
    hindiMeaning: 'कमल (Kamal) — पवित्रता और आत्मज्ञान का प्रतीक',
    exampleSentence: 'The sacred temple pool was covered with blooming pink lotus petals.',
    synonyms: ['Water lily', 'Nelumbo', 'Padma']
  },
  GANGA: {
    word: 'GANGA',
    phonetic: '/ˈɡʌŋ.ɡɑː/',
    partOfSpeech: 'proper noun',
    definition: 'The trans-boundary sacred river of Asia, revered as a living mother goddess in Indian culture.',
    funFact: 'The river basin supports more than 400 million people, one of the most populated river basins on Earth.',
    hindiMeaning: 'गंगा (Ganga) — पवित्र जीवनदायिनी नदी',
    exampleSentence: 'Pilgrims gathered on the stone ghats of Varanasi at sunrise beside the sacred Ganga.',
    synonyms: ['Ganges', 'Bhagirathi', 'Mandakini']
  },
  TEMPLE: {
    word: 'TEMPLE',
    phonetic: '/ˈtɛm.pəl/',
    partOfSpeech: 'noun',
    definition: 'A structure reserved for religious or spiritual rituals, prayer, and community meditation.',
    funFact: 'Many ancient stone temples were designed as physical geometric microcosms of the universe (mandalas).',
    hindiMeaning: 'मंदिर (Mandir) — उपासना और ध्यान का पावन स्थल',
    exampleSentence: 'Incense smoke drifted between the carved stone pillars of the ancient temple.',
    synonyms: ['Sanctuary', 'Shrine', 'Mandir']
  },
  RIVER: {
    word: 'RIVER',
    phonetic: '/ˈrɪv.ər/',
    partOfSpeech: 'noun',
    definition: 'A large natural stream of water flowing in a channel to the sea, a lake, or another river.',
    funFact: 'Ancient civilizations across Earth originally flourished along major freshwater river systems.',
    hindiMeaning: 'नदी (Nadi) — प्राकृतिक जलधारा',
    exampleSentence: 'Wooden boats drifted quietly down the misty river at dawn.',
    synonyms: ['Stream', 'Waterway', 'Tributary']
  },
  SAFFRON: {
    word: 'SAFFRON',
    phonetic: '/ˈsæf.rən/',
    partOfSpeech: 'noun',
    definition: 'A prized spice derived from the crimson stigmata of the Crocus sativus flower.',
    funFact: 'It takes roughly 75,000 individual crocus flowers to produce just one single pound of dried saffron threads.',
    hindiMeaning: 'केसर (Kesar) — बहुमूल्य सुगंधित मसाला',
    exampleSentence: 'Golden saffron infused the festive rice pudding with vibrant color and fragrance.',
    synonyms: ['Kesar', 'Golden spice', 'Crocus']
  },
  GINGER: {
    word: 'GINGER',
    phonetic: '/ˈdʒɪn.dʒər/',
    partOfSpeech: 'noun',
    definition: 'A pungent, aromatic underground stem (rhizome) widely used as a culinary spice and natural remedy.',
    funFact: 'Ginger has been cultivated in South Asia for over 5,000 years for culinary and Ayurvedic wellness.',
    hindiMeaning: 'अदरक (Adrak) / सोंठ (Sonth) — गुणकारी पाचक जड़ी-बूटी',
    exampleSentence: 'Fresh crushed ginger was simmered with tea leaves in the morning chai kettle.',
    synonyms: ['Adrak', 'Rhizome', 'Spice']
  },
  CHAI: {
    word: 'CHAI',
    phonetic: '/tʃaɪ/',
    partOfSpeech: 'noun',
    definition: 'Traditional spiced milk tea brewed with cardamom, cloves, ginger, and cinnamon.',
    funFact: 'Clay cups called "kulhads" are traditional unglazed earthenware vessels that impart an earthy aroma to chai.',
    hindiMeaning: 'चाय (Chai) — सुगंधित मसाला चाय',
    exampleSentence: 'Street vendors in Old Delhi served piping hot chai in rustic clay cups.',
    synonyms: ['Masala tea', 'Karak tea']
  },
  CLOVE: {
    word: 'CLOVE',
    phonetic: '/kloʊv/',
    partOfSpeech: 'noun',
    definition: 'The aromatic dried flower buds of a tree in the family Myrtaceae, native to the Maluku Islands.',
    funFact: 'Cloves contain eugenol, an essential oil historically used for soothing tooth sensitivity.',
    hindiMeaning: 'लौंग (Laung) — सुगंधित पाचक पुष्प कली',
    exampleSentence: 'A whole clove was added to the warming winter broth.',
    synonyms: ['Laung', 'Spice bud']
  },
  PEACOCK: {
    word: 'PEACOCK',
    phonetic: '/ˈpiː.kɒk/',
    partOfSpeech: 'noun',
    definition: 'The magnificent male peafowl characterized by its iridescent crest and iridescent emerald-and-blue eye-spotted tail covert feathers.',
    funFact: 'Peacock feathers are not colored by pigment, but by microscopic crystalline structures that refract light.',
    hindiMeaning: 'मोर (Mor) — भारत का राष्ट्रीय पक्षी',
    exampleSentence: 'A royal peacock fanned its turquoise plumage across the palace lawn.',
    synonyms: ['Peafowl', 'Mayura']
  },
  MONSOON: {
    word: 'MONSOON',
    phonetic: '/mɒnˈsuːn/',
    partOfSpeech: 'noun',
    definition: 'A seasonal prevailing wind shift bringing dramatic precipitation and rejuvenating vital agriculture.',
    funFact: 'The word originates from the Arabic word "mawsim", meaning season.',
    hindiMeaning: 'मानसून (Monsoon) — वर्षा ऋतु की जीवनदायिनी हवाएं',
    exampleSentence: 'The monsoon rains turned the parched hillside into an emerald oasis.',
    synonyms: ['Rainy season', 'Deluge', 'Varsha']
  },
  BENGAL: {
    word: 'BENGAL',
    phonetic: '/bɛŋˈɡɔːl/',
    partOfSpeech: 'proper noun',
    definition: 'A historic region in the eastern part of South Asia famed for mangrove deltas and rich cultural heritage.',
    funFact: 'The Sundarbans delta in Bengal constitutes the largest tidal mangrove forest in the world.',
    hindiMeaning: 'बंगाल (Bengal) — समृद्ध सांस्कृतिक एवं वन प्रदेश',
    exampleSentence: 'The tidal mangroves of Bengal are home to elusive Royal Bengal tigers.',
    synonyms: ['Sundarbans', 'Bangla']
  },
  TIGER: {
    word: 'TIGER',
    phonetic: '/ˈtaɪ.ɡər/',
    partOfSpeech: 'noun',
    definition: 'The largest living cat species, identifiable by dark vertical stripes on orange fur.',
    funFact: 'No two tigers have identical stripe patterns; like human fingerprints, every pattern is unique.',
    hindiMeaning: 'बाघ (Bagh) — शक्तिशाली धारीदार वनराज',
    exampleSentence: 'The wild tiger moved silently through the dense bamboo thicket.',
    synonyms: ['Bagh', 'Big cat', 'Panthera tigris']
  },
  MAHARAJA: {
    word: 'MAHARAJA',
    phonetic: '/ˌmɑː.həˈrɑː.dʒə/',
    partOfSpeech: 'noun',
    definition: 'A Sanskrit title meaning "great king" or high ruler.',
    funFact: 'Historically, maharajas were known as great patrons of the arts, astronomy, and architecture.',
    hindiMeaning: 'महाराजा (Maharaja) — महान नरेश अथवा शासक',
    exampleSentence: 'The maharaja commissioned grand observatories across the desert kingdom.',
    synonyms: ['King', 'Ruler', 'Monarch']
  },
  MARBLE: {
    word: 'MARBLE',
    phonetic: '/ˈmɑːr.bəl/',
    partOfSpeech: 'noun',
    definition: 'A metamorphic rock composed of recrystallized carbonate minerals, admired for its luminous sheen.',
    funFact: 'The Makrana marble used in iconic monuments appears to change color depending on the hour of sunlight.',
    hindiMeaning: 'संगमरमर (Sangmarmar) — श्वेत चमकदार पाषाण',
    exampleSentence: 'Polished white marble captured the golden glow of the morning sun.',
    synonyms: ['Limestone', 'Alabaster', 'Stone']
  },

  // Japan
  CHERRY: {
    word: 'CHERRY',
    phonetic: '/ˈtʃɛr.i/',
    partOfSpeech: 'noun',
    definition: 'Refers to the sakura tree, whose transient springtime blossoms inspire reflection on life’s impermanence.',
    funFact: 'The practice of viewing cherry blossoms (hanami) has been celebrated for over a millennium.'
  },
  MATCHA: {
    word: 'MATCHA',
    phonetic: '/ˈmætʃ.ə/',
    partOfSpeech: 'noun',
    definition: 'Finely ground powder of specially grown and processed green tea leaves used in traditional ceremonies.',
    funFact: 'Tea bushes for matcha are shaded from direct sunlight for weeks before harvest to boost chlorophyll and theanine.'
  },
  BAMBOO: {
    word: 'BAMBOO',
    phonetic: '/bæmˈbuː/',
    partOfSpeech: 'noun',
    definition: 'A family of giant woody grasses known for astonishing tensile strength and rapid growth.',
    funFact: 'Certain species of bamboo can grow up to 35 inches (91 cm) in a single 24-hour day.'
  },
  TORII: {
    word: 'TORII',
    phonetic: '/ˈtɔːr.i.iː/',
    partOfSpeech: 'noun',
    definition: 'A traditional Japanese gate commonly found at the entrance of a Shinto shrine, demarcating sacred space.',
    funFact: 'Walking through a torii represents passing from the mundane realm into the dwelling place of spirits (kami).'
  },
  ORIGAMI: {
    word: 'ORIGAMI',
    phonetic: '/ˌɒr.ɪˈɡɑː.mi/',
    partOfSpeech: 'noun',
    definition: 'The traditional Japanese art of paper folding, requiring precision and patience without cuts or glue.',
    funFact: 'Legend holds that anyone who folds one thousand origami cranes will be granted a wish by the gods.'
  },
  SAMURAI: {
    word: 'SAMURAI',
    phonetic: '/ˈsæm.jʊ.raɪ/',
    partOfSpeech: 'noun',
    definition: 'The hereditary military nobility and officer caste of medieval and early-modern Japan.',
    funFact: 'Samurai followed Bushido, the "way of the warrior", emphasizing honor, self-mastery, and loyalty.'
  },
  VOLCANO: {
    word: 'VOLCANO',
    phonetic: '/vɒlˈkeɪ.noʊ/',
    partOfSpeech: 'noun',
    definition: 'A rupture in the planetary crust allowing hot lava, volcanic ash, and gases to escape from a magma chamber.',
    funFact: 'Mount Fuji is an active stratovolcano that last erupted in 1707, scattering ash all the way to Tokyo.'
  },

  // Egypt
  PYRAMID: {
    word: 'PYRAMID',
    phonetic: '/ˈpɪr.ə.mɪd/',
    partOfSpeech: 'noun',
    definition: 'A monumental structure with a polygonal base and triangular sides meeting at an apex.',
    funFact: 'The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years.'
  },
  SPHINX: {
    word: 'SPHINX',
    phonetic: '/sfɪŋks/',
    partOfSpeech: 'noun',
    definition: 'A mythical creature with the head of a human and the body of a lion, serving as an eternal guardian.',
    funFact: 'The Great Sphinx was carved directly from a single massive monolith of natural limestone bedrock.'
  },
  PAPYRUS: {
    word: 'PAPYRUS',
    phonetic: '/pəˈpaɪ.rəs/',
    partOfSpeech: 'noun',
    definition: 'A material prepared in ancient Egypt from the pithy stem of a water reed, used for writing documents.',
    funFact: 'Our modern English word "paper" directly derives from the Latin and Greek words for papyrus.'
  },
  PHARAOH: {
    word: 'PHARAOH',
    phonetic: '/ˈfɛər.oʊ/',
    partOfSpeech: 'noun',
    definition: 'The title used for the monarch rulers of ancient Egypt, considered intermediaries between gods and mankind.',
    funFact: 'The word pharaoh originally referred to the royal palace ("great house") before being applied to the ruler.'
  },
  ALEXANDRIA: {
    word: 'ALEXANDRIA',
    phonetic: '/ˌæl.ɪɡˈzɑːn.dri.ə/',
    partOfSpeech: 'proper noun',
    definition: 'A historic Mediterranean port city founded by Alexander the Great, home to antiquity’s greatest library.',
    funFact: 'The ancient Library of Alexandria aimed to collect a copy of every scroll in existence.'
  },

  // France
  LAVENDER: {
    word: 'LAVENDER',
    phonetic: '/ˈlæv.ən.dər/',
    partOfSpeech: 'noun',
    definition: 'A fragrant flowering plant of the mint family, celebrated for soothing aromatics and purple blossoms.',
    funFact: 'Romans used lavender to scent their bathwaters; the name comes from the Latin "lavare" (to wash).'
  },
  BAGUETTE: {
    word: 'BAGUETTE',
    phonetic: '/bæˈɡɛt/',
    partOfSpeech: 'noun',
    definition: 'A long, thin loaf of French bread characterized by its crisp golden crust and chewy interior.',
    funFact: 'In 2022, the artisanal know-how and culture of the baguette was inscribed on UNESCO’s Intangible Cultural Heritage list.'
  },
  CHATEAU: {
    word: 'CHATEAU',
    phonetic: '/ʃæˈtoʊ/',
    partOfSpeech: 'noun',
    definition: 'A French stately manor house or castle, frequently surrounded by vineyard estates.',
    funFact: 'The Loire Valley alone is home to more than 300 spectacular historical châteaux.'
  },
  IMPRESSION: {
    word: 'IMPRESSION',
    phonetic: '/ɪmˈprɛʃ.ən/',
    partOfSpeech: 'noun',
    definition: 'An artistic movement characterized by small, thin, yet visible brushstrokes and accurate depiction of light.',
    funFact: 'The name originated from Claude Monet’s painting "Impression, Sunrise" (1872).'
  },

  // Amazon
  CANOPY: {
    word: 'CANOPY',
    phonetic: '/ˈkæn.ə.pi/',
    partOfSpeech: 'noun',
    definition: 'The high, overlapping ceiling formed by the crowns of mature trees in a tropical forest.',
    funFact: 'Up to 90% of all organisms in a tropical rainforest live up in the sunlit canopy layer.'
  },
  MACAW: {
    word: 'MACAW',
    phonetic: '/məˈkɔː/',
    partOfSpeech: 'noun',
    definition: 'A long-tailed, often brilliantly colored New World parrot known for keen intelligence and social bonds.',
    funFact: 'Macaws mate for life and often fly wing-tip to wing-tip with their lifetime partners.'
  },
  JAGUAR: {
    word: 'JAGUAR',
    phonetic: '/ˈdʒæɡ.juː.ər/',
    partOfSpeech: 'noun',
    definition: 'The largest feline in the Americas, renowned as a strong swimmer and apex predator.',
    funFact: 'The jaguar has the strongest bite force of any big cat relative to its body weight.'
  },
  ORCHID: {
    word: 'ORCHID',
    phonetic: '/ˈɔːr.kɪd/',
    partOfSpeech: 'noun',
    definition: 'A diverse, widespread family of flowering plants noted for complex bilateral symmetry.',
    funFact: 'Vanilla flavoring comes from the cured seed pods of a specific tropical climbing orchid.'
  },

  // Iceland
  AURORA: {
    word: 'AURORA',
    phonetic: '/ɔːˈrɔːr.ə/',
    partOfSpeech: 'noun',
    definition: 'A natural light display in Earth’s sky caused by disturbances in the magnetosphere by solar wind.',
    funFact: 'The distinct green hue of northern lights occurs when charged particles collide with oxygen at altitudes around 60 miles.'
  },
  GEYSER: {
    word: 'GEYSER',
    phonetic: '/ˈɡaɪ.zər/',
    partOfSpeech: 'noun',
    definition: 'A rare hot spring characterized by intermittent discharges of water ejected turbulently with steam.',
    funFact: 'All geysers in the world are named after "Geysir", an Icelandic geothermal vent.'
  },
  GLACIER: {
    word: 'GLACIER',
    phonetic: '/ˈɡleɪ.ʃər/',
    partOfSpeech: 'noun',
    definition: 'A persistent body of dense ice that is constantly moving under its own immense weight.',
    funFact: 'Glaciers store roughly 69 percent of the world’s entire supply of fresh water.'
  },

  // Mediterranean
  OLIVES: {
    word: 'OLIVES',
    phonetic: '/ˈɒl.ɪvz/',
    partOfSpeech: 'noun',
    definition: 'The fruit of the Olea europaea tree, cultivated for millennia for culinary oil and nutrition.',
    funFact: 'Olive trees can survive and remain fruitful for well over 2,000 years.'
  },
  SAILBOAT: {
    word: 'SAILBOAT',
    phonetic: '/ˈseɪl.boʊt/',
    partOfSpeech: 'noun',
    definition: 'A boat propelled entirely or partly by sails harnessing the aerodynamic power of ocean wind.',
    funFact: 'Ancient Mediterranean navigators navigated by celestial star constellations and seasonal bird migration.'
  },

  // Ancient
  BABYLON: {
    word: 'BABYLON',
    phonetic: '/ˈbæb.ɪ.lɒn/',
    partOfSpeech: 'proper noun',
    definition: 'An ancient Mesopotamian city on the Euphrates River famed for its monumental gates and terraced gardens.',
    funFact: 'Babylonian mathematicians were the first to divide the circle into 360 degrees and the hour into 60 minutes.'
  },
  ATLANTIS: {
    word: 'ATLANTIS',
    phonetic: '/ætˈlæn.tɪs/',
    partOfSpeech: 'proper noun',
    definition: 'A legendary island first mentioned in Plato’s dialogues Timaeus and Critias as an advanced naval power.',
    funFact: 'Plato described Atlantis as being organized in concentric rings of alternating sea and arable land.'
  }
};

// Recognized valid bonus words (words that can appear in grids by chance or hidden treasure)
export const COMMON_BONUS_WORDS = new Set([
  'ACE', 'AGE', 'AIR', 'ALL', 'AND', 'ANT', 'APE', 'ARC', 'ARM', 'ART', 'ASH', 'AWE', 'AXE',
  'BAD', 'BAG', 'BAR', 'BAT', 'BAY', 'BEE', 'BED', 'BEG', 'BET', 'BIG', 'BIN', 'BIT', 'BOY',
  'BOX', 'BOW', 'BOG', 'BUD', 'BUS', 'BUT', 'BUY', 'CAN', 'CAP', 'CAR', 'CAT', 'COW', 'CRY',
  'CUP', 'CUT', 'DAY', 'DEN', 'DEW', 'DIG', 'DIM', 'DIP', 'DOG', 'DOT', 'DRY', 'DUE', 'DYE',
  'EAR', 'EAT', 'EEL', 'EGG', 'EGO', 'ELF', 'ELK', 'ELM', 'END', 'ERA', 'EVE', 'EYE', 'FAN',
  'FAR', 'FAT', 'FEW', 'FIN', 'FIR', 'FIT', 'FLY', 'FOG', 'FOR', 'FOX', 'FRY', 'FUN', 'FUR',
  'GAP', 'GAS', 'GEL', 'GEM', 'GET', 'GIG', 'GIN', 'GLAD', 'GLOW', 'GNU', 'GOD', 'GOLD', 'GOT',
  'GUM', 'GUN', 'GUT', 'GUY', 'GYM', 'HAD', 'HAM', 'HAT', 'HAY', 'HEN', 'HER', 'HEY', 'HID',
  'HIM', 'HIP', 'HIT', 'HOP', 'HOT', 'HUG', 'HUM', 'HUT', 'ICE', 'ILL', 'INK', 'INN', 'ION',
  'IVY', 'JAM', 'JAR', 'JAW', 'JAY', 'JET', 'JIG', 'JOB', 'JOG', 'JOY', 'JUG', 'KEY', 'KID',
  'KIN', 'KIT', 'LAB', 'LAD', 'LAP', 'LAW', 'LAY', 'LEG', 'LID', 'LIE', 'LIP', 'LIT', 'LOG',
  'LOT', 'LOW', 'MAD', 'MAN', 'MAP', 'MAT', 'MAY', 'MEN', 'MUD', 'MUG', 'MUM', 'NET', 'NEW',
  'NIL', 'NOD', 'NOT', 'NOW', 'NUT', 'OAK', 'OAR', 'OAT', 'ODD', 'OFF', 'OIL', 'OLD', 'ONE',
  'ORE', 'OWL', 'OWN', 'PAD', 'PAN', 'PAY', 'PEA', 'PEN', 'PET', 'PIG', 'PIN', 'PIT', 'PLY',
  'POD', 'POP', 'POT', 'PRO', 'PUN', 'PUP', 'RAG', 'RAM', 'RAN', 'RAP', 'RAT', 'RAW', 'RAY',
  'RED', 'RIB', 'RID', 'RIM', 'RIP', 'ROD', 'ROT', 'ROW', 'RUB', 'RUG', 'RUN', 'RUT', 'RYE',
  'SAD', 'SAG', 'SAP', 'SAW', 'SAY', 'SEA', 'SET', 'SEW', 'SHY', 'SIN', 'SIP', 'SIR', 'SIT',
  'SIX', 'SKI', 'SKY', 'SLY', 'SOB', 'SOD', 'SON', 'SOW', 'SOY', 'SPY', 'STY', 'SUE', 'SUM',
  'SUN', 'TAB', 'TAG', 'TAN', 'TAP', 'TAR', 'TAX', 'TEA', 'TEN', 'THE', 'TIE', 'TIN', 'TIP',
  'TOE', 'TON', 'TOP', 'TOW', 'TOY', 'TUB', 'TUG', 'TWO', 'URN', 'USE', 'VAN', 'VAT', 'VET',
  'VOW', 'WAR', 'WAX', 'WAY', 'WEB', 'WET', 'WHO', 'WIG', 'WIN', 'WIT', 'WOE', 'WOK', 'WON',
  'YAM', 'YAP', 'YEA', 'YES', 'YET', 'YEW', 'YIP', 'YOU', 'ZEN', 'ZIP', 'ZOO',
  // 4-letter words
  'ARCH', 'AURA', 'AWAY', 'BAKE', 'BALD', 'BAND', 'BARK', 'BARN', 'BEAM', 'BEAN', 'BEAR',
  'BEAT', 'BELL', 'BIRD', 'BITE', 'BLOW', 'BLUE', 'BOAT', 'BOLT', 'BOND', 'BONE', 'BOOK',
  'BOOM', 'BOWL', 'BUSH', 'CALM', 'CAMP', 'CARD', 'CARE', 'CAST', 'CAVE', 'CHEF', 'CLAW',
  'CLAY', 'COAL', 'COAT', 'COIN', 'COLD', 'COME', 'COOK', 'COOL', 'CORN', 'CRAB', 'DAWN',
  'DEAL', 'DEEP', 'DEER', 'DESK', 'DIVE', 'DOCK', 'DOOR', 'DOVE', 'DOWN', 'DRAW', 'DUST',
  'ECHO', 'EDGE', 'FAIR', 'FALL', 'FARM', 'FAST', 'FEAT', 'FERN', 'FIND', 'FIRE', 'FISH',
  'FLAG', 'FLOW', 'FOAM', 'FORT', 'FROG', 'GATE', 'GIFT', 'GLOW', 'GOAL', 'GOLD', 'GRIP',
  'GULF', 'HAIL', 'HALO', 'HAWK', 'HEAT', 'HELM', 'HERB', 'HILL', 'HINT', 'HIVE', 'HOPE',
  'HORN', 'ICON', 'IDEA', 'IRON', 'ISLE', 'JADE', 'JAZZ', 'JOIN', 'JUMP', 'KEEL', 'KELP',
  'KIND', 'KING', 'KITE', 'LAKE', 'LAMB', 'LAMP', 'LAND', 'LARK', 'LEAF', 'LENS', 'LILY',
  'LION', 'LOCK', 'LORE', 'LUSH', 'MANA', 'MASK', 'MAST', 'MAZE', 'MEAD', 'MESA', 'MINT',
  'MIST', 'MOAT', 'MOON', 'MOSS', 'MUSE', 'NAVY', 'NEST', 'NOON', 'NOVA', 'OASIS', 'ORCA',
  'PALE', 'PALM', 'PATH', 'PEAK', 'PEAR', 'PIER', 'PINE', 'POND', 'PORT', 'POST', 'RAIN',
  'REED', 'REEF', 'RING', 'RISE', 'RIVER', 'ROAR', 'ROCK', 'ROOF', 'ROOT', 'ROSE', 'RUNE',
  'SAIL', 'SAND', 'SEAL', 'SHIP', 'SILK', 'SILT', 'SNOW', 'SOIL', 'SOLAR', 'STAR', 'STEM',
  'STEP', 'SURF', 'SWAN', 'SWIM', 'TALE', 'TALK', 'TALL', 'TENT', 'TIDE', 'TOME', 'TOOL',
  'TREE', 'TUNE', 'VALE', 'VANE', 'VASE', 'VEIN', 'VEST', 'VINE', 'WAVE', 'WIND', 'WING',
  'WISH', 'WOLF', 'WOOD', 'WOOL', 'YARD', 'ZEST'
]);
