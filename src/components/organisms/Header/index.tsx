import React, { FC } from 'react';
import Style from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  backBtnUrl?: string;
  showAccountSetting: boolean;
}

const Header:FC<Props> = ({title,backBtnUrl,showAccountSetting}) => {
  return (
    <header className={Style.header}>
      { backBtnUrl &&
        <Link to={backBtnUrl} className={Style.backBtn_link}>
          <FontAwesomeIcon icon={faAngleLeft} className={Style.backBtn_icon}/>
        </Link>
      }
      <h1 className={Style.title}>{title}</h1>
      { showAccountSetting &&
        <Link to={'/'} className={Style.account_link}>
          <FontAwesomeIcon icon={faUserCircle} className={Style.account_icon}/>
        </Link>
      }
      
    </header>
  )
}

export default Header
