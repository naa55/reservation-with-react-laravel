import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate  } from "react-router-dom";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [user , setUser] = useState({});
    const [error,setError] = useState('')

    const handleToggle = () => {
        setToggle(!toggle);
    };
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        axios.post('/logout')
            .then(response => navigate('/login'));
    };

    useEffect(() => {
            axios.get('/api/user').then((response) => console.log(response))
      });

    return (
        <nav className=" border-gray-200 px-2 sm:px-4 py-2.5  bg-black">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div href="#" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        <NavLink
                            to="/"
                            className="block py-2 pr-4 pl-3 text-white  rounded md:p-0 hover:text-gray-500"
                            aria-current="page"
                        >
                            newRu
                        </NavLink>
                    </span>
                </div>
                <button
                    onClick={handleToggle}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    {!toggle ? (
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                              fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            width="24px"
                            height="24px"
                            fill="currentColor"
                            className="text-white font-white"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
                            />
                        </svg>
                    )}
                </button>
                <div
                    // className="hidden w-full md:block md:w-auto"
                    // className="hidden w-full md:block md:w-auto"
                    className={`${
                        toggle === false ? "hidden" : ""
                    } w-full md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul className="flex flex-col p-4 mt-4  rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-black">
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Pricing
                            </NavLink>
                        </li>
                        {/* {error === 401 ? <li>
                            <NavLink
                                to="/login"
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Login
                            </NavLink>
                        </li>:} */}
                        <li>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                logOut
                            </button>
                        </li>
                    </ul>
                </div>
                {console.log(error)}
            </div>
        </nav>

    );
};

export default Navbar;
