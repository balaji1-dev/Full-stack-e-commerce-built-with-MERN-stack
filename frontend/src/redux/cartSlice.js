import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    return [];
  }
};

// Calculate initial totals from loaded items
const loadedItems = loadCartFromStorage();
let initialTotalQuantity = 0;
let initialTotalPrice = 0;

loadedItems.forEach(item => {
  initialTotalQuantity += item.quantity;
  initialTotalPrice += item.totalPrice;
});

const initialState = {
  items: loadedItems,
  totalPrice: initialTotalPrice,
  totalQuantity: initialTotalQuantity
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          _id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          stock: newItem.stock,
          quantity: 1,
          totalPrice: newItem.price
        });
      }
      
      state.totalQuantity++;
      state.totalPrice += newItem.price;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter(item => item._id !== id);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      
      if (existingItem && quantity > 0 && quantity <= existingItem.stock) {
        state.totalQuantity = state.totalQuantity - existingItem.quantity + quantity;
        state.totalPrice = state.totalPrice - existingItem.totalPrice + (existingItem.price * quantity);
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;