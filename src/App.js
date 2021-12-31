import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./Redux/Actions/Product";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Component/Utilities/Header";
import Login from "./Component/Utilities/Login";
import ProductList from "./Component/Products/ProductList";
import ProductDetail from "./Component/Products/ProductDetail";
import CartList from "./Component/Cart/CartList";
import NotFound from "./Component/Utilities/NotFound";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.isAuth);

  //dispatching products data
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/products" /> : <Navigate to="/login" />
          }
        />
        {!user ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<CartList />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
