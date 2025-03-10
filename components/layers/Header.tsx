import { HeaderMenu } from "@/constants/menus";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white dark:text-black">
      <h1 className="text-2xl">Header</h1>

      <div className="flex items-center space-x-4">
        {HeaderMenu.map((menu) => {
          return (
            <Link key={menu.name} href={menu.href}>{menu.name}</Link>
          )
        })}
      </div>

    </header>
  );
}

export default Header;