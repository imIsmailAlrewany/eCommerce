const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productId:{type: Object, required: true},
    sellerId:{type: Object, required: true},
    userId:{type: Object, required: true},
    pBanner: {type: String, trim: true},
    name: {type: String, required: true, trim: true},
    price: {type: Number, required: true, trim: true, min: 1},
    quant: {type: Number, required: true, default: 1, min: 1},
    orderId: {type:Object}
}, {timestamps: true});

const CartSchema = mongoose.model('Cart', cartSchema);
module.exports = CartSchema;