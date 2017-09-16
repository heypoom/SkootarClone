import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import Link from 'next/link'
import Ink from 'react-ink'

import App from '../components/App'
import Recipients from '../components/Recipients'
import Icon from '../components/Icon'

import {PRICING_RATE} from '../core'

const Page = styled.div`
  background: #fbfbfb;
  color: #333;
  font-family: Roboto, Helvetica Neue;
  font-weight: 300;
  min-height: 100vh;
`

const Container = styled.main`
  padding: 3.8em 2em;
  max-width: 600px;
  margin: 0 auto;
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

const Summary = ({distance, duration, pricing}) => (
  <div>
    <TextRow>
      <Left>Total Distance</Left>
      <Right>{distance} KM</Right>
    </TextRow>
    <TextRow>
      <Left>Shipping Time</Left>
      <Right>{duration} mins</Right>
    </TextRow>
    <TextRow>
      <Left>Shipping Fee</Left>
      <Right>{pricing} THB</Right>
    </TextRow>
  </div>
)

const getPricing = distance => (distance * PRICING_RATE).toFixed(2)

const EnhancedSummary = connect(state => ({
  distance: state.app.distance,
  duration: state.app.duration,
  pricing: state.app.pricing || getPricing(state.app.distance)
}))(Summary)

const Back = styled.a`
  position: fixed;
  left: 0.8em;
  top: 0.8em;

  background: white;
  border-radius: 50%;
  width: 1.8em;
  height: 1.8em;

  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #00cae9;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.1);
  }
`

const Order = () => (
  <Page>
    <Link href='/' passHref>
      <Back>
        <Icon i='back' size={1.8} fill='#555' />
        <Ink />
      </Back>
    </Link>
    <Container>
      <Recipients />
      <Extras />
      <EnhancedSummary />
    </Container>
  </Page>
)

export default App(Order)
