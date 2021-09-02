import { Component } from "react";
import "./App.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import imagesApi from "./API/pixabay";
// import Loader from "react-loader-spinner";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    showModal: false,
    isloading: false,
    searchInput: "",
    page: 1,
    images: [],
    modal: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchInput, page } = this.state;
    if (prevState.searchInput !== searchInput) {
      this.searchImages(searchInput, 1);
    }
    if (prevState.page !== page) {
      this.searchImages(searchInput, page);
    }
  }

  searchImages = (searchInput, page) => {
    this.setState({ isloading: true });
    imagesApi
      .fetchImages(searchInput, page)
      .then((images) => {
        if (page === 1) {
          this.setState({ images: images.data.hits });
        } else {
          this.setState((prevState) => ({
            images: [...prevState.images, ...images.data.hits],
          }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.setState({ isloading: false });
      });
  };

  handleFormSubmit = (searchInput) => {
    if (this.state.searchInput.trim === "") {
      this.setState({ images: [] });
    }
    this.setState({ searchInput });
  };

  onLoadMoreClick = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { modal, images, showModal } = this.state;
    return (
      <div className="App">
        {showModal && <Modal modalClose={this.toggleModal} image={modal} />}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem modalOpen={this.toggleModal} imagesList={images} />
        </ImageGallery>
        {images.length > 0 && (
          <Button
            type="button"
            name="Load more"
            onBtnClick={this.onLoadMoreClick}
          />
        )}
      </div>
    );
  }
}

export default App;
