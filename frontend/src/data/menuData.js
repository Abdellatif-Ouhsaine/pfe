export const menuData = [
  {
    id: "pizza",
    name: "Pizzas",
    items: [
      {
        id: "pizza-1",
        name: "Farm House Xtreme Pizza",
        description: "Tomato sauce, mozzarella, mushrooms, onions, green peppers, black olives, and fresh tomatoes.",
        image: "/placeholder.svg?height=200&width=200",
        popular: true,
        sizes: [
          { size: "Small", price: 12.99 },
          { size: "Medium", price: 14.99 },
          { size: "Large", price: 16.99 },
        ],
      },
      {
        id: "pizza-2",
        name: "Pizza Margherita",
        description:
          "Classic pizza with tomato sauce, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
        image: "/placeholder.svg?height=200&width=200",
        popular: true,
        sizes: [
          { size: "Small", price: 10.99 },
          { size: "Medium", price: 12.99 },
          { size: "Large", price: 14.99 },
        ],
      },
      {
        id: "pizza-3",
        name: "Pepperoni Pizza",
        description: "Tomato sauce, mozzarella cheese, and pepperoni. A classic favorite for meat lovers.",
        image: "/placeholder.svg?height=200&width=200",
        popular: true,
        sizes: [
          { size: "Small", price: 11.99 },
          { size: "Medium", price: 13.99 },
          { size: "Large", price: 15.99 },
        ],
      },
      {
        id: "pizza-4",
        name: "Veggie Supreme",
        description: "Tomato sauce, mozzarella, bell peppers, onions, mushrooms, black olives, and fresh tomatoes.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Small", price: 12.99 },
          { size: "Medium", price: 14.99 },
          { size: "Large", price: 16.99 },
        ],
      },
      {
        id: "pizza-5",
        name: "Meat Lovers",
        description: "Tomato sauce, mozzarella, pepperoni, ham, bacon, and Italian sausage.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Small", price: 13.99 },
          { size: "Medium", price: 15.99 },
          { size: "Large", price: 17.99 },
        ],
      },
      {
        id: "pizza-6",
        name: "Hawaiian Pizza",
        description: "Tomato sauce, mozzarella, ham, and pineapple. A sweet and savory combination.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Small", price: 11.99 },
          { size: "Medium", price: 13.99 },
          { size: "Large", price: 15.99 },
        ],
      },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    items: [
      {
        id: "burger-1",
        name: "Classic Cheeseburger",
        description: "Beef patty, cheddar cheese, lettuce, tomato, onion, pickles, and special sauce.",
        image: "/placeholder.svg?height=200&width=200",
        popular: true,
        sizes: [
          { size: "Regular", price: 9.99 },
          { size: "Double", price: 12.99 },
        ],
      },
      {
        id: "burger-2",
        name: "Bacon Burger",
        description: "Beef patty, bacon, cheddar cheese, lettuce, tomato, and mayo.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Regular", price: 10.99 },
          { size: "Double", price: 13.99 },
        ],
      },
      {
        id: "burger-3",
        name: "Veggie Burger",
        description: "Plant-based patty, lettuce, tomato, onion, pickles, and vegan mayo.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Regular", price: 8.99 },
          { size: "Double", price: 11.99 },
        ],
      },
      {
        id: "burger-4",
        name: "Mushroom Swiss Burger",
        description: "Beef patty, sautéed mushrooms, Swiss cheese, and garlic aioli.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Regular", price: 10.99 },
          { size: "Double", price: 13.99 },
        ],
      },
    ],
  },
  {
    id: "plats",
    name: "Plats",
    items: [
      {
        id: "plat-1",
        name: "Spaghetti Bolognese",
        description: "Spaghetti pasta with rich meat sauce, topped with Parmesan cheese.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Regular", price: 12.99 },
          { size: "Large", price: 15.99 },
        ],
      },
      {
        id: "plat-2",
        name: "Chicken Alfredo",
        description: "Fettuccine pasta with creamy Alfredo sauce and grilled chicken.",
        image: "/placeholder.svg?height=200&width=200",
        popular: true,
        sizes: [
          { size: "Regular", price: 13.99 },
          { size: "Large", price: 16.99 },
        ],
      },
      {
        id: "plat-3",
        name: "Lasagna",
        description: "Layers of pasta, meat sauce, and cheese, baked to perfection.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Regular", price: 14.99 },
          { size: "Large", price: 17.99 },
        ],
      },
    ],
  },
  {
    id: "salads",
    name: "Salads",
    items: [
      {
        id: "salad-1",
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Small", price: 6.99 },
          { size: "Large", price: 9.99 },
        ],
      },
      {
        id: "salad-2",
        name: "Greek Salad",
        description: "Mixed greens, tomatoes, cucumbers, red onions, olives, and feta cheese.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Small", price: 7.99 },
          { size: "Large", price: 10.99 },
        ],
      },
      {
        id: "salad-3",
        name: "Garden Salad",
        description: "Mixed greens, tomatoes, cucumbers, carrots, and your choice of dressing.",
        image: "/placeholder.svg?height=200&width=200",
        popular: false,
        sizes: [
          { size: "Small", price: 5.99 },
          { size: "Large", price: 8.99 },
        ],
      },
    ],
  },
]
