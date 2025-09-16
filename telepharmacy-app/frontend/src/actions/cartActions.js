import axios from 'axios';
import { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod } from '../reducers/cartReducer';

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/medications/${id}`);

  dispatch(
    addToCart({
      medication: data._id,
      name: data.name,
      image: data.images[0],
      price: data.price,
      stock: data.stock,
      qty,
    })
  );

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch(removeFromCart(id));

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressAction = (data) => (dispatch) => {
  dispatch(saveShippingAddress(data));
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethodAction = (data) => (dispatch) => {
  dispatch(savePaymentMethod(data));
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const saveDeliveryOptionAction = (data) => (dispatch) => {
  dispatch({ type: 'SAVE_DELIVERY_OPTION', payload: data });
  localStorage.setItem('deliveryOption', JSON.stringify(data));
};