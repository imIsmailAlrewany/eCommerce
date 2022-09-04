const jwt = require('jsonwebtoken');
const userModel = require('../database/models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const breakPass = jwt.verify(token, process.env.KEY);
        const user = await userModel.findOne({_id: breakPass._id, 'tokens.token': token});
        if(!user) throw new Error('Oops unAuthorization');
        req.user = user;
        req.token = token;
        next ();
    } catch (err) {
        res.status(500).send({ apiStatus:false, data:err, message: err.message });
    }
}

module.exports = auth;