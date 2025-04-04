export const selectFilters = state => state.filters;
export const selectBrand = state => state.filters.brand;
export const selectRentalPrice = state => state.filters.rentalPrice;
export const selectMinMileage = state => state.filters.minMileage;
export const selectMaxMileage = state => state.filters.maxMileage;
export const selectBrands = state => state.filters.brands;
export const selectIsLoading = state => state.filters.isLoading;
export const selectError = state => state.filters.error;
