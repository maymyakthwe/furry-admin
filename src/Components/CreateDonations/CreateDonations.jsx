import React, { useState } from 'react'
import './CreateDonations.css'

const CreateDonations = () => {
    const [donation, setDonation] = useState({})
    const [errors, setErrors] = useState({});


    const changeHandler = (e) => {
        setDonation({
            ...donation, [e.target.name]: e.target.value
        })
        console.log(donation);
    }

    const addDonation = async () => {

        let donationData = donation;
        let response;

        let token = localStorage.getItem('auth-token');
        donationData.token = token;

        await fetch('http://localhost:4000/donations', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationData),
        }).then((res) => res.json()).then((data) => { response = data })
        if (response.success) {
            alert("Doantion Created");
            setDonation({ user_email: '', petId: '', adp_amount: '', adp_date: '' });
            window.location.reload();
        } else {
            alert("failed");
        }
    }

    const validationCheck = (e) => {
        e.preventDefault();

        const validationErrors = {};

        //email validation
        if (!donation.user_email) {
            validationErrors.user_email = "Email is required";
        }

        //email validation
        if (!donation.donate_amount) {
            validationErrors.donate_amount = "Amount is required";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            addDonation();
        }
    }

    return (
        <div className='create-donation'>
            <form onSubmit={validationCheck} className="add-data-form">
                <div className="form-input">
                    <label htmlFor="" >User Email :</label>
                    <div>
                        <input onChange={changeHandler} type="text" name='user_email' placeholder="enter user email" />
                        {errors.user_email && <div className='validation-text'>{errors.user_email}</div>}
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="" >Donation Date :</label>
                    <input onChange={changeHandler} type="date" name='donate_date' />
                </div>
                <div className="form-input">
                    <label htmlFor="" >Donation Amount :</label>
                    <div>
                        <input onChange={changeHandler} type="number" name='donate_amount' placeholder="$0" />
                        {errors.donate_amount && <div className='validation-text'>{errors.donate_amount}</div>}
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="" >Description :</label>
                    <textarea onChange={changeHandler} name="donate_description" id="" >Enter More Information</textarea>
                </div>

                <button type='submit' className='form-submit-button'>Add</button>
            </form>
        </div>
    )
}

export default CreateDonations
