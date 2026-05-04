import { Message, ArchivedMessage } from "../models/index.js";
import { Op } from "sequelize";

const archiveOldMessages = async () => {
  try {
    console.log("🧹 Archiving old messages...");

    // Find messages older than 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const oldMessages = await Message.findAll({
      where: {
        createdAt: {
          [Op.lt]: thirtyDaysAgo,
        },
      },
    });

    if (oldMessages.length === 0) {
      console.log("✅ No messages to archive");
      return;
    }

    // Move to ArchivedMessages
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

    // Delete from Messages
    await Message.destroy({
      where: {
        createdAt: {
          [Op.lt]: thirtyDaysAgo,
        },
      },
    });

    console.log(`✅ Archived ${oldMessages.length} messages`);
  } catch (error) {
    console.error("[archiveMessages]", error.message);
  }
};

export default archiveOldMessages;