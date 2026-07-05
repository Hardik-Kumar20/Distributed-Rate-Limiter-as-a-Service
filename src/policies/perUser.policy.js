module.exports = {
    free: {
        algorithm: "token-bucket",
        capacity: 20,
        refillRate: 0.02,
    },

    premium: {
        algorithm: "token-bucket",
        capacity: 100,
        refillRate: 0.1,
    }
}