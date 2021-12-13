import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'

import { MapComponent } from './MapComponent'
import { MapContext } from './MapContext'
import { Marker } from './Marker'
import { Clusterer } from './Clusterer'
import GoogleMapsProvider from '../GoogleMapsProvider'

import { GoogleMapsWrapper } from '../../.storybook/components/GoogleMapsWrapper'
import getRandomUsers from '../../.storybook/utils/getRandomUsers'

export default {
  title: 'Components/MapComponent',
  component: GoogleMapsProvider,
}

const ICON_SIZE = 48

function createAvatarIcon({ url, google }) {
  return {
    url,
    scaledSize: new google.maps.Size(ICON_SIZE, ICON_SIZE),
    // shape: { type: 'circle', coords:[17,17,18], },
  }
}

function createInfoWindowContent(person) {
  return `
    <div>
      <h3>${person.fullName}</h3>
    </div>
  `
}


const PrimaryInner = () => {

  const [people, setPeople] = React.useState([])

  const [anchor, setAnchor] = React.useState(null)

  const [currentPosition, setCurrentPosition] = React.useState({
    latitude: 39.494942918409095,
    longitude: -119.80110393425723,
  })

  React.useEffect(
    () => {
      setPeople(getRandomUsers(10))
    },
    []
  )

  return (
    <div style={{ width: 500 }}>

        <MapComponent
          zoom={1}
          center={{
            lat: currentPosition.latitude,
            lng: currentPosition.longitude,
          }}
          disableDoubleClickZoom
        >
          <MapContext.Consumer>
            {({ google }) => Boolean(google) && (
              <Clusterer>
                {people.map(person => (
                  <Marker
                    key={person.id}
                    position={{
                      lat: person.location.latitude,
                      lng: person.location.longitude,
                    }}
                    title={person.fullName}
                    icon={createAvatarIcon({ url: person.avatar, google })}
                    infoWindow={createInfoWindowContent(person)}
                  />
                ))}
              </Clusterer>
            )}
          </MapContext.Consumer>
        </MapComponent>
    </div>
  )
}


export const Primary = () => {
  return (
    <GoogleMapsWrapper>
      <PrimaryInner />
    </GoogleMapsWrapper>
  )
}