export interface Plan {
  id: string;
  name: string;
  type: 'free' | 'individual' | 'student' | 'family' | 'annual' | 'regional' | 'bank' | 'startup' | 'nonprofit' | 'hidden';
  priceMonthly: number;
  originalPriceMonthly?: number;
  billingCycle: 'monthly' | 'yearly' | 'free';
  features: string[];
  isHidden: boolean;
  unlockInstructions?: string[];
  deepLink?: string;
  successRate?: number; // 0-100
  eligibility?: string[];
  whyHidden?: string;
  badge?: 'cheapest' | 'best-value' | 'hidden-deal' | 'student-pick';
}

export interface AppService {
  id: string;
  name: string;
  logo: string;
  category: string;
  plans: Plan[];
  description: string;
}

export const CATEGORIES = [
  { id: "music", name: "Music", icon: "Music" },
  { id: "movies", name: "Movies & TV", icon: "Film" },
  { id: "food", name: "Food Delivery", icon: "Utensils" },
  { id: "ai", name: "AI Tools", icon: "Cpu" },
  { id: "fitness", name: "Fitness", icon: "Activity" },
  { id: "cloud", name: "Cloud Storage", icon: "HardDrive" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2" },
  { id: "education", name: "Education", icon: "GraduationCap" },
  { id: "productivity", name: "Productivity", icon: "CheckSquare" },
  { id: "design", name: "Design", icon: "Palette" },
  { id: "news", name: "News", icon: "Newspaper" },
  { id: "dev", name: "Dev Tools", icon: "Terminal" },
  { id: "health", name: "Health & Meditation", icon: "Heart" },
  { id: "shopping", name: "Shopping", icon: "ShoppingBag" },
  { id: "travel", name: "Travel & Transport", icon: "Plane" },
  { id: "finance", name: "Finance & Investing", icon: "TrendingUp" }
];

export const APP_SERVICES: AppService[] = [
  // MUSIC
  {
    id: "jiosaavn",
    name: "JioSaavn",
    logo: "🎵",
    category: "music",
    description: "Stream high-quality Indian and International music for free or with ad-free JioSaavn Pro.",
    plans: [
      {
        id: "js-free",
        name: "JioSaavn Free",
        type: "free",
        priceMonthly: 0,
        billingCycle: "free",
        features: ["Ad-supported streaming", "80+ million songs", "Low quality audio"],
        isHidden: false
      },
      {
        id: "js-pro-annual",
        name: "Pro Annual",
        type: "annual",
        priceMonthly: 33.25, // 399 / 12
        originalPriceMonthly: 99,
        billingCycle: "yearly",
        features: ["Ad-free music", "Unlimited downloads", "High quality audio (320kbps)", "JioTunes"],
        isHidden: false,
        badge: "cheapest"
      }
    ]
  },
  {
    id: "gaana",
    name: "Gaana",
    logo: "📻",
    category: "music",
    description: "Popular Indian music streaming service featuring latest Bollywood, regional, and international songs.",
    plans: [
      {
        id: "gaana-plus-annual",
        name: "Gaana Plus Annual",
        type: "annual",
        priceMonthly: 12.41, // 149 / 12
        originalPriceMonthly: 99,
        billingCycle: "yearly",
        features: ["Ad-free music", "Unlimited downloads", "HD Quality Audio", "Sync on 5 devices"],
        isHidden: false,
        badge: "cheapest"
      }
    ]
  },
  {
    id: "youtube-music",
    name: "YouTube Music",
    logo: "📺",
    category: "music",
    description: "Stream official albums, singles, remixes, live performances, and music videos.",
    plans: [
      {
        id: "ytm-student",
        name: "Student Plan",
        type: "student",
        priceMonthly: 39,
        originalPriceMonthly: 79,
        billingCycle: "monthly",
        features: ["Ad-free playback", "Background play", "Downloads", "Audio-only mode"],
        isHidden: true,
        whyHidden: "Requires active student verification (.edu or college ID) buried deep in sign-up flow.",
        eligibility: ["Active college student", "Valid institutional email"],
        successRate: 98,
        unlockInstructions: [
          "Go to the YouTube Music student landing page (under 'Other memberships')",
          "Verify your student status via SheerID by uploading an enrollment document or entering your .edu email",
          "Complete signup with 50% discount auto-applied"
        ],
        badge: "student-pick"
      },
      {
        id: "ytm-individual",
        name: "Individual Plan",
        type: "individual",
        priceMonthly: 79,
        billingCycle: "monthly",
        features: ["Ad-free playback", "Background play", "Downloads"],
        isHidden: false
      }
    ]
  },
  {
    id: "spotify",
    name: "Spotify",
    logo: "🟢",
    category: "music",
    description: "World's most popular audio streaming subscription service with millions of songs and podcasts.",
    plans: [
      {
        id: "spotify-student",
        name: "Spotify Student",
        type: "student",
        priceMonthly: 59,
        originalPriceMonthly: 119,
        billingCycle: "monthly",
        features: ["Premium music", "Ad-free playback", "Offline downloads", "Play any track"],
        isHidden: true,
        whyHidden: "Requires verifying through third-party portal SheerID, hidden 3 pages deep in checkout options.",
        eligibility: ["Accredited college/university student"],
        successRate: 95,
        unlockInstructions: [
          "Navigate to Spotify Premium pages and click on 'View Plans' at the very bottom",
          "Select 'Student' and log in to your university portal via SheerID",
          "Verification succeeds instantly if portal matches, else upload manual fee receipt"
        ],
        badge: "hidden-deal"
      },
      {
        id: "spotify-individual",
        name: "Spotify Individual",
        type: "individual",
        priceMonthly: 119,
        billingCycle: "monthly",
        features: ["Premium music", "Ad-free", "Offline downloads"],
        isHidden: false
      }
    ]
  },
  {
    id: "apple-music",
    name: "Apple Music",
    logo: "🍎",
    category: "music",
    description: "Ad-free audio streaming service with spatial audio, Dolby Atmos, and curated playlists.",
    plans: [
      {
        id: "am-student",
        name: "Student + Apple TV+",
        type: "student",
        priceMonthly: 49,
        originalPriceMonthly: 99,
        billingCycle: "monthly",
        features: ["Full Apple Music Premium", "Free Apple TV+ Subscription", "Lossless Audio", "Spatial Audio with Dolby Atmos"],
        isHidden: true,
        whyHidden: "Includes a complete Apple TV+ subscription free, which Apple does not actively advertise to prevent cord-cutting cannibalization.",
        eligibility: ["Active university student verified via UNiDAYS"],
        successRate: 92,
        unlockInstructions: [
          "Open Apple Music app or website, choose student tier signup",
          "Authorize through UNiDAYS to verify college attendance",
          "Upon approval, subscription automatically bundles free Apple TV+ access on the same Apple ID"
        ],
        badge: "best-value"
      },
      {
        id: "am-individual",
        name: "Individual Plan",
        type: "individual",
        priceMonthly: 99,
        billingCycle: "monthly",
        features: ["Full Premium access", "Lossless Audio", "Spatial Audio"],
        isHidden: false
      }
    ]
  },

  // MOVIES & TV
  {
    id: "zee5",
    name: "Zee5",
    logo: "📺",
    category: "movies",
    description: "Leading Indian OTT platform for Hindi, regional movies, TV shows, and originals.",
    plans: [
      {
        id: "zee5-annual",
        name: "Zee5 Premium Annual",
        type: "annual",
        priceMonthly: 30.41, // 365 / 12
        originalPriceMonthly: 99,
        billingCycle: "yearly",
        features: ["Full content access", "HD streaming", "2 concurrent screens", "Ad-free"],
        isHidden: false,
        badge: "cheapest"
      }
    ]
  },
  {
    id: "sonyliv",
    name: "SonyLIV",
    logo: "🎭",
    category: "movies",
    description: "Watch live sports, exclusive originals, TV shows, movies and live TV.",
    plans: [
      {
        id: "sonyliv-annual",
        name: "Premium Annual",
        type: "annual",
        priceMonthly: 49.91, // 599 / 12
        originalPriceMonthly: 299,
        billingCycle: "yearly",
        features: ["All movies & shows", "Live Sports (UCL, WWE)", "1080p stream", "2 screens"],
        isHidden: false,
        badge: "best-value"
      }
    ]
  },
  {
    id: "disney-hotstar",
    name: "Disney+ Hotstar",
    logo: "⭐",
    category: "movies",
    description: "Watch Disney, Pixar, Marvel, Star Wars, National Geographic, and live cricket.",
    plans: [
      {
        id: "hotstar-super",
        name: "Super Annual",
        type: "annual",
        priceMonthly: 74.91, // 899 / 12
        originalPriceMonthly: 149,
        billingCycle: "yearly",
        features: ["All content (Movies, Shows, Sports)", "Full HD", "2 devices concurrent"],
        isHidden: false
      }
    ]
  },
  {
    id: "prime-video",
    name: "Amazon Prime Video",
    logo: "📦",
    category: "movies",
    description: "Get Prime Video, Prime Music, free fast shipping, and exclusive shopping deals.",
    plans: [
      {
        id: "prime-youth",
        name: "Prime Youth Offer (50% Off)",
        type: "student",
        priceMonthly: 62.45, // 1499 / 2 / 12
        originalPriceMonthly: 124.91,
        billingCycle: "yearly",
        features: ["Prime Video (4K HDR)", "Prime Music (Ad-free)", "Free 1-day delivery", "Early access sale"],
        isHidden: true,
        whyHidden: "50% cashback given on verification. Hidden in promotional banners within the Amazon App.",
        eligibility: ["Age 18-24 years verified via ID proof"],
        successRate: 97,
        unlockInstructions: [
          "Open Amazon Shopping app, search for 'Youth Offer'",
          "Sign up for full-price Prime Annual or Monthly membership",
          "Upload Aadhar Card/PAN Card + selfie to verify age is between 18 and 24 years within 15 days of signup",
          "50% cashback (up to ₹750) will be credited to Amazon Pay balance instantly"
        ],
        badge: "hidden-deal"
      },
      {
        id: "prime-regular",
        name: "Regular Prime",
        type: "individual",
        priceMonthly: 124.91,
        billingCycle: "yearly",
        features: ["Prime Video", "Prime Music", "Free Delivery"],
        isHidden: false
      }
    ]
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "🔴",
    category: "movies",
    description: "Watch unlimited award-winning Netflix originals, movies, TV shows, and documentaries.",
    plans: [
      {
        id: "netflix-mobile",
        name: "Mobile Plan",
        type: "individual",
        priceMonthly: 149,
        billingCycle: "monthly",
        features: ["1 screen", "SD quality", "Mobile/Tablet only", "Ad-free"],
        isHidden: false
      }
    ]
  },
  {
    id: "apple-tv",
    name: "Apple TV+",
    logo: "",
    category: "movies",
    description: "Award-winning Apple Original series and movies, from spectacular dramas to star-studded comedies.",
    plans: [
      {
        id: "appletv-individual",
        name: "Individual Plan",
        type: "individual",
        priceMonthly: 99,
        billingCycle: "monthly",
        features: ["4K HDR Dolby Vision", "Family sharing up to 5 members", "Ad-free originals", "Offline downloads"],
        isHidden: false
      }
    ]
  },

  // FOOD DELIVERY
  {
    id: "swiggy-one",
    name: "Swiggy One",
    logo: "🧡",
    category: "food",
    description: "Unlimited free deliveries and extra discounts on Swiggy Food, Instamart, and Dineout.",
    plans: [
      {
        id: "swiggy-standard",
        name: "Standard Membership",
        type: "individual",
        priceMonthly: 299,
        billingCycle: "monthly",
        features: ["Free delivery from food restaurants within 10km", "Free delivery on Instamart (>₹199)", "Extra 30% off Dineout"],
        isHidden: false
      }
    ]
  },
  {
    id: "zomato-gold",
    name: "Zomato Gold",
    logo: "❤️",
    category: "food",
    description: "Unlock free deliveries, VIP access, and up to 40% off dining out across thousands of restaurants.",
    plans: [
      {
        id: "zomato-gold-hdfc",
        name: "Zomato Gold HDFC Exclusive",
        type: "bank",
        priceMonthly: 33, // 99 for 3 months
        originalPriceMonthly: 99,
        billingCycle: "monthly",
        features: ["Free delivery (>₹199, up to 10km)", "No surge fee", "Up to 30% extra off on restaurants", "VIP dining privileges"],
        isHidden: true,
        whyHidden: "Exclusive tie-up partnership page. Requires specific credit cards and checking the partner section in the HDFC PayZapp app.",
        eligibility: ["HDFC Credit/Debit card holder", "Claimed via HDFC rewards page"],
        successRate: 88,
        unlockInstructions: [
          "Open HDFC PayZapp or SmartBuy portal",
          "Go to 'Vouchers' or 'Partner Rewards' and find Zomato Gold offer",
          "Pay ₹99 for a 3-month membership voucher using HDFC card (normal is ₹299)",
          "Redeem the voucher code in the Zomato app under 'Claim Gift Card'"
        ],
        badge: "hidden-deal"
      }
    ]
  },
  {
    id: "blinkit-pass",
    name: "Blinkit Pass",
    logo: "💛",
    category: "food",
    description: "Get massive savings and guaranteed free delivery on grocery delivery items from Blinkit.",
    plans: [
      {
        id: "blinkit-pass-standard",
        name: "Super Pass",
        type: "individual",
        priceMonthly: 49,
        billingCycle: "monthly",
        features: ["Free grocery delivery on orders above ₹199", "Special member prices (save up to 15% on daily essentials)"],
        isHidden: false,
        badge: "cheapest"
      }
    ]
  },

  // DESIGN & GRAPHICS
  {
    id: "adobe-cc",
    name: "Adobe Creative Cloud",
    logo: "🎨",
    category: "design",
    description: "Get 20+ creative apps including Photoshop, Illustrator, Premiere Pro, and Acrobat.",
    plans: [
      {
        id: "adobe-student",
        name: "Adobe CC Student Hack",
        type: "student",
        priceMonthly: 1599,
        originalPriceMonthly: 4230,
        billingCycle: "monthly",
        features: ["20+ creative apps (Photoshop, Illustrator, Premiere, etc.)", "100GB Cloud Storage", "Adobe Fonts library", "Access on 2 active devices"],
        isHidden: true,
        whyHidden: "Adobe hides this massive 60% student discount behind educational portals. Non-students can also get this by enrolling in an online community college class for $5/mo.",
        eligibility: ["Any email ending in .edu, or an official enrollment certificate"],
        successRate: 94,
        unlockInstructions: [
          "Visit Adobe Creative Cloud Plans page",
          "Click the 'Students & Teachers' tab",
          "Sign up with an educational email, or upload a class registration document if verified manually"
        ],
        badge: "hidden-deal"
      }
    ]
  },
  {
    id: "figma",
    name: "Figma",
    logo: "🎛️",
    category: "design",
    description: "The collaborative interface design tool for teams to wireframe, prototype and collaborate.",
    plans: [
      {
        id: "figma-education",
        name: "Figma Professional Education",
        type: "student",
        priceMonthly: 0,
        originalPriceMonthly: 1200, // $15 in INR
        billingCycle: "free",
        features: ["Unlimited files and projects", "Shared library publishing", "Professional collaboration", "Dev Mode access"],
        isHidden: true,
        whyHidden: "Figma gives its standard Pro plan for free to any student or educator, but hides the approval portal deep in their footer links.",
        eligibility: ["High school or college students/instructors"],
        successRate: 99,
        unlockInstructions: [
          "Navigate to figma.com/education",
          "Click 'Apply for Education status' and submit your institution details",
          "Login with student email or upload course syllabus",
          "Approval is granted within 2 minutes and unlocks Figma Pro for 2 years free!"
        ],
        badge: "best-value"
      }
    ]
  },

  // DEV TOOLS
  {
    id: "github",
    name: "GitHub",
    logo: "💻",
    category: "dev",
    description: "Hosting service for software development and version control using Git.",
    plans: [
      {
        id: "github-student-pack",
        name: "GitHub Student Developer Pack",
        type: "student",
        priceMonthly: 0,
        originalPriceMonthly: 800,
        billingCycle: "free",
        features: ["GitHub Pro free while a student", "$200 DigitalOcean credits", "Free Heroku/Railway credits", "GitHub Copilot completely free"],
        isHidden: true,
        whyHidden: "Bundles $10,000+ worth of developer credits and standard Paid Pro features for free, but requires institutional verification.",
        eligibility: ["Valid .edu email or school student ID card"],
        successRate: 96,
        unlockInstructions: [
          "Visit education.github.com/pack",
          "Click 'Get your pack' and verify with your student email",
          "Enable camera access to snap a picture of your physical school ID card if automatic email check fails",
          "GitHub approves in 24-72 hours, unlocking massive free perks across 80+ tools"
        ],
        badge: "best-value"
      }
    ]
  },

  // EDUCATION
  {
    id: "linkedin-learning",
    name: "LinkedIn Learning",
    logo: "💼",
    category: "education",
    description: "Acquire professional skills from industry experts with 16,000+ high-quality video courses.",
    plans: [
      {
        id: "li-library-loophole",
        name: "Library Card Access",
        type: "hidden",
        priceMonthly: 0,
        originalPriceMonthly: 1499,
        billingCycle: "free",
        features: ["Unlimited access to all courses", "Download files and certificates", "Direct progress sync to LinkedIn profile"],
        isHidden: true,
        whyHidden: "A little-known partnership where local municipal libraries fund full subscriptions for citizens. LinkedIn actively keeps this quiet.",
        eligibility: ["A digital or physical card from any partner public library"],
        successRate: 91,
        unlockInstructions: [
          "Search online for 'Municipal library digital library card application'",
          "Sign up online to get a free library card number and PIN instantly",
          "Visit linkedin.com/learning-login/go/share and enter your library card ID and PIN",
          "Access the full platform for ₹0!"
        ],
        badge: "hidden-deal"
      }
    ]
  }
];
