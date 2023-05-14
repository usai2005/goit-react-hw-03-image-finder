import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageToShow, openModal }) => {
  const { webformatURL, largeImageURL, id } = imageToShow;
  return (
    <li
      onClick={() => openModal({ largeImageURL, id })}
      className={css.gallery__item}
    >
      <img className={css.gallery__item__image} src={webformatURL} alt={id} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  imageToShow: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
