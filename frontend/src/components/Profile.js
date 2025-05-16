import React, { useState } from "react";
import axios from "axios";

function Profile({ token }) {
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Access denied");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={fetchProfile}>Get Profile</button>
      <p>{message}</p>
    </div>
  );
}

export default Profile;
