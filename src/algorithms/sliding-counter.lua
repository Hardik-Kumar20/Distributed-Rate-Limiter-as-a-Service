--[[
KEYS[1] = rate limit key

ARGV[1] = current timestamp (ms)
ARGV[2] = window size (ms)
ARGV[3] = limit
]]

local key = KEYS[1]

local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

-- current window ID
local current_window = math.floor(now / window)

-- fetch stored data
local data = redis.call(
    "HMGET",
    key,
    "current_count",
    "previous_count",
    "last_window"
)

local current_count = tonumber(data[1]) or 0
local previous_count = tonumber(data[2]) or 0
local last_window = tonumber(data[3]) or current_window

-- handle window transition
if current_window > last_window then

    previous_count = current_count
    current_count = 0
    last_window = current_window
end

-- elapsed time inside current window
local elapsed =
    now - (current_window * window)

-- overlap percentage
local overlap =
    1 - (elapsed / window)

-- weighted count
local effective_count =
    current_count +
    (previous_count * overlap)

-- reject request
if effective_count >= limit then

    return {
        0,
        math.max(0, limit - math.floor(effective_count)),
        now + window
    }
end

-- allow request
current_count = current_count + 1

-- store updated state
redis.call(
    "HMSET",
    key,
    "current_count",
    current_count,
    "previous_count",
    previous_count,
    "last_window",
    last_window
)

-- auto cleanup
redis.call("PEXPIRE", key, window * 2)

return {
    1,
    math.max(0, limit - math.floor(effective_count) - 1),
    now + window
}