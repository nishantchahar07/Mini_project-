const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const auth = require("../middlewares/auth");

// GET /api/user/me - Get current user info
router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const result = await pool.query(
      "SELECT id, email, created_at FROM users WHERE id = $1",
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const user = result.rows[0];
    
    // Extract name and company from email for display
    const emailUser = user.email.split('@')[0];
    const emailDomain = user.email.split('@')[1];
    
    // Generate display name
    const displayName = emailUser.includes('.') 
      ? emailUser.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
      : emailUser.charAt(0).toUpperCase() + emailUser.slice(1);
    
    // Generate company name
    let companyName = 'Your Company';
    if (emailDomain === 'fakturera.com') {
      companyName = 'Fakturera AS';
    } else if (emailDomain === 'demo.com') {
      companyName = 'Demo Company';
    } else {
      companyName = emailDomain.split('.')[0].charAt(0).toUpperCase() + emailDomain.split('.')[0].slice(1) + ' AS';
    }
    
    return res.json({
      id: user.id,
      email: user.email,
      displayName,
      companyName,
      createdAt: user.created_at
    });
    
  } catch (err) {
    console.error("Get user error:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;