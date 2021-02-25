import React, {useContext, useState, useEffect} from 'react'
import Style from './EditWishList.module.scss';
import { useParams } from 'react-router-dom';
import { fetchWishListDetail, updateWishList, deleteWishList } from '../../../apis/FirebaseWishList';
import { deleteDiscardList } from '../../../apis/FirebaseDiscardList';
import { AuthContext } from '../../../store/Auth';
import { WishList, StoreContext, DELETE_WISH_LIST, DELETE_DISCARD_LIST } from '../../../store/index';
import CommonListForm from '../../organisms/CommonListForm';
import Header from '../../organisms/Header';
import { useHistory } from 'react-router-dom';
import ConfirmDeleteModal from '../../organisms/ConfirmDeleteModal';
import DeleteButton from '../../atoms/DeleteButton';

type RouteParams = {
  id: string;
}

const EditWishList = () => {
  const { AuthState } = useContext(AuthContext);
  const { setGlobalState } = useContext(StoreContext);
  const uid = AuthState.user.uid;
  const history = useHistory();
  const {id} = useParams<RouteParams>();
  const [ wishList , setWishList ] = useState<WishList>();
  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  const getWishList = () => {
    fetchWishListDetail(uid, id)
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
  const deleteList = () => {
    deleteWishList(uid, id)
      .then(result=>{
        setGlobalState({type: DELETE_WISH_LIST, payload: {wishListId: id }})
        if (wishList?.discardListId){
          deleteDiscardList(uid, wishList.discardListId)
          .then(result=>{
            setGlobalState({type: DELETE_DISCARD_LIST, payload: {discardListId: wishList.discardListId}})
          }).catch(error=>{
            alert(error)
          })
        }
    }).catch(error=>{
      alert(error)
    })
    history.push('/wish-lists')
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
      <div className={Style.delete_btn_wrapper}>
        <DeleteButton 
          btnText="このリストを削除する"
          handleClick={()=>setModalIsOpen(true)}
        />
      </div>
      <ConfirmDeleteModal 
        isOpen={modalIsOpen}
        confirmMessage={'Wishリストを削除すると、Trashリストも一緒に削除されますがよろしいですか？'}
        handleDelete={deleteList}
        handleCancel={()=>setModalIsOpen(false)}
      />
    </div>
  )
}

export default EditWishList
