import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <img className='logo' src={assets.Grova} alt="" />
        <h1><span>Food Bank</span>Admin Page</h1>
        <img className='profile' src={assets.lakewest} alt="" />
      </div>
    </div>
  )
}

export default Navbar
