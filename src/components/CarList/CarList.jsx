import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./CarList.module.css";
import { selectFavorite } from "../../redux/Favourite/selectors";
import { toggleFavorite } from "../../redux/Favourite/slice";
import sprite from "/img/sprite.svg";

const CarList = ({ cars }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorite);

  return (
    <div className={css.carList}>
      {cars.map((car) => {
        const {
          id,
          img,
          brand,
          model,
          year,
          rentalPrice,
          mileage = 0,
          address,
          rentalCompany,
          type,
        } = car;

        const locationPart =
          address?.split(", ").slice(1).join(", ") || "Unknown Location";
        const formattedMileage = mileage.toLocaleString();
        const isFavorite = favorites.includes(id);

        const handleToggleFavorite = () => {
          dispatch(toggleFavorite(id));
        };

        return (
          <div key={id} className={css.carCard}>
            <img src={img} alt={`${brand} ${model}`} className={css.img} />

            <div className={css.favoriteIcon} onClick={handleToggleFavorite}>
              <button className={css.iconBtn}>
              <svg
                width="16"
                height="16"
                className={`${css.icon} ${isFavorite ? css.active : ''}`}
              >
                <use
                  href={`${sprite}#${isFavorite ? 'favorite' : 'icon-heart'}`}
                />
                </svg>
              </button>
            </div>

            <div className={css.carInfo}>
              <h3 className={css.carInfoTitle}>
                <span className={css.brand}>{brand}</span>{' '}
                <span className={css.model}>{model}</span>,{' '}
                <span className={css.year}>{year}</span>
              </h3>
              <span className={css.price}>${rentalPrice}</span>
            </div>
            <div className={css.mileage}>
              <p>
                {locationPart} | {rentalCompany} |
              </p>
              <p>
                {type} | {formattedMileage}
              </p>
            </div>
            <NavLink
              to={`/catalog/${id}`}
              className={({ isActive }) =>
                isActive ? `${css.readMoreBtn} ${css.active}` : css.readMoreBtn
              }
            >
              Read more
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default CarList;
