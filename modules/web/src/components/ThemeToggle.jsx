import { useState } from 'react';
import PropTypes from 'prop-types';

function RoleToggle({ className, onRoleChange }) {
  const [isTeacher, setIsTeacher] = useState(true);

  const toggleRole = () => {
    const newRole = !isTeacher;
    setIsTeacher(newRole);
    onRoleChange(newRole); // викликаємо функцію, яку передає батьківський компонент
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className="mr-[25px] text-[#5B2BBA] text-[20px]">Вчитель</span>
      <button
        type='button'
        onClick={toggleRole}
        className={`relative inline-flex items-center cursor-pointer w-[92px] h-[34px] p-[5px]  rounded-[54px] ${isTeacher ? "bg-[#5B2BBA]" : "bg-[#E2379D]"}`}
      >
        <span
          className={`absolute w-[26px] h-[26px] bg-white rounded-full transition-transform transform ${isTeacher ? 'translate-x-0' : 'translate-x-[58px]'}`}
        />
      </button>
      <span className="ml-[25px] text-[20px] text-[#E2379D]">Учень</span>
    </div>
  );
}

RoleToggle.propTypes = {
  className: PropTypes.string,
  onRoleChange: PropTypes.func.isRequired, // функція для передачі зміни ролі
};

export default RoleToggle;
