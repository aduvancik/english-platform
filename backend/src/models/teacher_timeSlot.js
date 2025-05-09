import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { Teacher } from "./teacher.js";
import { TimeSlot } from "./timeSlot.js";

export class Teacher_TimeSlot extends Model {}

Teacher_TimeSlot.init(
    {
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Teacher,
                key: "id",
            },
        },
        timeSlotId: {
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
