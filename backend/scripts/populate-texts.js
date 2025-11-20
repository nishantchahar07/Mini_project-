const { Client } = require("pg");
require("dotenv").config();

const translations = {
  // Header/Navigation
  home: { en: "Home", sv: "Hem" },
  order: { en: "Order", sv: "Beställ" },
  ourCustomers: { en: "Our Customers", sv: "Våra Kunder" },
  aboutUs: { en: "About us", sv: "Om oss" },
  contactUs: { en: "Contact Us", sv: "Kontakta oss" },
  
  // Login Page
  login: { en: "Log in", sv: "Logga in" },
  usernameLabel: { en: "Email Address", sv: "Skriv in din epost adress" },
  usernamePlaceholder: { en: "Enter your email address", sv: "Epost adress" },
  passwordLabel: { en: "Password", sv: "Skriv in ditt lösenord" },
  passwordPlaceholder: { en: "Enter your password", sv: "Lösenord" },
  register: { en: "Register", sv: "Registrera dig" },
  forgotPassword: { en: "Forgotten password?", sv: "Glömt lösenord?" },
  
  // Register Page
  registerTitle: { en: "Register", sv: "Registrera dig" },
  businessName: { en: "Business Name", sv: "Företagsnamn" },
  businessNamePlaceholder: { en: "Enter business name", sv: "Ange företagsnamn" },
  contactPerson: { en: "Contact Person", sv: "Kontaktperson" },
  contactPersonPlaceholder: { en: "Enter contact person", sv: "Ange kontaktperson" },
  address: { en: "Address", sv: "Adress" },
  addressPlaceholder: { en: "Enter address", sv: "Ange adress" },
  postalCode: { en: "Postal Code", sv: "Postnummer" },
  postalCodePlaceholder: { en: "Enter postal code", sv: "Ange postnummer" },
  city: { en: "City", sv: "Stad" },
  cityPlaceholder: { en: "Enter city", sv: "Ange stad" },
  email: { en: "Email", sv: "Epost" },
  emailPlaceholder: { en: "Enter email", sv: "Ange epost" },
  phone: { en: "Phone", sv: "Telefon" },
  phonePlaceholder: { en: "Enter phone", sv: "Ange telefon" },
  password: { en: "Password", sv: "Lösenord" },
  passwordPlaceholder2: { en: "Enter password", sv: "Ange lösenord" },
  agreeToTerms: { en: "I agree to the Terms of Service", sv: "Jag godkänner användarvillkoren" },
  createAccount: { en: "Create Account", sv: "Skapa konto" },
  alreadyHaveAccount: { en: "Already have an account? Log in", sv: "Har du redan ett konto? Logga in" },
  
  // Terms Page
  termsTitle: { en: "Terms of Service", sv: "Användarvillkor" },
  termsContent1: { en: "Welcome to our service. These terms and conditions outline the rules and regulations for the use of our website and services.", sv: "Välkommen till vår tjänst. Dessa användarvillkor beskriver reglerna för användning av vår webbplats och våra tjänster." },
  termsContent2: { en: "By accessing this website, we assume you accept these terms and conditions. Do not continue to use our website if you do not agree to take all of the terms and conditions stated on this page.", sv: "Genom att använda denna webbplats accepterar du dessa villkor. Fortsätt inte att använda vår webbplats om du inte accepterar alla villkor som anges på denna sida." },
  termsContent3: { en: "The following terminology applies to these terms and conditions: 'Company' refers to our organization, 'you' refers to the user of this website, 'service' refers to the software and associated services we provide.", sv: "Följande terminologi gäller för dessa villkor: 'Företag' avser vår organisation, 'du' avser användaren av denna webbplats, 'tjänst' avser programvaran och tillhörande tjänster vi tillhandahåller." },
  closeAndGoBack: { en: "Close and Go Back", sv: "Stäng och gå tillbaka" },
  
  // Pricelist Page
  pricelistTitle: { en: "Product Pricelist", sv: "Produktprislista" },
  addProduct: { en: "Add Product", sv: "Lägg till produkt" },
  logout: { en: "Logout", sv: "Logga ut" },
  noProducts: { en: "No products yet", sv: "Inga produkter ännu" },
  addFirstProduct: { en: "Add your first product to get started", sv: "Lägg till din första produkt för att komma igång" },
  productName: { en: "Product name", sv: "Produktnamn" },
  sellingPrice: { en: "Selling price", sv: "Försäljningspris" },
  costPrice: { en: "Cost price", sv: "Inköpspris" },
  unit: { en: "Unit", sv: "Enhet" },
  description: { en: "Description", sv: "Beskrivning" },
  cancel: { en: "Cancel", sv: "Avbryt" },
  adding: { en: "Adding...", sv: "Lägger till..." },
  edit: { en: "Edit", sv: "Redigera" },
  delete: { en: "Delete", sv: "Ta bort" },
  
  // Pricelist specific texts
  searchArticle: { en: "Search Article No...", sv: "Sök artikelnummer..." },
  searchProduct: { en: "Search Product...", sv: "Sök produkt..." },
  newProduct: { en: "New Product", sv: "Ny produkt" },
  printList: { en: "Print List", sv: "Skriv ut lista" },
  advancedMode: { en: "Advanced mode", sv: "Avancerat läge" },
  articleNo: { en: "Article No.", sv: "Artikel nr." },
  productService: { en: "Product/Service", sv: "Produkt/Tjänst" },
  inPrice: { en: "In Price", sv: "Inköpspris" },
  price: { en: "Price", sv: "Pris" },
  inStock: { en: "In Stock", sv: "I lager" },
  saving: { en: "Saving...", sv: "Sparar..." },
  saved: { en: "Saved!", sv: "Sparat!" },
  
  // Footer
  footerCopyright: { en: "© Lättfaktura, CRO no. 638537, 2025. All rights reserved.", sv: "© Lättfaktura, CRO nr. 638537, 2025. Alla rättigheter förbehålls." },
  footerBrand: { en: "123 Fakturera", sv: "123 Fakturera" }
};

