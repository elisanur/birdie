import React from 'react'

const ButtonDetails = ({ handle, object }) => {
    console.log('...ButtonDetails')
    return (
        <div>
            <button onClick={handle(object)}>
                show details
            </button>
        </div>
    )
}

export default ButtonDetails


