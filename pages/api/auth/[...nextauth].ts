// pages/api/auth/[...nextauth].ts

import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );

          const user = res.data;
          console.log("Username:: ", user.username);
          if (user.access_token) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          console.error("Login error:");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
});
