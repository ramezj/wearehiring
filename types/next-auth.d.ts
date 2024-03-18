import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string | number; // Adjust the type based on your user ID data type
  }

  interface Session {
    user: User | null;
  }
}