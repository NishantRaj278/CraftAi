import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
export default authToken;
