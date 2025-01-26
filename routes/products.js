const express = require('express');
const { addProduct, getProducts, updateProduct } = require('../controllers/productsController');
const router = express.Router();

router.get('/:barcode', addProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);

module.exports = router;
