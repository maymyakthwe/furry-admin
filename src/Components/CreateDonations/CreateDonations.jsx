import React, { useState } from 'react'
import './CreateDonations.css'

const CreateDonations = () => {
    const [donation, setDonation] = useState({})
    const [errors, setErrors] = useState({});
    let token = localStorage.getItem('auth-token');

    const changeHandler = (e) => {
        setDonation({
            ...donation, [e.target.name]: e.target.value
        })
        console.log(donation);
    }

    const addDonation = async () => {

        let donationData = donation;

        donationData.token = token;

        await fetch('http://localhost:4000/donations', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationData),
        }).then((res) => res.json()).then((data) => {
            if (data.success) {
                alert(data.message);
                setDonation({ user_email: '', petId: '', adp_amount: '', adp_date: '' });
                window.location.reload();
            } else {
                alert(data.message);
            } 
        })
    }

    const validationCheck = (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!token) {
            validationErrors.user_name = "Please log in!";
        }

        if (!donation.user_email) {
            validationErrors.user_email = "Email is required";
        }

        if (!donation.donation_date) {
            validationErrors.donation_date = "Date is required";
        }

        if (!donation.donation_amount) {
            validationErrors.donation_amount = "Amount is required";
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
                    <div>
                        <input onChange={changeHandler} type="date" name='donation_date' />
                        {errors.donation_date && <div className='validation-text'>{errors.donation_date}</div>}
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="" >Donation Amount :</label>
                    <div>
                        <input onChange={changeHandler} type="number" name='donation_amount' placeholder="$0" />
                        {errors.donation_amount && <div className='validation-text'>{errors.donation_amount}</div>}
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="" >Description :</label>
                    <textarea onChange={changeHandler} name="donation_description" id="" >Enter More Information</textarea>
                </div>
                {errors.user_name && <div className='validation-text'>{errors.user_name}</div>}

                <button type='submit' className='form-submit-button'>Add</button>
            </form>
        </div>
    )
}

export default CreateDonations
