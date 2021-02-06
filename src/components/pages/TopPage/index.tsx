import React from 'react'
import LinkButton from '../../atoms/LinkButton';
import Logo from '../../atoms/Logo';
import Style from './TopPage.module.scss';

const TopPage = () => {
  return (
    <div className={Style.background_img}>
      <div className={Style.background_color}>
        <div className={Style.content_wrapper}>
          <Logo />
          <div className={Style.button_wrapper}>
            <LinkButton btnText={"ログインする"} pathName={"/signin"}/>
            <LinkButton btnText={"新規登録する"} pathName={"/signup"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopPage
