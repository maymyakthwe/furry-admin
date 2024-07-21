import React, { useEffect, useState } from 'react'
import './AllDonation.css'

const AllDonations = () => {

    const [donations, setDonations] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/donations')
            .then((res) => res.json())
            .then((data) => { setDonations(data) });
    }

    const deleteDonation = async (id) => {
      let response;
      await fetch(`http://localhost:4000/donations/${id}/delete`,{
        method:'DELETE'
      }).then((res) => res.json())
        .then((data) => response = data)
      if (response.success) {
        alert('donation removed')
        window.location.replace('/donations')
      }
    }

    useEffect(() => {
        fetchInfo();
    }, [])


  return (
    <div className='all-donations'>
      <table  className='table'>
        <thead>
              <tr>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Managed by </th>
                  <th></th>
                  <th></th>
              </tr>
        </thead>
        <tbody>
              {donations.map((d, index) => {
                  return <tr key={index}>
                  <td>{index+1}</td>
                  <td>{d.user.user_name}</td>
                  <td>{d.donate_amount}</td>
                  <td>{d.donate_date}</td>
                  <td>{d.donate_description?d.donate_description:"none"}</td>
                  <td>{d.admin.admin_name}</td>
                  <td className='table-button'>Update</td>
                  <td onClick={()=>{deleteDonation(d._id)}} className='table-button'>Remove</td>
              </tr>
              })}
        </tbody>
          </table>
    </div>
  )
}

export default AllDonations
