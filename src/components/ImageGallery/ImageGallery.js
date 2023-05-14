import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = { showModal: false, largeImageURL: '', imageAlt: 0 };

  onOpenModal = ({ largeImageURL, id }) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      imageAlt: id,
    });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <ul className={css.gallery}>
        {this.props.foundImages.map(image => (
          <ImageGalleryItem
            key={image.id}
            imageToShow={image}
            openModal={this.onOpenModal}
          />
        ))}
        {this.state.showModal && (
          <Modal closeModal={this.onCloseModal}>
            <img src={this.state.largeImageURL} alt={this.state.imageAlt} />
          </Modal>
        )}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  foundImages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
