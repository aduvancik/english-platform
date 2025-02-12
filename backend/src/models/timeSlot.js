import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/index.js";

export class TimeSlot extends Model {}

TimeSlot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        startAt: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endAt: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        dayOfWeek: {
            type: DataTypes.ENUM("Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday"),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    },
);
