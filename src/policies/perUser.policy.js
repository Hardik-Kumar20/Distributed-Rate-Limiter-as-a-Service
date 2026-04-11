module.exports = (req) => {
    const userId = req.headers["x-user-id"];

    if (!userId) {
        throw new Error("User ID is required for per-user rate limiting");
    }

    return {
        identifier: userId,
        type: "user",
    }
}