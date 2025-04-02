import Logo from "../Logo/Logo";
import css from "./Header.module.css";
import { Link } from "react-router-dom";


export const Header = () => {
    return (
      <>
      <div className={css.header}>
        <Logo />
        <div className={css.buttons}>
          <Link to="/">
            <button className={css.btn}>Home</button>
          </Link>
          <Link to="/catalog">
            <button className={css.btn}>Catalog</button>
          </Link>
        </div>
      </div>
        </>
  );
};
