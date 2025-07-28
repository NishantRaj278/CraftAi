import Session from "../models/session.model.js";

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate(
      "userId chats"
    );
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const newSession = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const session = new Session({
      userId,
      title: title || "New Session",
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addChatToSession = async (req, res) => {
  const { sessionId, chatId } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.chats.push(chatId);
    await session.save();

    res.json(session);
  } catch (error) {
    console.error("Error adding chat to session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserSessions = async (req, res) => {
  const userId = req.user.id;
  try {
    const sessions = await Session.find({ userId });
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
