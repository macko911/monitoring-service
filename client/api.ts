import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:8080'

async function request (params: AxiosRequestConfig) {
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
