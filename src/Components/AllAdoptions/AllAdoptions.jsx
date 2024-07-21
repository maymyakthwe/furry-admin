import React, { useEffect, useState } from 'react'
import './AllAdoptions.css'

const AllAdoptions = () => {

    const [adoptions, setAdoptions] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/adoptions')
            .then((res) => res.json())
            .then((data) => { setAdoptions(data) });
    }

    const deleteAdoption = async (id) => {
        let response;
        await fetch(`http://localhost:4000/adoptions/${id}/delete`, {
            method: 'DELETE'
        }).then((res) => res.json())
            .then((data) => response = data)
        if (response.success) {
            alert('adoption removed')
            window.location.replace('/adoptions')
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

  return (
      <div className='all-adoptions'>
          <table className='table'>
              <tr>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Pet</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Managed by </th>
                  <th></th>
                  <th></th>
              </tr>
              {adoptions.map((a, index) => {
                  return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{a.user.user_name}</td>
                      <td>{a.pet.pet_name}</td>
                      <td>{a.adoption_amount}</td>
                      <td>{a.adoption_date}</td>
                      <td>{a.adoption_description ? a.adoption_description : "none"}</td>
                      <td>{a.admin.admin_name}</td>
                      <td className='table-button'>Update</td>
                      <td onClick={() => { deleteAdoption(a._id) }} className='table-button'>Remove</td>
                  </tr>
              })}
          </table>
      </div>
  )
}

export default AllAdoptions
