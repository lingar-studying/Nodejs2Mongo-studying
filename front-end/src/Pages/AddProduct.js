import React, { useState, useContext } from "react";
import Layout from "../Components/Layout";
import GlobalContext from "../Hooks/GlobalContext";

const API_URL = "http://localhost:3500/products";

const AddProduct = () => {
  const { accessToken, fetchProducts } = useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    images: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((tempProduct) => ({
      ...tempProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productToSubmit = {
      ...product,
      price: parseFloat(product.price),
      discountPercentage: parseFloat(product.discountPercentage),
      rating: parseFloat(product.rating),
      stock: parseInt(product.stock, 10),
    };

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productToSubmit),
      });

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product.");
      }

      const data = await response.json();
      setMessageType("success");
      setMessage("Product added successfully!");
      setProduct({
        title: "",
        description: "",
        category: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        brand: "",
        images: "",
        thumbnail: "",
      });
      fetchProducts();
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Failed to add product.");
    }
  };

  return (
    <div>
      <Layout>
        <div className="container w-50 mt-5" style={{ minHeight: "73vh" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "lightgray",
              padding: "30px 10px",
              borderRadius: "10px",
            }}
          >
            <h3>Add New Product</h3>
            {message && (
              <div
                className={`mt-3 alert ${
                  messageType === "success" ? "alert-success" : "alert-danger"
                }`}
              >
                {message}
              </div>
            )}
            <div className="my-3">
              <label htmlFor="title" className="form-label">
                <strong>Title</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="description" className="form-label">
                <strong>Description</strong>
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="category" className="form-label">
                <strong>Category</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="price" className="form-label">
                <strong>Price</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={product.price * 1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="discountPercentage" className="form-label">
                <strong>Discount Percentage</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="discountPercentage"
                name="discountPercentage"
                value={product.discountPercentage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="rating" className="form-label">
                <strong>Rating</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="rating"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="stock" className="form-label">
                <strong>Stock</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="my-3">
              <label htmlFor="tags" className="form-label">
                <strong>Tags (comma separated)</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                name="tags"
                value={product.tags}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
                required
              />
            </div> */}
            <div className="my-3">
              <label htmlFor="brand" className="form-label">
                <strong>Brand</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="my-3">
              <label htmlFor="sku" className="form-label">
                <strong>SKU</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="sku"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="weight" className="form-label">
                <strong>Weight</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                value={product.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="dimensions" className="form-label">
                <strong>Dimensions (width, height, depth)</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="dimensions"
                name="dimensions"
                value={`${product.dimensions.width},${product.dimensions.height},${product.dimensions.depth}`}
                onChange={(e) => {
                  const [width, height, depth] = e.target.value
                    .split(",")
                    .map(Number);
                  setProduct({
                    ...product,
                    dimensions: { width, height, depth },
                  });
                }}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="warrantyInformation" className="form-label">
                <strong>Warranty Information</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="warrantyInformation"
                name="warrantyInformation"
                value={product.warrantyInformation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="shippingInformation" className="form-label">
                <strong>Shipping Information</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="shippingInformation"
                name="shippingInformation"
                value={product.shippingInformation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="availabilityStatus" className="form-label">
                <strong>Availability Status</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="availabilityStatus"
                name="availabilityStatus"
                value={product.availabilityStatus}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="returnPolicy" className="form-label">
                <strong>Return Policy</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="returnPolicy"
                name="returnPolicy"
                value={product.returnPolicy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="minimumOrderQuantity" className="form-label">
                <strong>Minimum Order Quantity</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                value={product.minimumOrderQuantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="meta.barcode" className="form-label">
                <strong>Barcode</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="meta.barcode"
                name="meta.barcode"
                value={product.meta.barcode}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    meta: {
                      ...product.meta,
                      barcode: e.target.value,
                    },
                  });
                }}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="meta.qrCode" className="form-label">
                <strong>QR Code</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="meta.qrCode"
                name="meta.qrCode"
                value={product.meta.qrCode}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    meta: {
                      ...product.meta,
                      qrCode: e.target.value,
                    },
                  });
                }}
                required
              />
            </div> */}
            <div className="my-3">
              <label htmlFor="images" className="form-label">
                <strong>Images (comma separated URLs)</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="images"
                name="images"
                value={product.images}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    images: e.target.value.split(",").map((img) => img.trim()),
                  })
                }
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="thumbnail" className="form-label">
                <strong>Thumbnail URL</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="thumbnail"
                name="thumbnail"
                value={product.thumbnail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary mt-3">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default AddProduct;
