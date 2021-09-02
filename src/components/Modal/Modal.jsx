import { render } from "@testing-library/react";
import { Component } from "react";
import s from "./Modal.module.css";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = (e) => {
    if (e.key === "Escape" || e.target === e.currentTarget) {
      this.props.modalClose();
    }
  };

  render() {
    const { largeImageURL } = this.props.image;
    console.log(this.props.image);
    return (
      <div className={s.Overlay}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
