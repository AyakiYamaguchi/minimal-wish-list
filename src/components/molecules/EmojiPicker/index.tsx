import React, { FC, useState } from 'react';
import Style from './EmojiPicker.module.scss';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';

type Props = {
  handleClick: Function;
  emojiSize: number;
  currentEmojiId?: string;
}

const EmojiPicker:FC<Props> = ({handleClick, emojiSize, currentEmojiId}) => {
  const [ display , changeDisplay ] = useState(false)
  const [ iconId, setIconId ] = useState(currentEmojiId)
  const handleSelect = (emoji: any) => {
    handleClick(emoji)
    setIconId(emoji.id)
    changeDisplay(!display)
  }
  return (
    <div className={Style.wrapper}>
      { !iconId ? 
        <button onClick={()=> changeDisplay(!display)} className={Style.select_icon}>
          <FontAwesomeIcon icon={faSmile} className={Style.icon}/>
          アイコンを選択
        </button> 
        :
        <div onClick={()=> changeDisplay(!display)} className={Style.emoji} data-testid="emoji">
          <Emoji emoji={iconId} size={emojiSize}/>
        </div>
        
      }
      { display &&
        <div className={Style.picker}>
          <Picker set="apple" onSelect={emoji=> handleSelect(emoji)} />
        </div>
      }
    </div>
  )
}

export default EmojiPicker
