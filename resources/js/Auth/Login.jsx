import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setError] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios
            .post("/login", { email , password },
            { xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
            withCredentials: true})
            .then((response) => navigate("/"))
            .catch((error) => {
                setError(Object.entries(error.response.data.errors));
            });
        });
    };
    return (
        <div className="w-full md:mx-auto  sm:max-w-md mt-12 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {errors.length > 0 && (
                <div>
                    <div className="font-medium text-red-600">
                        Whoops! Something went wrong.
                    </div>
                    <ul class="mt-3 mb-4 list-disc list-inside text-sm text-red-600">
                        {errors.map((error, index) => {
                            return <li key={index}>{error[1][0]}</li>;
                        })}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="email"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        autoFocus
                    />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
                    >
                        Log in
                    </button>
                </div>
                <div className="">
                    Don't have an account
                    <Link
                        to="/register"
                        className="flex items-center px-3 py-2 bg-blue-600 rounded"
                    >
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
}
