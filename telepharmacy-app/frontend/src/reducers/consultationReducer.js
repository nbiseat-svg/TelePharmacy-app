import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  consultations: [],
  consultation: {},
  loading: false,
  error: null,
  success: false,
};

const consultationSlice = createSlice({
  name: 'consultation',
  initialState,
  reducers: {
    consultationCreateRequest: (state) => {
      state.loading = true;
    },
    consultationCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.consultation = action.payload;
    },
    consultationCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    consultationCreateReset: (state) => {
      state.success = false;
    },
    consultationListPatientRequest: (state) => {
      state.loading = true;
    },
    consultationListPatientSuccess: (state, action) => {
      state.loading = false;
      state.consultations = action.payload;
    },
    consultationListPatientFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    consultationListPharmacistRequest: (state) => {
      state.loading = true;
    },
    consultationListPharmacistSuccess: (state, action) => {
      state.loading = false;
      state.consultations = action.payload;
    },
    consultationListPharmacistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    consultationDetailsRequest: (state) => {
      state.loading = true;
    },
    consultationDetailsSuccess: (state, action) => {
      state.loading = false;
      state.consultation = action.payload;
    },
    consultationDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    consultationUpdateStatusRequest: (state) => {
      state.loading = true;
    },
    consultationUpdateStatusSuccess: (state, action) => {
      state.loading = false;
      state.consultation = action.payload;
      // Update in the list as well
      state.consultations = state.consultations.map(consultation =>
        consultation._id === action.payload._id ? action.payload : consultation
      );
    },
    consultationUpdateStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    consultationAddFeedbackRequest: (state) => {
      state.loading = true;
    },
    consultationAddFeedbackSuccess: (state, action) => {
      state.loading = false;
      state.consultation = action.payload;
      // Update in the list as well
      state.consultations = state.consultations.map(consultation =>
        consultation._id === action.payload._id ? action.payload : consultation
      );
    },
    consultationAddFeedbackFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  consultationCreateRequest,
  consultationCreateSuccess,
  consultationCreateFail,
  consultationCreateReset,
  consultationListPatientRequest,
  consultationListPatientSuccess,
  consultationListPatientFail,
  consultationListPharmacistRequest,
  consultationListPharmacistSuccess,
  consultationListPharmacistFail,
  consultationDetailsRequest,
  consultationDetailsSuccess,
  consultationDetailsFail,
  consultationUpdateStatusRequest,
  consultationUpdateStatusSuccess,
  consultationUpdateStatusFail,
  consultationAddFeedbackRequest,
  consultationAddFeedbackSuccess,
  consultationAddFeedbackFail,
} = consultationSlice.actions;

export default consultationSlice.reducer;