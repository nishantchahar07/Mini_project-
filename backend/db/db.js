const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/fakturera",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 60000,
  max: 3,
  min: 0,
  acquireTimeoutMillis: 30000,
  createTimeoutMillis: 30000,
  destroyTimeoutMillis: 5000,
  reapIntervalMillis: 1000,
  createRetryIntervalMillis: 200,
});

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
