import * as React from 'react'
import PropTypes from 'prop-types'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import DownArrow from '@mui/icons-material/KeyboardArrowDownRounded'
import RightArrow from '@mui/icons-material/KeyboardArrowRightRounded'

import ProjectIcon from '@mui/icons-material/RocketLaunchTwoTone'

import { useGantt } from './useGantt'


export function GanttMenu() {
  const { containerRef, options, tasks, svgRef, headerRef } = useGantt()

  const [dim, setDim] = React.useState(0)
  const [headerDim, setHeaderDim] = React.useState(0)
  const [svgDim, setSvgDim] = React.useState(0)

  React.useEffect(
    () => {
      if (containerRef.current) {
        const dim = containerRef.current.getBoundingClientRect()
        const svgDim = svgRef.current.getBoundingClientRect()
        const headerDim = headerRef.current?.getBoundingClientRect()

        console.log({ dim })

        setDim(dim)
        setSvgDim(svgDim)
        setHeaderDim(headerDim)
      }
    },
    [containerRef.current]
  )

  console.log({ dim, svgDim, headerDim })

  return (
    <div
      style={{
        position: 'relative',
        height: svgDim.height,
        minWidth: 300,
        flexBasis: 300,
        backgroundColor: '#fff',
        overflowY: 'hidden',
      }}
    >
      <div style={{ marginTop: options.headerHeight + 1 }} />
      {Object.values(tasks).map(task => (
        <div
          key={task.id}
          style={{
            height: options.rowHeight,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            borderRight: '2px solid #ccc',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1 }}>
            <IconButton>
              <DownArrow />
            </IconButton>

            <ProjectIcon color="primary" />

            <Typography variant="subtitle2">
              {task.label}
            </Typography>
          </Stack>
        </div>
      ))}
    </div>
  )
}

GanttMenu.propTypes = {

}
