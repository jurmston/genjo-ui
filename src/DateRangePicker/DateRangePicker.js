import * as React from 'react'
import PropTypes from 'prop-types'

import StaticDatePicker from '@mui/lab/StaticDatePicker'
import PickersDay from '@mui/lab/PickersDay'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'


export function DateRangePicker({ start = null, end = null, onChange }) {
  const [currentSelection, setCurrentSelection] = React.useState('none')
  const [hoveredDay, setHoveredDay] = React.useState(null)

  // Create all the datetime points for the hover and selection comparisons.
  const startStart = start?.startOf('day')
  const startEnd = start?.endOf('day')
  const endStart = end?.startOf('day')
  const endEnd = end?.endOf('day')
  const hoveredStart = hoveredDay?.startOf('day')
  const hoveredEnd = hoveredDay?.endOf('day')

  function handleChange(newValue) {
    // Case: the first selection.
    if (currentSelection === 'none') {
      setCurrentSelection('start')
      return onChange({ start: newValue, end: newValue })
    }

    if (currentSelection === 'start' && newValue < startStart) {
      setCurrentSelection('start')
      return onChange({ start: newValue, end: newValue })
    }

    if (currentSelection === 'start') {
      setCurrentSelection('end')
      return onChange({ start, end: newValue })
    }

    if (currentSelection === 'end' && newValue < endStart) {
      setCurrentSelection('start')
      onChange({ start: newValue, end })
    }

    setCurrentSelection('start')
    return onChange({ start: newValue, end: newValue })
  }

  const renderWeekPickerDay = (date, _selectedDates, PickersDayComponentProps) => {
    if (!start || !end) {
      return <PickersDay {...PickersDayComponentProps} />
    }

    const isFirstDay = date >= startStart && date <= startEnd
    const isLastDay = date >= endStart && date <= endEnd
    const isBetweenDay = date > startEnd && date < endStart

    const isInRange = isBetweenDay || isFirstDay || isLastDay

    let isFirstDayHover = false
    let isLastDayHover = false
    let isBetweenDayHover = false

    if (hoveredDay) {
      isFirstDayHover = currentSelection === 'end' && date >= hoveredStart && date <= hoveredEnd && date < startStart

      isLastDayHover = currentSelection === 'start' && date >= hoveredStart && date <= hoveredEnd && date > endEnd

      const dayIsBetweenHoverAndStart = currentSelection === 'end' && date > hoveredEnd && date <= startEnd

      const dayIsBetweenHoverAndEnd = currentSelection === 'start' && date < hoveredStart && date >= endStart

      isBetweenDayHover = dayIsBetweenHoverAndStart || dayIsBetweenHoverAndEnd
    }

    const isInHoverRange = isFirstDayHover || isLastDayHover || isBetweenDayHover

    return (
      <div style={{ position: 'relative' }} key={date.toISO()}>
        {isInHoverRange && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 0,
              backgroundColor: 'grey.100',

              borderTopLeftRadius: isFirstDayHover ? '50%' : 0,
              borderBottomLeftRadius: isFirstDayHover ? '50%' : 0,

              borderTopRightRadius: isLastDayHover ? '50%' : 0,
              borderBottomRightRadius: isLastDayHover ? '50%' : 0,
            }}
          />
        )}

        {isInRange && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 0,
              backgroundColor: 'primary.main',

              borderTopLeftRadius: isFirstDay ? '50%' : 0,
              borderBottomLeftRadius: isFirstDay ? '50%' : 0,

              borderTopRightRadius: isLastDay ? '50%' : 0,
              borderBottomRightRadius: isLastDay ? '50%' : 0,
            }}
          />
        )}

        <PickersDay
          {...PickersDayComponentProps}
          disableMargin
          selected={false}
          onMouseEnter={() => setHoveredDay(date)}
          onMouseLeave={() => setHoveredDay(null)}
          sx={{
            position: 'relative',
            backgroundColor: !isInRange
              ? 'transparent'
              : isFirstDay || isLastDay
              ? 'primary.dark'
              : isInHoverRange
              ? 'grey.100'
              : 'primary.main',

            color: isInRange || isFirstDay || isLastDay
              ? 'common.white'
              : 'text.secondary',
          }}
        />
      </div>
    )
  }

  return (
    <StaticDatePicker
      openTo="day"
      value={start}
      onChange={handleChange}
      renderDay={renderWeekPickerDay}
      renderInput={params => <TextField {...params} variant="standard" />}
      clearable
      showToolbar={false}
    />
  )
}

DateRangePicker.propTypes = {
  start: PropTypes.any,
  end: PropTypes.any,
  onChange: PropTypes.func,
}
