export const renderSelectedLevels = (formData, englishLevels) => {

    if (formData.role === "student") {
        return formData.languageLevelId.length > 0
            ? Object.keys(englishLevels).find(key => englishLevels[key] === formData.languageLevelId[0])
            : <span className="text-[#A9A9A9]">Обрати рівень</span>;
    } else {
        return formData.languageLevelId.length > 0
            ? formData.languageLevelId.map((level) => (
                <span key={level} className="text-[#A9A9A9] mr-2">
                    {Object.keys(englishLevels).find(key => englishLevels[key] === level)}
                </span>
            ))
            : <span className="text-[#A9A9A9]">Обрати рівень</span>;
    }
};
