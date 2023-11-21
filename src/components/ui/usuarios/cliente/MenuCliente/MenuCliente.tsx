import { FC } from "react";
import { ListaDeAlimentos } from "../ListaDeAlimentos";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { OrdenDeCompraCliente } from "../OrdenDeCompraCliente";
export const MenuCliente: FC = () => {
  const { data: session } = useSession();
  const { data: ordenEnCursoRes } =
    trpc.ordenGeneralRouter.obtenerLaOrdenActual.useQuery(
      { cliente_id: Number(session?.user.id) || 0 },
      { enabled: !!session }
    );
  return (
    <div
      className={`flex w-full p-5 ${
        ordenEnCursoRes?.ordenActual?.orden_general_id ? "justify-between" : ""
      }`}
    >
        <ListaDeAlimentos />
        <OrdenDeCompraCliente />
    </div>
  );
};
