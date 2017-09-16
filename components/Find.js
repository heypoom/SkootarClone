import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {css} from 'emotion'
import {compose, withProps} from 'recompose'
import PlacesAutocomplete from 'react-places-autocomplete'

import Icon from './Icon'
import {pinType, getPinColor} from './MapPin'

import {setLocation, removePin} from '../ducks/app'

export const inputStyle = css`
  background: #ffffff;
  border: none;
  border-bottom: 2px solid #555;
  padding: 0.3em 1em;
  font-size: 1.2em;
  font-family: Roboto, Sukhumvit Set, sans-serif;
  font-weight: 300;
  outline: none;
  color: #333;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  width: 100%;

  &:hover {
    transform: scale(1.05);
  }
`

const autocompleteStyle = css`
  position: absolute;
  left: 0;
  z-index: 1;
  font-family: Roboto, Sukhumvit Set, sans-serif;
  border: none;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const autocompleteRoot = css`
  position: relative;
  padding-bottom: 0px;
  width: 100%;
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;

  position: relative;
  margin-bottom: 1em;
`

const PinIcon = styled(Icon)`
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.16));
  stroke: white;
  stroke-width: 1.3;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  cursor: pointer;
  margin-right: 1em;
  fill: #555;

  &:hover {
    transform: scale(1.1) rotate(360deg);
    fill: ${props => getPinColor(props.type)};
  }
`

const RemoveIcon = styled(Icon)`
  position: absolute;
  right: 0.4em;
  top: 0.3em;

  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.16));
  stroke: white;
  stroke-width: 1.3;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    fill: #e74c3c;
  }
`

// We can turn off the places attribution because it's used on Google Maps.
// Ref: https://developers.google.com/places/web-service/policies#logo_requirements
// prettier-ignore
const Find = ({inputProps, onSelect, submit, classNames, remove, index, total}) => (
  <SearchBox>
    <PinIcon i='location' size={2.5} onClick={submit} type={pinType(index, total)} />
    <PlacesAutocomplete
      inputProps={inputProps}
      classNames={classNames}
      googleLogo={false}
      onSelect={onSelect}
      onEnterKeyDown={submit}
    />
    {
      (index > 0 && total > 2) && (
        <RemoveIcon
          i='remove_circle'
          size={1.75}
          fill='#555'
          onClick={remove}
        />
      )}
  </SearchBox>
)

export const placeholder = (index, total) => {
  if (index === 0) {
    return 'Find Starting Location'
  } else if (total - 1 === index) {
    return 'Find Destination'
  }

  return 'Find Location'
}

// prettier-ignore
const injectProps = props => ({
  // Since react-places-autocomplete does not support emotion/styled-components,
  // we can re-generate the className at runtime, then pass it to PlacesAutocomplete.
  classNames: {
    root: css`${autocompleteRoot}`,
    input: css`
      composes: ${inputStyle};
      border-bottom: 2px solid #555;

      &:hover {
        border-bottom: 2px solid ${getPinColor(pinType(props.index, props.total))};
      }
    `,
    autocompleteContainer: css`${autocompleteStyle}`
  },
  inputProps: {
    value: props.value,
    onChange: props.onChange,
    placeholder: placeholder(props.index, props.total)
  },
  submit: address => {
    props.setLocation(props.index, address)
  },
  remove: () => {
    props.removePin(props.index)
  },
  onSelect: address => {
    props.onChange(address)
    props.setLocation(props.index, address)
  }
})

const enhance = compose(
  connect(null, {setLocation, removePin}),
  withProps(injectProps)
)

export default enhance(Find)
