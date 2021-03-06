import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import DeleteButton from './index';

describe('DeleteButton',()=>{
  afterEach(()=>{
    cleanup()
  })
  test('ボタンラベルの表示テスト', () => {
    render (
      <DeleteButton
        btnText="Delete Button"
      />
    )
    expect(screen.getByText('Delete Button')).toBeInTheDocument();
  })

  test('ボタンクリック時のクリック処理テスト',() => {
    const handleClick = jest.fn();
    render (
      <DeleteButton
        btnText="Delete Button"
        handleClick={handleClick}
      />
    )
    fireEvent.click(screen.getByText('Delete Button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})