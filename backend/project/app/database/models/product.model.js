const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    sellerId: {type: Object, required: true},
    category: {type: String, required: true, trim: true, minlength: 3},
    name: {type: String, trim: true, minlength: 4, required: true},
    description: {type: String, trim: true, minlength: 15, required: true},
    pBanner: {type: String},
    photos: [],
    price: {type: Number, trim: true, min: 1, required: true},
    rate: {type: Number, trim: true, required: true, default: 3},
    quantity: {type: String, trim: true, required: true, default: 'Sorry! no more of this item'}
}, {timestamps: true});

const ProductSchema = mongoose.model('Product', productSchema);
module.exports = ProductSchema;