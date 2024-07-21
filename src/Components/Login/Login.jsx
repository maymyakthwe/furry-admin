import React, { useState } from 'react'
import './Login.css'
import FFRLogo from '../../Assets/images/FFRLogo.png'


const Login = () => {

  const [admin,setAdmin] = useState({});
  const [errors, setErrors] = useState({});


  const changeHandler = (e) => {
    setAdmin({
      ...admin, [e.target.name]: e.target.value
    })
  }

  const validationCheck = (e) => {
    e.preventDefault();

    //username validation
    const validationErrors = {};
    if (!admin.admin_email) {
      validationErrors.admin_email = "Email is required";
    }

    //password validation
    if (!admin.admin_password) {
      validationErrors.admin_password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login();
    }
  }

  const login = async () => {
    let response;

    await fetch('http://localhost:4000/admin/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin),
    }).then((res) => res.json()).then((data) => response = data)

    if (response.success) {
      alert("Logged in");
      localStorage.setItem("auth-token", response.token);
      window.location.replace('/')
    } else {
      alert(response.errors);
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={validationCheck} className="login-wrapper">
        <div className="login-welcome">
          <h1>Furry Friends Refuge</h1>
          <img src={FFRLogo} alt="" />
        </div>
        <div className="login-form">
          <div className='login-headline'>
            <h2>Login</h2>
            <p>Don't have an account? <a href="/signup">Signup</a></p>
          </div>
          <div className='login-info'>
            <label htmlFor="">Email </label>
            <input name='admin_email' onChange={changeHandler} type="text" />
            {errors.admin_email && <div className='validation-text'>{errors.admin_email}</div>}

          </div>
          <div className='login-info'>
            <label htmlFor="">Password  </label>
            <input name='admin_password' onChange={changeHandler} type="password" />
            {errors.admin_password && <div className='validation-text'>{errors.admin_password}</div>}

          </div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
