import Message from "../models/message.model.js";
import { generateComponent } from "../utils/openai.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).populate(
      "user",
      "name email"
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

export const createMessage = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: "Message content is required" });
  }

  const generatedCode = await generateComponent(prompt);

  try {
    const newMessage = await Message.create({
      message: prompt,
      user: req.user.id,
      generatedCode,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error creating message", error });
  }
};
