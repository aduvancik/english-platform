import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";

export class LanguageLevel extends Model {}

LanguageLevel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
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
