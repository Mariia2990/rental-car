import css from "./CatalogDetailPage.module.css";
import Container from "../../components/Container/Container";
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

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (error) return <div>Error: {error}</div>;
   if (isLoading) return <Loader />;
  if (!car) return <p>Car not found</p>;
  
  return (
    <>
<div className={css.containerDetail}>
        <div className={css.imgContainer}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={css.imgDetail}
          />
          <DetailForm/>
</div>
        
        <Outlet />
      </div>
    </>
  );
};


export default CatalogDetailPage;