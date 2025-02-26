import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";

export class Teacher extends Model {
    toJSON() {
        const values = { ...this.get() };

        values.languageLevels = values.LanguageLevels;
        values.studyGroups = values.StudyGroups;
        values.timeSlots = values.TimeSlots;

        delete values.LanguageLevels;
        delete values.StudyGroups;
        delete values.TimeSlots;

        return values;
    }
}

Teacher.init(
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
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    },
);
