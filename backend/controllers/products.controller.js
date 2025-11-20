const express = require("express");
const pool = require("../db/db");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const checkProductTable = require("../middlewares/productM");

router.use(authMiddleware);
router.use(checkProductTable);

router.get("/", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    return res.json(products.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    return res.json(products.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    return res.json(product.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, in_price, price, unit, vat_rate } = req.body;

    const newProduct = await pool.query(
      `INSERT INTO products (name, description, in_price, price, unit, vat_rate) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description || '', parseFloat(in_price) || 0, parseFloat(price) || 0, unit || 'pcs', parseFloat(vat_rate) || 0]
    );
    return res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, description, in_price, price } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (name, description, in_price, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, in_price, price]
    );
    return res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { name, description, in_price, price, unit, vat_rate } = req.body;
    const updatedProduct = await pool.query(
      "UPDATE products SET name=$1, description=$2, in_price=$3, price=$4, unit=$5, vat_rate=$6, updated_at=NOW() WHERE id=$7 RETURNING *",
      [name, description || '', parseFloat(in_price) || 0, parseFloat(price) || 0, unit || 'pcs', parseFloat(vat_rate) || 0, req.params.id]
    );
    
    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    return res.json(updatedProduct.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/field", async (req, res) => {
  try {
    const { field, value } = req.body;
    const productId = req.params.id;
    
    const allowedFields = ['name', 'description', 'in_price', 'price', 'unit', 'vat_rate'];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: "Invalid field name" });
    }
    
    let processedValue = value;
    if (['in_price', 'price', 'vat_rate'].includes(field)) {
      processedValue = parseFloat(value) || 0;
    }
    
    const query = `UPDATE products SET ${field}=$1, updated_at=NOW() WHERE id=$2 RETURNING *`;
    const updatedProduct = await pool.query(query, [processedValue, productId]);
    
    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    return res.json(updatedProduct.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
