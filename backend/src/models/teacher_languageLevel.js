import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { Teacher } from "./teacher.js";
import { LanguageLevel } from "./languageLevel.js";

export class Teacher_LanguageLevel extends Model {}

Teacher_LanguageLevel.init(
    {
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
