// Disclaimer - This data is collected from Amazon.com manually and it is intended to be used for learning purposes only.

// Dummy Data for E-commerce App with Images, Filters and Reviews
// categories an Object of Objects containing the categories
// and the products Array of Objects containing the products
// Total Categories: 6
// Total Products: (4 * 10) + (2 * 5) = 50

// Contributed by Shubham Lingayat : https://seebham.codes https://twitter.com/seebham

const structureOfCategoryData = [
  // Category 1
  {
    title: "", // title of category,
    keywords: [], // keywords of category,
    filters: [], // array of filter objects for the category
  },
  {}, // Category 2 ...
];

// Structure of filter array
const filtersStructure = {
  // Filter 1
  filterName: {
    filterName: "", // title of filter
    filterList: ["", ""], // array of filter values of type String
  },
  filter2: {}, // Filter 2 ...
};

// Structure of product array
const productsStructure = [
  // Product 1
  {
    filter1: "", // filter1 value
    filter2: "", // filter2 value
    title: "", // title of product
    category: "", // category of product
    price: 1, // price of product in INR
    imgs: ["", ""], // array of images of product
    specs: ["", ""], // Array or String of specs of product -> If Array, then render as list else if String, then render as single line
    inStock: 20, // quantity in stock of product -> If 0, then hide from the store, or less than 10, then show a "Very few left" or play with this value
    eta: 20, // estimated time of arrival of product in mins
    id: "", // unique id of product
    rating: 0.0, // rating of product
  },
];

// Actual Data
const categories = {
  Mobiles: {
    title: "Mobiles",
    keywords: [],
    filters: {
      Brand: {
        filterName: "Brand",
        filterList: [
          "Apple",
          "Samsung",
          "Redmi",
          "Jio",
          "OnePlus",
          "Realme",
          "Oppo",
          "Vivo",
          "Mi",
        ],
      },
      RAM: {
        filterName: "RAM",
        filterList: ["4 MB", "2 GB", "4 GB", "6 GB", "8 GB"],
      },
    },
  },
  Books: {
    title: "Books",
    keywords: "",
    filters: {
      Language: {
        filterName: "Language",
        filterList: ["English", "Hindi", "Marathi"],
      },
      Genre: {
        filterName: "Genre",
        filterList: ["Fiction", "Historical", "Mystery", "Romance", "Poetry"],
      },
    },
  },
  Clothings: {
    title: "Clothings",
    keywords: "",
    filters: {
      For: {
        filterName: "For",
        filterList: ["Kids", "Men", "Women"],
      },
    },
  },
  Beauty: {
    title: "Beauty",
    keywords: "",
    filters: {
      Type: {
        filterName: "Type",
        filterList: [
          "Bath and Body",
          "Fragrance",
          "Skin Care",
          "Hair Care",
          "Makeup",
        ],
      },
    },
  },
  Furniture: {
    title: "Furniture",
    keywords: "",
    filters: {
      Type: {
        filterName: "Type",
        filterList: ["Office Chair", "Desk", "Beds", "Sofas", "Wardrobes"],
      },
    },
  },
  Laptops: {
    title: "Laptops",
    keywords: "",
    filters: {
      For: {
        filterName: "For",
        filterList: [
          "Students",
          "Travel",
          "Coding",
          "Gaming",
          "Content Creation",
        ],
      },
      Brand: {
        filterName: "Brand",
        filterList: ["Acer", "Dell", "HP", "Lenovo", "Asus", "Apple"],
      },
      RAM: {
        filterName: "RAM",
        filterList: ["4 GB", "8 GB", "16 GB", "32 GB", "64 GB"],
      },
      Processor: {
        filterName: "Processor",
        filterList: ["Intel", "AMD"],
      },
      DisplaySize: {
        filterName: "Display Size",
        filterList: ["14", "15.6", "16"],
      },
      HasSSD: {
        filterName: "Has SSD?",
        filterList: ["Yes", "No"],
      },
    },
  },
};

