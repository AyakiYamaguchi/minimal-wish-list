import React from 'react'
import Style from './LandingPage.module.scss';
import { Link } from 'react-router-dom';
import topImage from '../../../images/landing_page_image.png';
import Logo from '../../atoms/Logo';

const LandingPage = () => {
  return (
    <div className={Style.top_area_wrapper}>
      <div className={Style.logo_wrapper}>
        <Logo />
      </div>
      <div className={Style.top_message_wrapper}>
        <p className={Style.top_message}>1つ買ったら、1つ捨てる</p>
        <p className={Style.top_message}>1つ始めたら、1つやめる</p>
      </div>
      <div className={Style.top_image_background}>
        <img src={topImage} alt="topImage" className={Style.top_image}/>
      </div>
      <p className={Style.description}>MinimaListは1IN1OUTの原則でやりたいこと・欲しい物リストをつくれるサービスです。</p>
      <div className={Style.btn_wrapper}>
        <Link to="/top">
          <button className={Style.btn}>つかってみる</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
