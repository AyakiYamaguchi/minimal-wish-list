import React, {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { fetchWishListDetail, updateWishList } from '../../../apis/FirebaseWishList';
import { AuthContext } from '../../../store/Auth';
import { WishList } from '../../../store/index';
import CommonListForm from '../../organisms/CommonListForm';
import Header from '../../organisms/Header';
import { useHistory } from 'react-router-dom';

type RouteParams = {
  id: string;
}

const EditWishList = () => {
  const { AuthState } = useContext(AuthContext);
  const uid = AuthState.user.uid;
  const history = useHistory();
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

  const updateList = (values: any) => {
    console.log(values)
    if(wishList){
      updateWishList(uid,wishList.id,values.listName,values.iconId)
      .then( result =>{
        history.push('/wish-lists/'+ wishList.id)
      }).catch( error =>{
        alert(error)
      })
    }
    
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
        <CommonListForm 
          listType={'wishList'}
          listName={wishList.data.listName}
          iconId={wishList.data.iconId}
          handleSubmit={updateList}
        />
      }
    </div>
  )
}

export default EditWishList
