import React, { FC } from 'react';
import Style from './CanselButton.module.scss';

type Props = {
  btnText: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

export type CancelButtonProps = Props

const CancelButton:FC<Props> = ({btnText, handleClick}) => {
  return (
    <div>
      <button onClick={handleClick} className={Style.button}>
        {btnText}
      </button>
    </div>
  )
}

export default CancelButton
