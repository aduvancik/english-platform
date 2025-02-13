import { sequelize } from "../db/index.js";
import { Student } from "./student.js";
import { Teacher } from "./teacher.js";
import { TimeSlot } from "./timeSlot.js";
import { LanguageLevel } from "./languageLevel.js";
import { StudyGroup } from "./studyGroup.js";
import { Teacher_LanguageLevel } from "./teacher_languageLevel.js";
import { Teacher_TimeSlot } from "./teacher_timeSlot.js";
import { StudyGroup_TimeSlot } from "./studyGroup_timeSlot.js";
import { Student_TimeSlot } from "./student_timeSlot.js";

Teacher.belongsToMany(LanguageLevel, { through: Teacher_LanguageLevel });
LanguageLevel.belongsToMany(Teacher, { through: Teacher_LanguageLevel });

LanguageLevel.hasMany(StudyGroup, {
    foreignKey: {
        allowNull: false,
    },
});
StudyGroup.belongsTo(LanguageLevel);

Teacher.hasMany(StudyGroup, {
    foreignKey: {
        allowNull: false,
    },
});
StudyGroup.belongsTo(Teacher);

LanguageLevel.hasMany(Student, {
    foreignKey: {
        allowNull: false,
    },
});
Student.belongsTo(LanguageLevel);

StudyGroup.hasMany(Student, {
    foreignKey: {
        allowNull: false,
    },
});
Student.belongsTo(StudyGroup);

Teacher.belongsToMany(TimeSlot, { through: Teacher_TimeSlot });
TimeSlot.belongsToMany(Teacher, { through: Teacher_TimeSlot });

StudyGroup.belongsToMany(TimeSlot, { through: StudyGroup_TimeSlot });
TimeSlot.belongsToMany(StudyGroup, { through: StudyGroup_TimeSlot });

Student.belongsToMany(TimeSlot, { through: Student_TimeSlot });
TimeSlot.belongsToMany(Student, { through: Student_TimeSlot });

export {
    sequelize, Student, Teacher, TimeSlot, LanguageLevel, StudyGroup,
    Teacher_LanguageLevel, Teacher_TimeSlot, StudyGroup_TimeSlot, Student_TimeSlot,
};
