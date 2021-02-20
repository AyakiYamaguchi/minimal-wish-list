import React, { FC } from 'react';
import CancelButton from '../../atoms/CancelButton';
import DeleteButton from '../../atoms/DeleteButton';
import CenterModal from '../../molecules/CenterModal';
import Style from './ConfirmDeleteModal.module.scss';

type Props = {
  isOpen: boolean;
  confirmMessage: string;
  handleDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
  handleCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const ConfirmDeleteModal:FC<Props> = ({isOpen,confirmMessage, handleDelete, handleCancel}) => {
  return (
    <div>
      <CenterModal 
        isOpen={isOpen}
        >
        <div className={Style.confirm_area_wrapper}>
          <p className={Style.confirm_message}>{confirmMessage}</p>
          <div className={Style.btn_wrapper}>
            <DeleteButton 
              btnText="削除する"
              handleClick={handleDelete}
            />
          </div>
          <div className={Style.btn_wrapper}>
            <CancelButton 
              btnText="キャンセルする"
              handleClick={handleCancel}
            />
          </div>
        </div>
      </CenterModal>
    </div>
  )
}

export default ConfirmDeleteModal
