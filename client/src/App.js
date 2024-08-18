import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/nav-bar/nav-bar";
import HomePage from "./pages/home/home";
import SignUpPage from "./pages/sign-up/sign-up";
import SignInPage from "./pages/sign-in/sign-in";
import UserProfilePage from "./pages/profile/profile";
import {AuthProvider, useAuth} from "./context/auth-context";


const AppRoutes = () => {
    const {isAuthenticated, checkAuth} = useAuth();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/user-profile" element={<UserProfilePage/>}/>
                </Routes>
            </main>
        </div>
    );
}

const App = () => (
    <Router>
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    </Router>
);

export default App;
