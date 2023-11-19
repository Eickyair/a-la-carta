import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id:number,
        nombre:string
    }
    interface AdapterUser{
        id:number,
        nombre:string
    }
}