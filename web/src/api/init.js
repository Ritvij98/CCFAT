import axios from 'axios'
import { rememberToken, getValidToken } from './token'

const baseURL = 'http://localhost:3002/'

const api = axios.create({
  baseURL
})

export function setToken(token) {

  rememberToken(token)
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}


setToken(getValidToken())

export default api;