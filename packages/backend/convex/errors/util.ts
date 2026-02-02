import { ConvexError } from "convex/values";

export const throwConvexError = (message: string): ConvexError<string> => {
  return new ConvexError(message);
};
