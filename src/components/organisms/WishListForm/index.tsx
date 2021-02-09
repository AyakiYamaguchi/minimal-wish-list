import React, { FC, useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../../../styles/form_common_styles.module.scss';
import { AuthContext } from '../../../store/Auth';
import { useHistory } from 'react-router-dom';
import { WishList } from '../../../store';

type Props = {
  currentWishList?: WishList
}

const WishListForm:FC<Props> = ({currentWishList}) => {
  const { AuthState } = useContext(AuthContext);
  const [error, setError] = useState('')
  const history = useHistory()
  
  let initialValues
  if(!currentWishList){
    initialValues =  {
      listName: '',
      iconId: '',
      priority: 0,
      status: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }else{
    initialValues =  currentWishList.data
  }
  
  const validation = Yup.object({
    listName: Yup.string()
      .required('リスト名を入力してください'),
    iconId: Yup.string(),
  })
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: values => {
    }
  })
  return (
    <div>
      
    </div>
  )
}

export default WishListForm
