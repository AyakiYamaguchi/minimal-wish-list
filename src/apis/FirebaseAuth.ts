import firebase from './FirebaseConf';

export const SignupWithEmailAndPassword = async(email: string ,password: string ) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, password)
  // .then((result)=>{
  //   const user = {
  //     uid: result.user?.uid,
  //     displayName: result.user?.displayName
  //   }
  //   return user
  // })
  // .catch((error)=>{
  //   return error
  // })
}

export const SignInWithEmailAndPassword = async(email: string ,password: string ) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result)=>{
    const user = {
      uid: result.user?.uid,
      displayName: result.user?.displayName
    }
    return user
  })
  .catch((error)=>{
    return error
  })
}