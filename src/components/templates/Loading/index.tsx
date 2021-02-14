import React from 'react'
import ReactLoading from 'react-loading';
import Style from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={Style.loadingWrap}>
      <ReactLoading type='bubbles' color='#637265'/>
    </div>
  )
}

export default Loading
