/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './Notifications.css'

const Notifications = () => {

  const[noti,setNoti] = useState([]);

  const fetchInfo = async()=>{
    await fetch('http://localhost:4000/notifications')
    .then((res)=>res.json())
    .then((data)=>setNoti(data))
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  return (
    <div className='notifications'>
      {noti.map((n,index)=>{
        return <div className='each-noti' key={index}>
          {n.type === 'adpForm' ? 
            <p ><span>{n.user.user_name}</span> wants to adopt <span> {n.pet.pet_name}</span></p> 
          : <></>}
          {n.type === 'ownerForm' ?
            <p ><span>{n.user.user_name}</span> wants to claim ownership of <span> {n.pet.pet_name}</span></p>
            : <></>}
          {n.type === 'playmateForm' ?
            <p ><span>{n.user.user_name}</span> wants to hire {n.pet.pet_name} as a playmate.</p>
          : <></>}
          {n.type === 'volunteerForm' ?
            <p ><span>{n.user.user_name}</span> wants to become a volunteer.</p>
            : <></>}
          {n.type === 'newAdoption' ?<>
            <p ><span>{n.user.user_name}</span> adopted <span>{n.pet.pet_name}</span> with <span>${n.amount}</span>.</p>
            <p className='each-noti-admin'>managed by admin {n.admin.admin_name}</p>
            </>: <></>}
          {n.type === 'newDonation' ?<>
            <p ><span>{n.user.user_name}</span> donated <span>${n.amount}</span> for Furry Friends Refuge Shelter.</p>
            <p className='each-noti-admin'>managed by admin {n.admin.admin_name}</p>
            </>: <></>}
          {n.type === 'newPet' ?
            <p ><span>{n.admin.admin_name}</span> added a new pet <span>{n.pet.pet_name}</span></p>
            : <></>}
        </div>
      })}
    </div>
  )
}

export default Notifications
