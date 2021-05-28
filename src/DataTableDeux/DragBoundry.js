import * as React from 'react'
import PropTypes from 'prop-types'


function areEqual(prevProps, nextProps) {
  return prevProps.initialX === nextProps.initialX
}


export const DragBoundry = React.memo(
  ({ left = 0, width = 0, initialX, onMouseUp }) => {
    const [currentX, setCurrentX] = React.useState(initialX)

    function onMouseMove(event) {
      setCurrentX(event.clientX)
    }

    function handleMouseUp() {
      onMouseUp(currentX)
    }

    React.useEffect(
      () => {
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
          window.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('mouseup', handleMouseUp)
        }
      },
      [handleMouseUp]
    )

    const resizeWidth = Math.min(
      500,
      Math.max(
        36,
        width + (currentX - initialX)
      )
    )

    return (
      <div
        className="GenjoDataTable__drag-boundry"
        style={{
          left,
          width: resizeWidth,
        }}
      />
    )
  },
  areEqual,
)

DragBoundry.displayName = 'DragBoundry'

DragBoundry.propTypes = {

}
