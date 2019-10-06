import axios from 'axios'
const baseUrl = process.env.API_URL || 'http://localhost:3004/api'

const login = async credentials => {
  console.log('logging in...', credentials)
  const response = await axios.post(baseUrl + '/login', credentials)
  return response.data
}

const logout = async () => {
  console.log('logging out...')
  const response = await axios.post(baseUrl + '/logout')
  return response.data
}

const register = async (name, username, password)  => {
  console.log('creating user...')
  const response = await axios.post(baseUrl + '/register')
  return response.data
}

export default { login, logout, register }