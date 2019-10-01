import React, { useState, useEffect } from 'react';
import logo from './vladimir-kudinov-orng-mDXPnk-unsplash.jpg';
import './App.css';
import observationService from './services/observations';

/* import Birds from './components/Birds';
import Bird from './components/Bird'
import Button from './components/Button'
import styled, { css } from 'styled-components'
import ButtonDetails from './components/ButtonDetails'
 */

/* const ButtonNew = ({ handleNew }) => {
  console.log('...ButtonNew')
  return (
    <div>
      <Button
        onClick={handleNew}>
        new observation
      </Button>
    </div>
  )
} */

/* const NewObservation = () => {
  console.log('....NewObservation')
  return (
    <div>
      <form>
        <table>
          <tr>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
          </tr>
          <tr>
            <textarea name="note" rows="10" cols="30">
              Observation notes
            </textarea>
          </tr>
          <tr>
            <select>
              <option selected value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="extremely rare">Extremely rare</option>
            </select>
          </tr>
          <tr>
            <input type="submit" value="Submit" />
          </tr>
        </table>
      </form>
    </div>
  )
} */

const Observation = ({ observation }) => {
  return (
    <li>{observation.name}</li>
  )
}

function App() {

  /* const [showBird, setShowBird] = useState(null)
 */
  const [observations, setObservations] = useState([])
  const [newObservation, setNewObservation] = useState([])
  const [newName, setNewName] = useState('')
  const [newRarity, setNewRarity] = useState('')
  const [newScientificName, setNewScientificName] = useState('')

  // fetch all observations from API
  useEffect(() => {
    console.log('effect')
    observationService
      .getAll()
      .then(initialObservations => {
        setObservations(initialObservations)
      })

  }, [])
  console.log('render', observations.length, 'observations')

  const addObservation = event => {
    event.preventDefault()
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
        setNewObservation('')
        setNewName('')
        setNewScientificName('')
        setNewRarity('')
      })
  }

  const observationRows = () => observations.map(observation =>
    <Observation
      key={observation.id}
      observation={observation}
    />
  )

  const handeleNewObservationChange = (event) => {
    setNewObservation(event.target.value)
  }

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


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Birdie</h1>
      </header>
      <p></p>

      <div>
        <ul>{observationRows()}</ul>
        <form onSubmit={addObservation}>
          <label>Name
          <input
              value={newName}
              onChange={handeleNewNameChange}
            />
          </label>
          <br />
          <label>Scientific name
          <input
              value={newScientificName}
              onChange={handeleNewScientificNameChange}
            />
          </label>
          <br />
          <label>Rarity
            {/* <select value={newRarity} onChange={handeleNewRarityChange}>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="extremely rare">Extremely rare</option>
            </select> */}
            <input
              value={newRarity}
              onChange={handeleNewRarityChange}
            />
          </label>


          <button type="submit">save</button>
        </form>
      </div>

      {/*       <ButtonNew
        handleNew={handleNew}
        setShowBird={setShowBird} /> */}

      {/*       {newObservation
        ? <NewObservation />
        :
        !showBird
          ? <Birds birds={birds} setShowBird={setShowBird} />
          : <Bird bird={showBird} />
      } */
      }    </div>
  );
}

export default App;
