import React, { useEffect, useState, useContext } from 'react';
import Style from './DiscardListDetail.module.scss';
import { useParams } from 'react-router-dom';
import { WishList, DiscardList} from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { fetchWishListDetail } from '../../../apis/FirebaseWishList';
import { fetchDiscardListDetail, addDiscardListMemo } from '../../../apis/FirebaseDiscardList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import Header from '../../organisms/Header';
import Layout from '../../templates/Layout';
import TitleText from '../../atoms/TitleText';
import ListItemDetail from '../../molecules/ListItemDetail';
import ExchangeArrow from '../../atoms/ExchangeArrow';
import MemoLists from '../../organisms/MemoLists';
import MemoForm from '../../organisms/MemoForm';

type RouteParams = {
  id: string;
}

const DiscardListDetail = () => {
  const [wishList, setWishList] = useState<WishList>();
  const [discardList, setDiscardList] = useState<DiscardList>();
  const { AuthState } = useContext(AuthContext);
  const {id} = useParams<RouteParams>();
  const uid = AuthState.user.uid;

  const getDiscardList = () => {
    fetchDiscardListDetail(uid, id)
      .then( result => {
        if(result){
          const discardList = {
            id: result.id,
            wishListId: result.data()?.wishListId,
            data: result.data()?.data,
            memos: result.data()?.memos && result.data()?.memos.map((list: any)=>{
              const memo = {
                ...list,
                createdAt: list.createdAt.toDate(),
                updatedAt: list.updatedAt.toDate(),
              }
              return memo
            }),
          }
          setDiscardList(discardList)
          if(discardList.wishListId){
            getWishList(discardList.wishListId)
          }
        }
      }).catch(error=>{
        alert(error)
      })
  }

  const getWishList = (wishListId: string) => {
    fetchWishListDetail(uid,wishListId)
      .then( result => {
        if(result){
          const wishList = {
            id: result.id,
            discardListId: result.data()?.discardListId,
            data: result.data()?.data,
            memos: result.data()?.memos,
          }
          setWishList(wishList)
        }
      }).catch(error => [
        alert(error)
      ])
  }

  const addMemo = (values: { memo:string }) => {
    addDiscardListMemo(uid, id, values.memo).then(result =>{
      console.log(result)
      const memo = {
        text: values.memo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      if(discardList){
        const updatedDiscardLists = {
          ...discardList,
          memos: discardList.memos ? [...discardList.memos, memo] : [memo]}
        setDiscardList(updatedDiscardLists)
      }
    }).catch(error=>{
      alert(error)
    })
  }

  useEffect(()=>{
    if(AuthState.user){
      getDiscardList()
    }
  },[AuthState.user])

  return (
    <div>
      <Header 
        title={'リスト詳細'}
        backBtnUrl={'/discard-lists'}
        showAccountSetting={false}
      />
      
      <Layout>
      {  discardList &&
          <section>
          <div className={Style.title_wrap}>
            <FontAwesomeIcon icon={faTrashAlt} className={Style.icon}/>
            <TitleText title={'Trashリスト'}/>
          </div>
          <ListItemDetail 
            listName={discardList.data.listName}
            iconId={discardList.data.iconId}
            editPath={'/discard-lists/'+ discardList.id + '/edit'}
          />
          </section>
        }
        { wishList &&
          <section>
            <ExchangeArrow />
            <div className={Style.title_wrap}>
              <FontAwesomeIcon icon={faFire} className={Style.icon}/>
              <TitleText title={'代りに手に入れたいもの・こと'}/>
            </div>
            <ListItemDetail 
              listName={wishList.data.listName}
              iconId={wishList.data.iconId}
              editPath={'/wish-lists/'+ wishList.id + '/edit'}
            />
          </section>
        }
        
          <section>
            <div className={Style.title_wrap}>
              <TitleText title={'memo'}/>
            </div>
            <MemoLists 
              memos={discardList?.memos}
            />
          </section>
        
      </Layout>
      <MemoForm 
        handleSubmit={addMemo}
      />
    </div>
  )
}

export default DiscardListDetail
