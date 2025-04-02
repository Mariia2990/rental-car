const formatMileage = (mileage) => {
  if (mileage == null || mileage === undefined || isNaN(Number(mileage)))
    return "N/A";
  return `${Number(mileage).toLocaleString()} km`;
};

export { formatMileage };
