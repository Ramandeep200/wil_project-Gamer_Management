import React, { useState, useEffect } from "react";
import axios from "axios";
import Leftbar from "../components/Leftbar";
import GameHeader from "../components/GameHeader";
import {BaseUrl} from '../components/BaseUrl';

function Accessrequest() {
  const [role, setRole] = useState("Admin");
  const [id, setId] = useState("");
  const [Data2, setData2] = useState([]);
  const [clicked, setClicked] = React.useState(false);
  const [clicked2, setClicked2] = React.useState(false);
  const [IdD, setIdD] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    axios
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
    axios
      .get(`${BaseUrl}/api/admin/getallrequests`, { headers })
      .then(responce => {
        // console.log(responce.data);
        setData2(responce.data);
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
    if(clicked){
        // axios.patch(`http://
        axios.patch(`${BaseUrl}/api/admin/accept/${IdD}`, {} , { headers })
        .then(responce => {
            console.log(responce.data);
        }
        ).catch(err => {
            console.log(err)
        }
    )
    }
    }, [clicked, IdD])

    useEffect(() => {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };
      if(clicked2){
          // axios.patch(`http://
          axios.patch(`${BaseUrl}/api/admin/reject/${IdD}`, {} , { headers })
          .then(responce => {
              console.log(responce.data);
          }
          ).catch(err => {
              console.log(err)
          }
      )
      }
      }, [clicked2, IdD])


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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>Depertment</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Data2.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user_id}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.request_status}</td>
                                        {item.request_status === "Pending" ?
                                        <td>
                                            <button className="btn btn-primary"
                                              onClick={() => {
                                                alert("Accepted");
                                                setClicked(true);
                                                setIdD(item.user_id);
                                              }
                                              }
                                              >
                                                Approve
                                            </button>
                                            <button className="btn btn-danger"
                                              onClick={() => {
                                                alert("Rejected");
                                                setClicked2(true);
                                                setIdD(item.user_id);
                                              }
                                              }
                                            >Reject</button>
                                        </td>
                                        :
                                        <td>
                                            {item.request_status}
                                        </td>
                                        }
                                    </tr>

                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accessrequest;
