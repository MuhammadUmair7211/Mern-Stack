import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSliceReducer";
import productReducer from "./features/productSlice";
import cartReducer from "./features/CartSlice";
export const store = configureStore({
	reducer: {
		ui: uiReducer,
		product: productReducer,
		cart: cartReducer,
	},
});
