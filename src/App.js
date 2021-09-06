import { Component } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import imagesApi from "./API/pixabay";
import Loader from "react-loader-spinner";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    showModal: false,
    isLoading: false,
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
    this.setState({ isLoading: true });
    imagesApi
      .fetchImages(searchInput, page)
      .then((images) => {
        if (images.data.hits.length === 0) {
          toast.error(`"${searchInput}" is not found`, {
            theme: "dark",
          });
        }
        this.setState((prevState) =>
          page === 1
            ? {
                images: images.data.hits,
              }
            : {
                images: [...prevState.images, ...images.data.hits],
              }
        );
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        const notify = () => toast(error.message);
        notify();
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleFormSubmit = (searchInput) => {
    if (this.state.searchInput.trim === "") {
      this.setState({ images: [] });
    } else {
      this.setState({ searchInput });
    }
  };

  onLoadMoreClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  onModalOpen = (largeImg) => {
    this.setState({
      showModal: true,
      modal: largeImg,
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
      modal: "",
    });
  };

  render() {
    const { modal, images, showModal, isLoading } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem modalOpen={this.onModalOpen} imagesList={images} />
        </ImageGallery>
        {isLoading && (
          <Loader
            className="Loader"
            type="Grid"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        {images.length > 0 && (
          <Button
            type="button"
            name="Load more"
            onBtnClick={this.onLoadMoreClick}
            className="Button"
          />
        )}
        {showModal && (
          <Modal modalClose={this.onModalClose} modalImage={modal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
