const { Pool } = require("pg");
require("dotenv").config();

// NeonDB-optimized configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/fakturera",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 30000, // 30 seconds for NeonDB
  idleTimeoutMillis: 60000, // 60 seconds
  max: 3, // Lower pool size for NeonDB free tier
  min: 0, // Allow pool to scale down to 0
  acquireTimeoutMillis: 30000, // Time to wait for connection from pool
  createTimeoutMillis: 30000, // Time to wait for new connection
  destroyTimeoutMillis: 5000,
  reapIntervalMillis: 1000,
  createRetryIntervalMillis: 200,
});

// Test the database connection
pool.on('connect', (client) => {
  console.log('✅ Connected to NeonDB (Pool)');
});

pool.on('error', (err, client) => {
  console.error('❌ Database pool error:', err.message);
});

pool.on('acquire', (client) => {
  console.log('🔄 Client acquired from pool');
});

pool.on('remove', (client) => {
  console.log('♻️  Client removed from pool');
});

module.exports = pool;
