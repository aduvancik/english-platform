import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Лише 4 кроки до вашого ідеального уроку
      </h2>
      <div></div>
      <ul className="flex justify-between gap-4">
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-12 rounded-2xl shadow-lg w-72 text-center">
          <img src="/online-test.png" alt="" />
          <p className="min-h-[48px] flex items-center justify-center">
            Зареєструйтесь
          </p>
        </li>
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-12 rounded-2xl shadow-lg w-72 text-center">
          <img src="/email.png" alt="" />
          <p className="min-h-[48px] flex items-center justify-center">
            Підтвердіть електронну пошту
          </p>
        </li>
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-12 rounded-2xl shadow-lg w-72 text-center">
          <img src="/schedule.png" alt="" />
          <p className="min-h-[48px] flex items-center justify-center">
            Оберіть репетитора
          </p>
        </li>
        <li className="flex flex-col items-center justify-center gap-4 bg-white p-12 rounded-2xl shadow-lg w-72 text-center">
          <img src="/startup.png" alt="" />
          <p className="min-h-[48px] flex items-center justify-center">
            Забронюйте заняття!
          </p>
        </li>
      </ul>

      <div className="text-center text-white">
        <Link
          to="/register"
          className="inline-block mt-8 bg-pink-600 rounded-lg px-12 py-4 transition duration-300 ease-in-out hover:bg-pink-700 shadow-lg shadow-pink-500/50"
        >
          Почати
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;
