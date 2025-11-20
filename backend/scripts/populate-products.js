const { Client } = require("pg");
require("dotenv").config();

const sampleProducts = [
  {
    name: "Professional Camera DSLR Canon EOS R5",
    description: "High-resolution mirrorless camera with 45MP sensor and 8K video recording capability",
    in_price: 2500.00,
    price: 3799.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Wireless Bluetooth Headphones Sony WH-1000XM4",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology",
    in_price: 180.00,
    price: 299.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Gaming Laptop ASUS ROG Strix G15",
    description: "15.6-inch gaming laptop with RTX 3070 and AMD Ryzen 7 processor",
    in_price: 1200.00,
    price: 1799.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Smartphone iPhone 14 Pro Max 256GB",
    description: "Latest iPhone with ProRAW photography and A16 Bionic chip",
    in_price: 850.00,
    price: 1299.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "4K Monitor Dell UltraSharp U2723QE 27-inch",
    description: "27-inch 4K USB-C hub monitor with IPS technology and color accuracy",
    in_price: 420.00,
    price: 649.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Mechanical Keyboard Logitech MX Keys",
    description: "Advanced wireless illuminated keyboard with smart backlighting",
    in_price: 65.00,
    price: 109.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Wireless Mouse Logitech MX Master 3S",
    description: "Precision mouse with ultra-fast scrolling and application-specific customization",
    in_price: 55.00,
    price: 99.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "External Hard Drive Seagate 2TB USB 3.0",
    description: "Portable external storage with fast data transfer and backup software",
    in_price: 75.00,
    price: 129.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Office Chair Herman Miller Aeron Size B",
    description: "Ergonomic office chair with PostureFit SL support and 12-year warranty",
    in_price: 800.00,
    price: 1395.00,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Standing Desk IKEA BEKANT Electric 160x80cm",
    description: "Height-adjustable desk with electric motor and memory settings",
    in_price: 320.00,
    price: 549.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Web Development Consultation Service",
    description: "Professional web development consulting and technical guidance per hour",
    in_price: 0.00,
    price: 125.00,
    unit: "hour",
    vat_rate: 25.00
  },
  {
    name: "Graphic Design Logo Package",
    description: "Complete logo design package including multiple concepts and revisions",
    in_price: 0.00,
    price: 499.99,
    unit: "project",
    vat_rate: 25.00
  },
  {
    name: "Cloud Storage Subscription Annual",
    description: "1TB cloud storage with sync across all devices and collaborative features",
    in_price: 45.00,
    price: 99.99,
    unit: "year",
    vat_rate: 25.00
  },
  {
    name: "Software License Microsoft Office 365 Business",
    description: "Annual subscription for Office suite with cloud storage and collaboration tools",
    in_price: 85.00,
    price: 149.99,
    unit: "user/year",
    vat_rate: 25.00
  },
  {
    name: "Network Router ASUS AX6000 WiFi 6",
    description: "High-performance WiFi 6 router with mesh capabilities and advanced security",
    in_price: 180.00,
    price: 299.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Video Editing Software Adobe Premiere Pro",
    description: "Professional video editing software subscription with cloud sync",
    in_price: 15.00,
    price: 22.99,
    unit: "month",
    vat_rate: 25.00
  },
  {
    name: "Tablet iPad Pro 12.9-inch 512GB WiFi",
    description: "Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support",
    in_price: 750.00,
    price: 1199.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Smartwatch Apple Watch Series 8 GPS 45mm",
    description: "Advanced health and fitness tracking with ECG and blood oxygen monitoring",
    in_price: 280.00,
    price: 429.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Webcam Logitech C920 HD Pro",
    description: "Full HD 1080p webcam with autofocus and built-in microphones",
    in_price: 45.00,
    price: 79.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Printer HP LaserJet Pro M404dn",
    description: "Monochrome laser printer with automatic duplex printing and network connectivity",
    in_price: 185.00,
    price: 299.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Server Maintenance Contract Annual",
    description: "Comprehensive server maintenance including updates, monitoring, and 24/7 support",
    in_price: 1200.00,
    price: 2499.99,
    unit: "year",
    vat_rate: 25.00
  },
  {
    name: "Database Migration Service",
    description: "Professional database migration and optimization service with testing",
    in_price: 0.00,
    price: 1999.99,
    unit: "project",
    vat_rate: 25.00
  },
  {
    name: "Security Camera System 8-Channel POE",
    description: "Complete 8-channel security system with 4K cameras and network video recorder",
    in_price: 650.00,
    price: 1099.99,
    unit: "set",
    vat_rate: 25.00
  },
  {
    name: "UPS Battery Backup APC Smart-UPS 1500VA",
    description: "Uninterruptible power supply with LCD display and energy-efficient design",
    in_price: 185.00,
    price: 329.99,
    unit: "pcs",
    vat_rate: 25.00
  },
  {
    name: "Training Course: Advanced Excel Analytics",
    description: "Comprehensive 2-day training course covering advanced Excel features and data analysis",
    in_price: 0.00,
    price: 599.99,
    unit: "course",
    vat_rate: 25.00
  }
];

async function populateProducts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });

  try {
    console.log("🔄 Connecting to database...");
    await client.connect();
    console.log("✅ Connected successfully!");

    console.log("🔄 Clearing existing products...");
    await client.query("DELETE FROM products");

    console.log("🔄 Inserting sample products...");
    let insertedCount = 0;

    for (const product of sampleProducts) {
      await client.query(
        `INSERT INTO products (name, description, in_price, price, unit, vat_rate) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          product.name,
          product.description,
          product.in_price,
          product.price,
          product.unit,
          product.vat_rate
        ]
      );
      insertedCount++;
    }

    console.log(`✅ Successfully inserted ${insertedCount} products!`);
    console.log("🎉 Product population completed!");

  } catch (err) {
    console.error("❌ Error populating products:", err.message);
  } finally {
    await client.end();
  }
}

populateProducts();