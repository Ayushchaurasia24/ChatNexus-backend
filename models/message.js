import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Message = sequelize.define("Message", {
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
}, {
  indexes: [
    { fields: ["roomId"] },       // fast room message lookups
    { fields: ["createdAt"] },    // fast archive queries
  ],
});

export default Message;