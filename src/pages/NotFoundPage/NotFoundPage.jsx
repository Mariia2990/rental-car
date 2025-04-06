import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { BiGhost } from "react-icons/bi";
import Container from "../../components/Container/Container";

export default function NotFoundPage() {
  return (
    <Container>
      <div className={css.NFBox2}>
        <BiGhost size={100} color="#3470FF" />
        <h2 className={css.NFTitle1}>Page not found - 404</h2>
        <div className={css.NFButtonBox}>
          <Link to="/" className={css.NFButton}>
            Go home
          </Link>
        </div>
      </div>
    </Container>
  );
}
