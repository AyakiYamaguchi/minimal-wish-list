import React, { FC } from 'react'
import Style from './DeleteButton.module.scss';

type Props = {
  btnText: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const DeleteButton:FC<Props> = ({btnText, handleClick}) => {
  return (
      <button onClick={handleClick} className={Style.button}>
        {btnText}
      </button>
  )
}

export default DeleteButton
