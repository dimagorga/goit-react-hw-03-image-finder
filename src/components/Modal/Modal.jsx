import { Component } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseModal);
  }

  handleCloseModal = (e) => {
    if (e.key === "Escape" || e.target === e.currentTarget) {
      this.props.modalClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleCloseModal}>
        <div className={s.Modal}>
          <img className={s.modalImage} src={this.props.modalImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

export default Modal;
