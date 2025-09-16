import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prescriptions: [],
  prescription: {},
  loading: false,
  error: null,
  success: false,
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    prescriptionCreateRequest: (state) => {
      state.loading = true;
    },
    prescriptionCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.prescription = action.payload;
    },
    prescriptionCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    prescriptionCreateReset: (state) => {
      state.success = false;
    },
    prescriptionListPatientRequest: (state) => {
      state.loading = true;
    },
    prescriptionListPatientSuccess: (state, action) => {
      state.loading = false;
      state.prescriptions = action.payload;
    },
    prescriptionListPatientFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    prescriptionListPharmacistRequest: (state) => {
      state.loading = true;
    },
    prescriptionListPharmacistSuccess: (state, action) => {
      state.loading = false;
      state.prescriptions = action.payload;
    },
    prescriptionListPharmacistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    prescriptionDetailsRequest: (state) => {
      state.loading = true;
    },
    prescriptionDetailsSuccess: (state, action) => {
      state.loading = false;
      state.prescription = action.payload;
    },
    prescriptionDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    prescriptionUpdateStatusRequest: (state) => {
      state.loading = true;
    },
    prescriptionUpdateStatusSuccess: (state, action) => {
      state.loading = false;
      state.prescription = action.payload;
      // Update in the list as well
      state.prescriptions = state.prescriptions.map(prescription =>
        prescription._id === action.payload._id ? action.payload : prescription
      );
    },
    prescriptionUpdateStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    prescriptionRequestRefillRequest: (state) => {
      state.loading = true;
    },
    prescriptionRequestRefillSuccess: (state, action) => {
      state.loading = false;
      state.prescription = action.payload;
      // Update in the list as well
      state.prescriptions = state.prescriptions.map(prescription =>
        prescription._id === action.payload._id ? action.payload : prescription
      );
    },
    prescriptionRequestRefillFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  prescriptionCreateRequest,
  prescriptionCreateSuccess,
  prescriptionCreateFail,
  prescriptionCreateReset,
  prescriptionListPatientRequest,
  prescriptionListPatientSuccess,
  prescriptionListPatientFail,
  prescriptionListPharmacistRequest,
  prescriptionListPharmacistSuccess,
  prescriptionListPharmacistFail,
  prescriptionDetailsRequest,
  prescriptionDetailsSuccess,
  prescriptionDetailsFail,
  prescriptionUpdateStatusRequest,
  prescriptionUpdateStatusSuccess,
  prescriptionUpdateStatusFail,
  prescriptionRequestRefillRequest,
  prescriptionRequestRefillSuccess,
  prescriptionRequestRefillFail,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;