import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <section className="max-w-7xl mx-auto py-4">
      <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
        Лише 4 кроки до вашого ідеального уроку
      </h2>
      <ul className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 py-6">
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-8 lg:p-12 rounded-2xl shadow-lg w-full lg:w-72 text-center">
          <img
            src="/online-test.png"
            alt=""
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
          />
          <p className="min-h-[48px] flex items-center justify-center text-lg lg:text-xl">
            Зареєструйтесь
          </p>
        </li>
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-8 lg:p-12 rounded-2xl shadow-lg w-full lg:w-72 text-center">
          <img
            src="/email.png"
            alt=""
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
          />
          <p className="min-h-[48px] flex items-center justify-center text-lg lg:text-xl">
            Підтвердіть електронну пошту
          </p>
        </li>
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-8 lg:p-12 rounded-2xl shadow-lg w-full lg:w-72 text-center">
          <img
            src="/schedule.png"
            alt=""
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
          />
          <p className="min-h-[48px] flex items-center justify-center text-lg lg:text-xl">
            Оберіть репетитора
          </p>
        </li>
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-8 lg:p-12 rounded-2xl shadow-lg w-full lg:w-72 text-center">
          <img
            src="/startup.png"
            alt=""
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
          />
          <p className="min-h-[48px] flex items-center justify-center text-lg lg:text-xl">
            Забронюйте заняття!
          </p>
        </li>
      </ul>

      <div className="text-center text-white">
        <Link
          to="/register"
          className="inline-block mt-8 bg-pink-600 rounded-lg px-12 py-4 transition duration-300 ease-in-out hover:bg-pink-700 shadow-lg shadow-pink-500/50 text-xl font-bold"
        >
          Почати
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;