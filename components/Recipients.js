import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import Link from 'next/link'

import Icon from './Icon'
import {pinType, getPinColor} from './MapPin'
import {inputStyle} from './Find'

// prettier-ignore
const Recipient = styled.div`
  margin-bottom: 1em;
`

const Row = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 490px) {
    flex-direction: column;
  }
`

const LocationLabel = styled.div`
  display: flex;
  align-items: center;
  font-family: Roboto, Sukhumvit Set;
  font-size: 1.1em;
  line-height: 1.5em;
`

const AddressLabel = styled.span`
  font-size: 0.75em;
  font-family: Roboto, Sukhumvit Set;
  line-height: 1.7em;
`

const Input = styled.input`
  composes: ${inputStyle};
  margin: 0.7em 0.5em 0.7em 0.5em;
  border-bottom: 2px solid #555;

  &:hover {
    border-bottom: 2px solid #2ecc71;
  }

  @media screen and (max-width: 490px) {
    margin: 0.7em 0.5em 0.15em 0.5em;
  }
`

// prettier-ignore
const PinIcon = styled(Icon)`
  margin-right: 1em;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15));
  stroke: white;
  stroke-width: 1.1;

  &:hover {
    transform: scale(1.1) rotate(360deg);
    fill: ${props => getPinColor(props.type)};
  }
`

const LocationText = styled.div`
  display: flex;
  flex-direction: column;
`

const Notice = styled.div`
  font-size: 1.5em;
  line-height: 1.8em;
  text-align: center;
  margin-top: 3em;
  color: #e74c3c;
`

const Anchor = styled.b`
  cursor: pointer;
  font-weight: 400;
  text-decoration: none;
  color: inherit;
`

// prettier-ignore
const Recipients = ({pins}) => (
  <div>
    {pins.length > 0 ? pins.map((pin, index) => pin && (
      <Recipient key={index}>
        <LocationLabel>
          <PinIcon i='location' size={1.6} fill='#555' type={pinType(index)} />
          <LocationText>
            {pin.name}
            <AddressLabel>
              {pin.address}
            </AddressLabel>
          </LocationText>
        </LocationLabel>
        <Row>
          <Input placeholder='Name' />
          <Input placeholder='Mobile' />
        </Row>
      </Recipient>
    )) : (
      <Notice>
        You haven't added any locations yet! <br />
        Please, <Link href='/' passHref>
          <Anchor>select two or more places</Anchor>
        </Link> before proceeding.
      </Notice>
    )}
  </div>
)

const mapStateToProps = state => ({
  pins: state.app.pins
})

export default connect(mapStateToProps)(Recipients)
