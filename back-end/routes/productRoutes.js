const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  playGames,
} = require("../controllers/ProductController");
const authenticate = require("../middlewares/authMiddleware");
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", authenticate, createProduct);
router.put("/products/:id", authenticate, updateProduct);
router.delete("/products/:id", authenticate, deleteProduct);
router.get("/playGames", playGames);


module.exports = router;
