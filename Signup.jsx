import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {BaseUrl} from '../components/BaseUrl';

export default function Signup () {
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [dob, setDob] = React.useState('')
  const [capcha, setCapcha] = React.useState('')

    const navigate = useNavigate()
    const handleClick = async (e) => {
      e.preventDefault()
      // check chapcha
      if (capcha !== 'sfgjhy') {
        alert('capcha is not correct')
        return
      }
      if(password === confirmPassword){
        // await axios.post("http://localhost:3000/api/users/register", {
        await axios.post(`${BaseUrl}/api/users/register`, {
        email,
        password,
        firstName,
        lastName,
        dob,
        }).then((respone) => {
            // const { token } = respone.data;
            console.log(respone)
            localStorage.setItem('token', respone.data.token)
            navigate('/');
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <h1>GAMER MANAGMENT</h1>
      </div>
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
            </div>
          </div>
        </div>
        <div className='col-md-4' style={{ marginTop: '4rem' }}>
          <img src='capcha.png' alt='captcha' width='100%' />
          <input
            type='text'
            className='form-control'
            id='captcha'
            placeholder='captcha'
            onChange={e => setCapcha(e.target.value)}
          />
        </div>
        <div className='col-md-2' style={{ marginTop: '4rem' }}>
          <div className='row' style={{ marginTop: '1rem' }}>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleClick}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
