import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useContext } from "react";
import { OrdenContext, OrdenContextValue } from "@/context/OrdenContext";

export const ListaDeAlimentos = () => {
  const { data: session } = useSession();
  const {
    estado: {
      interaccionesMenu: { alimentoAgregadoDesdeMenu },
    },
    dispatch,
  } = useContext(OrdenContext) as OrdenContextValue;
  const { data: alimentosDelMenuRes, isLoading: cargandoMenu } =
    trpc.alimentoRouter.obtenerElMenu.useQuery();

  const {
    data: ordenEnCursoRes,
    isLoading: estaCargandoOrdenEnCurso,
    refetch: recargarOrdenActual,
  } = trpc.ordenGeneralRouter.obtenerLaOrdenActual.useQuery(
    { cliente_id: session?.user.id || 0 },
    { enabled: !!session }
  );

  const creaUnaNuevaOrdenMutation =
    trpc.ordenGeneralRouter.crearUnaNuevaOrden.useMutation();
  const actualizarOrdenDetalleMutation =
    trpc.ordenDetalleRouter.actualizarOrdenDetalle.useMutation({
      onMutate({ productos }) {
        if (productos.length === 1) {
          const nuevoAlimentoDesdeMenu = productos[0];
          dispatch({
            type: "NUEVO_ALIMENTO_DESDE_MENU",
            payload: {
              alimentoId: nuevoAlimentoDesdeMenu.alimento_id,
              peticionFinalizada: false,
            },
          });
        }
      },
    });

  if (cargandoMenu || !session?.user) return "Cargando...";
  if (alimentosDelMenuRes?.platosDisponibles) {
    let _platosDisponibles;
    if (ordenEnCursoRes?.ordenActual) {
      const {ordenActual} =ordenEnCursoRes
      const alimentoEnLaOrdenEnCurso = new Set<number>()
      ordenActual.orden_detalle.forEach((item) => {
        if(!alimentoEnLaOrdenEnCurso.has(item.alimento_id)){
          alimentoEnLaOrdenEnCurso.add(item.alimento_id)
        }
      })
      const alimentosAgregadosPorElContexto = new Set<number>()
      
      const { ordenActual } = ordenEnCursoRes;
      _platosDisponibles = alimentosDelMenuRes.platosDisponibles.filter(
        ({ alimento_id }) => {
          return !ordenActual.orden_detalle.some(
            ({ alimento_id: alimentoIDEnOrden }) =>
              alimentoIDEnOrden === alimento_id
          );
        }
      );
      _platosDisponibles 
    } else {
      _platosDisponibles = alimentosDelMenuRes.platosDisponibles;
    }

    return (
      <div
        className={`mt-14 h-[80vh] overflow-y-scroll ${
          estaCargandoOrdenEnCurso ? "w-[70%]" : "mx-auto w-3/5"
        }`}
      >
        <ConfirmDialog>Hola</ConfirmDialog>
        <div
          className={`text-5xl sticky z-50 bg-[#fff] rounded-xl p-5 font-nunito`}
          style={{ top: "-1px" }}
        >
          Menu
        </div>
        <main className="flex flex-col gap-10 p-2">
          {_platosDisponibles.map(
            ({
              alimento_id,
              categoria_alimento: { nombre: nombreCategoria },
              descripcion,
              nombre,
              precio,
            }) => {
              return (
                alimentoAgregadoDesdeMenu.alimentoId !== alimento_id && (
                  <div className="shadow-xl p-4 rounded-sm" key={alimento_id}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-roboto">
                          {nombre}-{alimento_id}
                        </h2>
                        <span className="flex items-center gap-5 font-nunito text-md">
                          {precio}$ <Tag>{nombreCategoria}</Tag>
                        </span>
                      </div>
                      <Button
                        outlined
                        icon="pi pi-shopping-cart"
                        onClick={() => {
                          if (!ordenEnCursoRes?.ordenActual?.orden_general_id) {
                            return confirmDialog({
                              message: (
                                <div>
                                  Al agregar <strong>{nombre}</strong> se creara
                                  una orden
                                </div>
                              ),
                              accept() {
                                creaUnaNuevaOrdenMutation.mutate(
                                  {
                                    cliente_id: session.user.id,
                                    primerProducto: {
                                      alimento_id,
                                      cantidad: 1,
                                      subtotal: Number(precio),
                                    },
                                  },
                                  {
                                    onSuccess() {
                                      recargarOrdenActual();
                                    },
                                  }
                                );
                              },
                            });
                          } else {
                            const { orden_general_id } =
                              ordenEnCursoRes.ordenActual;
                            actualizarOrdenDetalleMutation.mutate(
                              {
                                orden_general_id,
                                productos: [
                                  {
                                    alimento_id,
                                    nombre,
                                    cantidad: 1,
                                    subtotal: Number(precio),
                                    nuevo: true,
                                  },
                                ],
                              },
                              {
                                onSuccess() {
                                  recargarOrdenActual();
                                },
                              }
                            );
                          }
                        }}
                      >
                        Agregar
                      </Button>
                    </div>
                    <hr style={{ color: "#c0c0c0" }}></hr>
                    <div className="flex flex-col gap-2 mt-2">
                      <p>
                        <strong className="text-xl">Descripción</strong>
                      </p>
                      <p className="text-lg font-roboto">{descripcion}</p>
                    </div>
                  </div>
                )
              );
            }
          )}
        </main>
      </div>
    );
  }
};
