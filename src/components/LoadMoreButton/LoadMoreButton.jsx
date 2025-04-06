import css from './LoadMoreButton.module.css';
import { Loader } from '../Loader/Loader'; 

function LoadMoreButton({ onClick, isLoading }) {
  return (
    <button className={css.loadMoreBtn} onClick={onClick} disabled={isLoading}>
      {isLoading ? <Loader /> : 'Load more'}
    </button>
  );
}

export default LoadMoreButton;
