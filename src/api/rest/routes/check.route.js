const express = require('express');
const router = express.Router();
const rateLimiterController = require('../../controllers/rateLimiter.controller');

router.post('/check', async (req, res) =>{
    try{
        const apiKey = req.headers['x-api-key'];
        if(!apiKey){
            return res.status(400).json({
                error: "API key is required"
            });
        }
        const result = await rateLimiterController.checkRateLimit(apiKey);
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({
        error: err.message
    });
    }
})

module.exports = router;