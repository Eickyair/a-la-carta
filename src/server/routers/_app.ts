import { z } from "zod";
import { router } from "../trpc";
import { alimentoRouter } from "./alimento";
import { ordenGeneralRouter } from "./orden-general/orden_general";
import { ordenDetalleRouter } from "./orden-detalle/orden-detalle";
export const appRouter = router({
  alimentoRouter,
  ordenGeneralRouter,
  ordenDetalleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
