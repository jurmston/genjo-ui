import React from 'react'
import PropTypes from 'prop-types'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ColorPickerButton } from './ColorPickerButton'
import AddOn, { AddOnButton } from '../AddOn'
import CheckIcon from '@mui/icons-material/CheckRounded'
import useSyncedProp from '../useSyncedProp'


// From: https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444
const hexRegEx = /^#([0-9A-F]{3}){1,2}$/i
const excludeNonHexRegEx = /[^0-9A-F]/gi


/** Popover menu for selecting a color. */
export function ColorPickerMenu({ anchor, close, onChange, value, colors }) {
  const [displayColor, setDisplayColor] = useSyncedProp(value)

  function changeDisplayColor(toDisplay) {
    setDisplayColor(toDisplay || value)
  }

  function handleInputChange(event) {
    setDisplayColor(`#${event.target.value.replace(excludeNonHexRegEx, '')}`)
  }

  function handleFocusInput(event) {
    event.target.select()
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (hexRegEx.test(displayColor)) {
      onChange(displayColor)
    }
  }

  const isValidHex = React.useMemo(
    () => {
      return hexRegEx.test(displayColor)
    },
    [displayColor]
  )

  return (
    <Popover
      sx={{
        marginTop: -1,
        marginLeft: -1,
      }}
      open={!!anchor}
      onClose={close}
      anchorEl={anchor}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
      PaperProps={{
        elevation: 2,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ padding: 1 }}>
        <Box
          sx={{
            backgroundColor: displayColor,
            height: 32,
            width: 32,
            borderRadius: 1,
            boxShadow: 2,
          }}
        />

          <div
            style={{
              // maxWidth: 32 * 6,
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 22px)',
              gridTemplateRows: 'repeat(3, 22px) 1fr',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {colors.map(color => (
              <ColorPickerButton
                key={color}
                color={color}
                onClick={() => onChange(color)}
                checked={value === color}
                changeDisplayColor={changeDisplayColor}
              />
            ))}

            <div style={{ gridColumn: 'span 6 / span 6' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  error={!isValidHex}
                  value={displayColor?.replace(/#/g, '')}
                  onChange={handleInputChange}
                  InputProps={{
                    onFocus: handleFocusInput,
                    startAdornment: (
                      <AddOn position="start">#</AddOn>
                    ),
                    endAdornment: (
                      <AddOnButton
                        position="end"
                        disabled={!isValidHex}
                        type="submit"
                      >
                        <CheckIcon />
                      </AddOnButton>
                    ),
                  }}
                />
              </form>
            </div>
          </div>
      </Stack>
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
