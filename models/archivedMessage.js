import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ArchivedMessage = sequelize.define("ArchivedMessage", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING,
    defaultValue: "text",
  },

  isGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default ArchivedMessage;