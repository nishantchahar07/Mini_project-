const { Client } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const defaultUsers = [
  {
    email: "admin@fakturera.com",
    password: "admin123",
    role: "admin"
  },
  {
    email: "user@demo.com", 
    password: "demo123",
    role: "user"
  },
  {
    email: "test@test.com",
    password: "test123", 
    role: "user"
  }
];

async function createUsers() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });

  try {
    console.log("🔄 Connecting to database...");
    await client.connect();
    console.log("✅ Connected successfully!");

    console.log("🔄 Creating default users...");
    
    for (const user of defaultUsers) {
      // Check if user already exists
      const existingUser = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [user.email]
      );
      
      if (existingUser.rows.length > 0) {
        console.log(`⚠️  User ${user.email} already exists, skipping...`);
        continue;
      }
      
      // Hash password
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
      
      // Insert user
      await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [user.email, hashedPassword]
      );
      
      console.log(`✅ Created user: ${user.email} (password: ${user.password})`);
    }

    console.log("🎉 User creation completed!");
    console.log("\n📝 Login credentials:");
    defaultUsers.forEach(user => {
      console.log(`   Email: ${user.email} | Password: ${user.password}`);
    });

  } catch (err) {
    console.error("❌ Error creating users:", err.message);
  } finally {
    await client.end();
  }
}

createUsers();