import { alpha, duration, easing } from '@mui/material/styles'


export function createHighlight(color) {
  return `${alpha(color, 0.36)} 0px 0px 0px 3px, rgba(255, 255, 255, 0.12) 0px 0px 0px 1px`
  // return `rgb(255 255 255 / 0%) 0px 0px 0px 0px, ${alpha(color, 0.36)} 0px 0px 0px 4px, rgb(255 255 255 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(255 255 255 / 0%) 0px 0px 0px 0px, rgb(255 255 255 / 0%) 0px 0px 0px 0px, rgb(255 255 255 / 0%) 0px 0px 0px 0px`
}


export const baseHighlight = `rgba(255, 255, 255, 0) 0px 0px 0px 0px`


export const highlightTransition = `box-shadow ${duration.standard}ms ${easing.easeInOut}`

export function createHighlightSx(color, borderRadius) {
  return {
    '&::before': {
      content: '""',
      pointerEvents: 'none',
      position: 'absolute',
      inset: 0,
      transition: highlightTransition,
      borderRadius,
    },

    '&:focus::before': {
      boxShadow: createHighlight(color),
    },
  }
}