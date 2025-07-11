// server/controllers/addressController.js
import Address from "../models/Address.js";


//Add Address : /api/address/add
export const addAddress = async (req, res) => {
    try {
    const { address } = req.body;
    const userId = req.userId;
        await Address.create({
            ...address,
            userId
        });
        res.json({
            success: true, 
            message: "Address added successfully"
        });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Get all addresses : /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Get from auth middleware
    const addresses = await Address.find({ userId });

    res.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};




