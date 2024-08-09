import React from "react";
import GlobalContext from "../src/Hooks/GlobalContext";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

//Pages
import Home from "../src/Pages/Home";
import AllProducts from "../src/Pages/AllProducts";
import Login from "../src/Pages/Login";
import Categories from "../src/Pages/Categories";
import Category from "../src/Pages/Category";
import Product from "../src/Pages/Product";
import About from "../src/Pages/About";
import NotFound from "../src/Pages/NotFound";
import Rules from "../src/Pages/Conditions";
import Cart from "../src/Pages/Cart";
import Favorites from "../src/Pages/Favorites";
import Register from "./Pages/Register";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";

const API_URL = "http://localhost:3500/products";

function App() {
  const [storeProducts, setStoreProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [whatToShowInSidebar, setWhatToShowInSidebar] = useState("");
  const [categories, setCategories] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState("");
  // Local Storage for Cart and Favorite Items & Login
  const [itemsInCart, setItemsInCart] = useState(
    JSON.parse(localStorage.getItem("cartItems"))
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const [itemsInFav, setItemsInFav] = useState(
    JSON.parse(localStorage.getItem("favItems"))
      ? JSON.parse(localStorage.getItem("favItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(itemsInCart));
  }, [itemsInCart]);

  useEffect(() => {
    localStorage.setItem("favItems", JSON.stringify(itemsInFav));
  }, [itemsInFav]);

  //  Functions for adding and deleting items to and from cart and favorites
  const addToCart = (id) => {
    !itemsInCart.some((el) => el.id === id) &&
      setItemsInCart([...itemsInCart, { id, Qty: 1 }]);
  };
  const addToFav = (id) => {
    !itemsInFav.includes(id) && setItemsInFav([...itemsInFav, id]);
  };
  const RemoveFromCart = (id) =>
    setItemsInCart(itemsInCart.filter((el) => el.id !== id));

  const RemoveFromFav = (id) =>
    setItemsInFav(itemsInFav.filter((el) => el !== id));
  //-------------------------------------------------------------------

  //Read Products data to storeProducts array
  const loadAllProducts = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const fetchProducts = async () => {
    try {
      const allProducts = await loadAllProducts();
      setStoreProducts(allProducts);
    } catch (error) {
      console.error("Can't load products!");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (storeProducts.length > 0) {
      //set categories for category pages
      const categoriesArray = storeProducts.map((el) => ({
        name: el.category,
        thumbnail: el.thumbnail,
      }));

      const uniqueArray = categoriesArray.filter((obj, index) => {
        return index === categoriesArray.findIndex((o) => obj.name === o.name);
      });

      setCategories([...uniqueArray]);
    }
  }, [storeProducts]);

  return (
    <div>
      <GlobalContext.Provider
        value={{
          storeProducts,
          setStoreProducts,
          addToCart,
          addToFav,
          showSidebar,
          setShowSidebar,
          whatToShowInSidebar,
          setWhatToShowInSidebar,
          itemsInCart,
          setItemsInCart,
          itemsInFav,
          RemoveFromCart,
          RemoveFromFav,
          categories,
          loggedIn,
          setLoggedIn,
          accessToken,
          setAccessToken,
          fetchProducts,
          userName,
          setUserName,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="allproducts" element={<AllProducts />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/addProduct"
              element={<ProtectedRoute element={AddProduct} />}
            />
            <Route
              path="/updateProduct/:id"
              element={<ProtectedRoute element={UpdateProduct} />}
            />
            <Route
              path="/deleteProduct/:id"
              element={<ProtectedRoute element={Product} />}
            />
            {/* <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            <Route path="/deleteProduct/:id" element={<DeleteProduct />} /> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
