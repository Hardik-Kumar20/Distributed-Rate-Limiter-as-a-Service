const crypto = require('crypto');
const apiKeyRepository = require("../repositories/api_keys.repositories");

const apiKey = "sk_live_" + crypto.randomBytes(32).toString("hex");

const hash = crypto
            .createHash("sha256")
            .update(apiKey)
            .digest("hex");

await apiKeyRepository.create({
    keyHash: hash,
    applicationId,
    name
});

return res.status(201).json({
    apiKey
})