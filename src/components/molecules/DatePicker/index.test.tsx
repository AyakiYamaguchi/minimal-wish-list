import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './index';

const handleFnction = jest.fn()

const today = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate()
}

describe('DatePicker',() => {
  afterEach(() => {
    cleanup()
  })

  describe('日付初期表示のテスト', () => {
    test('今日の日付の背景色が変わっていること',() => {
      render (
        <DatePicker
          handleSelect={handleFnction}
          isOpen={true}
          handleSubmit={handleFnction}
          handleDelete={handleFnction}
        />
      )
      expect(screen.getByText(today.date)).toHaveClass('dateItem__today')
    })
    test('選択している日付の背景色が変わること',()=> {
      render (
        <DatePicker
          selectedDate={today}
          handleSelect={handleFnction}
          isOpen={true}
          handleSubmit={handleFnction}
          handleDelete={handleFnction}
        />
      )
      expect(screen.getByText(today.date)).toHaveClass('dateItem__selected')
    })
  })

  describe('各ボタンのクリックテスト', () => {
    test('保存ボタンのクリック処理テスト', () => {
      const handleClick = jest.fn();
      render (
        <DatePicker
          handleSelect={handleFnction}
          isOpen={true}
          handleSubmit={handleClick}
          handleDelete={handleFnction}
        />
      )
      fireEvent.click(screen.getByRole('button', {name: '保存する'}))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('削除ボタンのクリック処理テスト', () => {
      const handleClick = jest.fn();
      render (
        <DatePicker
          handleSelect={handleFnction}
          isOpen={true}
          handleSubmit={handleFnction}
          handleDelete={handleClick}
        />
      )
      fireEvent.click(screen.getByRole('button', {name: '期日を削除する'}))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
  
  describe('datePickerの表示/非表示切り替えテスト', () => {
    test('非表示', () => {
      render(
        <DatePicker
          handleSelect={handleFnction}
          isOpen={false}
          handleSubmit={handleFnction}
          handleDelete={handleFnction}
        />
      )
      expect(screen.queryByRole('table')).toBeNull();
    })
    
    test('表示', () => {
      render(
        <DatePicker
          handleSelect={handleFnction}
          isOpen={true}
          handleSubmit={handleFnction}
          handleDelete={handleFnction}
        />
      )
      expect(screen.getByRole('table')).toBeInTheDocument();
    })
  })
})