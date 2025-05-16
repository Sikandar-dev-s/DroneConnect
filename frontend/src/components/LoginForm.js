import React, { useState } from "react";
import axios from "axios";

function LoginForm({ setToken, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      const token = res.data.access_token;
      setToken(token);
      alert("Login successful");
      setEmail("");    // Clear form
      setPassword("");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <br />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;
