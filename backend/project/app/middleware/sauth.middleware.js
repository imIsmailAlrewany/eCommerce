const userModel = require('../database/models/user.model');

const sAuth = async (req, res, next) => {
    try {
        const userData = req.user.seller;
        if(!userData) throw new Error('you must be a seller');
        req.sellerId = req.user.sellerId;
        next();
    } catch (err) {
        res.status(500).send({ apiStatus:false, data:err, message: err.message });
    }
}

module.exports = sAuth;