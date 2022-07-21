import React, { useState, useEffect } from "react";
import axios from "axios";
import Leftbar from "../components/Leftbar";
import GameHeader from "../components/GameHeader";
import {BaseUrl} from '../components/BaseUrl';
import { useNavigate } from "react-router-dom";

function Users() {
  const [role, setRole] = useState("Host");
  const [id, setId] = useState("");
  const [Data2, setData2] = useState([]);
  const [Datasearch, setDatasearch] = useState(Data2);
  const [delete1, setDelete1] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate()
  const [checkedid, setCheckedid] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    axios
      // .get("http://localhost:3000/api/users/get", { headers })
      .get(`${BaseUrl}/api/users/get`, { headers })
      .then(responce => {
        setRole(responce.data.Role);
        setId(responce.data._id);
      }).catch(err => {
        console.log(err);
      }
      );
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    axios.get(`${BaseUrl}/api/admin/getall`, { headers })
      .then(responce => {
        setData2(responce.data);
        if(Datasearch.length === 0){
          setDatasearch(responce.data);
        }
      }
      ).catch(err => {
        console.log(err)
      }
    )
  }, [Datasearch.length])

  const handleChange = (e) => {
    setDatasearch(Data2.filter(item => item.firstName.toLowerCase().includes(e.target.value.toLowerCase())))
  }
  const deleteUser = (e) => {
    e.preventDefault();
    setDelete1(true);
  }

  useEffect(() => {
    if(delete1){
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };
      axios.delete(`${BaseUrl}/api/admin/delete/${checkedid}`, { headers })
        .then(responce => {
          window.location.reload();
        }
        ).catch(err => {
          console.log(err)
        }
      )
    }
  }, [checked, checkedid, delete1, Datasearch])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const headers = {
  //     Authorization: `${token}`,
  //   };
  //   if(add){
  //     axios.post(`${BaseUrl}/api/admin/add`, {
  //       email:"test@gmail.com",
  //       firstName:"test",
  //       lastName:"test",
  //       dob:"test",
  //       password:"test"
  //     }, { headers })
  //     .then(responce => {
  //       console.log(responce.data);
  //     }
  //     ).catch(err => {
  //       console.log(err)
  //     }
  //   )
  //   }
  // }, [add])

  return (
    <div style={{ overflow:'hidden' }}>
      <div className="row" style={{ marginTop: "20px", height:'100%', }}>
        <div className="col-md-2">
          <Leftbar role={role} id={id} />
        </div>
        <div className="col-md-10" style={{ backgroundColor: "aliceblue" }}>
          <div className="row">
            <div className="col-md-12 mt-5">
                <GameHeader />  
                <br/>
                <div className="container-fluid" style={{ margin: "auto" }}>
                    <ul className="nav nav-tabs">
                        <li className="nav-item" style={{ marginRight: '42rem' }}>
                            <h2>Users</h2>
                        </li>
                        <ul className="nav nav-tabs">
                          {role === "Admin" && 
                            <li className="nav-item" style={{ margin: "1px" }}>
                                <button className="btn btn-primary" style={{ margin: "auto" }} onClick={() =>navigate(`/users/create/${checkedid}`)}
                                >
                                    create
                                </button>
                            </li>
                          }
                            <li className="nav-item" style={{ margin: "1px" }}>
                                <button className="btn btn-primary" style={{ margin: "auto" }} onClick={() => 
                                    {checked ? navigate(`/users/add/${checkedid}`) : alert("Please select a user")}
                                }>
                                    view
                                </button>
                            </li>
                            <li className="nav-item" style={{ margin: "1px" }}>
                                <button className="btn btn-primary" style={{ margin: "auto" }} onClick={() => 
                                  {checked ? navigate(`/users/add/${checkedid}`) : alert("Please select a user")}
                                  }>
                                    edit
                                </button>
                            </li>
                            {role === "Admin" && (
                            <li className="nav-item" style={{ margin: "1px" }}>
                                <button className="btn btn-primary" style={{ margin: "auto" }} onClick={(e)=>
                                  {checked ? deleteUser(e) : alert("Please select a user")}
                                  }>
                                    delete
                                </button>
                            </li>
                            )}
                        </ul>
                    </ul>
                </div>
                <br/>
                <div className="container-fluid" style={{ margin: "auto" }}>
                  <div className="row">
                    <div className="col-md-6">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        All
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" type="button">Admin</button>
                        <button className="dropdown-item" type="button">Host</button>
                        <button className="dropdown-item" type="button">User</button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          onChange={handleChange}
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> <input type="checkbox" /> </th>
                            <th>UserId</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Deprement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Datasearch.map(item => (
                            <tr key={item._id}>
                                <td> <input type="checkbox" 
                                    onChange={() => {
                                        setCheckedid(item._id);
                                        setChecked(!checked);
                                    }
                                  }
                                /> </td>
                                <td>{item._id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.Role}</td>
                                <td>{item.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users;
