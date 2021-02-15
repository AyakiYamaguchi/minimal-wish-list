import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Style from './SigninForm.module.scss';
import SubmitButton from '../../atoms/SubmitButton';
import { SignInWithEmailAndPassword } from '../../../apis/FirebaseAuth';
import { AuthContext , SET_USER } from '../../../store/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const SigninForm = () => {
  const { setAuthState } = useContext(AuthContext)
  const [ error, setError ] = useState('')
  const history = useHistory()

  const validation = Yup.object({
    email: Yup.string()
      .email('形式がemailではありません')
      .required('メールアドレスがが入力されていません'),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, { message: 'パスワードは英数字のみ利用可能です' })
      .matches(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {message: 'パスワードは半角英数字8文字以上で設定してください'})
      .required('パスワードは必須です'),
  })

  const handleAuthError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/wrong-password":
        setError('メールアドレスまたはパスワードに誤りがあります')
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
    },
    validationSchema: validation,
    onSubmit: values => {
      SignInWithEmailAndPassword(values.email, values.password)
        .then((result)=>{
          console.log(result)
          if(result.user){
            const user = {
              uid: result.user.uid,
              displayName: null,
            }
            setAuthState({type: SET_USER, payload: {user: user}})
            history.push('/wish-lists')
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
      { error && <div className={Style.formItem__error_message}>{error}</div> }
      <form onSubmit={formik.handleSubmit} className={Style.form__wrapper}>
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
        <div className={Style.formItem__button_wrapper}>
          <SubmitButton btnText={"サインイン"}/>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
