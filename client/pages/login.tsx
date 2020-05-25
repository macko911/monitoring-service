import React, { FormEvent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import {
  TextInput,
  Button,
  FormField,
  Box,
  Paragraph,
} from 'grommet'

import * as api from '../api'
import { authLogin, authLogout } from '../store/actions'
import { isLoggedIn } from '../store/selectors'
import { State } from '../store/reducers'

const LoginPage = ({
  dispatch,
  loggedIn,
}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isFetching, setFetching] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { push } = useRouter()

  async function login () {
    setFetching(true)
    try {
      const res = await api.login(username, password)
      dispatch(authLogin(res.data))
      setError(null)
      push('/')
    } catch (err) {
      setError('Failed to login...')
    }
    setFetching(false)
  }
  function handleUsername (e: FormEvent) {
    setUsername(e.currentTarget.value)
  }
  function handlePassword (e: FormEvent) {
    setPassword(e.currentTarget.value)
  }

  if (loggedIn) {
    return (
      <Paragraph>
        You are already logged in...
      </Paragraph>
    )
  }

  return (
    <div>
      <Paragraph >
        Login to your account:
      </Paragraph>
      
      <FormField label="Email">
        <TextInput
          placeholder="Email"
          value={username}
          onChange={handleUsername}
        />
      </FormField>

      <Box />

      <FormField label="Password">
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
      </FormField>

      <Box />

      <Button
        primary
        disabled={isFetching || (!username || !password)}
        label={isFetching ? '...' : 'Login'}
        onClick={login}
      />

      {error && (
        <Paragraph color="status-error">
          {error}
        </Paragraph>
      )}
    </div>
  )
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  loggedIn: isLoggedIn(state),
})

export default connect(mapStateToProps)(LoginPage)
