import { productActions } from "../Reducer/Product";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    );
    if (!response.ok) {
      throw new Error("Could not fetch products data!");
    }
    const apiData = await response.json();

    dispatch(productActions.getProducts(apiData));
  } catch (err) {
    console.log(err);
  }
};
