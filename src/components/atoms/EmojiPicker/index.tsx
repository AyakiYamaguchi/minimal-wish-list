import React, { FC, useState } from 'react'
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

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
    <div>
      { !iconId ? 
        <div onClick={()=> changeDisplay(!display)}>icon選択</div> :
        <div onClick={()=> changeDisplay(!display)}><Emoji emoji={iconId} size={emojiSize}></Emoji></div>
        
      }
      { display &&
        <Picker set="apple" onSelect={emoji=> handleSelect(emoji)}/>
      }
    </div>
  )
}

export default EmojiPicker
