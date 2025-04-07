import css from "./SearchCarForm.module.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectBrand, selectBrands, selectError, selectIsLoading, selectMaxMileage, selectMinMileage, selectRentalPrice } from "../../redux/FilterCars/selector";
import { setBrand, setMaxMileage, setMinMileage, setRentalPrice } from "../../redux/FilterCars/slice";
import { fetchBrands } from "../../redux/FilterCars/operations";
import { clearCars } from "../../redux/Cars/slice";
import { fetchCars } from "../../redux/Cars/operations";
import { Loader } from "../Loader/Loader";

const SearchCarForm = ({ onFilter }) => {
  const dispatch = useDispatch();

  const selectedBrand = useSelector(selectBrand);
  const brands = useSelector(selectBrands);
  const prices = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);


  useEffect(() => {
    if (!brands.length && !isLoading && !error) {
      dispatch(fetchBrands());
    }
  }, [dispatch, brands.length, isLoading, error]);

   const handleBrandChange = useCallback(
     e => {
       dispatch(setBrand(e.target.value));
     },
     [dispatch],
  );

    
    const handlePriceChange = useCallback(
      e => {
        const value = e.target.value;
        if (value === '') {
          dispatch(setRentalPrice('')); 
        } else {
          dispatch(setRentalPrice(value)); 
        }
      },
      [dispatch],
    );
  
 const priceOptions = useMemo(() => {
  const basePrices = [
    '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130'
  ];

  if (['30', '40', '50', '60', '70', '80'].includes(prices)) {
    return [
      `To $${prices}`,
      ...basePrices.filter(price => price !== prices)
    ];
  }

  return basePrices;
}, [prices]);

 
  const [localMinMileage, setLocalMinMileage] = useState("");
  const [localMaxMileage, setLocalMaxMileage] = useState("");


 
const handleSearch = useCallback(() => {
  dispatch(clearCars());
  const min = localMinMileage !== '' ? Number(localMinMileage) : undefined;
  const max = localMaxMileage !== '' ? Number(localMaxMileage) : undefined;
  dispatch(setMinMileage(min));
  dispatch(setMaxMileage(max));

  
  const priceForApi = prices.startsWith("To $")
    ? prices.replace("To $", "")  
    : prices;

  dispatch(
    fetchCars({
      brand: selectedBrand,
      rentalPrice: priceForApi,
      minMileage: min,
      maxMileage: max,
    })
  );
}, [dispatch, prices, selectedBrand, localMinMileage, localMaxMileage]);

useEffect(() => {
  setLocalMinMileage(minMileage || '');
  setLocalMaxMileage(maxMileage || '');
}, [minMileage, maxMileage]);

    if (isLoading) {
    return <Loader isLoading={true} size={50} />;
  }
  if (error) return <div>Error: {error}</div>;


  return (
    <Formik
      initialValues={{
        brand: selectedBrand || '',
        price: prices || '',
        from: localMinMileage || '',
        to: localMaxMileage || '',
      }}
      validationSchema={Yup.object({
        brand: Yup.string().required('Choose a brand'),
        price: Yup.string().required('Choose a price'),
        from: Yup.number()
          .required('Fill in the field')
          .min(1990, 'Minimum value - 1990'),
        to: Yup.number()
          .required('Fill in the field')
          .when('from', (from, schema) =>
            from ? schema.min(from, "Cannot be less than 'From'") : schema,
          ),
      })}
      onSubmit={(values, { resetForm }) => {
        onFilter(values);
        resetForm();
      }}
    >
      {({ isLoading }) => (
        <Form
          className={css.formCar}
          style={{
            display: 'flex',
            // gap: '16px',
            // width: '924px',
            // height: '68px',
          }}
        >
          <div className={css.labelWrapper}>
            <label htmlFor="brand" className={css.label}>
              Car brand
            </label>
            <Field
              as="select"
              name="brands"
              value={selectedBrand}
              disabled={isLoading}
              onChange={handleBrandChange}
              className={css.field}
              id="brands"
            >
              <option value="">Choose a brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Field>
          </div>
          <div className={css.labelWrapper}>
            <label htmlFor="price" className={css.label}>
              Price/ 1 hour
            </label>
            <Field
              as="select"
              value={prices}
              onChange={handlePriceChange}
              name="price"
              disabled={isLoading}
              className={css.field}
              id="price"
            >
              <option value="">Choose a price</option>
              {priceOptions.map(price => (
                <option
                  key={price}
                  value={price === `To $${prices}` ? prices : price}
                >
                  {price === `To $${prices}` ? `To $${prices}` : price}
                </option>
              ))}
            </Field>
          </div>

          <div className={css.labelWrapper1}>
            <div className={css.labelWrapper}>
              <label htmlFor="from" className={css.label}>
                Сar mileage / km
              </label>
            </div>
            <div className={css.inputNb}>
              <Field
                type="number"
                name="from"
                disabled={isLoading}
                className={css.leftInput}
                id="from"
                value={localMinMileage}
                onChange={e => setLocalMinMileage(e.target.value)}
              />

              <Field
                type="number"
                name="to"
                disabled={isLoading}
                className={css.rightInput}
                id="to"
                value={localMaxMileage}
                onChange={e => setLocalMaxMileage(e.target.value)}
              />
              <p className={css.textFrom}>From</p>
              <p className={css.textTo}>To</p>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSearch}
            disabled={isLoading}
            className={css.btnForm}
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchCarForm;
