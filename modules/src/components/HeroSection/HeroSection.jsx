import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-around w-4/5 mx-auto my-16 bg-white rounded-2xl p-16 shadow-xl">
      {/* Текстовий блок */}
      <div className="text-center lg:text-left max-w-lg">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          enGo
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-1xl leading-relaxed">
          Cучасна онлайн-платформа, яка об&apos;єднує викладачів та студентів
          для ефективного вивчення англійської мови.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-block bg-emerald-500 text-white rounded-lg px-12 py-4 text-xl transition duration-300 ease-in-out hover:bg-emerald-600 shadow-md font-bold"
        >
          Зареєструватись
        </Link>
      </div>

      {/* Зображення */}
      <div className="mt-10 lg:mt-0 flex-shrink-0">
        <img
          src="/hero-image.jpg"
          alt="group of happy people"
          className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] object-cover rounded-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;