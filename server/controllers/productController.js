// server/controllers/productController.js
import { upload } from "../configs/multer.js";
import {v2 as Cloudinary} from "cloudinary";
import Product from "../models/Product.js";

// Add product : /api/product/add
export const addProduct = async (req, res) => {
    try{
        let productData = JSON.parse(req.body.productData);

        const images = req.files

        let imgesUrls = await Promise.all(
            images.map(async (item) => {
                let result = await Cloudinary.uploader.upload(item.path,
                    {resource_type: "image"});
                    return result.secure_url;
            })
        );
        await Product.create({
            ...productData,
            images: imgesUrls,
        });
        res.json({success: true, message: "Product added successfully"});
    }catch(error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


//get all products : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


//get product by id : /api/product/:id
export const productById = async (req, res) => {
    try {
        const {id} = req.body;
        const product = await Product.findById(id);
        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


// change product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const {id, inStock} = req.body;
        await Product.findByIdAndUpdate(id, {inStock});
        res.json({
            success: true,
            message: "Product stock updated successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}