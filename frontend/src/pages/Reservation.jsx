import axios from 'axios'
import { useEffect, useState } from "react"
import "./Reservation.css"
import { useParams } from "react-router-dom";

export default function Reservation() {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [specialRequests, setSpecialRequests] = useState("");

  const [seatingAreas, setSeatingAreas] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  const user_id = JSON.parse(localStorage.getItem("user")).id
  console.log(selectedTable)
  useEffect(() => {
    axios.get(`http://localhost:8000/api/seating-areas/${id}`)
      .then(response => setSeatingAreas(response.data))
      .catch(error => console.error(error));
  }, [id]);



  const handleConfirmReservation = async () => {
    try {
      const payload = {
        user_id: Number(user_id),
        restaurant_id: Number(id),
        seating_position_id: selectedTable,
        reservation_date: date,
        reservation_time: time,
        number_of_guests: Number(guests),
        seating_preference: selectedSeat,
        special_requests: specialRequests,
      };

      const response = await axios.post('http://localhost:8000/api/reservations', payload);
      console.log(payload)
      console.log("Reservation saved:", response.data);

      alert("✅ Reservation confirmed!");
    } catch (error) {
      console.error("❌ Error saving reservation:", error);
      alert("❌ Failed to confirm reservation.");
    }
  };

  const specialOffers = [
    { id: "happy-hour", title: "Happy Hour Special", description: "50% off appetizers with reservation between 4-6 PM", icon: "🍹" },
    { id: "tasting-menu", title: "Chef's Tasting Menu", description: "Complimentary juice pairing for parties of 4+", icon: "🍽️" },
    { id: "anniversary", title: "Anniversary Package", description: "Free dessert and ice drink", icon: "🎂" }
  ];

  return (
    <div className="reservation-container">
      <div className="breadcrumb">Home / Restaurants / Table Reservation</div>

      <main className="main-content">
        <h1 className="page-title">Reserve Your Table</h1>

        <section className="reservation-details">
          <h2 className="section-title">Reservation Details</h2>
          <div className="reservation-form">
            <div className="reservation-form__row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input type="time" className="form-input" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Number of Guests</label>
              <input type="number" min="1" className="form-input" value={guests} onChange={(e) => setGuests(e.target.value)} />
            </div>
          </div>
        </section>

        <h2 className="section-title">Seating Preferences</h2>
        <p className="section-subtitle">Select your preferred seating area and table</p>

        <section className="seating-preferences">
          {seatingAreas?.map((area) => (
            <div key={area.id} className="seating-area">
              <h3>{area.name}</h3>
              <img src={`http://localhost:8000/storage/${area.image_url}`} alt={area.name} className="seating-area__image" />

              <div className="seating-grid">
                {area.tables.map((table) => (
                  <div
                    key={table.id}
                    className={`seating-option ${!table.is_available ? "unavailable" : ""} ${selectedTable === table.id ? "seating-option--selected" : ""}`}
                    onClick={() => table.is_available && setSelectedTable(table.id)}
                  >
                    <div className="seating-option__info">
                      <h4 className="seating-option__title">{table.label} - {table.capacity} people</h4>
                      <p className="seating-option__description">
                        {table.is_available ? "Available" : "Unavailable"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {selectedTable && availableTimeSlots.length > 0 && (
            <div className="time-slots">
              <h3 className="time-slots__title">Available Time Slots</h3>
              <div className="time-slots__list">
                {availableTimeSlots.map((slot, index) => (
                  <button key={index} className="time-slot-button" onClick={() => setTime(slot)}>
                    {slot}
                  </button>
                ))}
              </div>
              <button className="confirm-button" onClick={handleConfirmReservation}>
                Confirm Reservation
              </button>
            </div>
          )}
        </section>


        <section className="special-requests">
          
          <div className="form-actions">
            <button className="confirm-button confirm-button--large" onClick={handleConfirmReservation}>
              Confirm Reservation
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
