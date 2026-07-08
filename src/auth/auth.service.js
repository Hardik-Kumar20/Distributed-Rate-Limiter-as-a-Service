const userRepo = require("../api/repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

module.exports = {
    async register({ email, password }){
        if (!email || !password) {
            throw new BadRequestError("Email and password are required");
        }

        const existingUser = await userRepo.findByEmail(email);
        if (existingUser) {
            throw new ConflictError("User already exists");
        }

        // Hash the password
        const passwordHash = await hashPassword(password);

        // Create the user
        const user = await userRepo.create({ email, password_hash: passwordHash });

        // Generate a JWT token
        const token = generateToken(user);

        return {
            message: "User resgistered successfully",
            token,
            user:{
                id: user.id,
                email: user.email
            }
        };
    },

    async login({ email, password }){
        if(!email || !password){
            throw new BadRequestError("Email and password are required");
        }

        const user = await userRepo.findByEmail(email);
        if(!user){
            throw new UnauthorizedError("Invalid email or password");
        }

        // Compare the password
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if(!isPasswordValid){
            throw new UnauthorizedError("Invalid email or password");
        }

        // Generate a JWT token
        const token = generateToken(user);

        return {
            message: "User logged in successfully",
            token,
            user:{
                id: user.id,
                email: user.email
            },
        };
    },
};