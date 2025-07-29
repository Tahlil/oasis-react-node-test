import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isCartOpen: false },
  reducers: {
    addToCart(state, action) {
      const { productId, selectedAttributes, quantity, product } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, selectedAttributes, quantity, product });
      }
    },
    incrementQty(state, action) {
      const item = state.items.find(item => item.productId === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty(state, action) {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(item => item.productId !== action.payload);
      }
    },
    clearCart(state) {
      state.items = [];
      state.isCartOpen = false;
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
  },
});

export const { addToCart, incrementQty, decrementQty, clearCart, toggleCart, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;