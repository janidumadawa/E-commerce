// server/controllers/sellerController.js
import jwt from 'jsonwebtoken';

// login seller : /api/seller/login
export const sellerLogin = async (req, res) => {
    const {email, password} = req.body;

    try{
        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie("sellerToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiration time (7 days)
        });

        return res.json({
            success: true,
            message: "Login successful"
        });
    }else{
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }
    }catch(error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
}

//seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//seller logout : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
}

