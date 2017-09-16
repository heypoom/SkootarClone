import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'

import Icon from '../components/Icon'
import {inputStyle} from '../components/Find'

// prettier-ignore
const Form = styled.div`
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
    border-bottom: 2px solid #00cae9;
  }

  @media screen and (max-width: 490px) {
    margin: 0.7em 0.5em 0.15em 0.5em;
  }
`

// prettier-ignore
const PinIcon = styled(Icon)`
  margin-right: 1em;
`

const LocationText = styled.div`
  display: flex;
  flex-direction: column;
`

const Recipients = ({pins}) => (
  <div>
    {// prettier-ignore
      pins.map((pin, index) => pin && (
        <Form key={index}>
          <LocationLabel>
            <PinIcon i='location' size={1.6} fill='#555' />
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
        </Form>
      ))}
  </div>
)

const mapStateToProps = state => ({
  pins: state.app.pins
})

export default connect(mapStateToProps)(Recipients)
