import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {css} from 'emotion'
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

const ServicesLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  margin-bottom: 0.5em;
`

const ExtraContainer = styled.div`margin-bottom: 1em;`

// prettier-ignore
const AddIcon = styled(Icon)`
  margin-left: 0.5em;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  cursor: pointer;

  &:hover {
    fill: #27ae60;
    transform: scale(1.15);
  }
`

const Extras = () => (
  <ExtraContainer>
    <ServicesLabel>
      Extra Services
      <AddIcon i='add_circle' fill='#555' size={1.5} />
    </ServicesLabel>
    <div>
      <Icon i='location' fill='#555' size={1.5} />
      <Icon i='add_location' fill='#555' size={1.5} />
    </div>
  </ExtraContainer>
)

const TextRow = styled.div`
  display: flex;
  align-items: center;

  line-height: 2em;
  font-size: 1.1em;
`

const Left = styled.div`
  flex: 1;
  text-align: left;
`

const Right = styled.div`
  flex: 1;
  text-align: right;
  font-weight: 400;
`

const Summary = ({distance, duration, pricing}) => (
  <div>
    <TextRow>
      <Left>Total Distance</Left>
      <Right>{distance} KM</Right>
    </TextRow>
    <TextRow>
      <Left>Shipping Time</Left>
      <Right>{duration} MINS</Right>
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

const Inline = styled.div`
  display: flex;
  align-items: center;
`

// prettier-ignore
const Button = styled.a`
  position: relative;
  font-size: 1.1em;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.18);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  text-decoration: none;
  width: 100%;
  padding: 0.5em 0.7em;
  margin: 0.5em 0.5em;
  cursor: pointer;
  text-align: center;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  color: #777;
  border: 1px solid #999;

  &:hover {
    transform: scale(1.05);
  }

  ${props => props.primary && css`
    border: none;
    color: #ffffff;
    background: #2ecc71;

    &:hover {
      background: #27ae60;
    }
  `}
`

const Order = () => (
  <Page>
    <Container>
      <Recipients />
      <Extras />
      <EnhancedSummary />
      <Inline>
        <Link href='/' passHref prefetch>
          <Button>
            Back
            <Ink />
          </Button>
        </Link>
        <Button primary>
          Confirm
          <Ink />
        </Button>
      </Inline>
    </Container>
  </Page>
)

export default App(Order)
