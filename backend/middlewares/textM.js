const pool = require("../db/db");

let tableChecked = false;

async function checkTextTable(req, res, next) {
  if (tableChecked) {
    return next();
  }

  try {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
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
        
        console.log("✅ Texts table checked/created successfully");
        tableChecked = true;
        break;
        
      } catch (retryErr) {
        attempt++;
        if (attempt < maxRetries) {
          console.log(`Retrying table creation (attempt ${attempt + 1}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw retryErr;
        }
      }
    }
    
    next();
  } catch (err) {
    console.error("❌ Error creating texts table:", err.message);
    next();
  }
}

module.exports = checkTextTable;
