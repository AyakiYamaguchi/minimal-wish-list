import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../../organisms/LoginForm/LoginForm.module.scss';
import { useHistory } from 'react-router-dom';
import SubmitButton from '../../atoms/SubmitButton';
import { SignupWithEmailAndPassword } from '../../../apis/FirebaseAuth';
import { AuthContext, SET_USER } from '../../../store/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const SignupForm = () => {
  const { setAuthState } = useContext(AuthContext)
  const [error, setError] = useState('')
  const history = useHistory()

  const validation = Yup.object({
    email: Yup.string()
      .email('形式がメールアドレスではありません')
      .required('メールアドレスが入力されていません'),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, { message: 'パスワードは英数字のみ利用可能です' })
      .matches(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {message: 'パスワードは半角英数字8文字以上で設定してください'})
      .required('パスワードは必須です'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'パスワードと確認用パスワードが一致しません。')
      .required('確認用パスワードは必須です'),
  })

  const handleAuthError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setError('このメールアドレスはすでに登録されています')
        break;
      default:
        setError('エラーが発生しました。しばらくしてから再度お試しください')
        console.log(errorCode)
    }
  }

  const formik = useFormik({
    initialValues: {
      email:'',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validation,
    onSubmit: values => {
      SignupWithEmailAndPassword(values.email, values.password)
        .then((result)=>{
          console.log(result)
          if(result.user){
            const user = {
              uid: result.user.uid,
              displayName: null,
            }
            setAuthState({type: SET_USER, payload: {user: user}})
            history.push('/onboading/create-list')
          }
        })
        .catch((error)=>{
          handleAuthError(error.code)
          console.log(error)
        })
    },
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={Style.form__wrapper}>
        { error && <div className={Style.formItem__error_message}>{error}</div> }
        <div className={Style.formItem__wrapper}>
          <FontAwesomeIcon icon={faEnvelope} className={Style.icon}/>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={Style.formItem__input}
            placeholder={'メールアドレス'}
          />
        </div>
        { formik.touched.email && formik.errors.email &&
            <div className={Style.formItem__error_message}>{formik.errors.email}</div> }

        <div className={Style.formItem__wrapper}>
          <FontAwesomeIcon icon={faKey} className={Style.icon}/>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={Style.formItem__input}
            placeholder={'パスワード'}
          />
        </div>
        { formik.touched.password && formik.errors.password &&
            <div className={Style.formItem__error_message}>{formik.errors.password}</div> }

        <div className={Style.formItem__wrapper}>
        <FontAwesomeIcon icon={faKey} className={Style.icon}/>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className={Style.formItem__input}
            placeholder={'確認用パスワード'}
          />
        </div>
        { formik.touched.confirmPassword && formik.errors.confirmPassword && 
            <div className={Style.formItem__error_message}>{formik.errors.confirmPassword}</div> }
            
        <div className={Style.formItem__button_wrapper}>
          <SubmitButton btnText={"サインアップ"}/>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
