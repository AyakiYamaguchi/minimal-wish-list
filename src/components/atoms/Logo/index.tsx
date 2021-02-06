import React from 'react'
import LogoImg from '../../../images/logo.png';
import Style from './Logo.module.scss';

const Logo = () => {
  return (
    <div >
      <img src={LogoImg} alt="Logo" className={Style.logo}/>
    </div>
  )
}

export default Logo
