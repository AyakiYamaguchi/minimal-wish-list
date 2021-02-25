import React, { useContext, useState, useEffect } from 'react';
import Style from './EditDiscardList.module.scss';
import { AuthContext } from '../../../store/Auth';
import { useParams, useHistory } from 'react-router-dom';
import { updateDiscardList, fetchDiscardListDetail, deleteDiscardList } from '../../../apis/FirebaseDiscardList';
import { deleteWishList } from '../../../apis/FirebaseWishList';
import Header from '../../organisms/Header';
import CommonListForm from '../../organisms/CommonListForm';
import { DiscardList } from '../../../store/index';
import DeleteButton from '../../atoms/DeleteButton';
import ConfirmDeleteModal from '../../organisms/ConfirmDeleteModal';
import { StoreContext, DELETE_WISH_LIST, DELETE_DISCARD_LIST } from '../../../store/index';

type RouteParams = {
  id: string;
}

const EditDiscardList = () => {
  const { AuthState } = useContext(AuthContext);
  const { setGlobalState } = useContext(StoreContext);
  const uid = AuthState.user.uid;
  const {id} = useParams<RouteParams>();
  const history = useHistory();
  const [discardList, setDiscardList] = useState<DiscardList>()
  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  const updateList = (values: any) => {
    updateDiscardList(uid,id,values.listName,values.iconId)
      .then( result => {
        history.push('/discard-lists/'+ id)
      }).catch( error => {

      })
  }
  const getDiscardList = () => {
    fetchDiscardListDetail(uid,id)
      .then(result => {
        if(result){
          const discardList = {
            id: result.id,
            discardListId: result.data()?.discardListId,
            data: result.data()?.data,
            memos: result.data()?.data,
          }
          setDiscardList(discardList)
        }
      }).catch(error => {
        alert(error)
      })
  }
  const deleteList = () => {
    deleteDiscardList(uid, id)
      .then(result=>{
        setGlobalState({type: DELETE_DISCARD_LIST, payload: {discardListId: id}})
        if (discardList?.wishListId){
          deleteWishList(uid, discardList.wishListId)
          .then(result=>{
            if(discardList.wishListId){
              setGlobalState({type: DELETE_WISH_LIST, payload: {wishListId: discardList.wishListId }})
            }
          }).catch(error=>{
            alert(error)
          })
        }
    }).catch(error=>{
      alert(error)
    })
    history.push('/discard-lists')
  }
  

  useEffect(()=>{
    getDiscardList()
  },[AuthState.user])

  return (
    <div>
      <Header 
        title={'リストの編集'}
        backBtnUrl={'/discard-lists/'+id}
        showAccountSetting={false}
      />
      { discardList &&
        <CommonListForm 
          listType={'discardList'}
          listName={discardList?.data.listName}
          iconId={discardList?.data.iconId}
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
        confirmMessage={'Wishリストが存在する場合は、Wishリストも一緒に削除されますがよろしいですか？'}
        handleDelete={deleteList}
        handleCancel={()=>setModalIsOpen(false)}
      />
    </div>
  )
}

export default EditDiscardList
