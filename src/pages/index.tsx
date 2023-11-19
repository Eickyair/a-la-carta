import { Login } from "@/components/ui"
import { useSession } from "next-auth/react"
export default function Home() {
  const {data:session,status} = useSession()
  return (
    <main>
      <Login/>
      {status === "authenticated" && <span>{JSON.stringify(session)}</span>}
    </main>
  )
}
