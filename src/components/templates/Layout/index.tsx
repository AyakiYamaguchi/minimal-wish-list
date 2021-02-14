import React, { FC , ReactNode } from 'react';
import Style from './Layout.module.scss';

type Props = {
  children: ReactNode
}

const Layout:FC<Props> = ({children}) => {
  return (
    <div className={Style.wrapper}>
      {children}
    </div>
  )
}

export default Layout
