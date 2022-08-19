import React, { Component } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import Footer from "../Front/Home/Footer";
import Navbar from "../Front/Home/Navbar";
export default class Guest extends Component {
    render() {
        return (
            <div className="bg-white shadow-md">
                <Navbar />

                <div className="font-sans text-gray-900 antialiased min-h-screen">
                    <Outlet />
                </div>

                <Footer />
            </div>
        );
    }
}
