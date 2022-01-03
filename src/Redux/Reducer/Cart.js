import { createSlice } from "@reduxjs/toolkit";
const initialCartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addRemoveItem(state, action) {
      const newItem = action.payload.product;
      const quantity = action.payload.quantity;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        addNewItemToCart(state, newItem, quantity);
      }
    },
    incrementItem(state, action) {
      const id = action.payload;
      incrementItemQuantityInCart(state, id);
    },
    decrementItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        removeExistingItemFromCart(state, existingItem);
      } else {
        decrementItemQuantityInCart(state, id);
        state.totalAmount = state.totalAmount - existingItem.price;
      }
    },
  },
});

//Required function in cart
const addNewItemToCart = (state, newItem, quantity) => {
  const currentItemPrice = Number(newItem.price);
  state.items.push({
    id: newItem.id,
    name: newItem.name,
    img: newItem.image_link,
    quantity,
    price: currentItemPrice,
    totalPrice: currentItemPrice * quantity,
  });
  state.totalAmount = state.totalAmount + currentItemPrice * quantity;
  state.totalQuantity = state.totalQuantity + 1;
};

const removeExistingItemFromCart = (state, existingItem) => {
  state.items = state.items.filter((item) => item.id !== existingItem.id);
  state.totalAmount = state.totalAmount - existingItem.totalPrice;
  state.totalQuantity = state.totalQuantity - 1;
};

const incrementItemQuantityInCart = (state, id) => {
  state.items = state.items.map((item) => {
    if (item.id === id) {
      item.quantity++;
      item.totalPrice = item.totalPrice + item.price;
    }
    return item;
  });
  const existingItem = state.items.find((item) => item.id === id);
  state.totalAmount = state.totalAmount + existingItem.price;
};

const decrementItemQuantityInCart = (state, id) => {
  state.items = state.items.map((item) => {
    if (item.id === id) {
      item.quantity--;
      item.totalPrice = item.totalPrice - item.price;
    }
    return item;
  });
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
