--[[
KEYS[1] = rate limit key

ARGV[1] = bucket capacity
ARGV[2] = leak rate (requests per second)
ARGV[3] = current timestamp in ms 
]]

local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local leak_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

--Redis hash fields 
local water_key = key .. ":water"
local last_leak_key = key .. ":last_leak"

--Get current bucket state
local current_water = tonumber(redis.call("GET", water_key)) or 0
local last_leak_time = tonumber(redis.call("GET", last_leak_key)) or now

--Calculate elapsed time 
local elapsed = now - last_leak_time

--Calculate leaked requests
local leaked = (elapsed / 1000) * leak_rate

--Remove leaked water 
current_water = math.max(0, current_water - leaked)

--update leak timestamp 
last_leak_time = now

--Reject if bucket is full
if current_water >= capacity then 
    return {
        0,
        0,
        current_water,
        last_leak_time 
    }
end

-- Add current request to bucket 
curent_water =  current_water + 1

-- Save updated state
redis.call("SET", water_key, current_water)
redis.call("SET", last_leak_key, last_leak_time)

-- Auto cleanup
local ttl = math.ceil((capacity  / leak__rate) * 2)

redis.call("Expire", water_key, ttl)
redis.call("Expire", last_leak_key, ttl)

--Remaining capacity
local remaining = math.floor(capacity - current_water)

--Allow request 
return {
    1,
    remaining,
    current_water,
    last_leak_time
}