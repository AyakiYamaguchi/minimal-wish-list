import React, { useContext, useEffect } from 'react';
import Style from './WishLists.module.scss';
import DraggableLists from '../../organisms/DraggableLists';
import { fetchWishLists, updateWishListPriority } from '../../../apis/FirebaseWishList';
import { AuthContext } from '../../../store/Auth';
import { StoreContext, SET_WISH_LISTS, WishList } from '../../../store';
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
            memos: list.data().memos,
          }
          wishLists.push(wishList)
        })
        setGlobalState({type: SET_WISH_LISTS, payload: {wishLists: wishLists}})
      }).catch((error)=>{
        console.log(error)
      })
  }

  const reorderWishList = (items: WishList[]) => {
    const updatedWishLists: WishList[] = []
    items.map(async (list, index) => {
      const currentPriority = index + 1
      if(list.data.priority !== currentPriority){
          const wishList = {...list, data: {...list.data , priority: currentPriority }}
          updatedWishLists.push(wishList)
      }
    })
    setGlobalState({type: SET_WISH_LISTS, payload: {wishLists: updatedWishLists}})
  }
  const updateFirestoreWishList = async (items: WishList[]) => {
    items.map((list, index) => {
      const currentPriority = index + 1
      if(list.data.priority !== currentPriority){
        updateWishListPriority(AuthState.user.uid, list.id, currentPriority)
      }
    })
  }
  
  useEffect(()=>{
    setWishLists()
  },[AuthState.user.uid])

  return (
    <div>
      <Header 
        title={'Wishリスト'}
        showAccountSetting={true}
        />
      <Layout>
        <div className={Style.draggable_area_wrap}>
          <DraggableLists
            listType={'wish-lists'}
            lists={globalState.wishLists}
            reorderList={reorderWishList}
            updateFirestoreList={updateFirestoreWishList}
          />
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
