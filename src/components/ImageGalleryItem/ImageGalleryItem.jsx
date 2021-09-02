import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ imagesList, modalOpen }) {
  return imagesList.map((image) => {
    return (
      <li key={image.id} onClick={modalOpen} className={s.ImageGalleryItem}>
        <img
          src={image.webformatURL}
          alt={image.webformatURL}
          className={s.ImageGalleryItemImage}
        />
      </li>
    );
  });
}

export default ImageGalleryItem;
