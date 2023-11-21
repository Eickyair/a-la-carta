import { procedure, router } from "@/server/trpc";
import { ObtenerDetalleCuenta } from "./ObtenerDetalleCuenta.schema";
import { prisma } from "@/server/prisma";
import { ActualizarOrdenDetalle } from "./ActualizarOrdenDetalle.schema";
import { EliminarAlimentoDeLaOrden } from "./EliminarAlmientoDeLaOrden";
const ordenDetalleProcedure = procedure;
export const ordenDetalleRouter = router({
  obtenerElDetalleDeCuenta: ordenDetalleProcedure
    .input(ObtenerDetalleCuenta)
    .query(async ({ input: { orden_general_id } }) => {
      const detalleCuenta = await prisma.orden_detalle.findMany({
        select: {
          alimento_id: true,
          subtotal: true,
          cantidad: true,
          alimento: {
            select: {
              nombre: true,
            },
          },
        },
        where: {
          orden_general_id: { equals: orden_general_id },
        },
      });
      return { detalleCuenta };
    }),
  actualizarOrdenDetalle: ordenDetalleProcedure
    .input(ActualizarOrdenDetalle)
    .mutation(async ({ input: { orden_general_id, productos } }) => {
      const nuevosProductos = productos
        .filter(({ nuevo }) => nuevo === true)
        .map(({ alimento_id, cantidad, subtotal }) => {
          return { alimento_id, cantidad, orden_general_id, subtotal };
        });
      const previosProductos = productos
        .filter(({ nuevo }) => nuevo !== false)
        .map(({ alimento_id, cantidad }) => {
          return { alimento_id, cantidad, orden_general_id };
        });
      const nuevosProductosRes = await prisma.orden_detalle.createMany({
        data: nuevosProductos,
      });
      if (previosProductos.length === 0) {
        return {
          nuevosProductosStatus: true,
          previosProductosStatus: undefined,
        };
      }
      const previosProductosRes = await Promise.all(
        previosProductos.map(
          async ({ alimento_id, orden_general_id, cantidad }) => {
            return await prisma.orden_detalle.update({
              where: {
                orden_general_id_alimento_id: {
                  alimento_id,
                  orden_general_id,
                },
              },
              data: {
                cantidad,
              },
            });
          }
        )
      );
      return { nuevosProductosStatus: true, previosProductosStatus: true };
    }),

  eliminarAlimentoDeLaOrden: ordenDetalleProcedure
    .input(EliminarAlimentoDeLaOrden)
    .mutation(async ({ input: { alimento_id, orden_general_id } }) => {
      const alimentoEliminado = await prisma.orden_detalle.delete({
        where: {
          orden_general_id_alimento_id: {
            alimento_id,
            orden_general_id,
          },
        },
      });
      return { alimentoEliminado };
    }),
});
