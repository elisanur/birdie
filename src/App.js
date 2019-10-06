import React, { useState, useEffect } from 'react';
import logo from './vladimir-kudinov-orng-mDXPnk-unsplash.jpg';
import './App.css';
import observationService from './services/observations';
import moment from 'moment'
import loginService from './services/login'
import { nextTick } from 'q';
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/loginForm'
import ObservationForm from './components/ObservationForm';
import Togglable from './components/Togglable'

const Observation = ({ observation }) => {
  return (
    <tr>
      <td>{moment(observation.datetime).format('HH:MM:SS DD.MM.YYYY')}</td>
      <td>{observation.name}</td>
      <td>{observation.scientificName}</td>
      <td>{observation.rarity}</td>
    </tr>
  )
}

function App() {

  const [observations, setObservations] = useState([])
  const [newName, setNewName] = useState('')
  const [newRarity, setNewRarity] = useState('common')
  const [newScientificName, setNewScientificName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  // fetch all observations from API
  useEffect(() => {
    observationService
      .getAll()
      .then(initialObservations => {
        setObservations(initialObservations)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBirdieUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      observationService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBirdieUser', JSON.stringify(user))

      observationService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const addObservation = event => {
    event.preventDefault()
    observationFormRef.current.toggleVisibility()
    const observationObject = {
      name: newName,
      scientificName: newScientificName,
      rarity: newRarity
    }

    observationService
      .create(observationObject)
      .then(returnedObject => {
        console.log('returned object...', returnedObject)
        setObservations(observations.concat(returnedObject))
        setNewName('')
        setNewScientificName('')
        setNewRarity('common')
      })
  }

  const observationRows = () => observations.map(observation =>
    <table>
      <Observation
        key={observation.id}
        observation={observation}
      />
    </table>
  )

  const handeleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handeleNewScientificNameChange = (event) => {
    setNewScientificName(event.target.value)
  }

  const handeleNewRarityChange = (event) => {
    console.log('event target value', event.target.value)
    setNewRarity(event.target.value)
  }



  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const observationFormRef = React.createRef()


  return (
    <div>
      <h1>Birdie</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          < Togglable buttonLabel="new observation" ref={observationFormRef} >
            <ObservationForm
              onSubmit={addObservation}
              newName={newName}
              newRarity={newRarity}
              newScientificName={newScientificName}
              handleNewNameChange={handeleNewNameChange}
              handleNewScientificNameChange={handeleNewScientificNameChange}
              handleNewRarityChange={handeleNewRarityChange}
            />
          </Togglable >

        </div>
      }



      <div>
        <h2>Observations</h2>
        <div>{observationRows()}</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
