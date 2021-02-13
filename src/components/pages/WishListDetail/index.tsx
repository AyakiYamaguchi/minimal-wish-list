import React, { useEffect, useState, useContext } from 'react';
import ListItemDetail from '../../molecules/ListItemDetail';
import Style from './WishListDetail.module.scss';
import { useParams } from 'react-router-dom';
import { WishList, DiscardList} from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { fetchWishListDetail } from '../../../apis/FirebaseWishList';
import { fetchDiscardListDetail } from '../../../apis/FirebaseDiscardList';

type RouteParams = {
  id: string;
}

const WishListDetail = () => {
  const [wishList, setWishList] = useState<WishList>();
  const [discardList, setDiscardList] = useState<DiscardList>();
  const { AuthState } = useContext(AuthContext);
  const {id} = useParams<RouteParams>();
  const uid = AuthState.user.uid;

  const getWishList = () => {
    fetchWishListDetail(uid, id)
      .then( result => {
        if(result){
          const wishList = {
            id: result.id,
            discardListId: result.data()?.discardListId,
            data: result.data()?.data
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
            data: result.data()?.data
          }
          setDiscardList(discardList)
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
    <div>
      { wishList &&
        <section>
          <ListItemDetail 
            title={'Wishリスト'}
            listName={wishList.data.listName}
            iconId={wishList.data.iconId}
            editPath={'/wish-lists/'+ id + '/edit'}
          />
        </section>
      }
      {  discardList &&
        <section>
        <ListItemDetail 
          title={'Discardリスト'}
          listName={discardList.data.listName}
          iconId={discardList.data.iconId}
          editPath={'/discard-lists/'+ discardList.id + '/edit'}
        />
        </section>
      }

      
    </div>
  )
}

export default WishListDetail
