const axios = require('axios');

const backendUrl = 'http://localhost:8081/v1/auth';

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Sign Up Request:', { username, email, password });

    res.status(200).json({ message: 'Sign in data received.' });
};

exports.signOut = async (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'Lax', secure: false });
    res.status(200).json({ message: 'Signed out successfully' });
}

exports.signIn = async (req, res) => {
    const { identifier, password } = req.body;
    console.log('Sign In Request:', { identifier, password });
    try {

        const response = await axios.post(`${backendUrl}/sign-in`, { username: identifier, password });

        const { token } = response.data;

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 86400000
        });

        res.status(200).json({ message: 'Sign in successful.' });
    } catch (error) {
        console.error('Sign In Error:', error.message);
        res.status(401).json({ message: 'Invalid credentials.' });
    }
};