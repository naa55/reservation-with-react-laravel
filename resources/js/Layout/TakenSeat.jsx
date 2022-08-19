import React from 'react'

const TakenSeat = ({title}) => {
  return (
    <div>
        <p className='text-red-500'>Seat on this date {title} is taken</p>
    </div>
  )
}

export default TakenSeat
