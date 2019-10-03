import React, { useState, useEffect } from 'react';
import logo from './vladimir-kudinov-orng-mDXPnk-unsplash.jpg';
import './App.css';
import observationService from './services/observations';

const Observation = ({ observation }) => {
  return (
    <tr>
      <td>{observation.datetime}</td>
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


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Birdie</h1>
      </header>
      <p></p>

      <div>
        <div>{observationRows()}</div>
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
          </label>

          <select value={newRarity} onChange={handeleNewRarityChange}>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="extremely rare">Extremely rare</option>
          </select>


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
