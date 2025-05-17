import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile({ token }) {
  const [profile, setProfile] = useState({
    name: "",
    experience: "",
    drone_type: "",
    about: "",
  });

  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      setMessage("Failed to load profile");
    }
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put("http://localhost:5000/auth/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Profile updated!");
    } catch (err) {
      setMessage("Update failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Your Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          className="form-control"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Years of Experience</label>
        <input
          className="form-control"
          value={profile.experience}
          onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Preferred Drone Type</label>
        <input
          className="form-control"
          value={profile.drone_type}
          onChange={(e) => setProfile({ ...profile, drone_type: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">About You</label>
        <textarea
          className="form-control"
          rows={3}
          value={profile.about}
          onChange={(e) => setProfile({ ...profile, about: e.target.value })}
        />
      </div>

      <button className="btn btn-primary" onClick={updateProfile}>
        Save Changes
      </button>
    </div>
  );
}

export default Profile;
