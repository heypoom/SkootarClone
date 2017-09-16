import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMap from 'google-map-react'

import Pin, {pinType} from './MapPin'
import Polyline from './MapPolyline'

import {GMAPS_API_KEY} from '../core'
import {NaturalMap} from '../core/mapstyle'

// Zoomlevel 17 is perfect for nearby locations
// Zoomlevel 10 is for regional view
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

// This will inject the Google Map Internal APIs into the map.
class Map extends Component {
  state = {}
  onLoad = api => this.setState(api)

  render = () => {
    const {region, pins, onMarkerClick} = this.props
    const api = this.state

    return (
      <GoogleMap center={region} onGoogleApiLoaded={this.onLoad} {...config}>
        {pins &&
          pins.map((props, i) => (
            <Pin
              key={i}
              type={pinType(i, pins.length)}
              onClick={onMarkerClick}
              {...props}
            />
          ))}
        <Polyline path={pins} {...api} />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  pins: state.app.pins
})

export default connect(mapStateToProps)(Map)
