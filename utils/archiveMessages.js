import { Message, ArchivedMessage } from "../models/index.js";
import { Op } from "sequelize";

const archiveOldMessages = async () => {
  try {
    console.log("🧹 Archiving old messages...");

    // 1️⃣ Find messages older than 1 day
    const oneDayAgo = new Date(Date.now() - 1 * 60 * 1000);

    const oldMessages = await Message.findAll({
      where: {
        createdAt: {
          [Op.lt]: oneDayAgo,
        },
      },
    });

    if (oldMessages.length === 0) {
      console.log("✅ No messages to archive");
      return;
    }

    // 2️⃣ Move to ArchivedMessages
    const archivedData = oldMessages.map((msg) => ({
      message: msg.message,
      roomId: msg.roomId,
      type: msg.type,
      isGroup: msg.isGroup,
      UserId: msg.UserId,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
    }));

    await ArchivedMessage.bulkCreate(archivedData);

    // 3️⃣ Delete from Messages
    await Message.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneDayAgo,
        },
      },
    });

    console.log(`✅ Archived ${oldMessages.length} messages`);
  } catch (error) {
    console.log("❌ Archive error:", error);
  }
};

export default archiveOldMessages;