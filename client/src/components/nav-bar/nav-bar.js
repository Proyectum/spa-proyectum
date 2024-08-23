import React, { useState, useEffect, useRef } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import axios from 'axios';
import {useAuth} from "../../context/auth-context";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const initials = "JD";
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        try {
            await axios.post('/api/auth/sign-out', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <nav className="navbar bg-base-100 fixed top-0 left-0 w-full z-10">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center">
                    <img src={logo} alt="Logo" className="h-8 mr-2"/>
                    Proyectum
                </Link>
            </div>
            <div className="flex-none">
                {!isAuthenticated ? (
                    <>
                        <Link to="/sign-in" className="btn btn-primary mr-2">
                            Sign In
                        </Link>
                        <Link to="/sign-up" className="btn btn-outline">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                    <div className="flex-none relative">
                        <button className="btn btn-circle bg-primary text-white" ref={buttonRef} onClick={toggleMenu}>
                            {initials}
                        </button>

                        {isMenuOpen && (
                            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 absolute right-0"
                                ref={menuRef}>
                                <li>
                                    <Link to="/user/profile" onClick={closeMenu}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/profile/settings" onClick={closeMenu}>
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleSignOut}>
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;