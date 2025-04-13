"use client";
import { DarkThemeToggle } from "flowbite-react";
import { AvatarComponent } from "./avatar";
import { useAuth } from "@/app/authContext";

export function NavbarComponent() {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Coding</span>
        </a>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex items-center flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <DarkThemeToggle />
            </li>
            <li>{isLoggedIn ? <AvatarComponent /> : <></>}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
