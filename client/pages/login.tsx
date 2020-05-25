import React from 'react'
import {
  TextInput,
  Button,
  FormField,
  Box,
  Paragraph,
} from 'grommet'

const LoginPage = () => {
  function login () {
    alert('login')
  }
  return (
    <div>
      <Paragraph>
        Login to your account:
      </Paragraph>
      
      <FormField label="Email">
        <TextInput placeholder="Email" />
      </FormField>

      <Box />

      <FormField label="Password">
        <TextInput placeholder="Password" type="password" />
      </FormField>

      <Box />

      <Button primary label="Login" onClick={login} />
    </div>
  )
}

export default LoginPage
