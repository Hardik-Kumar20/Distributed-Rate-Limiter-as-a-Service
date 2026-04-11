-- KEYS[1] = key
-- ARGV[1] = current timestamp (ms)
-- ARGV[2] = refill rate (tokens per ms)
-- ARGV[3] = capacity

local key = KEYS[1]
local now = tonumber(ARGV[1])
local rate = tonumber(ARGV[2])
local capacity = tonumber(ARGV[3])

-- get stored data
local data = redis.call("HMGET", key, "tokens", "last_refill");

local tokens = tonumber(data[1])
local last = tonumber(data[2])

if tokens == nil then 
    tokens = capacity
    last = now
end

-- refill tokens
local delta = now - last
local refill = delta * rate
tokens =  math.min(capacity, tokens + refill)

local allowed = 0

if tokens >= 1 then 
    allowed = 1
    tokens = tokens - 1
end

-- store updated values 
redis.call("HMSET", key, "tokens", tokens, "last_refill", now)

-- dynamic TTL
redis.call("PEXPIRE", key, math.ceil(capacity / rate))

return {allowed, math.floor(tokens), now}