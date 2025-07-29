import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user, res) => {
  const jwtToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwtToken", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS in production, HTTP in dev
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in ms
  });
};
export default generateToken;
