const axios = require('axios');
const logger = require('../utils/logger')
const configuration = require('../utils/config');

const authBaseUrl = configuration.clients.auth.baseUrl;

exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        logger.info(`Signup user ${username} with email ${email}`);

        const response = await axios.post(`${authBaseUrl}/sign-up`, { username, email, password });

        const { token } = response.data;

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 86400000
        });

        logger.info(`Signup successful`);
        res.status(200).json({ message: 'Sign in successful.' });
    } catch (error) {
        console.error('Sign In Error:', error);
        res.status(error.response.status).json({ message: error.response.data.message });
    }
};

exports.signOut = async (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'Strict', secure: false });
    res.status(200).json({ message: 'Signed out successfully' });
}

exports.signIn = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        logger.info(`Signup user ${identifier}`);

        const response = await axios.post(`${authBaseUrl}/sign-in`, { username: identifier, password });

        const { token } = response.data;

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 86400000
        });

        logger.info(`Signup successful`);
        res.status(200).json({ message: 'Sign in successful.' });
    } catch (error) {
        console.error('Sign In Error:', error.message);
        res.status(401).json({ message: 'Invalid credentials.' });
    }
};