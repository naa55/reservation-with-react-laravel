import { Link } from 'react-router-dom'
import React from 'react'

const Button = ({title, urlname}) => {
  return (
    <div className="flex justify-end m-2 p-2">
    <Link
        to={`${urlname}`}
        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
    >
        {title}
    </Link>
</div>
  )
}

export default Button