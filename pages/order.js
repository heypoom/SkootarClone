import React from 'react'
import styled from 'react-emotion'
import {css} from 'emotion'
import Link from 'next/link'
import Ink from 'react-ink'

import App from '../components/App'
import Recipients from '../components/Recipients'
import Extras from '../components/Extras'
import Summary from '../components/Summary'

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

const Actions = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  background: #fbfbfb;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`

// prettier-ignore
const Button = styled.a`
  position: relative;
  font-size: 1.1em;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.18);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  text-decoration: none;
  width: 100%;
  padding: 0.5em 0.7em;
  margin: 0.5em 0.5em;
  cursor: pointer;
  text-align: center;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  color: #777;
  border: 1px solid #999;
  background: white;

  &:hover {
    transform: scale(1.05);
  }

  ${props => props.primary && css`
    border: none;
    color: #ffffff;
    background: #2ecc71;

    &:hover {
      background: #27ae60;
    }
  `}
`

const Back = () => (
  <Actions>
    <Link href='/' passHref prefetch>
      <Button>
        Back
        <Ink />
      </Button>
    </Link>
    <Button primary>
      Confirm
      <Ink />
    </Button>
  </Actions>
)

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
      <Back />
    </Container>
  </Page>
)

export default App(Order)
