import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import { Box, Header, Grommet, Heading } from 'grommet'

import Sidebar from './Sidebar'
import LoginButton from './LoginButton'

const Logo = styled(Heading)`
  a {
    color: black;
    text-decoration: none;
  }
`

export const Layout = ({children}) => {
  return (
    <Grommet>
      <Header pad="small">
        <Logo level={2}>
          <Link href='/'>
            <a>
            Digitoo monitoring service
            </a>
          </Link>
        </Logo>
        <LoginButton />
      </Header>
      <Box direction="row" flex="grow">
        <Sidebar />
        <Box pad="small">
          {children}
        </Box>
      </Box>
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
