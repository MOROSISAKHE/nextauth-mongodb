import mongodbAuth from "@/lib/mongodbAuth";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await mongodbAuth();
          const user = await User.findOne({ email }).lean();

          if (!user) {
            throw new Error("No user found with this email");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Incorrect password");
          }

          return { email: user.email, name: user.name, role: user.role };
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        return true;
      }

      if (account.provider === "github") {
        await mongodbAuth();
        try {
          const existingUser = await User.findOne({ email: user.email }).lean();
          if (existingUser) {
            return true;
          }
          return false;
        } catch (error) {
          console.error("Sign-in error:", error.message);
          return false;
        }
      }

      return false;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
