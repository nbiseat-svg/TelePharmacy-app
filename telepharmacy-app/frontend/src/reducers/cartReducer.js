import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'Credit Card',
  deliveryOption: localStorage.getItem('deliveryOption')
    ? JSON.parse(localStorage.getItem('deliveryOption'))
    : 'standard',
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      const existItem = state.cartItems.find((x) => x.medication === item.medication);
      
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.medication === existItem.medication ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.medication !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
    saveDeliveryOption: (state, action) => {
      state.deliveryOption = action.payload;
      localStorage.setItem('deliveryOption', JSON.stringify(action.payload));
    },
    cartReset: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, saveDeliveryOption, cartReset } = cartSlice.actions;

export default cartSlice.reducer;