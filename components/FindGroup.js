import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

import Icon from './Icon'
import Find from './Find'

import {search, newPlace} from '../ducks/app'

const AddIcon = styled(Icon)`
  position: absolute;
  right: 0;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.16));
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  cursor: pointer;
  background: white;
  border-radius: 50%;

  &:hover {
    transform: scale(1.1) rotate(180deg);
  }
`

const FindGroup = ({search, fields, newPlace}) => (
  <div>
    {fields.map((value, index) => (
      <Find
        onChange={text => search(text, index)}
        index={index}
        value={value}
        key={index}
      />
    ))}

    <AddIcon i='add_circle' size={2} fill='#2ecc71' onClick={newPlace} />
  </div>
)

const mapStateToProps = (state, props) => ({
  fields: state.app.search
})

export default connect(mapStateToProps, {search, newPlace})(FindGroup)
