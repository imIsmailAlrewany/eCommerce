const router = require('express').Router();
const upload = require('../middleware/upload.middleware');
const Product = require('../controller/product.controller');
const sAuth = require('../middleware/sauth.middleware');
const auth = require('../middleware/auth.middleware');

router.post('/add', auth, sAuth, upload.array('photos', [5]), Product.addProduct);
router.patch('/B/:id', auth, sAuth, upload.single('pBanner'), Product.editBanner);
router.delete('/B/:id', auth, sAuth, Product.delBanner);
router.patch('/P/:id', auth, sAuth, Product.editProduct);
router.delete('/P/:id', auth, sAuth, Product.delProduct);
router.post('/PP/:id', auth, sAuth, upload.single('photo'), Product.addPhoto);
router.delete('/PP/:id/:pName', auth, sAuth, Product.delPhoto);
router.delete('/delete', auth, sAuth, Product.delAll);
router.get('/', Product.categories);

module.exports = router;