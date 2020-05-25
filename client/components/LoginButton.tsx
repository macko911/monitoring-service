import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Button } from 'grommet'

import { authLogout } from '../store/actions'
import { isLoggedIn } from '../store/selectors'
import { State } from '../store/reducers'

const LoginButton = ({
  dispatch,
  loggedIn,
}) => {
  if (!loggedIn) {
    return (
      <Link href='/login'>
        <Button primary label="Login" />
      </Link>
    )
  }
  return (
    <Button
      label="Logout"
      onClick={() => dispatch(authLogout())}
    />
  )
}

LoginButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  loggedIn: isLoggedIn(state),
})

export default connect(mapStateToProps)(LoginButton)
