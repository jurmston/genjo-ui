import React from 'react'

import Typography from '@mui/material/Typography'


export default {
  title: 'Material-UI/Typography',
}

export const Primary = () => {

  return (
    <>
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Headline</Typography>
      <Typography variant="h3">h3. Headline</Typography>
      <Typography variant="h4">h4. Headline</Typography>
      <Typography variant="h5">h5. Headline</Typography>
      <Typography variant="h6">h6. Headline</Typography>

      <Typography variant="subtitle1">
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>

      <Typography variant="subtitle2">
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>

      <Typography variant="body1">
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>

      <Typography variant="body2">
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>

      <Typography variant="button" component="div">
        Button text
      </Typography>

      <Typography variant="overline" component="div">
        Overline text
      </Typography>

      <Typography variant="caption" component="div">
        Captions
      </Typography>
    </>
  )
}
