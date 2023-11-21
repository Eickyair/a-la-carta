import { z } from "zod";

export const ObtenerDetalleCuenta = z.object({
  orden_general_id:z.number().nonnegative()
})