import React, { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

function App() {
  const [token, setToken] = useState("");
  const [page, setPage] = useState("home"); // 'home', 'login', 'register', 'profile'

  const handleLogout = () => {
    setToken("");
    setPage("home");
  };

  return (
    <div>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        fontWeight: "bold"
      }}>
        <div>DroneConnect</div>
        <nav>
          {!token ? (
            <>
              <button onClick={() => setPage("login")} style={{ marginRight: 10 }}>Login</button>
              <button onClick={() => setPage("register")}>Register</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage("profile")} style={{ marginRight: 10 }}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main style={{ padding: "20px" }}>
        {page === "home" && (
          <div id="droneCarousel" className="carousel slide mt-5" data-bs-ride="carousel" style={{ maxWidth: '800px', margin: 'auto' }}>
  <div className="carousel-inner rounded shadow-sm">
    <div className="carousel-item active">
      <img src="https://images.unsplash.com/photo-1549921296-3a7763dfd240?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
           className="d-block w-100" alt="Drone Delivery" />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
        <h5>Drone-Powered Delivery</h5>
        <p>Experience ultra-fast, secure delivery through the sky with our smart drone fleet.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1581092554406-13e1df6eaa52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
           className="d-block w-100" alt="Drone Photography" />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
        <h5>Stunning Aerial Photography</h5>
        <p>Capture breathtaking perspectives from above — events, landscapes, real estate, and more.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
           className="d-block w-100" alt="Drone Surveying" />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
        <h5>Precision Mapping & Surveying</h5>
        <p>Revolutionize how you inspect, survey, and analyze terrain with real-time drone data.</p>
      </div>
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#droneCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#droneCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

        )}


        {page === "register" && <RegisterForm onSuccess={() => { setPage("login"); }} />}

        {page === "login" && <LoginForm setToken={setToken} onSuccess={() => { setPage("profile"); }} />}

        {page === "profile" && <Profile token={token} />}
      </main>
    </div>
  );
}

export default App;
