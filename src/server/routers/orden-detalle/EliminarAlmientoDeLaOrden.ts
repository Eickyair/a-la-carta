import { z } from "zod";

export const EliminarAlimentoDeLaOrden = z.object({
  orden_general_id: z.number(),
  alimento_id: z.number(),
});
