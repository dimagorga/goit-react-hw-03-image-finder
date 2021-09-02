import { Component } from "react";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    input: "",
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.input.trim() === "") {
      alert("введите");
    }
    this.props.onSubmit(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            onClick={this.handleSubmit}
            className={s.SearchFormButton}
          >
            {/* <span className="SearchForm-button-label">Search</span> */}
          </button>
          <input
            onChange={this.handleChange}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
