const crypto = require('crypto');
const apiKeyRepository = require("../repositories/api_keys.repositories");
const applicationRepository = require("../repositories/application.repository.js");


module.exports = {
   async createApiKey(req, res){
        try{
            const {applicationId}  = req.params;
            const {name} = req.body;
            if(!applicationId || !name){
                return res.status(400).json({
                    error: "applicationId and name are required"
                })
            }
            const application = await applicationRepository.findById(applicationId);
            if(!application){
                return res.status(404).json({
                    error: "Application not found"
                })
            }
            const apiKey = "sk_live_" + crypto.randomBytes(32).toString('hex');
            const hash = crypto.createHash('sha256').update(apiKey).digest('hex');

            await apiKeyRepository.create({
                keyHash: hash,
                applicationId,
                name
            });

            res.status(201).json({
                message: "API key created successfully.",
                apiKey,
                applicationId
            });
        }
        catch(err){
            console.error(err);
            res.status(500).json({
                error: err.message
            });
        }
    },

    async getApiKey(req, res){
        try{
            const {applicationId} = req.params;

            const apiKeys = await apiKeyRepository.findByApplication(applicationId);
            if(!apiKeys || apiKeys.length === 0){
                return res.json({
                    message: "No API keys found for this application."
                })
            }
            return res.status(200).json(apiKeys);
        }catch(err){
            console.error(err);
            return res.status(500).json({
                error: err.message
            })
        }
    },

    async deleteApiKey(req, res){
        try{
            const {keyId} = req.params;

            const deletedKey = await apiKeyRepository.delete(keyId);
            if(!deletedKey){
                return res.status(404).json({
                    error: "API key not found"
                });
            }
            return res.status(200).json(deletedKey);
        }catch(err){
            console.error(err);
            return res.status(500).json({
                error: err.message
            })
        }
    }
}
