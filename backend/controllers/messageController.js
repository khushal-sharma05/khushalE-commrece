
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const newMsg = new Message({ userId, message });
    await newMsg.save();

    res.status(200).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Message Save Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
