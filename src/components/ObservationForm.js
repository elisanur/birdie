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
      <h2 className="create-observation-title">Create a new observation</h2>
      <form onSubmit={onSubmit}>
      <label>Name*</label>
      <input
          value={newName}
          onChange={handleNewNameChange}/>

      <br />
      <label>Scientific name</label>
      <input
          value={newScientificName}
          onChange={handleNewScientificNameChange}
        />

      <br />
      <label>Rarity</label>
      <select value={newRarity} onChange={handleNewRarityChange}>
        <option value="common">Common</option>
        <option value="rare">Rare</option>
        <option value="extremely rare">Extremely rare</option>
      </select>
     <br />
      <label>Notes<br/>
      <textarea
          value={newNote}
          onChange={handleNewNoteChange}
        />
    </label>
    <br/>
    <button type="submit">Save</button>
    </form>

    </div>
  )
}

export default ObservationForm