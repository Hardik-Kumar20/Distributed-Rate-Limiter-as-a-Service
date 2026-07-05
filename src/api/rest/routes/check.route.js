const express = require('express');
const router = express.Router();
const rateLimiterController = require('../../controllers/rateLimiter.controller');

router.post('/check', async (req, res) =>{
    try{
        const {key, plan} = req.body;
        const result = await rateLimiterController.checkRateLimit(key, plan);
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({
        error: err.message
    });
    }
})

module.exports = router;