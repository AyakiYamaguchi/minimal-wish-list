import firebase from './FirebaseConf';

export const SignupWithEmailAndPassword = async(email: string ,password: string ) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const SignInWithEmailAndPassword = async(email: string ,password: string ) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password)
}

export const SignOut = async() => {
  return await firebase.auth().signOut()
}