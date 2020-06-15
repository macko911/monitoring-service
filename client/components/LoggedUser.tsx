import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Box, Button} from 'grommet'

import {State} from '../store/reducers'
import * as selectors from '../store/selectors'

const shortenEmail = (mail: string) => mail.slice(0, mail.indexOf('@'))

const LoggedUser = ({
  user,
  isMonitoring,
}) => {
  const {email, name} = user
  if (!email) {
    return null
  }
  return (
    <Box gap="small" direction="row" align="center">
      {name || shortenEmail(email)}
      {/* TODO: move to settings page */}
      <Button
        label={isMonitoring ? 'Stop monitoring' : 'Start monitoring'}
      />
    </Box>
  )
}

LoggedUser.propTypes = {
  user: PropTypes.object.isRequired,
  isMonitoring: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  user: selectors.getLoggedUser(state),
  isMonitoring: selectors.isMonitoring(state),
})

export default connect(mapStateToProps)(LoggedUser)
