import React, { useState } from "react";
import axios from "axios";

function LoginForm({ setToken, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const token = res.data.access_token;
      setToken(token);
      alert("Login successful");
      setEmail("");
      setPassword("");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="text-center mb-4">Login</h3>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleLogin} className="btn btn-primary w-100">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
