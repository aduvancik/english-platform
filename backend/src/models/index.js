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

Teacher.belongsToMany(LanguageLevel, {
    through: Teacher_LanguageLevel,
    foreignKey: "teacherId",
    otherKey: "languageLevelId",
});
LanguageLevel.belongsToMany(Teacher, {
    through: Teacher_LanguageLevel,
    foreignKey: "languageLevelId",
    otherKey: "teacherId",
});

LanguageLevel.hasMany(StudyGroup, { foreignKey: "languageLevelId" });
StudyGroup.belongsTo(LanguageLevel, { foreignKey: "languageLevelId" });

Teacher.hasMany(StudyGroup, { foreignKey: "teacherId" });
StudyGroup.belongsTo(Teacher, { foreignKey: "teacherId" });

LanguageLevel.hasMany(Student, { foreignKey: "languageLevelId" });
Student.belongsTo(LanguageLevel, { foreignKey: "languageLevelId" });

StudyGroup.hasMany(Student, { foreignKey: "studyGroupId" });
Student.belongsTo(StudyGroup, { foreignKey: "studyGroupId" });

Teacher.belongsToMany(TimeSlot, {
    through: Teacher_TimeSlot,
    foreignKey: "teacherId",
    otherKey: "timeSlotId",
});
TimeSlot.belongsToMany(Teacher, {
    through: Teacher_TimeSlot,
    foreignKey: "timeSlotId",
    otherKey: "teacherId",
});

StudyGroup.belongsToMany(TimeSlot, {
    through: StudyGroup_TimeSlot,
    foreignKey: "studyGroupId",
    otherKey: "timeSlotId",
});
TimeSlot.belongsToMany(StudyGroup, {
    through: StudyGroup_TimeSlot,
    foreignKey: "timeSlotId",
    otherKey: "studyGroupId",
});

Student.belongsToMany(TimeSlot, {
    through: Student_TimeSlot,
    foreignKey: "studentId",
    otherKey: "timeSlotId",
});
TimeSlot.belongsToMany(Student, {
    through: Student_TimeSlot,
    foreignKey: "timeSlotId",
    otherKey: "studentId",
});

export {
    sequelize, Student, Teacher, TimeSlot, LanguageLevel, StudyGroup,
    Teacher_LanguageLevel, Teacher_TimeSlot, StudyGroup_TimeSlot, Student_TimeSlot,
};
