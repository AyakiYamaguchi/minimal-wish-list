import React, { FC }from 'react'
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';
import Style from './ListItem.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  listName: string;
  iconId: string;
  listId: string;
}

const ListItem:FC<Props> = ({listName,iconId,listId}) => {
  return (
    <Link to={'/wish-lists/'+ listId}>
      <div className={Style.list_wrapper}>
        <Emoji emoji={iconId} size={24} key={listId}/>
        <div className={Style.list_name}>{listName}</div>
      </div>
    </Link>
    
  )
}

export default ListItem
