import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {css} from 'emotion'
import Ink from 'react-ink'

import Icon from '../components/Icon'

import {toSummary} from '../ducks/app'

const Inline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  position: relative;
  width: 100%;
  height: 2.85em;

  box-shadow: 0px -1px 6px 0 rgba(0, 0, 0, 0.18);
  background: white;
`

// prettier-ignore
const Text = styled.span`
  font-size: 1.3em;
  font-weight: 300;
  color: #555;
  width: 100%;
  text-align: center;

  padding: 0.25em 0.5em;
  background: #fefefe;

  @media screen and (max-width: 600px) {
    font-size: 1.3em;
    padding: 0.2em 0.4em;

    ${props => props.hideSmall && css`display: none;`}
  }
`

const Button = styled.button`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5em 1.7em;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background: #2ecc71;
  color: #fefefe;

  border: none;
  text-decoration: none;
  outline: none;
  cursor: pointer;

  font-size: 1.2em;
  font-weight: 300;
  text-align: center;

  &:hover {
    transform: scale(1.08);
    background: #27ae60;
  }
`

const EnterIcon = styled(Icon)`margin-left: 0.3em;`

const DistanceInfo = ({toSummary, distance, duration}) => (
  <Inline>
    <Text>Total: {distance} KM</Text>
    <Text hideSmall>{duration} MINS</Text>
    <Button onClick={toSummary}>
      <Ink />
      NEXT
      <EnterIcon i='enter' size={1.3} />
    </Button>
  </Inline>
)

const mapStateToProps = state => ({
  distance: state.app.distance,
  duration: state.app.duration
})

export default connect(mapStateToProps, {toSummary})(DistanceInfo)
