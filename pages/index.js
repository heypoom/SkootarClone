import React from 'react'
import styled from 'react-emotion'

import App from '../components/App'
import Map from '../components/Map'
import FindGroup from '../components/FindGroup'
import Total from '../components/Total'

const FullView = styled.div`
  display: flex;
  flex-direction: column;
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

  @media screen and (max-width: 640px) {
    width: 88%;
  }
`

const Landing = () => (
  <FullView>
    <Top>
      <FindGroup />
    </Top>
    <Map />
    <Total />
  </FullView>
)

export default App(Landing)
