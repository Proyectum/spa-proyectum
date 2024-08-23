const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const path = require('path');
const logger = require('./utils/logger')
const configuration = require('./utils/config')

const app = express();

const port = configuration.server.port || 8000

app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: configuration.server.cors.origin,
    credentials: configuration.server.cors.credentials
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, 'statics')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'statics', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});