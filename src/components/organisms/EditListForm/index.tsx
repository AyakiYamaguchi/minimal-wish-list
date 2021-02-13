import React, { FC } from 'react'
import Style from '../../../styles/form_common_styles.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateWishList } from '../../../apis/FirebaseWishList';
import { updateDiscardList } from '../../../apis/FirebaseDiscardList';
import { useHistory } from 'react-router-dom';
import EmojiPicker from '../../atoms/EmojiPicker';
import SubmitButton from '../../atoms/SubmitButton';
import CancelButton from '../../atoms/CancelButton';

type Props = {
  listType: 'wishList' | 'discardList';
  listId: string;
  listName: string;
  iconId: string;
  uid: string;
}

const EditListForm:FC<Props> = ({listType, listId, listName, iconId, uid}) => {
  const history = useHistory();

  const validation = Yup.object({
    listName: Yup.string()
      .required('リスト名を入力してください'),
    iconId: Yup.string(),
  })
  const formik = useFormik({
    initialValues: {
      listName: listName,
      iconId: iconId,
    },
    validationSchema: validation,
    onSubmit: values => {
      console.log(values)
      if(listType === 'wishList'){
        updateWishList(uid,listId,values.listName,values.iconId)
          .then( result =>{
            history.push('/wish-lists/'+ listId)
          }).catch( error =>{

          })
      }else if(listType === 'discardList'){
        updateDiscardList(uid,listId,values.listName,values.iconId)
          .then( result => {
            history.push('/discard-lists/'+ listId)
          }).catch( error => {

          })
      }
    }
  })

  const setIconId = (emoji: any) => {
    formik.values.iconId = emoji.id
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <EmojiPicker 
            handleClick = {setIconId}
            emojiSize = {36}
            currentEmojiId={iconId}
          />
        </div>
        <div className={Style.formItem__wrapper}>
          <label
            htmlFor="listName"
            className={Style.formItem__label}
          >
            { listType === 'wishList' ? 'ほしいもの・やりたいこと' : '手放すもの・やめること'　}
          </label>
          <input 
            id="listName"
            name="listName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.listName}
            className={Style.formItem__input}
          />
          { formik.touched.listName && formik.errors.listName &&
              <div className={Style.formItem__error_message}>{formik.errors.listName}</div> }
        </div>
        <SubmitButton btnText={'更新する'}/>
        <CancelButton 
          btnText={'キャンセル'}
          handleClick={()=> history.goBack()}
        />
      </form>
    </div>
  )
}

export default EditListForm
