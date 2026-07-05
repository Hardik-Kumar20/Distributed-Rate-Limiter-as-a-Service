-- remove expired requests
redis.call("ZREMRANGEBYSCORE", key, 0, now - window)

-- current request count
local count = redis.call("ZCARD", key)

if count < limit then

    -- unique request id
    local request_id = now .. "-" .. math.random()

    -- add request
    redis.call("ZADD", key, now, request_id)

    -- auto cleanup
    redis.call("PEXPIRE", key, window)

    -- get oldest request
    local oldest = redis.call("ZRANGE", key, 0, 0, "WITHSCORES")

    local reset_time = now + window

    if oldest[2] ~= nil then
        reset_time = tonumber(oldest[2]) + window
    end

    return {
        1,
        limit - count - 1,
        reset_time
    }
end

return {
    0,
    0,
    now + window
}