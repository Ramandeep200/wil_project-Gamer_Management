import React from "react";
// navigate
import { useNavigate } from "react-router-dom";

function GameHeader() {
  const [isLogined, setIsLogined] = React.useState(true);
  // handler
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogined(false);
    navigate("/login");
  };
  if (!isLogined) {
    return null;
  }
  return (
    <div className="container-fluid">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <h1>Gamer Managment System</h1>
        </li>
        <li className="nav-item" style={{ margin: "auto" }}>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default GameHeader;
