const axios = require('axios');
const logger = require('../utils/logger')
const {signIn, signUp} = require("../services/auth");

exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const token = await signUp(username, email, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 86400000
        });

        res.status(200).json({ message: 'Sign up successful.' });
    } catch (error) {
        console.error('Sign Up Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.signOut = async (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'Strict', secure: false });
    res.status(200).json({ message: 'Signed out successfully' });
}

exports.signIn = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const token = await signIn(identifier, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 86400000
        });

        res.status(200).json({ message: 'Sign in successful.' });
    } catch (error) {
        console.error('Sign In Error:', error.message);
        res.status(401).json({ message: 'Invalid credentials.' });
    }
};