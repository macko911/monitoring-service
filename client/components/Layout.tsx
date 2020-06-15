import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Box, Grommet} from 'grommet'
import * as ls from 'local-storage'

import Sidebar from './Sidebar'
import Header from './Header'
import {connect} from 'react-redux'
import {authLogin, checkMonitoringState} from '../store/actions'
import {User} from '../../shared/models'

const StyledGrommet = styled(Grommet)`
  height: 100%;
`

const Layout = ({children, dispatch}) => {
  // check local storage if user has valid auth token
  // TODO: add token expiration on BE and check that token is valid
  React.useEffect(() => {
    const loggedUser = ls.get('login') as User
    if (loggedUser) {
      dispatch(authLogin(loggedUser))
      dispatch(checkMonitoringState())
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
