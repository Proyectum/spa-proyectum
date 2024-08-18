import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/nav-bar/nav-bar";
import HomePage from "./pages/home/home";
import SignUpPage from "./pages/sign-up/sign-up";
import SignInPage from "./pages/sign-in/sign-in";


function App() {

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/sign-in" element={<SignInPage />}/>
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
