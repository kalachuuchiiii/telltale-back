const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDb } = require('./lib/database.js');
const { router } = require("./router/router.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.ORIGIN_URL || "http://localhost:5173",
  credentials: true
}))

app.use("/api", router);

const PORT = process.env.PORT || 8080;



connectDb().then(() => {
  app.listen(PORT, () => {
})
}).catch((e) => {
})

module.exports = app;
