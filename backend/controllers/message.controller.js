import Message from "../models/message.model";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

export const createMessage = async (req, res) => {
  const { message, generatedCode } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message content is required" });
  }

  try {
    const newMessage = await Message.create({
      message,
      user: req.user._id,
      generatedCode,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error creating message", error });
  }
};
