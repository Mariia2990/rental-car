import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./Cars/slice.js";
import { filtersReducer } from "./FilterCars/slice.js";
// import { favoritesReducer } from "./favorite/slice.js";
import { persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { favoritesReducer } from "./Favourite/slice.js";

 const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
      },
    }),
});

export const persistor = persistStore(store);
export default store;
