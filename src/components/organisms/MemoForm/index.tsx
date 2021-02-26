import React, {FC} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import Style from './MemoForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


type Props = {
  handleSubmit: Function;
}

const MemoForm:FC<Props> = ({handleSubmit}) => {
  const validation = Yup.object({
    memo: Yup.string()
      .required('メモが入力されていません')
  })

  const formik = useFormik({
    initialValues: {
      memo: '',
    },
    validationSchema: validation,
    onSubmit: (values, submitProps) => {
      handleSubmit(values)
      submitProps.resetForm({})
    }
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={Style.form_wrapper}>
        <TextareaAutosize 
          id="memo"
          name="memo"
          onChange={formik.handleChange}
          value={formik.values.memo}
          placeholder={'メモを入力'}
          className={Style.input_memo}
        />
        <button type="submit" className={Style.submit}>
          <FontAwesomeIcon 
            icon={faPaperPlane} 
            className={`${Style.icon} ${formik.values.memo.length > 0 && Style.allow}`}/>
        </button>
      </form>
    </div>
  )
}

export default MemoForm
