import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from '@material-ui/lab/DatePicker'
import TimePicker from '@material-ui/lab/TimePicker'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'

import { DateTime, Duration } from 'luxon'


const DateTimeRangeField = ({
  start: startFromProps,
  end: endFromProps,
  onChange,
  isStacked,
  label = '',
  variant = 'filled',
  helperText = '',
  error = false,
}) => {
  const start = (startFromProps && !startFromProps.invalid
    ? startFromProps
    : DateTime.local().startOf('hour')
  ).startOf('minute')

  const end = (endFromProps && !endFromProps.invalid
    ? endFromProps
    : start.plus({ hours: 1 })
  ).startOf('minute')

  const duration = end.diff(start)

  const hasNegativeDuration = duration < 0
  const durationToAdd = hasNegativeDuration
    ? Duration.fromObject({ hours: 1 })
    : duration

  // If the duration is less than an hour, display the time in minutes
  // If the duraction is less than a day, display the time in hours
  // Otherwise display in days.
  const durationString = hasNegativeDuration
    ? ''
    : duration.as('hours') < 1
    ? `${Math.floor(duration.as('minutes'))} m`
    : duration.as('days') < 1
    ? `${Math.floor(duration.as('hours'))} h`
    : `${Math.floor(duration.as('days'))} d`

  const [openPicker, setOpenPicker] = React.useState(null)

  /**
   * Callback to handle a change to the start date.
   * The hour and minutes values will stay the same as the original start
   * value. The end will shift based on the original duration.
   * @param {object} newStartDate
   */
  const handleStartDateChange = newStartDate => {
    const newStart = newStartDate.set({
      hours: start.hours,
      minutes: start.minutes,
    })

    const newEnd = newStart.plus(durationToAdd)

    onChange(newStart, newEnd)
  }

  /**
   * Callback to handle a change to the start time.
   * The date values will stay the same as the original start value. The end
   * will shift based on the original duration.
   * @param {object} newStartTime
   */
  const handleStartTimeChange = newStartTime => {
    const newStart = newStartTime.set({
      day: start.day,
      month: start.month,
      year: start.year,
    })

    const newEnd = start.plus(durationToAdd)

    onChange(newStart, newEnd)
  }

  /**
   * Callback to handle a change to the end time.
   * The date values will start the same as the original end value. The start
   * will not be affecting (thus changing the duration).
   * @param {object} newEndTime
   */
  const handleEndTimeChange = newEndTime => {
    const newEnd = newEndTime.set({
      day: end.day,
      month: end.month,
      year: end.year,
    })

    onChange(start, newEnd)
  }

  /**
   * Callback to handle a change to the end date.
   * The hour and minutes values will stay the same as the original end
   * value. The start will not be affected (thus changing the duration).
   * @param {object} newEndDate
   */
  const handleEndDateChange = newEndDate => {
    const newEnd = newEndDate.set({
      hours: end.hours,
      minutes: end.minutes,
    })

    onChange(start, newEnd)
  }

  const startDate = (
    <TextField
      error={error}
      variant={variant}
      label={isStacked ? 'From' : null}
      value={start.toLocaleString(DateTime.DATE_MED)}
      onClick={() => setOpenPicker('startDate')}
    />
  )

  const startTime = (
    <TextField
      error={error}
      variant={variant}
      value={start.toLocaleString(DateTime.TIME_SIMPLE)}
      onClick={() => setOpenPicker('startTime')}
    />
  )

  const endTime = (
    <TextField
      error={error}
      variant={variant}
      value={end.toLocaleString(DateTime.TIME_SIMPLE)}
      onClick={() => setOpenPicker('endTime')}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Typography variant="caption" color="textSecondary">
              {durationString}
            </Typography>
          </InputAdornment>
        )
      }}
    />
  )

  const endDate = (
    <TextField
      error={error}
      variant={variant}
      label={isStacked ? 'To' : null}
      value={end.toLocaleString(DateTime.DATE_MED)}
      onClick={() => setOpenPicker('endDate')}
    />
  )

  return (
    <FormControl error={error}>
      {Boolean(label) && <InputLabel>{label}</InputLabel>}
      {isStacked ? (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {startDate}
          </Grid>
          <Grid item xs={6}>
            {startTime}
          </Grid>
          <Grid item xs={6}>
            {endDate}
          </Grid>
          <Grid item xs={6}>
            {endTime}
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1} alignItems="center">
          <Grid item style={{ flex: 1 }}>
            {startDate}
          </Grid>
          <Grid item style={{ flex: 1 }}>
            {startTime}
          </Grid>
          <Grid item style={{ flex: 0 }}>
            <Typography variant="body2">to</Typography>
          </Grid>
          <Grid item style={{ flex: 1 }}>
            {endTime}
          </Grid>
          <Grid item style={{ flex: 1 }}>
            {endDate}
          </Grid>
        </Grid>
      )}

      {/*}
      <DatePicker
        autoOk
        open={openPicker === 'startDate' || openPicker === 'endDate'}
        onClose={() => setOpenPicker(null)}
        TextFieldComponent={() => ''}
        value={openPicker === 'startDate' ? start : end}
        onChange={openPicker === 'startDate' ? handleStartDateChange : handleEndDateChange}
        minDate={openPicker === 'endDate' ? start : DateTime.fromISO('1900-01-01')}
      />

      <TimePicker
        autoOk
        open={openPicker === 'startTime' || openPicker === 'endTime'}
        minutesStep={5}
        onClose={() => setOpenPicker(null)}
        TextFieldComponent={() => ''}
        value={openPicker === 'startTime' ? start : end}
        onChange={openPicker === 'startTime' ? handleStartTimeChange : handleEndTimeChange}
        minDate={openPicker === 'endTime' ? start : null}
      />
      */}

      {Boolean(helperText) && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

DateTimeRangeField.propTypes = {
  start: PropTypes.object,
  end: PropTypes.object,
  onChange: PropTypes.func,
  isStacked: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  helperText: PropTypes.string,
  error: PropTypes.bool,
}

export { DateTimeRangeField }
