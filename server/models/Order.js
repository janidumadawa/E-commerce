// server/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items:[{
        product: {
            type: String,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true,
        ref: 'Address'
    },
    status: {
        type: String,
        default: 'Order Placed',
    },
    paymentType: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
