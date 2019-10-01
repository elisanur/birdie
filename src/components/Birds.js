import React from 'react'
import ButtonDetails from './ButtonDetails';


const Birds = ({ birds, setShowBird }) => {

const rows = () => {
  birds.map((bird, i) => {
    return (
      <div key={i}>
       
        {bird.datetime} {bird.name} 
        <ButtonDetails 
        object={bird} 
        handle={setShowBird} />

      </div>

    )

  
  })
}

return (
  <div>
  {rows()}
  </div>
  )
}

export default Birds