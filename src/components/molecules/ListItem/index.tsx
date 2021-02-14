import React, { FC }from 'react'
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';
import Style from './ListItem.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  listType: string;
  listName: string;
  iconId: string;
  listId: string;
}

const ListItem:FC<Props> = ({listType, listName, iconId, listId}) => {
  return (
    <Link to={'/'+ listType + '/'+ listId}>
      <div className={Style.list_wrapper}>
        <Emoji emoji={iconId} size={24} key={listId}/>
        <div className={Style.list_name}>{listName}</div>
      </div>
    </Link>
    
  )
}

export default ListItem
