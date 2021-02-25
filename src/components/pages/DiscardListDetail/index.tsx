import React, { useEffect, useState, useContext } from 'react';
import Style from './DiscardListDetail.module.scss';
import { useParams } from 'react-router-dom';
import { WishList, DiscardList} from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { fetchWishListDetail } from '../../../apis/FirebaseWishList';
import { fetchDiscardListDetail } from '../../../apis/FirebaseDiscardList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import Header from '../../organisms/Header';
import Layout from '../../templates/Layout';
import TitleText from '../../atoms/TitleText';
import ListItemDetail from '../../molecules/ListItemDetail';

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
            memos: result.data()?.memos,
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
            <TitleText title={'手放すもの・やめること'}/>
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
            <div className={Style.title_wrap}>
              <FontAwesomeIcon icon={faFire} className={Style.icon}/>
              <TitleText title={'新たに手に入れたいもの・やりたいこと'}/>
            </div>
            <ListItemDetail 
              listName={wishList.data.listName}
              iconId={wishList.data.iconId}
              editPath={'/wish-lists/'+ wishList.id + '/edit'}
            />
          </section>
        }
      </Layout>
    </div>
  )
}

export default DiscardListDetail
