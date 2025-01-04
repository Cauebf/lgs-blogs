import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findFirst({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image!,
            },
          });
        }
        return true; 
      } catch (error) {
        console.error("Error signing in:", error);
        return false; 
      }
    },
  },
});
