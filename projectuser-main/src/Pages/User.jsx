import React, { useState, useEffect } from "react";
import axios from "axios";
import Leftbar from "../components/Leftbar";
import GameHeader from "../components/GameHeader";
import {BaseUrl} from '../components/BaseUrl';

function User() {
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = React.useState('')
    const [department, setDepartment] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [dob, setDob] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [access_type, setAccess_type] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [Depertmens, setDepertmens] = React.useState([])
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
          setPassword(responce.data.Password);
          setDepartment(responce.data.Department);
          setEmail(responce.data.Email);
          setFirstName(responce.data.FirstName);
          setLastName(responce.data.LastName);
          setDob(responce.data.Dob);
          setNumber(responce.data.Number);
          setAccess_type(responce.data.Access_type);
          setAddress(responce.data.Address);
        }).catch(err => {
          console.log(err);
        }
        );
    }, []);
    
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
                                placeholder={email}
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
                                placeholder={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1rem' }}>
                            <div className='col-md-4'>
                            <label htmlFor='Depertment'>Depertment</label>
                            </div>
                            <div className='col-md-8'>
                            <select className='form-control' id='Depertment' onChange={e => setDepartment(e.target.value)}>
                                <option value={department}>{department}</option>
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
                                placeholder={firstName}
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
                                placeholder={lastName}
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
                                placeholder={dob}
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
                            <select className='form-control' id='access_type' value={access_type} onChange={e => setAccess_type(e.target.value)}>
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
                          // onClick={handleClick}
                          >
                          Edit 
                          </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;
