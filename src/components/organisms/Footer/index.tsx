import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Style from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const location = useLocation();
  return (
    <footer className={Style.footer}>
      <ul className={Style.wrapper}>
        <li>
          { location.pathname === '/wish-lists' ? 
            <Link to="/wish-lists" className={Style.listItem_wrapper}>
              <FontAwesomeIcon icon={faFire} className={`${Style.icon} ${Style.selected}`} />
              <p className={`${Style.menu_text} ${Style.selected}`}>Wish</p>
            </Link>
            :
            <Link to="/wish-lists" className={Style.listItem_wrapper}>
              <FontAwesomeIcon icon={faFire} className={Style.icon} />
              <p className={Style.menu_text}>Wish</p>
            </Link>
          }
        </li>
        <span className={Style.list_between}/>
        <li>
        { location.pathname === '/discard-lists' ? 
          <Link to="discard-lists" className={Style.listItem_wrapper}>
            <FontAwesomeIcon icon={faTrashAlt} className={`${Style.icon} ${Style.selected}`} />
            <p className={`${Style.menu_text} ${Style.selected}`}>Trash</p>
          </Link>
          :
          <Link to="discard-lists" className={Style.listItem_wrapper}>
            <FontAwesomeIcon icon={faTrashAlt} className={Style.icon} />
            <p className={Style.menu_text}>Trash</p>
          </Link>
        }
        </li>
      </ul>
    </footer>
  )
}

export default Footer
