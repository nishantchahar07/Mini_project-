const pool = require("../db/db");

async function checkProductTable(req, res, next) {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,                    -- unique product ID

  name VARCHAR(150) NOT NULL,               -- product/service name
  
  in_price NUMERIC(12,2) DEFAULT 0.00,      -- purchase price (cost price)
  price NUMERIC(12,2) DEFAULT 0.00,         -- selling price

  unit VARCHAR(50) DEFAULT 'pcs',           -- unit type (optional)
  vat_rate NUMERIC(5,2) DEFAULT 0.00,       -- VAT % (optional, future-proof)
  
  description TEXT DEFAULT '',              -- free text description

  created_at TIMESTAMP DEFAULT NOW(),       -- auto timestamp
  updated_at TIMESTAMP DEFAULT NOW()        -- auto update (via trigger if needed)
);`);
    console.log("Products table checked/created successfully");
    next();
  } catch (err) {
    console.error("Error creating products table:", err);
    // Continue anyway - the table might already exist or we can handle it later
    next();
  }
}
module.exports = checkProductTable;
