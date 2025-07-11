// client/src/App.jsx
import React from "react";
import { useAppContext } from "./context/AppContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import SellerLogin from "./components/seller/SellerLogin.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import SellerLayout from "./pages/seller/SellerLayout.jsx";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Fotter.jsx";
import Login from "./components/Login.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ProductCategory from "./pages/ProductCategory.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import AddAddress from "./pages/AddAddress.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import AddProduct from "./pages/seller/AddProduct.jsx";
import Orders from "./pages/seller/Orders.jsx";
import ProductList from "./pages/seller/ProductList.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";


const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogins, isSeller} = useAppContext();

  return (
    <div className="text-default text-gray-700 bg-white min-h-screen">
      <div>
        {isSellerPath ? null : <Navbar/>}
        {showUserLogins ? <Login/> : null}

        <Toaster/>

        <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />

            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />


            <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin />}>

            <Route index element = {isSeller ? <AddProduct/> : null} />
            <Route path="product-list" element = {<ProductList/> } />
            <Route path="orders" element = {<Orders/>} />

            </Route>

          </Routes>
        </div>
      </div>
    {!isSellerPath && <Footer/>}
    </div>
  );
};

export default App;
