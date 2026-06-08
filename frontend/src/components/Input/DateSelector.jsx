import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import moment from 'moment'
import { MdClose, MdOutlineDateRange } from 'react-icons/md'

const DateSelector = React.memo(({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false)

  return (
    <div className='relative'>
      <button
        className='inline-flex items-center gap-2 text-[13px] font-medium text-purple-600 bg-purple-200/40 hover:bg-purple-200/70 rounded px-2 py-1 cursor-pointer'
        onClick={() => setOpenDatePicker(true)}
      >
        <MdOutlineDateRange className='text-lg' />
        {date ? moment(date).format("Do MMM YYYY") : moment().format("Do MMM YYYY")}
      </button>

      {openDatePicker && (
        <div
          className='absolute z-50 top-full mt-2 left-0 bg-white border border-purple-100 shadow-xl rounded-lg p-3 pt-10'
          style={{ width: '280px' }}
        >
          <button
            className='w-8 h-8 rounded-full flex items-center justify-center bg-purple-50 hover:bg-purple-100 absolute top-2 right-2 z-10'
            onClick={() => setOpenDatePicker(false)}
          >
            <MdClose className='text-lg text-purple-600' />
          </button>

          <DayPicker
            captionLayout='dropdown'
            mode='single'
            selected={date}
            onSelect={(d) => {
              setDate(d)
              setOpenDatePicker(false)
            }}
            showOutsideDays
            classNames={{
              root: 'w-full',
              months: 'w-full',
              month: 'w-full',
              month_grid: 'w-full border-collapse',
              weekdays: 'flex',
              weekday: 'flex-1 text-center text-[11px] font-medium text-purple-400 pb-1',
              weeks: 'w-full',
              week: 'flex',
              day: 'flex-1 flex items-center justify-center',
              day_button: 'w-8 h-8 text-[13px] rounded-md hover:bg-purple-100 text-gray-700 mx-auto',
              selected: '[&>button]:bg-purple-600 [&>button]:text-white [&>button]:hover:bg-purple-700',
              today: '[&>button]:font-bold [&>button]:text-purple-600',
              outside: '[&>button]:text-gray-300',
              disabled: '[&>button]:opacity-30 [&>button]:cursor-not-allowed',
              nav: 'flex items-center justify-between mb-2',
              button_previous: 'w-7 h-7 flex items-center justify-center rounded-full hover:bg-purple-50 text-purple-600',
              button_next: 'w-7 h-7 flex items-center justify-center rounded-full hover:bg-purple-50 text-purple-600',
              month_caption: 'flex items-center justify-center mb-2',
              caption_label: 'text-[13px] font-semibold text-gray-800',
              dropdowns: 'flex gap-1',
              dropdown: 'text-[12px] border border-purple-100 rounded px-1 py-0.5 text-gray-700 bg-white',
            }}
          />
        </div>
      )}
    </div>
  )
})

export default DateSelector