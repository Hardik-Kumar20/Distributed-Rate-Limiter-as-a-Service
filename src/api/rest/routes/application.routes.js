const express = require('express');
const router = express.Router();
const applicationController = require('../../controllers/application.controller');
const authMiddleware = require("../../../auth/auth.middleware");

router.post("/application", authMiddleware, async (req, res) => {
    try{
        const {name, plan} = req.body;
        const owner_id = req.user.id;
        const result = await applicationController.createApplication({name, owner_id, plan});
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
})


router.get("/application", authMiddleware, async (req, res) => {
    try {
        const result = await applicationController.findAll(req.user.id);
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



router.delete("/application/:id", authMiddleware, async (req, res) => {
    try {
        const {id} = req.params;
        const result = await applicationController.deleteApp(id, req.user.id);
        res.json(result);
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
})

module.exports = router;