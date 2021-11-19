import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import Tooltip from '@mui/material/Tooltip'
import ButtonBase from '@mui/material/ButtonBase'
import OptionsIcon from '@mui/icons-material/MoreHorizRounded'
import { Menu } from '@mui/material'



const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
  },
  button: {
    flex: 1,
    width: 34,
    fontSize: 14,
    color: theme.palette.action.active,
    padding: `4px 8px`,
    boxSizing: 'border-box',
  },

  optionsButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  actionsContainer: {
    backgroundColor: theme.palette.common.white,
    opacity: props => props.shouldShow ? 1 : 0,
    boxShadow: props => props.shouldShow ? '0 2px 10px 0 rgb(21 27 38 / 10%)' : 'none',
    display: props => props.shouldShow ? 'flex' : 'none',
    position: 'absolute',
    right: 0,
    transition: theme.transitions.create('opacity'),
    borderRadius: 4,
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box',
  },

  actionButton: {
    flex: 1,
    borderRight: `1px solid ${theme.palette.divider}`,
  },

  menu: {
    marginTop: 8,
  },
}))



export function OptionsButtonMenu({ show = false, actions, children, ...buttonGroupProps }) {
  const [menuAnchor, setMenuAnchor] = React.useState(null)
  const [isHovering, setIsHovering] = React.useState(false)

  const classes = useStyles({
    shouldShow: show || isHovering || Boolean(menuAnchor),
  })

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

  return (
    <>
      <div
        className={classes.root}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleContainerClick}
        onKeyPress={handleContainerClick}
        role="button"
        tabIndex={0}
      >
        <div className={classes.actionsContainer}>
          {actions.map((action, index) => (
            <Tooltip key={index} title={action.title}>
              <ButtonBase
                key={index}
                className={clsx(classes.actionButton, classes.button)}
                onClick={action.onClick}
              >
                {action.icon}
              </ButtonBase>
            </Tooltip>
          ))}

          <div className={classes.button} />
        </div>

        <ButtonBase
          className={clsx(classes.button, classes.optionsButton)}
          onClick={handleOpenMenu}
        >
          <OptionsIcon />
        </ButtonBase>

        <Menu
          className={classes.menu}
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
      </div>


    </>
  )
}

OptionsButtonMenu.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
  })),
}
