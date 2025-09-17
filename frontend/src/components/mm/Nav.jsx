import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cart from "../Cart";
import { useCart } from "../../context/CartContext";


function Nav() {
  const { cartItems,getCartTotal} =useCart();
  const location = useLocation();
  const navigate = useNavigate();

  //cart
    const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  }
  //user
  const id = JSON.parse(localStorage.getItem('user')).id ; 

  const [client, setClient] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");

  const [orders, setOrders] = useState([]);

  //reservation
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:8000/api/reservations/user/${id}`)
      .then(response => {
        setReservations(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      });

      //orders 
     axios.get(`http://localhost:8000/api/orders/user/${id}`)
    .then((res) => setOrders(res.data))
    .catch((err) => console.error("Error fetching orders", err));

  }, [id]);

//camcel reservation
const cancelReservation = async (reservationId, setReservations) => {
  try {
    await axios.patch(`http://localhost:8000/api/reservations/${reservationId}/cancel`);
    setReservations((prev) =>
      prev.map((r) =>
        r.reservation_id === reservationId ? { ...r, status: "Cancelled" } : r
      )
    );
  } catch (error) {
    console.error("Erreur lors de l'annulation :", error);
    alert("Échec de l'annulation de la réservation.");
  }
};

//cancel order
const cancelOrder = async (orderId) => {
  try {
    await axios.put(`http://localhost:8000/api/orders/${orderId}/cancel`);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "Cancelled" } : o
      )
    );
  } catch (err) {
    console.error("Failed to cancel order:", err);
    alert("Cancellation failed.");
  }
};

//edit profile
const saveProfileChanges = async () => {
  const updatedClient = {
    ...client,
    name: editedName,
    address: editedAddress,
  };

  try {
    const res = await axios.put(`http://localhost:8000/api/users/${id}`, {
      name: editedName,
      address: editedAddress,
    });

    setClient(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setEditing(false);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du profil :", err);
    alert("Échec de la mise à jour du profil.");
  }
};



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setClient(JSON.parse(storedUser));
    }
  }, []);

  const login = () => {
    navigate("/login");
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const classname = location.pathname;
  if (loading) return <div>Loading reservations...</div>;

  return (
    <div className="nav-container">
      {/* Top bar */}
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="top-bar-inner">
          <div className="username-connect" onClick={() => { setShowProfile(true)}}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea6ccf25faf4f2f3c3606e13f91619c028d4b797"
              alt="Customer"
              className="customer-icon"
            />
            {client?.name}
          </div>

          <div className="location-container">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8340e1509c2efb5e52dd40bc35b05eb89715ef0f"
              alt="Location"
              className="location-icon"
            />
            <div className="address-text">{client?.address}</div>
            <div className="change-location-text">Change Location</div>
          </div>

          <div className="cart-container" onClick={toggleCart} style={{ cursor: "pointer" }}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bc842017100a1a6023df04c46594db19f43f261"
              alt="Shopping Cart"
              className="cart-icon"
            />
            <div className="divider1">{cartItems.length} items</div>
            <div className="divider2">{getCartTotal()} $</div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f870ed0d34f6208963116be66e2e6f292bd4afc9"
              alt="Forward"
              className="forward-icon"
            />
          </div>
        </div>
      </div>

      {/* Conditionally render Cart component here */}
      {showCart && (
  <div className="cart-popup">
    <Cart />
  </div>
      )}
    </div>

      {/* Main navigation */}
      <div className="main-nav">
        <div className="main-nav-content">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a5d380a0467611dcdf499850d30af0ee671d690"
            alt="Logo"
            className="logo"
          />
          <div className="nav-links">
            <div className={classname === "/" ? "nav-link active" : "nav-link"}>
              <Link to="/">Home</Link>
            </div>
            <div className={classname === "/Resto" ? "nav-link active" : "nav-link"}>
              <Link to="/Resto">Restaurants</Link>
            </div>
            <div className={classname === "/Cafe" ? "nav-link active" : "nav-link"}>
              <Link to="/Cafe">Cafe</Link>
            </div>
            {/* <div className="nav-link">Track Order</div> */}
          </div>
          <div className="login-button" onClick={login}>
            Login/Signup
          </div>
        </div>
      </div>

      {/* Profile modal */}
      {showProfile && (
        <div className="profile-overlay">
          <div className="profile-box-glass">
            <div className="profile-header">
              <h2>👤 Profile Overview</h2>
              <div className="close-btn" onClick={toggleProfile}>
                ✕
              </div>
            </div>

            <div className="profile-user-info">
              {editing ? (
                <>
                  <div>
                    <strong>Name:</strong>
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                  <div>
                    <strong>Address:</strong>
                    <input
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                    />
                  </div>
                  <button onClick={saveProfileChanges}>Save</button>

                  <button onClick={() => setEditing(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <div>
                    <strong>Name:</strong> {client?.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {client?.email || "client@email.com"}
                  </div>
                  <div>
                    <strong>Address:</strong> {client?.address}
                  </div>
                  <button
                    onClick={() => {
                      setEditedName(client?.name || "");
                      setEditedAddress(client?.address || "");
                      setEditing(true);
                    }}
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>

            {/* Orders */}
<div className="profile-section">
  <h3>🛒 Recent Orders</h3>
  <table className="profile-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Items</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.items}</td>
          <td>{order.date}</td>
          <td>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
            {order.status === "Pending" && (
              <button onClick={() => cancelOrder(order.id)}>
                Cancel
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            {/* Reservations */}
            <div className="profile-section">
              <h3>📅 My Reservations</h3>
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Restaurant</th>
                    <th>Place</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations?.map((res,id) => (
                    <tr key={res.id}>
                      <td>{id+1}</td>
                      <td>{res.restaurant_name}</td>
                      <td>{res.seating_area_name}</td>
                      <td>{res.reservation_date}</td>
                      <td>{res.reservation_time}</td>
                      <td>
                        <span className={`status ${res.status?.toLowerCase()}`}>
                          {res.status}
                        </span>
                        {res.status === "confirmed" && (
                          <button
                               onClick={() => cancelReservation(res.reservation_id, setReservations)}
                               disabled={res.status === "Cancelled"}
                               style={{
                                 backgroundColor: res.status === "Cancelled" ? "#ccc" : "#f44336",
                                 color: "white",
                                 border: "none",
                                 padding: "8px 12px",
                                 borderRadius: "5px",
                                 cursor: res.status === "Cancelled" ? "not-allowed" : "pointer",
                                 marginLeft: "10px"
                               }}
                             >
                               {res.status === "Cancelled" ? "Cancelled" : "Cancel"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
