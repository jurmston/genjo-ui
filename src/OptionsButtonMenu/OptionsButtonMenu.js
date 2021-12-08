import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import ButtonBase from '@mui/material/ButtonBase'
import OptionsIcon from '@mui/icons-material/MoreHorizRounded'
import { Menu } from '@mui/material'
import { useTheme } from '@mui/material/styles'


export function OptionsButtonMenu({ show = false, actions, children }) {
  const theme = useTheme()
  const [menuAnchor, setMenuAnchor] = React.useState(null)
  const [isHovering, setIsHovering] = React.useState(false)

  const shouldShow = show || isHovering || Boolean(menuAnchor)

  const handleCloseMenu = React.useCallback(
    event => {
      event.stopPropagation()
      setMenuAnchor(null)
    },
    []
  )

  const handleOpenMenu = React.useCallback(
    event => {
      event.stopPropagation()
      setMenuAnchor(event.currentTarget)
    },
    []
  )

  const handleMouseEnter = React.useCallback(
    () => {
      setIsHovering(true)
    },
    [],
  )

  const handleMouseLeave = React.useCallback(
    () => {
      setIsHovering(false)
    },
    [],
  )

  function handleContainerClick(event) {
    event.stopPropagation()
  }

  const buttonSx = React.useMemo(
    () => ({
      flex: 1,
      width: 34,
      fontSize: 14,
      color: 'action.active',
      py: 0.5,
      px: 1,
      padding: `4px 8px`,
      boxSizing: 'border-box',
      '&:hover': {
        // Fixes issue with right border disappearing on hover
        borderRight: 1,
        borderRightColor: 'divider',
        backgroundColor: 'grey.100',
      },
    }),
    [],
  )

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleContainerClick}
        onKeyPress={handleContainerClick}
        role="button"
        tabIndex={0}
        sx={{
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'common.white',
            opacity: shouldShow ? 1 : 0,
            boxShadow: shouldShow ? '0 2px 10px 0 rgb(21 27 38 / 10%)' : 'none',
            display: shouldShow ? 'flex' : 'none',
            position: 'absolute',
            right: 0,
            transition: theme.transitions.create('opacity'),
            borderRadius: 1,
            overflow: 'hidden',
            border: 1,
            borderColor: 'divider',
            boxSizing: 'border-box',
          }}
        >
          {actions.map((action, index) => (
            <Tooltip key={index} title={action.title}>
              <ButtonBase
                key={index}
                onClick={action.onClick}
                sx={{
                  ...buttonSx,
                  flex: 1,
                  borderRight: 1,
                  borderRightColor: 'divider',
                }}
              >
                {action.icon}
              </ButtonBase>
            </Tooltip>
          ))}

          <Box sx={buttonSx} />
        </Box>

        <ButtonBase
          onClick={handleOpenMenu}
          sx={{
            ...buttonSx,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          <OptionsIcon />
        </ButtonBase>

        <Menu
          sx={{
            mt: 1,
          }}
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
          anchorEl={menuAnchor}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
        >
          {children}
        </Menu>
      </Box>


    </>
  )
}

OptionsButtonMenu.propTypes = {
  /** List of action objects that describe how to render the ButtonGroup. */
  actions: PropTypes.arrayOf(PropTypes.shape({
    /** Title of the action. */
    title: PropTypes.string,
    /** Icon to display in the button. */
    icon: PropTypes.node,
    /** Callback when clicking the button. */
    onClick: PropTypes.func,
  })),
  /** If `true`, the action buttons will be shown. */
  show: PropTypes.bool,
  /** The content of the Menu component (e.g. MenuItems). */
  children: PropTypes.node,
}
