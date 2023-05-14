import PropTypes from 'prop-types';
import css from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ onLoadMoreBtn }) => {
  return (
    <div className={css.button__container}>
      <button
        className={css.button}
        type="button"
        onClick={() => onLoadMoreBtn()}
      >
        Load more
      </button>
    </div>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMoreBtn: PropTypes.func.isRequired,
};
