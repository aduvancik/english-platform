import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../Logo/Logo";

const Navigation = () => {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-center px-6 lg:px-48 py-6 bg-white shadow-md">
      <Logo />
      <nav>
        <ul className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <li className="text-violet-800 transition duration-300 ease-in-out hover:text-violet-900 text-xl">
            <NavLink to="/login">Увійти</NavLink>
          </li>
          <li className="text-white">
            <NavLink
              to="/register"
              className="bg-violet-800 px-8 py-4 rounded-lg transition duration-300 ease-in-out hover:bg-violet-900 text-xl font-bold"
            >
              Зареєструватись
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;