import React, { useState } from 'react'
import './Signup.css'
import FFRLogo from '../../Assets/images/FFRLogo.png'

const Signup = () => {

    const [admin, setAdmin] = useState({});
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setAdmin({
            ...admin, [e.target.name]: e.target.value
        })
    }

    //client side validation
    const validationCheck = (e) => {
        e.preventDefault();

        //username validation
        const validationErrors = {};
        if (!admin.admin_name) {
            validationErrors.admin_name = "Username is required";
        }

        //password validation
        if (!admin.admin_password) {
            validationErrors.admin_password = "Password is required";
        } else if (admin.admin_password.length < 3) {
            validationErrors.admin_password = "Password need to be at least 6 characters";
        }

        //email validation
        if (!admin.admin_email) {
            validationErrors.admin_email = "Email is required";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            createUser();
        }
    }

    const createUser = async () => {
        await fetch('http://localhost:4000/admin/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(admin),
        }).then((res) => res.json()).then((data) => {
            if (data.success) {
                alert(data.message);
                localStorage.setItem('auth-token', data.token);
                window.location.replace('/home')
            }else{
                alert(data.message);
            }
        })
    }

    return (
        <div className='signup-page'>
            <form onSubmit={validationCheck} className="signup-wrapper">
                <div className="signup-welcome">
                    <h1>Furry Friends Refuge</h1>
                    <img src={FFRLogo} alt="" />
                </div>
                <div className="signup-form">
                    <div className='signup-headline'>
                        <h2>Signup</h2>
                        <p>Already Have an account? <a href="/">Login</a></p>
                    </div>
                    <div className='signup-info'>
                        <label htmlFor="">Name  </label>
                        <input onChange={changeHandler} type="text" name='admin_name' />
                        {errors.admin_name && <div className='validation-text'>{errors.admin_name}</div>}
                    </div>
                    <div className='signup-info'>
                        <label htmlFor="">Email  </label>
                        <input onChange={changeHandler} type="text" name='admin_email' />
                        {errors.admin_email && <div className='validation-text'>{errors.admin_email}</div>}

                    </div>
                    <div className='signup-info'>
                        <label htmlFor="">Password  </label>
                        <input onChange={changeHandler} type="password" name='admin_password' />
                        {errors.admin_password && <div className='validation-text'>{errors.admin_password}</div>}

                    </div>
                    <button type='submit'>Signup</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
