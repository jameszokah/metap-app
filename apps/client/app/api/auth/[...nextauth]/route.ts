import { authOptions } from "@/auth/authOptions"
import NextAuth from "next-auth"

const handler: () => void = NextAuth(authOptions)

export { handler as GET, handler as POST}


