import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {createSelector} from 'reselect'

import Icon from './Icon'
import Modal from './Modal'

import {SERVICES} from '../core'
import {toggleExtras, toggleExtrasModal} from '../ducks/app'

const ServicesLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  margin-bottom: 0.8em;
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

const services = Object.entries(SERVICES).map(item => ({
  key: item[0],
  ...item[1]
}))

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1em;
`

const CheckIcon = styled(Icon)`
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  cursor: pointer;
  opacity: ${props => (props.checked ? 1 : 0.5)};

  &:hover {
    fill: #27ae60;
    transform: scale(1.15);
    opacity: ${props => (props.checked ? 1 : 0.8)};
  }
`

const Text = styled.div`
  width: 100%;
  margin-left: 0.5em;
  margin-right: 0.8em;
`

const ExtrasIcon = styled(Icon)`
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.16));
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  cursor: pointer;
  margin-right: 1em;
  fill: #555;

  &:hover {
    transform: scale(1.1);
    fill: #2ecc71;
  }
`

const ExtrasModal = ({extras, toggle, open, onClose}) => (
  <Modal title='Extra Services' open={open} onClose={onClose}>
    {services.map(item => (
      <Item key={item.key}>
        <ExtrasIcon i={item.icon} size={1.5} />
        <Text>{item.name}</Text>
        <Text>+{item.cost} THB</Text>
        {extras[item.key]}
        <CheckIcon
          i='check_circle'
          fill='#555'
          checked={extras[item.key]}
          onClick={() => toggle(item.key)}
          size={1.5}
        />
      </Item>
    ))}
  </Modal>
)

const Extras = ({selected, modal, ...props}) => (
  <ExtraContainer>
    <ServicesLabel>
      Extra Services
      <AddIcon i='add_circle' fill='#555' size={1.5} onClick={modal} />
    </ServicesLabel>
    <div>
      {selected.map(item => (
        <ExtrasIcon key={item} i={SERVICES[item].icon} size={2.1} />
      ))}
    </div>
    <ExtrasModal onClose={modal} {...props} />
  </ExtraContainer>
)

// prettier-ignore
export const extrasSelector = createSelector(
  state => state.app.extras,
  extras => Object.entries(extras)
    .filter(item => item[1])
    .map(item => item[0])
)

const mapStateToProps = state => ({
  selected: extrasSelector(state),
  extras: state.app.extras,
  open: state.app.extrasModal
})

export default connect(mapStateToProps, {
  toggle: toggleExtras,
  modal: toggleExtrasModal
})(Extras)
