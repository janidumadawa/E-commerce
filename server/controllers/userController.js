// File: server/controllers/userController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

//register user : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true, //prevents javascript to access the cookie
            secure: process.env.NODE_ENV === "production", //use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiration time (7 days)
        });

        return res.json({
            success: true,
            user: {
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


//login user : /api/user/login
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please fill Email and Password fields" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            user: {
                email: user.email,
                name: user.name,
            }
        });
    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });

    }
}

//get user details : /api/user/isAuth
export const isAuth = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Comes from middleware now
    const user = await User.findById(userId).select("-password");
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



//logout user : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
}