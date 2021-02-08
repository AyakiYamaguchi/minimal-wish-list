
import firebase ,{ db } from './FirebaseConf';
import { WishList } from '../store';

export const fetchWishLists = async(userId: string) => {
  const wishListsRef = db.collection('users').doc(userId).collection('wishLists');
  return await wishListsRef.orderBy('data.priority','asc').get();
}

export const createWishList = (userId: string) => {

}

export const updateWishList = async(userId: string, listId: string, priority: number) => {
  const wishListRef = db.collection('users').doc(userId).collection('wishLists').doc(listId);
  return await wishListRef.update({
      'data.priority': priority,
      'data.updatedAt': firebase.firestore.Timestamp.now()
    }
  )
}

export const deleteWishList = (userId: string) => {
  
}