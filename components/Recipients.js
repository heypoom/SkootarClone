import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'

import Icon from '../components/Icon'
import {inputStyle} from '../components/Find'

const Form = styled.form``

const Row = styled.div`
  display: flex;
  align-items: center;
`

const LocationLabel = styled.div``

const Input = styled.input`
  composes: ${inputStyle};
  margin: 1em;
`

const Recipients = ({pins}) => (
  <div>
    {pins.map((pin, index) => (
      <Form>
        <LocationLabel>
          {pin.name}
          <Icon i='location' size={2.5} fill='#555' />
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
