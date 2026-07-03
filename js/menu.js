export const CAFE = {
  name: "Rajab's Cafe",
  tagline: "A cozy corner for handcrafted sips",
};

export const MENU_SECTIONS = [
  {
    id: "favourites",
    title: "Our Favourites",
    icon: "⭐",
    description: "Guest-loved signatures, iced and ready.",
    drinks: [
      {
        id: "iced-salted-maple-latte",
        name: "Iced Salted Maple Latte",
        tags: ["iced", "signature"],
        description:
          "Espresso kissed with maple sweetness and a whisper of sea salt. Creamy, cozy, and just a little indulgent — like autumn in a cup.",
      },
      {
        id: "iced-kheer-latte",
        name: "Iced Kheer Latte",
        tags: ["iced", "signature"],
        description:
          "Inspired by classic kheer: cardamom warmth, subtle sweetness, and a silky latte finish. Comforting and nostalgic.",
      },
      {
        id: "iced-thai-tea",
        name: "Iced Thai Tea",
        tags: ["iced", "signature"],
        description:
          "Bold, aromatic Thai tea over ice with creamy sweetness. Spiced, vibrant, and impossible to sip slowly.",
      },
      {
        id: "iced-rooh-afza-matcha",
        name: "Iced Rooh Afza Matcha Latte",
        tags: ["iced", "signature"],
        description:
          "Floral rooh afza meets earthy matcha in a layered iced latte. Sweet, grassy, and beautifully unexpected.",
      },
      {
        id: "iced-earl-gray-hojicha",
        name: "Iced Earl Gray Hojicha Latte",
        tags: ["iced", "signature"],
        description:
          "Toasty hojicha blended with bergamot-kissed Earl Gray. Smoky, citrusy, and elegantly balanced.",
      },
      {
        id: "brazilian-lemonade-fav",
        name: "Brazilian Lemonade",
        tags: ["iced", "signature", "summer"],
        description:
          "Fresh lime with sweetened condensed milk — tangy, creamy, and wildly refreshing. A sunny-day essential.",
      },
    ],
  },
  {
    id: "summer",
    title: "Summer Drinks",
    icon: "🌻",
    description: "Bright, breezy pours for warm afternoons.",
    drinks: [
      {
        id: "brazilian-lemonade",
        name: "Brazilian Lemonade",
        tags: ["iced", "summer"],
        description:
          "Fresh lime with sweetened condensed milk — tangy, creamy, and wildly refreshing.",
      },
      {
        id: "horchata",
        name: "Horchata",
        tags: ["iced", "summer"],
        description:
          "Cinnamon-kissed rice milk over ice. Smooth, lightly sweet, and endlessly sippable.",
      },
      {
        id: "strawberry-agua-fresca",
        name: "Strawberry Agua Fresca",
        tags: ["iced", "summer"],
        description:
          "Blended strawberries with water and a touch of sweetness. Light, fruity, and garden-fresh.",
      },
    ],
  },
  {
    id: "barista",
    title: "Barista Menu",
    icon: "☕",
    description: "Classics and house specialties, hot or iced.",
    drinks: [
      {
        id: "thai-tea",
        name: "Thai Tea",
        tags: ["hot-or-iced"],
        description: "Rich spiced tea with creamy sweetness. A café staple with serious personality.",
      },
      {
        id: "green-thai-tea",
        name: "Green Thai Tea",
        tags: ["hot-or-iced"],
        description: "A lighter Thai tea profile — floral, mellow, and gently sweet.",
      },
      {
        id: "rose-thai-tea",
        name: "Rose Thai Tea",
        tags: ["hot-or-iced"],
        description: "Thai tea elevated with delicate rose notes. Fragrant, pretty, and romantic.",
      },
      {
        id: "chai-tea",
        name: "Chai Tea",
        tags: ["hot-or-iced"],
        description: "Warm spices steeped slow — cinnamon, cardamom, and cozy in every sip.",
      },
      {
        id: "matcha-latte",
        name: "Matcha Latte",
        tags: ["hot-or-iced"],
        description: "Ceremonial-style matcha whisked with milk. Earthy, creamy, and gently energizing.",
      },
      {
        id: "hojicha-latte",
        name: "Hojicha Latte",
        tags: ["hot-or-iced"],
        description: "Roasted green tea latte with nutty, toasty depth. Low caffeine, high comfort.",
      },
      {
        id: "latte",
        name: "Latte",
        tags: ["hot-or-iced"],
        description: "Espresso and steamed milk in perfect harmony. Simple, silky, always right.",
      },
      {
        id: "kheer-latte",
        name: "Kheer Latte",
        tags: ["hot-or-iced"],
        description: "Cardamom and sweetness woven into a creamy latte. Dessert meets coffee.",
      },
      {
        id: "adeni-latte",
        name: "Adeni Latte",
        tags: ["hot-or-iced"],
        description: "Yemeni-inspired spiced tea latte with milk. Warm, aromatic, and deeply comforting.",
      },
    ],
  },
];

export const ADD_ONS = [
  { id: "dirty", name: "Make it Dirty", detail: "+ Espresso shot" },
  { id: "earl-gray-syrup", name: "Earl Gray Syrup", detail: "Bergamot sweetness" },
  { id: "vanilla-syrup", name: "Vanilla Syrup", detail: "Classic & smooth" },
  { id: "rooh-afza-syrup", name: "Rooh Afza Syrup", detail: "Floral & rosy" },
  { id: "buco-pandan-syrup", name: "Buco Pandan Syrup", detail: "Tropical & fragrant" },
  { id: "ube-syrup", name: "Ube Syrup", detail: "Nutty purple yam" },
  { id: "rose-water", name: "Rose Water", detail: "Light floral lift" },
  { id: "coconut-cream", name: "Coconut Cream", detail: "Rich & creamy" },
];

export const COLD_FOAM = [
  { id: "standard", name: "Standard", detail: "Classic sweet cream foam" },
  { id: "matcha", name: "Matcha", detail: "Earthy green foam" },
  { id: "salted-maple", name: "Salted Maple", detail: "Sweet & salty" },
  { id: "jasmine", name: "Jasmine", detail: "Floral & delicate" },
  { id: "thai-tea", name: "Thai Tea", detail: "Spiced & creamy" },
  { id: "ube", name: "Ube", detail: "Purple yam foam" },
];
