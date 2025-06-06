import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./feature/userSlice";
import { api } from "./api";
import searchReducer from "./feature/searchSlice";
import wishlistReducer from "./feature/wishlistSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer,
        search: searchReducer,
        wishlist: wishlistReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);