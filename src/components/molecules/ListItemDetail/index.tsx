import React, { FC } from 'react';
import Style from './ListItemDetail.module.scss';
import { Emoji } from 'emoji-mart';
import TitleText from '../../atoms/TitleText'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

type Props = {
  listName: string;
  iconId: string;
  editPath: string;
}

const ListItemDetail:FC<Props> = ({listName, iconId, editPath}) => {
  return (
    <div className={Style.wrapper}>
      <div className={Style.list_wrap}>
        <Emoji emoji={iconId} size={24}/>
        <p className={Style.list_name}>{listName}</p>
        <Link to={editPath} className={Style.edit_button}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Link>
      </div>
    </div>
  )
}

export default ListItemDetail
