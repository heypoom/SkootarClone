import React from 'react'
import styled from 'react-emotion'

import icons from '../core/iconmap'

const Svg = styled(props => <svg {...props} />)`
  width: ${props => props.size || 1.5}em;
  height: ${props => props.size || 1.5}em;

  min-width: ${props => props.size || 1.5}em;
  min-height: ${props => props.size || 1.5}em;

  fill: ${props => props.fill || '#ffffff'};
  opacity: ${props => props.opacity || 1};
`

// Renders the SVG using the viewbox and paths from icon map
const Icon = ({i, ...props}) =>
  icons[i] ? (
    <Svg viewBox={icons[i].vb || '0 0 24 24'} {...props}>
      <path d={icons[i].i} />
    </Svg>
  ) : (
    <div />
  )

export default Icon
