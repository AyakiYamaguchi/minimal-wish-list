
import firebase ,{ db } from './FirebaseConf';
import { WishList } from '../store';

export const fetchWishLists = async(userId: string) => {
  const wishListsRef = db.collection('users').doc(userId).collection('wishLists');
  return await wishListsRef.get();
}

export const changeTheOrderOfWishLists = (wishLists: WishList[]) => {

}

export const createWishList = (userId: string) => {

}

export const updateWishList = (userId: string) => {
  
}

export const deleteWishList = (userId: string) => {
  
}