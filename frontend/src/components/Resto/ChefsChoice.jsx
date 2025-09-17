import "./ChefsChoice.css"

const chefChoices = [
  {
    id: 1,
    name: "Artisan Pizza Co.",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Hand-crafted pizzas with locally sourced ingredients and traditional techniques. Our chef recommends the Truffle Mushroom special.",
  },
  {
    id: 2,
    name: "Sushi Master",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Authentic Japanese sushi prepared by master chefs with fresh seafood delivered daily. Try the Omakase experience.",
  },
  {
    id: 3,
    name: "Farm to Table",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Seasonal menu featuring organic produce from local farms. Chef's special changes weekly based on the freshest ingredients.",
  },
]

const ChefsChoice = () => {
  return (
    <div className="chefs-choice-section">
      <h2 className="section-title">Chef's Choice</h2>
      <p className="section-description">Curated selections from our culinary experts</p>

      <div className="chefs-choice-container">
        {chefChoices.map((choice) => (
          <div key={choice.id} className="chefs-choice-item">
            <div className="choice-image">
              <img src={choice.image || "/placeholder.svg"} alt={choice.name} />
            </div>
            <div className="choice-info">
              <h3 className="choice-name">{choice.name}</h3>
              <p className="choice-description">{choice.description}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChefsChoice
