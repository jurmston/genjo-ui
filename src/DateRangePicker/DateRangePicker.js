import * as React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import StaticDatePicker from '@material-ui/lab/StaticDatePicker'
import PickersDay from '@material-ui/lab/PickersDay'
import TextField from '@material-ui/core/TextField'
import { DateTime } from 'luxon'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  isFirstDay: {},
  isLastDay: {},

  hoverHighlight: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    backgroundColor: theme.palette.grey[100],

    '&$isFirstDay': {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    },

    '&$isLastDay': {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    },
  },

  selectionHighlight: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,

    '&$isFirstDay': {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    },

    '&$isLastDay': {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    },
  },

  selectionDay: {
    backgroundColor: theme.palette.primary.main,

    '&$isFirstDay': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },

    '&$isLastDay': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  },

  hoverDay: {
    backgroundColor: theme.palette.grey[100],
  },
}))

export const DateRangePicker = ({ start = null, end = null, onChange }) => {
  const [currentSelection, setCurrentSelection] = React.useState('none')
  const [hoveredDay, setHoveredDay] = React.useState(null)

  const classes = useStyles()

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
          <div
            className={clsx(
              classes.hoverHighlight,
              isFirstDayHover && classes.isFirstDay,
              isLastDayHover && classes.isLastDay
            )}
          />
        )}

        {isInRange && (
          <div
            className={clsx(
              classes.selectionHighlight,
              isFirstDay && classes.isFirstDay,
              isLastDay && classes.isLastDay
            )}
          />
        )}

        <PickersDay
          {...PickersDayComponentProps}
          disableMargin
          selected={false}
          onMouseEnter={() => setHoveredDay(date)}
          onMouseLeave={() => setHoveredDay(null)}
          style={{ position: 'relative' }}
          className={clsx({
            [classes.selectionDay]: isInRange,
            [classes.isFirstDay]: isFirstDay,
            [classes.isLastDay]: isLastDay,
            [classes.hoverDay]: isInHoverRange,
          })}
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

DateRangePicker.propTypes = {}

export default DateRangePicker
