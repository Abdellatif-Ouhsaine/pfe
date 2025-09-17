import { useEffect, useState } from "react";
import "./RestaurantCafe.css";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const RestaurantCafe = () => {
   const { addToCart , cartItems } = useCart()

  const [restaurants,setrestaurant] = useState([]) ;
  const [allPromotions, setAllPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate() ;
  useEffect(() => {
    //restaurent et cafe
    axios.get("http://localhost:8000/api/restaurants")
      .then((res) => {
        setrestaurant(res.data);
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
      });

    //best promtion
    axios.get('http://localhost:8000/api/best-promotions-and-categories')
      .then(res => {
        setAllPromotions(res.data.menus);
        setCategories(res.data.categories);
        setFilteredPromotions(res.data.menus); // affichage par défaut : tout
      })
      .catch(err => console.error("Erreur fetch promos:", err));
  }, []);

  //applic filtre
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredPromotions(allPromotions);
    } else {
      const filtered = allPromotions.filter(menu => menu.category === selectedCategory);
      setFilteredPromotions(filtered);
    }
  }, [selectedCategory, allPromotions]);

  // Promotion data
  const promotions = [
    {
      id: 1,
      name: "Royal Burger",
      restaurant: "Restaurant",
      image: "/placeholder.svg?height=200&width=300",
      discount: "20%",
    },
    {
      id: 2,
      name: "Tasty Tacos",
      restaurant: "",
      image: "/placeholder.svg?height=200&width=300",
      discount: "20%",
    },
    {
      id: 3,
      name: "Friterie Yellow Fries",
      restaurant: "",
      image: "/placeholder.svg?height=200&width=300",
      discount: "20%",
    },
  ];

  // Categories data
    const categories = Array.from(
    new Set(
      restaurants
        .map((r) => r.cuisine_type)
        .filter((type) => type && type.trim() !== "")
    )
  );
  
  // Filter options
  const filterOptions = [
    "Coffe",
    "Traditional food",
    "Pizza & fast food",
    "others",
  ];

  return (
    <div className="restaurant-cafe1">
      {/* Best Promotion Section */}
      <section className="promotion-section">
        <div className="section-header">
          <h2 className="section-title">Best Promotion %</h2>
          <div className="filter-options1">
        <button
          className={`filter-option1 ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {Categories.map((category, index) => (
          <button
            key={index}
            className={`filter-option1 ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
          </div>
        </div>

      <div className="promotion-cards">
        {filteredPromotions.map(promo => (
          <div className="promotion-card" key={promo.id}>
            <div className="promotion-image">
              <img src={`http://localhost:8000/storage/${promo.image}`} alt={promo.name} />
             <span className="discount-tag">-{promo.discount}%</span>
            </div>
          <div className="promotion-info">
              <div className="info-top">
                <span className="restaurant-name">{promo.restaurant?.name || "Unknown"}</span>
                <h3 className="promotion-name">{promo.name}</h3>
                <p className="promotion-price">
                  <span className="old-price" style={{color:"red"}}>{promo.price} $</span>
                  <span className="new-price">{promo.discount
                        ? (promo.price - (promo.price * promo.discount) / 100).toFixed(2)
                        : promo.price}$
                  </span>
                </p>
              </div>
<button
  className="add-to-cart-btn1"
  onClick={() =>
    addToCart({
      id: promo.id,
      name: promo.name,
      image: promo.image,
      price: Number(promo.discount
        ? (promo.price - (promo.price * promo.discount) / 100).toFixed(2)
        : promo.price),
    })
  }
>
  Add to Cart
</button>
            </div>
          </div>
        ))}
        {filteredPromotions.length === 0 && (
          <p>No promotions found in this category.</p>
        )}
      </div>

      </section>

      {/* Popular Categories Section */}
      {/* <section className="categories-section">
        <h2 className="section-title">Our Popular Categories</h2>
        <div className="category-cards">
          {categories?.map((promo) => (
            <div className="category-card1" key={promo.id}>
              <div className="category-image1">
                <img src={promo.image || "/placeholder.svg"} alt={promo.name} />
              </div>
              <div className="category-info">
                {promo.restaurant && (
                  <span className="restaurant-name"></span>
                )}
                <h3 className="category-name">{promo}</h3>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Popular Restaurants Section */}
      <section className="restaurants-section">
        <h2 className="section-title">Popular Restaurants</h2>
        <div className="restaurant-cards" >
          {restaurants.map((restaurant) => (
            <div
              className="restaurant-card1"
              key={restaurant.id}
              style={{ backgroundColor: restaurant.color }}
              onClick={()=>navigate(`/Resto/${restaurant.id}`)}
            >
              <div className="restaurant-image1">
                <img
                  src={`http://localhost:8000/storage/${restaurant.logo}`}
                  alt={restaurant.name}
                />
                
              </div>
              <div className="restaurant-info1">
                <h3 className="restaurant-name">{restaurant.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantCafe;
