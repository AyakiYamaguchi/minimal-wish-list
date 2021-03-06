import React, { FC, useState } from 'react'
import Style from './DatePicker.module.scss';
import { getCalendarDays } from '../../../helper/dateHelper';

type Props = {
  selectedDate?: {
    year: number;
    month: number;
    date: number;
  };
  handleSelect: Function;
  isOpen: boolean;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
  handleDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const DatePicker:FC<Props> = ({selectedDate, handleSelect, isOpen, handleSubmit, handleDelete}) => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate()
  }
  const [year, setYear] = useState( selectedDate ? selectedDate.year : today.year);
  const [month , setMonth] = useState(selectedDate ? selectedDate.month : today.month );
  const days = getCalendarDays(year,month);
  const selectedDateStr = selectedDate?.year + '' + selectedDate?.month + selectedDate?.date;
  const todayStr = today.year + '' + today.month + today.date;

  const clickDate = (date: number) => {
    const updateDate = {
      year: year,
      month: month,
      date: date,
    }
    handleSelect(updateDate)
  }

  const ChangeMonth = (n: number) => {
    const nextMonth = month + n
    if( nextMonth > 12 ) {
      setYear(year + 1)
      setMonth(1)
    } else if ( nextMonth < 1) {
      setYear(year -1)
      setMonth(12)
    } else {
      setMonth(nextMonth)
    }
  }

  return (
    <div>
      { isOpen &&
        <div className={Style.calendar_wrapper}>
        {/* カレンダーの表示月変更エリア */}
        <div className={Style.calendarHeader}>
          <button className={Style.calendarHeader__button} onClick={()=>ChangeMonth(-1)}>＜</button>
          <h1 className={Style.calendarHeader__title}>{year}年{month}月</h1>
          <button className={Style.calendarHeader__button} onClick={()=>ChangeMonth(1)}>＞</button>
        </div>
        {/* カレンダー表示エリア */}
        <div className={Style.tableWrap}>
          <table className={Style.table}>
            <thead>
              <tr className={Style.tableHeader}>
                <th>日</th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th>土</th>
              </tr>
            </thead>
            <tbody>
            {
              days.map((week, index) => {
                return(
                  <tr key={index}>
                    {
                      week.map( (dateItem, index) => {
                        const calendarDate = year + '' + month + dateItem
                        return(
                          <td className={Style.date_wrapper} key={index}>
                            { dateItem &&
                              <p
                                className={`
                                  ${Style.dateItem} 
                                  ${selectedDateStr === calendarDate && Style.dateItem__selected} 
                                  ${todayStr === calendarDate && Style.dateItem__today}
                                `} 
                                onClick={()=> clickDate(dateItem)}
                                aria-label={calendarDate}
                              >
                                {dateItem}
                              </p>
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <div className={Style.button_wrapper}>
          <button
            className={Style.delete_button}
            onClick={handleDelete}
          >期日を削除する</button>
          <button
            className={Style.submit_button}
            onClick={handleSubmit}
          >保存する</button>
        </div>
      </div>
      }
    </div>
  )
}

export default DatePicker
