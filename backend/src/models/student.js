import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { LanguageLevel } from "./languageLevel.js";
import { StudyGroup } from "./studyGroup.js";

export class Student extends Model {}

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
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    },
);