async function populateTexts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  });

  try {
    console.log("🔄 Connecting to database...");
    await client.connect();
    console.log("✅ Connected successfully!");

    console.log("🔄 Clearing existing texts...");
    await client.query("DELETE FROM texts");

    console.log("🔄 Inserting translations...");
    let insertedCount = 0;

    for (const [key, languages] of Object.entries(translations)) {
      // Determine the page based on the key
      let page = 'general';
      if (['home', 'order', 'ourCustomers', 'aboutUs', 'contactUs'].includes(key)) {
        page = 'header';
      } else if (['login', 'usernameLabel', 'usernamePlaceholder', 'passwordLabel', 'passwordPlaceholder', 'register', 'forgotPassword'].includes(key)) {
        page = 'login';
      } else if (['registerTitle', 'businessName', 'businessNamePlaceholder', 'contactPerson', 'contactPersonPlaceholder', 'address', 'addressPlaceholder', 'postalCode', 'postalCodePlaceholder', 'city', 'cityPlaceholder', 'email', 'emailPlaceholder', 'phone', 'phonePlaceholder', 'password', 'passwordPlaceholder2', 'agreeToTerms', 'createAccount', 'alreadyHaveAccount'].includes(key)) {
        page = 'register';
      } else if (['termsTitle', 'termsContent1', 'termsContent2', 'termsContent3', 'closeAndGoBack'].includes(key)) {
        page = 'terms';
      } else if (['pricelistTitle', 'addProduct', 'logout', 'noProducts', 'addFirstProduct', 'productName', 'sellingPrice', 'costPrice', 'unit', 'description', 'cancel', 'adding', 'edit', 'delete', 'searchArticle', 'searchProduct', 'newProduct', 'printList', 'advancedMode', 'articleNo', 'productService', 'inPrice', 'price', 'inStock', 'saving', 'saved'].includes(key)) {
        page = 'pricelist';
      } else if (['footerCopyright', 'footerBrand'].includes(key)) {
        page = 'footer';
      }

      // Insert English version
      await client.query(
        "INSERT INTO texts (page, key, lang, content) VALUES ($1, $2, $3, $4)",
        [page, key, 'en', languages.en]
      );
      insertedCount++;

      // Insert Swedish version
      await client.query(
        "INSERT INTO texts (page, key, lang, content) VALUES ($1, $2, $3, $4)",
        [page, key, 'sv', languages.sv]
      );
      insertedCount++;
    }

    console.log(`✅ Successfully inserted ${insertedCount} text entries!`);
    console.log("🎉 Text population completed!");

  } catch (err) {
    console.error("❌ Error populating texts:", err.message);
  } finally {
    await client.end();
  }
}

populateTexts();