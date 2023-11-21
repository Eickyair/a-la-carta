import { z } from "zod";

export const ActualizarOrdenDetalle = z.object({
  orden_general_id: z.number().nonnegative(),
  productos: z.array(
    z.object({
      alimento_id: z.number().nonnegative(),
      cantidad: z.number().int().nonnegative(),
      subtotal: z.number().nonnegative(),
      nombre: z.string(),
      nuevo: z.boolean().default(false),
    })
  ),
});
export type ActualizarOrdenDetalleType = Omit<
  z.infer<typeof ActualizarOrdenDetalle>,
  "orden_general_id"
>;
