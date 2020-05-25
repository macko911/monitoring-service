import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Grommet, Heading } from 'grommet'
import Link from 'next/link'

import { Sidebar } from './Sidebar'

const Header = styled(Heading)`
  a {
    color: black;
    text-decoration: none;
  }
`

export const Layout = ({children}) => {
  return (
    <Grommet>
      <Header level={2}>
        <Link href='/'>
          <a>
            Digitoo monitoring service
          </a>
        </Link>
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
