export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const authLogin = (accessToken: string) => {
  return {
    type: AUTH_LOGIN,
    payload: {
      accessToken,
    },
  }
}

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  }
}
