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
    { expiresIn: "24h" }
  );

  res.cookie("jwtToken", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000 * 24, // 24 hours
  });
};
export default generateToken;
