import User from "./user.js";
import Message from "./message.js";

User.hasMany(Message);
Message.belongsTo(User);

export { User, Message };