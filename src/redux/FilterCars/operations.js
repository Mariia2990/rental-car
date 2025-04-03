import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchBrands = createAsyncThunk(
  'cars/fetchBrands',
  async (_, thunkAPI) => {
     try {
       const response = await api.get('/brands/')
       return response.data;
     } catch (error) {
return thunkAPI.rejectWithValue(error.message || "Couldn't find a brand");
     }
  }
);