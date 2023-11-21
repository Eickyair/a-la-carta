// OrdenContexto.tsx
import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import ordenReducer, { Action, Estado } from "./ordenReducer";

interface OrdenContextProviderProps {
  children: ReactNode;
}

export interface OrdenContextValue {
  estado: Estado;
  dispatch: Dispatch<Action>;
}

const estadoInicial: Estado = {
  interaccionesMenu: {
    alimentoAgregadoDesdeMenu: {
      alimentoId: undefined,
      peticionFinalizada: false,
    },
  },
  productosEliminadosDeLaOrden:[],
  productosAgregadosDesdeContex:[],
  cantidadesPorProducto: [],
};

export const OrdenContext = createContext<OrdenContextValue | undefined>(
  undefined
);

export const OrdenContextProvider: React.FC<OrdenContextProviderProps> = ({
  children,
}) => {
  const [estado, dispatch] = useReducer(ordenReducer, estadoInicial);

  const contextValue: OrdenContextValue = {
    estado,
    dispatch,
  };

  return (
    <OrdenContext.Provider value={contextValue}>
      {children}
    </OrdenContext.Provider>
  );
};
