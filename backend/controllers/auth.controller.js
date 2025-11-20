const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  const loginEmail = email || username;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      loginEmail,
    ]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "fallback_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  const { businessName, contactPerson, address, postal, city, email, phone, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    // Insert new user (matching the simple schema from init-db.js)
    const result = await pool.query(
      `INSERT INTO users (email, password, created_at) 
       VALUES ($1, $2, NOW()) RETURNING id, email`,
      [email, hashedPassword]
    );
    
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "fallback_secret", {
      expiresIn: "1h",
    });
    
    return res.status(201).json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email 
      } 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
