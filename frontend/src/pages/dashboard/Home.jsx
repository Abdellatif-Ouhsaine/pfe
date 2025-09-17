import Header from "../../components/dashboard/Header";
import Card from "../../components/dashboard/Card";
import { useNavigate } from "react-router-dom";
import x88 from "./81/88.jpg";
import x85 from "./81/85.jpg";
import x87 from "./81/87.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="card-conteneur">
        <Card
          title="Orders"
          image={x88}
          description="Number of orders received"
          buttonText="View All"
          onClick={() => navigate("/Dashboardpartner/orders")}
        />
        <Card
          title="Reservations"
          image={x85}
          description="Tables reserved"
          buttonText=" Manage"
          onClick={() => navigate("/Dashboardpartner/reservations")}
        />
        <Card
          title="Analytics"
          image={x87}
          description="Performance reports"
          buttonText="Details"
          onClick={() => navigate("/Dashboardpartner/analytics")}
        />
        <Card
          title="Menu"
          image=""
          description="voir menu"
          buttonText="View Menu"
          onClick={() => navigate("/Dashboardpartner/menu/menulist")}
        />
      </div>
    </div>
  );
}
