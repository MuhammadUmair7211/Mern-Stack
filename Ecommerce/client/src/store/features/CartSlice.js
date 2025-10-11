import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	cartItems: [],
};
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItemsToCart: (state, action) => {
			const item = action.payload;
			const existingItem = state.cartItems.find(
				(cartItem) => cartItem._id === item._id
			);

			if (existingItem) {
				existingItem.quantity += item.quantity;
			} else {
				state.cartItems.push({ ...item, quantity: item.quantity || 1 });
			}
		},
		removeItemsFromCart: (state, action) => {
			const id = action.payload;
			if (id) {
				state.cartItems = state.cartItems.filter((items) => items._id !== id);
			}
		},
	},
});
export const { addItemsToCart, removeItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;
