import React from 'react';
import SubmitButton, { SubmitButtonProps } from './index';
import { render, screen } from '@testing-library/react';

describe('SubmitButton', () => {
  test('renders SubmitBUtton Component', () => {
    const props:SubmitButtonProps ={
      btnText: 'ボタン表示テスト'
    }
    render(<SubmitButton btnText={props.btnText} />);
    screen.debug()
  })
})