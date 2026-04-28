import User from "./user.js";
import Message from "./message.js";

User.hasMany(Message, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
});

Message.belongsTo(User, {
  foreignKey: "UserId",
});

export { User, Message };