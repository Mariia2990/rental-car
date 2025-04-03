import css from "./CatalogDetailPage.module.css";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectIsLoading, selectSelectedCar } from "../../redux/Cars/selector";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/Cars/operations";
import { Loader } from "../../components/Loader/Loader";
import { DetailForm } from "../../components/DetailForm/DetailForm";


const CatalogDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectSelectedCar);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const safeYear = car?.year || 'N/A';
  
  
  const locationPart =
    car?.address?.split(', ').slice(1).join(', ') || 'Unknown Location';
  const displayId = `Id: ${String(car?.id).replace(/-/g, '').slice(0, 4)}`;
  const safeMileage = Number(car?.mileage) || 0;

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (error) return <div>Error: {error}</div>;
   if (isLoading) return <Loader />;
  if (!car) return <p>Car not found</p>;
  

   const rentalConditions =
     typeof car?.rentalConditions === 'string'
       ? car.rentalConditions.split(', ')
       : car?.rentalConditions || [];
   const accessoriesFunctionalities = [
     ...(car?.accessories || []),
     ...(car?.functionalities || []),
  ];
  
  return (
    <>
      <div className={css.containerDetail}>
        <div className={css.imgContainer}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={css.imgDetail}
          />
          <DetailForm />
        </div>
        <div className={css.containerInfoCar}>
          <h2 className={css.titleInfo}>
            {car?.brand} {car?.model}, {safeYear}
            <span className={css.carId}>{displayId}</span>
          </h2>
          <p className={css.location}>
            <svg className={css.icon}>
              <use href={'/img/sprite.svg#icon-location'} />
            </svg>
            {locationPart}{' '}
            <span style={{ marginLeft: '16px', color: '#101828' }}>
              Mileage: {safeMileage.toLocaleString()} km
            </span>
          </p>
          <p className={css.price}>{car?.rentalPrice || 'N/A'}$</p>
          <p className={css.infoDetail}>
            {car?.description || 'No description'}
          </p>
          <h3 className={css.rentCondTitle}>Rental Conditions:</h3>
          <ul className={css.conditions}>
            {rentalConditions.map((condition, index) => (
              <li key={index} className={css.list}>
                <svg className={css.icon}>
                  <use
                    href={'../../../public/img/sprite.svg#icon-check-circle'}
                  />
                </svg>
                {condition}
              </li>
            ))}
          </ul>
          <h3 className={css.rentSpecif}>Car Specifications:</h3>
          <ul className={css.specif}>
            <li className={css.list}>
              <svg className={css.icon}>
                <use href={'../../../public/img/sprite.svg#icon-calendar'} />
              </svg>
              Year: {safeYear}
            </li>
            <li className={css.list}>
              <svg className={css.icon}>
                <use href={'../../../public/img/sprite.svg#icon-car'} />
              </svg>
              Type: {car?.type || 'N/A'}
            </li>
            <li className={css.list}>
              <svg className={css.icon}>
                <use href={'../../../public/img/sprite.svg#icon-fuel-pump'} />
              </svg>
              Fuel Consumption: {car?.fuelConsumption || 'N/A'}
            </li>
            <li className={css.list}>
              <svg className={css.icon}>
                <use href={'../../../public/img/sprite.svg#icon-gear'} />
              </svg>
              Engine Size: {car?.engineSize || 'N/A'}
            </li>
          </ul>
          <h3 className={css.rentAcces}>Accessories and functionalities:</h3>
          <ul className={css.accessories}>
            {accessoriesFunctionalities.map((item, index) => (
              <li key={index} className={css.list}>
                <svg className={css.icon}>
                  <use
                    href={'../../../public/img/sprite.svg#icon-check-circle'}
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
};


export default CatalogDetailPage;