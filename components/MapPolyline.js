import {Component} from 'react'

const config = {
  geodesic: true,
  strokeColor: '#555',
  strokeOpacity: 1,
  strokeWeight: 4
}

export default class Polyline extends Component {
  componentWillUpdate() {
    this.line && this.line.setMap(null)
  }

  componentUnmount() {
    this.line && this.line.setMap(null)
  }

  render() {
    const {path, map, maps} = this.props

    if (map && maps && path) {
      this.line = new maps.Polyline({...config, path})
      this.line.setMap(map)
    }

    return null
  }
}
