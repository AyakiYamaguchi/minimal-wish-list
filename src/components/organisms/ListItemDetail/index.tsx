import React, { FC } from 'react';
import Style from './ListItemDetail.module.scss';
import { fixedDate } from '../../../store/index';
import { Emoji } from 'emoji-mart';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import SelectFixedDate from '../../molecules/SelectFixedDate';
import { setDiscardFixedDate, deleteDiscardFixedDate } from '../../../apis/FirebaseDiscardList';

type Props = {
  uid: string;
  listType: 'wish' | 'discard';
  listId: string;
  listName: string;
  iconId: string;
  fixedDate?: fixedDate;
  editPath: string;
}

const ListItemDetail:FC<Props> = ({uid, listType, listId, listName, iconId, editPath,fixedDate}) => {
  const handleSelectDate = (selectedDate: number) => {
    // 期限日の更新処理
  }
  const handleSetFixedDate = (fixedDate:fixedDate) => {
    if(listType === 'wish'){
      
    } else if (listType === 'discard'){
      setDiscardFixedDate(uid, listId, fixedDate)
    }
  }

  const handleDeleteFixedDate = () => {
    if(listType === 'wish'){
      
    } else if (listType === 'discard'){
      deleteDiscardFixedDate(uid, listId)
    }
  }

  return (
    <div className={Style.wrapper}>
      <div className={Style.list_wrap}>
        <Emoji emoji={iconId} size={24}/>
        <p className={Style.list_name}>{listName}</p>
        <Link to={editPath} className={Style.edit_button}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Link>
      </div>
      <div className={Style.selectDate_wrapper}>
        <SelectFixedDate 
          currentDate={fixedDate}
          handleSelectDate={handleSelectDate }
          setFixedDate={handleSetFixedDate}
          deleteFixedDate={handleDeleteFixedDate}
        />
      </div>
    </div>
  )
}

export default ListItemDetail
