import React from 'react'
import CreateWishListForm from '../../organisms/CreateWishListForm'
import Header from '../../organisms/Header'

const CreateWishList = () => {
  return (
    <div>
      <Header 
        title={'Wishリストをつくる'}
        backBtnUrl={'/wish-lists'}
        showAccountSetting={false}
      />
      <CreateWishListForm />
    </div>
  )
}

export default CreateWishList
