import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../../../../img/piotr-szulawski-DCmUhk54F6M-unsplash.jpg'

const myComponentStyle = {
    backgroundImage: `url(${Background})`

 }
const Landing = () => {
  return (
    <div className="container max-w-lg px-4 py-32 mx-auto bg-center bg-no-repeat h-full bg-cover md:max-w-none md:text-center"  style={myComponentStyle}>
        <h1
            className="font-mono text-3xl font-extrabold text-dark  md:text-center sm:leading-none lg:text-5xl">
            <span className="inline md:block">Welcome To newRu Restaurant</span>
        </h1>
        <div className="mx-auto mt-2 text-dark md:text-center lg:text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta voluptatem ab necessitatibus illo
            praesentium
            culpa excepturi quae commodi quaerat,
        </div>
        <div className="flex flex-col items-center mt-12 text-center">
            <span className="relative inline-flex w-full md:w-auto">
                <Link to="/" type="button"
                    className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-6 text-white bg-black rounded-full lg:w-full md:w-auto hover:bg-gray-700 focus:outline-none">
                    Make your Reservation
                </Link>
            </span>
        </div>
    </div>
  )
}

export default Landing
