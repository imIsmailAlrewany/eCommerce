const userModel = require('../database/models/user.model');
const sellerModel = require('../database/models/seller.model');
const productModel = require('../database/models/product.model');
const cartModel = require('../database/models/cart.model');
const path = require('path');
const fs = require('fs');
const delPic = (data) => {
    if(fs.existsSync(path.join(__dirname, `../assets/${data.userImage}`)))
    fs.unlinkSync(path.join(__dirname, `../assets/${data.userImage}`));
};

class User {
    static register = async (req, res) => {
        try {
            const userData = userModel(req.body);
            await userData.save();
            const token = await userData.generateToken();
            res.status(200).send({apiStatus: true, message: 'user Registered', token});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static uploadImg = async (req, res) => {
        try {
            const userData = await userModel.findById(req.user.id);
            userData.userImage = req.file.filename;
            await userData.save();
            res.status(200).send({message:'pic uploaded', data: userData});
        } catch (err) {
            res.status(500).send({message: err.message, data: err})
        }
    }
    static login = async (req, res) => {
        try {
            const userData = await userModel.login(req.body.email, req.body.password);
            const token = await userData.generateToken();
            res.status(200).send({apiStatus: true, message: 'you logged in', data: {userData, token}})
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static profile = async (req, res) => {
        try {
            const userData = req.user;
            res.status(200).send ({apiStatus: true, message: 'user Profile', userData});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static editProfile = async (req, res) => {
        try {
            for (let prop in req.body) {
                req.user[prop] = req.body[prop];
            }
            await req.user.save();
            res.status(200).send({apiStatus: true, message: 'profile data Edited', userData: req.user})
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delProfile = async (req, res) => {
        try {
            delPic(req.user);
            await userModel.findByIdAndDelete(req.user._id);
            res.status(200).send({apiStatus: true, message: 'profile Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static editPic = async (req, res) => {
        try {
            delPic(req.user);
            req.user.userImage = req.file.filename;
            req.user.save();
            res.status(200).send({apiStatus: true, message: 'pic Edited'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delPic = async (req, res) => {
        try {
            delPic(req.user);
            req.user.userImage = '';
            req.user.save();
            res.status(200).send({apiStatus: true, message: 'pic Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token);
            await req.user.save();
            res.status(200).send({apiStatus: true, message: 'you logged out'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static seller = async (req, res) => {
        try {
            let sellerData = sellerModel(req.body);
            sellerData.name = req.user.name;
            sellerData.userImage = req.user.userImage;
            await sellerData.save();
            req.user.seller = true;
            req.user.sellerId = sellerData._id;
            await req.user.save();
            res.status(200).send({apiStatus: true, message: 'seller Registered', sellerData});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delSeller = async (req, res) => {
        try {
            await sellerModel.findByIdAndDelete(req.user.sellerId);
            req.user.seller = false;
            req.user.sellerId = null;
            await req.user.save();
            res.status(200).send({apiStatus: true, message: 'profile seller Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static editSeller = async (req, res) => {
        try {
            const sellerData = await sellerModel.findById(req.user.sellerId);
            for (let prop in req.body) {
                sellerData[prop] = req.body[prop];
            }
            await sellerData.save();
            res.status(200).send({apiStatus: true, message: 'profile seller data Edited', sellerData});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static sellerProfile = async (req, res) => {
        try {
            let userData = req.user;
            let sellerData = await sellerModel.findById(req.user.sellerId);
            const data = {...userData._doc, ...sellerData._doc};
            const del = ['__v', 'password', 'tokens', '_id', 'sellerId', 'createdAt', 'updatedAt'];
            del.forEach(d => delete data[d]);
            res.status(200).send({apiStatus: true, message: 'seller Profile', sellerData: data});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static myProducts = async (req, res) => {
        try {
            await req.user.populate('myProducts');
            const products = await productModel.find({sellerId: req.sellerId});
            res.status(200).send({apiStatus: true, message: 'all seller Products', products: products});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static showOrders = async (req, res) => {
        try {
            const orders = await sellerModel.find();
            res.status(200).send({apiStatus: true, message: 'your orders', orders:orders.orders});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, orders: err});
        }
    }
    static delOrder = async (req, res) => {
        try {
            const cart = await cartModel.findOne({operationId: req.params.operationId});
            cartModel.deleteOne(cart);
            const seller = await sellerModel.findById(cart.sellerId);
            seller.orders.operationId.forEach((o, i) => {
                if (o == cart.orderId) seller.orders.splice(i, 1);
            });
            await seller.save();
            await cart.save();
            res.status(200).send({apiStatus: true, message: 'your Order Deleted', orders: seller.orders});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
}

module.exports = User;