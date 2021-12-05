import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import { colors as themeProviderColors } from '../ThemeProvider'

import { ColorPickerMenu } from './ColorPickerMenu'
import { ColorPickerButton } from './ColorPickerButton'

const defaultColors = [
  themeProviderColors.stone[500],
  themeProviderColors.red[500],
  themeProviderColors.orange[500],
  themeProviderColors.amber[500],
  themeProviderColors.yellow[500],
  themeProviderColors.lime[500],
  themeProviderColors.green[500],
  themeProviderColors.emerald[500],
  themeProviderColors.teal[500],
  themeProviderColors.cyan[500],
  themeProviderColors.sky[500],
  themeProviderColors.blue[500],
  themeProviderColors.indigo[500],
  themeProviderColors.violet[500],
  themeProviderColors.purple[500],
  themeProviderColors.fuchsia[500],
  themeProviderColors.pink[400],
  themeProviderColors.rose[300],
]

/** Input for selecting color values. */
const ColorPicker = ({
  id,
  value,
  onChange,
  label,
  colors = defaultColors,
}) => {

  const [anchor, setAnchor] = React.useState(null)

  const close = () => setAnchor(null)

  return (
    <div
      id={id}
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <div>
        <Tooltip title="Click to Change Color">
          <div>
            <ColorPickerButton
              color={value}
              onClick={event => setAnchor(event.currentTarget)}
            />
          </div>
        </Tooltip>
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
