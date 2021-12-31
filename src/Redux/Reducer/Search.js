import { createSlice } from "@reduxjs/toolkit";
const initialSearchState = {
  search: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    onSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
