const express = require('express');
const router = express.Router();

router.get('/readiness', async (req, res) => {
    res.status(200).json({ message : 'OK' });
});

router.get('/liveness', async (req, res) => {
    res.status(200).json({ message : 'OK' });
});

module.exports = router;