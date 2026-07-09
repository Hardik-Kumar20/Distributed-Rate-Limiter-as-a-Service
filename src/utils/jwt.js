const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        jwtSecret,
        {
            expiresIn: "7d",
        }
    );
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    generateToken,
    verifyToken,
};