import React, {FC} from 'react'
import Modal from 'react-modal';
import Style from './CenterModal.module.scss';

type Props ={
  isOpen: boolean;
  children: React.ReactNode;
}

const CenterModal:FC<Props> = ({isOpen,children}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        className={Style.modal}
        overlayClassName={Style.orverLay}
      >
        {children}
      </Modal>
    </div>
  )
}

export default CenterModal
