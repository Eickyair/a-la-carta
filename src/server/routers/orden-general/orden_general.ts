import { prisma } from "@/server/prisma";
import { procedure, router } from "../../trpc";
import { NuevaOrden } from "./NuevaOrden.schema";
import { ObtenerOrdenActual } from "./ObtenerOrdenActual.schema";
import { ObtenerOrdenGeneralPorId } from "./ObtenerOrdenGeneralPorId.schema";

const ordenGeneralProcedure = procedure;
export const ordenGeneralRouter = router({
  crearUnaNuevaOrden: ordenGeneralProcedure.input(NuevaOrden).mutation(
    async ({
      input: {
        cliente_id,
        primerProducto: { alimento_id, cantidad, subtotal },
      },
    }) => {
      const nuevaOrden = await prisma.orden_general.create({
        data: {
          cliente_id,
          total: 0,
        },
      });
      await prisma.orden_detalle.create({
        data: {
          cantidad,
          alimento_id,
          subtotal,
          orden_general_id: nuevaOrden.orden_general_id,
        },
      });
      return { nuevaOrden };
    }
  ),
  obtenerLaOrdenActual: ordenGeneralProcedure
    .input(ObtenerOrdenActual)
    .query(async ({ input: { cliente_id } }) => {
      const ordenActual = await prisma.orden_general.findFirst({
        include: {
          orden_detalle: {
            include: {
              alimento: {
                select: {
                  nombre: true,
                },
              },
            },
          },
        },
        where: { cliente_id },
        orderBy: { fecha: "desc" },
      });
      return { ordenActual };
    }),
  obtenerOrdenGeneralPorId: ordenGeneralProcedure
    .input(ObtenerOrdenGeneralPorId)
    .query(async ({ input: { orden_general_id } }) => {
      const ordenGeneral = await prisma.orden_general.findUnique({
        where: { orden_general_id },
      });
      return { ordenGeneral };
    }),
});
