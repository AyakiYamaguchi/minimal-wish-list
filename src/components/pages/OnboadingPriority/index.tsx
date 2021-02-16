import React from 'react'
import OnboadingList from '../../templates/OnboadingList';
import PriorityImg from '../../../images/priority_image.png';

const OnboadingPriority = () => {
  const description = '優先度をつけてWishリストを管理しましょう。登録したWishリストは優先度順に並び替えることができます。'
  return (
    <div>
      <OnboadingList 
        title="Wishリストの優先度を決めましょう"
        description={description}
        img={PriorityImg}
        linkPath={'/wish-lists'}
        btnText={'Get started'}
        progress={3}
      />
    </div>
  )
}

export default OnboadingPriority
