const express = require('express');
const router = express.Router();
const applicationController = require('../../controllers/application.controller');

router.post("/application", async (req, res) => {
    try{
        const {name, owner_id, plan} = req.body;
        const result = await applicationController.createApplication({name, owner_id, plan});
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
})


router.get("/application", async (req, res) => {
    try {
        const result = await applicationController.findAll();
        res.json(result);
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
})


router.get("/application/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await applicationController.findById(id);
        res.json(result);
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
})



router.delete("/application/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await applicationController.deleteApp(id);
        res.json(result);
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
})

module.exports = router;