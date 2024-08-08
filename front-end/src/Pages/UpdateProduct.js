import React, { useState, useContext, useEffect } from "react";
import Layout from "../Components/Layout";
import GlobalContext from "../Hooks/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { accessToken, storeProducts, fetchProducts } =
    useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const { id } = useParams();
  const API_URL = "http://localhost:3500/products";
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  useEffect(() => {
    const tempProduct = storeProducts.find((el) => el.id === id * 1);
    setProduct(tempProduct);
  }, [storeProducts]);

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
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
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
      setMessage("Product updated successfully!");
      fetchProducts();
      navigate("/");
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Failed to add product.");
    }
  };

  return (
    <>
      {product ? (
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
                <h3>Update Product</h3>
                {message && (
                  <div
                    className={`mt-3 alert ${
                      messageType === "success"
                        ? "alert-success"
                        : "alert-danger"
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

                <div className="my-3">
                  <label htmlFor="images" className="form-label">
                    <strong>Images (comma separated URLs)</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="images"
                    name="images"
                    value={product.images}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        images: e.target.value
                          .split(",")
                          .map((img) => img.trim()),
                      })
                    }
                    required
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="thumbnail" className="form-label">
                    <strong>Thumbnail URL</strong>
                  </label>
                  <textarea
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
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </Layout>
          :
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UpdateProduct;
