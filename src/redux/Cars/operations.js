import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (filters, thunkAPI) => {
    try {
      const {
        brand = "",
        rentalPrice = "",
        minMileage = "",
        maxMileage = "",
        limit = "8",
        page = "1",
      } = filters;

      const response = await api.get("/cars", {
        params: { brand, rentalPrice, minMileage, maxMileage, limit, page },
      });

      const { cars, totalCars, totalPages } = response.data;

      return { cars, totalCars, totalPages };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch cars");
    }
  }
);

export const fetchNextCars = createAsyncThunk(
  "cars/fetchNextCars",
  async (filters, thunkAPI) => {
    try {
      const {
        brand = "",
        rentalPrice = "",
        minMileage = "",
        maxMileage = "",
        limit = "8",
        page = "1",
      } = filters;

      const response = await api.get("/cars", {
        params: { brand, rentalPrice, minMileage, maxMileage, limit, page },
      });

      const { cars, totalCars, totalPages } = response.data;

      return { cars, totalCars, totalPages };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch next cars"
      );
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/cars/${id}`);

      return response.data;
    } catch (error) {
      const message = error.message || "Failed to fetch car details";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
