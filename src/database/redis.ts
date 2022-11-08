import Redis from "ioredis";

const redisDB = process.env.REDIS_DB as string;
const client = new Redis(redisDB);

export function getStaticRedisClient(): Redis {
  return client;
}
