import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Box } from 'rebass'
import Link from 'next/link'

import { Sidebar } from './Sidebar'

const Header = styled.h1`
  padding: 15px;
  a {
    color: black;
    text-decoration: none;
  }
`

const Main = styled(Box)`
  padding: 15px;
`

export const Layout = ({children}) => {
  return (
    <>
      <Header>
        <Link href='/'>
          Digitoo monitoring service
        </Link>
      </Header>
      <Flex>
        <Box>
          <Sidebar />
        </Box>
        <Main>
          {children}
        </Main>
      </Flex>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
