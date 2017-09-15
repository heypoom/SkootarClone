import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {css} from 'emotion'
import {compose, withProps} from 'recompose'
import PlacesAutocomplete from 'react-places-autocomplete'

import Icon from './Icon'

import {geocode} from '../ducks/app'

const inputStyle = css`
  background: #ffffff;
  border: none;
  border-bottom: 2px solid #00cae9;
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
    border-bottom: 2px solid #9b59b6;
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

  &:hover {
    transform: scale(1.1) rotate(180deg);
  }
`

const Find = ({inputProps, onSelect, geocode, classNames}) => (
  <SearchBox>
    <PinIcon i='location' size={2.2} fill='#00cae9' onClick={geocode} />
    <PlacesAutocomplete
      inputProps={inputProps}
      classNames={classNames}
      googleLogo={false}
      onSelect={onSelect}
      onEnterKeyDown={geocode}
    />
  </SearchBox>
)

const injectProps = props => ({
  // Since react-places-autocomplete does not support emotion/styled-components,
  // we can re-generate the className at runtime, then pass it to PlacesAutocomplete.
  // prettier-ignore
  classNames: {
    root: css`${autocompleteRoot}`,
    input: css`${inputStyle}`,
    autocompleteContainer: css`${autocompleteStyle}`
  },
  inputProps: {
    value: props.value,
    onChange: props.onChange,
    placeholder: 'Find Location'
  },
  onSelect: data => {
    props.onChange(data)
    props.geocode(data)
  }
})

const enhance = compose(connect(null, {geocode}), withProps(injectProps))

export default enhance(Find)
