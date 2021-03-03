import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CancelButton from './index';


describe('CancelButton', () => {
  test('ボタンラベルのテキスト表示テスト', () => {
    render(<CancelButton btnText="キャンセル" />)
    expect(screen.getByText('キャンセル')).toBeInTheDocument();
  });

  test('ボタンクリック時の関数実行テスト', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <CancelButton btnText="キャンセル" handleClick={handleClick}/>
    )
    screen.debug();
    fireEvent.click(getByText("キャンセル"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})