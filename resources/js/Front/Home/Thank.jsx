import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Thank extends Component {
  render() {
    return (
      <div className='w-screen h-screen flex justify-center mt-24'>
        <div>
            <h2 className='mb-4 text-center text-2xl'>Thank You!</h2>
            <Link to='/reservation' className='bg-green-500 rounded-lg p-2'>Back to Home Page</Link>
        </div>
      </div>
    )
  }
}

export default Thank
