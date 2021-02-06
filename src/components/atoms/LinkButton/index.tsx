import React, {FC} from 'react';
import Style from './LinkButton.module.scss';
import {Link} from 'react-router-dom';

type Props = {
  btnText: string;
  pathName: string;
}

const LinkButton:FC<Props> = ({btnText, pathName}) => {
  return (
    <Link to={pathName}>
      <button className={Style.button}>{btnText}</button>
    </Link>
  )
}

export default LinkButton