// Products
const products = [
  {
    Brand: "Redmi",
    RAM: "2 GB", // filters
    title: "Redmi 9A (Nature Green, 2GB RAM, 32GB Storage)",
    category: "Mobiles",
    price: 6999,
    imgs: [
      "/data/images/redmi9A1.jpg",
      "/data/images/redmi9A2.jpg",
    ],
    specs: [
      // Always check whether this is Array or String, if Array -> Bulleded List else if String -> Para
      "13MP rear camera with AI portrait, AI scene recognition, HDR, pro mode | 5MP front camera.",
      "16.58 centimeters (6.53 inch) HD+ multi-touch capacitive touchscreen with 1600 x 720 pixels resolution, 268 ppi pixel density and 20:9 aspect ratio",
      "Memory, Storage & SIM: 2GB RAM, 32GB internal memory expandable up to 512GB | Dual SIM (nano+nano) + Dedicated SD card slot",
      "Android v10 operating system with upto 2.0GHz clock speed Mediatek Helio G25 octa core processor",
      "5000mAH lithium-polymer large battery with 10W wired charger in-box",
    ],
    inStock: 40, // if less than 10, then display "Only {9} left!", else don't show anything.
    eta: 30, // in mins
    id: "m1",
    rating: 4.2,
    reviews: [
      {
        name: "Shubham",
        title: "Don't buy this phone",
        content: `Both 13 MP and 5MP Camera quality is good. Have lot of pre installed apps. 
          But can be uninstalled if not required. Overall good performance . I am using Asus zenfone max and according to me far better than Asus except Camera quality. It comes in 5000 mah battery and one can't get a better option at this price range. Go for it. It's really goodAfter one week useEdit:- please don't buy this phone. It hangs a lot and sometimes there is problem in touch screen.`,
        rating: 1,
      },
      {
        name: "Swanand",
        title: "One of the good choice for low budget phone",
        content: `If you are looking for low budget phone this can be a good choice for you.
        If you wanna android phone just for day to day work then it's really good.
        On playing heavy games it will hange obviously. Camera is fine at this range. When you start your new device it take some time but later it will work smoothly.
        Phone is light weight with a good look`,
        rating: "4",
      },
      {
        name: "Sanskar",
        title:
          "Simply excellent. Read complete review written after my 30 days of experience",
        content: `Excellent mobile for daily use @7500/-. Don't belive in negative reviews at all. If course the product parts made in China, entire assembly, software all are of India. Even this mobile have no bloat ware or Chinese apps and it's 3gb variant is excellent and black colour looks great.
          Camera is good at it's price range and has autofocus and AI potrait feature.
          Regarding battery is really huge and with normal daily usage it lasts for about 24 hrs as of my experience. With heavy usage and gaming it lasts for 7-10 hrs.
          Regarding gaming, since it has gaming processor helio G25 (equal to Snapdragon 625), and it's hyperdrive technology, no lag in gaming and better network connectivity makes games more aweful.`,
        rating: "5",
      },
    ],
  },
  {
    Brand: "Samsung",
    RAM: "6 GB",
    title: "Samsung Galaxy M31 (Ocean Blue, 6GB RAM, 128GB Storage)",
    category: "Mobiles",
    price: 14999,
    imgs: [
      "/data/images/SamsungM311.jpg",
      "/data/images/SamsungM312.jpg",
    ],
    specs: [
      "Quad Camera Setup - 64MP (F1.8) Main Camera +8MP (F2.2) Ultra Wide Camera +5MP(F2.2) Depth Camera +5MP(F2.4) Macro Camera and 32MP (F2.0) front facing Camera",
      "6.4-inch(16.21 centimeters) Super Amoled - Infinity U Cut Display , FHD+ Resolution (2340 x 1080) , 404 ppi pixel density and 16M color support",
      "Android v10.0 operating system with 2.3GHz + 1.7GHz Exynos 9611 Octa core processor , 6GB RAM, 128GB internal memory expandable up to 512GB and dual SIM",
      "6000 mAh Battery",
    ],
    inStock: 50,
    eta: 20,
    id: "m2",
    rating: 4.7,
    reviews: [
      {
        name: "Rohit",
        title: "Best mobile in buget",
        content: "I higely recoomend this mobile",
        rating: 5,
      },
      {
        name: "Doraemon",
        title: "Value for money",
        content:
          "Really a good budget phone with big battery. Camera performance also awesome, but in pro mode there no control for shutter speed and while changing the iso i don't feel any differences. I need more update on camera modes. Phone performance and charging speed is good. Except camera modes i love this phone.",
        rating: 4,
      },
      {
        name: "Nobita",
        title: "Best in the market with this price range",
        content:
          "A Descent phone Definitely not for pro pubg player but can work fine Super amoled gives it best performance Descent camera Improved Selfie camera compared to M30 Long battery life Nice Security No ads unlike MI Works smoothly",
        rating: 5,
      },
    ],
  },
  {
    popular: true,
    Brand: "Apple",
    RAM: "6 GB",
    title: "Apple iPhone 12 Pro Max (128GB)",
    category: "Mobiles",
    price: 119999,
    imgs: [
      "/data/images/iphone12M1.jpg",
      "/data/images/iphone12M2.jpg",
    ],
    specs: [
      "6.7-inch (17 cm diagonal) Super Retina XDR display",
      "Ceramic Shield, tougher than any smartphone glass",
      "A14 Bionic chip, the fastest chip ever in a smartphone",
      "Pro camera system with 12MP Ultra Wide, Wide and Telephoto cameras; 5x optical zoom range; Night mode, Deep Fusion, Smart HDR 3, Apple ProRAW, 4K Dolby Vision HDR recording",
    ],
    inStock: 1,
    eta: 5,
    id: "m3",
    rating: 4.3,
    reviews: [
      {
        name: "Johhny S",
        title: "This took one of my kidneys. But worth it",
        content:
          "Impressed! I’ve tested it with iphone11 and other iphones, it’s remarkable. It has unquestionably better video quality and touch sensitivity. The screen is bigger than I thought. I loved the Gold variant. But if u have a 11 max or a X max I wouldn’t suggest for an upgradation. I feel that the next iphone will have way more cooler features so wouldn’t hurt to wait. My previous iphone was 6, so in my case am totally peachy with this phone. Though it has a ceramic glass wouldn’t hurt to buy a screen guard. If u can afford it u can totally go 4 it.",
        rating: 5,
      },
      {
        name: "Arjun",
        title: "The best iPhone in 2020. Phone of the year.",
        content:
          "This is the best iPhone yes. The Max model gives you the better screen and overall is a camera beast. I would highly recommend this to anyone. Regarding value for money, its sad that we live in a country where Falling Rupee, Import Duty and High GST are the reasons for such high poricing. A rich country like USA pays only $1099 (Rs. 81,500) whereas its priced a whopping Rs. 48,400 more in India. Thats slmost 60% more. Shame!",
        rating: "5",
      },
      {
        name: "Sahith",
        title: "Best & Biggest iPhone i ever owned 🥰",
        content:
          "Just no words, what a beauty. Upgrading from iPhone X, this feels so big and heavy. But do not has much discomfort while using, you will get used to it.Make sure to get a decent Screen guard and clear case just to safeguard this beauty.",
        rating: "4",
      },
    ],
  },
  {
    Brand: "OnePlus",
    RAM: "8 GB",
    title: "OnePlus Nord CE 5G (Charcoal Ink, 8GB RAM, 128GB Storage)",
    category: "Mobiles",
    price: 24999,
    imgs: [
      "/data/images/oneplusN1.jpg",
      "/data/images/oneplusN2.jpg",
    ],
    specs: [
      "64MP+8MP+2MP triple rear camera with 1080p video at 30/60 fps, 4k 30 fps | 16MP front camera with 1080p video at 30/60 fps",
      "6.43-inch, 90Hz fluid AMOLED display with 2400 x 1080 pixels resolution | 410ppi",
      "Memory, Storage & SIM: 8GB RAM | 128GB internal memory on UFS 2.1 storage system",
      "Dual SIM (nano + nano) | OnePlus Nord CE currently supports dual 4G SIM Cards or a single 5G SIM + 4G SIM",
    ],
    inStock: 5,
    eta: 10,
    id: "m4",
    rating: 4.9,
    reviews: [
      {
        name: "Bakwas",
        title: "Bakwas phone",
        content: "Bakwas phone",
        rating: 1,
      },
      {
        name: "Vikas",
        title: "Good overall",
        content: `The best part of the phone is it's super simple and user friendly operating system. Camera doesn't oversaturate colours and captures decent photos. Battery charging is super fast. People argue that this is overpriced in this segment but I guess ease of using the phone and mainly the OS wouldn't be so good in other comparable phones. It is super light and handy.
  
        Edit: taking away 1 star from the review after a month's usage.
        Phone app lags all the time. Phone starts ringing when I receive a call while the name of caller appears 5 seconds later. This is very annoying. Similar issue while calling. Hope some software update fixes this issue.`,
        rating: "4",
      },
      {
        name: "Smooth John",
        title: "Smooth user experience",
        content:
          "Very nice Phone with really nice features! I didn't even know I needed a phone but it is so good ",
        rating: "5",
      },
    ],
  },
  {
    Brand: "Jio",
    RAM: "4 MB",
    title: "Jio Phone 3 (Black, 4 MB RAM, 4GB Storage)",
    category: "Mobiles",
    price: 1999,
    imgs: [
      "/data/images/jioPhone1.jpg",
      "/data/images/jioPhone2.jpg",
    ],
    specs: [
      "2MP rear and 0.3MP front camera",
      "Internal Storage 4GB",
      "1500mAh battery",
      "Access to Jio apps 1 cr+ songs with JioMusic, 6000+ movies with JioCinema",
    ],
    inStock: 50,
    eta: 2,
    id: "m5",
    rating: 3.5,
    reviews: [
      {
        name: "BabaKun",
        title: "Good for My Dad",
        content:
          "Like really I was looking for a phone in which I can be always connected with my family but they didn't want a smartphone. So really good for filling the niche",
        rating: 4,
      },
      {
        name: "Ambani",
        title: "Buy This",
        content: "Very good Must Buy!",
        rating: 5,
      },
      {
        name: "Average Consumer",
        title: "Ok",
        content: "ok for like daily use but not much",
        rating: 3,
      },
    ],
  },
  {
    Brand: "Realme",
    RAM: "6 GB",
    title: "realme narzo 30 (Racing Blue, 6GB RAM, 128GB Storage)",
    category: "Mobiles",
    price: 14999,
    imgs: [
      "/data/images/realmeNazro1.jpg",
      "/data/images/realmeNazro2.jpg",
    ],
    specs: [
      "6 GB RAM | 128 GB ROM | Expandable Upto 256 GB",
      "16.51 cm (6.5 inch) Full HD+ Display",
      "48MP + 2MP + 2MP | 16MP Front Camera",
      "5000 mAh Battery",
      "MediaTek Helio G95 Processor",
    ],
    inStock: 20,
    eta: 30,
    id: "m6",
    rating: 4,
    reviews: [
      {
        name: "Navin Kumar",
        title: "Amazing Product",
        content:
          "Like really I was looking for a phone in which I can be always connected with my family but they didn't want a smartphone. So really good for filling the nicheAll the things are nice. Only macro camera is not powerful. Good product go for it. Gorgeous. And the charger is also very heavy.",
        rating: 5,
      },
      {
        name: "Manish",
        title: "THE PROCESSING POWER IS PHENOMENAL HELIO G95 IS A BEAST",
        content:
          "Overall a good phone camera performance is decent enough in this price point the front camera though does a great job because of sony imx471 sensor ultrawide on the back would be great the macro and b/w sensor is not that useful battery life is good for an average user iam getting a screen on time of about 45-50 minutes using 10% battery so it can give you about 8-9 hours of screen time daily the charging is powerful and charges quickly In short its a gaming phone The antutu score os this device is around 350k which is greater than redmi note 10 pro max score of 300k",
        rating: 4,
      },
    ],
  },
  {
    Brand: "Oppo",
    RAM: "4 GB",
    title: "OPPO A54 (Starry Blue, 4GB RAM, 128GB Storage)",
    category: "Mobiles",
    price: 15490,
    imgs: [
      "/data/images/oppophone1.jpg",
      "/data/images/oppophone2.jpg",
    ],
    specs: [
      "6.51' Inch (16.5cm) HD+ Puch-hole Display with 1600x720 pixels. Larger screen to body ratio of 89.2%.|Side Fingerprint Sensor.",
      "MediaTek Helio P35 GPU IMG GE8320 @ 680 MHz| Powerful 2.3 GHz Octa-core processor, support LPDDR4X memory",
      "13MP Quad Camera ( 13MP Main + 2MP Macro + 2MP Bokeh Lens) | 16MP Front Camera.",
      "5000 mAh lithium polymer battery",
      "Memory, Storage & SIM: 4GB RAM | 128GB internal memory expandable up to 256GB | Dual SIM (nano+nano) dual-standby (4G+4G).| Color OS 7.2 based on Android 10.0 operating system.",
    ],
    inStock: 2,
    eta: 15,
    id: "m7",
    rating: 4.2,
    reviews: [
      {
        name: "Alwin",
        title: "Good Phone",
        content: "Good phone working fine good battery thanks",
        rating: 5,
      },
      {
        name: "Ankita",
        title: "Extremely slow.",
        content:
          "Okay so this product is not expensive, affordable and very beautiful, this is only good thing about it. Phone freezes a lot and when someone calls, it keeps vibrating without showing any number on the screen. I bought this phone in may 2021. And this is July 2021. I hate this phone already",
        rating: 2,
      },
    ],
  },
  {
    Brand: "Vivo",
    RAM: "8 GB",
    title: "Vivo S1 Pro (Jazzy Blue, 8GB RAM, 128GB Storage)",
    category: "Mobiles",
    price: 29999,
    imgs: [
      "/data/images/vivo1.jpg",
    ],
    specs: [
      "48+8+2+2MP rear camera | 32MP front camera Front camera",
      "Memory, Storage & SIM: 8GB RAM, 128GB internal memory | Dual SIM (nano+nano) dual-standby (4G+4G)",
      "Android v9 based on OS 9.1 operating system with Qualcomm Snapdragon 665AIE octa core processor",
      "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
      "In display fingerprint",
    ],
    inStock: 0,
    eta: 50,
    id: "m8",
    rating: 5,
    reviews: [
      {
        name: "Blaze",
        title: "Fast and great deal",
        content: "Thanks, please manufacture more",
        rating: 5,
      },
    ],
  },
  {
    Brand: "Mi",
    RAM: "8 GB",
    title: "Mi 11X 5G Cosmic Black 8GB RAM 128GB ROM",
    category: "Mobiles",
    price: 31999,
    imgs: [
      "/data/images/miphone1.jpg",
    ],
    specs: [
      "Processor: Qualcomm Snapdragon 870 5G with Kryo 585 Octa-core; 7nm process; Up to 3.2GHz clock speed; Liquidcool technology",
      "Camera: 48 MP Triple Rear camera with 8MP Ultra-wide and 5MP Super macro | 20 MP Front camera",
      "Display: 120Hz high refresh rate FHD+ (1080x2400) AMOLED Dot display; 16.9 centimeters (6.67 inch); 2.76mm ultra tiny punch hole; HDR 10+ support; 360Hz touch sampling, MEMC technology",
      "Battery: 4520 mAH large battery with 33W fast charger in-box and Type-C connectivity",
      "Hands-Free access to Alexa: Alexa on your phone lets you make phone calls, open apps, control smart home devices, access the library of Alexa skills, and more using just your voice while on-the-go. Download the Alexa app and complete hands-free setup to get started. Just ask - and Alexa will respond instantly",
    ],
    inStock: 8,
    eta: 50,
    id: "m9",
    rating: 4,
    reviews: [
      {
        name: "Nitea Ghosh",
        title: "Waste of money",
        content:
          "Very bad experience, i am going to return it, i am facing touch issue very much",
        rating: 1,
      },
    ],
  },
  {
    Brand: "Apple",
    RAM: "6 GB",
    title: "Apple iPhone XR (64GB) - White",
    category: "Mobiles",
    price: 41999,
    imgs: [
      "/data/images/iphonXR1.jpg",
      "/data/images/iphonXR2.jpg",
    ],
    specs: [
      "6.1-inch (15.5 cm diagonal) Liquid Retina HD LCD display",
      "Water and dust resistant (1 meter for up to 30 minutes, IP67)",
      "Single 12MP Wide camera with Portrait mode, Portrait Lighting, Depth Control, Smart HDR, and 4K video up to 60fps",
      "7MP TrueDepth front camera system with Portrait mode, Portrait Lighting, Depth Control, and 1080p video",
      "Face ID for secure authentication",
      "A12 Bionic with second-generation Neural Engine",
    ],
    inStock: 8,
    eta: 20,
    id: "m10",
    rating: 4.5,
    reviews: [
      {
        name: "Darshan Sanghvi",
        title: "Fabulous!",
        content:
          "Thanks, the device was received well packed and before time! The device is fabulous, it's like love at first sight! It doesn't feel like a 2018 device, the speed, the sensors, the touch is pretty amazing! A12 Bionic works well! 3GB RAM is sufficient to run the phone, COD, BGMI and NFS can be played without lag. Face ID is fast and accurate to unlock the device in dark! In low to moderate usage, battery supports 30+ hours and in heavy usage, battery supports 20+ hours. This one doesn't have Adapter and Earphones, but you can buy them separately! Bought for 43K (128GB) during Prime Day Sale! Overall a value for money device! A good device to start if you’re moving to Apple from Android or upgrading from previous generation iPhones. Thank You Apple!",
        rating: 5,
      },
      {
        name: "Sushma",
        title: "Economical Phone",
        content:
          "The phone is not lacking in any sphere. The halmark quality of iPhone is telltale. The size is very handy and convenient. Charging cord is working only on one side like USB cord but then, the charging is very fast. Battery is very long lasting, better than 6000 mah batteries of Android. Picture quality better than so called 4 camera android. Go for it without a second thought. Charger not provided in the box, is freely available outside. Must buy a good bluetooth headset also to enjoy the phone.",
        rating: 5,
      },
    ],
  },
  {
    popular: true,
    Language: "English",
    Genre: "Fiction",
    title: "The Monk Who Sold His Ferrari",
    category: "Books",
    price: 159,
    imgs: [
      "/data/images/monksoldhisferrari.jpg",
    ],
    specs:
      "A renowned inspirational fiction, The Monk Who Sold His Ferrari is a revealing story that offers the readers a simple yet profound way to live life. The plot of this story revolves around Julian Mantle, a lawyer who has made his fortune and name in the profession. A sudden heart-attack creates havoc in the successful lawyer’s life. Jolted by the sudden onset of the illness, his practice comes to a standstill. He ponders over material success being worth it all, renounces all of it and leaves for India.",
    inStock: 50,
    eta: 5,
    id: "b1",
    rating: 4.0,
    reviews: [
      {
        name: "Takumi",
        title: "I sold my ae86 after this",
        content:
          "Very nice thriller story It inspired me to sell my car like the monk.",
        rating: 5,
      },
      {
        name: "Om",
        title: "My kids liked It",
        content:
          "Was fine as my kids liked it thats all it matters ultimately, however i would say its a little overpriced for its quality and",
        rating: 3,
      },
      {
        name: "Shyam",
        title: "Very nice read",
        content: "I thourougly enjoyed the content of this",
        rating: 4,
      },
    ],
  },
  {
    Language: "English",
    Genre: "Historical",
    title: "The Immortals of Meluha (Shiva Trilogy)",
    category: "Books",
    price: 299,
    imgs: [
      "/data/images/meluha.jpg",
    ],
    specs:
      "The Immortals of Meluha is a series of short stories by the Indian author, K. S. Shukla, that tell the story of the Immortals of Meluha, who are the most powerful and powerful figures in the history of the Indian subcontinent.",
    inStock: 50,
    eta: 5,
    id: "b2",
    rating: 4.1,
    reviews: [
      {
        name: "Himanshu",
        title: "Amazing",
        content: `We'll I'm not a great critic but here's my honest review about what I felt after reading this book.
        At first I was hesitant to buy the book thinking that it would contain the same unbelievable fictional aspects where the gods can fly and cure the incurable diseases by their touch. I was blown away by the simplicity of the protagonist. He didn't have any powers, instead he had the skill and intelligence which led to his rise to become a Mahadev.
        The story is well narrated with twists and turns of comedy, drama, rage and emotions which leaves you hooked till you read the last chapter and then, the other two books. The characters are well developed making you feel their pain and happiness.
        10/10`,
        rating: 4,
      },
      {
        name: "Divyani",
        title: "Too much like a dramatic Script of a TV show",
        content: `I got this thanks to its popularity but unfortunately its a little too dramatic for me, it reads like a script for a Zee TV show which I don't watch but know about thanks to some family members fascinations.......
        There is no character development, poor scripting, no historical research has gone into this I can presume since their are facts that don't match with what's written along with others........
        Also Lord Shiva is not an angry God but when he will get angry its the end or so say the Purans but Lord Shiva is perpetually angry in this book, vendetta is raging in his veins, revenge is his middle name and for what......`,
        rating: 1,
      },
      {
        name: "Vaishnavi",
        title: "Could have been better",
        content:
          "Mediocre writing at best. Hindu mythology is quite rich and author benifits from choosing it. Besides one trick of imputing a benign, logical rationale (which i can hope were the case in reality) to hindu customs, the author doesnt have much to write about. Its feels like just another hero's journey.",
        rating: 2,
      },
    ],
  },
  {
    Language: "English",
    Genre: "Romance",
    title: "Wuthering Heights (Emily Brontë)",
    category: "Books",
    price: 69,
    imgs: [
      "/data/images/Wuthering.jpg",
    ],
    specs:
      "Wuthering Heights is a story of love, hate, social status, and revenge set in the moorlands of Northern England at the end of the 18th century. The novel follows the repercussions of the ill-fated love between the impetuous, strong-willed protagonists Catherine “Cathy” Earnshaw and Heathcliff. The story is narrated in diary-like entries by Lockwood, a tenant of one of Heathcliff’s estates. Lockwood annotates and gathers the story told to him by Nelly Dean, the housekeeper, and also records his present-day interactions to create the frame of the story. The events taking place in Wuthering Heights span a 40-year period.",
    inStock: 50,
    eta: 1,
    id: "b3",
    rating: 4.0,
    reviews: [
      {
        name: "Elle",
        title: "I Tried it But,",
        content: `I never expected this book to be as flagrantly, unforgivably bad as it was.
  
        To start, Bronte's technical choice of narrating the story of the primary characters by having the housekeeper explain everything to a tenant 20 years after it happened completely kills suspense and intimacy.`,
        rating: 1,
      },
      {
        name: "Sophie",
        title: "Interestingly enough",
        content:
          "Ah the classics. Everybody can read their own agenda in them. So, first a short plot guide for dinner conversations when one needs to fake acculturation, and then on to the critics’ view.",
        rating: 2,
      },
      {
        name: "American Dragon",
        title: "Childhood Memory",
        content: `I first read this in AP English Literature - senior year of high school. This book is dense and thick and confusing, and with a class full of haters, it was hard to wrap my head around it. I subsequently read it three or four more times for classes in college and every time I read it, I loved it more.`,
        rating: 5,
      },
    ],
  },
  {
    Language: "Hindi",
    Genre: "Mystery",
    title: "Byomkesh Bakshi ki Rahasyamayi Kahaniyan",
    category: "Books",
    price: 139,
    imgs: [
      "/data/images/bumkeshbakshi.jpg",
    ],
    specs:
      "सारदेंदु बंद्योपाध्याय की विशिष्टता उनके जासूसी लेखन के अतिरिक्त उनकी अद्वितीय लेखन-शैली के साथ-साथ उनके चरित्रों का सूक्ष्म जीवंत चित्रण है। बीसवीं सदी के प्रारंभ के बंगाल में लेखक और पाठक समान रूप से अपराध और जासूसी साहित्य को नीची निगाहों से देखते थे। सारदेंदु बंद्योपाध्याय ने पहली बार उस लेखन को सम्मानीय स्थान दिलाया। इसका एक बड़ा कारण यह था कि उनके पूर्व के लेखक पंचकोरी दे और दिनेंद्र कुमार अंग्रेजी के जासूसी लेखक आर्थर कोनान, डोएल, एडगर एलन पो, जी.के. चेस्टरसन तथा अगाथा क्रिस्टी से प्रभावित होकर लिखते थे, जबकि सारदेंदु के चरित्र और स्थान अन्य जासूसी उपन्यासों के विपरीत, भारतीय मूल और स्थल के परिवेश में जीते हैं। उनके लेखन का विनोदी स्वभाव पाठक को अनायास कथा के दौरान गुदगुदाता रहता है। ब्योमकेश का साहित्य न केवल अभूतपूर्व जासूसी साहित्य है बल्कि सभी समय और काल में, समाज के सभी वर्गों के युवाओं और वृद्धों में समान रूप से सदैव लोकप्रिय बना रहा है। पाठक इन रहस्य भरी कहानियों को उनके जीवंत लेखन के लिए, अंत जानने के बावजूद, बार-बार पढ़ने के लिए लालायित रहता है। किसी भी लोकप्रिय साहित्य में यह एक अद्वितीय उपलब्धि मानी जाती है और यही उपलब्धि सारदेंदु के ब्योमकेश बक्शी साहित्य को सत्यजीत राय के प्रसिद्ध उपन्यास ‘फेलूदा के कारनामे’ के समान हमारे समय के ‘क्लासिक’ का स्थान दिलाती है।",
    inStock: 50,
    eta: 1,
    id: "b4",
    rating: 4.6,
    reviews: [
      {
        name: "Tony",
        title: "One of the best detective stories book ever.",
        content: `Fantastic. Simply superb. I thought after watching it's series on TV I might not like reading it. But, it was an amazing experience. Due to the above-mentioned fear, I couldn't buy it in the first time but only after a couple of days after thinking a couple of times. But, once I bought it, I couldn't stop. Finished it in less than a week's time. Totally enjoyed it. Highly recommended. Don't miss for anything. Wish I could write something like this!`,
        rating: 4,
      },
      {
        name: "Ram Singh",
        title: " One of the Best Story Book",
        content:
          "It is an honour to review the Story book of Byomkesh Sir. He was fantastic and Wise. His assumptions were so accurate. The main theme of the book is successful. Nice book.",
        rating: 3,
      },
      {
        name: "Shizuka",
        title: "Don't trust seller.",
        content: `I ordered it at low price from Amazon but when the book reached, what i seen was one page miss print. So i reordered the book but second time they confirmed the order at high price. But as i was buying it to gift someone on her birthday, i ordered it. When i opened to check the miss prints, all the pages were well printed. But when the person to whom i gifted it, opened the book what she seen was missing pages. Example - after 112 page number you jump to direct page no. 129. I mean where are the pages? It all destroyed the emotions of the gift. I will not buy any product from seller 'Cloudtale' at all cost.`,
        rating: 4,
      },
    ],
  },
  {
    Language: "English",
    Genre: "Historical",
    title: "Pride and Prejudice",
    category: "Books",
    price: 79,
    imgs: [
      "/data/images/prideandprejudice.jpg",
    ],
    specs:
      "The story follows the main character Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of early 19th-century England. Elizabeth is the second of five daughters of country gentleman living near the fictional town of meryton in Hertfordshire, near London. The story begins as the people of rural meryton scurry to marry their daughters off to Charles Bingley, a dashing and eligible Bachelor who has taken an estate near the Bennet. At the villagers welcoming ball, Elizabeth meets up with a formidable adversary: bingley’s closest friend, the Cold, prideful, extremely wealthy Fitzwilliam Darcy, who piques her to new heights of antagonism. When Darcy arrogantly urges Bingley to give up his burgeoning courtship of Elizabeth sister, misunderstanding threatens to bury all he loves in turmoil and regret",
    inStock: 50,
    eta: 1,
    id: "b5",
    rating: 4.3,
    reviews: [
      {
        name: "raze",
        title: "Boom",
        content:
          "Imagine having a pride when you get blown up and shattered like a bot",
        rating: 4,
      },
      {
        name: "Max Walters",
        title: "Simply Amazing",
        content:
          "My partner really loved it , she said that its really potrays the issues which you might need to face but might not be able to solve cause of pride. I say it was like a really good investment for my partner as she liked it.",
        rating: 4,
      },
      {
        name: "Robert Williams",
        title: "Imagine Dealing with",
        content:
          "Issues potrayed in the book, can really be disturbing right ? It can be really hard on you sometimes, as it can be really real sometimes",
        rating: 4,
      },
    ],
  },
  {
    Language: "English",
    Genre: "Humour",
    title:
      "The Ultimate Hitchhiker's Guide to the Galaxy: The Complete Trilogy in Five Parts",
    category: "Books",
    price: 507,
    imgs: [
      "/data/images/guidetogalaxy.jpg",
    ],
    specs:
      "A phenomenon across all formats, this 42nd anniversary paperback omnibus contains the complete Hitchhiker's Guide trilogy in five parts, charting the whole of Arthur Dent's odyssey through space and time. Share and enjoy. Collected together in this omnibus are the five titles that comprise Douglas Adams wildly popular and wholly remarkable comedy science fiction trilogy, introductions to each book, expanded material from the Douglas Adams archives plus a bonus short story, Young Zaphod Plays It Safe, and a special undeleted scene . . .The Hitchhiker's Guide to the Galaxy",
    inStock: 27,
    eta: 1,
    id: "b6",
    rating: 4.8,
    reviews: [
      {
        name: "Ruchika Amin",
        title: "Must Buy",
        content:
          "Great Book. Excellent Condition. If you want to buy this book, buy this edition m",
        rating: 5,
      },
      {
        name: "Aditi s.",
        title: "3 three blank pages at the end",
        content:
          "I just ordered this book, and i have 3 blank pages at the end of the book ...is it supposed to be like this?",
        rating: 4,
      },
    ],
  },
  {
    Language: "English",
    Genre: "Humour",
    title: "Green Humour for a Greying Planet",
    category: "Books",
    price: 258,
    imgs: [
      "/data/images/greyhumour.jpg",
    ],
    specs:
      "Green Humour For A Greying Planet is a curation of gag cartoons and comic strips based exclusively on wildlife and nature, perhaps the first of its kind. At a time when global warming, wildlife crimes and man-animal conflicts are at their worst, 'Green Humour' is sure to provide its readers some much needed comic relief. A comprehensive and satirical take on various aspects of the natural world and the threats to its conservation, this book will appeal to both the scientifically inclined readers as well as the general readers.",
    inStock: 17,
    eta: 1,
    id: "b7",
    rating: 4.9,
    reviews: [
      {
        name: "Sherebanu Frosh",
        title: "Sherebanu Frosh",
        content:
          "Absolutely fun and fabulous. Particularly good for gifting to someone who doesn't actively care about the environment. The humour, the digs can really wake us up to the perspective of animals without being trite or dull. My kids couldn't stop reading, kept coming to me to show me a comic. Enjoyed it thoroughly myself when I could finally get it from them!",
        rating: 5,
      },
      {
        name: "Ankit Anurag",
        title: "Humour & Alarming",
        content:
          "Book is full of interesting facts and observations which will make you see things in a new light.",
        rating: 4.8,
      },
    ],
  },
  {
    popular: true,
    Language: "Hindi",
    Genre: "Historical",
    title: "Sunderkand (Hindi) - Goswami Tulsidas",
    category: "Books",
    price: 99,
    imgs: [
      "/data/images/sunderkand.jpg",
    ],
    specs:
      "Sunderkand, believed to be the most beautiful (Sunder) part of the Ramayana, describes Lord Hanuman journey to Lanka. This book elucidates his pristine lifestyle, following which brings karmic and spiritual knowledge and bhakti (devotion) in one’s life. It is even believed that when one reads the sunderkand, Lord Hanuman himself graces the reader with his presence. Carrying the entire text and explanation of the sunderkand, Shri Hanuman Chalisa and sankatmochan hanumanashtak, this edition also contains a art is of Lord Ganesha, Lord Ram and Lord Hanuman.",
    inStock: 17,
    eta: 1,
    id: "b8",
    rating: 4.7,
    reviews: [
      {
        name: "Vikram",
        title: "Sherebanu Frosh",
        content:
          "Very nice, everything with meaning in hindi. Even all Chalisa has it's meaning explained. Superb",
        rating: 5,
      },
      {
        name: "Vikas Verma",
        title: "4 star for bad packing",
        content:
          "Book is good and quality of is also good but packing is bad. They put direct book in plastic cover.when I opened book it was fold.",
        rating: 4,
      },
    ],
  },
  {
    Language: "Hindi",
    Genre: "Poetry",
    title: "Phir Meri Yaad - Hindi - Kumar Vishwas",
    category: "Books",
    price: 159,
    imgs: [
      "/data/images/phirmeriyaad.jpg",
    ],
    specs:
      "Reading books is a kind of enjoyment. Reading books is a good habit. We bring you a different kinds of books. You can carry this book where ever you want. It is easy to carry. It can be an ideal gift to yourself and to your loved ones. Care instruction keep away from fire.",
    inStock: 7,
    eta: 1,
    id: "b9",
    rating: 4.5,
    reviews: [
      {
        name: "Shagun Srivastava",
        title: "Hindi ki adbhut kavita...",
        content: "A beautiful book by one of my favourite person....",
        rating: 5,
      },
      {
        name: "Satyajit Dasgupta",
        title: "MUCH LIKE THE AUTHOR HIMSELF",
        content:
          "Introspective in parts which are therefore worth a read. Mostly playing to a faithful gallery, which for me is worth a miss.",
        rating: 3,
      },
    ],
  },
  {
    Language: "English",
    Genre: "Historical",
    title: "Kabir: The life and work of the early modern poet",
    category: "Books",
    price: 431,
    imgs: [
      "/data/images/kabirkabir.jpg",
    ],
    specs:
      "As the right wing tries to claim Kabir for itself, while other conservatives disown him and yet others portray him as a secular idol beyond religion, the poet has never been so misunderstood. Coming from the Nirgun bhakti tradition, the words of this fifteenth-century poet have the power to reach beyond time and speak to us today. Was he a Hindu or Muslim or was he beyond religion? Did he try to cultivate a new faith or did he eschew organised religion altogether? Was his modernity an exception or a reflection of the times he lived in? What does Kabir’s life and poetry tell us about this nation’s past and present? In this rare appraisal of Kabir’s writings and his life, Purushottam Agarwal approaches this timeless poet-revolutionary with little preconceptions, presenting him the way the poet wanted to be seen, rather than what his followers and fans want to see in him.",
    inStock: 9,
    eta: 1,
    id: "b10",
    rating: 4.5,
    reviews: [
      {
        name: "Subhhan s.",
        title: "Superb",
        content:
          "Very good book. Chronicles the life and times of kabir very convincingly. Author's knowledge about his subject is very good. A very good introduction to kabir and mediveal india.",
        rating: 5,
      },
      {
        name: "Shivam",
        title: "Atleast give a bookmark with the book.",
        content:
          "You should have the courtesy to atleast provide a bookmark with the book.",
        rating: 2,
      },
    ],
  },
  {
    popular: true,
    For: "Men",
    title: "AEROPOSTALE Men's Casual Shirt",
    category: "Clothings",
    price: 549,
    imgs: [
      "/data/images/shirt.jpg",
    ],
    specs: [
      "Size: Medium",
      "Color name: Light Ceramic",
      "Material: Cotton",
      "Pattern: Solid",
      "Long Sleeve",
    ],
    inStock: 50,
    eta: 10,
    id: "c1",
    rating: 4.7,
    reviews: [
      {
        name: "Rahul Sharma",
        title: "Good cotton Shirt",
        content: "It gets the job done, really gets me looking sexy and cool!",
        rating: 4,
      },
      {
        name: "Ayush Goyal",
        title: "Fabric not that good",
        content:
          "It shrank and is losing color after every wash. I don't think its as premium as advertised or I got a fake product. Really Disappointed...",
        rating: 2,
      },
      {
        name: "Gon",
        title: "Ok",
        content: "Gets the work done Its ok for me nothing really special",
        rating: 2,
      },
    ],
  },
  {
    For: "Women",
    title: "ANNI DESIGNER Khadi Silk with Blouse Piece Saree",
    category: "Clothings",
    price: 299,
    imgs: [
      "/data/images/saaree.jpg",
    ],
    specs: [
      "Saree Color: Beige and Red",
      "Saree Fabric: Khadi Silk",
      "Wash Care: Dry Clean for the first time",
    ],
    inStock: 2,
    eta: 2,
    id: "c2",
    rating: 4.2,
    reviews: [
      {
        name: "Motu",
        title: "I got the wrong size Feel cheated",
        content:
          "I ordered it 2 weeks ago and I not only got a wrong product as but they also denied my refund request quoting its non refundable even though its their fault!!!",
        rating: 1,
      },
      {
        name: "Forsen",
        title: "ZULUL",
        content:
          "I Wore this as my wife nina forced me too, I felt really good and nice but she still left me now I wear it to remember her",
        rating: 5,
      },
      {
        name: "Viper",
        title: "Toxic Screen Down",
        content:
          "My coworker said you are looking fire bruh which is really weird but really tells how much it suits me",
        rating: 4,
      },
    ],
  },
  {
    For: "Women",
    title: "Women's Stylish Plain Up and Down Cotton Tshirt",
    category: "Clothings",
    price: 449,
    imgs: [
      "/data/images/womentop.jpg",
    ],
    specs: [
      "Fit Type: Regular Fit",
      "Fabric Type: Cotton",
      "Pattern name: Solid",
      "Closure Type: Pull On",
      "Sleeve Type: Short Sleeve; Collar Style: Collarless",
    ],
    inStock: 20,
    eta: 5,
    id: "c3",
    rating: 3.7,
    reviews: [
      {
        name: "Shizuka",
        title: "If apple made a tshirt",
        content: "Like It wont be good and cheap. So its really good",
        rating: 4,
      },
      {
        name: "Anonymous",
        title: "Seller Asking for reviews ",
        content:
          "I ordered the product which is really fine but the seller is sending a note to give it 5 star for money. I don't like Amazon not taking practices against this",
        rating: 2,
      },
      {
        name: "Kiteretsu",
        title: "bad quality",
        content: "It faded colours after few washes and now doesnt look good",
        rating: 2,
      },
    ],
  },
  {
    For: "Kids",
    title: "Unisex-Baby Regular Vest (100% Cotton)",
    category: "Clothings",
    price: 499,
    imgs: [
      "/data/images/kidvest1.jpg",
      "/data/images/kidvest2.jpg",
    ],
    specs: [
      "Fit Type: Regular",
      "Fabric: Made by high quality natural skin friendly 100% tested cotton fabrics",
    ],
    inStock: 20,
    eta: 10,
    id: "c4",
    rating: 2.9,
    reviews: [
      {
        name: "Giyan",
        title: "Trusted Brand",
        content:
          "Always wearing the Tshirts of this brand really amazing and durable,I still have my class 12th tshirt which still fits well and has decent colours and fabric",
        rating: 5,
      },
      {
        name: "Patlu",
        title: "thik thak hai!",
        content:
          "Mujhe ye acche se aaya par merko umeed thi ki isse saastha hoga kyoki ye kid baacho ka hai 500 mai tho mere liye tshirt aajaati merko laagta ye log loot raahe hai ",
        rating: 3,
      },
      {
        name: "Priya",
        title: "TOO SMALL",
        content:
          "Ordered 3-6 month size for my 1.5 month baby just in case I thought. Toy surprise he couldn't wear it till his 2 months bday. The sleeves got too tight and the length is too short too. Waste of money.",
        rating: 2,
      },
    ],
  },
  {
    For: "Men",
    title: "Ben Martin Men's Regular Fit Denim Jeans",
    category: "Clothings",
    price: 698,
    imgs: [
      "/data/images/mensjeans.jpg",
    ],
    specs: [
      "Size: 34",
      "Fit Type: Relaxed; Occasion: Casual",
      "Material: Cotton",
      "Color: Dark Blue",
    ],
    inStock: 9,
    eta: 1,
    id: "c5",
    rating: 4.3,
    reviews: [
      {
        name: "Nitin",
        title: "Fitting",
        content: `As such there is nithing wrong with the product but for me, it was fitting very oddly.Though i wear regular fit standard36 " waist trousers, this trousers were too tight on thighs as well as below ankle.Not at all comfortable.Below the knee, it fitted more like a chudidar`,
        rating: 3,
      },
      { name: "Sarvesh", title: "Very thin Cloth", content: "Good", rating: 4 },
      {
        name: "Joker",
        title: "About jeans",
        content:
          "I was expecting that the material of the jeans would be really soft but it's not it's hard material, I'm a bit dissatisfied though i am keeping the item because it fits very well",
        rating: 4,
      },
    ],
  },
  {
    For: "Men",
    title: "Puma Men's Regular T-Shirt @899",
    category: "Clothings",
    price: 899,
    imgs: [
      "/data/images/pumatshirt1.jpg",
      "/data/images/pumatshirt2.jpg",
    ],
    specs: [
      "Size: 34",
      "Care Instructions: Machine Wash",
      "Fit Type: Regular",
      "Style Name: Polo",
      "Model Name: Team Polo",
      "Brand Color: Puma White",
    ],
    inStock: 7,
    eta: 1,
    id: "c6",
    rating: 4,
    reviews: [
      {
        name: "Virdi S.",
        title: "100% original..very good fabric",
        content: "100% original",
        rating: 5,
      },
      { name: "Sarvesh", title: "Very thin Cloth", content: "Good", rating: 4 },
      {
        name: "Lalit Banga",
        title: "Poor quality",
        content:
          "The product is not upto the mark and quality is very bad don’t get misled",
        rating: 1,
      },
    ],
  },
  {
    For: "Kids",
    title:
      "Unisex Baby Infant Kids Costume Flannel Jumpsuit Panda Style Cosplay Clothes Bunting Outfits Snowsuit Hooded Romper Outwear",
    category: "Clothings",
    price: 1299,
    imgs: [
      "/data/images/babycostume.jpg",
    ],
    specs: [
      "SIZE: 70cm, Fits for AGE: 0-6 Months",
      "Premium Flannel Material: The Baby Costumes with Panda Hat are Crafted in soft flannel material that has a napped finish on both sides, high absorbent and breathable, cozy feel of this baby Pajamas to keep little baby warm and comfy all winter.",
      "Easy to Put On/Off: The Baby Costumes with Panda Hat are zipper closure, easy to put on/off, double zipper from top and bottom, it goes all the way to the back for easy diaper changing.",
    ],
    inStock: 37,
    eta: 2,
    id: "c7",
    rating: 4.3,
    reviews: [
      {
        name: "Pallavi ShuklaJaitly",
        title: "Awesome",
        content:
          "Superrrrb. Very soft fabric which is very warm. I think this will fit my baby upto 2yrs even. Go for it",
        rating: 5,
      },
      {
        name: "Anish ad",
        title: "Not a good one!",
        content:
          "Fake product. Face of the panda is different than delivered. Length is longer than mentioned. I had to travel alongwith this so couldn't even return it on time. Better to keep away from this one",
        rating: 1,
      },
      {
        name: "Bobo",
        title: "Good Material. On time delivery. Bad stitching.",
        content:
          "The product looks like it is and zip is good and got delivered on time. But the stitching is very poor.",
        rating: 3,
      },
    ],
  },
  {
    For: "Kids",
    title: "Festive & Party Kurta Pyjama Set for Baby Boys (WKP)",
    category: "Clothings",
    price: 449,
    imgs: [
      "/data/images/kidkurtha.jpg",
    ],
    specs: [
      "Color: White",
      "Occassion: Wedding, Party, Ceremony, Festival",
      "Kurta Pyjama For Boys",
    ],
    inStock: 14,
    eta: 4,
    id: "c8",
    rating: 3.7,
    reviews: [
      {
        name: "Pallavi ShuklaJaitly",
        title: "Don't buy",
        content: "Bad Quality",
        rating: 1,
      },
    ],
  },
  {
    For: "Women",
    title: "Women's Cotton Straight Kurta Pant With Dupatta Set",
    category: "Clothings",
    price: 1049,
    imgs: [
      "/data/images/womenkurtha.jpg",
    ],
    specs: [
      "Fit Type: Regular",
      "Fabric: Cambric Cotton 60x60",
      "Salwar Suits: Straight Kurta Pant And Solid Dupatta Set",
    ],
    inStock: 34,
    eta: 10,
    id: "c9",
    rating: 4,
    reviews: [
      {
        name: "Sakthivale S",
        title: "Comfortable to wear",
        content: "Nice product",
        rating: 5,
      },
      {
        name: "Mamta",
        title: "Good for the price",
        content:
          "Looking good and fit as expected. Fabric is very thin and not of good quality. I don't expect it will last longer than few washes. But price paid is 871Rs.",
        rating: 3,
      },
    ],
  },
  {
    For: "Women",
    title: "Studio Shringaar Women's Green Pink Patola Printed Saree Blouse",
    category: "Clothings",
    price: 749,
    imgs: [
      "/data/images/womenblouse.jpg",
    ],
    specs: [
      "Fit Type: Regular",
      "A fully stitched blouse with short sleeves",
      "Traditional Patola printed silky polyester blouse with cotton lining",
      "Sizes available are 34(XXS) TO 42 ( XL). Size 38 is S size which has a bust size of 38' all round",
      "The front has a boat neck and the blouse opens from the back",
      "The back has a drop shaped cut out",
    ],
    inStock: 4,
    eta: 20,
    id: "c10",
    rating: 4.1,
    reviews: [
      {
        name: "Megha Pandya",
        title: "Studio shingaar never fails :)",
        content:
          "This is my 3 rd blouse from this brand. Great quality and pattern",
        rating: 4,
      },
      {
        name: "Radhika",
        title: "Color is little dark",
        content:
          "Go for next size, fabric is different than the pic shown in image. Color also it's dark green not the same shown in pic",
        rating: 3,
      },
    ],
  },
  {
    Type: "Bath and Body",
    title: "Dove Deeply Nourishing Body Wash",
    category: "Beauty",
    price: 324,
    imgs: [
      "/data/images/dovebodylotion.jpg",
    ],
    specs: [
      "Quantity: 800 ml",
      "Nourishes deep into the surface layers of the skin",
      "Mild, gentle formula is kind to your skin. Ideal For Men & Women",
      "Dove body wash is better than milk",
    ],
    inStock: 34,
    eta: 5,
    id: "be1",
    rating: 4.4,
    reviews: [
      {
        name: "Manisha Gupta",
        title: "Body wash better than milk",
        content: `I always use to prefer dove products whether it is shampoo or soap so I tried some other product of dove that is body wash and it's really worth it as it nourishes deep into the surface layers of the skin
        Mild, gentle formula is kind to your skin`,
        rating: 5,
      },
      {
        name: "Monika",
        title: "A must buy definitely..!!",
        content:
          "This Dove Bodywash is one of the best body washes I’ve used till date .. it nourishes deep into the surface layers of the skin.. it’s really mild and gentle on the skin.. it will give you super soft and smooth skin after just one use.",
        rating: 4,
      },
      {
        name: "Neha",
        title: "Disappointed",
        content: `Very disappointed with exchange policy. Amazon denied exchange even with the item of same price during offer period and current price is also same. What to do of too tight Jean. Wastage of time. Don't buy anything from Amazon with such disappointed exchange policy.`,
        rating: 2,
      },
    ],
  },
  {
    Type: "Fragrance",
    title: "Park Avenue Good Morning Perfume Intense Body Spray, 150ml",
    category: "Beauty",
    price: 159,
    imgs: [
      "/data/images/parkavenueperfume.jpg",
    ],
    specs: [
      "Quantity: 150ml",
      "Item Form: Spray",
      "Skin Type: All Skin Types",
      "For: Men",
    ],
    inStock: 36,
    eta: 10,
    id: "be2",
    rating: 3.6,
    reviews: [
      {
        name: "Ram",
        title: "The Quality of the product.",
        content:
          "This Body Spray is too good, smells nice and value for money. I shall buy it again. Definitely recommended.",
        rating: 5,
      },
      {
        name: "Raj Singh",
        title: "BIG LIE",
        content:
          "AMAZON IS LYING ITS NOT 150 ML... ITS 130ML THE SELLER HAS LISTED IT AS 150ML AND ARE DENYING ANY REFUNDS I FEEl chEATED, but the quality of product is as advertised",
        rating: 4,
      },
      {
        name: "Ankit",
        title: "Read Comment Full",
        content: `Lets Be Honest
        The Quality of packaging is worst
        The deo fragrance is Ultimate as it contain Vanilla
        Vanilla is the first things which attracts women`,
        rating: 4,
      },
    ],
  },
  {
    Type: "Fragrance",
    title: "NIVEA Men Deodorant Fresh Active Original, 150ml",
    category: "Beauty",
    price: 299,
    imgs: [
      "/data/images/fragrancedeonevia.jpg",
    ],
    specs: [
      "Quantity: 150ml",
      "Item Form: Spray",
      "Skin Type: All Skin Types",
      "For: Men",
      "The optimal combination of reliable deodorant protection and Nivea care",
    ],
    inStock: 15,
    eta: 2,
    id: "be3",
    rating: 4.3,
    reviews: [
      {
        name: "Ritik",
        title: "BAD,WORST, NOT WORTH",
        content: `i was using this for past two day's. It not even smelling. I don't know why they selling this stupid product. Dont buy this guys buy the Fogg it is more than this.`,
        rating: 2,
      },
      {
        name: "Ninja",
        title: "Good,Nive as Always",
        content: "I am a regular user, nothing to dislike.",
        rating: 5,
      },
      {
        name: "Nani",
        title: "Very Good Smell",
        content: "Got this product in good price. Scent also good",
        rating: 4,
      },
    ],
  },
  {
    Type: "Skin Care",
    title: "WOW Skin Science Apple Cider Vinegar Foaming Face Wash, 150ml",
    category: "Beauty",
    price: 359,
    imgs: [
      "/data/images/wowskincare.jpg",
    ],
    specs: [
      "Quantity: 150ml",
      "Skin Type: All Skin Types",
      "Bioacitve-rich with pure Apple Cider Vinegar, Aloe Vera Extract and Vitamins B5 & E",
      "PREVENTS future breakouts and REDUCES active breakouts using natural NOT chemical ingredients",
    ],
    inStock: 15,
    eta: 2,
    id: "be4",
    rating: 4.8,
    reviews: [
      {
        name: "Ashwin",
        title: "GOOD ONE",
        content:
          "Quality assurance as claimed I look at every product I buy from any company. I will discontine if product is'nt upto the standards displayed",
        rating: 4,
      },
      {
        name: "Gauri",
        title: "BEST FACE WASH",
        content:
          "It's the best face wash I ever used. It's suitable for all type of skin. Clean the skin deeply and keeps skin healthy and nourished.",
        rating: 4,
      },
      {
        name: "Martin",
        title: "Best face wash for oil skin....",
        content:
          "I have been using this face wash for a month it is satisfied with the product and it is really nice to use also helps in dematiris skin condition.",
        rating: 5,
      },
    ],
  },
  {
    popular: true,
    Type: "Hair Care",
    title: "Parachute jumbo pack 100% pure coconut oil, 600ml",
    category: "Beauty",
    price: 227,
    imgs: [
      "/data/images/coconutoil.jpg",
    ],
    specs: [
      "Quantity: 600ml",
      "Hair Type: All",
      "Item Form: Oil",
      "Nothing but 100% pure coconut oil",
      "Made with the finest hand-picked & naturally sun dried coconuts",
      "Contains no added preservatives or chemicals. Sulfate Free",
    ],
    inStock: 9,
    eta: 3,
    id: "be5",
    rating: 4.2,
    reviews: [
      {
        name: "Payal P",
        title: "Idiot Seller",
        content:
          "The oil is good but really disappointed with what seller has done here,  he knowing sent damaged bottle and tried to fix it with tape and stop the leak,",
        rating: 5,
      },
      {
        name: "Md Shahzad Hassan",
        title: "The quality of packaging destroys value",
        content: `Parachute coconut oil needs no introduction and has been a favorite and household name for decades.
  
          Quality and purity is top notch.
          
          For last few times the packaging has been disappointment. Every single time the cap will break apart in initial few days and then the whole oil wastes by spilling or dropping
          `,
        rating: 3,
      },
      {
        name: "Nitesh",
        title: "Do not buy",
        content: `some product with same manufacturing date found cheaper in local market with low printed price.so before u buy have a look with near by retail shop.`,
        rating: 1,
      },
    ],
  },
  {
    popular: true,
    Type: "Skin Care",
    title: "The Body Shop British Rose Shower Gel, 250ml",
    category: "Beauty",
    price: 345,
    imgs: [
      "/data/images/roseShowerGel.jpg",
    ],
    specs: [
      "Quantity: 250ml",
      "Skin Type: Dry",
      "Scent: Rose",
      "Ingredients: Rose Extract. Is there anything classier than a bunch of roses? We use extract from English roses for their impossibly sweet smell.",
      "Package Type: Bottle",
    ],
    inStock: 22,
    eta: 3,
    id: "be6",
    rating: 4.5,
    reviews: [
      {
        name: "Yam",
        title: "Thick shower gel",
        content: "Thick shower goal with a heavenly aroma. Feels luxurious",
        rating: 5,
      },
      {
        name: "Debra E.",
        title: "Lovely aroma",
        content: "Love the smell. Fills the bathroom with a lovely aroma.",
        rating: 5,
      },
    ],
  },
  {
    Type: "Skin Care",
    title: "Vaseline Intensive Care Deep Moisture Body Lotion, 400ml",
    category: "Beauty",
    price: 276,
    imgs: [
      "/data/images/vaslinebodylotion.jpg",
      "/data/images/vaslinebodylotion2.jpg",
    ],
    specs: [
      "Quantity: 400ml",
      "Skin Type: All",
      "Item Form: Lotion",
      "Ingredients: Glycerin",
      "Package Type: Bottle",
      "Daily body lotion best for: dry skin, rough skin",
    ],
    inStock: 2,
    eta: 2,
    id: "be7",
    rating: 4.4,
    reviews: [
      {
        name: "Sam",
        title: "Effective product for dry skin",
        content:
          "Effective moisturizer, heals dry skin within days. Pleasant fragrance. Impressive deal, nearly half price.",
        rating: 5,
      },
      {
        name: "Anvar Adam",
        title: "Very bad products",
        content:
          "Very bad products. After I use on my body. Too much start etching and elergy. I think products was expired.",
        rating: 1,
      },
    ],
  },
  {
    Type: "Hair Care",
    title:
      "L'Oréal Professionnel Steampod 3.0 Steam Hair Straightener & Styling Tool",
    category: "Beauty",
    price: 24800,
    imgs: [
      "/data/images/Straightener1.jpg",
      "/data/images/Straightener2.jpg",
    ],
    specs: [
      "Hair Type: All",
      "SteamPod 3.0 by L'Oréal Professionnel is the 3rd generation of the original patented professional steam hair straightener & styling tool.",
      "2x faster & 2x smoother styling vs a regular straightener.",
      "91% less damage vs a regular straightener after 15 uses.",
      "Instant Shine vs natural hair.",
    ],
    inStock: 20,
    eta: 20,
    id: "be8",
    rating: 5,
    reviews: [
      {
        name: "AW",
        title: "Great Buy! Salon favourite",
        content:
          "Absolutely the best styler in the market. Had seen this during my trip to Europe and regretted not buying it then. Amazing that it’s now available here.",
        rating: 5,
      },
    ],
  },
  {
    Type: "Makeup",
    title: "Lakmé Eyeconic Kajal Twin Pack, Smudge Proof, Water Proof",
    category: "Beauty",
    price: 268,
    imgs: [
      "/data/images/kajal1.jpg",
      "/data/images/kajal2.jpg",
    ],
    specs: [
      "Smudge proof and convenient twist- up format for deep stroke",
      "Water proof, lasts up to 22 hrs",
      "It is dermatologically tested and is safe for the eyes",
      "Easy twist up format",
      "Can be used water line and eye lids",
      "Deep black finish",
    ],
    inStock: 22,
    eta: 100,
    id: "be9",
    rating: 4.4,
    reviews: [
      {
        name: "Psuhpendra Patel",
        title: "Good Quality",
        content:
          "Beauty lies in the eyes of the beholder. It's seen in the eyes & defines attitude. Kajal in women's eyes simply magnifies it all. Some prefer it and some do not.",
        rating: 5,
      },
      {
        name: "Shivangi",
        title: "Not satisfied",
        content:
          "When i opened the product the kajal stick was broken in one piece and in 2nd piece is also defected.its not useful.",
        rating: 1,
      },
    ],
  },
  {
    Type: "Makeup",
    title: "O.P.I Nail Lacquer, You're Such a Budapest, 15ml",
    category: "Beauty",
    price: 850,
    imgs: [
      "/data/images/nailpolsih1.jpg",
      "/data/images/nailpolsih2.jpg",
    ],
    specs: [
      "Brand: O.P.I",
      "Colour: You're Such a Budapest",
      "Finish Type: Glossy",
      "A vivacious chianti Nail Polish that shade will draw gazes with pearly, opalescent coverage.",
    ],
    inStock: 5,
    eta: 1,
    id: "be10",
    rating: 4.7,
    reviews: [
      {
        name: "GM",
        title: "Shade is streaky",
        content:
          "Love the shade but it takes about 2-3 coats to get full opacity. I think its the problem with this light shade as I have no problems with others. Shade is nice & summery",
        rating: 5,
      },
      {
        name: "Mazielady",
        title: "Pretty summer colour",
        content:
          "Very pretty summer colour and ss eith all OPI polishes, of good quality.",
        rating: 5,
      },
      {
        name: "Nicletyei",
        title: "You're such a Budapest",
        content: "Favourite OPI colour. Great with or without a tan.",
        rating: 5,
      },
    ],
  },
  {
    Type: "Office Chair",
    title: "Umbrella Base Office Chair (Standard, Black)",
    category: "Furniture",
    price: 3199,
    imgs: [
      "/data/images/officechairumbrella.jpg",
    ],
    specs: [
      "Furniture Base: Swivel",
      "Color: Black",
      "Frame Material: Nylon",
      "Base dimension-24', Seat dimension - 18'x18'",
      "1 year warranty against breakage",
      "DIY assembly",
    ],
    inStock: 10,
    eta: 30,
    id: "f1",
    rating: 3.5,
    reviews: [
      {
        name: "Sayanak S",
        title: "Paint Coming Out",
        content: "The paints are coming out even with slightest touch",
        rating: 1,
      },
      {
        name: "Kamlesh K",
        title: "Product received was different from what's pictured",
        content: `The chair I received was different from the one shown in the image. It's cheating.. I would like to return it, but it seems the option is not there.`,
        rating: 2,
      },
      {
        name: "Sam B",
        title: "stars Chair with many problems",
        content: `Fitting is good and fast. But chair is slightly damage on handle. Feels like old stock.
  
        Edit :
        After few Months, started to make sounds when u sit on it, the back lock is weak and slips every time . Not happy with this buy.`,
        rating: 4,
      },
    ],
  },
  {
    popular: true,
    Type: "Desk",
    title: "Wood Study Desk(Wenge Finish,Wenge)",
    category: "Furniture",
    price: 3775,
    imgs: [
      "/data/images/desk.jpg",
    ],
    specs: [
      "Item Dimensions: 103 x 40 x 73 Centimeters",
      "Material: Engineered Wood",
      "Study Table Desk",
      "Without Keyboard Shelf",
      "For home and office",
    ],
    inStock: 15,
    eta: 60,
    id: "f2",
    rating: 3.9,
    reviews: [
      {
        name: "Anjali",
        title: "Value For Money",
        content: `This product is really a value for money.
        The board sturdiness is really good. The ply is quiet tough.
        A little difficult to assemble. I assembled it at my home with the help of my father and sister.
        Overall 4/5. Really helpful for me`,
        rating: 4,
      },
      {
        name: "Prashant",
        title: "A good value for money product",
        content: `I ordered the table on 7th June and it was delivered on 28th June. So it took almost 20 days for the product to reach.
        Overall the quality of the table is good. You get a manual to assemble the table. It can be easily done by two people. I took almost an hour to assemble it.`,
        rating: 4,
      },
      {
        name: "Shiva",
        title: "stars Worst than worst",
        content: `I'm just not happy with the product. It wasn't easy to assemble and the wood quality is so bad. Please don't take this product. Not at all worthy. And after leaving this review I started getting calls from that company asking to remove the review`,
        rating: 1,
      },
    ],
  },
  {
    Type: "Beds",
    title: "King Size Sliding Door Bed with Box Storage",
    category: "Furniture",
    price: 21950,
    imgs: [
      "/data/images/bedwithstorage.jpg",
    ],
    specs: [
      "Size: King Size",
      "Item Dimensions: 186 x 215 x 100.5 Centimeters",
      "Material: Engineered Wood",
      "Frame is made of Particle board which is produced by compressing wood dust, glue and resin. The chips in the surface layer are thinner than those in the middle layer, so the surface of the particle board is denser. the hinged door panel are made of medium density fiber boards. It is resistance to termite and wood borer",
    ],
    inStock: 15,
    eta: 50,
    id: "f3",
    rating: 4,
    reviews: [
      {
        name: "Ram",
        title: "Very Nice",
        content:
          "I was having a hard time finding a king size bed which looks sleek and is in my budget this really ticks all the corners and I am not disappointed.",
        rating: 5,
      },
      {
        name: "Mohan",
        title: "Disappointed",
        content:
          "The quality of wood is not that great. The colour and the wood started peeling after few months of use",
        rating: 2,
      },
      {
        name: "Komodo",
        title: "Gets the Job Done",
        content: "OK and good",
        rating: 4,
      },
    ],
  },
  {
    Type: "Sofas",
    title: "Home Centre Emily Fabric 5 Seater Sectional Sofa Set (Beige)",
    category: "Furniture",
    price: 32899,
    imgs: [
      "/data/images/sofa1.jpg",
    ],
    specs: [
      "Seating Capacity: Five Seat",
      "Seat filling: Foam with spring",
      "Item Dimensions: Length (184 cm), Width (92 cm), Height (88 cm)",
      "Material: Engineered Wood, Fabric and Polyester",
      "Warranty: 1 year on product",
    ],
    inStock: 11,
    eta: 50,
    id: "f4",
    rating: 4.3,
    reviews: [
      {
        name: "Vinit",
        title: "Good product as described",
        content: `The packaging was sturdy, secure and the delivery guys were very couteous and polite and helped getting the sofa on first floor. The installation was quick and sofa is sturdy, no creeeks or sound, cushions are comfortable as as prescribed in dimensions.`,
        rating: 4,
      },
      {
        name: "Chota Lakshit",
        title: "Sofa is too good but unfortunately the sevice is worst.",
        content: `Sofa is too good but unfortunately the sevice is worst.
        Service people broke 1 leg while fixing legs and did not replaced it with new one and now my one sofa is useless with 3 legs. They also behaved very rudely.`,
        rating: 4,
      },
      {
        name: "Sigma Male Soap",
        title: "Comfort wise not good and aesthetically good product",
        content: "but good...",
        rating: 4,
      },
    ],
  },
  {
    Type: "Wardrobes",
    title: "Solimo Pyxis Engineered Wood Wardrobe Mahogany, 2 Doors",
    category: "Furniture",
    price: 9089,
    imgs: [
      "/data/images/wardrobe1.jpg",
    ],
    specs: [
      "Seating Capacity: Five Seat",
      "Seat filling: Foam with spring",
      "Item Dimensions: Length (184 cm), Width (92 cm), Height (88 cm)",
      "Material: Engineered Wood, Fabric and Polyester",
      "Warranty: 1 year on product",
    ],
    inStock: 18,
    eta: 35,
    id: "f5",
    rating: 3.7,
    reviews: [
      {
        name: "M.D. Luffy",
        title: "Misleading picture of the product.",
        content:
          "I thought it would be able to keep all the food I capture from sea but it couldnt, Smaller than it looks",
        rating: 2,
      },
      {
        name: "Sad Customer",
        title: "Damaged product",
        content:
          "Damaged product. Asked for replacement but no one is replying properly to my mails.",
        rating: 1,
      },
      {
        name: "Yash K",
        title: "Good Value",
        content: "It is quality stuff. Good value for spend.",
        rating: 4,
      },
    ],
  },
  {
    For: "Students",
    Brand: "HP",
    RAM: "8 GB",
    Processor: "AMD",
    DisplaySize: "15.6",
    HasSSD: "No",
    title:
      "HP 15 (2021) Thin & Light Ryzen 3-3250 Laptop, 8 GB RAM, 1TB HDD, 39.62 cms (15.6`) FHD Screen, Windows 10, MS Office (15s-gr0011AU)",
    category: "Laptops",
    price: 37590,
    imgs: [
      "/data/images/studentLaptophp1.jpg",
      "/data/images/studentLaptophp2.jpg",
    ],
    specs: [
      "Display: 15.6-inch FHD (1920 x 1080), IPS, micro-edge, anti-glare, 250 nits, 45% NTSC",
      "Processor: AMD ‎Ryzen 3",
      "Processor Speed: ‎2.6 GHz",
      "RAM Size: ‎8 GB",
      "Hard Drive Size: 1 TB",
      "Graphics Chipset: AMD Radeon Vega 6 Graphics",
      "Operating System: ‎Windows 10 Home",
    ],
    inStock: 11,
    eta: 120,
    id: "l1",
    rating: 3.8,
    reviews: [
      {
        name: "Swag",
        title: "I really liked this product 👍",
        content:
          "After seeing the reviews I was confused. But I decided to go for this and it got delivered within 1 day. I really liked this product. Looks premium, built quality is also good and also fast. It's a good laptop under 36k. As of now, this is my review and if there will be any issue, will let you know.",
        rating: 5,
      },
      {
        name: "Himanshu Karkhanis",
        title: "Reasonable performance so far (it is only 3 days)",
        content:
          "Firstly for the correct information of all potential buyers - I have had a good experience of HP laptops. Secondly i had budget constraints (below 35k)... so I had to go for one with only HDD, not SSD. I would have loved hybrid types as those work excellent. Thus I opted for this laptop with no SSD, only 1TB HDD, however i preferred 8GB RAM... it has been 3 days and we have been using it for Zoom long meetings..and general surfing (no multimedia use yet). So far there are no visible issues. The fan sometimes gives out a slight burning smell and I assume it is because the circuitry is new... I shall monitor for more days and give another review on this. The laptop's nice feature is the CORTANA support by which windows got configured smoothly, with little intervention. it did take lot of time to boot initially, but now boots up fine.... Havent faced any sound or heat issues yet. Screen output quality could have been better..... to get the optimum brightness you have to raise the brightness to almost the limit. Sound output is not that great..... so far so good. will post again after a month of use.",
        rating: 4,
      },
      {
        name: "Shantanu Verma",
        title: "Decent laptop, good customer support during setup",
        content:
          "I purchased GR0011AU (1TB HDD no SSD, Ryzen 3 3250). Economical Laptop with decent performance. Battery backup around 5.5 to 6 hrs on streaming video via wifi and general browsing. I avoided purchasing extended warranty online. Instead buy from the HP helpline (number attached in photo). Registration and setup of MS Office Home and Student 2019 is tricky as the laptop has Office 365 installed as default. This (365) has to be uninstalled and the Office H&S 2019 image (3.5GB) has to be downloaded and set up. I am doing it all through the HP helpline and they are helpful.. Overall decent/good laptop for my basic requirements and very good customer support, atleast during setup.",
        rating: 4,
      },
    ],
  },
  {
    For: "Travel",
    Brand: "Dell",
    RAM: "4 GB",
    Processor: "Intel",
    DisplaySize: "15.6",
    HasSSD: "Yes",
    title:
      "Dell Inspiron 3501 15.6` FHD Display Laptop (i3-1115G4 / 4GB / 256GB SSD / Integrated Graphics / Win10 + MSO / Accent Black)",
    category: "Laptops",
    price: 38890,
    imgs: [
      "/data/images/travelLaptop1.jpg",
      "/data/images/travelLaptop2.jpg",
    ],
    specs: [
      "Processor:11th Generation Intel Core i3-1115G4 Processor (6MB Cache, up to 4.1 GHz)",
      "Memory & Storage: 4GB, 4Gx1, DDR4, 2666MHz | 256GB M.2 PCIe NVMe Solid State Drive",
      "Display: 15.6-inch FHD (1920 x 1080) Anti-glare LED Backlight Narrow Border WVA Display",
      "Graphics: Intel UHD Graphics with shared graphics memory",
      "Operating System & Software: Windows 10 Home Single Language | Microsoft Office Home and Student 2019",
      "I/O ports: USB 3.2 Gen 1 (x2), USB2.0 (x1), HDMI 1.4(x1),One SD-card slot ,RJ45 - 10/100Mbps",
    ],
    inStock: 19,
    eta: 180,
    id: "l2",
    rating: 4.3,
    reviews: [
      {
        name: "Adesh Gaurav",
        title: "Very good DELL laptop",
        content:
          "I got a nice and genuine DELL laptop. It is working and is in good condition. Very much happy with my purchase. For the reference I bought it from LOWEST PRICE SHOP seller.",
        rating: 5,
      },
      {
        name: "Deepak",
        title:
          "This laptop very good sceen and display quality is very nice and keyboard quality is very good",
        content:
          "Screen quality very nice, battery is good and camera quality is some good, I am perchase this laptop office work",
        rating: 4,
      },
    ],
  },
  {
    For: "Coding",
    Brand: "Lenovo",
    RAM: "8 GB",
    Processor: "Intel",
    DisplaySize: "15.6",
    HasSSD: "Yes",
    title:
      "Lenovo IdeaPad Slim 3 10th Gen Intel Core i5 15.6` (39.62cms) Full HD IPS Thin and Light Laptop (8GB/512GB SSD/Windows 10/MS Office 2019/Fingerprint Reader/Platinum Grey/1.85Kg)",
    category: "Laptops",
    price: 57200,
    imgs: [
      "/data/images/codingLaptop1.jpg",
    ],
    specs: [
      "Processor: 10th Gen Intel Core i5-1035G1 | Speed: 1.0 GHz (Base) - 3.6 GHz (Max) | 4 Cores | 6MB Cache",
      "OS: Pre-Loaded Windows 10 Home with Lifetime Validity",
      "Pre-Installed: MS Office Home and Student 2019",
      "Memory and Storage: 8GB RAM DDR4-2666, Upgradable up to 12GB | 512 GB SSD",
      "Display: 15.` Full HD (1920x1080) | Brightness: 250 nits | Anti-Glare | IPS Technology",
      "Design: 1.99 cm Thin and 1.85 kg Light | Narrow Bezel | Fingerprint Reader",
      "Battery Life: 6 Hours | Rapid Charge (Up to 80% in 1 Hour)",
    ],
    inStock: 29,
    eta: 60,
    id: "l3",
    rating: 4.3,
    reviews: [
      {
        name: "Sushabhan Biswas",
        title: "Good Product in a Handsome Budget, but Battery not so strong.",
        content: `I have been using this Product for 2 weeks. The Pros & Cons are following:
            Pros: 1. System speed is very fast, as 7.75 gb is usable RAM.
            2. Slim fit & good outlook as well.
            Cons:
            1. Battery drains too fast, battery power not really good.
            2. Adapter size is too short, this creates problem while charging from a socket which is little bit away.
            Apart from the upper points, also check the warranty window after buying it, as for my case, I have to mail to Lenovo for updating my Warranty details (It was not updated properly).`,
        rating: 4,
      },
      {
        name: "Sésh",
        title:
          "Good purchase, overall; and a few points I do hope they use to make improvements",
        content: `Found this laptop to be v sleek, overall.
            Like the keyboard (find the keys to be softer than most other laptop keyboards; more 'pleasant'? for typing, relatively speaking, though not quite as pleasant as it is w a MacBookPro).
            Like the way the touchpad has been positioned slightly to the left.
            Also like the fingerprint sensor doubling up as the power on/off button.
            Front-facing cam quality also relatively good, along with wide coverage of (user) background.
            
            Would have preferred more RAM along with the whole pkg.
            Would have preferred more SSD storage space for this budget.
            
            Budget-wise, feel this is priced up by about 20%, and I think that it will sell more units if Lenovo brings it down accordingly.
            
            Overall, defn a good buy, and I'd recommend it for anyone who wants this config of laptop for their business/home purposes.`,
        rating: 4,
      },
    ],
  },
  {
    popular: true,
    For: "Gaming",
    Brand: "Asus",
    RAM: "16 GB",
    Processor: "AMD",
    DisplaySize: "14",
    HasSSD: "Yes",
    title:
      "ASUS ROG Zephyrus G14, 14` (35.56 cms) QHD, Ryzen 9 4900HS, GTX 1660Ti Max-Q 6GB GDDR6 Graphics, Gaming Laptop (16GB/1TB SSD/MS Office 2019/Windows 10/ White/Anime Matrix/1.7 Kg)",
    category: "Laptops",
    price: 111990,
    imgs: [
      "/data/images/gamingLaptop1.jpg",
      "/data/images/gamingLaptop2.jpg",
    ],
    specs: [
      "Processor: AMD Ryzen 9 4900HS Processor, 3.0 GHz (8MB Cache, up to 4.3 GHz, 8 Cores, 16 Threads)",
      "Memory: 16GB (2x 8GB) DDR4 3200MHz Dual-Channel RAM, Upgradeable up to 24GB using 1x SO-DIMM Slot",
      "Storage: 1TB M.2 NVMe PCIe 3.0 SSD",
      "Graphics: Dedicated NVIDIA GeForce GTX 1660Ti Max-Q GDDR6 6GB VRAM",
      "Display: 14-inch (16:9) QHD (2560x1440), 300 nits Brightness, Anti-Glare IPS-level panel, 100% sRGB, Pantone Validated, Adaptive sync, 85% screen-to-body ratio",
      "Software Included: Pre-installed MS Office Home and Student 2019 | Operating System: Pre-loaded Windows 10 Home (64bit) with lifetime validity",
      "Design & battery: NanoEdge bezels | Metallic Body | with AniMe Matrix display| 6,536 CNC Milled Dot Matrix Design| Honeycomb Reinforcement Chassis | Thin and Light Laptop| 19.9mm Thin | Laptop Weight: 1.70 Kg | 76WHrs, 4-cell Lithium-Polymer Battery",
    ],
    inStock: 9,
    eta: 270,
    id: "l4",
    rating: 4.4,
    reviews: [
      {
        name: "Abhinav Mehta",
        title: "Great Laptop, you can go for it, but …",
        content: `I am facing no issues as of now, a great laptop.
          Pros :- High performance, thanks to Ryzen 9, Graphics card can handle any game (I played GTA V, and also screen recorded it, screen recording didn’t lag, and I like that), I liked the AniMe Matrix, a great part of the laptop, and the armoury crate. No issue in my Backlit keyboard.
          
          Cons :- No webcam (ASUS should have added a webcam at such a high price point)
          Gets heated quickly, but is manageable, and no other issue.
          No Ethernet port (ASUS, what the heck is wrong with you? I mean, seriously, majority of Laptops have Ethernet port 😂😂)
          
          Overall, a great purchase. Will update the review after a month’s usage, with some pics.
          `,
        rating: 4,
      },
      {
        name: "Jothi",
        title: "Not good quality",
        content: `Very disappointed to let you all know that keyboard button came out within a month of purchase`,
        rating: 2,
      },
    ],
  },
  {
    popular: true,
    For: "Content Creation",
    Brand: "Apple",
    RAM: "16 GB",
    Processor: "Intel",
    DisplaySize: "16",
    HasSSD: "No",
    title:
      "Apple MacBook Pro 2019 (16-inch/40.65 cm, 16GB RAM, 1TB Storage, 2.3GHz 9th Gen Intel Core i9) - Space Grey",
    category: "Laptops",
    price: 215490,
    imgs: [
      "/data/images/appleLaptop1.jpg",
      "/data/images/appleLaptop2.jpg",
    ],
    specs: [
      "Processor: Ninth-generation 8-core Intel Core i9 processor",
      "Memory: Stunning 40.65cm (16-inch) Retina display with True Tone technology",
      "Storage: 1TB M.2 NVMe PCIe 3.0 SSD",
      "Graphics: AMD Radeon Pro 5500M graphics with GDDR6 memory",
      "Display: Stunning 40.65cm (16-inch) Retina display with True Tone technology",
      "Battery: Up to 11 hours of battery life",
    ],
    inStock: 2,
    eta: 30,
    id: "l5",
    rating: 4.3,
    reviews: [
      {
        name: "Venkateesh",
        title: "Excellent Product from Apple",
        content: `After 3yrs of problems with Butterfly keyboard & Thermal Problem with Corei9 Apple Finally fixed those loop holes in this Model. It's almost perfect. Good for Professional use. I'm Little disappointed with Apple though., because there s no customization available for India. I hope In future they will introduce it. About the Product 5 Star Solid.
          I already own a MacBook Pro Mid 2012 still kicking. I always love quality products that apple delivery. Thanks`,
        rating: 5,
      },
      {
        name: "Vamsi Krishna",
        title: "Not a great laptop from Apple",
        content: `Writing this review after using for more than 8 months . Everything is very nice in performance except the below things
          1. It's heating excessively with in 5 to 10 minutes of opening (just for playing a song in youtube with full volume the temperature is as high as 85 to 98 degrees)
          2. charging is disintegrating very fast (in cases like when you are doing some work on something like AutoDesk & simultaneously if a browser is running --- only for 2 apps running charge disintegration shouldn’t happen right)
          3. some times it's beach-balling even it's having octa core & 16 GB RAM`,
        rating: 4,
      },
    ],
  },
];

module.exports = { categories, products };
