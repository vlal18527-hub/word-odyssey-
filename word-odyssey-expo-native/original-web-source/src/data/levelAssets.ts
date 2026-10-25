export interface LevelAsset {
  imageUrl: string;
  thumbnailUrl: string;
  imageAlt: string;
  caption: string;
  photographer?: string;
}

export const LEVEL_ASSETS: Record<string, LevelAsset> = {
  // World 1: India Explorer (Levels 1–10)
  'in-1': {
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Sunrise over Varanasi Ganges ghats',
    caption: 'Varanasi Sacred Riverfront, India',
    photographer: 'Fravel LLC'
  },
  'in-2': {
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Colorful spice market piles with turmeric and saffron',
    caption: 'Spice Bazaar of Old Delhi, India',
    photographer: 'Prateek Gautam'
  },
  'in-3': {
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Amber Fort ramparts overlooking the valley in Jaipur',
    caption: 'Amber Fort Hilltop Palace, Jaipur',
    photographer: 'Sylwia Bartyzel'
  },
  'in-4': {
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Hawa Mahal Palace of Winds lattice windows',
    caption: 'Hawa Mahal Wind Palace, Jaipur',
    photographer: 'Annie Spratt'
  },
  'in-5': {
    imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Traditional wooden houseboat on emerald Kerala backwaters',
    caption: 'Alleppey Palm-Fringed Backwaters, Kerala',
    photographer: 'Karthik Sridharan'
  },
  'in-6': {
    imageUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Royal Bengal Tiger walking silently in lush forest',
    caption: 'Bengal Tiger Sanctuary, Ranthambore',
    photographer: 'Gary Bendig'
  },
  'in-7': {
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Fresh Ayurvedic herbs and sandalwood oils',
    caption: 'Botanical Ayurvedic Terraces, Kerala',
    photographer: 'Content Pixie'
  },
  'in-8': {
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'City Palace overlooking Pichola lake in Udaipur',
    caption: 'Lake Pichola Marble Pavilions, Udaipur',
    photographer: 'Santhosh Kumar'
  },
  'in-9': {
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Taj Mahal reflecting pool at sunrise',
    caption: 'Ivory Marble Mausoleum, Agra',
    photographer: 'Jovyn Chamb'
  },
  'in-10': {
    imageUrl: 'https://images.unsplash.com/photo-1588096344356-9a2f2ef48e2f?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588096344356-9a2f2ef48e2f?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Royal courtyards of Mehrangarh fortress perched on blue city cliffs',
    caption: 'BOSS ARENA: Citadel of Rajasthan',
    photographer: 'Annie Spratt'
  },

  // World 2: Japan Journey (Levels 11–20)
  'jp-11': {
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Pink cherry blossom petals in springtime',
    caption: 'Cherry Blossom Hanami, Kyoto',
    photographer: 'Manuel Cosentino'
  },
  'jp-12': {
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Matcha green tea bowl and bamboo whisk',
    caption: 'Traditional Zen Tea House, Uji',
    photographer: 'Matcha & Co'
  },
  'jp-13': {
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Vermilion torii gates winding up mountain path',
    caption: 'Fushimi Inari Taisha, Kyoto',
    photographer: 'Soragrit Wongsa'
  },
  'jp-14': {
    imageUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Folded paper origami cranes on tatami mat',
    caption: 'Origami Master Paper Fold, Nara',
    photographer: 'Geoffroy Hauvenois'
  },
  'jp-15': {
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Dense green bamboo grove pathway',
    caption: 'Arashiyama Bamboo Forest, Kyoto',
    photographer: 'Tianshu Liu'
  },
  'jp-16': {
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Raked stone gravel in peaceful Japanese rock sanctuary',
    caption: 'Ryoan-ji Zen Stone Garden, Kyoto',
    photographer: 'Sora Sagano'
  },
  'jp-17': {
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Antique forged samurai katana blade',
    caption: 'Bushido Castle Armoury, Himeji',
    photographer: 'Dmitry Ratushny'
  },
  'jp-18': {
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Tokyo Shibuya crossing glowing with neon signs at dusk',
    caption: 'Shibuya Neon Crossing, Tokyo',
    photographer: 'Jezael Melgoza'
  },
  'jp-19': {
    imageUrl: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Snowcapped Mount Fuji summit above clouds',
    caption: 'Sacred Mount Fuji Summit, Honshu',
    photographer: 'Evgeny Tchebotarev'
  },
  'jp-20': {
    imageUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Ancient feudal Japanese castle battlements against evening sky',
    caption: 'BOSS ARENA: White Heron Citadel, Himeji',
    photographer: 'Sora Sagano'
  },

  // World 3: Egypt Mysteries (Levels 21–30)
  'eg-21': {
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Great Pyramid of Giza under bright desert sun',
    caption: 'The Great Pyramid of Khufu, Giza',
    photographer: 'Jeremy Zero'
  },
  'eg-22': {
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'The Sphinx guarding the Giza plateau',
    caption: 'Great Sphinx of Giza, Egypt',
    photographer: 'Spencer Davis'
  },
  'eg-23': {
    imageUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Hieroglyphic inscriptions on aged papyrus',
    caption: 'Royal Papyrus Scriptorium, Thebes',
    photographer: 'Omar Elsharawy'
  },
  'eg-24': {
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Dry desert canyons of Valley of the Kings',
    caption: 'Valley of the Kings, Luxor',
    photographer: 'Simon Berger'
  },
  'eg-25': {
    imageUrl: 'https://images.unsplash.com/photo-1608933221379-e58f00db7e16?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608933221379-e58f00db7e16?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Golden Egyptian burial mask and royal funerary relics',
    caption: 'Tutankhamun Royal Tomb Chamber',
    photographer: 'Ayman Ezzat'
  },
  'eg-26': {
    imageUrl: 'https://images.unsplash.com/photo-1590059390047-ee6c09b02a76?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590059390047-ee6c09b02a76?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Gigantic sandstone hypostyle pillars at Karnak',
    caption: 'Grand Hypostyle Hall, Karnak Temple',
    photographer: 'Marc-Olivier Jodoin'
  },
  'eg-27': {
    imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'White felucca sailing boat on calm blue waters of the Nile',
    caption: 'Nile Felucca at Aswan Sunset',
    photographer: 'Fadi Eid'
  },
  'eg-28': {
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Four colossal seated statues of Ramses II carved into cliff face',
    caption: 'Rock Temples of Abu Simbel',
    photographer: '24K-Production'
  },
  'eg-29': {
    imageUrl: 'https://images.unsplash.com/photo-1550953403-f119050d2449?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550953403-f119050d2449?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Historic Mediterranean coastline of Alexandria',
    caption: 'Ancient Port of Alexandria, Egypt',
    photographer: 'Mohammed Essam'
  },
  'eg-30': {
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Pyramids of Giza silhouetted against twilight desert sky',
    caption: 'BOSS ARENA: Throne of the Pharaohs',
    photographer: 'Alex Azabache'
  },

  // World 4: European Wonders (Levels 31–40)
  'eu-31': {
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Purple lavender rows blooming in Provence',
    caption: 'Lavender Terraces of Valensole, France',
    photographer: 'Chris Karidis'
  },
  'eu-32': {
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Pont Alexandre III bridge over the Seine in Paris',
    caption: 'River Seine Stone Bridges, Paris',
    photographer: 'Alexander Kagan'
  },
  'eu-33': {
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'The Roman Colosseum under morning sun',
    caption: 'Flavian Amphitheatre (Colosseum), Rome',
    photographer: 'David Kohler'
  },
  'eu-34': {
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Big Ben clock tower and Houses of Parliament',
    caption: 'Westminster Clock Tower, London',
    photographer: 'Benjamin Davies'
  },
  'eu-35': {
    imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Amsterdam canal houses reflecting in water',
    caption: 'Herengracht Canal Belt, Amsterdam',
    photographer: 'Adrien Olichon'
  },
  'eu-36': {
    imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Fairy tale spires of Neuschwanstein Castle in Bavarian forest',
    caption: 'Neuschwanstein Alpine Castle, Bavaria',
    photographer: 'Rachel Davis'
  },
  'eu-37': {
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Eiffel Tower soaring above Champ de Mars gardens',
    caption: 'The Iron Lady Beacon, Paris',
    photographer: 'Anthony DELANOIX'
  },
  'eu-38': {
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Sagrada Familia stone spires in Barcelona',
    caption: 'Basílica de la Sagrada Família, Barcelona',
    photographer: 'Daniel Corneschi'
  },
  'eu-39': {
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Terracotta roofs and ancient sea ramparts of Dubrovnik',
    caption: 'Adriatic Walled Citadel, Dubrovnik',
    photographer: 'Sorin Sîrbu'
  },
  'eu-40': {
    imageUrl: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Florence Duomo cathedral dome overlooking Tuscan hills at sunset',
    caption: 'BOSS ARENA: The Renaissance Citadel, Florence',
    photographer: 'Jonathan Körner'
  },

  // World 5: Tropical Adventure (Levels 41–50)
  'tr-41': {
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Lush tropical rainforest canopy treetops',
    caption: 'Upper Rainforest Canopy, Amazon',
    photographer: 'Sebastien Gabriel'
  },
  'tr-42': {
    imageUrl: 'https://images.unsplash.com/photo-1550853024-fae8dd4be47f?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550853024-fae8dd4be47f?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Scarlet macaw flying over green jungle',
    caption: 'Scarlet Macaw Sanctuary, Costa Rica',
    photographer: 'David Clode'
  },
  'tr-43': {
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Cascading Tegallalang rice terraces in Bali',
    caption: 'Tegallalang Emerald Terraces, Bali',
    photographer: 'Oliver Sjöström'
  },
  'tr-44': {
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Iguazu Falls cascading into tropical gorge',
    caption: 'Iguazu Cataracts of the Jungle',
    photographer: 'Agustin Diaz Gargiulo'
  },
  'tr-45': {
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Wild jaguar resting in Brazilian wetlands',
    caption: 'Jaguar Territory, Pantanal',
    photographer: 'Frida Lannerström'
  },
  'tr-46': {
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Misty hanging canopy trail through cloudforest',
    caption: 'Monteverde Cloudforest Mist, Costa Rica',
    photographer: 'Casey Horner'
  },
  'tr-47': {
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Winding jungle river under morning fog',
    caption: 'Meandering Waters of the Rio Negro',
    photographer: 'Sergey Pesterev'
  },
  'tr-48': {
    imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Ancient towering baobab trees along dirt road',
    caption: 'Avenue of the Baobabs, Madagascar',
    photographer: 'Louise Roos'
  },
  'tr-49': {
    imageUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Tropical blooming botanical flowers in Thai forest',
    caption: 'Deep Wilderness Heart of the Amazon',
    photographer: 'Mathew Schwartz'
  },
  'tr-50': {
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Sunbeams penetrating emerald canopy over tropical river',
    caption: 'BOSS ARENA: Heart of the Emerald Wild',
    photographer: 'Lukasz Szmigiel'
  },

  // World 6: American Discoveries (Levels 51–60)
  'am-51': {
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Central Park lake and Manhattan buildings',
    caption: 'Bow Bridge & Central Park, New York',
    photographer: 'Jermaine Ee'
  },
  'am-52': {
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Manhattan skyline across the East River',
    caption: 'Empire Metropolis Skyline, New York',
    photographer: 'Florian Wehde'
  },
  'am-53': {
    imageUrl: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Red canyon strata at Grand Canyon National Park',
    caption: 'South Rim Overlook, Grand Canyon',
    photographer: 'Alan Carrillo'
  },
  'am-54': {
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Grand Prismatic Spring turquoise thermal pool',
    caption: 'Grand Prismatic Spring, Yellowstone',
    photographer: 'Jonatan Pie'
  },
  'am-55': {
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Golden Gate Bridge emerging from ocean fog',
    caption: 'Golden Gate Bridge, San Francisco',
    photographer: 'Patrick Tomasso'
  },
  'am-56': {
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Sunlight filtering through giant Redwood forest',
    caption: 'Redwood National Park Giant Grove',
    photographer: 'Casey Horner'
  },
  'am-57': {
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Towering red sandstone walls along desert river canyon',
    caption: 'The Narrows, Zion National Park',
    photographer: 'Austin Neill'
  },
  'am-58': {
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Wrought iron balconies in historic New Orleans French Quarter',
    caption: 'Royal Street French Quarter, New Orleans',
    photographer: 'Stefan Rodriguez'
  },
  'am-59': {
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Snowy peak of Mount Denali across subarctic tundra',
    caption: 'Mount Denali Subarctic Wilderness, Alaska',
    photographer: 'Kalen Emsley'
  },
  'am-60': {
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Monument Valley sandstone buttes silhouetted against glowing sunset',
    caption: 'BOSS ARENA: Frontier of the Great West',
    photographer: 'Alex Azabache'
  },

  // World 7: Mountain Expeditions (Levels 61–70)
  'mt-61': {
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'The sharp pyramid ridge of the Matterhorn',
    caption: 'The Matterhorn Pyramid Peak, Zermatt',
    photographer: 'Kalen Emsley'
  },
  'mt-62': {
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Tibetan prayer flags against snowy peaks',
    caption: 'Himalayan Pass of Prayer Flags, Nepal',
    photographer: 'Christopher Burns'
  },
  'mt-63': {
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Mount Fitz Roy jagged granite spires in Patagonia',
    caption: 'Mount Fitz Roy Spire, Patagonia',
    photographer: 'Christopher Burns'
  },
  'mt-64': {
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'High mountain tents and granite peaks at Everest base camp',
    caption: 'Everest Khumbu Base Camp, Himalayas',
    photographer: 'Jerry Zhang'
  },
  'mt-65': {
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Massive glacial seracs and deep blue crevasse on Mont Blanc',
    caption: 'Mont Blanc Glacial Crevasses, Chamonix',
    photographer: 'Benjamin Davies'
  },
  'mt-66': {
    imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Lush green alpine meadows with wildflowers beneath jagged peaks',
    caption: 'High Alpine Edelweiss Pastures, Swiss Alps',
    photographer: 'Luca Bravo'
  },
  'mt-67': {
    imageUrl: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Tre Cime di Lavaredo limestone peaks glowing in alpenglow',
    caption: 'Tre Cime di Lavaredo, Italian Dolomites',
    photographer: 'Ales Krivec'
  },
  'mt-68': {
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Vast snowcapped peaks rising above barren mountain plateau',
    caption: 'The Roof of the World, Tibetan Plateau',
    photographer: 'Benjamin Davies'
  },
  'mt-69': {
    imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'High altitude mountaineer traversing summit knife-edge ridge',
    caption: 'The Death Zone Apex, Mount Everest',
    photographer: 'Toa Heftiba'
  },
  'mt-70': {
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Everest peak piercing dramatic storm clouds at sunset',
    caption: 'BOSS ARENA: The Peak of the World',
    photographer: 'Bailey Zindel'
  },

  // World 8: Ancient Civilizations (Levels 71–80)
  'anc-71': {
    imageUrl: 'https://images.unsplash.com/photo-1579606032834-deaff96c6e73?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579606032834-deaff96c6e73?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Ancient terraced brick ruins in Mesopotamia',
    caption: 'Hanging Gardens of Babylon Terraces',
    photographer: 'Federico Di Dio'
  },
  'anc-72': {
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'The Treasury facade carved into pink sandstone canyon in Petra',
    caption: 'Al-Khazneh (The Treasury), Petra Jordan',
    photographer: 'Mariana Proença'
  },
  'anc-73': {
    imageUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'El Castillo step pyramid at Chichen Itza',
    caption: 'Mayan Step Pyramid of Kukulcan',
    photographer: 'Filip Gielda'
  },
  'anc-74': {
    imageUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Temple of Apollo ruins on Mount Parnassus',
    caption: 'Sanctuary of the Delphic Oracle, Greece',
    photographer: 'Hert Niks'
  },
  'anc-75': {
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Lotus reflection pool before Angkor Wat towers',
    caption: 'Moats and Towers of Angkor Wat, Cambodia',
    photographer: 'Paul Szewczyk'
  },
  'anc-76': {
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Great Wall of China winding across misty mountain ridges',
    caption: 'The Silk Road Oasis Caravan Route',
    photographer: 'Hanson Lu'
  },
  'anc-77': {
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Machu Picchu stone citadel perched on cloud peak',
    caption: 'Lost Incan Citadel of Machu Picchu',
    photographer: 'Willian Justen de Vasconcellos'
  },
  'anc-78': {
    imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'The Parthenon marble columns against golden sunset',
    caption: 'The Parthenon on the Acropolis, Athens',
    photographer: 'Spencer Davis'
  },
  'anc-79': {
    imageUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Massive ancient stone pyramids of Teotihuacan in Mexico',
    caption: 'Sun Citadel of Teotihuacan, Mexico',
    photographer: 'Jezael Melgoza'
  },
  'anc-80': {
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Monumental ancient Roman Forum ruins under starry twilight',
    caption: 'BOSS ARENA: The Gate of Antiquity',
    photographer: 'Mauricio Artieda'
  },

  // World 9: Ocean & Island Worlds (Levels 81–90)
  'oc-81': {
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Overwater wooden bungalows on turquoise lagoon',
    caption: 'Bora Bora Coral Lagoon, French Polynesia',
    photographer: 'Sean Oulashin'
  },
  'oc-82': {
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Underwater coral reef teeming with tropical fish',
    caption: 'Great Barrier Reef Marine Park, Australia',
    photographer: 'Sebastian Pena Lambarri'
  },
  'oc-83': {
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'White cliffside houses and blue domes in Oia Santorini',
    caption: 'Santorini Sunset Caldera, Aegean Sea',
    photographer: 'Dimitris K'
  },
  'oc-84': {
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Giant marine iguana on volcanic black sand rocks',
    caption: 'Galapagos Volcanic Archipelago, Ecuador',
    photographer: 'Alex Azabache'
  },
  'oc-85': {
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Bioluminescent ocean waves sparkling electric blue at night',
    caption: 'Bioluminescent Shorelines of Fiji',
    photographer: 'Bailey Zindel'
  },
  'oc-86': {
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Juvenile coral nursery planted on shallow sandbar',
    caption: 'Maldives Marine Coral Restoration',
    photographer: 'Colin Watts'
  },
  'oc-87': {
    imageUrl: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Giant gentle whale shark gliding through sunlit clear blue water',
    caption: 'Whale Shark Oceanic Migration Route',
    photographer: 'Jeremy Bishop'
  },
  'oc-88': {
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Catamaran sailboat cruising through turquoise shallow ocean swells',
    caption: 'Caribbean Trade Wind Passage',
    photographer: 'Christoffer Engström'
  },
  'oc-89': {
    imageUrl: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Deep ocean abyss with shafts of light penetrating down',
    caption: 'Mariana Trench Deep Submersible Dive',
    photographer: 'Matt Hardy'
  },
  'oc-90': {
    imageUrl: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff563?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff563?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Towering volcanic ocean sea cliffs with crashing waves',
    caption: 'BOSS ARENA: Domain of the Leviathan',
    photographer: 'Silas Baisch'
  },

  // World 10: Cosmic Word Quest (Levels 91–100)
  'co-91': {
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Vibrant green northern lights dancing in Arctic night',
    caption: 'Aurora Borealis Geomagnetic Ribbons, Iceland',
    photographer: 'Jonatan Pie'
  },
  'co-92': {
    imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Full moon surface craters in dark space',
    caption: 'Lunar Craters of the Sea of Tranquility',
    photographer: 'Mike Petrucci'
  },
  'co-93': {
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Vibrant stellar nursery nebula glowing in pink and blue',
    caption: 'Stellar Nursery of the Orion Nebula',
    photographer: 'Vincent Guth'
  },
  'co-94': {
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Planetary ice rings orbiting Saturn in shadow',
    caption: 'Saturnian Ice Ring Arc, Outer Solar System',
    photographer: 'NASA / JPL'
  },
  'co-95': {
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Hubble Deep Field showing thousands of distant spiral galaxies',
    caption: 'Hubble Ultra Deep Field Galaxies',
    photographer: 'NASA / ESA'
  },
  'co-96': {
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Milky way arch over dark mountain horizon',
    caption: 'Milky Way Galactic Core Panorama',
    photographer: 'Greg Rakozy'
  },
  'co-97': {
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Astronomical observatory telescope looking into night sky',
    caption: 'Atacama Deep Sky Cosmic Observatory',
    photographer: 'Manuel Cosentino'
  },
  'co-98': {
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Supernova expanding shockwave ring in deep space',
    caption: 'Veil Nebula Supernova Shockwave Remnant',
    photographer: 'NASA / Unsplash'
  },
  'co-99': {
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Gravitational lensing around black hole event horizon',
    caption: 'Supermassive Singularity Event Horizon',
    photographer: 'Vincent Guth'
  },
  'co-100': {
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Magnificent spiral galaxy core glowing with billions of stars',
    caption: 'BOSS ARENA: The Master of the Cosmos',
    photographer: 'Graham Holtshausen'
  }
};

/**
 * Helper to retrieve level asset with guaranteed fallback.
 */
export function getLevelAsset(levelId: string): LevelAsset {
  if (LEVEL_ASSETS[levelId]) {
    return LEVEL_ASSETS[levelId];
  }
  // Safe default fallback
  return {
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=75',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=70',
    imageAlt: 'Scenic natural world landscape',
    caption: 'Uncharted Odyssey Chamber',
    photographer: 'World Odyssey Explorer'
  };
}
