import React, { useContext, useState, useEffect } from 'react'
import Style from './AccountSettings.module.scss';
import firebase from '../../../apis/FirebaseConf';
import { SignOut } from '../../../apis/FirebaseAuth';
import { AuthContext, DELETE_USER } from '../../../store/Auth';
import Layout from '../../templates/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DeleteButton from '../../atoms/DeleteButton';
import Header from '../../organisms/Header';
import { useHistory } from 'react-router-dom';

type User = {
  displayName: string | null;
  email: string | null;
  providerId: string | undefined;
}

const AccountSettings = () => {
  const { setAuthState } = useContext(AuthContext);
  const [ user, setUser ] = useState<User>()
  const history = useHistory()

  const getUserInfo = () => {
    firebase.auth().onAuthStateChanged((result)=>{
      if (result) {
        const user = {
          displayName: result.displayName,
          email: result.email,
          providerId: result.providerData[0]?.providerId,
        }
        setUser(user)
      }
    })
  }

  const signOut = () => {
    SignOut().then(()=>{
      setAuthState({type: DELETE_USER})
      history.push('/top')
    }).catch(error=>{
      alert(error)
    })
  }
  useEffect(() => {
    getUserInfo()
  },[])

  return (
    <div>
      <Header 
        title={'アカウント情報'}
        backBtnUrl={'/wish-lists'}
        showAccountSetting={false}
      />
      { user &&
      <Layout>
        <div className={Style.account_area_wrap}>
          <div className={Style.icon_wrap}>
            <FontAwesomeIcon icon={faUserCircle} className={Style.account_icon}/>
          </div>
          <div className={Style.email_wrap}>
            <div className={Style.email_label}>メールアドレス</div>
            <div className={Style.email_data}>{user.email}</div>
          </div>
          <div className={Style.signout_btn_wrap}>
            <DeleteButton btnText={'サインアウト'} handleClick={signOut}/>
          </div>
        </div>
      </Layout>
      }
    </div>
  )
}

export default AccountSettings
