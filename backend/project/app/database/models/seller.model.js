const mongoose = require('mongoose');
const validator = require('validator');
const Seller = require('../../controller/user.controller');
const sellerSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true, minlength: 3 },
    fName: {type: String, required: true, trim: true, minlength: 3},
    mName: {type: String, required: true, trim: true, minlength: 3},
    lName: {type: String, required: true, trim: true, minlength: 3},
    phone: {type: String, required: true, trim: true, validate(value) {
        if (!validator.isMobilePhone(value, 'ar-EG')) throw new Error('invalid Phone number');
    }},
    country: {type: String, required: true},
    address: {type: String, required: true, trim: true},
    businessType: {type: String, required: true, trim: true},
    userImage: {type: String},
    orders: {type: Array}
}, {timestamps: true});

const SellerSchema = mongoose.model('Seller', sellerSchema);
module.exports = SellerSchema;