import React, { FC } from 'react'
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';
import TitleText from '../../atoms/TitleText'
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  listName: string;
  iconId: string;
  editPath: string;
}

const ListItemDetail:FC<Props> = ({title, listName, iconId, editPath}) => {
  return (
    <div>
      <TitleText title={title}/>
      <div>
        <Emoji emoji={iconId} size={24}/>
        <p>{listName}</p>
      </div>
      <Link to={editPath}>edit</Link>
    </div>
  )
}

export default ListItemDetail
