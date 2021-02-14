import React, {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { fetchWishListDetail } from '../../../apis/FirebaseWishList';
import { AuthContext } from '../../../store/Auth';
import { WishList } from '../../../store/index';
import EditListForm from '../../organisms/EditListForm';
import Header from '../../organisms/Header';

type RouteParams = {
  id: string;
}

const EditWishList = () => {
  const { AuthState } = useContext(AuthContext);
  const uid = AuthState.user.uid;
  const {id} = useParams<RouteParams>();
  const [ wishList , setWishList ] = useState<WishList>();
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
        }
      }).catch(error => [
        alert(error)
      ])
  }
  useEffect(()=>{
    if(AuthState.user){
      getWishList()
    }
  },[AuthState.user])

  return (
    <div>
      <Header 
       title="リストの編集"
       backBtnUrl={'/wish-lists/'+ wishList?.id}
       showAccountSetting={false}
      />
      { wishList && 
        <EditListForm 
          listType={'wishList'}
          listId={wishList.id}
          listName={wishList.data.listName}
          iconId={wishList.data.iconId}
          uid={uid}
        />
      }
    </div>
  )
}

export default EditWishList
