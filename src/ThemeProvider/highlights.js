import { alpha, duration, easing } from '@mui/material/styles'


export function createHighlight(color) {
  return [
    `rgb(0 0 0 / 0%) 0px 0px 0px 0px`,
    `${alpha(color, 0.36)} 0px 0px 0px 4px`,
    `rgb(0 0 0 / 0%) 0px 0px 0px 0px`,
    `rgb(60 66 87 / 16%) 0px 0px 0px 1px`,
    `rgb(0 0 0 / 0%) 0px 0px 0px 0px`,
    `rgb(0 0 0 / 0%) 0px 0px 0px 0px`,
    `rgb(0 0 0 / 0%) 0px 0px 0px 0px`,
  ].join(',')
}


export const highlightTransition = `box-shadow ${duration.standard}ms ${easing.easeInOut}`
