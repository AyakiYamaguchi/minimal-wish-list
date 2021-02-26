import React, { FC } from 'react'
import Style from './MemoLists.module.scss';
import MemoItem from '../../molecules/MemoItem';
import { Memo } from '../../../store/index';

type Props = {
  memos: Memo[]
}

const MemoLists:FC<Props> = ({memos}) => {
  return (
    <div className={Style.wrapper}>
      {
        memos.map(memo=> {
          return (
            <MemoItem 
              memo={memo}
            />
          )
        })
      }
    </div>
  )
}

export default MemoLists
