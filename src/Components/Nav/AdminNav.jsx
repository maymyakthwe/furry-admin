import React, { useEffect, useState } from 'react'
import FFRLogo from '../../Assets/images/FFRLogo.png'
import profile from '../../Assets/images/profile.png'
import './AdminNav.css'

const AdminNav = () => {

    const [admin,setAdmin]=useState({});

    const fetchInfo = async()=>{
        const adminId= localStorage.getItem("auth-token");
        if(adminId){
            await fetch(`http://localhost:4000/admin/${adminId}`)
            .then((res)=>res.json())
            .then((data)=>setAdmin(data))
        }
    }

    const logout = () => {
        localStorage.removeItem('auth-token');
        window.location.replace('/');
    }

    useEffect(()=>{
        fetchInfo();
    },[])

  return (
      <div className='navbar'>
          <div className='nav-wrapper'>
              <a href='/home' className="nav-home">
                  <img className='nav-logo' src={FFRLogo} alt="" />
                  <p>Furry Friends Refuge</p>
              </a>
              <div className="nav-links">
                  <a href="/adoptions">Adoptions<hr /></a>
                  <a href="/donations">Donations<hr /></a>
                  <a href="/pets">Manage Pets<hr /></a>
                  {localStorage.getItem('auth-token') ?
                      <div className='dropdown'><i className="fa-regular fa-user"></i><span className='nav-name'>{admin.admin_name}</span>
                          <div className='dropdown-content'>
                              <div className="profile-heading">
                                <div >{admin.admin_email}</div>
                              </div>
                              <div className="profile-logout"><button onClick={logout}>Logout</button></div>
                          </div>
                      </div> :
                      <>
                          <a href="/">Login <hr /></a>
                          <a href="/signup">Signup <hr /></a>
                      </>}

              </div>
          </div>

      </div>
  )
}

export default AdminNav
