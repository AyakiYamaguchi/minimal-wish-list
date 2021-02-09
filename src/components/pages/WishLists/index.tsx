import React, { useContext, useEffect } from 'react';
import DraggableLists from '../../organisms/DraggableLists';
import { fetchWishLists } from '../../../apis/FirebaseWishList';
import { AuthContext } from '../../../store/Auth';
import { StoreContext, SET_WISH_LISTS, WishList } from '../../../store';

const WishLists = () => {
  const { AuthState , setAuthState } = useContext(AuthContext);
  const { globalState, setGlobalState } = useContext(StoreContext);
  const setWishLists = () => {
    const wishLists:WishList[] = []
    fetchWishLists(AuthState.user.uid)
      .then((result)=>{
        result.docs.map((list)=>{
          const wishList = {
            id: list.id,
            data: list.data().data,
            discardListId: list.data().discardListId,
          }
          wishLists.push(wishList)
        })
        setGlobalState({type: SET_WISH_LISTS, payload: {wishLists: wishLists}})
      }).catch((error)=>{
        console.log(error)
      })
  }

  const sortedWisthLists = globalState.wishLists.sort((a,b)=>{
    if(a.data.priority < b.data.priority) return -1;
    if(a.data.priority > b.data.priority) return 1;
    return 0;
  })
  
  useEffect(()=>{
    setWishLists()
  },[AuthState.user.uid])
  return (
    <div>
      <DraggableLists wishLists={sortedWisthLists}/>
      {console.log('------sorted-----')}
      {console.log(sortedWisthLists)}
    </div>
  )
}

export default WishLists
