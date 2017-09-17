import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

import Icon from './Icon'
import Modal from './Modal'

const ServicesLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  margin-bottom: 0.5em;
`

const ExtraContainer = styled.div`margin-bottom: 0.5em;`

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
    <Modal title='Extra Services' open>
      COD +50 THB Return Trip +100 THB Big Parcel +200 THB
    </Modal>
  </ExtraContainer>
)

export default Extras
