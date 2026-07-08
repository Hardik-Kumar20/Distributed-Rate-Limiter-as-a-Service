const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken,
};