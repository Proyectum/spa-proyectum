const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const healthRoutes = require('./src/routes/health');
const path = require('path');
const logger = require('./src/utils/logger')
const configuration = require('./src/utils/config')
const {newStorageMiddleware} = require("./src/utils/storage");

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
app.use(newStorageMiddleware)
app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, 'statics')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'statics', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});