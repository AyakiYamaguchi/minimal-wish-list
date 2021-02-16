import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import Style from './OnboadingList.module.scss';

type Props = {
  title: string;
  description: string;
  img: string;
  btnText: string;
  linkPath: string;
  progress: number;
}

const OnboadingList:FC<Props> = ({ title, description, img, btnText, linkPath, progress }) => {
  return (
    <div className={Style.content_wrapper}>
      <div className={Style.image_wrapper}>
        <img src={img} alt={'img'} className={Style.image}/>
      </div>
      <div className={Style.text_wrapper}>
        <h2 className={Style.title}>{title}</h2>
        <p className={Style.description}>{description}</p>
      </div>
      <div className={Style.progress_wrapper}>
        <span className={`${Style.progress_item} ${progress === 1 && Style.progress_now}`}></span>
        <span className={`${Style.progress_item} ${progress === 2 && Style.progress_now}`}></span>
        <span className={`${Style.progress_item} ${progress === 3 && Style.progress_now}`}></span>
      </div>
      <div className={Style.link_btn_wrapper}>
        <Link to={linkPath} className={Style.link_btn}>{btnText}</Link>
      </div>
    </div>
  )
}

export default OnboadingList
