import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

import {PRICING_RATE} from '../core'

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

const mapStateToProps = state => ({
  distance: state.app.distance,
  duration: state.app.duration,
  pricing: state.app.pricing || getPricing(state.app.distance)
})

export default connect(mapStateToProps)(Summary)
