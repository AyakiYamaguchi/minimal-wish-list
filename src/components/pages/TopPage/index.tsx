import React, { useState } from 'react'
import LinkButton from '../../atoms/LinkButton';
import Logo from '../../atoms/Logo';
import SigninForm from '../../organisms/SigninForm';
import SignupForm from '../../organisms/SignupForm';
import Layout from '../../templates/Layout';
import Style from './TopPage.module.scss';

const TopPage = () => {
  const [ selectMenu, setSelectMenu ] = useState('signin')
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
                className={`${Style.menu_tab} ${selectMenu === 'signin' && Style.selected_tab}`}
                onClick={()=> setSelectMenu('signin')}>
                SIGN IN
              </div>
              <div 
                className={`${Style.menu_tab} ${selectMenu === 'signup' && Style.selected_tab}`}
                onClick={()=> setSelectMenu('signup')}
              >
                SIGN UP
              </div>
            </div>

            <div className={Style.form_wrapper}>
              { selectMenu === 'signin' &&
                <SigninForm />
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
