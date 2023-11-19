import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/server/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { SHA256 } from "crypto-js";
const secret = process.env.NEXTAUTH_SECRET;
export const authOptions: NextAuthOptions = {
  jwt: {
    maxAge: 3 * 60 * 60,
  },
  secret,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const cliente = await prisma.cliente.findUnique({
          select: {
            cliente_id: true,
            nombre: true,
          },
          where: { email },
        });
        console.log(
          "🚀 ~ file: [...nextauth].ts:29 ~ authorize ~ cliente:",
          cliente
        );
        if (cliente) {
          return { id:cliente.cliente_id,nombre:cliente.nombre};
        }
        const empleado = await prisma.empleado.findUnique({
          select: { numero_empleado_id: true, nombre: true },
          where: { email },
        });
        console.log(
          "🚀 ~ file: [...nextauth].ts:34 ~ authorize ~ empleado:",
          empleado
        );
        if (empleado) {
          return { id:empleado.numero_empleado_id,nombre:empleado.nombre };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger }) {
      return token;
    },
    session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return (await NextAuth(req, res, authOptions)) as unknown;
}
