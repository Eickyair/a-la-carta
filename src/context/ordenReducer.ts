// ordenReducer.ts
type Accion =
  | { type: 'AGREGAR_PRODUCTO'; producto: string }
  | { type: 'ELIMINAR_PRODUCTO'; producto: string };

interface Estado {
  productos: string[];
}

const ordenReducer = (estado: Estado, action: Accion): Estado => {
  switch (action.type) {
    case 'AGREGAR_PRODUCTO':
      return { productos: [...estado.productos, action.producto] };
    case 'ELIMINAR_PRODUCTO':
      return { productos: estado.productos.filter(p => p !== action.producto) };
    default:
      return estado;
  }
};

export default ordenReducer;
