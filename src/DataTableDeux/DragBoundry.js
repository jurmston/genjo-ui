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

    React.useEffect(
      () => {
        console.log('Called')
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)

        return () => {
          window.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('mouseup', onMouseUp)
        }
      },
      [onMouseUp]
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
