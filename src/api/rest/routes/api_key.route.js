const express = require('express');
const apiKeyController = require('../../controllers/apiKey.controller');
const router = express.Router();

router.post(
    "/applications/:applicationId/apikeys",
    apiKeyController.createApiKey
);

router.get(
    "/applications/:applicationId/apikeys",
    apiKeyController.getApiKey
)

router.delete(
    "/apikeys/:keyId",
    apiKeyController.deleteApiKey
);

module.exports = router;