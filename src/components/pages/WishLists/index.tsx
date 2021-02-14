import React, { useContext, useEffect } from 'react';
import Style from './WishLists.module.scss';
import DraggableLists from '../../organisms/DraggableLists';
import { fetchWishLists, updateWishListPriority } from '../../../apis/FirebaseWishList';
import { AuthContext } from '../../../store/Auth';
import { StoreContext, SET_WISH_LISTS, WishList, UPDATE_WISH_LIST } from '../../../store';
import Footer from '../../organisms/Footer';
import Header from '../../organisms/Header';
import FloatingAddButton from '../../atoms/FloatingAddButton';
import Layout from '../../templates/Layout';

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

  const reorderWishList = (items: WishList[]) => {
    const updatedWishLists: WishList[] = []
    items.map((list, index) => {
      const currentPriority = index + 1
      if(list.data.priority !== currentPriority){
          updateWishListPriority(AuthState.user.uid, list.id, currentPriority)
          .then(()=>{
            const wishList = {...list, data: {...list.data , priority: currentPriority }}
            setGlobalState({type: UPDATE_WISH_LIST, payload:{wishList: wishList}})
            updatedWishLists.push(wishList)
            console.log(wishList)
            console.log('--------')
            console.log(updatedWishLists)
            console.log('--------')
          }).catch((error)=>{
            alert(error)
          })
      }
    })
    console.log(updatedWishLists)
    // setGlobalState({type: SET_WISH_LISTS, payload: {wishLists: updatedWishLists}})
  }
  
  useEffect(()=>{
    setWishLists()
  },[AuthState.user.uid])
  return (
    <div>
      <Header 
        title={'Your wish list'}
        showAccountSetting={true}
        />
      <Layout>
        <div className={Style.draggable_area_wrap}>
          <DraggableLists lists={sortedWisthLists} reorderList={reorderWishList}/>
        </div>
        <div className={Style.btn_wrap}>
          <FloatingAddButton pathName={'/create-wishlist'}/>
        </div>
      </Layout>
      <Footer />
    </div>
  )
}

export default WishLists
