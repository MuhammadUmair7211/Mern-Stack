import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	showSideBar: false,
};
const uiSliceReducer = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		toggleSideBar: (state) => {
			state.showSideBar = !state.showSideBar;
		},
	},
});

export const { toggleSideBar } = uiSliceReducer.actions;
export default uiSliceReducer.reducer;
