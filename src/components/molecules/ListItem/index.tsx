import React, { FC }from 'react'
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';
import Style from './ListItem.module.scss';

type Props = {
  listName: string;
  iconId: string;
  listId: string;
}

const ListItem:FC<Props> = ({listName,iconId,listId}) => {
  return (
    <div className={Style.list_wrapper}>
      <Emoji emoji={iconId} size={24} key={listId}/>
      <div className={Style.list_name}>{listName}</div>
    </div>
  )
}

export default ListItem
