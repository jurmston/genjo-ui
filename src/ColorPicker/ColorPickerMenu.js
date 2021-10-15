import React from 'react'
import PropTypes from 'prop-types'
import Popover from '@mui/material/Popover'
import { ColorPickerButton } from './ColorPickerButton'

/** Popover menu for selecting a color. */
export function ColorPickerMenu({ anchor, close, onChange, value, colors }) {
  return (
    <Popover
      sx={{
        marginTop: 0.5,
      }}
      open={!!anchor}
      onClose={close}
      anchorEl={anchor}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
    >
      <div
        style={{
          maxWidth: 32 * 6,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {colors.map(color => (
          <ColorPickerButton key={color} color={color} onClick={() => onChange(color)} checked={value === color} />
        ))}
      </div>
    </Popover>
  )
}

ColorPickerMenu.propTypes = {
  /** The current color value of the picker. */
  value: PropTypes.string,
  anchor: PropTypes.any,
  close: PropTypes.func,
  onChange: PropTypes.func.isRequired,
}
