import React, { useState, useEffect } from "react";
import axios from "axios";
import Leftbar from "../components/Leftbar";
import GameHeader from "../components/GameHeader";
import {BaseUrl} from '../components/BaseUrl';

function Profile() {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = React.useState('')
  const [department, setDepartment] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [dob, setDob] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [access_type, setAccess_type] = React.useState('')
  const [Depertmens, setDepertmens] = React.useState([])
  const [clicked, setClicked] = React.useState(false)
  const [clicked2, setClicked2] = React.useState(false)
  const [status, setStatus] = React.useState('Not Sent')
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
        setStatus(responce.data.requestHost.request_status)
        setId(responce.data._id);
      }).catch(err => {
        console.log(err);
      }
      );
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `${token}`,
    };
    if(clicked){
        // axios.patch(`http://192.168.43.26:5200/api/users/update`, {
        axios.patch(`${BaseUrl}/api/users/update`, {
            email,
            firstName,
            lastName,
            dob,
            password,
            address,
            number,
            department,
            Role:access_type
        }, { headers })
        .then(responce => {
            console.log(responce.data);
        }
        ).catch(err => {
            console.log(err)
        }
    )
    }
    }, [email, firstName, lastName, dob, password, clicked, address, number, department, access_type])
    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `${token}`,
        };
        if(clicked2){
            // axios.post(`http://
            axios.post(`${BaseUrl}/api/users/requestHost`,{}, { headers })
            .then(responce => {
                console.log(responce.data);
            }
            ).catch(err => {
                console.log(err)
            }
        )
        }
    }, [clicked2])
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `${token}`,
        };
        axios.get(`${BaseUrl}/api/admin/getalldepartments`, { headers }).then(responce => {
            setDepertmens(responce.data)
            console.log(responce.data)
        }
        ).catch(err => {
            console.log(err)
        }
        )
        }
      ,[])
    
    const handleAccount = async (e) => {
        e.preventDefault()
        alert('account will be updated as a host when admin approve')
        setClicked2(true)
    }

  return (
    <div style={{ overflow:'hidden' }}>
      <div className="row" style={{ marginTop: "20px", height:'100%', }}>
        <div className="col-md-2">
          <Leftbar role={role} id={id} />
        </div>
        <div className="col-md-10" style={{ backgroundColor: "aliceblue" }}>
          <div className="row">
            <div className="col-md-12 mt-5">
            <div className='container'>
                <GameHeader />
                <br/>
                <div className='row'>
                    <div className='col-md-6'>
                    <div className='row' style={{ marginTop: '4rem' }}>
                        <div className='col'>
                        <div className='row'>
                            <div className='col-md-4'>
                            <label htmlFor='username'>Email Address</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='text'
                                className='form-control'
                                id='email'
                                placeholder='email'
                                onChange={e => setEmail(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='password'>password</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='password'
                                onChange={e => setPassword(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='Depertment'>Department</label>
                            </div>
                            <div className='col-md-8'>
                            <select className='form-control' id='Depertment' onChange={e => setDepartment(e.target.value)}>
                                <option value={department}>{department}select department</option>
                                {Depertmens.map(depertment => (
                                    <option key={depertment._id} value={depertment.name}>{depertment.name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='firstName'>first name</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='text'
                                className='form-control'
                                id='firstName'
                                placeholder='first name'
                                onChange={e => setFirstName(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='lastName'>last name</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='text'
                                className='form-control'
                                id='lastName'
                                placeholder='last name'
                                onChange={e => setLastName(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='dob'>date of birth</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='date'
                                className='form-control'
                                id='dob'
                                placeholder='date of birth'
                                onChange={e => setDob(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='number'>phone number</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='number'
                                className='form-control'
                                id='number'
                                placeholder={number}
                                onChange={e => setNumber(e.target.value)}
                            />
                            </div>
                            </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='access_type'>access type</label>
                            </div>
                            <div className='col-md-8'>
                                {/* dropdown */}
                            <select className='form-control' id='access_type' onChange={e => setAccess_type(e.target.value)}>
                                <option key='Admin' value='Admin'>Admin</option>
                                <option key='Host' value="Host">Host</option>
                                <option key='User' value='User'>User</option>
                            </select>
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='address'>address</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='text'
                                className='form-control'
                                id='address'
                                placeholder={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                          <button
                          type='submit'
                          className='btn btn-primary'
                          onClick={handleClick}
                          >
                          Edit 
                          </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* if role isnt admin then show this */}
                    {role === "User" && (
                      <div  className='col-md-2' style={{ margin: '4rem' }}>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            {status === 'Not Sent' && (
                                <button
                                type='submit'
                                className='btn btn-primary'
                                onClick={handleAccount}
                                >
                                Request for access user
                                </button>
                            )}
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            {status !== 'Not Sent' && (
                                <p style={{ color: 'green' }}>
                                Status: {status}
                                </p>
                            )}
                        </div>
                    </div>
                    )}
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
