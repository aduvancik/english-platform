import React from "react";

const BenefitsSection = () => {
  return (
    <section className="bg-white rounded-2xl p-8 lg:p-16 shadow-lg my-16">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Навчайся. Викладай. Розвивайся. Разом з enGo!
      </h2>
      <p className="mb-16 text-center text-xl">
        Забудь про складні платформи та обмеження, enGo - це місце, де:
      </p>
      <div className="flex justify-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-24 gap-y-4 mx-auto">
          <li className="flex items-center gap-2 text-lg text-xl">
            <span className="w-5 h-5 border-5 border-emerald-500 rounded-full"></span>
            Студенти знаходять ідеального викладача
          </li>
          <li className="flex items-center gap-2 text-lg text-xl">
            <span className="w-5 h-5 border-5 border-violet-800 rounded-full"></span>
            Викладачі працюють на своїх умовах
          </li>
          <li className="flex items-center gap-2 text-lg text-xl">
            <span className="w-5 h-5 border-5 border-pink-600 rounded-full"></span>
            Гнучкий графік
          </li>
          <li className="flex items-center gap-2 text-lg text-xl">
            <span className="w-5 h-5 border-5 border-amber-300 rounded-full"></span>
            Живі заняття
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BenefitsSection;