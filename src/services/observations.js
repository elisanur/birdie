import axios from 'axios'
const baseUrl = process.env.API_URL || 'http://localhost:3004/api'

const getAll = () => {
  const request = axios.get(baseUrl + '/observations')
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl + '/observations', newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/observations/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }