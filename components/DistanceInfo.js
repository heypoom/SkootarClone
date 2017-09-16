import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import Ink from 'react-ink'

import {toSummary} from '../ducks/app'

const Inline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Text = styled.span`
  font-size: 1.5em;
  font-weight: 300;
  color: #555;

  padding: 0.25em 0.5em;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background: #fefefe;

  @media screen and (max-width: 600px) {
    font-size: 1.3em;
    padding: 0.2em 0.4em;
  }
`

const Button = styled.button`
  text-decoration: none;
  position: relative;
  background: #2ecc71;
  color: #fefefe;
  border: none;
  border-radius: 4px;
  padding: 0.4em 1.7em;
  font-size: 1.2em;
  font-weight: 300;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  outline: none;
  cursor: pointer;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 600px) {
    font-size: 1.2em;
    padding: 0.34em 1em;
  }
`

const DistanceInfo = ({toSummary, distance, duration}) => (
  <Inline>
    <Text>Total: {distance}KM</Text>
    <Text>{duration} mins</Text>
    <Button onClick={toSummary}>
      Next
      <Ink />
    </Button>
  </Inline>
)

const mapStateToProps = state => ({
  distance: state.app.distance,
  duration: state.app.duration
})

export default connect(mapStateToProps, {toSummary})(DistanceInfo)
