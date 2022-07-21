import React, { useState, useEffect } from "react";
import axios from "axios";
import Leftbar from "../components/Leftbar";
import GameHeader from "../components/GameHeader";
import {BaseUrl} from '../components/BaseUrl';
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    axios
      // .get("http://localhost:3000/api/users/get", { headers })
      .get(`${BaseUrl}/api/users/get`, { headers })
      .then(responce => {
        // console.log(responce.data);
        setRole(responce.data.Role);
        setId(responce.data._id);
      }).catch(err => {
        console.log(err);
      }
      );
  }, []);
  const token = localStorage.getItem("token");
  if(token===null){
    return(
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Welcome to the game</h3>
              <p className="card-text">
                Please login to continue
              </p>
              <button className="btn btn-primary" onClick={()=>navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div style={{ overflow:'hidden' }}>
      <div className="row" style={{ marginTop: "20px", height:'39rem', }}>
        <div className="col-md-2">
          <Leftbar role={role} id={id} />
        </div>
        <div className="col-md-10" style={{ backgroundColor: "aliceblue" }}>
          <div className="row">
            <div className="col-md-12 mt-5">
              <GameHeader />
              <br/>
              <h1
                style={{
                  margin: '15rem 24rem',
                }}
              > Welcome {role} </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome;
