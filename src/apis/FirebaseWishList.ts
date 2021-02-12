
import firebase ,{ db } from './FirebaseConf';
import { WishList } from '../store';

export const fetchWishLists = async(userId: string) => {
  const wishListsRef = db.collection('users').doc(userId).collection('wishLists');
  return await wishListsRef.orderBy('data.priority','asc').get();
}

export const fetchWishListDetail = async(userId: string, listId: string) => {
  const wishListRef = db.collection('users').doc(userId).collection('wishLists').doc(listId);
  return await wishListRef.get()
}

export const createWishList = async(userId: string, listName: string, iconId: string, discardListId: string) => {
  const wishListsRef = db.collection('users').doc(userId).collection('wishLists')
  const wishListsLength =  await wishListsRef.get().then(result=> { return result.size})
  return await wishListsRef.add({
    discardListId: discardListId,
    data: {
      listName: listName,
      iconId: iconId,
      priority: wishListsLength + 1,
      status: '',
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    }
  })
}

export const createOrUpdateWishList = async(userId: string, currentWishListId: string, wishList: WishList) => {
  const wishListsRef = db.collection('users').doc(userId).collection('wishLists')
  if (!currentWishListId) {
    const wishListsLength =  await wishListsRef.get().then(result=> { return result.size})
    return await wishListsRef.add({
      discardListId: '',
      data: {
        listName: wishList.data.listName,
        iconId: wishList.data.iconId,
        priority: wishListsLength + 1,
        status: wishList.data.status,
        createdAt: firebase.firestore.Timestamp.now(),
        updatedAt: firebase.firestore.Timestamp.now(),
      }
    })
  } else {
    return await wishListsRef.doc(currentWishListId).update({
      'data.listName': wishList.data.listName,
      'data.iconId': wishList.data.iconId,
      'data.updatedAt' : firebase.firestore.Timestamp.now(),
    })
  }
}

export const updateWishListPriority = async(userId: string, listId: string, priority: number) => {
  const wishListRef = db.collection('users').doc(userId).collection('wishLists').doc(listId);
  return await wishListRef.update({
      'data.priority': priority,
      'data.updatedAt': firebase.firestore.Timestamp.now()
    }
  )
}

export const deleteWishList = (userId: string) => {
  
}


