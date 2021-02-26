import React from 'react';
import Style from './ExchangeArrow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const ExchangeArrow = () => {
  return (
    <div className={Style.icon_wrap}>
      <FontAwesomeIcon 
        icon={faExchangeAlt}
        className={Style.icon}
      />
    </div>
  )
}

export default ExchangeArrow
