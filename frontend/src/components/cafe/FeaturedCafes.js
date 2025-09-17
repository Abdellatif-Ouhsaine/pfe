import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function FeaturedCafes() {
  const featuredBrands = [
    {
      id: 1,
      name: "Starbucks",
      tagline: "Premium coffee experience with a wide variety of options",
      image: "https://www.foodandwine.com/thmb/AflPi0n_VwVgDyoHx0woPczJxB8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Starbucks-New-Cortado-Pistachio-Latte-and-Reformulated-Matcha-FT-BLOG1224-b28767a4d8bf4dcab87fc5f8321fff47.jpg",
    },
    {
      id: 2,
      name: "Dunkin'",
      tagline: "America runs on Dunkin' - coffee and donuts for everyone",
      image: "https://media.istockphoto.com/id/1962564578/fr/photo/logo-dunkin-donuts-sur-un-fast-food-%C3%A0-dortmund-dd-ou-dunkin-donuts-est-une-cha%C3%AEne-de.jpg?s=612x612&w=0&k=20&c=HyKjLkPWVXvfchf7mDfdwyVUL9MmwhK-K0OloH_ey5Y=",
    },
    {
      id: 3,
      name: "Peet's Coffee",
      tagline: "Handcrafted coffee since 1966 with rich flavors",
      image: "https://cdn.vox-cdn.com/thumbor/OGfZ7QsTPbjbSBIt5QphP1AjsFI=/0x0:925x597/1200x800/filters:focal(362x224:510x372)/cdn.vox-cdn.com/uploads/chorus_image/image/59074209/Peet_s_Coffee_Summerlin.0.jpg",
    },
    {
      id: 4,
      name: "Tim Hortons",
      tagline: "Always fresh coffee and baked goods, a Canadian favorite",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/e4/31/f3/tim-horton-s-181-toronto.jpg?w=900&h=500&s=1",
    },
  ]

  const [cafes, setCafes] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cafes/brandes")
      .then((response) => {
        setCafes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des cafés :", error);
      });
  }, []);

  return (
    <div className="featured-brands-block">
      <h2 className="block-title">Featured Coffee Brands</h2>
      <div className="brands-display-grid">
        {cafes?.map((brand) => (
          <div className="brand-display-item" key={brand.id} onClick={()=>navigate(`/Cafe/${brand.id}`)}>
            <div className="brand-img-wrapper">
              <img src={`http://localhost:8000/storage/${brand.logo}`} alt={brand.name} className="brand-thumbnail" />
            </div>
            <div className="brand-text-content">
              <h3 className="brand-display-name">{brand.name}</h3>
              <p className="brand-display-desc">{brand.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCafes
