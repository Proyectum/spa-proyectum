const axios = require('axios');

const backendUrl = 'http://localhost:8081/v1/auth';

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const response = await axios.post(`${backendUrl}/sign-up`, { username, email, password });

        const { token } = response.data;

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 86400000
        });

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
    const { identifier, password } = req.body;
    try {

        const response = await axios.post(`${backendUrl}/sign-in`, { username: identifier, password });

        const { token } = response.data;

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