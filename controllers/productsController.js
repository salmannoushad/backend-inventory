const Product = require('../models/product');
const axios = require('axios');

// Add Product (Scan Barcode)
exports.addProduct = async (req, res) => {
    try {
        const { barcode } = req.params;
        const productResponse = await axios.get(`https://products-test-aci.onrender.com/product/${barcode}`);

        const existingProduct = await Product.findOne({ barcode });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with this barcode already exists." });
        }

        if (!productResponse.data || !productResponse.data.product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productData = productResponse.data.product;

        const product = new Product({
            barcode: productData.barcode,
            name: productData.description,
            details: productData.description,
            category: 'Uncategorized',
        });

        // Save the product in MongoDB
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ message: "Error adding product", error });
    }
};


// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const category = req.query.category;
        const products = category
            ? await Product.find({ category })
            : await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, { category }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product category:", error);
        res.status(500).json({ message: 'Server error' });
    }
};



