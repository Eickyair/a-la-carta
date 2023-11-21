import { z } from "zod";

export const ObtenerOrdenActual = z.object({
  cliente_id:z.number().nonnegative()
})