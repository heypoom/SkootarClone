import React, {Component} from 'react'
import GoogleMap from 'google-map-react'

import Pin from './MapPin'
import Polyline from './MapPolyline'

import {GMAPS_API_KEY} from '../core'
import {NaturalMap} from '../core/mapstyle'

const config = {
  bootstrapURLKeys: {
    key: GMAPS_API_KEY
  },
  defaultCenter: [13.7460577, 100.52407889999995],
  defaultZoom: 17,
  options: () => ({
    gestureHandling: 'greedy',
    styles: NaturalMap
  }),
  yesIWantToUseGoogleMapApiInternals: true
}

const getPinType = (index, total) => {
  if (index === 0) {
    return 'start'
  } else if (total - 1 === index) {
    return 'end'
  }

  return null
}

class Map extends Component {
  state = {}

  onLoad = api => this.setState(api)

  render = () => {
    const {region, pins, onMarkerClick} = this.props
    const {map, maps} = this.state

    return (
      <GoogleMap center={region} onGoogleApiLoaded={this.onLoad} {...config}>
        {pins && pins.map((props, i) => (
          <Pin
            key={i}
            type={getPinType(i, pins.length)}
            onClick={onMarkerClick}
            {...props}
          />
        ))}
        <Polyline map={map} maps={maps} path={pins} />
      </GoogleMap>
    )
  }
}

export default Map
