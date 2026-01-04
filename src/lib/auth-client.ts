import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [ 
        usernameClient() 
    ],
    fetchOptions: {
        headers: {
            "x-api-key": import.meta.env.VITE_API_KEY || ""
        }
    }
})