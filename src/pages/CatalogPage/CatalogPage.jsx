import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchNextCars } from '../../redux/Cars/operations.js';

import {
  selectCars,
  selectError,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from '../../redux/Cars/selector.js';

import { clearCars, setPage } from '../../redux/Cars/slice.js';

import Container from '../../components/Container/Container';
import SearchCarForm from '../../components/SearchCarForm/SearchCarForm';
import CarList from '../../components/CarList/CarList';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import { Loader } from '../../components/Loader/Loader.jsx';

import { formatMileage } from '../../service/format.js';
import toast from 'react-hot-toast';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  const loaderRef = useRef(null);

  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
    limit: 8,
  });

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    dispatch(clearCars());
    dispatch(setPage(1));
    dispatch(fetchCars({ ...filters, page: 1 }));
  }, [dispatch, filters]);

  useEffect(() => {
    if (!isLoading && page >= totalPages && cars.length > 0 && !firstLoad) {
      toast.success("You've reached the end of the catalog!", {
        position: 'top-right',
      });
    }
  }, [page, totalPages, cars.length, isLoading, firstLoad]);

  useEffect(() => {
    if (!isLoading && cars.length === 0 && !firstLoad) {
      toast.error('No cars matching your criteria!', {
        position: 'top-right',
      });
    }
  }, [cars, isLoading, firstLoad]);

   useEffect(() => {
    if (!isLoading) {
      setFirstLoad(false);
    }
  }, [isLoading]);

  // Додано плавний скролл
  useEffect(() => {
    if (!isLoading && page > 1 && loaderRef.current) {
      loaderRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [cars.length]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchNextCars({ ...filters, page: nextPage }));
  };

  const handleFilter = formValues => {
    setFilters({
      brand: formValues.brand,
      rentalPrice: formValues.price,
      minMileage: formValues.from,
      maxMileage: formValues.to,
      limit: 8,
    });
  };

  if (isLoading && firstLoad) {
    return <Loader />;
  }

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

      {page < totalPages && cars.length > 0 && (
        <div ref={loaderRef}>
          <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} />
        </div>
      )}
    </Container>
  );
};

export default CatalogPage;
