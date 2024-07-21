import React from 'react'
import './Footer.css'
import logo from '../../Assets/images/FFRLogo.png'

const Footer = () => {
    return (
        <div className='footer'>
            <img src={logo} alt="" />
            <p><span>&#169;</span> 2024 Furry Friends Refuge. All rights reserved.</p>
        </div>
    )
}

export default Footer