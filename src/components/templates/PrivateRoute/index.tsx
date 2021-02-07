import React, { FC , useContext , useEffect , useState } from 'react'
import firebase from '../../../apis/FirebaseConf';
import {AuthContext, SET_USER} from '../../../store/Auth';

const PrivateRoute = () => {
  const { AuthState, setAuthState } = useContext(AuthContext);
  let currentUserId = AuthState.user.uid;

  const loginCheck = () => {
    firebase.auth().onAuthStateChanged((result)=> {
      if(result){
        const user = {
          uid: result.uid,
          displayName: null
        }
        setAuthState({type: SET_USER, payload: {user: user}})
      }
    })
  }
  useEffect(()=>{
    loginCheck()
  },[currentUserId])
  
  return (
    <div>
      
    </div>
  )
}

export default PrivateRoute
