import { format, eachDayOfInterval, differenceInMinutes, parse } from 'date-fns'

export const parseDate = (date: any) => {
  return parse(date, 'YYYY/MM/DD HH:mm:ss', new Date())
}

export const deferenceMinutes = (day1:Date, day2:Date) => {
  return differenceInMinutes(day1, day2)
}

// カレンダー表示用のひと月分の日付を取得
export const getCalendarDays = (year:number,month:number) => {
  // 1日の曜日を取得
  const first = new Date(year, month - 1, 1).getDay()
  // 月の最終日を取得
  const last = new Date(year, month, 0).getDate()
  // 月初〜月末までの日付配列を作成
  return [0, 1, 2, 3, 4, 5].map(weekIndex => {
    return [0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
      const day = dayIndex + 1 + weekIndex * 7
      return day - 1 < first || last < day - first ? null : day - first
    })
  })
}