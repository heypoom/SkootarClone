import React from 'react'
import styled from 'react-emotion'
import {css} from 'emotion'
import Link from 'next/link'
import Ink from 'react-ink'
import {createSelector} from 'reselect'

import {pricingSelector} from './Summary'
import {extrasSelector} from './Extras'

import store from '../ducks'

const Actions = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  background: #fbfbfb;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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
  background: white;

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

// prettier-ignore
const dataSelector = createSelector(
  state => state.app.pins,
  state => state.app.distance,
  state => state.app.duration,
  state => pricingSelector(state),
  state => extrasSelector(state),
  state => state.app.recipients,
  (a, b, c, d, e, f) => ({
    places: a,
    distance: b,
    time: c,
    cost: d,
    extras: e,
    recipients: f
  })
)

const submit = () => {
  const data = dataSelector(store.getState())

  alert(`The collected data are: ${JSON.stringify(data, null, 2)}`)
  console.info(`The collected data are: ${JSON.stringify(data, null, 2)}`)
}

const SubmitOrder = ({data}) => (
  <Actions>
    <Link href='/' passHref prefetch>
      <Button>
        Back
        <Ink />
      </Button>
    </Link>
    <Button onClick={submit} primary>
      Confirm
      <Ink />
    </Button>
  </Actions>
)

export default SubmitOrder
