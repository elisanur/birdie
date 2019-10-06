import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_URL || '/api'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = (order='-1') => {
  const request = axios.get(baseUrl + '/observations?order=' + order)
  
  return request.then(response => {
    // Save observations for offline use
    window.localStorage.setItem('observations', JSON.stringify(response.data))
    return response.data
  }).catch(error => {
    // Return observations from localStorage if we are offline
    return Promise.resolve(JSON.parse(window.localStorage.getItem('observations')))
  })
}

const getAllOfflineObservations = () => {
  let offline = JSON.parse(window.localStorage.getItem('offlineObservations'))
  return Promise.resolve(offline || [])
}

const pushOfflineContent = async () => {
  // Get all offlineObservations from localStorage
  let offlineObservations = JSON.parse(window.localStorage.getItem('offlineObservations')) || []
  window.localStorage.removeItem('offlineObservations')
  // Try to push offlines to db
  await offlineObservations.reduce((promise, observation, key) => promise.then(create(observation)), Promise.resolve())

  console.log('ready')
  return true
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  try {
    let observations = window.localStorage.getItem('observations') || []
    let response = await axios.post(baseUrl + '/observations', newObject, config)
    console.log('Observation logged online')
    window.localStorage.setItem('observations', observations.concat(response.data))
    return {newObject: response.data, offline: false}
  } catch (e) {}

  console.log('Observation will be logged offline')
  let offlineObservations = JSON.parse(window.localStorage.getItem('offlineObservations')) || []
  offlineObservations = offlineObservations.concat(newObject)
  window.localStorage.setItem('offlineObservations', JSON.stringify(offlineObservations))
  return {newObject, offline:true}

}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/observations/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/observations/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, remove, pushOfflineContent, getAllOfflineObservations }