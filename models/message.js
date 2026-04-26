import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Message = sequelize.define("Message", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Message;