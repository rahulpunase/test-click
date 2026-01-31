import { useAuthActions } from "@repo/backend";

const redirectUrl = "/auth/callback";

export const useAppAuthActions = () => {
  const { signIn, signOut: signOutFromApp } = useAuthActions();

  const signUpWithGoogle = () => {
    signIn("google", {
      redirectTo: redirectUrl,
    });
  };

  const signInWithGoogle = () => {
    signIn("google", {
      redirectTo: redirectUrl,
    });
  };

  const signInWithPassword = (email: string, password: string) => {
    signIn("password", {
      email,
      password,
      redirectTo: redirectUrl,
    });
  };

  const signOut = () => {
    signOutFromApp();
  };

  return {
    signUpWithGoogle,
    signInWithGoogle,
    signInWithPassword,
    signOut,
  };
};
