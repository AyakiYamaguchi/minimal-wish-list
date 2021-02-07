import React from 'react'
import { Picker } from 'emoji-mart';

const EmojiPicker = () => {
  return (
    <div>
      <Picker set="apple" onSelect={emoji=> console.log(emoji)}/>
    </div>
  )
}

export default EmojiPicker
