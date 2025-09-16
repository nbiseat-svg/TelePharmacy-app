import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import medicationReducer from './reducers/medicationReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import prescriptionReducer from './reducers/prescriptionReducer';
import consultationReducer from './reducers/consultationReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medications: medicationReducer,
    cart: cartReducer,
    orders: orderReducer,
    prescriptions: prescriptionReducer,
    consultations: consultationReducer,
  },
});