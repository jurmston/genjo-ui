import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'


/**
 * Menu panel.
 */
export const MobileMenuPanel = ({ isOpen, toggle, children }) => {

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onClose={() => toggle('false')}
      onOpen={() => toggle('true')}
      sx={{ zIndex: 9999 }}
      disableSwipeToOpen
      disableDiscovery
      PaperProps={{
        sx: {
          top: 64,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          paddingTop: 2,
          paddingBottom: `42px`,
        }
      }}
    >
      <div>
        {children}
      </div>

      <Button
        onClick={() => toggle('false')}
        sx={{ position: 'fixed', bottom: 2, right: 2 }}
      >
        Done
      </Button>
    </SwipeableDrawer>
  )
}

MobileMenuPanel.propTypes = {
  /** Content of the menu list. */
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
}
