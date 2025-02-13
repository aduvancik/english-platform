import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../Logo/Logo";

const Navigation = () => {
  return (
    <header className="flex justify-between items-center px-48 py-4 bg-white shadow-md ">
      <Logo />
      <nav>
        <ul className="flex items-center gap-12">
          <li className="text-violet-800 transition duration-300 ease-in-out hover:text-violet-900">
            <NavLink to="/login">Увійти</NavLink>
          </li>
          <li className="text-white">
            <NavLink
              to="/register"
              className="bg-violet-800 px-8 py-4 rounded-lg transition duration-300 ease-in-out hover:bg-violet-900"
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
