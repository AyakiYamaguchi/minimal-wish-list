import React from 'react'
import OnboadingList from '../../templates/OnboadingList'
import TrashImg from '../../../images/trash_image.png';

const OnboadingDiscard = () => {
  const description = 'minimaListではWishリストつくるときに、必ず手放すものを決めなければなりません。1 in 1 out の原則で一つ追加したら必ず一つ手放しましょう'
  return (
    <div>
      <OnboadingList
        title={'Wishリストのために手放すものを決めましょう'}
        description={description}
        img={TrashImg}
        linkPath={'/onboading/priority'}
        btnText={'Next'}
        progress={2}
      />
    </div>
  )
}

export default OnboadingDiscard
