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
    process.env.JWT_SECRET
  );

  res.cookie("jwtToken", jwtToken);
};
export default generateToken;
