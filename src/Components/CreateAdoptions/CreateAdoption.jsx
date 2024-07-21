import React, { useState } from 'react'
import './CreateAdoption.css'

const CreateAdoption = () => {

  const [adoption,setAdoption] =useState({})
  const [errors, setErrors] = useState({});


  const changeHandler = (e) => {
    setAdoption({
      ...adoption, [e.target.name]: e.target.value
    })
    console.log(adoption);
  }

  const addAdoption = async()=>{

    let adoptionData=adoption;
    let response;

    let token = localStorage.getItem('auth-token');
    adoptionData.token=token;

    await fetch('http://localhost:4000/adoptions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adoptionData),
    }).then((res) => res.json()).then((data) => { response = data })
    if (response.success) {
      alert("Adoption Created");
      setAdoption({ user_email: '', petId: '', adp_amount: '', adp_date: '' });
      window.location.reload();
    } else {
      alert("failed");
    }
  }

  const validationCheck = (e) => {
    e.preventDefault();

    const validationErrors = {};

    //email validation
    if (!adoption.user_email) {
      validationErrors.user_email = "Email is required";
    }

    //petID validation
    if (!adoption.petId) {
      validationErrors.petId = "Pet Id is required";
    }

    //email validation
    if (!adoption.adp_amount) {
      validationErrors.adp_amount = "Amount is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      addAdoption();
    }
  }

  return (
    <div className='create-adoption'>
      <form onSubmit={validationCheck} className="add-data-form">
        <div className="form-input">
          <label htmlFor="" >User Email :</label>
          <div>
          <input  onChange={changeHandler} type="text" name='user_email' placeholder="enter user email" />
            {errors.user_email && <div className='validation-text'>{errors.user_email}</div>}
          </div>
        </div>

        <div className="form-input">
          <label htmlFor="" >Pet ID :</label>
          <div>
            <input onChange={changeHandler} type="text" name='petId' placeholder="enter pet's  ID" />
            {errors.petId && <div className='validation-text'>{errors.petId}</div>}
          </div>
        </div>

        <div className="form-input">
          <label htmlFor="" className='pet-label'>Adoption Date :</label>
          <input onChange={changeHandler} type="date" name='adp_date'  />
        </div>
        <div className="form-input">
          <label htmlFor="" >Adoption Amount :</label>
          <div>
            <input onChange={changeHandler} type="number" name='adp_amount' placeholder="$0" />
            {errors.adp_amount && <div className='validation-text'>{errors.adp_amount}</div>}
          </div>
        </div>

        <div className="form-input">
          <label htmlFor="" >Description :</label>
          <textarea onChange={changeHandler} name="adp_description" id="" >Enter More Information</textarea>
        </div>
        <button type='submit' className='form-submit-button'>Add</button>
      </form>
    </div>
  )
}

export default CreateAdoption
