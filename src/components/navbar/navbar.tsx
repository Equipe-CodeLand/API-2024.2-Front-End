import React from 'react'
import Logo from '../../../public/images/Logo.png'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import './style.css'

const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
      <DensityMediumIcon className='icon'/>
      <div className="navbar-logo">
        <img src={Logo} alt='logo' className='logo'/>
      </div>
    </div>
  )
}

export default Navbar