import { trpc } from "@/utils/trpc";
import { ItemOrdenDetalle } from "../ItemOrdenDetalle/ItemOrdenDetalle";
import { useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { OrdenHeader } from "../OrdenHeader";
import { useContext } from "react";
import { OrdenContext, OrdenContextValue } from "@/context/OrdenContext";

export const OrdenDeCompraCliente = () => {
  const { data: session } = useSession();
  const {
    estado: { cantidadesPorProducto: cantidadesPorProductoContexto },
  } = useContext(OrdenContext) as OrdenContextValue;
  const { data: ordenEnCursoRes } =
    trpc.ordenGeneralRouter.obtenerLaOrdenActual.useQuery(
      { cliente_id: session?.user.id || 0 },
      { enabled: !!session }
    );

  if (!ordenEnCursoRes?.ordenActual) return null;
  const {
    ordenActual: { folio, estatus, total, orden_detalle },
  } = ordenEnCursoRes;
  let _total = Number(total);
  cantidadesPorProductoContexto.forEach(({ alimento_id, cantidad }) => {
    const infoDb = orden_detalle.find(
      ({ alimento_id: alimentoIdDB }) => alimentoIdDB === alimento_id
    );
    if (!infoDb) return;
    const { subtotal, cantidad: _cantidad } = infoDb;
    const precio = Number(subtotal) / Number(_cantidad);
    const _subtotal = (Number(_cantidad) + cantidad) * precio;
    _total += _subtotal;
  });
  return (
    <div className="shadow-xl w-[25%] h-fit p-3 mr-16 max-h-[80vh] overflow-y-scroll">
      <div className="flex flex-col gap-4">
        <OrdenHeader folio={folio} total={Number(_total)} estatus={estatus} />
        <Button className="w-full">Ordenar</Button>

        <div className="flex flex-col gap-3">
          {orden_detalle.map(
            ({ alimento_id, cantidad, alimento: { nombre }, subtotal }) => {
              const informacionDelContexto = cantidadesPorProductoContexto.find(
                ({ alimento_id: alimentoIdContexto }) => {
                  return alimentoIdContexto === alimento_id;
                }
              );
              if (informacionDelContexto) {
                const { cantidad: _cantidadContexto } = informacionDelContexto;
                const _cantidad = Number(cantidad) + _cantidadContexto;
                if (_cantidad === 0) return null;
                const precio = Number(subtotal) / Number(cantidad);
                const _subTotal = _cantidad * precio;
                return (
                  <ItemOrdenDetalle
                    key={alimento_id}
                    alimento_id={alimento_id}
                    nombreAlimento={nombre}
                    cantidad={_cantidad}
                    subtotal={_subTotal}
                  />
                );
              }
              return (
                <ItemOrdenDetalle
                  key={alimento_id}
                  alimento_id={alimento_id}
                  nombreAlimento={nombre}
                  cantidad={Number(cantidad)}
                  subtotal={Number(subtotal)}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
