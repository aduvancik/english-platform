import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="flex justify-between mx-48 my-8 bg-white rounded-2xl p-24 shadow-lg ">
      <div className="">
        <h1
          className="text-9xl mb-4 font-bold"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          enGo
        </h1>
        <p className="mb-24 w-108">
          Cучасна онлайн-платформа, яка об&apos;єднує викладачів та студентів
          для ефективного вивчення англійської мови.
        </p>
        <p className="text-white ">
          <Link
            to="/register"
            className="bg-emerald-500 rounded-lg px-16 py-4 transition duration-300 ease-in-out hover:bg-emerald-600 shadow-lg shadow-emerald-500/50"
          >
            Зареєструватись
          </Link>
        </p>
      </div>
      <img
        src="/hero-image.jpg"
        alt="group of happy people"
        width="400px"
        className="rounded-full"
      />
    </section>
  );
};

export default HeroSection;
