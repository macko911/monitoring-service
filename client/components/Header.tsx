import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {Box, Heading, Header as GrometHeader} from 'grommet'

import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import LoggedUser from './LoggedUser'

const Logo = styled(Heading)`
  margin: 0;
  a {
    color: black;
    text-decoration: none;
  }
`

const Header = () => {
  return (
    <>
      <GrometHeader pad="small">
        <Logo level={2}>
          <Link href='/'>
            <a>
              URL Monitoring
            </a>
          </Link>
        </Logo>
        <Box gap="small" direction="row" align="center">
          <LoggedUser />
          <SignupButton />
          <LoginButton />
        </Box>
      </GrometHeader>
      <Box pad="small" />
    </>
  )
}

export default Header
