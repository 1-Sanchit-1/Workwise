import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require("dotenv").config();
export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [seats, setSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [numOfSeats, setNumOfSeats] = useState(1);

  const API_BASE_URL = "https://workwise-backend-zf1b.onrender.com";
  useEffect(() => {
    if (token) {
      fetchSeats();
    }
  }, [token]);

  const handleLogin = () => {
    axios
      .post(`${API_BASE_URL}/login`, { email, password })
      .then((response) => {
        setToken(response.data.token);
        setRole(response.data.role);
        toast.success("Login successful!");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleSignup = () => {
    axios
      .post(`${API_BASE_URL}/signup`, { email, password })
      .then(() => {
        toast.success("Signup successful! You can now log in.");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const fetchSeats = () => {
    axios
      .get(`${API_BASE_URL}/seats`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const allSeats = response.data.seats;
        setSeats(allSeats);
        setAvailableSeats(allSeats.filter((seat) => !seat.isBooked).length);
        setBookedSeats(allSeats.filter((seat) => seat.isBooked).length);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleBookSeats = () => {
    axios
      .post(
        `${API_BASE_URL}/seats/book`,
        { numOfSeats },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("Seats booked successfully!");
        fetchSeats();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleResetSeats = () => {
    axios
      .post(
        `${API_BASE_URL}/seats/reset`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("All seats have been reset!");
        fetchSeats();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    setEmail("");
    setPassword("");
    setSeats([]);
    setAvailableSeats(0);
    setBookedSeats(0);
    toast.info("Logged out successfully.");
  };
  const handleError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          toast.error(data.message || "Cannot book more than 7 seats at once ");
          break;
        case 401:
          toast.error(data.message || "Unauthorized: Please log in again.");
          handleLogout();
          break;
        case 403:
          toast.error(
            data.message ||
              "Forbidden: You don't have permission for this action."
          );
          break;
        case 404:
          toast.error(data.message || "User Not Found: Please Signup.");
          break;
        case 500:
          toast.error(data.message || "Server Error: Please try again later.");
          break;
        default:
          toast.error(`Error: ${status} - ${data.message || "Unknown error"}`);
      }
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error(`Unexpected Error: ${error.message}`);
    }
    console.error("Error:", error);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <ToastContainer />

      {!token ? (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Welcome! Please Login or Signup</h2>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                marginRight: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                width: "250px",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                width: "250px",
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            style={{
              backgroundColor: "#28A745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Seat Booking System</h2>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#FF5733",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                alignSelf: "flex-end",
              }}
            >
              Logout
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: "45%" }}>
              <div style={{ marginBottom: "20px" }}>
                <h3>Available Seats: {availableSeats}</h3>
                <h3>Booked Seats: {bookedSeats}</h3>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={numOfSeats}
                  onChange={(e) => setNumOfSeats(e.target.value)}
                  style={{
                    padding: "10px",
                    marginRight: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    width: "100px",
                  }}
                />
                <button
                  onClick={handleBookSeats}
                  style={{
                    backgroundColor: "#007BFF",
                    color: "white",
                    padding: "10px 20px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Book Seat(s)
                </button>
                {role === "admin" && (
                  <button
                    onClick={handleResetSeats}
                    style={{
                      backgroundColor: "#FFC107",
                      color: "black",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Reset Seats
                  </button>
                )}
              </div>
            </div>

            <div
              style={{
                width: "50%",
                display: "grid",
                gridTemplateColumns: "repeat(7, 50px)",
                gap: "10px",
              }}
            >
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: seat.isBooked ? "red" : "green",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {seat.seatNumber}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
