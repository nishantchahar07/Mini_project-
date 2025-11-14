const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", require("./controllers/auth.controller"));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
