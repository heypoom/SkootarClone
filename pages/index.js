import React from 'react'
import styled from 'react-emotion'

import App from '../components/App'
import Map from '../components/Map'

const FullView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  background: rgb(229, 227, 223);
`

const pins = [{
  lat: 13.7460577,
  lng: 100.52407889999995
}, {
  lat: 13.8960577,
  lng: 100.52407889999900
}, {
  lat: 13.9460577,
  lng: 100.72407889999995
}]

const Top = styled.div`
  position: fixed;
  top: 1em;
  left: 1.8em;
  z-index: 1;
`

const Input = styled.input`
  background: #ffffff;
  border: none;
  border-bottom: 2px solid #00cae9;
  padding: 0.3em 1em;
  font-size: 1.2em;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  outline: none;
  color: #333;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    border-bottom: 2px solid #9b59b6;
    transform: scale(1.05);
  }
`

const Landing = () => (
  <FullView>
    <Top>
      <Input placeholder='Find Location' />
    </Top>
    <Map pins={pins} />
  </FullView>
)

export default App(Landing)
