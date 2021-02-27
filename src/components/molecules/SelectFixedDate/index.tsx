import React, { FC, useState } from 'react';
import Style from './SelectFixedDate.module.scss';
import DatePicker from '../DatePicker';
import { fixedDate } from '../../../store/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

type Props = {
  currentDate?: fixedDate;
  handleSelectDate: Function;
}
const SelectFixedDate:FC<Props> = ({handleSelectDate, currentDate}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [openPicker, setOpenPicker] = useState(false)
  const handleSelect = (clickDate: fixedDate) => {
    setSelectedDate(clickDate)
    handleSelectDate(selectedDate)
  }

  const setDate = () => {
    if (selectedDate?.year){
      return selectedDate
    } else{
      const today = new Date()
      return {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate(),
      }
    }
  }

  const selectDate = () => {
    setOpenPicker(!openPicker)
  }

  const handleSubmit = () => {
    setOpenPicker(false)
  }

  const handleDelete = () => {
    setSelectedDate(undefined)
    setOpenPicker(false)
  }

  return (
    <div className={Style.content_wrapper}>
      <div
        className={Style.select_date_box_wrapper}
        onClick={selectDate}
      >
        <FontAwesomeIcon icon={faCalendarAlt} className={Style.icon}/>
        { selectedDate ?
          <div className={Style.select_date}>
            {selectedDate.year + '/' + selectedDate.month + '/' + selectedDate.date}
          </div>
          :
          <div className={Style.empty}>期日を設定</div>
        }
      </div>
      
      <DatePicker 
        isOpen={openPicker}
        selectedDate={setDate()}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default SelectFixedDate
