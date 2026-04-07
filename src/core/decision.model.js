// To Enforce consistency across System

function createDecision({
    allowed,
    remaining,
    retryAfter = 0,
    resetTime = 0
}) {
    return {
        allowed,
        remaining,
        retryAfter,
        resetTime
    };
}

module.exports = {
    createDecision
};