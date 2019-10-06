import React, { useState, useEffect } from 'react';
// import logo from './vladimir-kudinov-orng-mDXPnk-unsplash.jpg';
import './App.css';
import observationService from './services/observations';
import moment from 'moment'
import loginService from './services/login'
// import { nextTick } from 'q';
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/loginForm'
import ObservationForm from './components/ObservationForm';
import Togglable from './components/Togglable'

const Observation = ({ observation }) => {
  return (
    <div key={observation.id} className="observation-row">
      <span className="observation-name">{observation.name}</span> <span className="observation-scientificname">({observation.scientificName})</span> <span className="observation-time">{moment(observation.datetime).format('HH:MM:SS DD.MM.YYYY')}</span>
      <span className={`observation-rarity observation-rarity--${observation.rarity.split(' ').join('-')}`}>{observation.rarity}</span>
      <div className="observation-note">{observation.note}</div>
      {/*<button onClick={ e => e.preventDefault() & observationService.remove(observation.id) }>Delete</button>*/}
    </div>
  )
}

function App() {

  const [observations, setObservations] = useState([])
  const [newName, setNewName] = useState('')
  const [newRarity, setNewRarity] = useState('common')
  const [newScientificName, setNewScientificName] = useState('')
  const [newNote, setNewNote] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [filterObservations, setFilterObservations] = useState('')
  const [filterObservationsByRarity, setFilterObservationsByRarity] = useState('')


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
      note: newNote,
      rarity: newRarity
    }

    observationService
      .create(observationObject)
      .then(returnedObject => {
        setObservations([returnedObject].concat(observations))
        setNewName('')
        setNewScientificName('')
        setNewRarity('common')
        setNewNote('')
      })
      .catch(returnedObject => {
        setErrorMessage('Error')
      })
  }

  const filterObservation = (observation) => {
    return observation.name.toLowerCase().includes(filterObservations.toLowerCase())
    || observation.scientificName.toLowerCase().includes(filterObservations.toLowerCase())
    || observation.note.toLowerCase().includes(filterObservations.toLowerCase())
  }

  const filterObservationByRarity = (observation) => {
    if(filterObservationsByRarity === '')
      return true

    return observation.rarity === filterObservationsByRarity
  }


  const observationRows = () => observations
  .filter(observation => filterObservation(observation))
  .filter(observation => filterObservationByRarity(observation))
  .map(observation =>
    <Observation
      key={observation.id}
      observation={observation}
    />
  )

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewScientificNameChange = (event) => {
    setNewScientificName(event.target.value)
  }

  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleNewRarityChange = (event) => {
    setNewRarity(event.target.value)
  }
  const handleFilterObservationsChange = (event) => {
    setFilterObservations(event.target.value)
  }
  const handleFilterObservationsByRarityChange = (event) => {
    setFilterObservationsByRarity(event.target.value)
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
  let observationFormProps = {
    onSubmit: addObservation,
    newName,
    handleNewNameChange,
    newRarity,
    handleNewRarityChange,
    newScientificName,
    handleNewScientificNameChange,
    newNote,
    handleNewNoteChange
  }

  return (
    <div>
      <h1>Birdie</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          < Togglable buttonLabel="new observation" ref={observationFormRef} >
            <ObservationForm {...observationFormProps} />
          </Togglable >

        </div>
      }

      <label>Search 
      <input
          value={filterObservations}
          onChange={handleFilterObservationsChange}
        />
      </label>

      <label>Filter
      <select
          value={filterObservationsByRarity}
          onChange={handleFilterObservationsByRarityChange}>
          <option value="">All</option>
          <option value="common">Common</option>
          <option value="rare">Rare</option>
          <option value="extremely rare">Extremely rare</option>
        </select>
      </label>

      <div>
        <h2>Observations</h2>
        <div>{observationRows()}</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
