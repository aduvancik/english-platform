import React from "react";
import { Link } from "react-router-dom";

const ChooseRoleSection = () => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Обирай свою роль:</h2>
      <ul className="grid grid-rows-2 gap-y-12">
        <li className="justify-self-start flex bg-white rounded-2xl shadow-lg max-w-2xl">
          <div className="w-1/3">
            <img
              src="/student-image.jpg"
              alt="student"
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>
          <div className="w-2/3 p-6 flex flex-col justify-center">
            <h3 className="text-pink-600 text-2xl font-bold mb-4">Учень</h3>
            <p className="text-gray-700 text-lg mb-6">
              Обирай роль Учня, щоб...
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-amber-300">✔</span>
                отримати термінову допомогу
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-300">✔</span>
                підготуватися до тестів та іспитів
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-300">✔</span>
                значно покращити свої знання
              </li>
            </ul>
            <p className="text-white">
              <Link
                to="/register"
                className="inline-block mt-6 bg-pink-600 font-semibold py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Стати Учнем →
              </Link>
            </p>
          </div>
        </li>
        <li className="justify-self-end flex bg-white rounded-2xl shadow-lg max-w-2xl">
          <div className="w-2/3 p-6 flex flex-col justify-center">
            <h3 className="text-violet-800 text-2xl font-bold mb-4">
              Репетитор
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Обирай роль Репетитора, щоб...
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-amber-300">✔</span>
                підтримати і допомогти іншим
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-300">✔</span>
                покращити власні знання
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-300">✔</span>
                заробити грошей і набути цінного досвіду
              </li>
            </ul>
            <p className="text-white">
              <Link
                to="/register"
                className="inline-block mt-6 bg-violet-800 font-semibold py-2 px-4 rounded-lg hover:bg-violet-900 transition duration-300 ease-in-out"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Стати Репетитором →
              </Link>
            </p>
          </div>
          <div className="w-1/3">
            <img
              src="/teacher-image.jpg"
              alt="student"
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default ChooseRoleSection;
