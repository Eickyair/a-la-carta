import { Login } from "@/components/ui"
import { MainLayoutCliente } from "@/components/ui/usuarios/cliente/MainLayoutCliente"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
export default function Home() {
  const {data:session,status} = useSession()
  const router = useRouter()
  if(status === "authenticated" && session && session.user){
    const {tipo} = session.user
    switch(tipo){
      case "cliente":
        return <MainLayoutCliente>Hola</MainLayoutCliente>
      case "empleado":
        return "Empleado"
    }
  }
  return <Login/>
}
