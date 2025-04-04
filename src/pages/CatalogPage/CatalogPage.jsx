import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/Cars/operations.js";
import CarList from "../../components/CarList/CarList";
import Container from "../../components/Container/Container";
import SearchCarForm from "../../components/SearchCarForm/SearchCarForm";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import {
  selectCars,
  selectError,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from "../../redux/Cars/selector.js";
import { clearCars } from "../../redux/Cars/slice.js";
import { formatMileage } from "../../service/format.js";
import {toast} from "react-toastify";
import { Loader } from "../../components/Loader/Loader.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
const loaderRef = useRef(null);

useEffect(() => {
  if (isLoading && page > 1 && loaderRef.current) {
    loaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}, [isLoading, page]);

  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
    limit: 8,
    page: 1,
  });

  const filtersMemoized = useMemo(() => filters, [filters]);

  useEffect(() => {
    dispatch(clearCars());
    dispatch(fetchCars(filtersMemoized));
  }, [dispatch, filtersMemoized]);

const [firstLoad, setFirstLoad] = useState(true);

useEffect(() => {
  if (!isLoading && cars.length === 0 && !firstLoad) {
    toast.info("No cars matching your criteria!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
}, [cars, isLoading]);

useEffect(() => {
  if (!isLoading) {
    setFirstLoad(false);
  }
}, [isLoading]);

 const handleLoadMore = () => {
   setFilters((prevFilters) => ({
     ...prevFilters,
     page: prevFilters.page + 1,
   }));
 };

const handleFilter = formValues => {
  setFilters({
    brand: formValues.brand,
    rentalPrice: formValues.price,
    minMileage: formValues.from,
    maxMileage: formValues.to,
    page: 1,
    limit: 8,
  });
};

  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <SearchCarForm onFilter={handleFilter} />

      <CarList
        cars={cars.map(car => ({
          ...car,
          mileage: formatMileage(car.mileage),
        }))}
      />

      {isLoading && page > 1 && (
        <div ref={loaderRef}>
          <Loader />
        </div>
      )}

      {page < totalPages && cars.length > 0 && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
    </Container>
  );
};

export default CatalogPage;
