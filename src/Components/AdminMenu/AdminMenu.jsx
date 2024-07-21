import React from 'react'
import "./AdminMenu.css"

const AdminMenu = () => {
  return (
    <div className="admin-menu-wrapper">
      <div className='admin-menu'>
        <div className="admin-data">
          <h3>Total Pets</h3>
          <p>Dog: <span>35</span></p>
          <p>Cats: <span>35</span></p>
          <p>Rabbits: <span>6</span></p>
          <p>Others: <span>23</span></p>
        </div>
        <div className="admin-data">
          <h3>Up for Adoption</h3>
          <p>Dog: <span>35</span></p>
          <p>Cats: <span>35</span></p>
          <p>Rabbits: <span>6</span></p>
          <p>Others: <span>23</span></p>
        </div>
        <div className="admin-data">
          <h3>Up for Playmate</h3>
          <p>Dog: <span>35</span></p>
          <p>Cats: <span>35</span></p>
        </div>
      </div>
      
    </div>
  )
}

export default AdminMenu
