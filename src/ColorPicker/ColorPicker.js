import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover'

import CheckIcon from '@material-ui/icons/Check'

import { colors as themeColors, colorsMain } from '../styles/colors'

const useMenuStyles = makeStyles({
  popover: {
    marginTop: 4,
  },
  picker: {
    maxWidth: 32 * 6,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

const useButtonStyles = makeStyles(theme => ({
  button: {
    backgroundColor: props => props.color || themeColors.blueGrey[500],
    color: theme.palette.white,
    margin: theme.spacing(0.5),
    minWidth: 22,
    minHeight: 22,
    '&:hover': {
      backgroundColor: props => {
        try {
          // Fade requires a properly formatted hex color.
          return alpha(props.color || '', 0.5)
        } catch {
          return themeColors.blueGrey[500]
        }
      },
    },
  },
}))

const usePickerStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  popover: {
    marginTop: 4,
  },
  picker: {
    maxWidth: 32 * 6,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

/**
 * Button for selecting the picker color.
 */
const ColorPickerButton = ({ checked, color = themeColors.blueGrey[500], label = '', onClick }) => {
  const classes = useButtonStyles({
    color,
  })

  return (
    <Tooltip title={label}>
      <IconButton onClick={onClick} className={classes.button} aria-label={label}>
        {checked && <CheckIcon />}
      </IconButton>
    </Tooltip>
  )
}

/** Popover menu for selecting a color. */
const ColorPickerMenu = ({ anchor, close, onChange, value, colors }) => {
  const classes = useMenuStyles()

  return (
    <Popover
      className={classes.popover}
      open={!!anchor}
      onClose={close}
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
    >
      <div className={classes.picker}>
        {colors.map(color => (
          <ColorPickerButton key={color} color={color} onClick={() => onChange(color)} checked={value === color} />
        ))}
      </div>
    </Popover>
  )
}

/** Input for selecting color values. */
const ColorPicker = ({ id, value = themeColors.blueGrey[500], onChange, label, colors = colorsMain }) => {
  const classes = usePickerStyles()

  const [anchor, setAnchor] = React.useState(null)

  const close = () => setAnchor(null)

  return (
    <div id={id} className={classes.root} aria-label={label}>
      <div>
        <ColorPickerButton
          color={value}
          label="Click to Change Color"
          onClick={event => setAnchor(event.currentTarget)}
        />
      </div>
      <ColorPickerMenu
        colors={colors}
        anchor={anchor}
        close={close}
        onChange={newValue => {
          close()
          onChange(newValue)
        }}
        value={value}
      />
    </div>
  )
}

ColorPickerButton.propTypes = {
  /** If `true`, a check mark appears. */
  checked: PropTypes.bool,
  /** Color of the button. */
  color: PropTypes.string,
  /** Label of the button. */
  label: PropTypes.string,
  /**
   * Callback when button is clicked.
   */
  onClick: PropTypes.func,
}

ColorPickerMenu.propTypes = {
  /** The current color value of the picker. */
  value: PropTypes.string,
  anchor: PropTypes.any,
  close: PropTypes.func,
  onChange: PropTypes.func.isRequired,
}

ColorPicker.propTypes = {
  /** The id of the picker. */
  id: PropTypes.string,
  /** Label of the button. */
  label: PropTypes.string,
  /**
   * Callback when a color is selected.
   *
   * @param {object} event The source event from the callback.
   */
  onChange: PropTypes.func.isRequired,
  /** The current color value of the picker. */
  value: PropTypes.string,
}

export { ColorPicker, ColorPickerButton, ColorPickerMenu }

export default ColorPicker
