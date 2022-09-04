const productModel = require('../database/models/product.model');
const path = require('path');
const fs = require('fs');
const delPic = (data) => {
    if(fs.existsSync(path.join(__dirname, `../assets/${data}`)))
    fs.unlinkSync(path.join(__dirname, `../assets/${data}`));
};
class Product {
    static addProduct = async (req, res) => {
        try {
            const productData = productModel(req.body);
            let files = req.files;
            let filename = [];
            if(files) files.forEach((f, i) => {filename[i] = f.filename;});
            productData.photos = filename;  
            productData.pBanner = filename[0];  
            productData.sellerId = req.sellerId;
            await productData.save();
            res.status(200).send({apiStatus: true, message: 'product uploaded', productData});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static editBanner = async (req, res) => {
        try {
            const product = await productModel.findOne(req.params._id);
            product.pBanner = req.file.filename;
            await product.save();
            res.status(200).send({apiStatus: true, message: 'banner Edited', product});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delBanner = async (req, res) => {
        try {
            const product = await productModel.findOne(req.params._id);
            delPic(product.pBanner);
            product.pBanner = '';
            await product.save();
            res.status(200).send({apiStatus: true, message: 'banner Edited', product});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static editProduct = async (req, res) => {
        try {
            const product = await productModel.findOne({id: req.params.id});
            for (let prop in req.body) {
                product[prop] = req.body[prop];
            }
            await product.save();
            res.status(200).send({apiStatus: true, message: 'product Edited', product});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delProduct = async (req, res) => {
        try {
            const product = await productModel.findByIdAndDelete({_id: req.params.id});
            product.photos.forEach(p => delPic(p));
            delPic(product.pBanner);
            res.status(200).send({apiStatus: true, message: 'product Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static addPhoto = async (req, res) => {
        try {
            const product = await productModel.findOne(req.params._id);
            product.photos = product.photos.concat(req.file.filename);
            await product.save();
            res.status(200).send({apiStatus: true, message: 'photo Added', product});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delPhoto = async (req, res) => {
        try {
            let product = await productModel.findById({_id: req.params.id});
            delPic(req.params.pName);
            let photos = product.photos;
            photos = photos.splice(photos.indexOf(req.params.pName), 1);
            await product.save();
            res.status(200).send({apiStatus: true, message: 'photo Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delAll = async (req, res) => {
        try {
            const products = await productModel.find({sellerId: req.sellerId});
            products.forEach(p => {
                p.photos.forEach(photo => delPic(photo));
            });
            products.forEach(p => delPic(p.pBanner));
            await productModel.deleteMany({sellerId: req.sellerId});
            res.status(200).send({apiStatus: true, message: 'products Deleted'});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
    static categories = async (req, res) => {
        try {
            let gottenC = [];
            let categories = {};
            let all = [];
            let category = await productModel.find();
            category.forEach(c => {
                all.push(c);
                if(!gottenC.includes(c.category)) gottenC.push(c.category);
            });
            gottenC.forEach((g) => {
                categories[g] = all.filter(f => f.category == g);
            });
            res.status(200).send({apiStatus: true, message: 'all Category', data:{categories, gottenC}});
        } catch (err) {
            res.status(500).send({apiStatus: false, message: err.message, data: err});
        }
    }
}

module.exports = Product;