const mongoose = require('mongoose');
const cartModel = require('../database/models/cart.model');
const productModel = require('../database/models/product.model');
const sellerModel = require('../database/models/seller.model');
const userModel = require('../database/models/user.model');

class Cart {
    static selectedProducts = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id);
            let cart = {};
            for (let prop in product) {cart[prop] = product[prop]}
            const cartProduct = await cartModel(cart);
            cartProduct.productId = product._id;
            cartProduct.userId = req.user._id;
            await cartProduct.save();
            res.status(200).send({apiStatus: true, message: 'product add to cart', selectedProduct: cartProduct});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static selected = async (req, res) => {
        try {
            const cart = await cartModel.find();
            res.status(200).send({apiStatus: true, message: 'cart selected products', cart});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delCartProduct = async (req, res) => {
        try {
            await cartModel.findByIdAndDelete(req.params.id);
            res.status(200).send({apiStatus: true, message: 'selected product Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static addAndDelQuantity = async (req, res) => {
        try {
            const cart = await cartModel.findById(req.params.id);
            if (req.params.quant > 1 || req.params.quant != 0) cart.quant = req.params.quant;
            else throw new Error('add a number or Deleted this product from your cart');
            await cart.save();
            res.status(200).send({apiStatus: true, message: `Quantity ${req.params.quant}`, selectedProduct: cart});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static order = async (req, res) => {
        try {
            
            
            // user.orders.concat({productId: product._id, operationId, product});
            
            // await user.save();
            // await seller.save();

            /*
                const cart = await cartModel.findById(req.params.id);
                const product = await cartModel.findById(req.params.id);
                const sellerId = cart.sellerId;
                const seller = await sellerModel.findOne({sellerId:sellerId});
                const user = await userModel.findById(req.user._id);
                const operationId = new mongoose.Types.ObjectId;
                seller.orders.concat({productId: product._id, operationId});
                let ordered = await sellerModel.findById(req.user._id);
                ordered = ordered.orders.find(f => f.operationId == operationId);
            */

            // seller.orders.concat({product: cart.productId, operationId});
            // console.log(seller.order)
            // await seller.save();
            // user.orders.push({orderName: cart.name, operationId});
            // await user.save();
            // cart.orderId = operationId;
            // await cart.save();

            // let ordered = await userModel.findById(req.user._id);
            // ordered = ordered.orders;

            const cart = await cartModel.findById(req.params.id);
            const user = await userModel.findById(req.user._id);
            const sellerId = cart.sellerId;
            const seller = await sellerModel.findOne({sellerId});
            const operationId = new mongoose.Types.ObjectId;
            seller.orders.push({...cart._doc, _id : operationId});
            user.orders.push({...cart._doc, _id : operationId});
            await seller.save();
            await user.save();
            // user.orders._id = operationId;
            res.status(200).send({apiStatus: true, message: 'your Order sent', ordered: user.orders});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static showOrders = async (req, res) => {
        try {
            const orders = await userModel.findOne(req.user._id);
            // console.log(orders.orders)
            res.status(200).send({apiStatus: true, message: 'your Orders', orders: orders.orders});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delOrder = async (req, res) => {
        try {
            const cart = await userModel.findById(req.user._id);
            // await cartModel.findByIdAndDelete(req.params.id);
            // const sellerId = cart.sellerId;
            const sellerId = cart.sellerId;
            let id; 
            cart.orders.find((f, i) => {
                if (f._id == req.params.id)
                return cart.orders.splice(i, 1);
            });
            await cart.save();

            const seller = await sellerModel.findById(sellerId);
            let productId; 
            seller.orders.find((f, i) => {
                if(f._id == req.params.id)
                return seller.orders.splice(i, 1);
            });
            await seller.save();
            // const seller = await sellerModel.findOne({sellerId});
            // seller.orders.operationId.forEach((o, i) => {
            //     if (o == cart.orderId) seller.orders.splice(i, 1);
            // });
            // await seller.save();
            res.status(200).send({apiStatus: true, message: 'your order Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
}

module.exports = Cart;