import firebase ,{ db } from './FirebaseConf';

export const fetchDiscardLists = async(userId: string) => {
  const discardListsRef = db.collection('users').doc(userId).collection('discardLists')
  return await discardListsRef.orderBy('data.priority','asc').get();
}

export const fetchDiscardListDetail = async(userId: string, listId: string) => {
  const discardListRef = db.collection('users').doc(userId).collection('discardLists').doc(listId)
  return await discardListRef.get()
}

export const createDiscardList = async(userId:string, listName: string, iconId: string) => {
  const discardListsRef = db.collection('users').doc(userId).collection('discardLists')
  const discardListsLength = await discardListsRef.get().then(result=> { return result.size})
  return await discardListsRef.add({
    wishListId: '',
    data: {
      listName: listName,
      iconId: iconId,
      priority: discardListsLength + 1,
      status: '',
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    }
  })
}

export const updateDiscardList = async(userId: string, listId: string, listName: string, iconId: string) => {
  const discardListRef = db.collection('users').doc(userId).collection('discardLists').doc(listId);
  return await discardListRef.update({
    'data.listName': listName,
    'data.iconId': iconId,
    'data.updatedAt' : firebase.firestore.Timestamp.now(),
  })
}

export const updateDiscardListPriority = async(userId: string, listId: string, priority: number) => {
  const discardListRef = db.collection('users').doc(userId).collection('discardLists').doc(listId);
  return await discardListRef.update({
      'data.priority': priority,
      'data.updatedAt': firebase.firestore.Timestamp.now()
    }
  )
}

export const updateWishListId = async(userId: string, discardListId: string, wishListId: string) => {
  const discardListRef = db.collection('users').doc(userId).collection('discardLists').doc(discardListId)
  return await discardListRef.update({
    wishListId: wishListId
  })
}

export const deleteDiscardList = async(userId: string, listId: string) => {
  const discardListRef = db.collection('users').doc(userId).collection('discardLists').doc(listId)
  return await discardListRef.delete();
}

export const changeDidcardListFinished = async(userId: string, listId: string, finished: boolean) => {
  const discardListRef = db.collection('users').doc(userId).collection('discardLists').doc(listId)
  return await discardListRef.update({
    'data.finished': finished,
    'data.updatedAt': firebase.firestore.Timestamp.now()
  })
}