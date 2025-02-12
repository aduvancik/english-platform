import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { Student } from "./student.js";
import { TimeSlot } from "./timeSlot.js";

export class Student_TimeSlot extends Model {}

Student_TimeSlot.init(
    {
        StudentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Student,
                key: "id",
            },
        },
        TimeSlotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TimeSlot,
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    },
);
