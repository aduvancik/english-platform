import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { StudyGroup } from "./studyGroup.js";
import { TimeSlot } from "./timeSlot.js";

export class StudyGroup_TimeSlot extends Model {}

StudyGroup_TimeSlot.init(
    {
        StudyGroupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: StudyGroup,
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
