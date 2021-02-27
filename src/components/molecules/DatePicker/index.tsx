import React, { FC, useState } from 'react'
import Style from './DatePicker.module.scss';
import { getCalendarDays } from '../../../helper/dateHelper';
import { date } from 'yup';

type Props = {
  selectedDate: {
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
  const [year, setYear] = useState(selectedDate.year);
  const [month , setMonth] = useState(selectedDate.month);
  const days = getCalendarDays(year,month);
  const selectedDateStr = selectedDate.year + '' + selectedDate.month + selectedDate.date;

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
            <tr className={Style.tableHeader}>
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
            {
              days.map( week => {
                return(
                  <tr>
                    {
                      week.map( dateItem => {
                        const calendarDate = year + '' + month + dateItem
                        return(
                          <td className={Style.date_wrapper}>
                            { dateItem &&
                              <div
                                className={`
                                  ${Style.dateItem} 
                                  ${selectedDateStr === calendarDate && Style.dateItem__selected} 
                                `} 
                                onClick={()=> clickDate(dateItem)}
                              >
                                {dateItem}
                              </div>
                            }
                            
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
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
