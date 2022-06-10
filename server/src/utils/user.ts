import { v4 as uuidv4 } from "uuid";

export const genToken = (ms = 1000 * 60 * 10) => {
  return {
    token: uuidv4(),
    expiredAt: Date.now() + ms,
  };
};
