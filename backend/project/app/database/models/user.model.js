const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const User = require('../../controller/user.controller');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true, minlength: 3 },
    email: {
        type: String, trim: true, required: true, unique: true, unique: true, validate(value) {
            if(!validator.isEmail(value)) throw new Error('invalid Email');
        }
    },
    password: {
        type: String, trim: true, required: true, minlength: 6, validate(value) {
            if (value.includes('password') || value.includes('123') || value.includes(this.name)
            || value.includes('123456')) throw new Error ('week password');
        }
    },
    userImage: {type: String},
    seller: {type: Boolean, trim: true, required: true, default: false},
    sellerId: {type: Object, trim: true},
    orders: [],
    tokens: [ { token: {type: String, required: true} } ]
}, {timestamps: true});

userSchema.virtual('myProducts', {
    ref:'Product',
    localField:'_id',
    foreignField:'sellerId'
});

userSchema.methods.toJSON = function () {
    const del = ['__v', 'password', 'tokens'];
    const userData = this.toObject();
    del.forEach(d => delete userData[d]);
    return userData;
}

userSchema.pre('save', async function () {
    if (this.isModified('password')) this.password = await bcryptjs.hash(this.password, 12);
});

userSchema.statics.login = async (email, password) => {
    const userData = await UserSchema.findOne({email});
    if(!userData) throw new Error('invalid Email');
    const userPass = await bcryptjs.compare(password, userData.password);
    if(!userPass) throw new Error('invalid Password');
    return userData;
};

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.KEY);
    user.tokens = {...user[token], token};
    await user.save();
    return token;
}

const UserSchema = mongoose.model('User', userSchema);
module.exports = UserSchema;