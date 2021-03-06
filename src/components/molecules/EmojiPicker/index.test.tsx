import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import EmojiPicker from './index';

const props = {
  emojiSize: 20,
  handleClick: jest.fn(),
  currentEmojiId: 'smile_cat',
}

describe('EmojiPicker', () => {
  afterEach(() => {
    cleanup()
  })
  test('アイコン未選択時の表示テスト', () =>{
    render(
      <EmojiPicker 
        emojiSize={props.emojiSize} 
        handleClick={props.handleClick}
      />
    )
    // アイコン設定エリアが表示されていること
    expect(screen.getByText('アイコンを選択')).toBeInTheDocument();
    // emojiエリアが非表示であること
    expect(screen.queryByTestId("emoji")).toBeNull();
  })

  test('アイコン設定時の表示テスト', () => {
    render(
      <EmojiPicker
        emojiSize={props.emojiSize} 
        handleClick={props.handleClick}
        currentEmojiId={props.currentEmojiId}
      />
    )
    // emojiエリアが表示されていること
    expect(screen.getByTestId("emoji")).toBeInTheDocument();
    // アイコン選択エリアが非表示であること
    expect(screen.queryByText('アイコンを選択')).toBeNull();
  })

  test('Pickerのtoggleテスト',() => {
    render(
      <EmojiPicker 
        emojiSize={props.emojiSize} 
        handleClick={props.handleClick}
      />
    )
    fireEvent.click(screen.getByText('アイコンを選択'))
    // Emoji Picker が表示されていることを確認
    expect(screen.getByRole("region", { name: 'Emoji Mart™' })).toBeInTheDocument();
    // 再度アイコン選択をクリックしたときに、Emoji Pickerが非表示になることを確認
    fireEvent.click(screen.getByText('アイコンを選択'))
    expect(screen.queryByRole("region", { name: 'Emoji Mart™' })).toBeNull();
  })

  test('アイコン選択時のクリック処理テスト', () => {
    const handleClick = jest.fn()
    render (
      <EmojiPicker
        emojiSize={props.emojiSize} 
        handleClick={handleClick}
      />
    )
    fireEvent.click(screen.getByText('アイコンを選択'))
    fireEvent.click(screen.getAllByRole('button',{name: '😀, grinning'})[0])
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})