import React, { FC } from 'react';
import Style from './MemoItem.module.scss';
import { Memo } from '../../../store/index';
import { parseDate, deferenceMinutes } from '../../../helper/dateHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
type Props = {
  memo: Memo
}

const MemoItem:FC<Props> = ({memo}) => {
  // 現在日と比較して何日 or 何時間前 or 何分前かを判定する
  const today = new Date()
  const deference =  deferenceMinutes(today, memo.createdAt)

  let memoHistory
  if (deference / 60 / 24 > 1 ){
    memoHistory = Math.floor(deference / 60 / 24)　 + '日前'
  }else if(deference / 60 > 1 ){
    memoHistory =  Math.floor(deference / 60) + '時間前'
  }else{
    memoHistory =  Math.floor(deference)　+ '分前'
  }

  return (
    <div className={Style.wrapper}>
      <div className={Style.timeline}>
        <div className={Style.icon_wrapper} >
          <FontAwesomeIcon icon={faComment} className={Style.icon}/>
        </div>
      </div>
      <div className={Style.memo_wrapper}>
        <p className={Style.memo_history}>{memoHistory}に更新</p>
        <p className={Style.memo_text}>{memo.text}</p>
      </div>
    </div>
  )
}

export default MemoItem
