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

  //select all checkboxes
  const selectAll = () =>{
    const checkboxes = document.getElementsByClassName('noti-checkbox')
    const cbArray = [...checkboxes];
    cbArray.forEach((cb)=>{
      cb.checked=true;
    })
  }

  //deselect all checkboxes
  const deSelectAll = () => {
    const checkboxes = document.getElementsByClassName('noti-checkbox')
    const cbArray = [...checkboxes];
    cbArray.forEach((cb) => {
      cb.checked = false;
    })
  }

  //Noti Delete
  const deleteNoti = async (id) => {
    
    const checkboxes = document.getElementsByClassName('noti-checkbox')
    //spread to turn nodelist into array type
    const cbArray = [...checkboxes];

    //filter checked notis
    const checkedNoti = cbArray.filter((cb)=>{
      return cb.checked===true
    })
    
    //get Noti Ids
    const NotiIds = checkedNoti.map((cb)=>{
      return cb.value;
    })

    //noti deletion
    //if none is checked
    if(NotiIds.length===0){

      alert("Please select noti to delete")
      
    //if many is checked
    }else if (NotiIds.length>0){
     
      //map all checked Noti and delete each one
      NotiIds.forEach(async(notiId)=>{
        await fetch(`http://localhost:4000/noti/${notiId}/delete`, {
          method: 'DELETE'
        })
      })
      window.location.reload();
    }
  }


  useEffect(()=>{
    fetchInfo();
  },[])

  return (
    <div className='notifications'>
      <div>
        <button onClick={selectAll}>select all</button>
        <button onClick={deSelectAll}>deselect all</button>
        <button onClick={deleteNoti}>delete</button>
      </div>
      {noti.map((n,index)=>{
        return <div className='each-noti' key={index}>
          {n.type === 'adpForm' ? 
            <p ><input type="checkbox" name='noti_id' value={n._id} className='noti-checkbox'/>
            <span>{n.user.user_name}</span> wants to adopt <span> {n.pet.pet_name}</span></p> 
          : <></>}
          {n.type === 'ownerForm' ?
            <p ><input type="checkbox" name='noti_id' value={n._id} className='noti-checkbox'/>
              <span>{n.user.user_name}</span> wants to claim ownership of <span> {n.pet.pet_name}</span></p>
            : <></>}
          {n.type === 'playmateForm' ?
            <p ><input type="checkbox" name='noti_id' value={n._id} className='noti-checkbox'/>
              <span>{n.user.user_name}</span> wants to hire {n.pet.pet_name} as a playmate.</p>
          : <></>}
          {n.type === 'volunteerForm' ?
            <p ><input type="checkbox" name='noti_id' value={n._id} className='noti-checkbox'/>
              <span>{n.user.user_name}</span> wants to become a volunteer.</p>
            : <></>}
          {n.type === 'newAdoption' ?<>
            <p ><input type="checkbox" name='noti_id' value={n._id} className='noti-checkbox'/>
            <span>{n.user.user_name}</span> adopted <span>{n.pet.pet_name}</span> with <span>${n.amount}</span>.</p>
            <p className='each-noti-admin'>managed by admin {n.admin.admin_name}</p>
            </>: <></>}
          {n.type === 'newDonation' ?<>
            <p ><input type="checkbox" name='noti_id' value={n._id} className='noti-checkbox'/>
              <span>{n.user.user_name}</span> donated <span>${n.amount}</span> for Furry Friends Refuge Shelter.</p>
            <p className='each-noti-admin'>managed by admin {n.admin.admin_name}</p>
            </>: <></>}
          {n.type === 'newPet' ?
            <p ><input type="checkbox" name='noti_id' value={n._id} className='noti-checkbox'/>
              <span>{n.admin.admin_name}</span> added a new pet <span>{n.pet.pet_name}</span></p>
            : <></>}
        </div>
      })}
    </div>
  )
}

export default Notifications
