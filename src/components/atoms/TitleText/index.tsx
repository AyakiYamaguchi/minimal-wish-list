import React, { FC } from 'react';
import Style from './TitleText.module.scss';

type Props = {
  title: string;
}

const TitleText:FC<Props> = ({title}) => {
  return (
    <div>
      <h2 className={Style.title}>{title}</h2>
    </div>
  )
}

export default TitleText
