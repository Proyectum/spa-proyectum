const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/test', (req, res) => {
    res.cookie('testCookie', 'This is a test cookie');
    res.json({ message: 'Cookie set!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});