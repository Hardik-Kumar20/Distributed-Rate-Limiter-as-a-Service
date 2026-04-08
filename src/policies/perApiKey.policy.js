module.exports = (req) => {
    const apiKey = req.headers['x-api-key'];

    if(!apiKey){
        throw new Error("API Key is required for per-API key rate limiting");
    }

    return {
        key: `apiKey:${apiKey}`,
    }
}