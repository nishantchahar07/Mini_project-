const pkg = require("pg");
require('dotenv').config();
let pool;
if (process.env.DATABASE_URL) {
    pool = new pkg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
}
module.exports = pool;