import {
    sequelize, Student, Teacher, TimeSlot, LanguageLevel,
} from "../models/index.js";
import { readFile } from "node:fs/promises";

const dataStudents = JSON.parse(await readFile("dataStudents.json"));
const dataTeachers = JSON.parse(await readFile("dataTeachers.json"));

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

        await TimeSlot.bulkCreate(generateTimeSlotData());

        const teachers = await Teacher.bulkCreate(dataTeachers);

        for (let i = 0; i < teachers.length / 2; ++i) {
            if (i % 3 === 0) {
                await teachers[i].addLanguageLevels([1]);
            }
            await teachers[i].addLanguageLevels([1, 2, 3]);
            await teachers[i].addTimeSlots(getRandomTimeSlotIds({ size: 60 }));
        }
        for (let i = teachers.length / 2; i < teachers.length; ++i) {
            await teachers[i].addLanguageLevels([4, 5, 6]);
            await teachers[i].addTimeSlots(getRandomTimeSlotIds({ size: 60 }));
        }

        const students = await Student.bulkCreate(dataStudents);

        for (let i = 0; i < students.length; ++i) {
            await students[i].addTimeSlots(getRandomTimeSlotIds({ size: 1 }));
        }
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

function getRandomTimeSlotIds({ size }) {
    const availableNumbers = Array.from({ length: 168 }, (_, i) => i + 1);
    const shuffled = availableNumbers.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, size);
}
