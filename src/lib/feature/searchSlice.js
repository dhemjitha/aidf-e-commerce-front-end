import { createSlice } from "@reduxjs/toolkit";
 
 const initialState = {
   value: "",
 };
 
 export const searchSlice = createSlice({
   name: "search",
   initialState,
   reducers: {
     submit: (state, action) => {
       state.value = action.payload;
     },
   },
 });
 
 export const { submit } = searchSlice.actions;
 
 export default searchSlice.reducer;