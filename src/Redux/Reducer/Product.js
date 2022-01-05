import { createSlice } from "@reduxjs/toolkit";
const initialProductState = {
  products: [],
  productDetail: null,
  productPerPage: [],
  currentPage: null,
};
const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
      state.currentPage = 1;
      productPerPage(state);
    },
    getProductByPage(state, action) {
      state.currentPage = action.payload;

      productPerPage(state);
    },
    getProductById(state, action) {
      const id = Number(action.payload);
      const product = state.products.find((prod) => prod.id === id);
      state.productDetail = product;
    },
  },
});

const productPerPage = (state) => {
  const indexOfLastPost = state.currentPage * 8;
  const indexOfFirstPost = indexOfLastPost - 8;
  state.productPerPage = state.products.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
};

export const productActions = productSlice.actions;
export default productSlice.reducer;
