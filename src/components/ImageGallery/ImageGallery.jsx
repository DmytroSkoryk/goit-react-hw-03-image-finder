import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ searchName, perPage, images }) => {
  return (
    <ul className={css.gallery}>
      <ImageGalleryItem
        images={images}
        searchName={searchName}
        perPage={perPage}
      />
    </ul>
  );
};

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
