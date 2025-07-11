// server/middlewares/authUser.js
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ FIX: use `req.userId`, not `req.body.userId`
      next();
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
