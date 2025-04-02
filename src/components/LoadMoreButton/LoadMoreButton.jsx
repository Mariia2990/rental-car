import css from "./LoadMoreButton.module.css";

function LoadMoreButton({ onClick }) {
  return (
    <button className={css.loadMoreBtn} onClick={onClick}>
      Load more
    </button>
  );
}

export default LoadMoreButton;
