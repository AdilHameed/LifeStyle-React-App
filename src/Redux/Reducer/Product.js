import { createSlice } from "@reduxjs/toolkit";
const initialProductState = {
  products: [],
  productDetail: null,
};
const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
    getProductById(state, action) {
      const id = Number(action.payload);
      const product = state.products.find((prod) => prod.id === id);
      state.productDetail = product;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
