import * as React from 'react'
import PropTypes from 'prop-types'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DownArrow from '@mui/icons-material/KeyboardArrowDownRounded'

import RightArrow from '@mui/icons-material/KeyboardArrowRightRounded'

import NotStartedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import InProgressIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import StuckIcon from '@mui/icons-material/NewReleasesRounded'
import DoneIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import OnHoldIcon from '@mui/icons-material/WarningAmberRounded'

import { colors } from '../ThemeProvider'

import { useGantt } from './useGantt'


const defaultTaskStatus = [NotStartedIcon, colors.stone[400]]

const taskStatuses = {
  IN_PROGRESS: [InProgressIcon, colors.indigo[500]],
  STUCK: [StuckIcon, colors.red[500]],
  DONE: [DoneIcon, colors.green[500]],
  ON_HOLD: [OnHoldIcon, colors.amber[500]],
}


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

      {Object.values(tasks).map(task => {

        const [IconComponent, color] = taskStatuses[task.status] || defaultTaskStatus

        return (
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
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ p: 1 }}
            >
              <Box
                sx={{ ml: task.type === 'PROJECT'
                  ? 0
                  : task.type === 'PHASE'
                  ? 2
                  : 4
                }}
              />

              {task.type !== 'TASK' ? (
                <IconButton>
                  <DownArrow />
                </IconButton>
              ) : (
                <IconButton>
                  {<IconComponent sx={{ color }} />}
                </IconButton>
              )}

              {Boolean(task.chip) && <Chip label={task.chip} />}

              <Typography variant="subtitle2">
                {task.label}
              </Typography>
            </Stack>
          </div>
        )
      })}
    </div>
  )
}

GanttMenu.propTypes = {

}
