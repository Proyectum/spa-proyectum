const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const path = require('path');



app.use(express.static(path.join(__dirname, 'statics')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'statics', 'index.html'));
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});