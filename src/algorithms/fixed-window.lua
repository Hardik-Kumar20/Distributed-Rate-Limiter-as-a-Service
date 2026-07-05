--[[
KEYS[1] = rate limit key

ARGV[1] = limit
ARGV[2] = window size in ms
ARGV[3] = current timestamp in ms
]]

local key = KEYS[1]

local limit = tonumber(ARGV[1])
local window_size = tonumber(ARGV[2]);
local now = tonumber(ARGV[3])

-- Calculate current window ID
local window_id = math.floor(now / window_size)

-- Create unique Redis key
local window_key = key .. ":" .. window_id

-- Increment request count 
local current_count = redis.call("INCR", window_key)

-- Set expiration only on first request 
if current_count == 1 then 
    redis.call("PEXPIRE", window_key, window_size)
end

--calculate reset time 
local reset_time = (window_id + 1) * window_size

-- Remaining requests
local remaining = limit - current_count 

--Reject request if limit exceeded
if current_count > limit then 
    return  {
        0,
        0,
        reset_time
    }
end

-- Allow request 
return {
    1, 
    remaining,
    reset_time
}