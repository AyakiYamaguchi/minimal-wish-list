import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import SelectFixedDate from './index';

const demoFunction = jest.fn();

const today = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate()
}

const todayStr = today.year + '/' + today.month + '/' + today.date

describe('SelectFixedDate', () => {
  afterEach(() => {
    cleanup()
  })
  describe('日付表示のテスト', () => {
    test('日付の初期値が無い場合、「期日設定」が表示されることを確認', () => {
      render(
        <SelectFixedDate 
          handleSelectDate={demoFunction}
          setFixedDate={demoFunction}
          deleteFixedDate={demoFunction}
        />
      )
      expect(screen.getByText('期日を設定')).toBeInTheDocument();
    })

    test('日付の初期値がある場合、初期値の日付が表示されていることを確認', () => {
      render(<SelectFixedDate
          currentDate={today} 
          handleSelectDate={demoFunction}
          setFixedDate={demoFunction}
          deleteFixedDate={demoFunction}
        />
      )
      expect(screen.getByText(todayStr)).toBeInTheDocument();
      // 期日を設定は表示されないことを確認
      expect(screen.queryByText('期日を設定')).toBeNull();
    })
  })

  describe('日付変更処理のテスト', () => {
    test('日付保存時に実行する関数のテスト',() => {
      const handleSelect = jest.fn()
      const handleSetFixedDate = jest.fn()
      render(
        <SelectFixedDate 
          handleSelectDate={handleSelect}
          setFixedDate={handleSetFixedDate}
          deleteFixedDate={demoFunction}
        />
      )

      fireEvent.click(screen.getByText('期日を設定'))
      fireEvent.click(screen.getByText(today.date))
      fireEvent.click(screen.getByRole('button', {name: '保存する'}))
      // 選択した日付が表示されていることを確認
      expect(screen.getByText(todayStr)).toBeInTheDocument();
      // 日付クリック時に関数が実行されていることを確認
      expect(handleSelect).toHaveBeenCalledTimes(1)
      expect(handleSetFixedDate).toHaveBeenCalledTimes(1)
    })

    test('日付削除時のテスト',() => {
      const handleDelete = jest.fn()
      render(
        <SelectFixedDate 
          currentDate={today}
          handleSelectDate={demoFunction}
          setFixedDate={demoFunction}
          deleteFixedDate={handleDelete}
        />
      )
      
      fireEvent.click(screen.getByText(todayStr))
      fireEvent.click(screen.getByRole('button', {name: '期日を削除する'}))
      // 日付がリセットされていることを確認
      expect(screen.getByText('期日を設定')).toBeInTheDocument();
      expect(screen.queryByText(todayStr)).toBeNull();
      // 日付削除時に関数が実行されていることを確認
      expect(handleDelete).toHaveBeenCalledTimes(1)
    })
  })
})