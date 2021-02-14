import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../store/Auth';
import { useParams, useHistory } from 'react-router-dom';
import { updateDiscardList, fetchDiscardListDetail } from '../../../apis/FirebaseDiscardList';
import Header from '../../organisms/Header';
import CommonListForm from '../../organisms/CommonListForm';
import { DiscardList } from '../../../store/index';

type RouteParams = {
  id: string;
}

const EditDiscardList = () => {
  const { AuthState } = useContext(AuthContext);
  const uid = AuthState.user.uid;
  const {id} = useParams<RouteParams>();
  const history = useHistory();
  const [discardList, setDiscardList] = useState<DiscardList>()

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
            data: result.data()?.data
          }
          setDiscardList(discardList)
        }
      }).catch(error => {
        alert(error)
      })
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
    </div>
  )
}

export default EditDiscardList
