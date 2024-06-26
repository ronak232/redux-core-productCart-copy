import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Blog from "./Pages/Blog";
import Shop from "./Components/Shop";
import Pages from "./Components/Pages";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer";
import Themetoggle from "./features/DarkModeToggle/Themetoggle";
import { ThemeContext } from "./hooks/context/thememode";
import { useContext } from "react";
import ProductDetails from "./Pages/ProductDetails";
import paginate from "./utils/paginate";
import LoginUser from "./Pages/Login";
import Privateroute from "./features/Privaterouting/Privateroute";
import Dashboard from "./Pages/Dashboard";
import { useFirebaseAuth } from "./hooks/context/firebase..config.jsx";

function App() {
  const theme = useContext(ThemeContext);
  const { isUserLoggedIn } = useFirebaseAuth();
  const darkMode = theme.state.darkMode;

  const [allProducts, setAllProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState(
    // Check  for the cart have items in it or not....
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );

  // filtering product based on the category
  const [cartFilter, setcartFilter] = useState([]);

  // Product Search suggestion
  const [searchBoxProductSuggestion, setSearchBoxProductSuggestion] = useState(
    []
  );

  const [productSearch, setProductSearch] = useState([]);

  const handleAddProduct = (product) => {
    const ifProductPresent = cartItems.find((item) => item.id === product.id);

    if (ifProductPresent) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ifProductPresent, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Removing item from
  const removeAddedItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  }, [cartItems]);

  // Adding Quantity of product
  // Increment the value
  const handleIncrement = (id) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 20 ? 1 : 0) }
          : item
      )
    );
  };
  const handleDecrement = (id) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
  };

  const APICall = async () => {
    await axios
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => response.data.products)
      .then((data) => {
        setAllProducts(paginate(data));
        setcartFilter(paginate(data));
        setProductSearch(data);
        setLoading(false);
        setSearchBoxProductSuggestion(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      APICall();
    }, 1500);
  }, []);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <NavBar
        count={cartItems.length}
        cartItems={cartItems}
        data={searchBoxProductSuggestion}
        loading={loading}
      />

      <Themetoggle />
      <Routes>
        <Route
          path="/"
          element={<Home handleAddProduct={handleAddProduct} />}
        />
        <Route
          path={isUserLoggedIn ? "/auth" : "/account"}
          element={isUserLoggedIn ? <Dashboard /> : <Account />}
        />
        <Route
          path="/shop"
          element={
            <Shop
              handleAddProduct={handleAddProduct}
              cartItems={cartItems}
              cartFilter={cartFilter}
              setcartFilter={setcartFilter}
              allProducts={allProducts}
              productSearch={productSearch}
              loading={loading}
            />
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pages" element={<Pages />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              onRemove={removeAddedItem}
              allProducts={allProducts}
            />
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProductDetails
              allProducts={allProducts}
              handleAddProduct={handleAddProduct}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          }
        />
        <Route path="/login" element={<LoginUser />} />
        <Route
          path="/auth"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        />
      </Routes>
      {/* </Router> */}

      {<Footer />}
    </div>
  );
}

export default App;
