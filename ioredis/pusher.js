const Redis = require("ioredis");
const { exit } = require("process");
const redis = new Redis(); // default server and port etc.

const key = "task:backlog";

// console.log(redis);
// console.log(process.argv);

const addParams = async (params) => {
  console.log("You gave params", params, " (", params.length, ")");
  redis.lpush(key, params);
  redis
    .llen(key)
    .then((l) => console.log("length of the target list is now", l));
};

if (process.argv.length >= 3) {
  const params = process.argv.splice(2);
  addParams(params);
} else {
  console.log("No params!");
}

// Exit after some time
setInterval(() => {
  console.log("exit...");
  exit(0);
}, 5000);
