import { combineReducers } from 'redux'
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './actions'

type AuthState = {
  accessToken: string | null;
}

const initAuth = {
  accessToken: null,
}

export const auth = (state = initAuth, {type, payload}) => {
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        accessToken: payload.accessToken,
      }

    case AUTH_LOGOUT:
      return {
        ...state,
        accessToken: null,
      }

    default:
      return state
  }
}

export type State = {
  auth: AuthState,
}

export const reducers = combineReducers({
  auth,
})
