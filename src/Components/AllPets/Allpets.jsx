/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './Allpets.css'
import {Link} from 'react-router-dom'

const Allpets = () => {

  const [pet, setPet] = useState([]);
  const [filter,setFilter] = useState(false);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/pets')
      .then((res) => res.json())
      .then((data) => { 
        if(!filter){
          setPet(data);
        }else{
          let pets = data.filter((d) => filter.type? d.pet_type === filter.type : d)
            .filter((d) => filter.color ? d.pet_color === filter.color : d)
            .filter((d) => filter.gender ? d.pet_gender === filter.gender : d)
          setPet(pets);
        }
      });
  }

  const typeHandler = (e)=>{
    setFilter({
      ...filter,"type":e.target.value
    })
    console.log(filter);
  }
  const genderHandler = (e) => {
    setFilter({
      ...filter, "gender": e.target.value
    })
    console.log(filter);
  }
  const colorHandler = (e) => {
    setFilter({
      ...filter, "color": e.target.value
    })
    console.log(filter);
  }

  const clearFilter = ()=>{
    setFilter(false);
    const options = document.querySelectorAll('.select')
    options.forEach(o=> {
      o.selectedIndex = 0;
    });
  }


  useEffect(() => {
    fetchInfo();
  }, [filter])



  return (
    <div className='adoption'>
      <div className="adoption-headline">
        <h1>When you adopt, you save a life and gain a best friend</h1>
      </div>
      <div className='filter-text'>
      <p >Filters :</p>
      <button onClick={clearFilter}>clear filter</button>
      </div>
      <div className="adoption-filter-wrapper">
        <div className="adoption-filter">
          <label htmlFor="">Type</label>
          <select  onChange={typeHandler} name="" className="select" >
            <option value="" selected disabled hidden>Choose here</option>
            <option value="dog">dog</option>
            <option value="cat">cat</option>
            <option value="rabbit">rabbit</option>
            <option value="others">others</option>
          </select>
        </div>
        <div className="adoption-filter">
          <label htmlFor="">Gender</label>
          <select onChange={genderHandler} name="" className="select">
            <option value="" selected disabled hidden>Choose here</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="adoption-filter">
          <label htmlFor="">Color</label>
          <select onChange={colorHandler} name="" className="select" >
            <option value="" selected disabled hidden>Choose here</option>
            <option value="grey">grey</option>
            <option value="white">white</option>
            <option value="orange">orange</option>
            <option value="black">black</option>
          </select>
        </div>
      </div>

      <div className="adoption-filter-result">
        {pet.length>0?pet.map((d, index) => {
          return <Link key={index} to={`/pets/${d.pet_id}`} className="adoption-pet">
            <img src={d.pet_image} alt="" />
            <p>{d.pet_name}<span>{d.pet_id}</span></p>
          </Link>
        }):<div className='no-pet'>No Pet Exist On this filter</div>}
      </div>
    </div>
  )
}

export default Allpets
