import React, {FormEvent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {
  TextInput,
  Button,
  FormField,
  Box,
  Paragraph,
} from 'grommet'

import * as api from '../api'
import {authLogin} from '../store/actions'
import {isLoggedIn} from '../store/selectors'
import {State} from '../store/reducers'

const Wrap = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`

const SignupForm = ({
  dispatch,
  loggedIn,
}) => {
  const [email, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isFetching, setFetching] = React.useState(false)
  const [error, setError] = React.useState(null)
  const {push} = useRouter()

  async function signUp () {
    setFetching(true)
    try {
      const res = await api.signUp(email, password)
      dispatch(authLogin({
        email,
        accessToken: res.data.accessToken,
      }))
      setError(null)
      push('/')
    } catch (err) {
      setError('Failed to sign up...')
    }
    setFetching(false)
  }
  function handleEmail (e: FormEvent) {
    setUsername(e.currentTarget.value)
  }
  function handlePassword (e: FormEvent) {
    setPassword(e.currentTarget.value)
  }

  if (loggedIn) {
    push('/')
    return null
  }

  return (
    <Wrap>
      <Paragraph >
        Sign up and enjoy!
      </Paragraph>
      
      <FormField label="Email">
        <TextInput
          placeholder="Email"
          value={email}
          onChange={handleEmail}
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
        disabled={isFetching || (!email || !password)}
        label="Sign Up"
        onClick={signUp}
      />

      {error && (
        <Paragraph color="status-error">
          {error}
        </Paragraph>
      )}
    </Wrap>
  )
}

SignupForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  loggedIn: isLoggedIn(state),
})

export default connect(mapStateToProps)(SignupForm)
