const { verifyToken } = require("../utils/jwt");

module.exports = function authMiddleware(req, res, next) {

    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                error: "Authorization header missing."
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                error: "Token missing."
            });
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch(err) {
        return res.status(401).json({
            error: "Invalid or expired token."
        })
    }
}