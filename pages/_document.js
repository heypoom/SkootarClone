import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import {extractCritical} from 'emotion-server'
import {flush} from 'emotion'

const dev = process.env.NODE_ENV !== 'production'

export default class BaseDocument extends Document {
  // This will extract the critical stylesheets and render the page.
  static getInitialProps({renderPage}) {
    // Flush the styles in development
    if (dev) {
      flush()
    }

    const page = renderPage()
    const styles = extractCritical(page.html)

    return {
      ...page,
      ...styles
    }
  }

  constructor(props) {
    super(props)

    const {__NEXT_DATA__, ids} = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render = () => (
    <html lang='en'>
      <Head>
        <title>Skootar Clone</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <style dangerouslySetInnerHTML={{__html: this.props.css}} />
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400' rel='stylesheet' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  )
}
