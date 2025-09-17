function CoffeeDeals() {
  const deals = [
    {
      id: 1,
      name: "Pumpkin Spice Latte",
      originalPrice: "$4.99",
      discountedPrice: "$3.99",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Maple Cappuccino",
      originalPrice: "$5.99",
      discountedPrice: "$4.49",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Cinnamon Latte",
      originalPrice: "$5.49",
      discountedPrice: "$4.29",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      name: "Caramel Macchiato",
      originalPrice: "$5.99",
      discountedPrice: "$4.79",
      image: "https://via.placeholder.com/300x200",
    },
  ]

  return (
    <div className="deals-wrapper">
      <h2 className="deals-heading">Autumn Coffee Deals</h2>
      <div className="deals-scroll-container">
        {deals.map((deal) => (
          <div className="deal-item" key={deal.id}>
            <img src={deal.image || "/placeholder.svg"} alt={deal.name} className="deal-item-img" />
            <h3 className="deal-item-title">{deal.name}</h3>
            <div className="deal-item-pricing">
              <span className="deal-old-price">{deal.originalPrice}</span>
              <span className="deal-new-price">{deal.discountedPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoffeeDeals
