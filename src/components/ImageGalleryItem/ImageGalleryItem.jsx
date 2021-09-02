import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";
function ImageGalleryItem({ imagesList, modalOpen }) {
  return imagesList.map((image) => {
    return (
      <li key={image.id} onClick={modalOpen} className={s.ImageGalleryItem}>
        <img
          id={image.id}
          src={image.webformatURL}
          alt="/"
          className={s.ImageGalleryItemImage}
          data-source={image.largeImageURL}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  imagesList: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
