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
          <div>
            <h1>Welcome to DroneConnect!</h1>
            <p>Experience the future of aerial drone services — connect with professional drone operators for photography, surveying, and delivery.</p>
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
