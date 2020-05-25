import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Box, Heading, Header as GrometHeader } from 'grommet'
import LoginButton from './LoginButton'

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
                Digitoo monitoring service
            </a>
          </Link>
        </Logo>
        <LoginButton />
      </GrometHeader>
      <Box pad="small" />
    </>
  )
}

export default Header
