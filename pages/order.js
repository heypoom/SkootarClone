import React from 'react'
import styled from 'react-emotion'

import App from '../components/App'
import Recipients from '../components/Recipients'
import Icon from '../components/Icon'

const Page = styled.div`
  padding: 2em;
  max-width: 600px;
  margin: 0 auto;
  color: #333;
  font-family: Roboto, Helvetica Neue;
  font-weight: 300;
`

const Extras = () => <div />

const TextRow = styled.div`
  display: flex;
  align-items: center;

  line-height: 2em;
  font-size: 1.25em;
`

const Left = styled.div`
  flex: 1;
  text-align: left;
`

const Right = styled.div`
  flex: 1;
  text-align: right;
`

const Summary = () => (
  <div>
    <TextRow>
      <Left>Total Distance</Left>
      <Right>5.0 KM</Right>
    </TextRow>
    <TextRow>
      <Left>Waiting Time</Left>
      <Right>10 mins</Right>
    </TextRow>
    <TextRow>
      <Left>Shipping Fee</Left>
      <Right>150 THB</Right>
    </TextRow>
  </div>
)

const Order = () => (
  <Page>
    <Recipients />
    <Extras />
    <Summary />
  </Page>
)

export default App(Order)
