-- KEYS[1] = key
-- ARGV[1] = current timestamp (ms)
-- ARGV[2] = window size (ms)
-- ARGV[3] = limit

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

-- remove old requests
redis.call("ZREMRANGEBYSCORE", key, 0, now - window)

--count current requests
local count = redis.call("ZCARD", key)

if count < limit then
    -- add new request
    redis.call("ZADD", key, now, now)

    -- set expiry
    redis.call("PEXPIRE", key, window)

    return {1, limit - count - 1, now + window}
else
    return {0, 0, now + window}
end
