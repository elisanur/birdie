import axios from 'axios'
const baseUrl = process.env.API_URL || 'http://localhost:3004/api'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl + '/observations')
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl + '/observations', newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/observations/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }