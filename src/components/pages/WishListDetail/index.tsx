import React, { useEffect, useState, useContext, useCallback} from 'react';
import ListItemDetail from '../../organisms/ListItemDetail';
import Style from './WishListDetail.module.scss';
import { useParams } from 'react-router-dom';
import { StoreContext, WishList, DiscardList, ADD_WISH_LIST_MEMO, Memo } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { fetchWishListDetail, addWishListMemo } from '../../../apis/FirebaseWishList';
import { fetchDiscardListDetail } from '../../../apis/FirebaseDiscardList';
import Header from '../../organisms/Header';
import Layout from '../../templates/Layout';
import TitleText from '../../atoms/TitleText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import MemoForm from '../../organisms/MemoForm';
import MemoLists from '../../organisms/MemoLists';
import ExchangeArrow from '../../atoms/ExchangeArrow';


type RouteParams = {
  id: string;
}

const WishListDetail = () => {
  const [wishList, setWishList] = useState<WishList>();
  const [discardList, setDiscardList] = useState<DiscardList>();
  const { AuthState } = useContext(AuthContext);
  const { setGlobalState } = useContext(StoreContext);
  const {id} = useParams<RouteParams>();
  const uid = AuthState.user.uid;

  const getWishList = () => {
    fetchWishListDetail(uid, id)
      .then( result => {
        if(result){
          const wishList = {
            id: result.id,
            discardListId: result.data()?.discardListId,
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
          setWishList(wishList)
          getDiscardList(wishList.discardListId)
        }
      }).catch(error => [
        alert(error)
      ])
  }
  const getDiscardList = (discardListId: string) => {
    fetchDiscardListDetail(uid, discardListId)
      .then( result => {
        if(result){
          const discardList = {
            id: result.id,
            wishListId: result.data()?.wishListId,
            data: result.data()?.data,
            memos: result.data()?.memos,
          }
          setDiscardList(discardList)
        }
      }).catch(error=>{
        alert(error)
      })
  }

  // const ref = React.createRef<HTMLDivElement>()
  // const scrollDateList = useCallback(() => {
  //     ref!.current!.scrollIntoView({
  //       behavior: 'auto',
  //       block: 'nearest',
  //     })
  //   },[ ref ],)

  const addMemo = (values: { memo:string }) => {
    addWishListMemo(uid, id, values.memo).then(result =>{
      console.log(result)
      const memo = {
        text: values.memo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      if(wishList){
        const updatedWishList = {
          ...wishList,
          memos: wishList.memos ? [...wishList.memos, memo] : [memo]
        }
        setWishList(updatedWishList)
      }
    }).catch(error=>{
      alert(error)
    })
  }
  useEffect(()=>{
    if(AuthState.user){
      getWishList()
    }
  },[AuthState.user])
  
  return (
    <div className={Style.constent_wrapper}>
      <Header 
        title={'リスト詳細'}
        backBtnUrl={'/wish-lists'}
        showAccountSetting={false}
      />
      <Layout>
        { wishList &&
          <section>
            <div className={Style.title_wrap}>
              <FontAwesomeIcon icon={faFire} className={Style.icon}/>
              <TitleText title={'Wishリスト'}/>
            </div>
            <ListItemDetail
              uid={uid}
              listType={'wish'}
              listId={id}
              listName={wishList.data.listName}
              iconId={wishList.data.iconId}
              editPath={'/wish-lists/'+ id + '/edit'}
            />
          </section>
        }
        {  discardList &&
          
          <section>
            <ExchangeArrow />
            <div className={Style.title_wrap}>
              <FontAwesomeIcon icon={faTrashAlt} className={Style.icon}/>
              <TitleText title={'Wishリストと引き換えに手放すもの'}/>
            </div>
            <ListItemDetail 
              uid={uid}
              listType={'discard'}
              listId={discardList.id}
              listName={discardList.data.listName}
              iconId={discardList.data.iconId}
              editPath={'/discard-lists/'+ discardList.id + '/edit'}
            />
          </section>
        }
        { wishList?.memos &&
          <section className={Style.memo_wrapper}>
            <div className={Style.title_wrap}>
              <TitleText title={'memo'}/>
            </div>
            <MemoLists 
              memos={wishList.memos}
            />
          </section>
        }
        {/* <div ref={ref}></div> */}
      </Layout>
      <MemoForm 
          handleSubmit={addMemo}
        />
    </div>
  )
}

export default WishListDetail
