import React, { useState } from 'react';

// Icônes pour la sidebar (simulées avec des caractères Unicode)
const icons = {
  home: '🏠',
  orders: '📋',
  add: '➕',
  chat: '💬',
  settings: '⚙️',
  profile: '👤'
};

function Dashboard() {
  // État pour suivre la vue active
  const [activeView, setActiveView] = useState('dashboard');

  // Fonction pour changer de vue
  const changeView = (view) => {
    setActiveView(view);
  };

  return (
    <div className="dlvr-container">
      {/* Sidebar */}
      <div className="dlvr-sidebar">
        <div className="dlvr-logo-container">
          <span className="dlvr-logo">🚚</span>
        </div>
        <nav className="dlvr-navigation">
          <button 
            className={`dlvr-nav-button ${activeView === 'dashboard' ? 'dlvr-active' : ''}`} 
            onClick={() => changeView('dashboard')}
          >
            <span className="dlvr-icon">{icons.home}</span>
            <span className="dlvr-label">Accueil</span>
          </button>
          <button 
            className={`dlvr-nav-button ${activeView === 'orders' ? 'dlvr-active' : ''}`} 
            onClick={() => changeView('orders')}
          >
            <span className="dlvr-icon">{icons.orders}</span>
            <span className="dlvr-label">Commandes</span>
          </button>
          <button 
            className={`dlvr-nav-button ${activeView === 'add' ? 'dlvr-active' : ''}`} 
            onClick={() => changeView('add')}
          >
            <span className="dlvr-icon">{icons.add}</span>
            <span className="dlvr-label">Ajouter</span>
          </button>
          <button className="dlvr-nav-button">
            <span className="dlvr-icon">{icons.chat}</span>
            <span className="dlvr-label">Chat</span>
          </button>
          <button className="dlvr-nav-button">
            <span className="dlvr-icon">{icons.settings}</span>
            <span className="dlvr-label">Paramètres</span>
          </button>
        </nav>
        <div className="dlvr-profile-container">
          <button className="dlvr-nav-button">
            <span className="dlvr-icon">{icons.profile}</span>
            <span className="dlvr-label">Profil</span>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="dlvr-main">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'add' && <AddDeliveryView />}
        {activeView === 'orders' && <TrackOrderView />}
      </div>
    </div>
  );
}

