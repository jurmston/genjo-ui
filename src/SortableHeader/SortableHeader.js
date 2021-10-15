import * as React from 'react'
import PropTypes from 'prop-types'

import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import AscendingIcon from '@mui/icons-material/ArrowDropUpRounded'
import DescendingIcon from '@mui/icons-material/ArrowDropDownRounded'


export function SortableHeader({ onClick, value, sortingKey, direction = 'asc', children, ...buttonProps }) {

  const handleClick = React.useCallback(
    event => {
      const newDirection = value !== sortingKey
        ? 'asc'
        : direction === 'asc'
        ? 'desc'
        : 'asc'

      onClick(event, sortingKey, newDirection)
    },
    [value, direction, sortingKey]
  )

  const icon = React.useMemo(
    () => sortingKey !== value
      ? null
      : direction === 'asc'
      ? <AscendingIcon color="primary" sx={{ fontSize: 24 }} />
      : <DescendingIcon color="primary" sx={{ fontSize: 24 }} />,
    [sortingKey, value, direction]
  )

  return (
    <ButtonBase
      {...buttonProps}
      onClick={handleClick}
      color={sortingKey === value ? 'secondary' : 'primary'}
      disableRipple
      disableTouchRipple
      sx={{
        py: 0.5,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 999,
      }}
    >
      <Typography
        color={sortingKey === value ? 'primary' : 'textSecondary'}
        variant="body2"
        sx={{
          // fontVariant: 'small-caps',
          fontWeight: 700,
          mr: sortingKey === value ? 0.5 : 0,
        }}
      >
        {children}
      </Typography>

      {icon}
    </ButtonBase>
  )
}

SortableHeader.propTypes = {

}
