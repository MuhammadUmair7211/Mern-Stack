import { createSlice } from "@reduxjs/toolkit";
import { dummyProductDetails } from "../../assets/assets";
const initialState = {
	products: dummyProductDetails,
};
const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			console.log(state, action);
		},
		removeProduct: (state, action) => {
			console.log(state, action);
		},
	},
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
