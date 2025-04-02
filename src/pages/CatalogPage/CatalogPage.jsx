import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/Cars/operations.js"; 
import CarList from "../../components/CarList/CarList";
import Container from "../../components/Container/Container";
import SearchCarForm from "../../components/SearchCarForm/SearchCarForm";
import { Loader } from "../../components/Loader/Loader.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.items);
  const loading = useSelector((state) => state.cars.loading);
  const error = useSelector((state) => state.cars.error);

  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
    limit: "8",
    page: "1",
  });

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [dispatch, filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <Loader/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Container>
        <SearchCarForm onFilter={handleFilter} />
        {cars.length > 0 ? <CarList cars={cars} /> : <p>No cars available.</p>}
      </Container>
    </>
  );
};

export default CatalogPage;
