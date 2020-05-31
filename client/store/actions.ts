import * as api from '../api'
import * as ls from 'local-storage'
import {AuthState} from './reducers'
import {Dispatch} from 'redux'

export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const MONITORS_LIST = 'MONITORS_LIST'
export const MONITORS_ADD = 'MONITORS_ADD'

// export type AuthState = {
//   accessToken: string | null;
//   email: string | null;
//   name: string | null;
// }

export const authLogin = ({
  accessToken,
  email,
  name,
}: AuthState) => (dispatch: Dispatch) => {
  // store accessToken in local storage
  ls.set('login', {
    accessToken,
    email,
    name,
  })
  dispatch({
    type: AUTH_LOGIN,
    payload: {
      accessToken,
      email,
      name,
    },
  })
}

export const authLogout = () => (dispatch: Dispatch) => {
  // remove accessToken in local storage
  ls.remove('login')
  dispatch({
    type: AUTH_LOGOUT,
  })
}

export const listMonitors = () => async (dispatch: Dispatch) => {
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
