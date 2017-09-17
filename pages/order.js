import React from 'react'
import styled from 'react-emotion'

import App from '../components/App'
import Recipients from '../components/Recipients'
import Extras from '../components/Extras'
import Summary from '../components/Summary'
import SubmitOrder from '../components/SubmitOrder'

const Page = styled.div`
  background: #fbfbfb;
  color: #333;
  font-family: Roboto, Helvetica Neue;
  font-weight: 300;
  min-height: 100vh;
`

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  margin: 0 auto;
  max-width: 600px;
  padding: 2em 2em 4em 2em;
`

// prettier-ignore
const Flex = styled.div`
  flex: 1;
`

const Order = () => (
  <Page>
    <Container>
      <Flex>
        <Recipients />
      </Flex>
      <Flex>
        <Extras />
      </Flex>
      <Flex>
        <Summary />
      </Flex>
      <SubmitOrder />
    </Container>
  </Page>
)

export default App(Order)
