import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { LoaderProvider, useLoader } from './LoaderProvider'

export default {
  title: 'Providers/LoaderProvider',
  component: LoaderProvider,
}


const TriggerLoaderButton = () => {
  const loader = useLoader()

  function trigger() {
    loader.setMessage('Saving data...')
    setTimeout(loader.clear, 3000)
  }

  return (
    <Button variant="contained" color="primary" onClick={trigger}>
      Trigger Loader
    </Button>
  )
}


export const Main = () => {

  return (
    <LoaderProvider>
      <TriggerLoaderButton />
    </LoaderProvider>
  )
}
