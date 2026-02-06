import { ConvexError } from "convex/values";
import { ErrorMessages } from "./constants";
import { throwConvexError } from "./util";

type ConvexErrorType = ConvexError<string>;

export const Errors = {
  Auth: {
    unauthenticated: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.UNAUTHENTICATED);
    },
    unauthorized: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.UNAUTHORIZED);
    },
  },
  User: {
    notFound: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.USER_NOT_FOUND);
    },
  },
  Member: {
    notFound: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.MEMBER_NOT_FOUND);
    },
    notAMember: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.NOT_A_MEMBER);
    },
    permissions: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.NO_PERMISSION);
    },
  },
  Workspace: {
    notFound: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.WORKSPACE_NOT_FOUND);
    },
  },
  Space: {
    notFound: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.SPACE_NOT_FOUND);
    },
  },
};
