import React from 'react'
import OnboadingList from '../../templates/OnboadingList'
import MemoImage from '../../../images/memo_image.png';
const OnboadingCreateList = () => {

  const description = 'あなたの望みをWishリストに追加しましょう。ほしいもの・やりたいこと、何でもかまいません。minimaListではあなたの望みと、その優先度を管理できます。'
  return (
    <div>
      <OnboadingList 
        title={'あなたのWishリストをつくりましょう'}
        description={description}
        img={MemoImage}
        linkPath="/onboading-discard"
        btnText="Next"
        progress={1}
      />
    </div>
  )
}

export default OnboadingCreateList
