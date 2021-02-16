import React, { useState } from 'react'
import Logo from '../../atoms/Logo';
import LoginForm from '../../organisms/LoginForm';
import SignupForm from '../../organisms/SignupForm';
import Layout from '../../templates/Layout';
import Style from './TopPage.module.scss';

const TopPage = () => {
  const [ selectMenu, setSelectMenu ] = useState('login')
  return (
    <div className={Style.background_img}>
      <div className={Style.background_color}>
        <Layout>
          <div className={Style.logo_wrapper}>
            <Logo />
          </div>
          <div className={Style.form_area_wrapper}>
            <div className={Style.tab_wrapper}>
              <div 
                className={`${Style.menu_tab} ${selectMenu === 'login' && Style.selected_tab}`}
                onClick={()=> setSelectMenu('login')}>
                LOGIN
              </div>
              <div 
                className={`${Style.menu_tab} ${selectMenu === 'signup' && Style.selected_tab}`}
                onClick={()=> setSelectMenu('signup')}
              >
                SIGNUP
              </div>
            </div>

            <div className={Style.form_wrapper}>
              { selectMenu === 'login' &&
                <LoginForm />
              }
              { selectMenu === 'signup' &&
                <SignupForm />
              }
            </div>
          </div>

        </Layout>
        
          {/* <div className={Style.button_wrapper}>
            <LinkButton btnText={"ログインする"} pathName={"/signin"}/>
            <LinkButton btnText={"新規登録する"} pathName={"/signup"}/>
          </div> */}
      </div>
    </div>
  )
}

export default TopPage
