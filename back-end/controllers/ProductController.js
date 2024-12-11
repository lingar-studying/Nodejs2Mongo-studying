const fs = require("fs");
const path = require("path");
const { validateProduct } = require("../utils/validator");
const {connectToMongo,connectToMongo2} = require("./dataBaseController");
const { log } = require("console");
const { addItemToDb } = require("./mongoService");
const productsFilePath = path.join(__dirname, "../data/products.json");
const archiveFilePath = path.join(__dirname, "../data/archive.json");
// const {da}

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

  connectToMongo2();
  connectToMongo();

  // fs.readFile(productsFilePath, (err, data) => {
  //   if (err)
  //     return res.status(500).json({ message: "Error reading products file" });
  //   const products = JSON.parse(data);
  //   res.json(products);
  // });
};

exports.playGamesMongoose = async (req, res) => {

  console.log("hello Mongoose");

  const mongooseTool = require("mongoose");

  mongooseTool.connect("mongodb://localhost:27017/newDB")
  .then(()=> console.log("db connected by mongoose"))
  .catch(()=> console.log("Error in mongoose connection"));

  // const userSchema = new mongoose.Schema({
  //   name: String,
  //   email: String
  // });

  const productSchema = new mongooseTool.Schema({
    name: String, 
    price: Number,
    inStock: Boolean
  });

  const product1 = {name: "mouse2", price: 60.50, inStock: true};
  const product2 = {name: "marker2", price: 5, inStock: false};

  //const User = mongoose.model('User', userSchema);
  const ProductModel = mongooseTool.model('myProducts', productSchema); 
  // const ProductModel = mongooseTool.model('product', productSchema); 

  // //const newUser = new User({
  //   name: 'John Doe',
  //   email: 'john.doe@example.com'
  // });

  // await newUser.save();
  // console.log('User Created:', newUser);


  let addProductToDb = new ProductModel([product1, product2]);

  // ProductModel.insertMany([product1, product2]);
  await addProductToDb.save(); 

  addProductToDb = new ProductModel(product2);
  await addProductToDb.save(); 


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

exports.createProductMongoDB = (req, res) => {
  const newProduct = req.body;
  const valid = validateProduct(newProduct);
  if (!valid) return res.status(400).json({ message: "Invalid product data" });

  addItemToDb(newProduct, "products");

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
