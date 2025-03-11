'use client';

import { HeaderMenu } from "@/constants/menus";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 ${
        scroll ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">My Website</h1>
        <nav>
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
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-600 transition">
              로그인
            </button> 
          </Link>
          </div>
      </nav>
    </div>
    </header>
  );
}

export default Header;