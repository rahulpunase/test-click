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
    cannotRemoveSelf: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.CANNOT_REMOVE_SELF);
    },
    cannotRemoveCreator: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.CANNOT_REMOVE_CREATOR);
    },
    cannotModifyCreator: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.CANNOT_MODIFY_CREATOR);
    },
    cannotModifySelf: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.CANNOT_MODIFY_SELF);
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
  Favourite: {
    notFound: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.FAVOURITE_NOT_FOUND);
    },
    alreadyExists: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.ALREADY_FAVOURITED);
    },
  },
  Invitation: {
    notFound: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.INVITATION_NOT_FOUND);
    },
    expired: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.INVITATION_EXPIRED);
    },
    alreadyAccepted: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.INVITATION_ALREADY_ACCEPTED);
    },
    cancelled: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.INVITATION_CANCELLED);
    },
    alreadyMember: (): ConvexErrorType => {
      return throwConvexError(ErrorMessages.ALREADY_A_MEMBER);
    },
  },
};
