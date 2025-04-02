import css from "./Logo.module.css";
import { Link } from "react-router-dom";
import sprite from "/img/sprite.svg";

export const Logo = () => {
  return (
    <div className={css.logo}>
      <Link to="/">
        <svg className={css.logoText}>
          <use
            href={sprite+"#icon-RentalCar"}
          />
        </svg>
      </Link>
    </div>
  );
};
export default Logo;
