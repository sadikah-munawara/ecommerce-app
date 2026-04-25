import { useState, useEffect } from "react";

function Profile() {
  

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [darkMode, setDarkMode] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {

    const savedProfile = localStorage.getItem("profile");
    const savedSettings = localStorage.getItem("settings");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setDarkMode(parsed.darkMode);
    }

  }, []);

  useEffect(() => {
  if (darkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}, [darkMode]);

  const handleProfileChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  };

  const handlePasswordChange = (e) => {

    setPassword({
      ...password,
      [e.target.name]: e.target.value
    });

  };

  const saveProfile = () => {

    localStorage.setItem("profile", JSON.stringify(profile));

    localStorage.setItem("settings", JSON.stringify({ darkMode }));

    setSavedMessage("Profile updated successfully");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);

  };

  return (

    <div style={{ padding: "40px", maxWidth: "1100px", margin: "auto" }}>

      <h1>Profile & Settings</h1>
      <p>Manage your account and preferences</p>

      {savedMessage && (
        <div
          style={{
            background: "green",
            color: "white",
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            marginBottom: "20px"
          }}
        >
          {savedMessage}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginTop: "30px"
        }}
      >

        {/* Profile Info Card */}

        <div
          style={{
            padding: "25px",
            border: "1px solid #ddd",
            borderRadius: "10px"
          }}
        >

          <h3>Profile Information</h3>

          <input
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleProfileChange}
            style={{ width: "100%", marginTop: "10px", padding: "8px" }}
          />

          <input
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleProfileChange}
            style={{ width: "100%", marginTop: "10px", padding: "8px" }}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleProfileChange}
            style={{ width: "100%", marginTop: "10px", padding: "8px" }}
          />

          <button
            onClick={saveProfile}
            style={{
              marginTop: "15px",
              padding: "8px 15px"
            }}
          >
            Save Profile
          </button>

        </div>

        {/* Change Password Card */}

        <div
          style={{
            padding: "25px",
            border: "1px solid #ddd",
            borderRadius: "10px"
          }}
        >

          <h3>Change Password</h3>

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={password.newPassword}
            onChange={handlePasswordChange}
            style={{ width: "100%", marginTop: "10px", padding: "8px" }}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={password.confirmPassword}
            onChange={handlePasswordChange}
            style={{ width: "100%", marginTop: "10px", padding: "8px" }}
          />

          {password.confirmPassword &&
            password.confirmPassword !== password.newPassword && (
              <p style={{ color: "red" }}>
                Passwords do not match
              </p>
            )}

        </div>

        {/* Account Settings */}

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px"
          }}
        >

          <h3>Account Settings</h3>

          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Enable Dark Mode
          </label>

          <br />

          <button
          onClick={() => {
          localStorage.setItem("settings", JSON.stringify({ darkMode }));
          setSavedMessage("Settings saved!");
          }}
          style={{ marginTop: "20px", padding: "8px 15px" }}
          >
            Save Settings
          </button>

        </div>

        {/* Preferences */}

        <div
          style={{
            padding: "25px",
            border: "1px solid #ddd",
            borderRadius: "10px"
          }}
        >

          <h3>Preferences</h3>

          <p>Secured Account ✔</p>

          <p style={{ marginTop: "10px" }}>
            Last login: Recently
          </p>

          <button
            style={{
              marginTop: "20px",
              background: "red",
              color: "white",
              padding: "8px 15px",
              border: "none"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Profile;