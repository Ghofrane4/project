const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const multer = require('multer');
const path = require('path');

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});

const upload = multer({ storage: storage });

// Add a new product
router.post('/add', upload.single('image'), productController.addProduct);

// Update an existing product
router.put('/update/:id', upload.single('image'), productController.updateProduct);

// Delete a product by ID
router.delete('/delete/:id', productController.deleteProduct);

// Display a specific product by ID
router.get('/display/:id', productController.displayProduct);

// List all products
router.get('/list/:iduser', productController.listProduct);


router.get('/allpro', productController.getAllproducts);












router.get('/getpy', productController.getp);  














// Search for products
router.post('/search', productController.searchProduct);

module.exports = router;
