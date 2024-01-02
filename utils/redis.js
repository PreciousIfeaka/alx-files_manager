import createClient from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
  }

  // checks the status of the connection
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // Returns the redis value of the key passed as arg
  async get(key) {
    await this.client.get(key);
  }

  // Sets a string key with its value and a duration for expiration
  async set(key, value, time) {
    await this.client.set(key, value);
    await this.client.expire(key, time);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
