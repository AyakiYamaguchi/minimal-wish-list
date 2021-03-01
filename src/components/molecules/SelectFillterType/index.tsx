import React, { FC, useState } from 'react';
import Style from './SelectFillterType.module.scss';

type Props = {
  fillterTypes: string[];
  handleClick: Function;
}

const SelectFillterType:FC<Props> = ({fillterTypes, handleClick}) => {
  const [ selectTYpe, setSelectType ] = useState(fillterTypes[0])

  const clickType = (type: string) => {
    setSelectType(type)
  }
  return (
    <div className={Style.types_wrapper}>
      { fillterTypes.map(type => {
        return (
          <div
            className={`${Style.type_item} ${selectTYpe === type && Style.type_item_selected}`}
            onClick={()=>clickType(type)}
          >
            {type}
          </div>
        )
      })
        
      }
    </div>
  )
}

export default SelectFillterType
