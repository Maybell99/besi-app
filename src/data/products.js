const products = [
  {
    id: 1,
    name: "Millet & Groundnut Mix",
    description: "Our signature nutritious blend of millet and groundnut, perfect for a quick and healthy snack.",
    price: 25.99,
    image: "/images/millet-groundnut-mix.jpg",
    category: "signature",
    featured: true,
    inStock: true,
    nutritionalInfo: {
      calories: 180,
      protein: "8g",
      carbs: "22g",
      fat: "9g",
      fiber: "4g"
    }
  },
  {
    id: 2,
    name: "Millet Crunch Bars",
    description: "Crunchy bars made with millet and groundnut, perfect for on-the-go energy.",
    price: 15.99,
    image: "/images/millet-bars.jpg",
    category: "bars",
    featured: true,
    inStock: true,
    nutritionalInfo: {
      calories: 150,
      protein: "6g",
      carbs: "18g",
      fat: "7g",
      fiber: "3g"
    }
  },
  {
    id: 3,
    name: "Groundnut Energy Bites",
    description: "Bite-sized energy boosters made with premium groundnuts and a touch of honey.",
    price: 18.99,
    image: "/images/groundnut-bites.jpg",
    category: "bites",
    featured: false,
    inStock: true,
    nutritionalInfo: {
      calories: 120,
      protein: "5g",
      carbs: "12g",
      fat: "8g",
      fiber: "2g"
    }
  },
  {
    id: 4,
    name: "Millet Breakfast Cereal",
    description: "Start your day right with our nutritious millet-based breakfast cereal.",
    price: 22.99,
    image: "/images/millet-cereal.jpg",
    category: "breakfast",
    featured: true,
    inStock: true,
    nutritionalInfo: {
      calories: 160,
      protein: "7g",
      carbs: "25g",
      fat: "4g",
      fiber: "5g"
    }
  },
  {
    id: 5,
    name: "Groundnut Butter",
    description: "Pure, creamy groundnut butter with no additives. Perfect for spreading or cooking.",
    price: 19.99,
    image: "/images/groundnut-butter.jpg",
    category: "spreads",
    featured: false,
    inStock: true,
    nutritionalInfo: {
      calories: 190,
      protein: "8g",
      carbs: "6g",
      fat: "16g",
      fiber: "2g"
    }
  },
  {
    id: 6,
    name: "Millet & Fruit Mix",
    description: "Our millet blend with dried fruits for a sweet and nutritious snack option.",
    price: 27.99,
    image: "/images/millet-fruit.jpg",
    category: "signature",
    featured: false,
    inStock: true,
    nutritionalInfo: {
      calories: 170,
      protein: "6g",
      carbs: "28g",
      fat: "6g",
      fiber: "5g"
    }
  }
];

export default products;