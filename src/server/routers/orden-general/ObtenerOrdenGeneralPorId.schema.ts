import { z } from "zod";

export const ObtenerOrdenGeneralPorId = z.object({
  orden_general_id: z.number().nonnegative(),
});
