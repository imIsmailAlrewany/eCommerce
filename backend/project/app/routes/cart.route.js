const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const sAuth = require('../middleware/sauth.middleware');
const Cart = require('../controller/cart.controller');

router.get('/add/:id', auth, Cart.selectedProducts);
router.get('/', auth, Cart.selected);
router.delete('/del/:id', auth, Cart.delCartProduct);
router.get('/Q/:id/:quant', auth, Cart.addAndDelQuantity);
router.get('/order/:id', auth, sAuth, Cart.order);
router.get('/order', auth, Cart.showOrders);
router.delete('/order/:id', auth, Cart.delOrder);

module.exports = router;