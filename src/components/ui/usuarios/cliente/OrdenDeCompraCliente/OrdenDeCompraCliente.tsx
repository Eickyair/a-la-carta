import { trpc } from "@/utils/trpc";
import { ItemOrdenDetalle } from "../ItemOrdenDetalle/ItemOrdenDetalle";
import { useSession } from "next-auth/react";
import { OrdenHeader } from "../OrdenHeader";
import { useState } from "react";
export const OrdenDeCompraCliente = () => {
  const [alimentoEliminadoId, setAlimentoEliminadoId] = useState<
    number | undefined
  >(undefined);
  const modificarAlimentoEliminadoId = (alimento_id: number | undefined) => {
    setAlimentoEliminadoId(alimento_id);
  };
  const { data: session } = useSession();
  const { data: ordenEnCursoRes } =
    trpc.ordenGeneralRouter.obtenerLaOrdenActual.useQuery(
      { cliente_id: session?.user.id || 0 },
      { enabled: !!session }
    );

  if (!ordenEnCursoRes?.ordenActual) return null;
  const {
    ordenActual: { folio, estatus, total, orden_detalle, orden_general_id },
  } = ordenEnCursoRes;
  return (
    <div className="shadow-xl w-[25%] h-fit p-3 mr-16 max-h-[80vh] overflow-y-scroll">
      <div className="flex flex-col gap-4">
        <OrdenHeader folio={folio} total={Number(total)} estatus={estatus} />
        <div className="flex flex-col gap-3">
          {orden_detalle.map(
            ({ alimento_id, cantidad, alimento: { nombre }, subtotal }) => {
              if (alimentoEliminadoId === alimento_id) return <></>;
              return (
                <ItemOrdenDetalle
                  key={alimento_id}
                  modificarAlimentoEliminadoId={modificarAlimentoEliminadoId}
                  orden_general_id={orden_general_id}
                  alimento_id={alimento_id}
                  nombreAlimento={nombre}
                  cantidad={Number(cantidad)}
                  subtotal={Number(subtotal)}
                />
              );
            }
          )}
          dD
        </div>
      </div>
    </div>
  );
};
