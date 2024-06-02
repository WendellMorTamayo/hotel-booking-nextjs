import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const authOptions: NextAuthOptions = {
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
            },
          );

          const user = res.data;
          console.log("User logged in: ", user.username);

          if (user.access_token) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.id = user.user.id;
        // @ts-ignore
        token.username = user.user.username;
        // @ts-ignore
        token.email = user.user.email;
        // @ts-ignore
        token.firstname = user.user.firstname;
        // @ts-ignore
        token.lastname = user.user.lastname;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 86400
  }
};
