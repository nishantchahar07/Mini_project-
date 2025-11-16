const express = require("express");
const pool = require("../db/db");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const checkProductTable = require("../middlewares/productM");

router.use(authMiddleware);
router.use(checkProductTable);
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
    const { name, description, in_price, price } = req.body;
    const updatedProduct = await pool.query(
      "UPDATE products SET name=$1, description=$2, in_price=$3, price=$4 WHERE id=$5 RETURNING *",
      [name, description, in_price, price, req.params.id]
    );
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
