export const locations = [
  {
    id: 'bagan-shweshigon',
    name: 'Bagan Shweshigon Pagoda',
    description: 'Ancient golden pagoda built in the 11th century, one of the most sacred Buddhist sites in Myanmar.',
    tagline: 'Where History Meets Spirituality',
    coordinates: [21.1717, 94.8585],
    thumbnail: 'https://images.unsplash.com/photo-1491840453392-a6d01c2fbed0',
    history: 'The Shwezigon Pagoda is one of the most important and sacred Buddhist stupas in Myanmar. It is located in Nyaung-U, near the ancient city of Bagan. The pagoda was first built during the reign of King Anawrahta in the 11th century. King Anawrahta, who ruled the Pagan Kingdom from 1044 to 1077, began the construction of the pagoda as part of his effort to promote Theravada Buddhism throughout his kingdom. However, the construction was not completed during his lifetime.After King Anawrahta passed away, his successor King Kyansittha continued the construction and finally completed the pagoda around the year 1102. The Shwezigon Pagoda then became one of the most significant religious monuments in Bagan and served as a prototype for many Burmese stupas built later across the country.The pagoda is famous for its large golden stupa, which is covered with gold leaf and stands on a series of circular terraces. Surrounding the main stupa are many smaller temples, shrines, and pavilions that contain images of the Buddha and other religious artifacts. One of the most important features of Shwezigon Pagoda is that it is believed to enshrine a sacred tooth and bone relic of the Buddha. Because of this, the pagoda has been a major pilgrimage site for Buddhists for centuries.In addition to its religious importance, the Shwezigon Pagoda also holds great historical and cultural significance. It represents the architectural style of early Bagan stupas and influenced the design of many later pagodas in Myanmar. The pagoda has survived earthquakes and centuries of history, and it has been restored multiple times to preserve its beauty and spiritual importance.Today, Shwezigon Pagoda remains one of the most visited and respected religious landmarks in Bagan. Pilgrims and tourists from around the world come to admire its golden structure, explore its surrounding temples, and experience the spiritual atmosphere of this historic Buddhist monument.',
    gallery: [
      'https://images.unsplash.com/photo-1491840453392-a6d01c2fbed0',
      'https://images.unsplash.com/photo-1548013146-72479768bada',
      'https://images.unsplash.com/photo-1563784462041-5f97ac9523dd',
      'https://images.unsplash.com/photo-1582719366852-e0c8c4b6e8e2'
    ],
    "tourStops": [
    {
      "id": "stop-1",
      "name": "The Great Chinthe Guardians",
      "description": "Two massive white mythical lions guarding the southern entrance path.",
      "coordinates": [21.1901, 94.8938],
      
      "narration": "Welcome to Shwezigon. You are standing before the Chinthe, the mythical lions that guard the entrance. Legend says the site for this pagoda was chosen by a white elephant carrying a Buddha relic; wherever it knelt, the pagoda was built."
    },
    {
      "id": "stop-2",
      "name": "The 37 Nat Shrine",
      "description": "A small hall housing the spirits of the 37 Nats, representing pre-Buddhist Burmese animism.",
      "coordinates": [21.1905, 94.8942],
      
      "narration": "In this small shed to the southeast, you'll find the 37 Nats. King Anawrahta famously allowed these traditional spirits to be worshipped here to help the local people transition to Theravada Buddhism, placing them at the feet of the Buddha."
    },
    {
      "id": "stop-3",
      "name": "The King's Reflection Pool",
      "description": "A tiny, water-filled hole in the stone pavement used to view the pagoda's reflection.",
      "coordinates": [21.1903, 94.8940],
      "narration": "Look for a small indentation in the stone floor filled with water. Ancient kings used this tiny pool to see the reflection of the Hti (the golden umbrella) at the very top of the stupa without straining their necks looking upward."
    },
    {
      "id": "stop-4",
      "name": "The Four Standing Buddhas",
      "description": "Four 13-foot bronze Buddhas located in pavilions at the cardinal points.",
      "coordinates": [21.1902, 94.8939],
     
      "narration": "At each of the four cardinal directions, you will find a massive bronze Buddha. These are the only four original bronze statues remaining from the Bagan era. Notice the 'Abhaya Mudra'—the gesture of fearlessness."
    },
    {
      "id": "stop-5",
      "name": "Kyanzittha’s Mon Inscriptions",
      "description": "Square stone pillars featuring ancient Mon language inscriptions.",
      "coordinates": [21.1904, 94.8941],
      
      "narration": "These stone pillars contain inscriptions by King Kyanzittha. They are invaluable to historians, detailing the religious and social life of the 11th century and the King’s efforts to finish this golden masterpiece."
    }
  ]
  },
  /*{
    id: 'shwedagon-pagoda',
    name: 'Shwedagon Pagoda',
    description: 'The most sacred Buddhist pagoda in Myanmar, covered in gold and adorned with thousands of diamonds.',
    tagline: 'Golden Wonder of Yangon',
    coordinates: [16.8661, 96.1951],
    thumbnail: 'https://images.unsplash.com/photo-1642689400316-87a5979928d8',
    history: 'The Shwedagon Pagoda, officially named Shwedagon Zedi Daw, also known as the Great Dagon Pagoda and the Golden Pagoda, is a gilded stupa located in Yangon, Myanmar.',
    gallery: [
      'https://images.unsplash.com/photo-1642689400316-87a5979928d8',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f',
      'https://images.unsplash.com/photo-1548013146-72479768bada'
    ],
    tourStops: [
      {
        id: 'stop-1',
        name: 'Southern Stairway',
        description: 'The main entrance featuring a bustling market of religious goods.',
        coordinates: [16.8655, 96.1951],
        image: 'https://images.unsplash.com/photo-1642689400316-87a5979928d8',
        narration: 'We begin at the Southern Stairway. As you ascend, you will pass numerous stalls selling flowers, incense, and gold leaf for offerings.'
      },
      {
        id: 'stop-2',
        name: 'The Main Stupa',
        description: 'The 99-meter tall golden core of the complex.',
        coordinates: [16.8661, 96.1951],
        image: 'https://images.unsplash.com/photo-1482859802302-6194b8b70b6b',
        narration: 'You are now facing the main stupa. It is covered with hundreds of gold plates and the crown is tipped with thousands of diamonds and rubies.'
      },
      {
        id: 'stop-3',
        name: 'Planetary Posts',
        description: 'Shrines corresponding to the days of the week.',
        coordinates: [16.8665, 96.1955],
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7',
        narration: 'Around the base are eight planetary posts. Devotees pour water over the Buddha images here corresponding to the day of the week they were born.'
      }
    ]
  }*/
 /* {
    id: 'inle-lake',
    name: 'Inle Lake',
    description: 'Serene freshwater lake famous for its floating gardens, stilt-house villages, and unique leg-rowing fishermen.',
    tagline: 'Tranquility on Water',
    coordinates: [20.3891, 97.3055],
    thumbnail: 'https://images.unsplash.com/photo-1697686119500-f5d417b853ae',
    history: 'Inle Lake is a freshwater lake located in the Nyaungshwe Township of Taunggyi District of Shan State, part of Shan Hills in Myanmar.',
    gallery: [
      'https://images.unsplash.com/photo-1697686119500-f5d417b853ae',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7',
      'https://images.unsplash.com/photo-1563784462041-5f97ac9523dd',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f'
    ],
    tourStops: [
      {
        id: 'stop-1',
        name: 'Nyaungshwe Pier',
        description: 'The bustling gateway to the lake where long-tail boats depart.',
        coordinates: [20.3900, 97.3000],
        image: 'https://images.unsplash.com/photo-1584400670558-a6ccbd6a741e',
        narration: 'Welcome to Nyaungshwe Pier, the main gateway to Inle Lake. From here, we board a traditional long-tail boat to explore the waters.'
      },
      {
        id: 'stop-2',
        name: 'Floating Gardens',
        description: 'Agricultural marvels built on floating masses of vegetation.',
        coordinates: [20.3850, 97.3100],
        image: 'https://images.unsplash.com/photo-1621332819988-b67e94d338ef',
        narration: 'We are now gliding past the floating gardens. The local Intha people cultivate tomatoes and other vegetables on these floating beds of water hyacinth and mud.'
      },
      {
        id: 'stop-3',
        name: 'Phaung Daw Oo Pagoda',
        description: 'The most highly revered monastery in the Inle Lake area.',
        coordinates: [20.3800, 97.3050],
        image: 'https://images.unsplash.com/photo-1697686119500-f5d417b853ae',
        narration: 'This is the Phaung Daw Oo Pagoda, housing five ancient Buddha images that have been covered in so much gold leaf they now look like solid gold spheres.'
      }
    ]
  },*/
 
  {
    id: 'ananda-temple',
    name: 'Ananda Temple',
    description: 'Known as the "Westminster Abbey of Burma," it is one of the most surviving masterpieces of Mon architecture.',
    tagline: 'The Eternal Masterpiece of Bagan',
    coordinates: [21.1708, 94.8677],
    thumbnail: 'https://images.unsplash.com/photo-1541097166014-9b5969512356',
    history: 'The Ananda Temple, located in the ancient city of Bagan in Myanmar, is one of the most famous and best-preserved temples of the Pagan Kingdom. It was built around 1105 AD during the reign of King Kyanzittha, one of the most powerful and respected kings of Bagan. The temple is considered a masterpiece of early Burmese architecture and represents a transition from Mon architectural influence to the distinctive Burmese temple style that later became common throughout the region.The temple was designed in the shape of a perfect cross with four long corridors extending toward the four cardinal directions. At the center of the temple stands four magnificent standing Buddha statues, each approximately 9.5 meters tall. These statues face north, south, east, and west, symbolizing the universal presence of the Buddha’s teachings. Two of the statues are believed to be original, while the others were reconstructed after damage over the centuries.Ananda Temple is also well known for its intricate stone carvings, terracotta plaques, and detailed murals that depict scenes from the life of the Buddha and stories from Buddhist scriptures. The temple’s white exterior walls and golden spire create a striking appearance, especially when illuminated by sunlight. Because of its architectural beauty, religious importance, and historical value, Ananda Temple is often referred to as the "Westminster Abbey of Bagan".Today, Ananda Temple remains one of the most important pilgrimage sites in Bagan. Both locals and international visitors come to admire its impressive design, peaceful atmosphere, and spiritual significance, making it one of the most iconic landmarks in Myanmars cultural heritage.',
    gallery: ['https://images.unsplash.com/photo-1541097166014-9b5969512356'],
    tourStops: [
      {
        id: 'stop-1',
        name: 'The Four Standing Buddhas',
        description: 'Teak wood statues representing the four Buddhas who have attained Nirvana.',
        coordinates: [21.1708, 94.8677],
        narration: 'As you enter, look up at the towering 31-foot gilded teak statues. Each faces a cardinal direction.'
      }
    ]
  },
  {
    id: 'shwesandaw-pagoda',
    name: 'Shwesandaw Pagoda',
    description: 'A circular pagoda containing five terraces that once allowed visitors to climb for sunset views.',
    tagline: 'The Sunset Terrace',
    coordinates: [21.1637, 94.8643],
    thumbnail: 'https://images.unsplash.com/photo-1512100356956-c1b473a96255',
    history: 'The Shwesandaw Pagoda, located in the ancient city of Bagan in Myanmar, was built in 1057 AD by King Anawrahta, the founder of the Pagan Kingdom. The pagoda was constructed to enshrine several sacred hairs of Gautama Buddha, which were brought from the kingdom of Thaton after King Anawrahta conquered it. Because of these sacred relics, the pagoda quickly became an important religious monument and a place of worship for Buddhists in the region.The structure of Shwesandaw Pagoda is distinctive for its five receding square terraces that rise to a cylindrical stupa at the top. These terraces were traditionally used by pilgrims and visitors to climb up and offer prayers while enjoying a panoramic view of the surrounding temples and plains of Bagan. The pagoda is also decorated with terracotta plaques that illustrate scenes from the Jataka tales, which describe the previous lives of the Buddha.Throughout history, the pagoda has experienced damage from earthquakes, which are common in the Bagan region. However, it has been restored several times to preserve its historical and religious significance. For many years, Shwesandaw Pagoda was one of the most popular locations in Bagan for watching sunrise and sunset because of its elevated terraces and clear view over thousands of ancient templesToday, Shwesandaw Pagoda remains an important cultural and historical landmark of Bagan. Although climbing the terraces is now restricted to protect the structure, the pagoda continues to attract pilgrims, historians, and tourists who come to admire its architecture and learn about its role in the early spread of Theravada Buddhism in Myanmar.',
    tourStops: [
      {
        id: 'stop-1',
        name: 'The Five Terraces',
        description: 'Steep stairways leading to the upper stupa levels.',
        coordinates: [21.1637, 94.8643],
        narration: 'The terraces symbolize the different levels of Buddhist cosmology.'
      }
    ]
  },
  {
    id: 'dhammayangyi-temple',
    name: 'Dhammayangyi Temple',
    description: 'The largest temple in Bagan, famous for its mysterious brickwork and haunting history.',
    tagline: 'The Massive Fortress of Faith',
    coordinates: [21.1620, 94.8729],
    thumbnail: 'https://images.unsplash.com/photo-1582719366852-e0c8c4b6e8e2',
    history: 'The Dhammayangyi Temple, located in the ancient city of Bagan in Myanmar, was built around 1170 AD by King Narathu, one of the rulers of the Pagan Kingdom. It is the largest temple in Bagan and is well known for its massive brick structure and impressive architectural scale. King Narathu ordered the construction of the temple after he came to power, and many historians believe it was built as an act of religious merit to atone for the violent acts he committed, including the assassination of his own father and brother to seize the throne.The temple is famous for the extraordinary precision of its brickwork. According to local legend, the king demanded perfection from the builders and is said to have executed bricklayers if a needle could fit between the bricks they placed. As a result, the brickwork of Dhammayangyi Temple is considered some of the finest and tightest masonry in all of Bagan. The temple was designed with a pyramid-like structure and thick walls, giving it a fortress-like appearance compared to other temples in the region.Although the temple was intended to be a grand religious monument, construction was never fully completed. Historical records suggest that King Narathu was assassinated before the temple could be finished, which left some inner corridors and chambers sealed or unfinished. Despite this, the temple remains one of the most remarkable structures in Bagan.Today, Dhammayangyi Temple stands as a powerful symbol of Bagan’s architectural achievement and historical legends. Visitors are drawn to its mysterious history, enormous size, and the incredible craftsmanship of its brick construction, making it one of the most fascinating landmarks among the thousands of temples scattered across the Bagan plains.',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Interior Corridors',
        description: 'Massive brick hallways with interlocking stone supports.',
        coordinates: [21.1620, 94.8729],
        narration: 'Observe the precision of the bricklaying; it remains the finest example of masonry in all of Myanmar.'
      }
    ]
  },
  {
    id: 'sulamani-temple',
    name: 'Sulamani Temple',
    description: 'A sophisticated multi-story temple known for its delicate stucco and interior frescoes.',
    tagline: 'The Crowning Jewel',
    coordinates: [21.1649, 94.8814],
    history: 'The Sulamani Temple, located in the ancient city of Bagan in Myanmar, was built in 1183 AD during the reign of King Narapatisithu, one of the most influential rulers of the Pagan Kingdom. The temple is considered one of the finest architectural achievements of the Late Bagan period and reflects the advanced artistic and structural techniques developed during that time.Sulamani Temple was constructed using red brick and is designed as a two-story structure with elegant terraces and a central tower that rises above the surrounding plains of Bagan. The temple is well known for its balanced proportions, symmetrical design, and detailed decorative elements. Inside the temple, visitors can find beautifully preserved mural paintings, stucco carvings, and Buddha images that illustrate important scenes from Buddhist teachings and the life of the Buddha.The name “Sulamani” is believed to mean “Crown Jewel,” reflecting the temple’s importance and beauty. Historical records suggest that the king built the temple at the location where a sacred ruby dropped from the sky, making the site spiritually significant. Because of its artistic richness and historical value, the temple is often regarded as one of the most impressive monuments from the later period of Bagan architecture.Although the temple has suffered damage from earthquakes over the centuries, restoration efforts have helped preserve much of its structure and artwork. Today, Sulamani Temple remains an important religious and cultural landmark in Bagan, attracting visitors who come to admire its remarkable architecture, ancient murals, and peaceful atmosphere.',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Fresco Walkway',
        description: 'Walls covered in 18th-century paintings depicting Buddhist lore.',
        coordinates: [21.1649, 94.8814],
        narration: 'While the temple is old, these paintings were added centuries later, showing the site’s long-term importance.'
      }
    ]
  },
  {
    id: 'thatbyinnyu-temple',
    name: 'Thatbyinnyu Temple',
    description: 'At 61 meters, it is the tallest monument in the Bagan Archaeological Zone.',
    tagline: 'The Temple of Omniscience',
    coordinates: [21.1688, 94.8631],
    history: 'Constructed in 1144 by King Alaungsithu, its name refers to the omniscience of the Buddha.',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Upper Terrace View',
        description: 'Vantage point overlooking the nearby Ananda Temple.',
        coordinates: [21.1688, 94.8631],
        narration: 'From this height, you can truly appreciate the density of the 2,000+ temples surrounding you.'
      }
    ]
  },
  {
    id: 'dhammayazika-pagoda',
    name: 'Dhammayazika Pagoda',
    description: 'A unique circular pagoda with a pentagonal base and three receding terraces.',
    tagline: 'The Gilded Pentagram',
    coordinates: [21.1472, 94.8856],
    history: 'Built in 1196 by King Narapatisithu, it is notable for having five sides instead of the traditional four.',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Pentagonal Base',
        description: 'Five small temples surrounding the main stupa, each housing a Buddha image.',
        coordinates: [21.1472, 94.8856],
        narration: 'Unlike most pagodas which honor four Buddhas, this one includes a shrine for the future Buddha, Metteyya.'
      }
    ]
  },
  {
    id: 'tayoke-pyay-temple',
    name: 'Tayoke Pyay Temple',
    description: 'A large two-story temple located in the Minnanthu village area.',
    tagline: 'The Flight of the Invaders',
    coordinates: [21.1610, 94.8847],
    history: 'Built by King Narathihapate, known as the "king who fled from the Chinese" (Tayoke Pyay).',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Stucco Reliefs',
        description: 'Detailed exterior carvings that have survived centuries of weather.',
        coordinates: [21.1610, 94.8847],
        narration: 'Look closely at the window pediments to see the intricate mythical creatures carved into the plaster.'
      }
    ]
  },
  {
    id: 'pyatthatgyi-temple',
    name: 'Pyatthatgyi Temple',
    description: 'One of the last great monasteries built in Bagan, known for its massive vaulted hall.',
    tagline: 'The Hall of Sunset',
    coordinates: [21.1578, 94.8825],
    history: 'An example of the "Double-cave" style temple, built in the 13th century during the reign of King Kyaswa.',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Open Terrace',
        description: 'A wide, flat roof area used for viewing the plains.',
        coordinates: [21.1578, 94.8825],
        narration: 'This is one of the best places to feel the scale of the monk libraries and corridors.'
      }
    ]
  },
  {
    id: 'thandawgya-buddha',
    name: 'Thandawgya Buddha',
    description: 'A massive seated stone Buddha image housed in a smaller brick structure.',
    tagline: 'The Stone Giant',
    coordinates: [21.1711, 94.8612],
    history: 'Built by King Narathihapate in 1284. The name translates to "Within Earshot of the King."',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Main Image',
        description: 'An 18-foot tall image made of sandstone blocks.',
        coordinates: [21.1711, 94.8612],
        narration: 'Notice how the statue is built of stone blocks rather than the more common brick-and-stucco.'
      }
    ]
  },
  {
    id: 'thanbula-temple',
    name: 'Thanbula Temple',
    description: 'A bright, airy temple named after the Queen who commissioned it.',
    tagline: 'The Queen’s Prayer',
    coordinates: [21.1595, 94.8858],
    history: 'Built in 1255 by Queen Thanbula. It is famous for its interior lighting and mural paintings.',
    tourStops: [
      {
        id: 'stop-1',
        name: 'Queen’s Murals',
        description: 'Delicate paintings depicting the 28 Buddhas.',
        coordinates: [21.1595, 94.8858],
        narration: 'Unlike the dark halls of Dhammayangyi, this temple was designed to let in natural light to illuminate the art.'
      }
    ]
  }

  
];