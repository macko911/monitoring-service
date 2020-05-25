import React, { FormEvent } from 'react'
import {
  TextInput,
  Button,
  FormField,
  Box,
  Paragraph,
} from 'grommet'
import * as api from '../api'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isFetching, setFetching] = React.useState(false)
  const [accessToken, setAccessToken] = React.useState(null)
  const [error, setError] = React.useState(null)
  const { push } = useRouter()

  console.log({accessToken})
  async function login () {
    setFetching(true)
    try {
      const res = await api.login(username, password)
      setAccessToken(res.data)
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

export default LoginPage
