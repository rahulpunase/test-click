import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import Google from "@auth/core/providers/google";
import { MutationCtx } from "./_generated/server";
import { findUserByEmail } from "./user/service";
import { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.fullname as string,
    };
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google, CustomPassword],
  // callbacks: {
  //   async createOrUpdateUser(ctx: MutationCtx, args) {
  //     console.log("We are here...");

  //     if (args.existingUserId) {
  //       // Optionally merge updated fields into the existing user object here
  //       return args.existingUserId;
  //     }

  //     if (!args.profile.email) {
  //       throw new Error("Email is required");
  //     }

  //     // Implement your own account linking logic:
  //     const existingUser = await findUserByEmail(ctx, args.profile.email);
  //     if (existingUser) return existingUser._id;

  //     // Implement your own user creation:
  //     return ctx.db.insert("users", {
  //       /* ... */
  //     });
  //   },
  // },
  signIn: {
    maxFailedAttempsPerHour: 6,
  },
});
