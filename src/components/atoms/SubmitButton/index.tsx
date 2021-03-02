import React, {FC} from 'react';
import Style from './SubmitButton.module.scss';

type Props = {
  btnText: string;
}

export type SubmitButtonProps = Props

const SubmitButton:FC<Props> = ({btnText}) => {
  return (
    <div>
      <button type="submit" className={Style.submitBtn}>{ btnText }</button>
    </div>
  )
}

export default SubmitButton
