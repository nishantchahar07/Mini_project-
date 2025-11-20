const { Client } = require("pg");
require("dotenv").config();

async function initializeDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });

  try {
    console.log("🔄 Connecting to NeonDB...");
    await client.connect();
    console.log("✅ Connected to NeonDB!");

    console.log("🔄 Initializing database tables...");

    // Create texts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS texts (
        id SERIAL PRIMARY KEY,
        page VARCHAR(50) NOT NULL,
        key VARCHAR(100) NOT NULL,
        lang VARCHAR(5) NOT NULL,
        content TEXT NOT NULL,
        UNIQUE (page, key, lang)
      );
    `);
    console.log("✅ Texts table created/verified");

    // Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        in_price NUMERIC(12,2) DEFAULT 0.00,
        price NUMERIC(12,2) DEFAULT 0.00,
        unit VARCHAR(50) DEFAULT 'pcs',
        vat_rate NUMERIC(5,2) DEFAULT 0.00,
        description TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Products table created/verified");

    // Create users table if needed
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Users table created/verified");

    console.log("🎉 Database initialization completed successfully!");
    
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message);
    
    if (err.message.includes('timeout')) {
      console.log("\n💡 NeonDB timeout issues - try these:");
      console.log("1. Check if your NeonDB project is suspended (visit Neon dashboard)");
      console.log("2. Try running: npm run test-db first");
      console.log("3. Your database might be in sleep mode - try accessing it from Neon dashboard");
      console.log("4. Check Neon's status page for outages");
    }
    
  } finally {
    try {
      await client.end();
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

initializeDatabase();