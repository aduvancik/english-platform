const SelectedHour = ({ formData, hours }) => {
  return formData.hour.length > 0 ? (
      formData.hour.map(hour => (
          <span key={hour} className="text-[#A9A9A9] mr-2">
              {Object.keys(hours).find(key => hours[key] === hour)}
          </span>
      ))
  ) : (
      <span className="text-[#A9A9A9]">Обрати години</span>
  );
};

export default SelectedHour;
