const SelectedDays = ({ formData, days }) => {
  if (formData.role === "student") {
      return formData.day.length > 0 ? (
          <>{Object.keys(days).find(key => days[key] === formData.day[0])}</>
      ) : (
          <span className="text-[#A9A9A9]">Обрати рівень</span>
      );
  } else {
      return formData.day.length > 0 ? (
          formData.day.map(day => (
              <span key={day} className="text-[#A9A9A9] mr-2">
                  {Object.keys(days).find(key => days[key] === day)}
              </span>
          ))
      ) : (
          <span className="text-[#A9A9A9]">Обрати дні</span>
      );
  }
};

export default SelectedDays;
