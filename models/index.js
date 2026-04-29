import User from "./user.js";
import Message from "./message.js";
import ArchivedMessage from "./archivedMessage.js";


User.hasMany(Message, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
});

Message.belongsTo(User, {
  foreignKey: "UserId",
});

User.hasMany(ArchivedMessage, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
});

ArchivedMessage.belongsTo(User, {
  foreignKey: "UserId",
});

export { User, Message, ArchivedMessage };