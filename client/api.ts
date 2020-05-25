import axios, { AxiosRequestConfig } from 'axios'
import * as ls from 'local-storage'

const BASE_URL = 'http://localhost:8080'

async function request (params: AxiosRequestConfig) {
  // add accessToken to request if user logged in
  const accessToken = ls.get('accessToken')
  if (accessToken) {
    params.headers = {
      ...params.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return axios({
    baseURL: BASE_URL,
    ...params,
  })
}

export async function login (username: string, password: string) {
  return request({
    url: '/login',
    method: 'post',
    auth: {
      username,
      password,
    },
  })
}

export async function listMonitors () {
  return request({
    url: '/monitor/list',
  })
}

export async function deleteMonitor (id) {
  return request({
    url: '/monitor',
    method: 'delete',
    params: {
      id,
    },
  })
}

export async function saveMonitor (data) {
  return request({
    url: '/monitor',
    method: 'put',
    data,
    params: {
      id: data.id,
    },
  })
}
