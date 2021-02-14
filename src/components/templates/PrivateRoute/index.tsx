import React, { FC , useContext , useEffect , useState } from 'react'
import { useHistory } from 'react-router-dom';
import firebase from '../../../apis/FirebaseConf';
import {AuthContext, SET_USER} from '../../../store/Auth';

const PrivateRoute = () => {
  const { AuthState, setAuthState } = useContext(AuthContext);
  const history = useHistory()

  const loginCheck = () => {
    firebase.auth().onAuthStateChanged((result)=> {
      if(result){
        const user = {
          uid: result.uid,
          displayName: null
        }
        setAuthState({type: SET_USER, payload: {user: user}})
      }else{
        history.push('/signin')
      }
    })
  }
  useEffect(()=>{
    loginCheck()
  },[AuthState.user])
  
  return (
    <div>
      
    </div>
  )
}

export default PrivateRoute
