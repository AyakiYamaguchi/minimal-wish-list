import { format, eachDayOfInterval, differenceInMinutes, parse } from 'date-fns'

export const parseDate = (date: any) => {
  return parse(date, 'YYYY/MM/DD HH:mm:ss', new Date())
}

export const deferenceMinutes = (day1:Date, day2:Date) => {
  return differenceInMinutes(day1, day2)
}