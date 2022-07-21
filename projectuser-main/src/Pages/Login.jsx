import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../components/BaseUrl";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogedin, setIsLogedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setIsLogedin(false);
    } else if (token) {
      setIsLogedin(true);
    }
  }, []);

  const handleClick = async e => {
    console.log("handleClick");
    e.preventDefault();
    // await axios.post("http://localhost:3000/api/users/login", {
    await axios.post(`${BaseUrl}/api/users/login`, {
        'email':username,
        'password':password
      })
      .then(responce => {
        localStorage.setItem("token", responce.data.token);
        navigate("/");
      }).catch(err => {
        alert("Invalid username or password");
      }
      );
  };
  if (isLogedin) {
    navigate("/");
  }
  return (
    <div className="container">
      <div className="row">
        <h1>GAMER MANAGMENT</h1>
      </div>
      <div className="row" style={{ marginTop: "4rem" }}>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="username">Username</label>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "1rem" }}>
            <div className="col-md-4">
              <label>Password</label>
            </div>
            <div className="col-md-8">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "1rem" }}>
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={e => handleClick(e)}
              >
                Login
              </button>
            </div>
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
