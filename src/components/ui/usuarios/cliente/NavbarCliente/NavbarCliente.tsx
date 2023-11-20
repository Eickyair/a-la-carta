import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { useRouter } from "next/router";
interface ButtonInfo {
  icon: string;
  href: string;
  text: string;
}
export const NavbarCliente = () => {
  const router = useRouter();
  const navInfo: ButtonInfo[] = [
    {
      icon: "pi pi-book",
      href: "/",
      text: "Menu",
    },
    { icon: "pi pi-shopping-bag", href: "/compras", text: "Compras" },
    { icon: "pi pi-user", href: "/perfil", text: "Perfil" },
  ];
  return (
    <nav className="flex justify-end p-4 gap-5">
      {navInfo.map(({ href, icon, text }) => (
        <ButtonLink key={href} icon={icon} active={href === router.pathname}>
          <Link href={href}>{text}</Link>
        </ButtonLink>
      ))}
    </nav>
  );
};
