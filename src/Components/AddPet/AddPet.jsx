import React, { useState } from 'react'
import './AddPet.css'
import upload_area from '../../Assets/images/upload_area.svg'


const AddPet = () => {

    const [image, setImage] = useState(false);
    const [pet, setPet] = useState({});
    const [errors, setErrors] = useState({});
    let token = localStorage.getItem('auth-token');

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
        //console.log(image);
    }

    const changeHandler = (e) => {
        setPet({
            ...pet, [e.target.name]: e.target.value
        })
        //console.log(pet);
    }

    const validationCheck = (e) => {
        e.preventDefault();

        //pet_name validation
        const validationErrors = {};
        if (!pet.pet_name) {
            validationErrors.pet_name = "Pet name is required";
        }

        //user validation
        if (!token) {
            validationErrors.user_name = "Please log in!";
        }

        //image validation
        if (!image) {
            validationErrors.pet_image = "Image is required";
        }

        //age validation
        if (!pet.pet_age) {
            validationErrors.pet_age = "Pet age is required";
        }

        //pet_type validation
        if (!pet.pet_type) {
            validationErrors.pet_type = "Pet type is required";
        }

        //pet_gender validation
        if (!pet.pet_gender) {
            validationErrors.pet_gender = "Pet gender is required";
        }

        //pet_color validation
        if (!pet.pet_color) {
            validationErrors.pet_color = "Pet color is required";
        }

        //pet_description validation
        if (!pet.pet_description) {
            validationErrors.pet_description = "Pet color is required";
        }

        //pet_arrived_date validation
        if (!pet.pet_arrived_date) {
            validationErrors.pet_arrived_date = "Pet arrived date is required";
        }

        //pet_arrived_date validation
        if (!pet.pet_medical_check) {
            validationErrors.pet_medical_check = "Pet medical check is required";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            addPet();
        }
    }

    const addPet = async () => {
        let responseData;
        let response;
        let petData = pet;
        petData.token = token;

        let formData = new FormData();
        formData.append("pet", image);
        //image ko formData pyg
        //key,value // pet,image

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data });
        //formData ko /upload ko POST
        //response ko json pyg, responseData htl htae

        if (responseData.success) {
            petData.pet_image = responseData.image_url;
            // console.log(JSON.stringify(petData));
            await fetch('http://localhost:4000/pets', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(petData),
            }).then((res) => res.json()).then((data) => {response=data})

            if(response.success){
                alert("Pet Added");
                setImage('');
                setPet({pet_name:'',pet_age:'',pet_description:''});
                window.location.reload();
            }else{
                alert("failed");
            }
        }
    }

  return (
      <div className='admin-page'>
          <form onSubmit={validationCheck} className="add-data-form">
              <div className="form-input-imagefield">
                  <label htmlFor="file-input">
                      Upload File :
                      <img src={image ? URL.createObjectURL(image) : upload_area} className='pet-input-thumnail-img' alt="" />
                  </label>
                  <input  onChange={imageHandler} type="file" name='pet_image' id='file-input' hidden />
                  {errors.pet_image && <div className='validation-text'>{errors.pet_image}</div>}
              </div>
              <div className="form-input">
                  <label htmlFor="" className='form-label'>Name :</label>
                  <input value={pet.pet_name} onChange={changeHandler} type="text" name='pet_name' placeholder="enter pet's name" />
              </div>
              {errors.pet_name && <div className='validation-text'>{errors.pet_name}</div>}

              <div className="form-input">
                  <label htmlFor="" className='form-label'>Age :</label>
                  <input value={pet.pet_age} onChange={changeHandler} type="number" name='pet_age' />
              </div>
              {errors.pet_age && <div className='validation-text'>{errors.pet_age}</div>}

              <div className="form-input">
                  <label htmlFor="" className='form-label'>Type :</label>
                  <select  onChange={changeHandler} name='pet_type' id="">
                      <option value="dog" >Dog</option>
                      <option value="cat" >Cat</option>
                      <option value="rabbit" >Rabbit</option>
                      <option value="others" >Others</option>
                  </select>
              </div>
              {errors.pet_type && <div className='validation-text'>{errors.pet_type}</div>}

              <div className="form-input">
                  <label htmlFor="" className='form-label'>Gender :</label>
                  <select  onChange={changeHandler} name="pet_gender" id="">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </select>
              </div>
              {errors.pet_gender && <div className='validation-text'>{errors.pet_gender}</div>}

              <div className="form-input">
                  <label htmlFor="" className='form-label'>Color :</label>
                  <select onChange={changeHandler} name="pet_color" id="">
                      <option value="grey">Grey</option>
                      <option value="orange">Orange</option>
                      <option value="white">White</option>
                      <option value="black">Black</option>
                  </select>
              </div>
              {errors.pet_color && <div className='validation-text'>{errors.pet_color}</div>}

              <div className="form-input">
                  <label htmlFor="" className='form-label'>Description :</label>
                  <textarea value={pet.pet_description} onChange={changeHandler} name="pet_description" id="" placeholder='enter more details about the pet'></textarea>
              </div>
              {errors.pet_description && <div className='validation-text'>{errors.pet_description}</div>}

              <div className="form-input">
                  <label htmlFor="" className='form-label'>Pet Arrived Date :</label>
                  <input onChange={changeHandler} type="date" name='pet_arrived_date' />
              </div>
              {errors.pet_arrived_date && <div className='validation-text'>{errors.pet_arrived_date}</div>}

              <div className="form-input">
                  <p className='form-label'>Medical Check Up :</p>
                  <div className='form-input-radio'>
                      <input onChange={changeHandler} id="med-check-done" type="radio" name='pet_medical_check' value={true} />
                      <label htmlFor="med-check-done">Done</label>
                  </div>
                  <div className='form-input-radio'>
                      <input onChange={changeHandler} id="med-check-not-done" type="radio" name='pet_medical_check' value={false} />
                      <label htmlFor="med-check-not-done">Not Done</label>
                  </div>
              </div>
              {errors.pet_medical_check && <div className='validation-text'>{errors.pet_medical_check}</div>}

              <div className="form-input">
                  <p className='form-label'>Available for Adoption</p>
                  <div className='form-input-radio'>
                      <input onChange={changeHandler} id="med-check-done" type="radio" name='isAdoptable' value={true} />
                      <label htmlFor="med-check-done">Available</label>
                  </div>
                  <div className='form-input-radio'>
                      <input onChange={changeHandler} id="med-check-not-done" type="radio" name='isAdoptable' value={false} />
                      <label htmlFor="med-check-not-done">Not Available</label>
                  </div>
              </div>
              <div className="form-input">
                  <p className='form-label'>Is a Playmate :</p>
                  <div className='form-input-radio'>
                      <input onChange={changeHandler} id="is-playmate" type="radio" name='isPlaymate' value={true} />
                      <label htmlFor="is-playmate">Yes</label>
                  </div>
                  <div className='form-input-radio'>
                      <input onChange={changeHandler} id="not-playmate" type="radio" name='isPlaymate' value={false} />
                      <label htmlFor="not-playmate">No</label>
                  </div>
              </div>
              <div className='submit'>
                  <button type='submit' >Add</button>
              </div>
          </form>
      </div>
  )
}

export default AddPet
