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
      // prettier-ignore
      const icons = [{
        icon: {
          path: maps.SymbolPath.FORWARD_CLOSED_ARROW
        },
        offset: '100%'
        // repeat: '50%'
      }]

      this.line = new maps.Polyline({...config, icons, path})
      this.line.setMap(map)
    }

    return null
  }
}
