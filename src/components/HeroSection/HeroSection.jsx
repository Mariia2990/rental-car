import { NavLink } from "react-router-dom";
import css from "./HeroSection.module.css";

export const HeroSection = () => {
  return (
    <div className={css.container}>
      <div className={css.titleBox}>
        <div className={css.titleWSBox}>
        <h1 className={css.titleHP}>Find your perfect rental car</h1>
      
          <p className={css.textWS}>Reliable and budget-friendly rentals for any journey</p>
        </div>
        <div className={css.btnBox}>
          <NavLink to="/catalog" className={css.btnHP}>View Catalog</NavLink>
        </div>

      </div>
    </div>
  );
};
