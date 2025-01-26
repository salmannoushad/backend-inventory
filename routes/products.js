const express = require('express');
const { addProduct, getProducts, updateProduct, getAnalytics, getSearchProducts } = require('../controllers/productsController');
const router = express.Router();

router.get('/product/:barcode', addProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.get('/analytics', getAnalytics);
router.get('/search', getSearchProducts);

module.exports = router;
