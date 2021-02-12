import React, { FC, useContext, useState } from 'react'
import { setNestedObjectValues, useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../../../styles/form_common_styles.module.scss';
import { AuthContext } from '../../../store/Auth';
import { useHistory } from 'react-router-dom';
import { WishList } from '../../../store';
import { createWishList } from '../../../apis/FirebaseWishList';
import { createDiscardList, updateWishListId } from '../../../apis/FirebaseDiscardList';
import EmojiPicker from '../../atoms/EmojiPicker';
import SubmitButton from '../../atoms/SubmitButton';

type FromValues = {
  wishListName: string,
  wishListIconId: string,
  discardListName: string,
  discardListIconId: string,
}

const CreateWishListForm = () => {
  const { AuthState } = useContext(AuthContext);
  const [error, setError] = useState('')
  const history = useHistory()
  
  const validation = Yup.object({
    wishListName: Yup.string()
      .required('リスト名を入力してください'),
    wishListIconId: Yup.string(),
    discardListName: Yup.string()
      .required('リスト名を入力してください'),
    discardListIconId: Yup.string(),
  })

  const setWishList = (values: FromValues) => {
    const userId = AuthState.user.uid
    // Discardリストの作成
    createDiscardList(userId, values.discardListName, values.discardListIconId)
      .then( discardList =>{
        const discardListId = discardList.id
        // 作成したDiscardリストのIDを引数としてWishリストを作成
        createWishList(userId, values.wishListName, values.wishListIconId, discardListId )
          .then(wishList =>{
            // 作成したWishリストのIDでDiscardリストを更新
            updateWishListId(userId, discardListId, wishList.id)
              .then(()=>{
                history.push('/wish-lists')
              }).catch(error=>{
                alert(error)
              })
          }).catch(error=>{
            alert(error)
          })
      }).catch(error=>{
        alert(error)
      })
  }
  const setWishListIcon = (emoji: any)=>{
    formik.values.wishListIconId = emoji.id
  }

  const setDiscardListIcon = (emoji: any) => {
    formik.values.discardListIconId = emoji.id
  }

  const formik = useFormik({
    initialValues: {
      wishListName: '',
      wishListIconId: '',
      discardListName: '',
      discardListIconId: '',
    },
    validationSchema: validation,
    onSubmit: values => {
      setWishList(values)
      console.log(values)
    }
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <div>
          <EmojiPicker handleClick={setWishListIcon} emojiSize={36}/>
      </div>
      <div className={Style.formItem__wrapper}>
          <label htmlFor="wishListName" className={Style.formItem__label}>ほしいもの</label>
          <input
            id="wishListName"
            name="wishListName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.wishListName}
            className={Style.formItem__input}
          />
          { formik.touched.wishListName && formik.errors.wishListName &&
            <div className={Style.formItem__error_message}>{formik.errors.wishListName}</div> }
        </div>
        
        <div>
          <EmojiPicker handleClick={setDiscardListIcon} emojiSize={36}/>
        </div>
        <div className={Style.formItem__wrapper}>
          <label htmlFor="discardListName" className={Style.formItem__label}>手放すもの</label>
          <input
            id="discardListName"
            name="discardListName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.discardListName}
            className={Style.formItem__input}
          />
          { formik.touched.discardListName && formik.errors.discardListName &&
            <div className={Style.formItem__error_message}>{formik.errors.discardListName}</div> }
        </div>
        <SubmitButton btnText={'登録する'}/>
      </form>
    </div>
  )
}

export default CreateWishListForm