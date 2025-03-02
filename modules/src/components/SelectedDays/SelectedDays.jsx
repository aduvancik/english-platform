const SelectedDays = ({ formData, days }) => {
    // console.log(formData, days);
    // console.log(formData.day.map(day => (

    //     Object.keys(days).find(key => days[key] === day)
    // )));

    if (formData.role === "student") {
        return formData.day.length > 0 ? (
            <>{Object.keys(days).find(key => days[key] === formData.day[0])}</>
        ) : (
            <span className="text-[#A9A9A9]">Обрати дні</span>
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
