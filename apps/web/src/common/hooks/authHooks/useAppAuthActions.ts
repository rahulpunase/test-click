import { useAuthActions } from "@repo/backend";

const redirectUrl = "/auth/callback";

export const useAppAuthActions = () => {
  const { signIn, signOut: signOutFromApp } = useAuthActions();

  const signUpWithGoogle = () => {
    return signIn("google", {
      redirectTo: redirectUrl,
    });
  };

  const signInWithGoogle = () => {
    return signIn("google", {
      redirectTo: redirectUrl,
    });
  };

  const signInWithPassword = (email: string, password: string) => {
    return signIn("password", {
      email,
      password,
      redirectTo: redirectUrl,
      flow: "signIn",
    });
  };

  const signUpWithPassword = ({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    return signIn("password", {
      email,
      password,
      fullName,
      redirectTo: redirectUrl,
      flow: "signUp",
    });
  };

  const signOut = () => {
    signOutFromApp();
  };

  return {
    signUpWithGoogle,
    signInWithGoogle,
    signInWithPassword,
    signUpWithPassword,
    signOut,
  };
};
