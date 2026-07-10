const express = require('express');

const router = express.Router();

const metricsController = require('../../controllers/metrics.controller');

router.get('/', async (req, res) => {
    try{
        const result = metricsController.getMetrics();

        res.json(result);
    }catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router
