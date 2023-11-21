import { prisma } from "../prisma";
import { procedure, router } from "../trpc";
const alimentoProcedure = procedure;

export const alimentoRouter = router({
  obtenerElMenu: alimentoProcedure.query(async () => {
    const platosDisponibles = await prisma.alimento.findMany({
			select:{
				alimento_id:true,
				descripcion:true,
				nombre:true,
				precio:true,
				categoria_alimento:{
					select:{
						nombre:true
					}
				}
			},
      where: {
        disponible: {
          equals: true,
        },
      },
    });
    return { platosDisponibles };
  }),
});
