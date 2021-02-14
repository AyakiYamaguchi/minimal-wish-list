import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import Style from './FloatingAddButton.module.scss';
type Props = {
  pathName: string;
}

const FloatingAddButton:FC<Props> = ({pathName}) => {
  return (
    <div>
      <Link to={pathName}>
        <button className={Style.button}>+</button>
      </Link>
    </div>
  )
}

export default FloatingAddButton
