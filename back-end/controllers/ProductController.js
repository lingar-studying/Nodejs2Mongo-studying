const fs = require("fs");
const path = require("path");
const { validateProduct } = require("../utils/validator");
const productsFilePath = path.join(__dirname, "../data/products.json");
const archiveFilePath = path.join(__dirname, "../data/archive.json");

exports.getProducts = (req, res) => {
  fs.readFile(productsFilePath, (err, data) => {
    if (err)
      return res.status(500).json({ message: "Error reading products file" });
    const products = JSON.parse(data);
    res.json(products);
  });
};


exports.playGames = (req, res) => {

  console.log("hello nodejs");
  // fs.readFile(productsFilePath, (err, data) => {
  //   if (err)
  //     return res.status(500).json({ message: "Error reading products file" });
  //   const products = JSON.parse(data);
  //   res.json(products);
  // });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  fs.readFile(productsFilePath, (err, data) => {
    if (err)
      return res.status(500).json({ message: "Error reading products file" });
    const products = JSON.parse(data);
    const product = products.find((p) => p.id == id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });
};

exports.createProduct = (req, res) => {
  const newProduct = req.body;
  const valid = validateProduct(newProduct);
  if (!valid) return res.status(400).json({ message: "Invalid product data" });

  fs.readFile(productsFilePath, (err, data) => {
    if (err)
      return res.status(500).json({ message: "Error reading products file" });
    const products = JSON.parse(data);
    newProduct.id = products.length + 1;
    products.push(newProduct);
    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving product" });
      res.status(201).json(newProduct);
    });
  });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;

  console.log(id, updatedProduct);

  // Read existing products
  fs.readFile(productsFilePath, (err, data) => {
    if (err)
      return res.status(500).json({ message: "Error reading products file" });

    let products = JSON.parse(data);
    const productIndex = products.findIndex((p) => p.id == id);

    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found" });

    // Merge existing product with updates
    const existingProduct = products[productIndex];
    const mergedProduct = { ...existingProduct, ...updatedProduct };

    // Validate the merged product
    if (!validateProduct(mergedProduct))
      return res.status(400).json({ message: "Invalid product data" });

    // Update the product in the array
    products[productIndex] = mergedProduct;

    // Write the updated products back to the file
    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving product" });
      res.json(products[productIndex]);
    });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  fs.readFile(productsFilePath, (err, data) => {
    if (err)
      return res.status(500).json({ message: "Error reading products file" });
    let products = JSON.parse(data);
    const productIndex = products.findIndex((p) => p.id == id);
    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found" });
    const deletedProduct = products.splice(productIndex, 1)[0];

    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving product" });

      fs.readFile(archiveFilePath, (err, data) => {
        const archive = err ? [] : JSON.parse(data);
        archive.push(deletedProduct);
        fs.writeFile(
          archiveFilePath,
          JSON.stringify(archive, null, 2),
          (err) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Error archiving product" });
            res.json(deletedProduct);
          }
        );
      });
    });
  });
};
// fetchAndSaveProducts();
