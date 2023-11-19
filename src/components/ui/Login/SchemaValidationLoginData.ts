import {z} from "zod"
export const schemaValidationLoginData = z.object({
    email:z.string().email(),
    password:z.string()
})