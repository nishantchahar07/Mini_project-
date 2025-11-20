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
  termsTitle: { en: "Terms", sv: "Villkor" },
  termsFullContent: { 
    en: `BY clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.

You can use the program FOR FREE for 14 days.

123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.

You have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.

If we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.

Billing is for one year at a time.

The price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year's use of the program.

(When using the offer price of SEK 99, the one-year period is calculated from registration.)

All prices are excluding. VAT.

Offer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.

Intermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.

The annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.

The introductory offer (SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time befo

If you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.

License for the use of 123 Fakturera is of course sold in accordance with applicable laws.

In order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.

In connection with the storage of information, the law requires that we provide you with the following information:

If you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don't want to be contacted, just send us an email about it.

You can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.

For natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like, and tell others that you are customer. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the sourc

You of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us here. The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profilin

If you wish to contact us, please use the information on this website.

Click on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)

Our experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.

Have a great day!`, 
    sv: `GENOM att klicka på Fakturera Nu väljer du att registrera dig enligt den information du har skrivit in och texten på registreringssidan och villkoren här, och du accepterar samtidigt villkoren här.

Du kan använda programmet GRATIS i 14 dagar.

123 Fakturera är så enkelt och självförklarande att chansen att du behöver support är minimal, men om du skulle behöva support finns vi här för dig, med vårt kontor bemannat större delen av dagen. Efter provperioden fortsätter prenumerationen och kostar 99 SEK exklusive moms per månad, som faktureras årligen. Om du inte vill behålla programmet, säg bara upp provperioden genom att säga upp innan 14 dagar från registreringen.

Du har naturligtvis rätt att avsluta användningen av programmet utan några kostnader, genom att meddela oss via e-post innan 14 dagar från registreringen att du inte vill fortsätta med programmet, och då betalar du naturligtvis ingenting.

Om vi inte får ett sådant meddelande från dig innan 14 dagar från registreringen kan beställningen av naturliga skäl inte ändras. Med registrering menas datum och tid då du valde att trycka på knappen Fakturera Nu.

Fakturering sker för ett år i taget.

Priset för 123 Fakturera (erbjudandepris 99 SEK per månad / ordinarie pris 159 SEK per månad) gäller årsavgiften Start för ett års användning av programmet.

(Vid användning av erbjudandepriset 99 SEK beräknas ettårsperioden från registreringen.)

Alla priser är exklusive moms.

Erbjudande, Lagerkontroll, Medlemsfakturering, Fleranvändarversion och engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.

Förmedling, såväl som fakturering, kan ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. I framtiden kan vi välja att samarbeta med ett annat företag för t.ex. förmedling och fakturering. Kundrelationen är dock med oss. Betalningen görs till det företag som fakturan kommer från.

Årsavgiften löper kontinuerligt, men om du inte vill fortsätta använda programmet behöver du bara säga upp trettio dagar innan nästa ettårsperiod börjar.

Introduktionserbjudandet (99 SEK per månad) gäller årsavgiften Start för det första året. Efter det första året faktureras ordinarie pris, som för närvarande är, för årsavgift Start, etthundrafemtio kroner per månad, för årsavgift Fjärrkontroll, trehundra kroner per månad och för årsavgift Pro, trehundratrettiotre kroner per månad. Efter ett år faktureras årsavgiften Fjärrkontroll som standard, men du kan välja Start eller Pro genom att säga upp när som helst före

Om du väljer att behålla programmet genom att inte meddela oss via e-post inom 14 dagar från registreringen att du inte vill fortsätta med programmet, accepterar du att du kommer att betala fakturan för din beställning. Underlåtenhet att betala fakturan eller sen betalning ger inte rätt att annullera beställningen. Vi hjälper gärna till med logotyp till självkostnadspris.

Licens för användning av 123 Fakturera säljs naturligtvis i enlighet med gällande lagar.

För att kunna hjälpa dig enklare och ge dig support, samt för att följa lagarna, måste vi av naturliga skäl lagra din information.

I samband med lagring av information kräver lagen att vi ger dig följande information:

Om du beställer som privatperson har du rätt att ångra dig enligt lag. Din information lagras så att vi kan hjälpa dig, etc. Vi kommer att använda den för att kunna hjälpa dig om du behöver hjälp, följa lagarna om bokföring, etc. När det finns uppgraderingar och liknande kan vi skicka dig erbjudanden och liknande om våra produkter och tjänster via e-post eller liknande. Du kan kontaktas via e-post, post och telefon. Om du inte vill bli kontaktad, skicka bara ett e-postmeddelande till oss om det.

Du kan när som helst be att inte få information om uppgraderingar via e-post, brev eller liknande, och det kommer vi naturligtvis inte att göra. Du skickar en sådan begäran till oss via e-post, post eller liknande.

Av naturliga skäl måste vi lagra, bearbeta och flytta dina data. Din information lagras tills vidare. Du ger oss tillstånd att lagra, bearbeta och flytta dina data, samt att skicka dig erbjudanden och liknande via e-post, brev och liknande, och berätta för andra att du är kund. På grund av hur det fungerar med programvara måste tillstånd också ges till andra parter. Tillståndet ges därför till oss, såväl som till de företag och/eller personer som äger programvaran, källkoden

Du har naturligtvis rätt att begära tillgång till, ändring och radering av den information vi har om dig. Du har också rätt att begära begränsning av databehandling, och att invända mot databehandling och rätten till dataportabilitet. Du har rätt att klaga till tillsynsmyndigheten. Du kan hitta mer juridisk information om oss här. Irlands lagar är tillämpliga lagar. Att lägga en beställning är naturligtvis helt frivilligt. Naturligtvis använder vi ingen automatiserad profilering

Om du vill kontakta oss, använd informationen på denna webbplats.

Klicka på Fakturera Nu för att registrera dig enligt den information du har angett och villkoren här. (Datum och tid för antagning anges automatiskt i våra register.)

Vår erfarenhet är att våra kunder är mycket nöjda med hur vi arbetar och hoppas och tror att detta också kommer att vara din upplevelse.

Ha en bra dag!`
  },
  closeAndGoBack: { en: "Close and Go Back", sv: "Stäng och gå tillbaka" },
  
  // Trial/Promotional Content
  trialText: { 
    en: `You can use and try 123 Fakturera for free for 14 days.

This is a true full-version, so you can send out 1000 invoices or more, for free.

123 Fakturera is so easy and self-explanatory that the chance that you will need help is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from today.

Click Invoice Now to start invoicing. Your first invoice is normally ready to be sent in 5 - 10 minutes.`,
    sv: `Du kan använda och testa 123 Fakturera gratis i 14 dagar.

Detta är en komplett version, så du kan skicka ut 1000 fakturor eller fler, gratis.

123 Fakturera är så enkelt och självförklarande att chansen att du behöver hjälp är minimal, men om du skulle behöva support finns vi här för dig, med vårt kontor bemannat större delen av dagen. Efter provperioden fortsätter prenumerationen och kostar 99 SEK exklusive moms per månad, som faktureras årligen. Om du inte vill behålla programmet, säg bara upp provperioden genom att säga upp innan 14 dagar från idag.

Klicka på Fakturera Nu för att börja fakturera. Din första faktura är normalt klar att skickas inom 5 - 10 minuter.`
  },
  invoiceNow: { en: "Invoice Now", sv: "Fakturera Nu" },
  
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
      } else if (['registerTitle', 'businessName', 'businessNamePlaceholder', 'contactPerson', 'contactPersonPlaceholder', 'address', 'addressPlaceholder', 'postalCode', 'postalCodePlaceholder', 'city', 'cityPlaceholder', 'email', 'emailPlaceholder', 'phone', 'phonePlaceholder', 'password', 'passwordPlaceholder2', 'agreeToTerms', 'createAccount', 'alreadyHaveAccount', 'trialText', 'invoiceNow'].includes(key)) {
        page = 'register';
      } else if (['termsTitle', 'termsFullContent', 'closeAndGoBack'].includes(key)) {
        page = 'terms';
      } else if (['pricelistTitle', 'addProduct', 'logout', 'noProducts', 'addFirstProduct', 'productName', 'sellingPrice', 'costPrice', 'unit', 'description', 'cancel', 'adding', 'edit', 'delete', 'searchArticle', 'searchProduct', 'newProduct', 'printList', 'advancedMode', 'articleNo', 'productService', 'inPrice', 'price', 'inStock', 'saving', 'saved'].includes(key)) {
        page = 'pricelist';
      }

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