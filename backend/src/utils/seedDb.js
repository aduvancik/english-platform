import {
    sequelize, Student, Teacher, TimeSlot, LanguageLevel, StudyGroup,
    Teacher_LanguageLevel, Teacher_TimeSlot, StudyGroup_TimeSlot, Student_TimeSlot,
} from "../models/index.js";

export async function seedDatabase() {
    try {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
        await sequelize.sync({ force: true });
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

        await LanguageLevel.bulkCreate([
            { name: "A1" },
            { name: "A2" },
            { name: "B1" },
            { name: "B2" },
            { name: "C1" },
            { name: "C2" },
        ]);

        await Teacher.bulkCreate([
            { firstName: "Alice", lastName: "Johnson", email: "alice@example.com", passwordHash: "d3f1e7fc3af52bba71087d77f0742aea" },
            { firstName: "Bob", lastName: "Smith", email: "bob@example.com", passwordHash: "5eb013a824130939c986a2443515bf78" },
            { firstName: "Julie", lastName: "Butler", email: "hgordon@example.com", passwordHash: "4c34fbc97ac1a9261653b1abc729b152" },
            { firstName: "Gregg", lastName: "Roberts", email: "patrickrogers@example.com", passwordHash: "f87daacdbef28567dc430ea33601699e" },
            { firstName: "Cynthia", lastName: "Fisher", email: "davidlee@example.com", passwordHash: "cb24ea5a69582dcc654c3bbb9027e6b5" },
        ]);

        await Teacher_LanguageLevel.bulkCreate([
            { teacherId: 1, languageLevelId: 3 },
            { teacherId: 1, languageLevelId: 4 },
            { teacherId: 1, languageLevelId: 5 },
            { teacherId: 2, languageLevelId: 1 },
            { teacherId: 2, languageLevelId: 2 },
        ]);

        await StudyGroup.bulkCreate([
            { teacherId: 1, languageLevelId: 4, name: "High Five" },
            { teacherId: 1, languageLevelId: 5, name: "Avant Garde" },
            { teacherId: 2, languageLevelId: 1, name: "Beginner Group A1" },
            { teacherId: 2, languageLevelId: 2, name: "Beginner Group A2" },
        ]);

        await Student.bulkCreate([
            { languageLevelId: 1, studyGroupId: 1, firstName: "Oleksandr", lastName: "Salah", email: "regeln@example.com", passwordHash: "6427435774b539b7eb87924b92d5d417" },
            { languageLevelId: 2, studyGroupId: 3, firstName: "Sofia", lastName: "Hopp", email: "sofa@example.com", passwordHash: "hashed_password" },
            { languageLevelId: 3, studyGroupId: 1, firstName: "oleg", lastName: "Krivogub", email: "oleg.doe@example.com", passwordHash: "6427435774b539b7eb87924b92d5d417" },
            { languageLevelId: 3, studyGroupId: 3, firstName: "Solomiia", lastName: "Kava", email: "solomiia@example.com", passwordHash: "my_hashed_password" },
            { languageLevelId: 4, studyGroupId: 3, firstName: "Yurii", lastName: "Nagorniak", email: "nagorniak@example.com", passwordHash: "dc647eb65e6711e155375218212b3964" },
            { languageLevelId: 4, studyGroupId: 1, firstName: "Anastasiia", lastName: "Klishch", email: "anastasiia@example.com", passwordHash: "hashed_password" },
        ]);

        await TimeSlot.bulkCreate(generateTimeSlotData());

        await Teacher_TimeSlot.bulkCreate([
            { teacherId: 1, timeSlotId: 34 },
            { teacherId: 1, timeSlotId: 46 },
            { teacherId: 1, timeSlotId: 58 },
            { teacherId: 1, timeSlotId: 66 },
            { teacherId: 2, timeSlotId: 10 },
            { teacherId: 2, timeSlotId: 37 },
            { teacherId: 2, timeSlotId: 76 },
            { teacherId: 2, timeSlotId: 80 },
        ]);

        await StudyGroup_TimeSlot.bulkCreate([
            { studyGroupId: 1, timeSlotId: 34 },
            { studyGroupId: 1, timeSlotId: 46 },
            { studyGroupId: 1, timeSlotId: 58 },
            { studyGroupId: 2, timeSlotId: 66 },
            { studyGroupId: 3, timeSlotId: 10 },
            { studyGroupId: 3, timeSlotId: 80 },
            { studyGroupId: 4, timeSlotId: 37 },
        ]);

        await Student_TimeSlot.bulkCreate([
            { studentId: 1, timeSlotId: 10 },
            { studentId: 1, timeSlotId: 20 },
            { studentId: 1, timeSlotId: 30 },
            { studentId: 1, timeSlotId: 34 },
            { studentId: 1, timeSlotId: 54 },
            { studentId: 1, timeSlotId: 66 },
        ]);
    } catch (er) {
        console.log(`Error: ${er}`);
    }
}

function generateTimeSlotData() {
    const timeSlots = [];
    let hour = 0;
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayIndex = 0;

    while (dayIndex < 7) {
        while (hour <= 23) {
            const start_time = new Date();
            start_time.setHours(hour, 0, 0, 0);

            const end_time = new Date(start_time);
            end_time.setHours(hour + 1);

            timeSlots.push({
                startAt: start_time,
                endAt: end_time,
                dayOfWeek: days[dayIndex],
            });

            hour += 1;
        }

        hour = 0;
        dayIndex += 1;
    }

    return timeSlots;
}
