import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Grommet } from 'grommet'
import * as ls from 'local-storage'

import Sidebar from './Sidebar'
import Header from './Header'
import { connect } from 'react-redux'
import { authLogin } from '../store/actions'

const StyledGrommet = styled(Grommet)`
  height: 100%;
`

const Layout = ({children, dispatch}) => {
  React.useEffect(() => {
    const accessToken = ls.get('accessToken') as string
    if (accessToken) {
      dispatch(authLogin(accessToken))
    }
  }, [])
  return (
    <StyledGrommet>
      <Header />
      <Box direction="row" flex="grow">
        <Sidebar />
        <Box pad="small" flex="grow">
          {children}
        </Box>
      </Box>
    </StyledGrommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Layout)
