const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", require("./controllers/auth.controller"));
app.use("/api/products", require("./controllers/products.controller"));
app.use("/api/texts", require("./controllers/text.controller"));
app.use("/api/user", require("./controllers/user.controller"));
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
