/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import './EachPet.css'
import {useParams} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';


const Eachpet = () => {
    const { petId } = useParams();
    const[pet,setPet]=useState({});
    const [popUp,setPopUp] = useState('')
    const [image, setImage] = useState(false);
    const [errors, setErrors] = useState({});
    let token = localStorage.getItem('auth-token');


    const fetchInfo =async()=>{
        await fetch(`http://localhost:4000/pets/${petId}`)
        .then((res)=>res.json())
        .then((data)=>setPet(data))
    }
    
    const DeleteHandler = async()=>{
        let response;
        await fetch(`http://localhost:4000/pets/${petId}/delete`,{
            method:"DELETE"
        }).then((res) => res.json())
            .then((data) => response=data)
            if(response.success){
                alert(`${response.name} is removed from the pet list.`)
                window.location.replace('/pets')
            }
    }


    const imageHandler = (e) => {
        setImage(e.target.files[0]);
        console.log(image);
    }

    const changeHandler = (e) => {
        setPet({
            ...pet, [e.target.name]: e.target.value
        })
        console.log(pet);
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
        if (!pet.pet_image) {
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
            updatePet();
        }
    }

    const updatePet = async () => {

        let petData = pet;
        let imageRes;
        let response;
        console.log(image);

        console.log(petData)

        if (!image) {

            await fetch(`http://localhost:4000/pets/${petId}/update`, {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(petData)
            }).then((res) => res.json())
                .then((data) => response = data)
        } else {
            let formdata = new FormData();
            formdata.append("pet", image);

            await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formdata
            }).then((res) => res.json())
                .then((data) => imageRes = data)

            if (imageRes.success) {
                petData.pet_image = imageRes.image_url;
                console.log(petData)

                await fetch(`http://localhost:4000/pets/${petId}/update`, {
                    method: "PUT",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(petData)
                }).then((res) => res.json())
                    .then((data) => response = data)
            }
        }

        if (response.success) {
            alert(`Pet ID ${petId} is updated.`);
            window.location.reload();
        }

    }
    
    useEffect(()=>{
        fetchInfo();
    },[])

return (<>
{
    popUp === '' ? 
    <div className="each-adoption-pet-wrapper">
        <div className="each-adoption-pet">
            <img src={pet.pet_image} alt="" />
            <div className='pet-info'>
                <div className='pet-info-details'>
                    <span>Name :</span><span>{pet.pet_name}</span>
                </div>
                <div className='pet-info-details'>
                    <span>Pet Type :</span><span>{pet.pet_type}</span>
                </div>
                <div className='pet-info-details'>
                    <span >Age :</span><span>{pet.pet_age}</span>
                </div>
                <div className='pet-info-details'>
                    <span >Gender:</span><span>{pet.pet_gender}</span>
                </div>
                <div className='pet-info-details'>
                    <span >Color :</span><span>{pet.pet_color}</span>
                </div>
                <div className='pet-info-details'>
                    <span >Description:</span><span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis eaque, sed ipsum quod deserunt consequatur asperiores iure porro nostrum quos placeat vel. Repellat, consectetur tenetur doloremque exercitationem incidunt hic assumenda.</span>
                </div>
                <div className='pet-info-details'>
                    <span >Arrived Date:</span><span>{pet.pet_arrived_date}</span>
                </div>
                <div className='pet-info-details'>
                    <span >Pet Medical Check </span><span>{pet.pet_medical_check ? "Done" : "Not Done"}</span>
                </div>
                <div className='pet-info-details'>
                    <span >Available for Adoption </span><span>{pet.isAdoptable ? "Available" : "Not Available"}</span>
                </div>
                <div className='submit'>
                    <button onClick={() => { setPopUp('update') }}>Update</button>
                    <button onClick={DeleteHandler}>Delete</button>
                </div>
            </div>
        </div>
    </div>:<></>
}
{
    popUp==='update'?
        <form onSubmit={validationCheck} className="each-adoption-pet-wrapper">
                <div className="add-data-form">
                    <div className="form-input-imagefield">
                            <label htmlFor="file-input">
                                Upload File :
                                <img src={image ? URL.createObjectURL(image) : pet.pet_image} className='pet-input-thumnail-img' alt="" />
                            </label>
                            <input onChange={imageHandler} type="file" name='pet_image' id='file-input' hidden />
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
                            <select onChange={changeHandler} name='pet_type' id="">
                                <option value="dog" >Dog</option>
                                <option value="cat" >Cat</option>
                                <option value="rabbit" >Rabbit</option>
                                <option value="others" >Others</option>
                            </select>
                        </div>
                    {errors.pet_type && <div className='validation-text'>{errors.pet_type}</div>}

                        <div className="form-input">
                            <label htmlFor="" className='form-label'>Gender :</label>
                            <select onChange={changeHandler} name="pet_gender" id="">
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
            </div>
            <div className='submit'>
                <button onClick={()=>{setPopUp("")}}>Back</button>
                <button type='submit'>Update</button>
            </div>
                {errors.user_name && <div className='validation-text'>{errors.user_name}</div>}

        </form>
    :<></>
}
    
</>
    
  )
}

export default Eachpet
