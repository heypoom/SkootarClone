import React from 'react'
import styled from 'react-emotion'

const icons = {
  location: `M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75
             7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5
             2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z`,
  add_location: `M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75
                 7-13c0-3.86-3.14-7-7-7zm4 8h-3v3h-2v-3H8V8h3V5h2v3h3v2z`,
  add_circle: `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z`,
  remove_circle: `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z`,
  back: `M20.016 11.016v1.969h-12.188l5.578 5.625-1.406 1.406-8.016-8.016 8.016-8.016 1.406 1.406-5.578 5.625h12.188z`,
  enter: `M18.984 15l-6 6-1.406-1.406 3.609-3.609h-11.203v-12h2.016v10.031h9.188l-3.609-3.609 1.406-1.406z`
}

const Svg = styled(props => <svg {...props} />)`
  width: ${props => props.size || 1.5}em;
  height: ${props => props.size || 1.5}em;

  min-width: ${props => props.size || 1.5}em;
  min-height: ${props => props.size || 1.5}em;

  fill: ${props => props.fill || '#ffffff'};
  opacity: ${props => props.opacity || 1};
`

const Icon = ({i, ...props}) =>
  icons[i] ? (
    <Svg viewBox='0 0 24 24' {...props}>
      <path d={icons[i]} />
    </Svg>
  ) : (
    <div />
  )

export default Icon
