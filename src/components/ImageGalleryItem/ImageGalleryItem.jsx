import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  state = {
    images: [],
    loading: false,
    isModalOpen: false,
    selectedImage: null,
  };

  openModal = image => {
    this.setState({ isModalOpen: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, selectedImage: null });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    } else if (prevProps.searchName !== this.props.searchName) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=34736724-43de875ebed23001707db1297&image_type=photo&orientation=horizontal&per_page=${this.props.perPage}`
      )
        .then(res => res.json())
        .then(data => this.setState({ images: data.hits }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { images, selectedImage } = this.state;
    return (
      <>
        {images.map((image, index) => (
          <li key={index} className={css.galleryItem}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => this.openModal(image)}
            />
          </li>
        ))}
        {selectedImage && (
          <Modal
            largeImageURL={selectedImage.largeImageURL}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  searchName: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGalleryItem;
