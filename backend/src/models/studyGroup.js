import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { Teacher } from "./teacher.js";
import { LanguageLevel } from "./languageLevel.js";

export class StudyGroup extends Model {
    toJSON() {
        const values = { ...this.get() };

        values.teacher = values.Teacher;
        values.languageLevel = values.LanguageLevel;
        values.timeSlots = values.TimeSlots;

        delete values.Teacher;
        delete values.LanguageLevel;
        delete values.TimeSlots;

        return values;
    }
}

StudyGroup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Teacher,
                key: "id",
            },
        },
        languageLevelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LanguageLevel,
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
