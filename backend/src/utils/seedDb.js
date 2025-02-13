import {
    sequelize, Student, Teacher, TimeSlot, LanguageLevel, StudyGroup,
    Teacher_LanguageLevel, Teacher_TimeSlot, StudyGroup_TimeSlot, Student_TimeSlot,
} from "../models/index.js";

export async function seedDatabase() {
    try {

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await Student_TimeSlot.drop();
        await StudyGroup_TimeSlot.drop();
        await Teacher_TimeSlot.drop();
        await Teacher_LanguageLevel.drop();
        await TimeSlot.drop();
        await Student.drop();
        await StudyGroup.drop();
        await Teacher.drop();
        await LanguageLevel.drop();
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        await sequelize.sync({ force: true });

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
            { TeacherId: 1, LanguageLevelId: 3 },
            { TeacherId: 1, LanguageLevelId: 4 },
            { TeacherId: 1, LanguageLevelId: 5 },
            { TeacherId: 2, LanguageLevelId: 1 },
            { TeacherId: 2, LanguageLevelId: 2 },
        ]);

        await StudyGroup.bulkCreate([
            { TeacherId: 1, LanguageLevelId: 4, name: "High Five" },
            { TeacherId: 1, LanguageLevelId: 5, name: "Avant Garde" },
            { TeacherId: 2, LanguageLevelId: 1, name: "Beginner Group A1" },
            { TeacherId: 2, LanguageLevelId: 2, name: "Beginner Group A2" },
        ]);

        await Student.bulkCreate([
            { LanguageLevelId: 1, StudyGroupId: 1, firstName: "Oleksandr", lastName: "Salah", email: "regeln@example.com", passwordHash: "6427435774b539b7eb87924b92d5d417" },
            { LanguageLevelId: 2, StudyGroupId: 3, firstName: "Sofia", lastName: "Hopp", email: "sofa@example.com", passwordHash: "hashed_password" },
            { LanguageLevelId: 3, StudyGroupId: 1, firstName: "oleg", lastName: "Krivogub", email: "oleg.doe@example.com", passwordHash: "6427435774b539b7eb87924b92d5d417" },
            { LanguageLevelId: 3, StudyGroupId: 3, firstName: "Solomiia", lastName: "Kava", email: "solomiia@example.com", passwordHash: "my_hashed_password" },
            { LanguageLevelId: 4, StudyGroupId: 3, firstName: "Yurii", lastName: "Nagorniak", email: "nagorniak@example.com", passwordHash: "dc647eb65e6711e155375218212b3964" },
            { LanguageLevelId: 4, StudyGroupId: 1, firstName: "Anastasiia", lastName: "Klishch", email: "anastasiia@example.com", passwordHash: "hashed_password" },
        ]);

        await TimeSlot.bulkCreate(generateTimeSlotData());

        await Teacher_TimeSlot.bulkCreate([
            { TeacherId: 1, TimeSlotId: 34 },
            { TeacherId: 1, TimeSlotId: 46 },
            { TeacherId: 1, TimeSlotId: 58 },
            { TeacherId: 1, TimeSlotId: 66 },
            { TeacherId: 2, TimeSlotId: 10 },
            { TeacherId: 2, TimeSlotId: 37 },
            { TeacherId: 2, TimeSlotId: 76 },
            { TeacherId: 2, TimeSlotId: 80 },
        ]);

        await StudyGroup_TimeSlot.bulkCreate([
            { StudyGroupId: 1, TimeSlotId: 34 },
            { StudyGroupId: 1, TimeSlotId: 46 },
            { StudyGroupId: 1, TimeSlotId: 58 },
            { StudyGroupId: 2, TimeSlotId: 66 },
            { StudyGroupId: 3, TimeSlotId: 10 },
            { StudyGroupId: 3, TimeSlotId: 80 },
            { StudyGroupId: 4, TimeSlotId: 37 },
        ]);

        await Student_TimeSlot.bulkCreate([
            { StudentId: 1, TimeSlotId: 10 },
            { StudentId: 1, TimeSlotId: 20 },
            { StudentId: 1, TimeSlotId: 30 },
            { StudentId: 1, TimeSlotId: 34 },
            { StudentId: 1, TimeSlotId: 54 },
            { StudentId: 1, TimeSlotId: 66 },
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