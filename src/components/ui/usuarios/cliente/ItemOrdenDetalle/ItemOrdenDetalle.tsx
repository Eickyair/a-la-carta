import { OrdenContext, OrdenContextValue } from "@/context/OrdenContext";
import { Button } from "primereact/button";
import { FC, useContext, useState } from "react";

interface ItemOrdenDetalleProps {
  alimento_id: number;
  cantidad: number;
  subtotal: number;
  nombreAlimento: string;
}
export const ItemOrdenDetalle: FC<ItemOrdenDetalleProps> = ({
  cantidad,
  nombreAlimento,
  subtotal,
  alimento_id,
}) => {
  const { dispatch } = useContext(OrdenContext) as OrdenContextValue;
  return (
    <div className="flex justify-between items-center mt-4 shadow-xl border-b-2 px-4 bg-blanco py-2">
      <div className="flex flex-col gap-2">
        <p className="text-xl">{nombreAlimento}</p>
        <div className="flex gap-3 items-center">
          <p>Cantidad:{cantidad}</p>
          <Button
            icon="pi pi-plus"
            outlined
            rounded
            size="small"
            onClick={() => {
              dispatch({
                type: "AUMENTAR_CANTIDAD_ALIMENTO",
                payload: { alimento_id },
              });
            }}
          ></Button>
          <Button
            icon="pi pi-minus"
            outlined
            rounded
            size="small"
            onClick={() => {
              if (cantidad === 1) {
                return dispatch({type:"ELIMINACION_LOGICA_CTX",payload:{alimento_id}})
              }
              return dispatch({
                type: "DECREMENTAR_CANTIDAD_ALIMENTO",
                payload: { alimento_id },
              });
            }}
          ></Button>
        </div>
      </div>
      <div className="font-nunito text-xl">{subtotal}$</div>
    </div>
  );
};
