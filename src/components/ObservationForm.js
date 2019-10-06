import React from 'react'

const ObservationForm = ({ 
  onSubmit, 
  handleNewRarityChange, 
  handleNewNameChange, 
  handleNewScientificNameChange, 
  newName, 
  newRarity, 
  newScientificName,
  handleNewNoteChange,
  newNote 
}) => {
  
    return (
    <div>
      <h2>Create a new observation</h2>
      <form onSubmit={onSubmit}>
      <label>Name
      <input
          value={newName}
          onChange={handleNewNameChange}
        />
      </label>
      <br />
      <label>Scientific name
      <input
          value={newScientificName}
          onChange={handleNewScientificNameChange}
        />
      </label>
      <br />
      <label>Rarity
      </label>
      <select value={newRarity} onChange={handleNewRarityChange}>
        <option value="common">Common</option>
        <option value="rare">Rare</option>
        <option value="extremely rare">Extremely rare</option>
      </select>
     <br />
      <label>Notes
      <textarea
          value={newNote}
          onChange={handleNewNoteChange}
        />
    </label>
      <button type="submit">save</button>
    </form>

    </div>
  )
}

export default ObservationForm