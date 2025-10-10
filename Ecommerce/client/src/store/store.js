import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSliceReducer";
import productReducer from "./features/productSlice";
export const store = configureStore({
	reducer: {
		ui: uiReducer,
		product: productReducer,
	},
});
