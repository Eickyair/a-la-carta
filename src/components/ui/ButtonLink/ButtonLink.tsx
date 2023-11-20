import { Button } from "primereact/button";
import { ReactNode, FC } from "react";
interface ButtonLinkProps {
  children: ReactNode;
  icon?: string;
  active?: boolean;
}
export const ButtonLink: FC<ButtonLinkProps> = ({ children, icon, active }) => {
  return (
    <Button
      outlined
      pt={{
        root: {
          style: {
            border: "none",
            background: active ? "#ced6f1" : null
          },
        },
      }}
      icon={icon}
    >
      {children}
    </Button>
  );
};
