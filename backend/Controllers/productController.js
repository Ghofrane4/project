const pool = require('../config/database');
const { Product, History } = require("../Models");
const { Op } = require("sequelize");
const db = require('../config/database'); 

const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      technicalDescription,
      productCategory,
      price,
      stock,
      productStatus,
      visibility,
      createdBy,
    } = req.body;

    if (!createdBy) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    // Handle image upload
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = await Product.create({
      title,
      description,
      technicalDescription,
      productCategory,
      price,
      stock,
      productStatus,
      image, // Store the file path in the database
      visibility,
      popularity: 0, // Default value
      createdBy,
      userId: createdBy,
    });

    console.log("Product created:", newProduct);

    // Log the action in history
    await History.create({
      userId: createdBy,
      action: `Added product: ${title}`,
      timestamp: new Date(),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Handle image upload if present
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update(updates);

    // Log the update action
    if (req.body.createdBy) {
      await History.create({
        userId: req.body.createdBy,
        action: `Updated product: ${product.title}`,
        timestamp: new Date(),
      });
    } else {
      console.error("User information is missing for logging");
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ error: "Failed to update product. Please try again later." });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    // Log the delete action
    await History.create({
      userId: product.createdBy,
      action: `Deleted product: ${product.title}`,
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Display Product
const displayProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List Products
const listProduct = async (req, res) => {
  try {
    const userId = req.params.iduser;

    const products = await Product.findAll({
      where: { createdBy: userId },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllproducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Search Products
const searchProduct = async (req, res) => {
  try {
    const { query } = req.body;
    const products = await Product.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getp = async (req, res) => {
  try {
    // 1. Exécution de la requête pour récupérer les produits et le fullname des utilisateurs (fournisseurs)
    const [products] = await db.query(`
      SELECT 
        p.*, 
        u.fullname AS fournisseurName
      FROM products p
      JOIN users u ON p.userId = u.id
      WHERE p.visibility = 1
    `);

    // Vérifier si les produits ont bien été récupérés
    console.log("Produits et fournisseurs:", products); // Log des données récupérées

    if (!products.length) {
      return res.status(404).json({ error: "Aucun produit trouvé." });
    }

    // 2. Grouper les produits par fournisseurId
    const result = products.reduce((acc, product) => {
      const { userId, fournisseurName, ...productData } = product;
      if (!acc[userId]) {
        acc[userId] = {
          fournisseurName: fournisseurName,
          products: []
        };
      }
      acc[userId].products.push(productData);
      return acc;
    }, {});

    // 3. Retourner les données regroupées sous forme de réponse JSON
    res.json(result);
  } catch (err) {
    console.error("Erreur dans getp:", err); // Afficher l'erreur complète dans la console
    res.status(500).json({ error: 'Erreur serveur', details: err.message }); // Inclure plus de détails dans la réponse
  }
};













module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  displayProduct,
  listProduct,
  searchProduct,
  getAllproducts,
  getp
};