// Vue du tableau de bord (Dashboard)
function DashboardView() {
  return (
    <div className="dlvr-dashboard">
      <h1 className="dlvr-heading">Welcome back, livreur</h1>
      
      {/* Cartes d'information */}
      <div className="dlvr-stats-grid">
        <div className="dlvr-stat-box">
          <div className="dlvr-stat-header">
            <span className="dlvr-stat-symbol">⚪</span>
            <h3>Status</h3>
          </div>
          <p className="dlvr-stat-info">Available for deliveries</p>
          <div className="dlvr-stat-controls">
            <button className="dlvr-button dlvr-button-red">Go Offline</button>
            <button className="dlvr-button dlvr-button-light">Take Break</button>
          </div>
        </div>
        
        <div className="dlvr-stat-box">
          <div className="dlvr-stat-header">
            <span className="dlvr-stat-symbol">💰</span>
            <h3>Today's Earnings</h3>
          </div>
          <p className="dlvr-stat-info">100 dh</p>
          <div className="dlvr-stat-controls">
            <button className="dlvr-button dlvr-button-green">View Details</button>
          </div>
        </div>
        
        <div className="dlvr-stat-box">
          <div className="dlvr-stat-header">
            <span className="dlvr-stat-symbol">🚚</span>
            <h3>Deliveries</h3>
          </div>
          <p className="dlvr-stat-info">8 completed today</p>
          <div className="dlvr-stat-controls">
            <button className="dlvr-button dlvr-button-green">History</button>
          </div>
        </div>
      </div>
      
      {/* Détails de la commande */}
      <section className="dlvr-panel">
        <h2 className="dlvr-panel-title">Order Details</h2>
        
        <div className="dlvr-details-list">
          <div className="dlvr-detail-item">
            <div className="dlvr-detail-key">
              <span className="dlvr-detail-symbol">🍽️</span>
              <span>Restaurant</span>
            </div>
            <div className="dlvr-detail-value">Pizza Palace</div>
          </div>
          
          <div className="dlvr-detail-item">
            <div className="dlvr-detail-key">
              <span className="dlvr-detail-symbol">📍</span>
              <span>Pickup Address</span>
            </div>
            <div className="dlvr-detail-value">Maarif rue 20</div>
          </div>
          
          <div className="dlvr-detail-item">
            <div className="dlvr-detail-key">
              <span className="dlvr-detail-symbol">👤</span>
              <span>Customer</span>
            </div>
            <div className="dlvr-detail-value">Abdellatif</div>
          </div>
          
          <div className="dlvr-detail-item">
            <div className="dlvr-detail-key">
              <span className="dlvr-detail-symbol">🏠</span>
              <span>Delivery Address</span>
            </div>
            <div className="dlvr-detail-value">Ain chock rue 04 NR 12</div>
          </div>
          
          <div className="dlvr-detail-item">
            <div className="dlvr-detail-key">
              <span className="dlvr-detail-symbol">📞</span>
              <span>Contact</span>
            </div>
            <div className="dlvr-detail-value">(212) 123-4567</div>
          </div>
          
          <div className="dlvr-detail-item">
            <div className="dlvr-detail-key">
              <span className="dlvr-detail-symbol">💳</span>
              <span>Payment</span>
            </div>
            <div className="dlvr-detail-value">Paid - Credit Card</div>
          </div>
          
          <div className="dlvr-detail-item">
            <div className="dlvr-detail-key">
              <span className="dlvr-detail-symbol">💵</span>
              <span>Delivery Fee</span>
            </div>
            <div className="dlvr-detail-value">13.99 DH (You earn: 3.50 DH)</div>
          </div>
        </div>
      </section>
      
      {/* Articles de la commande */}
      <section className="dlvr-panel">
        <h2 className="dlvr-panel-title">Order Items</h2>
        
        <div className="dlvr-food-list">
          <div className="dlvr-food-item">
            <div className="dlvr-food-pic">
              <img src="https://via.placeholder.com/50" alt="Pizza" />
            </div>
            <div className="dlvr-food-info">
              <h4 className="dlvr-food-name">Margherita Pizza</h4>
              <p className="dlvr-food-desc">Medium, Extra cheese</p>
            </div>
          </div>
          
          <div className="dlvr-food-item">
            <div className="dlvr-food-pic">
              <img src="https://via.placeholder.com/50" alt="Salad" />
            </div>
            <div className="dlvr-food-info">
              <h4 className="dlvr-food-name">Caesar Salad</h4>
              <p className="dlvr-food-desc">No croutons, dressing on side</p>
            </div>
          </div>
          
          <div className="dlvr-food-item">
            <div className="dlvr-food-pic">
              <img src="https://via.placeholder.com/50" alt="Bread" />
            </div>
            <div className="dlvr-food-info">
              <h4 className="dlvr-food-name">Garlic Bread</h4>
              <p className="dlvr-food-desc">2 pieces</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instructions de livraison */}
      <section className="dlvr-panel">
        <h2 className="dlvr-panel-title">Delivery Instructions</h2>
        <div className="dlvr-instructions-box">
          <p>Gate code: 1234. Please leave at door and ring doorbell.</p>
        </div>
      </section>
      
      {/* Mise à jour du statut */}
      <section className="dlvr-panel">
        <h2 className="dlvr-panel-title">Update Order Status</h2>
        <div className="dlvr-status-controls">
          <button className="dlvr-button dlvr-button-light dlvr-status-btn">Picked Up</button>
          <button className="dlvr-button dlvr-button-light dlvr-status-btn">On The Way</button>
          <button className="dlvr-button dlvr-button-green dlvr-status-btn">Delivered</button>
          <button className="dlvr-button dlvr-button-light dlvr-status-btn">Call Customer</button>
        </div>
      </section>
    </div>
  );
}

