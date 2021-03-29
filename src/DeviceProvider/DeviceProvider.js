import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'


/**
 * Given the current size of the screen and the isMobile flag, determines which
 * rendering mode should be selected.
 */
function getMode({ width, isMobile }) {
  return isMobile && ['xs', 'sm'].includes(width)
    ? 'mobile'
    : 'desktop'
}


export const DeviceContext = React.createContext()


export const DeviceProvider = ({ children }) => {
  const theme = useTheme()

  const keys = [...theme.breakpoints.keys].reverse()

  // Note: this check will break if there is any customization of the break-
  // points in the theme configuration.
  const width = keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'

  const isPortrait = useMediaQuery('(orientation: portrait)')
  const isLandscape = useMediaQuery('(orientation: landscape)')

  const orientation = isPortrait
    ? 'portrait'
    : isLandscape
    ? 'landscape'
    : 'unknown'

  // From:
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Device_Detection
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(
    () => {
      if (window.navigator) {
        setIsMobile(!!window.navigator?.userAgent.match(/Mobi/i) ?? false)
      }
    },
    []
  )

  const mode = getMode({ width, isMobile })

  return (
    <DeviceContext.Provider
      value={{
        width,
        isMobile,
        orientation,
        mode,
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}


export const useDevice = () => React.useContext(DeviceContext)


DeviceProvider.propTypes = {
  children: PropTypes.node,
}

export default DeviceProvider
