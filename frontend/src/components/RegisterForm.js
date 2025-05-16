import React, { useState } from "react";
import axios from "axios";

function RegisterForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/register", { email, password });
      alert(res.data.msg);
      setEmail("");       // Clear form
      setPassword("");
      if (onSuccess) onSuccess();  // Notify parent to switch page
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <br />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterForm;
