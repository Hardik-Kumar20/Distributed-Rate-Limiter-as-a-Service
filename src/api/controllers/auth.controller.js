const authService = require("../../auth/auth.service");

module.exports = {
    async register (req, res, next) {
        try {
            const result = await authService.register(req.body);

            return res.status(201).json(result);
        }catch(err){
            next(err);
        }
    },

    async login(req, res, next){
        try{
            const result = await authService.login(req.body);

            return res.status(200).json(result);
        }catch (err){
            next(err);
        }
    }
}