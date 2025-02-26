import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { LanguageLevel } from "./languageLevel.js";
import { StudyGroup } from "./studyGroup.js";

export class Student extends Model {
    toJSON() {
        const values = { ...this.get() };

        values.languageLevel = values.LanguageLevel;
        values.studyGroup = values.StudyGroup;
        values.timeSlots = values.TimeSlots;

        delete values.LanguageLevel;
        delete values.StudyGroup;
        delete values.TimeSlots;

        return values;
    }
}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        languageLevelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LanguageLevel,
                key: "id",
            },
        },
        studyGroupId: {
            type: DataTypes.INTEGER,
            references: {
                model: StudyGroup,
                key: "id",
            },
            onDelete: "SET NULL",
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    },
);
