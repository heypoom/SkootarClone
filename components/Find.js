import React from 'react'
import {connect} from 'react-redux'
import {css} from 'emotion'
import {compose, withProps} from 'recompose'
import PlacesAutocomplete from 'react-places-autocomplete'

import {geocode, search} from '../ducks/app'

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
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    border-bottom: 2px solid #9b59b6;
    transform: scale(1.05);
  }
`

const autocompleteStyle = css`
  font-family: Roboto, Sukhumvit Set, sans-serif;
  border: none;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
`

const mapStateToProps = state => ({
  value: state.app.search
})

const Find = ({value, search: onChange, geocode, classNames}) => {
  const inputProps = {
    value,
    onChange,
    placeholder: 'Find Location'
  }

  return (
    <PlacesAutocomplete
      inputProps={inputProps}
      classNames={classNames}
      googleLogo={false}
      onSelect={geocode}
      onEnterKeyDown={geocode}
    />
  )
}

// Since react-places-autocomplete does not support emotion/styled-components,
// we can re-generate the className at runtime, then pass it to PlacesAutocomplete.
const enhance = compose(
  withProps(() => ({
    classNames: {
      input: css`${inputStyle}`,
      autocompleteContainer: css`${autocompleteStyle}`
    }
  })),
  connect(mapStateToProps, {search, geocode})
)

export default enhance(Find)
