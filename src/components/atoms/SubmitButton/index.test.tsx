import React from 'react';
import SubmitButton, { SubmitButtonProps } from './index';
import { render, screen } from '@testing-library/react';

describe('SubmitButton', () => {
  test('renders SubmitBUtton Component', () => {
    const props:SubmitButtonProps ={
      btnText: 'SubmitButton'
    }
    render(<SubmitButton btnText={props.btnText} />);
    // ボタンのラベルに'SubmitButton'が表示されていることを確認
    expect(screen.getByText('SubmitButton')).toBeInTheDocument();
  })
})