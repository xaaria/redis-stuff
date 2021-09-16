const Redis = require("ioredis");
const { exit } = require("process");
const redis = new Redis(); // default server and port etc.

const key = "task:backlog";

/**
 * Laadi Popper siten, että se lukee listasta (ja samalla poistaa) "vanhimman" arvon (rpop)
 * */

let myInterval;

const popFromList = () => {
  redis
    .brpop(key, 5) // from the end
    .then((val) => {
      if (val !== null) {
        console.log("Popped out item [array name, item]", val);
      } else {
        console.log("Empty after waiting and without any new values, exit");
        clearInterval(myInterval);
        exit(0);
      }
    });
};
myInterval = setInterval(popFromList, 1000);
