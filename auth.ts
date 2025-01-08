import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createUser, getUser } from "./lib/actions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email!);

        if (!existingUser) {
          await createUser(user.name!, user.email!, user.image!);
        }

        return true;
      } catch (error) {
        console.error("Error signing in:", error);
        return false;
      }
    },
  },
});
