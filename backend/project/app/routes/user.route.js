const router = require('express').Router();
const User = require('../controller/user.controller');
const upload = require('../middleware/upload.middleware');
const auth = require('../middleware/auth.middleware');
const sAuth = require('../middleware/sauth.middleware');

router.post('/register', User.register);
router.post('/register/PP', auth, upload.single('userImage'), User.uploadImg);
router.post('/login', User.login);
router.get('/u', auth, User.profile);
router.patch('/u', auth, User.editProfile);
router.delete('/u', auth, User.delProfile);
router.delete('/u/pic', auth, User.delPic);
router.patch('/u/pic', auth, upload.single('userImage'), User.editPic);
router.post('/logout', auth, User.logout);
router.post('/sell', auth, User.seller);
router.delete('/sell', auth, User.delSeller);
router.patch('/sell', auth, User.editSeller);
router.get('/sell/u', auth, User.sellerProfile);
router.get('/sell/products', auth, sAuth, User.myProducts);
router.get('/sell/orders', auth, sAuth, User.showOrders);
router.delete('/sell/orders/:operationId', auth, sAuth, User.delOrder);

module.exports = router;