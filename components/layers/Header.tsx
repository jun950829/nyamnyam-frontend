import { HeaderMenu } from "@/constants/menus";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b-2 dark:text-black">

      <Link className="text-2xl" href="/">NYAMNYAM😋</Link>

      <div className="flex items-center space-x-4">
        {HeaderMenu.map((menu) => {
          return (
            <Link
              key={menu.name}
              href={menu.href}
              className="hover:underline transition duration-200"
            >
          {menu.name}
            </Link>
          )
        })}

        <Link href="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            로그인
          </button>
        </Link>

      </div>

    </header>
  );
}

export default Header;