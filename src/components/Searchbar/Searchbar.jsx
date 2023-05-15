import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    searchName: '',
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      toast.error('Введіть значення пошуку');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
    event.target.reset();
  };

  handleTextChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { searchName, handleSubmit, handleTextChange } = this;
    return (
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            value={searchName}
            onChange={handleTextChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
