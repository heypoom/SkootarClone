import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMap from 'google-map-react'

import Pin, {pinType} from './MapPin'
import Polyline from './MapPolyline'

import {GMAPS_API_KEY} from '../core'
import {NaturalMap} from '../core/mapstyle'

// Zoomlevel 17 is perfect for nearby locations
// Zoomlevel 10 is for centeral view
const config = {
  bootstrapURLKeys: {
    key: GMAPS_API_KEY
  },
  defaultCenter: [13.7, 100.5],
  defaultZoom: 15,
  options: () => ({
    gestureHandling: 'greedy',
    styles: NaturalMap
  }),
  yesIWantToUseGoogleMapApiInternals: true
}

// This will inject the Google Map Internal APIs into the map.
class Map extends Component {
  state = {}
  onLoad = api => this.setState({api})

  render = () => {
    const {center, pins, polyline, onMarkerClick} = this.props
    const {api} = this.state

    return (
      <GoogleMap center={center} onGoogleApiLoaded={this.onLoad} {...config}>
        {pins &&
          pins.map((props, i) => (
            <Pin
              key={i}
              type={pinType(i, pins.length)}
              onClick={onMarkerClick}
              {...props}
            />
          ))}
        <Polyline path={polyline} {...api} />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  pins: state.app.pins,
  polyline: state.app.polyline,
  center: state.app.center
})

export default connect(mapStateToProps)(Map)
