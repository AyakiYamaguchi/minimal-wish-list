import React, {FC} from 'react';

type Props = {
  btnText: string;
}

const SubmitButton:FC<Props> = ({btnText}) => {
  return (
    <div>
      { btnText }
    </div>
  )
}

export default SubmitButton
