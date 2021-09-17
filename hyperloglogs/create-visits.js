
// const redis = require("redis")
const redis = require("ioredis")
const client = redis.createClient()

const getRandomDay = days => days[Math.floor(Math.random() * days.length)]
const getRandomUser = count => 'user_' + Math.floor(1 + Math.random() * count)

const days = ['fri', 'sat', 'sun']
const userCount = 1000
const loginCount = 10000

const setKeys = days.map(day => `set:${day}`)
const hllKeys = days.map(day => `hll:${day}`)

client.del([...setKeys, ...hllKeys])

for (let i = 0; i < loginCount; i++) {
  const day = getRandomDay(days)
  const user = getRandomUser(userCount)
  client.sadd(`set:${day}`, user)
  client.pfadd(`hll:${day}`, user)
}

client.quit()
