import { redis } from "../redis";

export const createConfirmationUrl = async (
  userId: number,
  typeRedis: string,
  token: string
) => {
  await redis.set(typeRedis + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `http://localhost:3000/user/${typeRedis}?token=${token}`;
};
