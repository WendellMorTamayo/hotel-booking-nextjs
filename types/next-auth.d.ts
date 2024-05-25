import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      userId: number;
      user: {
        email: string;
        favorites: Array[];
        firstname: string;
        hotelRooms: Array[];
        id: number;
        lastname: string;
        password: string;
        role: string;
        username: string;
      };
    } & DefaultSession["user"];
  }

  interface User {
    access_token: string;
    userId: number;
    user: {
      email: string;
      favorites: Array[];
      firstname: string;
      hotelRooms: Array[];
      id: number;
      lastname: string;
      password: string;
      role: string;
      username: string;
    };
  }
}
