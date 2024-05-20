import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./components/Pages/Shop";
import ShopCategory from "./components/Pages/ShopCategory";
import Product from "./components/Pages/Product";
import Cart from "./components/Pages/Cart";
import LoginSignup from "./components/Pages/LoginSignup";
import { Footer } from "./components/Footer/Footer";
import men_banner from "./components/Assets/banner_mens.png";
import women_banner from "./components/Assets/banner_women.png";
import kid_banner from "./components/Assets/banner_kids.png";
import Item from "./components/Item/Item";
import { NewCollections } from "./components/NewCollections/NewCollections";
import { CartItems } from "./components/CartItems/CartItems";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/tops"
            element={<ShopCategory banner={kid_banner} category="top" />}
          />
          <Route
            path="/bottoms"
            element={<ShopCategory banner={kid_banner} category="bottom" />}
          />
          <Route
            path="/accessories"
            element={<ShopCategory banner={kid_banner} category="accessorie" />}
          />
          <Route path="/Item" element={<Item />} />
          <Route path="/NewCollections" element={<NewCollections />} />
          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
