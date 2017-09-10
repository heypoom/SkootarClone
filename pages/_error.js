import React from 'react'
import Link from 'next/link'
import styled from 'react-emotion'

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: white;

  font-family: Roboto, sans-serif;
  font-weight: 300;
`

const Heading = styled.h2`
  margin: 0 auto;

  color: #666;
  font-weight: 300;
  font-size: 1.9em;
`

const Text = styled.p`
  color: #555;
  font-weight: 300;
  line-height: 1.8em;
  text-align: center;
  font-size: 1.2em;
`

const Anchor = styled.a`

`

const Error = ({statusCode}) => (
  <Page>
    <Heading>How did you get here? Impressive!</Heading>
    <Text>
      I'm not really sure how you got here.
      Would you mind going back, Please?
    </Text>
    <Link href='/'>
      <Anchor>Go Back</Anchor>
    </Link>
  </Page>
)

Error.getInitialProps = ({res, jsonPageRes}) => {
  const statusCode = res ? res.statusCode : (jsonPageRes && jsonPageRes.status)

  return {statusCode}
}

export default Error
