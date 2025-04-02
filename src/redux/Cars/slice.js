import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchNextCars, fetchCarById } from "./operations";

const initialState = {
  items: [],
  selectedCar: null,
  page: 1,
  limit: 8,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    clearCars(state) {
      state.items = [];
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    appendCars(state, action) {
      state.items = [...state.items, ...action.payload.cars];
      state.totalPages = action.payload.totalPages || state.totalPages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.cars || [];
        state.totalPages = action.payload.totalPages || 1;
        state.error = null;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchNextCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNextCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, ...action.payload.cars];
        state.totalPages = action.payload.totalPages || state.totalPages;
        state.error = null;
      })
      .addCase(fetchNextCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
        state.error = null;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCars, setPage, appendCars } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
