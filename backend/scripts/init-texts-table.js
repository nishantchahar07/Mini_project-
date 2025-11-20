const pool = require("../db/db");

async function initTextsTable() {
  try {
    console.log("Creating texts table...");
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS texts (
        id SERIAL PRIMARY KEY,
        page VARCHAR(50) NOT NULL,        -- e.g., 'login', 'terms'
        key VARCHAR(100) NOT NULL,        -- e.g., 'title', 'subtitle', 'paragraph1'
        lang VARCHAR(5) NOT NULL,         -- 'en' or 'sv'
        content TEXT NOT NULL,            -- long text allowed
        UNIQUE (page, key, lang)          -- prevents duplicates
      );
    `);
    
    console.log("✅ Texts table created successfully");
  } catch (err) {
    console.error("❌ Error creating texts table:", err.message);
    throw err;
  }
}

// If this file is run directly
if (require.main === module) {
  initTextsTable()
    .then(() => {
      console.log("Texts table initialization completed");
      process.exit(0);
    })
    .catch(err => {
      console.error("Failed to initialize texts table:", err);
      process.exit(1);
    });
}

module.exports = initTextsTable;