import React, { useContext, useEffect } from 'react'
import Style from './DiscardLists.module.scss';
import FloatingAddButton from '../../atoms/FloatingAddButton'
import DraggableLists from '../../organisms/DraggableLists'
import Footer from '../../organisms/Footer'
import Header from '../../organisms/Header'
import Layout from '../../templates/Layout'
import { StoreContext, DiscardList, SET_DISCARD_LISTS, UPDATE_DISCARD_LIST } from '../../../store';
import { AuthContext } from '../../../store/Auth';
import { fetchDiscardLists, updateDiscardListPriority } from '../../../apis/FirebaseDiscardList';

const DiscardLists = () => {
  const { globalState, setGlobalState } = useContext(StoreContext);
  const { AuthState, setAuthState } = useContext(AuthContext);
  const setDiscardLists = () => {
    fetchDiscardLists(AuthState.user.uid)
      .then(result=>{
        const discardLists:DiscardList[] = []
        result.docs.map((list)=>{
          const discardList = {
            id: list.id,
            data: list.data().data,
            discardListId: list.data().discardListId,
          }
          discardLists.push(discardList)
        })
        setGlobalState({type: SET_DISCARD_LISTS, payload:{discardLists: discardLists}})
      }).catch(error=>{

      })
  }

  const reorderDiscardList = (items:DiscardList[]) => {
    const updatedWishLists: DiscardList[] = []
    items.map((list, index) => {
      const currentPriority = index + 1
      if(list.data.priority !== currentPriority){
        updateDiscardListPriority(AuthState.user.uid, list.id, currentPriority)
          .then(()=>{
            const discardList = {...list, data: {...list.data , priority: currentPriority }}
            setGlobalState({type: UPDATE_DISCARD_LIST, payload:{discardList: discardList}})
            updatedWishLists.push(discardList)
          }).catch((error)=>{
            alert(error)
          })
      }
    })
  }
  useEffect(() => {
    setDiscardLists()
  },[AuthState.user])

  return (
    <div>
      <Header 
        title={'Trashリスト'}
        showAccountSetting={true}
        />
      <Layout>
        <div className={Style.draggable_area_wrap}>
          <DraggableLists
            listType={'discard-lists'}
            lists={globalState.discardLists}
            reorderList={reorderDiscardList}
          />
        </div>
        <div className={Style.btn_wrap}>
          <FloatingAddButton pathName={'/create-discardlist'}/>
        </div>
      </Layout>
      <Footer />
    </div>
  )
}

export default DiscardLists
