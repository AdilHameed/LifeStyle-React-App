import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Reducer/Product";
import authReducer from "./Reducer/Auth";
import cartReducer from "./Reducer/Cart";
import searchReducer from "./Reducer/Search";
const store = configureStore({
  reducer: { productReducer, authReducer, cartReducer, searchReducer },
});

export default store;