// Vue pour ajouter une livraison
function AddDeliveryView() {
  return (
    <div className="dlvr-add-view">
      <h1 className="dlvr-heading">Add New Delivery</h1>
      
      <form className="dlvr-form">
        <div className="dlvr-form-row">
          <label htmlFor="restaurant">Restaurant</label>
          <input type="text" id="restaurant" placeholder="Enter restaurant name" />
        </div>
        
        <div className="dlvr-form-row">
          <label htmlFor="pickup">Pickup Address</label>
          <input type="text" id="pickup" placeholder="Enter pickup address" />
        </div>
        
        <div className="dlvr-form-row">
          <label htmlFor="customer">Customer Name</label>
          <input type="text" id="customer" placeholder="Enter customer name" />
        </div>
        
        <div className="dlvr-form-row">
          <label htmlFor="delivery">Delivery Address</label>
          <input type="text" id="delivery" placeholder="Enter delivery address" />
        </div>
        
        <div className="dlvr-form-row">
          <label htmlFor="contact">Contact Number</label>
          <input type="text" id="contact" placeholder="Enter contact number" />
        </div>
        
        <div className="dlvr-form-row">
          <label htmlFor="items">Order Items</label>
          <textarea id="items" placeholder="Enter order items (one per line)"></textarea>
        </div>
        
        <div className="dlvr-form-row">
          <label htmlFor="instructions">Delivery Instructions</label>
          <textarea id="instructions" placeholder="Enter any special instructions"></textarea>
        </div>
        
        <div className="dlvr-form-actions">
          <button type="submit" className="dlvr-button dlvr-button-green">Add Delivery</button>
          <button type="reset" className="dlvr-button dlvr-button-light">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// Vue pour suivre une commande
function TrackOrderView() {
  return (
    <div className="dlvr-track-view">
      <h1 className="dlvr-heading">Track Orders</h1>
      
      <div className="dlvr-search-bar">
        <input type="text" placeholder="Search orders by ID or customer name" />
        <button className="dlvr-button dlvr-button-green">Search</button>
      </div>
      
      <div className="dlvr-orders-list">
        <div className="dlvr-order-box dlvr-order-active">
          <div className="dlvr-order-top">
            <h3>Order #12345</h3>
            <span className="dlvr-order-badge">In Progress</span>
          </div>
          <div className="dlvr-order-content">
            <p><strong>Customer:</strong> Abdellatif</p>
            <p><strong>Restaurant:</strong> Pizza Palace</p>
            <p><strong>Estimated Delivery:</strong> 15:30</p>
          </div>
          <button className="dlvr-button dlvr-button-green">View Details</button>
        </div>
        
        <div className="dlvr-order-box">
          <div className="dlvr-order-top">
            <h3>Order #12344</h3>
            <span className="dlvr-order-badge dlvr-badge-done">Completed</span>
          </div>
          <div className="dlvr-order-content">
            <p><strong>Customer:</strong> Mohammed</p>
            <p><strong>Restaurant:</strong> Burger House</p>
            <p><strong>Delivered:</strong> 14:15</p>
          </div>
          <button className="dlvr-button dlvr-button-light">View Details</button>
        </div>
        
        <div className="dlvr-order-box">
          <div className="dlvr-order-top">
            <h3>Order #12343</h3>
            <span className="dlvr-order-badge dlvr-badge-done">Completed</span>
          </div>
          <div className="dlvr-order-content">
            <p><strong>Customer:</strong> Fatima</p>
            <p><strong>Restaurant:</strong> Sushi Express</p>
            <p><strong>Delivered:</strong> 13:45</p>
          </div>
          <button className="dlvr-button dlvr-button-light">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;