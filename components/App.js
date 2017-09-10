import React from 'react'
import {Provider} from 'react-redux'
import {hydrate, injectGlobal} from 'emotion'
import {lifecycle} from 'recompose'

import store from '../ducks'

if (typeof window !== 'undefined') {
  // Hydrates the styles from emotion.
  hydrate(window.__NEXT_DATA__.ids)
}

const enhance = lifecycle({
  componentWillMount() {
    // Global styles belongs here.
    injectGlobal`
      body {
        margin: 0;
        font-family: Roboto, sans-serif;
        font-weight: 300;
      }

      * {
        box-sizing: border-box;
      }
    `
  }
})

// This HoC (Higher-Order Component) allows us to inject Providers into each page.
const App = Component => enhance(props => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
))

export default App
