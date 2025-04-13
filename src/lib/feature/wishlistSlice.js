import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error('Failed to load wishlist from localStorage:', error);
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  } catch (error) {
    console.error('Failed to save wishlist to localStorage:', error);
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.items.find(item => item._id === action.payload._id);
      if (!itemExists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer; 