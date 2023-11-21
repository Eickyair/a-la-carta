import { Tag } from "primereact/tag";
import { FC } from "react";

interface OrdenHeaderProps {
  folio: string | null;
  total: number | null;
  estatus: string;
}
export const OrdenHeader: FC<OrdenHeaderProps> = ({
  folio,
  total,
  estatus,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl">Orden</h1>
      <div className="flex justify-between px-3 items-center">
        <p className="flex gap-2">
          <Tag severity={"info"}>{folio}</Tag>
          <Tag>{estatus}</Tag>
        </p>
        <p className="text-2xl font-nunito">Total:{total}$</p>
      </div>
    </div>
  );
};
