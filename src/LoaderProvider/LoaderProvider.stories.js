import React from 'react'
import Button from '@material-ui/core/Button'
import LoaderProvider from './LoaderProvider'
import useLoader from './useLoader'

export default {
  title: 'Providers/LoaderProvider',
  component: LoaderProvider,
}


const TriggerLoaderButton = () => {
  const loader = useLoader()

  function trigger() {
    loader.open('Saving data...')
    setTimeout(loader.close, 3000)
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
