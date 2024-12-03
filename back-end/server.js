const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
require("dotenv").config();

const app = express();

const PATH = path.join(__dirname, "data/products.json");

// function to load and save 30 random products from Dummy JSON API
const LoadProducts = async () => {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    const products = data.products;

    fs.writeFile(PATH, JSON.stringify(products, null, 2), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
};

app.use(bodyParser.json());
app.use(cors());
// app.use(logger);

app.use("/", productRoutes);
app.use("/users", userRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "404 - Route not found" });
});

app.use(errorHandler);

// load products and start server
LoadProducts().then(() => {
  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
});
