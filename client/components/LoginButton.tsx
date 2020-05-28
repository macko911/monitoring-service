import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Router from 'next/router'
import {connect} from 'react-redux'
import {Button} from 'grommet'

import {authLogout} from '../store/actions'
import {isLoggedIn} from '../store/selectors'
import {State} from '../store/reducers'

const LoginButton = ({
  dispatch,
  loggedIn,
}) => {
  function logout () {
    dispatch(authLogout())
    Router.push('/')
  }
  if (!loggedIn) {
    return (
      <Link href='/login'>
        <Button label="Login" />
      </Link>
    )
  }
  return (
    <Button
      label="Logout"
      onClick={logout}
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
