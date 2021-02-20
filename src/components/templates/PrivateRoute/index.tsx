import React, { FC, useContext , useEffect , useState } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom';
import firebase from '../../../apis/FirebaseConf';
import {AuthContext, SET_USER} from '../../../store/Auth';
import Loading from '../Loading';


const PrivateRoute:FC<RouteProps> = (props) => {
  const { AuthState, setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)
  let currentUserId = AuthState.user.uid
  const loginCheck = () => {
    firebase.auth().onAuthStateChanged((result)=> {
      if(result){
        const user = {
          uid: result.uid,
          displayName: null
        }
        setAuthState({type: SET_USER, payload: {user: user}})
      }
      setLoading(false)
    })
  }
  useEffect(()=>{
    loginCheck()
  },[])
  
  return (
    <div>
      { !loading ? 
        <Route
          render={()=>
            currentUserId ? (
              <Route {...props} />
            ) : (
              <Redirect to="top" />
            )
          }
        /> : <Loading /> 
      }
    </div>
  )
}

export default PrivateRoute
