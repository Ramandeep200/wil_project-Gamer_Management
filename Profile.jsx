import React, { useState, useEffect } from "react";
import axios from "axios";
import Leftbar from "../components/Leftbar";
import GameHeader from "../components/GameHeader";

function Profile() {
  const [role, setRole] = useState("Admin");
  const [id, setId] = useState("");
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [dob, setDob] = React.useState('')
  const [clicked, setClicked] = React.useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    axios
      .get("http://192.168.0.141:3000/api/users/get", { headers })
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
    if(clicked){
        axios.patch(`http://192.168.43.26:5200/api/users/update`, {
            email,
            firstName,
            lastName,
            dob,
            password
        }, { headers })
        .then(responce => {
            console.log(responce.data);
        }
        ).catch(err => {
            console.log(err)
        }
    )
    }
    }, [email, firstName, lastName, dob, password, clicked])
    const handleClick = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert('password is not match')
            return
        }
        setClicked(true)
    }
    // handleAccount
    const handleAccount = () => {
      setRole("Admin");
      // update in database
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };
      axios.patch(`http://192.168.43.26:5200/api/users/update`, {
        role: "Admin",
      }, { headers })
        .then(responce => {
          console.log(responce.data);
        }
        ).catch(err => {
          console.log(err)
        }
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
                            <label htmlFor='confirmPassword'>confirm password</label>
                            </div>
                            <div className='col-md-8'>
                            <input
                                type='password'
                                className='form-control'
                                id='confirmPassword'
                                placeholder='confirm password'
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
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
                    <div className='col-md-2' style={{ margin: '4rem' }}>
                    <div className='row' style={{ marginTop: '1rem' }}>
                        <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={handleAccount}
                        >
                        Request for access user
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
  )
}

export default Profile;
