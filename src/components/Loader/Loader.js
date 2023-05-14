import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = ({ loading }) => {
  return (
    loading && (
      <div className={css.loader__container}>
        <RotatingLines
          strokeColor="#FF0000"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />
      </div>
    )
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
