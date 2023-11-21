export type Action =
  | {
      type: "NUEVO_ALIMENTO_DESDE_MENU";
      payload: { alimentoId: number; peticionFinalizada: boolean };
    }
  | { type: "AUMENTAR_CANTIDAD_ALIMENTO"; payload: { alimento_id: number } }
  | {
      type: "DECREMENTAR_CANTIDAD_ALIMENTO";
      payload: { alimento_id: number; eliminado?: boolean };
    }
  | { type: "ELIMINACION_LOGICA_CTX"; payload: { alimento_id: number } };

export interface Estado {
  productosEnLaOrden:{alimento_id:number}[]
  cantidadesPorProducto: { alimento_id: number; cantidad: number }[];
}

export const ordenReducer = (estado: Estado, action: Action): Estado => {
  switch (action.type) {
    case "NUEVO_ALIMENTO_DESDE_MENU": {
      return {
        ...estado,
        interaccionesMenu: {
          alimentoAgregadoDesdeMenu: action.payload,
        },
      };
    }
    case "AUMENTAR_CANTIDAD_ALIMENTO": {
      const { payload } = action;
      const valorEnELContexto = estado.cantidadesPorProducto.find(
        ({ alimento_id: alimentoIdContexto }) =>
          alimentoIdContexto === payload.alimento_id
      );
      if (!valorEnELContexto) {
        return {
          ...estado,
          cantidadesPorProducto: [
            ...estado.cantidadesPorProducto,
            { alimento_id: payload.alimento_id, cantidad: 1 },
          ],
        };
      }
      return {
        ...estado,
        cantidadesPorProducto: estado.cantidadesPorProducto.map((item) => {
          if (item.alimento_id === payload.alimento_id) {
            return { ...item, cantidad: item.cantidad + 1 };
          }
          return item;
        }),
      };
    }
    case "DECREMENTAR_CANTIDAD_ALIMENTO": {
      const { payload } = action;
      const newState = {
        ...estado,
        cantidadesPorProducto: estado.cantidadesPorProducto.map((item) => {
          if (item.alimento_id === payload.alimento_id) {
            return {
              ...item,
              cantidad: item.cantidad - 1,
            };
          }
          return item;
        }),
      };
      console.log(
        "🚀 ~ file: ordenReducer.ts:60 ~ ordenReducer ~ newState:",
        newState
      );
      return newState;
    }
    case "ELIMINACION_LOGICA_CTX":{
      const {alimento_id} = action.payload
      const eliminadoDeProductosAgregados = estado.productosAgregadosDesdeContex.filter(({alimento_id:id}) => id!==alimento_id)
      const agregandoAEliminados = [...estado.productosEliminadosDeLaOrden,{alimento_id}]
      const actualizanCantidades = estado.cantidadesPorProducto.map(({alimento_id:id,cantidad})=>{
        if(id===alimento_id){
          return {alimento_id,cantidad:0}
        }
        return {alimento_id,cantidad}
      })
      const newState = {...estado,productosAgregadosDesdeContex:eliminadoDeProductosAgregados,productosEliminadosDeLaOrden:agregandoAEliminados,cantidadesPorProducto:actualizanCantidades}
      return newState
    }
    default:
      return estado;
  }
};

export default ordenReducer;
