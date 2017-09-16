import React from 'react'
import styled from 'react-emotion'

import App from '../components/App'
import Map from '../components/Map'
import FindGroup from '../components/FindGroup'
import DistanceInfo from '../components/DistanceInfo'

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

const Top = styled.div`
  position: fixed;
  top: 1em;
  left: 1.8em;
  z-index: 1;

  overflow-y: scroll;
  padding-right: 0.8em;
  bottom: 4em;

  @media screen and (max-width: 640px) {
    width: 88%;
  }
`

const Bottom = styled.div`
  position: fixed;
  bottom: 1.8em;
  left: 0;
  width: 90%;
`

const Landing = () => (
  <FullView>
    <Top>
      <FindGroup />
    </Top>
    <Map />
    <Bottom>
      <DistanceInfo />
    </Bottom>
  </FullView>
)

export default App(Landing)
