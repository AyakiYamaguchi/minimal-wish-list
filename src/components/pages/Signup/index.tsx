import React from 'react'
import Style from './Signup.module.scss';
import SignupForm from '../../organisms/SignupForm'
import Logo from '../../atoms/Logo';

const Signup = () => {
  return (
    <div className={Style.wrapper}>
      <div className={Style.logo_wrapper}>
        <Logo />
      </div>
      <h2 className={Style.title}>ユーザー新規登録</h2>
      <SignupForm />
    </div>
  )
}

export default Signup
