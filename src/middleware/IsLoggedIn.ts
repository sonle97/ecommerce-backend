import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const IsLoggedIn: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  const userId = context.req.session!.userId;

  if (!userId) {
    throw new AuthenticationError("Unauthorired");
  }

  return next();
};

export default IsLoggedIn;
