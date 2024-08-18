import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'

function Navbar() {
    return (
        <nav className="navbar bg-base-100 fixed top-0 left-0 w-full z-10">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center">
                    <img src={logo} alt="Logo" className="h-8 mr-2"/>
                    Proyectum
                </Link>
            </div>
            <div className="flex-none">
                <Link to="/sign-in" className="btn btn-primary mr-2">
                    Sign In
                </Link>
                <Link to="/sign-up" className="btn btn-outline">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;