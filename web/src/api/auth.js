import api, { setToken } from './init'
import { getDecodedToken } from './token'

export function signUp({ name, department, institute, email, password }) {
  return api.post('/auth/signup', { name, department, institute, email, password })
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}

export function signIn({ email, password }) {
  return api.post('/auth/login', { email, password })
      .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
    .catch(res => {
      if (res.response.status === 400 || res.response.status === 401) {
        alert("There was an error with your email or password. Please try again.")
      }
    })
}

export function signOut() {
  setToken(null)
}