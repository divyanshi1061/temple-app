import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectToDatabase from "@/lib/db"
import { AdminUser } from "@/lib/models"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();
        
        const user = await AdminUser.findOne({ email: credentials.email });
        if (!user) return null;
        
        const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isPasswordValid) return null;

        return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  session: { strategy: "jwt" }
})
