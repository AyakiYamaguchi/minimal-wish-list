
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
      finished: false,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    }
  })
}

export const updateWishList = async(userId: string, listId: string, listName: string, iconId: string) => {
  const wishListsRef = db.collection('users').doc(userId).collection('wishLists')
  return await wishListsRef.doc(listId).update({
    'data.listName': listName,
    'data.iconId': iconId,
    'data.updatedAt' : firebase.firestore.Timestamp.now(),
  })
}

export const updateWishListPriority = async(userId: string, listId: string, priority: number) => {
  const wishListRef = db.collection('users').doc(userId).collection('wishLists').doc(listId);
  return await wishListRef.update({
      'data.priority': priority,
      'data.updatedAt': firebase.firestore.Timestamp.now()
    }
  )
}

export const deleteWishList = async(userId: string, listId: string) => {
  const wishListRef = db.collection('users').doc(userId).collection('wishLists').doc(listId);
  return await wishListRef.delete()
}

export const chengeWishListFinished = async(userId: string, listId: string, finished: boolean) => {
  const wishListRef = db.collection('users').doc(userId).collection('wishLists').doc(listId);
  return await wishListRef.update({
    'data.finished': finished,
    'data.updatedAt': firebase.firestore.Timestamp.now()
  })
}

export const addWishListMemo = async(userId: string, listId: string, text: string ) => {
  const wishListRef = db.collection('users').doc(userId).collection('wishLists').doc(listId);
  return await wishListRef.update({
    memos: firebase.firestore.FieldValue.arrayUnion({
      text: text,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    })
  })
}