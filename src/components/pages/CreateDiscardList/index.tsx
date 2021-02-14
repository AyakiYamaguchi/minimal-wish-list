import React, { useContext } from 'react'
import { AuthContext } from '../../../store/Auth';
import { useHistory } from 'react-router-dom';
import { createDiscardList } from '../../../apis/FirebaseDiscardList';
import Header from '../../organisms/Header';
import CommonListForm from '../../organisms/CommonListForm';
import { DiscardList } from '../../../store/index';


const CreateDiscardList = () => {
  const { AuthState } = useContext(AuthContext);
  const uid = AuthState.user.uid;
  const history = useHistory();

  const createList = (values: any) => {
    createDiscardList(uid,values.listName,values.iconId)
      .then( result => {
        history.push('/discard-lists')
      }).catch( error => {
        alert(error)
      })
  }

  return (
    <div>
      <Header 
        title={'Trashリストをつくる'}
        backBtnUrl={'/discard-lists'}
        showAccountSetting={false}
      />
      <CommonListForm 
        listType={'discardList'}
        listName={''}
        iconId={''}
        handleSubmit={createList}
      />
    </div>
  )
}

export default CreateDiscardList
