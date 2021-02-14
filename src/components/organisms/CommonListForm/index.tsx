import React, { FC } from 'react'
import Style from '../../../styles/form_common_styles.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import EmojiPicker from '../../atoms/EmojiPicker';
import SubmitButton from '../../atoms/SubmitButton';
import CancelButton from '../../atoms/CancelButton';

type Props = {
  listType: 'wishList' | 'discardList';
  listName: string;
  iconId: string;
  handleSubmit: Function;
}

const CommonListForm:FC<Props> = ({listType, listName, iconId, handleSubmit}) => {
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
      handleSubmit(values)
    }
  })

  const setIconId = (emoji: any) => {
    formik.values.iconId = emoji.id
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={Style.form__wrapper}>
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

export default CommonListForm
