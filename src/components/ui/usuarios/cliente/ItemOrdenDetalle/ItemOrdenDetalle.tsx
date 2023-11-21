import { trpc } from "@/utils/trpc";
import { Button } from "primereact/button";
import { FC, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
interface ItemOrdenDetalleProps {
  alimento_id: number;
  cantidad: number;
  subtotal: number;
  nombreAlimento: string;
  orden_general_id: number;
  modificarAlimentoEliminadoId: (alimento_id: number | undefined) => void;
}
export const ItemOrdenDetalle: FC<ItemOrdenDetalleProps> = ({
  cantidad,
  nombreAlimento,
  subtotal,
  orden_general_id,
  alimento_id,
  modificarAlimentoEliminadoId,
}) => {
  const { mutate } =
    trpc.ordenDetalleRouter.eliminarAlimentoDeLaOrden.useMutation();
  const [mostraInputNumero, setMostraInputNumero] = useState(false);
  return (
    <div className="flex justify-between items-center mt-4 shadow-xl border-b-2 px-4 bg-blanco py-2">
      <div className="flex flex-col gap-2">
        <p className="text-xl">
          {nombreAlimento}-{alimento_id}
        </p>
        <div className="flex gap-3 items-center">
          <p>Cantidad:{cantidad}</p>
          <Button
            icon="pi pi-plus"
            outlined
            rounded
            size="small"
            onClick={() => {
              setMostraInputNumero(true);
            }}
          >
            Agregar
          </Button>
          <Button
            icon="pi pi-minus"
            outlined
            rounded
            severity="danger"
            size="small"
            onClick={() => {
              mutate(
                { alimento_id, orden_general_id },
                {
                  onSuccess() {},
                }
              );
            }}
          >
            Quitar
          </Button>
        </div>
        <div>
          <InputNumber size={1} min={1}></InputNumber>
        </div>
      </div>
      <div className="font-nunito text-xl">{subtotal}$</div>
    </div>
  );
};
