import { z } from "zod";
export const NuevaOrden = z.object({
  estatus: z
    .enum(["REGISTRADA", "EN PROGRESO", "ENTREGADA", "CANCELADA"])
    .optional(),
  cliente_id: z.number().nonnegative(),
  primerProducto: z.object({
    alimento_id: z.number().nonnegative(),
    cantidad: z.number().int().gt(0),
    subtotal:z.number()
  }),
});
