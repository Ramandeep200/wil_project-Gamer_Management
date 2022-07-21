import React from "react";

import { Link } from "react-router-dom";

function Leftbar(props) {
  const role = props.role;
  const id = props.id;

  if (role === "Admin") {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                  welcome
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/profile/${id}`} className="nav-link">
                <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                  My profile
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
              <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                  Users
              </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/accessrequest" className="nav-link">
                <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                  Access request
              </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (role === "User") {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}
                >welcome</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/profile/${id}`} className="nav-link">
              <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                My Profile
              </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (role === "Host") {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/" className="nav-link">
              <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                welcome
              </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/profile/${id}`} className="nav-link">
              <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                My Profile
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                <button className="btn btn-primary" 
                  style={{
                    width: "150px",
                    height: "50px",
                  }}>
                  Users
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Leftbar;