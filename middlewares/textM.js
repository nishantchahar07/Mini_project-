const pool = require("../db/db");

async function checkTextTable(req, res, next) {
  try {
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
    next();
  } catch (err) {
    console.error("Error creating products table:", err);
  }
}
module.exports = checkTextTable;
