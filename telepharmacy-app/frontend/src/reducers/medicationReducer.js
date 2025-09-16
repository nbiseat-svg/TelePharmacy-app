import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  medications: [],
  medication: {},
  loading: false,
  error: null,
  page: 1,
  pages: 1,
};

const medicationSlice = createSlice({
  name: 'medication',
  initialState,
  reducers: {
    medicationListRequest: (state) => {
      state.loading = true;
    },
    medicationListSuccess: (state, action) => {
      state.loading = false;
      state.medications = action.payload.medications;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },
    medicationListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    medicationDetailsRequest: (state) => {
      state.loading = true;
    },
    medicationDetailsSuccess: (state, action) => {
      state.loading = false;
      state.medication = action.payload;
    },
    medicationDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    medicationSearchByLocationRequest: (state) => {
      state.loading = true;
    },
    medicationSearchByLocationSuccess: (state, action) => {
      state.loading = false;
      state.medications = action.payload.medications;
    },
    medicationSearchByLocationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  medicationListRequest,
  medicationListSuccess,
  medicationListFail,
  medicationDetailsRequest,
  medicationDetailsSuccess,
  medicationDetailsFail,
  medicationSearchByLocationRequest,
  medicationSearchByLocationSuccess,
  medicationSearchByLocationFail,
} = medicationSlice.actions;

export default medicationSlice.reducer;