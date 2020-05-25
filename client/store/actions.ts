import * as api from '../api'
import * as ls from 'local-storage'

export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const MONITORS_LIST = 'MONITORS_LIST'
export const MONITORS_ADD = 'MONITORS_ADD'

export const authLogin = (accessToken: string) => (dispatch) => {
  // store accessToken in local storage
  ls.set('accessToken', accessToken)
  dispatch({
    type: AUTH_LOGIN,
    payload: {
      accessToken,
    },
  })
}

export const authLogout = () => (dispatch) => {
  // remove accessToken in local storage
  ls.remove('accessToken')
  dispatch({
    type: AUTH_LOGOUT,
  })
}

export const listMonitors = () => async (dispatch) => {
  const res = await api.listMonitors()
  const monitors = res.data
  dispatch({
    type: MONITORS_LIST,
    payload: {
      monitors,
    },
  })
}

export const addMonitor = () => ({
  type: MONITORS_ADD,
})
