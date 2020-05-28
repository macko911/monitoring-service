import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {connect} from 'react-redux'
import {Button} from 'grommet'

import {isLoggedIn} from '../store/selectors'
import {State} from '../store/reducers'

const SignupButton = ({
  loggedIn,
}) => {
  if (loggedIn) {
    return null
  }
  return (
    <Link href="/signup">
      <Button
        primary
        label="Sign Up"
      />
    </Link>
  )
}

SignupButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  loggedIn: isLoggedIn(state),
})

export default connect(mapStateToProps)(SignupButton)
