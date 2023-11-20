import { FC,ReactNode } from "react"
import { NavbarCliente } from "../NavbarCliente"
interface MainLayoutClienteProps {
  children: ReactNode
}
export const MainLayoutCliente:FC<MainLayoutClienteProps> = ({children}) => {
  return (
    <div>
      <NavbarCliente/>
    </div>
  )
}